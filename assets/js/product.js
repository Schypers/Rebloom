/**
 * ReBloom - Product Detail & Configurator Controller (product.html)
 * Pure vanilla ES6+ JavaScript enforcing strict snake_case identifiers.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Pack Catalog Data Contract
  // ==========================================
  const pack_catalog = {
    regular: {
      key: "regular",
      pack_num: 1,
      title: "Flower Pot Regular",
      category: "Handcrafted",
      description:
        "Bring beauty and a warm atmosphere into your space with our signature handcrafted recycled plastic floral pot. Select and request your preferred flower and pot colors.",
      unit_price: 10000,
      page_url: "product.html",
      image: "assets/images/Product_1.jpg",
      gallery: [
        "assets/images/Product_1.jpg",
        "assets/images/Product_1_Desk.jpg",
        "assets/images/Product_1_Makro.jpg",
        "assets/images/Product_1_Black.jpg",
      ],
    },
    bird_gift: {
      key: "bird_gift",
      pack_num: 2,
      title: "Flower Bird Gift",
      category: "Handcrafted",
      description:
        "A charming handcrafted recycled floral arrangement paired with a custom Birthday Card & Envelope—perfect for gifting to someone special.",
      unit_price: 12000,
      page_url: "product_2.html",
      image: "assets/images/Product_2.jpg",
      gallery: [
        "assets/images/Product_2.jpg",
        "assets/images/Product_2_Desk.jpg",
        "assets/images/Product_2_Makro.jpg",
        "assets/images/Product_2_Black.jpg",
      ],
    },
    lamp_pot: {
      key: "lamp_pot",
      pack_num: 3,
      title: "Lamp Flower Pot",
      category: "Recycled Plastic",
      description:
        "Illuminate your room with our handcrafted recycled floral vase enhanced with warm, cute LED fairy lights and custom petal colors.",
      unit_price: 15000,
      page_url: "product_3.html",
      image: "assets/images/Product_3.jpg",
      gallery: [
        "assets/images/Product_3.jpg",
        "assets/images/Product_3_Desk.jpg",
        "assets/images/Product_3_Makro.jpg",
        "assets/images/Product_3_Black.jpg",
      ],
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
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
  // 3. Farthest-Left Thumbnail Queue Rotation
  // ==========================================
  const main_img = document.getElementById("prod_main_img");
  const thumb_items = document.querySelectorAll(".prod_thumb");

  function init_gallery_swapper() {
    if (!main_img || thumb_items.length === 0) return;

    main_img.style.transition = "opacity 0.15s ease";

    thumb_items.forEach((thumb, clicked_index) => {
      thumb.addEventListener("click", () => {
        const thumb_img_elements = Array.from(
          document.querySelectorAll(".prod_thumb .prod_thumb_img")
        );
        const clicked_thumb_img = thumb_img_elements[clicked_index];
        if (!clicked_thumb_img) return;

        const old_main_src = main_img.getAttribute("src");
        const old_main_alt = main_img.getAttribute("alt");
        const new_main_src = clicked_thumb_img.getAttribute("src");
        const new_main_alt = clicked_thumb_img.getAttribute("alt");

        if (old_main_src === new_main_src) return;

        // Collect current thumbnail attributes
        const current_thumbs = thumb_img_elements.map((el) => ({
          src: el.getAttribute("src"),
          alt: el.getAttribute("alt"),
        }));

        // Remove clicked thumbnail from array
        current_thumbs.splice(clicked_index, 1);

        // Place old main preview into farthest-left slot (index 0)
        current_thumbs.unshift({
          src: old_main_src,
          alt: old_main_alt,
        });

        // Smooth 150ms opacity transition
        main_img.style.opacity = "0.3";
        setTimeout(() => {
          main_img.setAttribute("src", new_main_src);
          main_img.setAttribute("alt", new_main_alt);

          thumb_img_elements.forEach((el, idx) => {
            if (current_thumbs[idx]) {
              el.setAttribute("src", current_thumbs[idx].src);
              el.setAttribute("alt", current_thumbs[idx].alt);
            }
          });

          main_img.style.opacity = "1";
        }, 150);
      });
    });
  }

  // ==========================================
  // 4. Product Configurator, Routing & Checkout
  // ==========================================
  const product_detail_sec = document.getElementById("product_detail");
  if (product_detail_sec) {
    const prod_title_el = document.getElementById("prod_title");
    const prod_desc_el = document.getElementById("prod_desc");
    const price_val_el = document.getElementById("price_val");
    const qty_val_el = document.querySelector(".qty_val");
    const qty_minus_btn = document.querySelector(".qty_minus");
    const qty_plus_btn = document.querySelector(".qty_plus");
    const note_input = document.getElementById("custom_note");
    const buy_btn = document.querySelector(".prod_buy_btn");
    const color_swatches = document.querySelectorAll(".color_swatch");
    const rel_container = document.querySelector("#related_products .rel_left");

    function get_initial_pack_key() {
      const url_params = new URLSearchParams(window.location.search);
      const param_pack = url_params.get("pack");
      if (param_pack && pack_catalog[param_pack]) {
        return param_pack;
      }

      const current_path = window.location.pathname.toLowerCase();
      if (
        current_path.includes("product_3") ||
        current_path.includes("product3") ||
        current_path.includes("lamp")
      ) {
        return "lamp_pot";
      }

      if (
        current_path.includes("product_2") ||
        current_path.includes("product2") ||
        current_path.includes("bird") ||
        current_path.includes("birthday")
      ) {
        return "bird_gift";
      }

      return "regular";
    }

    let active_pack_key = get_initial_pack_key();

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

    function switch_active_pack(new_pack_key) {
      const target_pack = pack_catalog[new_pack_key];
      if (!target_pack) return;
      window.location.href = target_pack.page_url;
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

      // Synchronize 4-photo gallery
      if (main_img && pack_data.gallery && pack_data.gallery.length >= 4) {
        main_img.setAttribute("src", pack_data.gallery[0]);
        main_img.setAttribute("alt", pack_data.title);

        const thumb_img_elements = Array.from(
          document.querySelectorAll(".prod_thumb .prod_thumb_img")
        );
        if (thumb_img_elements.length >= 3) {
          thumb_img_elements[0].setAttribute("src", pack_data.gallery[1]);
          thumb_img_elements[0].setAttribute("alt", `${pack_data.title} Desk View`);
          thumb_img_elements[1].setAttribute("src", pack_data.gallery[2]);
          thumb_img_elements[1].setAttribute("alt", `${pack_data.title} Macro View`);
          thumb_img_elements[2].setAttribute("src", pack_data.gallery[3]);
          thumb_img_elements[2].setAttribute("alt", `${pack_data.title} Black Background View`);
        }
      }

      update_price_display();
      render_related_packs(pack_key);
    }

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

    // Initialize Product Details & Gallery Swapper
    render_pack_details(active_pack_key);
    init_gallery_swapper();

    // Buy Button - Bundle Order Payload, Persist to Cart, and Navigate to receipt.html
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

        const cart_item = {
          id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          pack_key: active_pack_key,
          pack_name: active_pack.title,
          category: active_pack.category,
          image: active_pack.image,
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

        // Persist to localStorage cart array
        try {
          const raw_cart = localStorage.getItem("rebloom_cart");
          let cart_array = [];
          if (raw_cart) {
            cart_array = JSON.parse(raw_cart) || [];
          }

          // Check if identical item already exists in cart
          const existing_idx = cart_array.findIndex(
            (item) =>
              item.pack_key === cart_item.pack_key &&
              item.selected_color === cart_item.selected_color &&
              item.custom_note === cart_item.custom_note
          );

          if (existing_idx !== -1) {
            cart_array[existing_idx].quantity += order_qty;
          } else {
            cart_array.push(cart_item);
          }

          localStorage.setItem("rebloom_cart", JSON.stringify(cart_array));
        } catch (storage_err) {
          // Graceful fallback
        }

        sessionStorage.setItem("rebloom_order", JSON.stringify(cart_item));
        window.location.href = "receipt.html";
      });
    }
  }

  // ==========================================
  // 5. Language Switcher Controller (product.html)
  // ==========================================
  const lang_buttons = document.querySelectorAll(".lang_switch .lang_btn");
  if (lang_buttons.length > 0) {
    lang_buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        lang_buttons.forEach((other_btn) => other_btn.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // ==========================================
  // 6. Static Contact Form Handler (product.html)
  // ==========================================
  const contact_form = document.getElementById("contact_form");
  if (contact_form) {
    contact_form.addEventListener("submit", (submit_event) => {
      submit_event.preventDefault();
      alert("Thank you for contacting ReBloom! We will get back to you shortly.");
      contact_form.reset();
    });
  }
});
