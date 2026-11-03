/**
 * ReBloom - Shopping Cart & Order Receipt Controller
 * Strictly vanilla ES6+ JavaScript enforcing snake_case identifiers.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Constants & Catalog Metadata
  // ==========================================
  const cart_storage_key = "rebloom_cart";
  const legacy_order_key = "rebloom_order";
  const admin_whatsapp_phone = "6282132829795";

  const catalog_defaults = {
    regular: {
      pack_key: "regular",
      pack_name: "Flower Pot Regular",
      category: "Handcrafted",
      unit_price: 10000,
      image: "assets/images/Product_1.jpg",
    },
    bird_gift: {
      pack_key: "bird_gift",
      pack_name: "Flower Bird Gift",
      category: "Handcrafted",
      unit_price: 12000,
      image: "assets/images/Product_thumbnail.jpg",
    },
    lamp_pot: {
      pack_key: "lamp_pot",
      pack_name: "Lamp Flower Pot",
      category: "Recycled Plastic",
      unit_price: 15000,
      image: "assets/images/Product_img_4.jpg",
    },
  };

  // ==========================================
  // 2. DOM Elements
  // ==========================================
  const empty_cart_state = document.getElementById("empty_cart_state");
  const populated_cart_state = document.getElementById("populated_cart_state");
  const cart_items_list = document.getElementById("cart_items_list");
  const cart_count_highlight = document.getElementById("cart_count_highlight");
  const summary_item_count = document.getElementById("summary_item_count");
  const summary_subtotal_price = document.getElementById("summary_subtotal_price");
  const summary_grand_total = document.getElementById("summary_grand_total");
  const summary_order_date = document.getElementById("summary_order_date");
  const proceed_checkout_btn = document.getElementById("proceed_checkout_btn");
  const lang_buttons = document.querySelectorAll(".lang_switch .lang_btn");

  // Track item currently in inline note-editing mode
  let active_editing_item_id = null;

  // ==========================================
  // 3. Formatting Helper Utilities
  // ==========================================
  function format_currency_unit(amount) {
    const formatted_number = Number(amount || 0).toLocaleString("id-ID");
    return `Rp ${formatted_number}`;
  }

  function format_currency_summary(amount) {
    const formatted_number = Number(amount || 0).toLocaleString("id-ID");
    return `Rp ${formatted_number},00`;
  }

  function format_order_timestamp(date_obj = new Date()) {
    const day_string = String(date_obj.getDate()).padStart(2, "0");
    const month_names = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month_string = month_names[date_obj.getMonth()];
    const year_string = date_obj.getFullYear();

    let hours = date_obj.getHours();
    const minutes = String(date_obj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hour_string = String(hours).padStart(2, "0");

    return `${day_string} ${month_string} ${year_string}, ${hour_string}:${minutes} ${ampm}`;
  }

  // ==========================================
  // 4. Cart State Persistence & Migration
  // ==========================================
  function get_cart_items() {
    const raw_cart_data = localStorage.getItem(cart_storage_key);
    if (raw_cart_data) {
      try {
        const parsed_items = JSON.parse(raw_cart_data);
        if (Array.isArray(parsed_items)) {
          return parsed_items;
        }
      } catch (err) {
        // Fallback on corrupt JSON
      }
    }

    // Check if legacy single-item order exists in sessionStorage
    const raw_legacy_order = sessionStorage.getItem(legacy_order_key);
    if (raw_legacy_order) {
      try {
        const parsed_order = JSON.parse(raw_legacy_order);
        if (parsed_order && parsed_order.pack_name) {
          const pack_key = parsed_order.pack_key || "regular";
          const pack_meta = catalog_defaults[pack_key] || catalog_defaults.regular;

          const migrated_item = {
            id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            pack_key: pack_key,
            pack_name: parsed_order.pack_name || pack_meta.pack_name,
            category: pack_meta.category,
            image: pack_meta.image,
            unit_price: Number(parsed_order.unit_price) || pack_meta.unit_price,
            quantity: Number(parsed_order.quantity) || 1,
            selected_color: parsed_order.selected_color || parsed_order.flower_color || "Sky Blue",
            flower_color: parsed_order.flower_color || parsed_order.selected_color || "Sky Blue",
            color_hex: parsed_order.color_hex || "#0084FF",
            custom_note: parsed_order.custom_note ? parsed_order.custom_note.trim() : "",
            payment_method: parsed_order.payment_method || "Cash Only (Pre-Order COD)",
          };

          const initial_cart = [migrated_item];
          save_cart_items(initial_cart);
          sessionStorage.removeItem(legacy_order_key);
          return initial_cart;
        }
      } catch (legacy_err) {
        // Fallback on corrupt JSON
      }
    }

    return [];
  }

  function save_cart_items(cart_items) {
    localStorage.setItem(cart_storage_key, JSON.stringify(cart_items));
  }

  // ==========================================
  // 5. Quantity & Note Mutations
  // ==========================================
  function update_cart_quantity(item_id, delta) {
    const cart_items = get_cart_items();
    const item_index = cart_items.findIndex((item) => item.id === item_id);
    if (item_index === -1) return;

    cart_items[item_index].quantity += delta;

    if (cart_items[item_index].quantity <= 0) {
      cart_items.splice(item_index, 1);
    }

    save_cart_items(cart_items);
    render_cart_view();
  }

  function remove_cart_item(item_id) {
    const cart_items = get_cart_items();
    const updated_items = cart_items.filter((item) => item.id !== item_id);
    save_cart_items(updated_items);
    render_cart_view();
  }

  function update_cart_note(item_id, new_note) {
    const cart_items = get_cart_items();
    const item_index = cart_items.findIndex((item) => item.id === item_id);
    if (item_index === -1) return;

    cart_items[item_index].custom_note = new_note.trim();
    save_cart_items(cart_items);
    active_editing_item_id = null;
    render_cart_view();
  }

  // ==========================================
  // 6. View Rendering
  // ==========================================
  function render_cart_view() {
    const cart_items = get_cart_items();

    // 6.1 Empty Cart State
    if (cart_items.length === 0) {
      if (empty_cart_state) empty_cart_state.style.display = "block";
      if (populated_cart_state) populated_cart_state.style.display = "none";
      if (cart_count_highlight) cart_count_highlight.textContent = "0 items";
      return;
    }

    // 6.2 Populated Cart State
    if (empty_cart_state) empty_cart_state.style.display = "none";
    if (populated_cart_state) populated_cart_state.style.display = "block";

    let total_quantity = 0;
    let grand_total_amount = 0;

    cart_items.forEach((item) => {
      total_quantity += Number(item.quantity);
      grand_total_amount += Number(item.unit_price) * Number(item.quantity);
    });

    const items_label = `${total_quantity} item${total_quantity === 1 ? "" : "s"}`;
    if (cart_count_highlight) cart_count_highlight.textContent = items_label;
    if (summary_item_count) summary_item_count.textContent = total_quantity;
    if (summary_subtotal_price) {
      summary_subtotal_price.textContent = format_currency_summary(grand_total_amount);
    }
    if (summary_grand_total) {
      summary_grand_total.textContent = format_currency_summary(grand_total_amount);
    }
    if (summary_order_date) {
      summary_order_date.textContent = format_order_timestamp();
    }

    // 6.3 Render Cart Items List
    if (!cart_items_list) return;
    cart_items_list.innerHTML = "";

    cart_items.forEach((item) => {
      const card_element = document.createElement("article");
      card_element.className = "cart_item_card";
      card_element.setAttribute("data-item-id", item.id);

      const category_badge = item.category || (item.pack_key === "lamp_pot" ? "Recycled Plastic" : "Handcrafted");
      const color_name = item.selected_color || item.flower_color || "Sky Blue";
      const color_dot_hex = item.color_hex || "#0084FF";
      const has_note = Boolean(item.custom_note && item.custom_note.trim().length > 0);
      const note_display = has_note ? `Note: ${item.custom_note}` : "Note: None";
      const is_editing_note = active_editing_item_id === item.id;

      let note_markup = "";
      if (is_editing_note) {
        note_markup = `
          <form class="note_edit_form" data-item-id="${item.id}">
            <input type="text" class="note_edit_input" value="${item.custom_note || ""}" placeholder="Enter custom note..." autofocus>
            <button type="submit" class="note_save_btn" title="Save note"><i class="fa-solid fa-check"></i></button>
            <button type="button" class="note_cancel_btn" title="Cancel"><i class="fa-solid fa-xmark"></i></button>
          </form>
        `;
      } else {
        note_markup = `
          <div class="note_pill">
            <span class="note_pill_text">${note_display}</span>
            <button type="button" class="note_edit_btn" data-item-id="${item.id}" aria-label="Edit customer note" title="Edit note">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        `;
      }

      card_element.innerHTML = `
        <img src="${item.image}" alt="${item.pack_name}" class="item_thumb">

        <button type="button" class="item_delete_btn" data-item-id="${item.id}" aria-label="Remove ${item.pack_name} from cart" title="Delete item">
          <i class="fa-regular fa-trash-can"></i>
        </button>

        <div class="item_details">
          <div class="item_top_row">
            <span class="item_tag_pill">${category_badge}</span>
            <h3 class="item_title">${item.pack_name}</h3>
            <div class="item_meta_row">
              <div class="color_pill">
                <span class="color_dot" style="background-color: ${color_dot_hex};"></span>
                <span>${color_name}</span>
              </div>
              ${note_markup}
            </div>
          </div>

          <div class="item_bottom_row">
            <div class="unit_price_block">
              <span class="unit_price_label">Unit Price</span>
              <span class="unit_price_val">${format_currency_unit(item.unit_price)}</span>
            </div>

            <div class="qty_stepper">
              <button type="button" class="qty_btn_minus" data-item-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span class="qty_value">${item.quantity}</span>
              <button type="button" class="qty_btn_plus" data-item-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      `;

      // Bind Event Listeners on Card
      const minus_btn = card_element.querySelector(".qty_btn_minus");
      if (minus_btn) {
        minus_btn.addEventListener("click", () => {
          update_cart_quantity(item.id, -1);
        });
      }

      const plus_btn = card_element.querySelector(".qty_btn_plus");
      if (plus_btn) {
        plus_btn.addEventListener("click", () => {
          update_cart_quantity(item.id, 1);
        });
      }

      const delete_btn = card_element.querySelector(".item_delete_btn");
      if (delete_btn) {
        delete_btn.addEventListener("click", () => {
          remove_cart_item(item.id);
        });
      }

      const edit_note_btn = card_element.querySelector(".note_edit_btn");
      if (edit_note_btn) {
        edit_note_btn.addEventListener("click", () => {
          active_editing_item_id = item.id;
          render_cart_view();
        });
      }

      const edit_note_form = card_element.querySelector(".note_edit_form");
      if (edit_note_form) {
        const input_el = edit_note_form.querySelector(".note_edit_input");
        const cancel_btn = edit_note_form.querySelector(".note_cancel_btn");

        edit_note_form.addEventListener("submit", (submit_evt) => {
          submit_evt.preventDefault();
          update_cart_note(item.id, input_el.value);
        });

        if (cancel_btn) {
          cancel_btn.addEventListener("click", () => {
            active_editing_item_id = null;
            render_cart_view();
          });
        }
      }

      cart_items_list.appendChild(card_element);
    });
  }

  // ==========================================
  // 7. WhatsApp Pre-Order COD Checkout
  // ==========================================
  if (proceed_checkout_btn) {
    proceed_checkout_btn.addEventListener("click", async () => {
      const cart_items = get_cart_items();
      if (cart_items.length === 0) {
        alert("Your cart is currently empty. Please add items to checkout.");
        return;
      }

      const current_timestamp = format_order_timestamp(new Date());
      let grand_total = 0;

      let items_text_block = "";
      cart_items.forEach((item, index) => {
        const item_total = Number(item.unit_price) * Number(item.quantity);
        grand_total += item_total;

        const color_display = item.selected_color || item.flower_color || "Sky Blue";
        const note_display = item.custom_note && item.custom_note.trim() ? item.custom_note.trim() : "None";

        items_text_block += `${index + 1}. *${item.pack_name}* (x${item.quantity})\n`;
        items_text_block += `   • Flower Color: ${color_display}\n`;
        items_text_block += `   • Custom Note: ${note_display}\n`;
        items_text_block += `   • Price: ${format_currency_unit(item.unit_price)} × ${item.quantity} = ${format_currency_unit(item_total)}\n\n`;
      });

      const formatted_grand_total = format_currency_summary(grand_total);

      const wa_message =
        `Hello ReBloom Admin! I would like to place a Pre-Order (Cash on Delivery):\n\n` +
        `*Order Date:* ${current_timestamp}\n` +
        `*Payment Method:* Cash Only (Pre-Order COD)\n` +
        `*Delivery Mode:* Direct Handover / WhatsApp Scheduled\n\n` +
        `*Order Items:*\n${items_text_block}` +
        `*Packaging & Recycling:* FREE\n` +
        `*Shipping Fee:* FREE (COD PICKUP)\n` +
        `*Grand Total:* ${formatted_grand_total}\n\n` +
        `Please confirm my pre-order details. Thank you!`;

      const encoded_wa_url = `https://wa.me/${admin_whatsapp_phone}?text=${encodeURIComponent(wa_message)}`;

      // Attempt clipboard copy with visual feedback
      const original_btn_html = proceed_checkout_btn.innerHTML;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(wa_message);
          proceed_checkout_btn.innerHTML = `<span>Order Copied! Opening WhatsApp...</span> <i class="fa-solid fa-arrow-right"></i>`;
        }
      } catch (clip_err) {
        // Fallback without clipboard
      }

      setTimeout(() => {
        window.open(encoded_wa_url, "_blank", "noopener,noreferrer");
        proceed_checkout_btn.innerHTML = original_btn_html;
      }, 350);
    });
  }

  // ==========================================
  // 8. Language Switcher Interaction
  // ==========================================
  if (lang_buttons.length > 0) {
    lang_buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        lang_buttons.forEach((other) => other.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // Initialize the Cart View on Load
  render_cart_view();
});

