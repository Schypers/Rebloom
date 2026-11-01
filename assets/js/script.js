/**
 * ReBloom - Core Frontend Application Logic
 * Pure vanilla ES6+ JavaScript enforcing strict snake_case identifiers.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Pack Catalog Data Contract
  // ==========================================
  const pack_catalog = {
    regular: {
      key: "regular",
      title: "Flower Pot Regular",
      description:
        "Bring beauty and a warm atmosphere into your space with our signature handcrafted recycled plastic floral pot. Select and request your preferred flower and pot colors.",
      unit_price: 10000,
      image: "assets/images/Product_img.jpg",
    },
    bird_gift: {
      key: "bird_gift",
      title: "Flower Bird Gift",
      description:
        "A charming handcrafted recycled floral arrangement paired with a custom Birthday Card & Envelope—perfect for gifting to someone special.",
      unit_price: 12000,
      image: "assets/images/Product_thumbnail.jpg",
    },
    lamp_pot: {
      key: "lamp_pot",
      title: "Lamp Flower Pot",
      description:
        "Illuminate your room with our handcrafted recycled floral vase enhanced with warm, cute LED fairy lights and custom petal colors.",
      unit_price: 15000,
      image: "assets/images/Product_img_4.jpg",
    },
  };

  // ==========================================
  // 2. Data Formatting Utilities
  // ==========================================
  function format_idr(amount) {
    const formatted_num = Number(amount || 0).toLocaleString("id-ID");
    return `Rp ${formatted_num},00`;
  }

  function format_order_timestamp(date_obj = new Date()) {
    const day_str = String(date_obj.getDate()).padStart(2, "0");
    const month_names = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month_str = month_names[date_obj.getMonth()];
    const year_str = date_obj.getFullYear();

    let hours = date_obj.getHours();
    const minutes = String(date_obj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hour_str = String(hours).padStart(2, "0");

    return `${day_str} ${month_str} ${year_str}, ${hour_str}:${minutes} ${ampm}`;
  }

  // ==========================================
  // 3. FAQ Accordion Controller (index.html)
  // ==========================================
  const faq_items = document.querySelectorAll(".faq_item");
  if (faq_items.length > 0) {
    faq_items.forEach((item) => {
      const q_header = item.querySelector(".faq_q");
      const q_icon = item.querySelector(".faq_icon");

      if (!q_header) return;

      q_header.addEventListener("click", () => {
        const is_active = item.classList.contains("active");

        // Close all open sibling items
        faq_items.forEach((other_item) => {
          other_item.classList.remove("active");
          const other_icon = other_item.querySelector(".faq_icon");
          if (other_icon) {
            other_icon.className = "fa-solid fa-chevron-right faq_icon";
          }
        });

        // Toggle selected item
        if (!is_active) {
          item.classList.add("active");
          if (q_icon) {
            q_icon.className = "fa-solid fa-chevron-up faq_icon";
          }
        }
      });
    });
  }

  // ==========================================
  // 4. Navbar Scroll Spy (index.html)
  // ==========================================
  const nav_sections = document.querySelectorAll("section[id]");
  const nav_links = document.querySelectorAll(".nav_link");

  if (nav_sections.length > 0 && nav_links.length > 0) {
    window.addEventListener("scroll", () => {
      let current_section_id = "";
      const scroll_position = window.scrollY + 200;

      nav_sections.forEach((section) => {
        const section_top = section.offsetTop;
        const section_height = section.offsetHeight;

        if (
          scroll_position >= section_top &&
          scroll_position < section_top + section_height
        ) {
          current_section_id = section.getAttribute("id");
        }
      });

      nav_links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current_section_id}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // ==========================================
  // 5. Product Gallery Thumbnail Swapper (product.html)
  // ==========================================
  const main_img = document.getElementById("prod_main_img");
  const thumb_items = document.querySelectorAll(".prod_thumb");

  if (main_img && thumb_items.length > 0) {
    thumb_items.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const thumb_img = thumb.querySelector(".prod_thumb_img");
        if (!thumb_img) return;

        const current_main_src = main_img.getAttribute("src");
        const current_thumb_src = thumb_img.getAttribute("src");
        const current_main_alt = main_img.getAttribute("alt");
        const current_thumb_alt = thumb_img.getAttribute("alt");

        main_img.style.opacity = "0.3";
        setTimeout(() => {
          main_img.setAttribute("src", current_thumb_src);
          main_img.setAttribute("alt", current_thumb_alt);
          thumb_img.setAttribute("src", current_main_src);
          thumb_img.setAttribute("alt", current_main_alt);
          main_img.style.opacity = "1";
        }, 150);
      });
    });
  }

  // ==========================================
  // 6. Product Configurator, Routing & Checkout (product.html)
  // ==========================================
  const product_detail_sec = document.getElementById("product_detail");
  if (product_detail_sec) {
    const prod_title_el = document.getElementById("prod_title");
    const prod_desc_el = document.getElementById("prod_desc");
    const prod_main_img_el = document.getElementById("prod_main_img");
    const price_val_el = document.getElementById("price_val");
    const qty_val_el = document.querySelector(".qty_val");
    const qty_minus_btn = document.querySelector(".qty_minus");
    const qty_plus_btn = document.querySelector(".qty_plus");
    const note_input = document.getElementById("custom_note");
    const buy_btn = document.querySelector(".prod_buy_btn");
    const color_swatches = document.querySelectorAll(".color_swatch");
    const rel_container = document.querySelector(
      "#related_products .rel_left"
    );

    let active_pack_key = "regular";
    const initial_url_params = new URLSearchParams(window.location.search);
    const initial_param_pack = initial_url_params.get("pack");
    if (initial_param_pack && pack_catalog[initial_param_pack]) {
      active_pack_key = initial_param_pack;
    }

    function get_current_qty() {
      if (!qty_val_el) return 1;
      const parsed_val = parseInt(qty_val_el.textContent.trim(), 10);
      return isNaN(parsed_val) || parsed_val < 1 ? 1 : parsed_val;
    }

    function update_price_display() {
      if (!price_val_el) return;
      const pack_data = pack_catalog[active_pack_key];
      const qty = get_current_qty();
      const calculated_total = pack_data.unit_price * qty;
      price_val_el.textContent = calculated_total.toLocaleString("id-ID");
    }

    function render_related_packs(current_key) {
      if (!rel_container) return;

      const other_keys = Object.keys(pack_catalog).filter(
        (key) => key !== current_key
      );

      rel_container.innerHTML = "";

      other_keys.forEach((key) => {
        const rel_pack = pack_catalog[key];
        const card_el = document.createElement("div");
        card_el.className = "rel_card";
        card_el.innerHTML = `
          <div class="rel_img_box">
            <img src="${rel_pack.image}" alt="${rel_pack.title}" class="rel_img">
          </div>
          <h3 class="rel_card_title">${rel_pack.title}</h3>
          <div class="rel_card_rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <span class="rel_card_count">(10)</span>
          </div>
          <div class="rel_card_price">
            <span class="price_curr_sm">Rp</span>
            <span class="price_val_sm">${rel_pack.unit_price.toLocaleString("id-ID")}</span>
          </div>
          <button type="button" class="btn btn_primary rel_btn" data-pack="${key}">Switch / Order Pack</button>
        `;

        const switch_btn = card_el.querySelector(".rel_btn");
        if (switch_btn) {
          switch_btn.addEventListener("click", () => {
            switch_active_pack(key);
          });
        }

        rel_container.appendChild(card_el);
      });
    }

    function render_pack_details(pack_key) {
      const pack_data = pack_catalog[pack_key];
      if (!pack_data) return;

      active_pack_key = pack_key;

      if (prod_title_el) {
        prod_title_el.textContent = pack_data.title;
      }
      if (prod_desc_el) {
        prod_desc_el.textContent = pack_data.description;
      }
      if (prod_main_img_el) {
        prod_main_img_el.setAttribute("src", pack_data.image);
        prod_main_img_el.setAttribute("alt", pack_data.title);
      }

      update_price_display();
      render_related_packs(pack_key);
    }

    function switch_active_pack(new_pack_key) {
      if (!pack_catalog[new_pack_key]) return;
      const new_url = `${window.location.pathname}?pack=${new_pack_key}`;
      window.history.pushState({ pack: new_pack_key }, "", new_url);
      render_pack_details(new_pack_key);
      product_detail_sec.scrollIntoView({ behavior: "smooth" });
    }

    // Handle browser back/forward history navigation
    window.addEventListener("popstate", () => {
      const pop_params = new URLSearchParams(window.location.search);
      const pop_pack = pop_params.get("pack");
      if (pop_pack && pack_catalog[pop_pack]) {
        render_pack_details(pop_pack);
      } else {
        render_pack_details("regular");
      }
    });

    // Color Swatch Selection Handler
    if (color_swatches.length > 0) {
      color_swatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
          color_swatches.forEach((item) => item.classList.remove("active"));
          swatch.classList.add("active");
        });
      });
    }

    // Quantity Stepper Controls (Minimum limit: 1)
    if (qty_minus_btn && qty_plus_btn && qty_val_el) {
      qty_minus_btn.addEventListener("click", () => {
        let current_qty = get_current_qty();
        if (current_qty > 1) {
          current_qty -= 1;
          qty_val_el.textContent = current_qty;
          update_price_display();
        }
      });

      qty_plus_btn.addEventListener("click", () => {
        let current_qty = get_current_qty();
        current_qty += 1;
        qty_val_el.textContent = current_qty;
        update_price_display();
      });
    }

    // Initialize Product Details
    render_pack_details(active_pack_key);

    // Buy Button - Bundle Order Payload & Navigate to receipt.html
    if (buy_btn) {
      buy_btn.addEventListener("click", () => {
        const active_swatch = document.querySelector(".color_swatch.active");
        const selected_color = active_swatch
          ? active_swatch.getAttribute("data-color") || "Sky Blue"
          : "Sky Blue";
        const selected_hex = active_swatch
          ? active_swatch.getAttribute("data-hex") || "#0084FF"
          : "#0084FF";
        const order_qty = get_current_qty();
        const custom_note_val = note_input ? note_input.value.trim() : "";
        const active_pack = pack_catalog[active_pack_key];
        const unit_price = active_pack.unit_price;
        const total_price_num = unit_price * order_qty;

        const formatted_unit = format_idr(unit_price);
        const formatted_total = format_idr(total_price_num);
        const order_date_formatted = format_order_timestamp(new Date());

        const rebloom_order = {
          pack_key: active_pack_key,
          pack_name: active_pack.title,
          unit_price: unit_price,
          quantity: order_qty,
          selected_color: selected_color,
          flower_color: selected_color,
          color_hex: selected_hex,
          custom_note: custom_note_val,
          item_price: formatted_unit,
          total_price: formatted_total,
          total_price_num: total_price_num,
          order_date: order_date_formatted,
          payment_method: "Cash Only (Pre-Order COD)",
        };

        sessionStorage.setItem(
          "rebloom_order",
          JSON.stringify(rebloom_order)
        );
        window.location.href = "receipt.html";
      });
    }
  }

  // ==========================================
  // 7. Order Receipt Dynamic Hydration & WhatsApp Handoff (receipt.html)
  // ==========================================
  const rcpt_card = document.querySelector(".rcpt_card");
  if (rcpt_card) {
    const stored_order_data = sessionStorage.getItem("rebloom_order");
    if (stored_order_data) {
      try {
        const parsed_order = JSON.parse(stored_order_data);

        // Populate Order Metadata
        const info_vals = rcpt_card.querySelectorAll(".info_val");
        if (info_vals.length > 0 && parsed_order.order_date) {
          info_vals[0].textContent = parsed_order.order_date;
        }
        if (info_vals.length > 1) {
          info_vals[1].textContent = "Cash Only (Pre-Order COD)";
        }

        // Populate Line Item Details
        const item_name_el = rcpt_card.querySelector(".item_name");
        if (item_name_el && parsed_order.pack_name) {
          item_name_el.textContent = `${parsed_order.quantity}x ${parsed_order.pack_name}`;
        }

        // Color indicator dot
        const custom_dot_el = rcpt_card.querySelector(".custom_dot");
        if (custom_dot_el && parsed_order.color_hex) {
          custom_dot_el.style.backgroundColor = parsed_order.color_hex;
        }

        // Color & Custom note display
        const custom_text_el = rcpt_card.querySelector(".custom_text");
        if (custom_text_el) {
          const color_name =
            parsed_order.selected_color ||
            parsed_order.flower_color ||
            "Sky Blue";
          if (parsed_order.custom_note) {
            custom_text_el.textContent = `${color_name}, “${parsed_order.custom_note}”`;
          } else {
            custom_text_el.textContent = `${color_name} (No custom note)`;
          }
        }

        // Price Displays
        const item_price_el = rcpt_card.querySelector(".item_price");
        if (item_price_el && parsed_order.total_price) {
          item_price_el.textContent = parsed_order.total_price;
        }

        const total_val_el = rcpt_card.querySelector(".total_val");
        if (total_val_el && parsed_order.total_price) {
          total_val_el.textContent = parsed_order.total_price;
        }

        // Construct plain-text WhatsApp order receipt message
        const admin_btn = document.getElementById("btn_admin");
        if (admin_btn) {
          const color_display =
            parsed_order.selected_color ||
            parsed_order.flower_color ||
            "Sky Blue";
          const note_display = parsed_order.custom_note
            ? `"${parsed_order.custom_note}"`
            : "(No custom note)";

          const wa_message = `Hello ReBloom Admin! Here is my Pre-Order Receipt:\n\n*Order Date:* ${parsed_order.order_date}\n*Payment Method:* ${parsed_order.payment_method || "Cash Only (Pre-Order COD)"}\n*Pack Name:* ${parsed_order.pack_name}\n*Quantity:* ${parsed_order.quantity}\n*Unit Price:* ${parsed_order.item_price}\n*Flower Color:* ${color_display}\n*Custom Note:* ${note_display}\n*Total Price:* ${parsed_order.total_price}\n\nPlease confirm my order. Thank you!`;

          const wa_encoded = encodeURIComponent(wa_message);
          const wa_url = `https://wa.me/6282132829795?text=${wa_encoded}`;
          admin_btn.setAttribute("href", wa_url);

          admin_btn.addEventListener("click", async (click_event) => {
            click_event.preventDefault();
            const original_btn_text = admin_btn.textContent;

            try {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(wa_message);
                admin_btn.textContent = "Receipt Copied! Opening WhatsApp...";
              }
            } catch (clip_err) {
              // Graceful fallback if clipboard permission is denied or unsupported
            }

            setTimeout(() => {
              window.open(wa_url, "_blank", "noopener,noreferrer");
              admin_btn.textContent = original_btn_text;
            }, 350);
          });
        }
      } catch (err) {
        // Graceful error handling
      }
    }
  }

  // ==========================================
  // 8. Static Contact Form Handler
  // ==========================================
  const contact_form = document.getElementById("contact_form");
  if (contact_form) {
    contact_form.addEventListener("submit", (submit_event) => {
      submit_event.preventDefault();
      alert(
        "Thank you for contacting ReBloom! We will get back to you shortly."
      );
      contact_form.reset();
    });
  }
});
