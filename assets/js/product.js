document.addEventListener("DOMContentLoaded", () => {
  const pack_catalog = {
    regular: {
      key: "regular",
      pack_num: 1,
      title_en: "Flower Pot Regular",
      title_id: "Pot Bunga Reguler",
      category_en: "Handcrafted",
      category_id: "Buatan Tangan",
      desc_en:
        "Bring beauty and a warm atmosphere into your space with our signature handcrafted recycled plastic floral pot. Select and request your preferred flower and pot colors.",
      desc_id:
        "Hadirkan keindahan dan suasana hangat ke dalam ruangan Anda dengan pot bunga plastik daur ulang buatan tangan khas kami. Pilih dan pesan warna bunga serta pot favorit Anda.",
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
      title_en: "Flower Bird Gift",
      title_id: "Hadiah Bunga Spesial",
      category_en: "Handcrafted",
      category_id: "Buatan Tangan",
      desc_en:
        "A charming handcrafted recycled floral arrangement paired with a custom Birthday Card & Envelope—perfect for gifting to someone special.",
      desc_id:
        "Rangkaian bunga plastik daur ulang buatan tangan yang menawan dipadukan dengan Kartu Ucapan & Amplop kustom—sempurna untuk hadiah orang terspesial.",
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
      title_en: "Lamp Flower Pot",
      title_id: "Pot Bunga Lampu LED",
      category_en: "Recycled Plastic",
      category_id: "Plastik Daur Ulang",
      desc_en:
        "Illuminate your room with our handcrafted recycled floral vase enhanced with warm, cute LED fairy lights and custom petal colors.",
      desc_id:
        "Terangi ruangan Anda dengan vas bunga daur ulang buatan tangan yang dipercantik lampu LED hangat yang indah dan warna kelopak pilihan.",
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


  const product_translations = {
    ENG: {
      nav_home: "Home",
      nav_about: "About",
      nav_products: "Product",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_cart: "Cart",
      prod_reviews: "5.0 | 12 Reviews",
      config_color_lbl: "Flower Color",
      config_qty_lbl: "Quantity",
      config_note_lbl: "Note",
      config_note_placeholder:
        "Have a special request? Leave a note for our admin.",
      prod_sec_pay: 'Secure Payment By <span class="sec_pay_brand">ReBloom</span>',
      prod_buy_btn: "BUY NOW",
      rel_title: 'FIND RELATED<br><span class="hl_red">PRODUCTS</span>',
      rel_desc:
        "Looking for more? Explore similar products and discover new styles that match your taste.",
      rel_switch_btn: "Switch / Order Pack",
      contact_title: 'Have More<br><span class="hl_red">Questions</span> In Mind?',
      contact_sub: "Write Down Your Thoughts, And Contact Us!",
      contact_name_lbl: "Your Name",
      contact_name_placeholder: "Your full name...",
      contact_email_lbl: "Email Address",
      contact_email_placeholder: "Your email address...",
      contact_msg_lbl: "Message",
      contact_msg_placeholder: "Write down your message here...",
      contact_submit_btn: "Send Your Message",
      footer_copy: "© 2026 ReBloom. Creative Handicrafts & Sustainable Decor.",
      contact_success_alert:
        "Thank you for contacting ReBloom! We will get back to you shortly.",
    },
    IDN: {
      nav_home: "Beranda",
      nav_about: "Tentang",
      nav_products: "Produk",
      nav_faq: "FAQ",
      nav_contact: "Kontak",
      nav_cart: "Keranjang",
      prod_reviews: "5.0 | 12 Ulasan",
      config_color_lbl: "Warna Bunga",
      config_qty_lbl: "Jumlah",
      config_note_lbl: "Catatan",
      config_note_placeholder:
        "Punya permintaan khusus? Tinggalkan catatan untuk admin kami.",
      prod_sec_pay:
        'Pembayaran Aman Oleh <span class="sec_pay_brand">ReBloom</span>',
      prod_buy_btn: "BELI SEKARANG",
      rel_title: 'TEMUKAN PRODUK<br><span class="hl_red">TERKAIT</span>',
      rel_desc:
        "Mencari yang lain? Jelajahi produk serupa dan temukan gaya baru yang sesuai selera Anda.",
      rel_switch_btn: "Ganti / Pesan Paket",
      contact_title: 'Punya<br><span class="hl_red">Pertanyaan</span> Lain?',
      contact_sub: "Tuliskan Pesan Anda, dan Hubungi Kami!",
      contact_name_lbl: "Nama Anda",
      contact_name_placeholder: "Nama lengkap Anda...",
      contact_email_lbl: "Alamat Email",
      contact_email_placeholder: "Alamat email Anda...",
      contact_msg_lbl: "Pesan",
      contact_msg_placeholder: "Tulis pesan Anda di sini...",
      contact_submit_btn: "Kirim Pesan Anda",
      footer_copy:
        "© 2026 ReBloom. Kerajinan Tangan Kreatif & Dekorasi Berkelanjutan.",
      contact_success_alert:
        "Terima kasih telah menghubungi ReBloom! Kami akan segera membalas pesan Anda.",
    },
  };


  function get_saved_lang() {
    const saved_lang = localStorage.getItem("rebloom_lang");
    return saved_lang === "IDN" || saved_lang === "ENG" ? saved_lang : "ENG";
  }

  function apply_page_translation(target_lang) {
    const translations =
      product_translations[target_lang] || product_translations.ENG;

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

    if (typeof render_pack_details === "function" && active_pack_key) {
      render_pack_details(active_pack_key);
    }
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



  function format_idr(amount) {
    const formatted_num = Number(amount || 0).toLocaleString("id-ID");
    return `Rp ${formatted_num},00`;
  }

  function format_order_timestamp(date_obj = new Date()) {
    const day_str = String(date_obj.getDate()).padStart(2, "0");
    const month_names = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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


        const current_thumbs = thumb_img_elements.map((el) => ({
          src: el.getAttribute("src"),
          alt: el.getAttribute("alt"),
        }));


        current_thumbs.splice(clicked_index, 1);


        current_thumbs.unshift({
          src: old_main_src,
          alt: old_main_alt,
        });


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



  const product_detail_sec = document.getElementById("product_detail");
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

    const current_lang = get_saved_lang();
    const other_keys = Object.keys(pack_catalog).filter(
      (key) => key !== current_key
    );

    rel_container.innerHTML = "";
    const switch_btn_label =
      product_translations[current_lang]?.rel_switch_btn ||
      product_translations.ENG.rel_switch_btn;

    other_keys.forEach((key) => {
      const rel_pack = pack_catalog[key];
      const rel_title =
        current_lang === "IDN" ? rel_pack.title_id : rel_pack.title_en;
      const card_el = document.createElement("div");
      card_el.className = "rel_card";
      card_el.innerHTML = `
        <div class="rel_img_box">
          <img src="${rel_pack.image}" alt="${rel_title}" class="rel_img">
        </div>
        <h3 class="rel_card_title">${rel_title}</h3>
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
        <button type="button" class="btn btn_primary rel_btn" data-pack="${key}">${switch_btn_label}</button>
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
    const current_lang = get_saved_lang();
    const localized_title =
      current_lang === "IDN" ? pack_data.title_id : pack_data.title_en;
    const localized_desc =
      current_lang === "IDN" ? pack_data.desc_id : pack_data.desc_en;

    document.title = `ReBloom - ${localized_title}`;

    if (prod_title_el) {
      prod_title_el.textContent = localized_title;
    }
    if (prod_desc_el) {
      prod_desc_el.textContent = localized_desc;
    }


    if (main_img && pack_data.gallery && pack_data.gallery.length >= 4) {
      main_img.setAttribute("src", pack_data.gallery[0]);
      main_img.setAttribute("alt", localized_title);

      const thumb_img_elements = Array.from(
        document.querySelectorAll(".prod_thumb .prod_thumb_img")
      );
      if (thumb_img_elements.length >= 3) {
        thumb_img_elements[0].setAttribute("src", pack_data.gallery[1]);
        thumb_img_elements[0].setAttribute(
          "alt",
          `${localized_title} Desk View`
        );
        thumb_img_elements[1].setAttribute("src", pack_data.gallery[2]);
        thumb_img_elements[1].setAttribute(
          "alt",
          `${localized_title} Macro View`
        );
        thumb_img_elements[2].setAttribute("src", pack_data.gallery[3]);
        thumb_img_elements[2].setAttribute(
          "alt",
          `${localized_title} Black Background View`
        );
      }
    }

    update_price_display();
    render_related_packs(pack_key);
  }



  if (color_swatches.length > 0) {
    color_swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        color_swatches.forEach((item) => item.classList.remove("active"));
        swatch.classList.add("active");
      });
    });
  }



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
        pack_name: active_pack.title_en,
        category: active_pack.category_en,
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

      }

      sessionStorage.setItem("rebloom_order", JSON.stringify(cart_item));
      window.location.href = "receipt.html";
    });
  }



  // ==========================================
  // WhatsApp Contact Form Handoff Handler
  // ==========================================
  const contact_form = document.getElementById("contact_form");
  const admin_wa_number = "6282132829795";

  function build_contact_wa_url(sender_name, sender_email, sender_message, lang) {
    let wa_message_lines = [];

    if (lang === "IDN") {
      wa_message_lines = [
        "Halo Admin ReBloom! Saya ingin bertanya melalui formulir kontak website:",
        "",
        `*Nama:* ${sender_name}`,
        `*Email:* ${sender_email}`,
        "",
        "*Pertanyaan / Pesan:*",
        sender_message,
      ];
    } else {
      wa_message_lines = [
        "Hello ReBloom Admin! I have a question from the website contact form:",
        "",
        `*Name:* ${sender_name}`,
        `*Email:* ${sender_email}`,
        "",
        "*Question / Message:*",
        sender_message,
      ];
    }

    return (
      "https://wa.me/" +
      admin_wa_number +
      "?text=" +
      encodeURIComponent(wa_message_lines.join("\n"))
    );
  }

  function handle_contact_submit(submit_event) {
    submit_event.preventDefault();

    const name_input =
      document.getElementById("user_name") ||
      document.getElementById("sender_name");
    const email_input =
      document.getElementById("user_email") ||
      document.getElementById("sender_email");
    const msg_input =
      document.getElementById("user_msg") ||
      document.getElementById("sender_message");

    const sender_name = name_input ? name_input.value.trim() : "";
    const sender_email = email_input ? email_input.value.trim() : "";
    const sender_message = msg_input ? msg_input.value.trim() : "";

    if (!sender_name) {
      if (name_input) name_input.focus();
      return;
    }

    if (!sender_email) {
      if (email_input) email_input.focus();
      return;
    }

    if (!sender_message) {
      if (msg_input) msg_input.focus();
      return;
    }

    const current_lang = get_saved_lang();
    const wa_url = build_contact_wa_url(
      sender_name,
      sender_email,
      sender_message,
      current_lang
    );

    const wa_window = window.open(wa_url, "_blank");

    if (!wa_window) {
      window.location.href = wa_url;
    }

    contact_form.reset();
  }

  if (contact_form) {
    contact_form.addEventListener("submit", handle_contact_submit);
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

  init_gallery_swapper();
  init_language_switcher();
  init_mobile_nav();
});
