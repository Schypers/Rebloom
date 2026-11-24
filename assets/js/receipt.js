document.addEventListener("DOMContentLoaded", () => {

  const cart_storage_key = "rebloom_cart";
  const legacy_order_key = "rebloom_order";
  const admin_whatsapp_phone = "6282132829795";

  const catalog_defaults = {
    regular: {
      pack_key: "regular",
      pack_name_en: "Flower Pot Regular",
      pack_name_id: "Pot Bunga Reguler",
      category_en: "Handcrafted",
      category_id: "Buatan Tangan",
      unit_price: 10000,
      image: "assets/images/Product_1.jpg",
    },
    bird_gift: {
      pack_key: "bird_gift",
      pack_name_en: "Flower Bird Gift",
      pack_name_id: "Hadiah Bunga Spesial",
      category_en: "Handcrafted",
      category_id: "Buatan Tangan",
      unit_price: 12000,
      image: "assets/images/Product_2.jpg",
    },
    lamp_pot: {
      pack_key: "lamp_pot",
      pack_name_en: "Lamp Flower Pot",
      pack_name_id: "Pot Bunga Lampu LED",
      category_en: "Recycled Plastic",
      category_id: "Plastik Daur Ulang",
      unit_price: 15000,
      image: "assets/images/Product_3.jpg",
    },
  };

  const receipt_translations = {
    ENG: {
      nav_home: "Home",
      nav_about: "About",
      nav_products: "Product",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_cart: "Cart",
      cart_eyebrow: "ECO-FRIENDLY & HANDMADE",
      cart_title: "Your Cart",
      empty_cart_title: "Your Cart is Empty",
      empty_cart_desc:
        "Looks like you haven't added any handcrafted floral pieces to your cart yet. Explore our sustainable collection to find your favorite.",
      empty_cart_btn: "Start Shopping",
      empty_cart_trust:
        "Secure Pre-Order COD & WhatsApp Confirmation Available",
      cart_continue_btn: "Continue Shopping",
      summary_heading: "Order Summary",
      summary_pay_method_lbl: "PAYMENT METHOD",
      summary_pay_method_val: "Cash Only (Pre-Order COD)",
      summary_delivery_lbl: "DELIVERY MODE",
      summary_delivery_val: "Direct Handover / WhatsApp Scheduled",
      summary_order_date_lbl: "ORDER DATE",
      summary_pkg_fee_lbl: "Packaging & Recycling Fee",
      summary_free_badge: "FREE",
      summary_shipping_fee_lbl: "Shipping Fee",
      summary_shipping_free_badge: "FREE (COD PICKUP)",
      summary_total_lbl: "Total",
      summary_cod_guarantee: "Secure Pre-Order COD By ReBloom",
      summary_checkout_btn: "Proceed to Checkout",
      summary_footnote:
        "Orders are confirmed directly with our admin via WhatsApp upon checkout.",
      footer_copy:
        "© 2026 ReBloom. All Rights Reserved. Creative Handicrafts & Sustainable Decor.",
      empty_cart_alert:
        "Your cart is currently empty. Please add items to checkout.",
      unit_price_lbl: "Unit Price",
      note_lbl: "Note:",
      note_none: "None",
      note_edit_placeholder: "Enter custom note...",
      copy_btn_feedback: "Order Copied! Opening WhatsApp...",
    },
    IDN: {
      nav_home: "Beranda",
      nav_about: "Tentang",
      nav_products: "Produk",
      nav_faq: "FAQ",
      nav_contact: "Kontak",
      nav_cart: "Keranjang",
      cart_eyebrow: "RAMAH LINGKUNGAN & BUATAN TANGAN",
      cart_title: "Keranjang Anda",
      empty_cart_title: "Keranjang Anda Kosong",
      empty_cart_desc:
        "Sepertinya Anda belum menambahkan produk bunga kerajinan tangan ke keranjang. Jelajahi koleksi ramah lingkungan kami untuk menemukan favorit Anda.",
      empty_cart_btn: "Mulai Belanja",
      empty_cart_trust:
        "Tersedia Pre-Order COD Aman & Konfirmasi WhatsApp",
      cart_continue_btn: "Lanjut Belanja",
      summary_heading: "Ringkasan Pesanan",
      summary_pay_method_lbl: "METODE PEMBAYARAN",
      summary_pay_method_val: "Tunai Saja (Pre-Order COD)",
      summary_delivery_lbl: "METODE PENGIRIMAN",
      summary_delivery_val: "Serah Terima Langsung / Terjadwal via WhatsApp",
      summary_order_date_lbl: "TANGGAL PESANAN",
      summary_pkg_fee_lbl: "Biaya Kemasan & Daur Ulang",
      summary_free_badge: "GRATIS",
      summary_shipping_fee_lbl: "Biaya Pengiriman",
      summary_shipping_free_badge: "GRATIS (AMBIL COD)",
      summary_total_lbl: "Total",
      summary_cod_guarantee: "Pre-Order COD Aman Oleh ReBloom",
      summary_checkout_btn: "Lanjut ke Checkout",
      summary_footnote:
        "Pesanan dikonfirmasi langsung dengan admin kami melalui WhatsApp saat checkout.",
      footer_copy:
        "© 2026 ReBloom. Hak Cipta Dilindungi. Kerajinan Kreatif & Dekorasi Berkelanjutan.",
      empty_cart_alert:
        "Keranjang Anda saat ini kosong. Silakan tambahkan produk untuk checkout.",
      unit_price_lbl: "Harga Satuan",
      note_lbl: "Catatan:",
      note_none: "Tidak ada",
      note_edit_placeholder: "Masukkan catatan khusus...",
      copy_btn_feedback: "Pesanan Disalin! Membuka WhatsApp...",
    },
  };


  function get_saved_lang() {
    const saved_lang = localStorage.getItem("rebloom_lang");
    return saved_lang === "IDN" || saved_lang === "ENG" ? saved_lang : "ENG";
  }

  function apply_page_translation(target_lang) {
    const translations =
      receipt_translations[target_lang] || receipt_translations.ENG;

    const translatable_elements = document.querySelectorAll("[data-i18n]");
    translatable_elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = translations[key];
      if (translation !== undefined) {
        if (translation.includes("<") && translation.includes(">")) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    const placeholder_elements = document.querySelectorAll(
      "[data-i18n-placeholder]"
    );
    placeholder_elements.forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      const translation = translations[key];
      if (translation !== undefined) {
        element.setAttribute("placeholder", translation);
      }
    });
  }

  function set_active_lang(target_lang) {
    const safe_lang =
      target_lang === "IDN" || target_lang === "ENG" ? target_lang : "ENG";

    localStorage.setItem("rebloom_lang", safe_lang);
    document.documentElement.setAttribute("lang", safe_lang === "IDN" ? "id" : "en");

    const lang_buttons = document.querySelectorAll(".lang_switch .lang_btn");
    lang_buttons.forEach((btn) => {
      const btn_lang =
        btn.getAttribute("data-lang") || btn.textContent.trim().toUpperCase();
      if (btn_lang === safe_lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    apply_page_translation(safe_lang);
    render_cart_view();
  }

  function init_language_switcher() {
    const lang_buttons = document.querySelectorAll(".lang_switch .lang_btn");
    if (lang_buttons.length > 0) {
      lang_buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const selected_lang =
            btn.getAttribute("data-lang") ||
            btn.textContent.trim().toUpperCase();
          set_active_lang(selected_lang);
        });
      });
    }

    const initial_lang = get_saved_lang();
    set_active_lang(initial_lang);
  }


  const empty_cart_state = document.getElementById("empty_cart_state");
  const populated_cart_state = document.getElementById("populated_cart_state");
  const cart_items_list = document.getElementById("cart_items_list");
  const cart_count_highlight = document.getElementById("cart_count_highlight");
  const cart_review_text_el = document.querySelector(".cart_review_text");
  const summary_subtotal_label = document.getElementById("summary_subtotal_label");
  const summary_item_count = document.getElementById("summary_item_count");
  const summary_subtotal_price = document.getElementById("summary_subtotal_price");
  const summary_grand_total = document.getElementById("summary_grand_total");
  const summary_order_date = document.getElementById("summary_order_date");
  const proceed_checkout_btn = document.getElementById("proceed_checkout_btn");


  let active_editing_item_id = null;


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
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

  function get_cart_items() {
    const raw_cart_data = localStorage.getItem(cart_storage_key);
    if (raw_cart_data) {
      try {
        const parsed_items = JSON.parse(raw_cart_data);
        if (Array.isArray(parsed_items)) {
          return parsed_items;
        }
      } catch (err) {
      }
    }


    const raw_legacy_order = sessionStorage.getItem(legacy_order_key);
    if (raw_legacy_order) {
      try {
        const parsed_order = JSON.parse(raw_legacy_order);
        if (parsed_order && parsed_order.pack_name) {
          const pack_key = parsed_order.pack_key || "regular";
          const pack_meta =
            catalog_defaults[pack_key] || catalog_defaults.regular;

          const migrated_item = {
            id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            pack_key: pack_key,
            pack_name: parsed_order.pack_name || pack_meta.pack_name_en,
            category: pack_meta.category_en,
            image: pack_meta.image,
            unit_price: Number(parsed_order.unit_price) || pack_meta.unit_price,
            quantity: Number(parsed_order.quantity) || 1,
            selected_color:
              parsed_order.selected_color ||
              parsed_order.flower_color ||
              "Sky Blue",
            flower_color:
              parsed_order.flower_color ||
              parsed_order.selected_color ||
              "Sky Blue",
            color_hex: parsed_order.color_hex || "#0084FF",
            custom_note: parsed_order.custom_note
              ? parsed_order.custom_note.trim()
              : "",
            payment_method:
              parsed_order.payment_method || "Cash Only (Pre-Order COD)",
          };

          const initial_cart = [migrated_item];
          save_cart_items(initial_cart);
          sessionStorage.removeItem(legacy_order_key);
          return initial_cart;
        }
      } catch (legacy_err) {
      }
    }

    return [];
  }

  function save_cart_items(cart_items) {
    localStorage.setItem(cart_storage_key, JSON.stringify(cart_items));
  }



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



  function render_cart_view() {
    const cart_items = get_cart_items();
    const current_lang = get_saved_lang();


    if (cart_items.length === 0) {
      if (empty_cart_state) empty_cart_state.style.display = "block";
      if (populated_cart_state) populated_cart_state.style.display = "none";

      const zero_count_label =
        current_lang === "IDN" ? "0 produk" : "0 items";
      if (cart_review_text_el) {
        if (current_lang === "IDN") {
          cart_review_text_el.innerHTML = `Meninjau <span id="cart_count_highlight">${zero_count_label}</span> untuk checkout`;
        } else {
          cart_review_text_el.innerHTML = `Reviewing <span id="cart_count_highlight">${zero_count_label}</span> selected for checkout`;
        }
      }
      return;
    }


    if (empty_cart_state) empty_cart_state.style.display = "none";
    if (populated_cart_state) populated_cart_state.style.display = "block";

    let total_quantity = 0;
    let grand_total_amount = 0;

    cart_items.forEach((item) => {
      total_quantity += Number(item.quantity);
      grand_total_amount += Number(item.unit_price) * Number(item.quantity);
    });

    const items_highlight_label =
      current_lang === "IDN"
        ? `${total_quantity} produk`
        : `${total_quantity} item${total_quantity === 1 ? "" : "s"}`;

    if (cart_review_text_el) {
      if (current_lang === "IDN") {
        cart_review_text_el.innerHTML = `Meninjau <span id="cart_count_highlight">${items_highlight_label}</span> untuk checkout`;
      } else {
        cart_review_text_el.innerHTML = `Reviewing <span id="cart_count_highlight">${items_highlight_label}</span> selected for checkout`;
      }
    }

    if (summary_subtotal_label) {
      if (current_lang === "IDN") {
        summary_subtotal_label.innerHTML = `Subtotal Produk (<span id="summary_item_count">${total_quantity}</span> produk)`;
      } else {
        summary_subtotal_label.innerHTML = `Items Subtotal (<span id="summary_item_count">${total_quantity}</span> item${total_quantity === 1 ? "" : "s"})`;
      }
    }

    if (summary_subtotal_price) {
      summary_subtotal_price.textContent =
        format_currency_summary(grand_total_amount);
    }
    if (summary_grand_total) {
      summary_grand_total.textContent =
        format_currency_summary(grand_total_amount);
    }
    if (summary_order_date) {
      summary_order_date.textContent = format_order_timestamp();
    }


    if (!cart_items_list) return;
    cart_items_list.innerHTML = "";

    cart_items.forEach((item) => {
      const card_element = document.createElement("article");
      card_element.className = "cart_item_card";
      card_element.setAttribute("data-item-id", item.id);

      const pack_meta = catalog_defaults[item.pack_key] || null;
      const localized_pack_name = pack_meta
        ? current_lang === "IDN"
          ? pack_meta.pack_name_id
          : pack_meta.pack_name_en
        : item.pack_name;

      const localized_category = pack_meta
        ? current_lang === "IDN"
          ? pack_meta.category_id
          : pack_meta.category_en
        : item.pack_key === "lamp_pot"
        ? current_lang === "IDN"
          ? "Plastik Daur Ulang"
          : "Recycled Plastic"
        : current_lang === "IDN"
        ? "Buatan Tangan"
        : "Handcrafted";

      const color_name =
        item.selected_color || item.flower_color || "Sky Blue";
      const color_dot_hex = item.color_hex || "#0084FF";
      const has_note = Boolean(
        item.custom_note && item.custom_note.trim().length > 0
      );

      const note_lbl_text = current_lang === "IDN" ? "Catatan:" : "Note:";
      const note_none_text =
        current_lang === "IDN" ? "Tidak ada" : "None";
      const note_display = has_note
        ? `${note_lbl_text} ${item.custom_note}`
        : `${note_lbl_text} ${note_none_text}`;

      const unit_price_label_text =
        current_lang === "IDN" ? "Harga Satuan" : "Unit Price";
      const note_placeholder =
        current_lang === "IDN"
          ? "Masukkan catatan khusus..."
          : "Enter custom note...";

      const is_editing_note = active_editing_item_id === item.id;

      let note_markup = "";
      if (is_editing_note) {
        note_markup = `
          <form class="note_edit_form" data-item-id="${item.id}">
            <input type="text" class="note_edit_input" value="${item.custom_note || ""}" placeholder="${note_placeholder}" autofocus>
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
        <img src="${item.image}" alt="${localized_pack_name}" class="item_thumb">

        <button type="button" class="item_delete_btn" data-item-id="${item.id}" aria-label="Remove ${localized_pack_name} from cart" title="Delete item">
          <i class="fa-regular fa-trash-can"></i>
        </button>

        <div class="item_details">
          <div class="item_top_row">
            <span class="item_tag_pill">${localized_category}</span>
            <h3 class="item_title">${localized_pack_name}</h3>
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
              <span class="unit_price_label">${unit_price_label_text}</span>
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
  // 9. WhatsApp Pre-Order COD Checkout
  // ==========================================
  if (proceed_checkout_btn) {
    proceed_checkout_btn.addEventListener("click", async () => {
      const cart_items = get_cart_items();
      const current_lang = get_saved_lang();

      if (cart_items.length === 0) {
        const alert_text =
          receipt_translations[current_lang]?.empty_cart_alert ||
          receipt_translations.ENG.empty_cart_alert;
        alert(alert_text);
        return;
      }

      const current_timestamp = format_order_timestamp(new Date());
      let grand_total = 0;

      let items_text_block = "";
      cart_items.forEach((item, index) => {
        const item_total = Number(item.unit_price) * Number(item.quantity);
        grand_total += item_total;

        const pack_meta = catalog_defaults[item.pack_key] || null;
        const item_title = pack_meta
          ? current_lang === "IDN"
            ? pack_meta.pack_name_id
            : pack_meta.pack_name_en
          : item.pack_name;

        const color_display =
          item.selected_color || item.flower_color || "Sky Blue";
        const note_display =
          item.custom_note && item.custom_note.trim()
            ? item.custom_note.trim()
            : current_lang === "IDN"
            ? "Tidak ada"
            : "None";

        if (current_lang === "IDN") {
          items_text_block += `${index + 1}. *${item_title}* (x${item.quantity})\n`;
          items_text_block += `   • Warna Bunga: ${color_display}\n`;
          items_text_block += `   • Catatan Khusus: ${note_display}\n`;
          items_text_block += `   • Harga: ${format_currency_unit(item.unit_price)} × ${item.quantity} = ${format_currency_unit(item_total)}\n\n`;
        } else {
          items_text_block += `${index + 1}. *${item_title}* (x${item.quantity})\n`;
          items_text_block += `   • Flower Color: ${color_display}\n`;
          items_text_block += `   • Custom Note: ${note_display}\n`;
          items_text_block += `   • Price: ${format_currency_unit(item.unit_price)} × ${item.quantity} = ${format_currency_unit(item_total)}\n\n`;
        }
      });

      const formatted_grand_total = format_currency_summary(grand_total);

      let wa_message = "";
      if (current_lang === "IDN") {
        wa_message =
          `Halo Admin ReBloom! Saya ingin memesan Pre-Order (Cash on Delivery):\n\n` +
          `*Tanggal Pesanan:* ${current_timestamp}\n` +
          `*Metode Pembayaran:* Tunai Saja (Pre-Order COD)\n` +
          `*Metode Pengiriman:* Serah Terima Langsung / Terjadwal via WhatsApp\n\n` +
          `*Daftar Produk:*\n${items_text_block}` +
          `*Biaya Kemasan & Daur Ulang:* GRATIS\n` +
          `*Biaya Pengiriman:* GRATIS (AMBIL COD)\n` +
          `*Total:* ${formatted_grand_total}\n\n` +
          `Mohon konfirmasi detail pesanan pre-order saya. Terima kasih!`;
      } else {
        wa_message =
          `Hello ReBloom Admin! I would like to place a Pre-Order (Cash on Delivery):\n\n` +
          `*Order Date:* ${current_timestamp}\n` +
          `*Payment Method:* Cash Only (Pre-Order COD)\n` +
          `*Delivery Mode:* Direct Handover / WhatsApp Scheduled\n\n` +
          `*Order Items:*\n${items_text_block}` +
          `*Packaging & Recycling:* FREE\n` +
          `*Shipping Fee:* FREE (COD PICKUP)\n` +
          `*Grand Total:* ${formatted_grand_total}\n\n` +
          `Please confirm my pre-order details. Thank you!`;
      }

      const encoded_wa_url = `https://wa.me/${admin_whatsapp_phone}?text=${encodeURIComponent(wa_message)}`;

      const original_btn_html = proceed_checkout_btn.innerHTML;
      const feedback_text =
        receipt_translations[current_lang]?.copy_btn_feedback ||
        receipt_translations.ENG.copy_btn_feedback;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(wa_message);
          proceed_checkout_btn.innerHTML = `<span>${feedback_text}</span> <i class="fa-solid fa-arrow-right"></i>`;
        }
      } catch (clip_err) {
      }

      setTimeout(() => {
        window.open(encoded_wa_url, "_blank", "noopener,noreferrer");
        proceed_checkout_btn.innerHTML = original_btn_html;
      }, 350);
    });
  }

  // Mengelola navigasi seluler (tombol hamburger dan drawer menu).
  function init_mobile_nav() {
    const menu_btn = document.querySelector(".nav_menu_btn");
    const nav_menu = document.querySelector(".nav_mid");
    const nav_links = document.querySelectorAll(".nav_link");

    if (!menu_btn || !nav_menu) return;

    menu_btn.addEventListener("click", () => {
      const is_open = nav_menu.classList.toggle("is_open");
      menu_btn.setAttribute("aria-expanded", is_open ? "true" : "false");
      const icon = menu_btn.querySelector("i");
      if (icon) {
        icon.className = is_open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    nav_links.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav_menu.classList.contains("is_open")) {
          nav_menu.classList.remove("is_open");
          menu_btn.setAttribute("aria-expanded", "false");
          const icon = menu_btn.querySelector("i");
          if (icon) {
            icon.className = "fa-solid fa-bars";
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && nav_menu.classList.contains("is_open")) {
        nav_menu.classList.remove("is_open");
        menu_btn.setAttribute("aria-expanded", "false");
        const icon = menu_btn.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      }
    });
  }

  init_language_switcher();
  init_mobile_nav();
});
