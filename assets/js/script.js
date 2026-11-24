// Menjalankan script setelah HTML selesai dimuat.
document.addEventListener("DOMContentLoaded", () => {

  // Kamus data terjemahan untuk konten teks dalam Bahasa Inggris dan Bahasa Indonesia.
  const landing_translations = {
    ENG: {
      nav_home: "Home",
      nav_about: "About",
      nav_products: "Product",
      nav_faq: "FAQ",
      nav_contact: "Contact",
      nav_cart: "Cart",
      hero_subtitle: "Turning Waste Into<br>Something Beautiful",
      hero_desc:
        "ReBloom creates beautiful handmade flower vases and bouquets from recycled plastic, combining elegance, sustainability, and creative craftsmanship.",
      hero_cta: "See Our Products",
      hero_cta_sub: "Get one for Limited Time Pack now!",
      feat_eco: "Environmentally friendly",
      feat_handmade: "Hand Made",
      feat_affordable: "Affordable prices",
      feat_gift: "Suitable as a gift",
      vision_title: "OUR VISION",
      vision_desc:
        "To create beautiful and unique handmade products while promoting creativity and environmental awareness.",
      mission_title: "OUR MISION",
      mission_item_1: "Reuse plastic waste into useful products.",
      mission_item_2: "Create unique and creative handmade designs.",
      mission_item_3: "Provide quality products made with care.",
      mission_item_4:
        "Encourage people to care for the environment through creativity.",
      origin_title: 'OUR <span class="hl_red">ORIGIN</span>',
      origin_desc:
        "We create beautiful handmade flower vases from recycled plastic, turning simple materials into unique and creative decorations. Each piece is carefully handcrafted with love and creativity while helping reduce plastic waste.",
      why_title: "Why Choose Us",
      why_item_1:
        "Transforming waste plastic into beautiful, aesthetic products to help environment.",
      why_item_2:
        "Each flower and vase is crafted with creativity and exceptional touch, giving it a unique character.",
      why_item_3:
        "Our products are suitable as gifts for loved ones on various occasions.",
      why_item_4:
        "Get unique handmade products at prices that won't break the bank.",
      products_title: 'Explore More Into Our <span class="hl_red">Products</span>',
      prod_1_title: "Flower Pot Regular",
      prod_1_desc:
        "Bring beauty and a warm atmosphere into your space with our signature handcrafted recycled plastic floral pot. Select and request your preferred flower and pot colors.",
      prod_2_title: "Flower Bird Gift",
      prod_2_desc:
        "A charming handcrafted recycled floral arrangement paired with a custom Birthday Card & Envelope—perfect for gifting to someone special.",
      prod_3_title: "Lamp Flower Pot",
      prod_3_desc:
        "Illuminate your room with our handcrafted recycled floral vase enhanced with warm, cute LED fairy lights and custom petal colors.",
      prod_feat_quality: "Premium Quality Materials",
      prod_feat_color: "Request Any Color You Love For Flower",
      prod_feat_price: "Affordable Prices",
      prod_feat_card: "Birthday Card & Envelope",
      prod_feat_led: "Cute LED Lights",
      prod_pack_suffix: "/ pack",
      prod_order_btn: "Order Product",
      faq_title: '<span class="hl_red">Questions</span> Asked By<br>Our Customers',
      faq_desc:
        "A lot of people have been asking us about this and that, please read to find the same issues below.",
      faq_q_1: "What payment methods do you accept?",
      faq_a_1:
        "ReBloom operates exclusively through Pre-Order and Cash on Delivery (COD) / Cash Only. All orders are handcrafted with care and confirmed directly with our admin via WhatsApp upon checkout.",
      faq_q_2: "Can I request the color of the flower and pot?",
      faq_a_2:
        "Unfortunately, we only offer four custom color palettes for the flower petals.",
      faq_q_3: "How long does it take to make the product?",
      faq_a_3:
        "Crafting takes approximately 2-4 business days depending on order volume and the intricacy of your custom request.",
      faq_q_4: "Are the products made from recycled plastic bottles?",
      faq_a_4:
        "Yes, 100% of our materials are sourced from thoroughly cleaned, processed post-consumer recycled plastic bottles.",
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
      hero_subtitle: "Mengubah Limbah Menjadi<br>Sesuatu yang Indah",
      hero_desc:
        "ReBloom menciptakan vas bunga dan buket buatan tangan yang indah dari plastik daur ulang, memadukan keanggunan, keberlanjutan, dan kerajinan kreatif.",
      hero_cta: "Lihat Produk Kami",
      hero_cta_sub: "Dapatkan Paket Edisi Terbatas sekarang!",
      feat_eco: "Ramah Lingkungan",
      feat_handmade: "Buatan Tangan",
      feat_affordable: "Harga Terjangkau",
      feat_gift: "Cocok Sebagai Hadiah",
      vision_title: "VISI KAMI",
      vision_desc:
        "Menciptakan produk buatan tangan yang indah dan unik sekaligus mendorong kreativitas serta kepedulian lingkungan.",
      mission_title: "MISI KAMI",
      mission_item_1: "Mengolah kembali limbah plastik menjadi produk bermanfaat.",
      mission_item_2: "Menciptakan desain buatan tangan yang unik dan kreatif.",
      mission_item_3: "Menghadirkan produk berkualitas yang dibuat dengan ketelitian.",
      mission_item_4:
        "Mengajak masyarakat peduli lingkungan melalui kreativitas.",
      origin_title: 'ASAL <span class="hl_red">KAMI</span>',
      origin_desc:
        "Kami membuat vas bunga buatan tangan yang indah dari plastik daur ulang, mengubah bahan sederhana menjadi dekorasi unik dan kreatif. Setiap produk dirangkai dengan penuh cinta dan kreativitas sekaligus membantu mengurangi limbah plastik.",
      why_title: "Mengapa Memilih Kami",
      why_item_1:
        "Mengubah limbah plastik menjadi produk estetik yang indah untuk membantu lingkungan.",
      why_item_2:
        "Setiap bunga dan vas dirangkai dengan kreativitas dan sentuhan istimewa yang memberikan karakter unik.",
      why_item_3:
        "Produk kami sangat cocok dijadikan hadiah untuk orang tersayang di berbagai momen.",
      why_item_4:
        "Dapatkan produk kerajinan tangan unik dengan harga yang ramah di kantong.",
      products_title: 'Jelajahi Lebih Lanjut <span class="hl_red">Produk Kami</span>',
      prod_1_title: "Pot Bunga Reguler",
      prod_1_desc:
        "Hadirkan keindahan dan suasana hangat ke dalam ruangan Anda dengan pot bunga plastik daur ulang buatan tangan khas kami. Pilih dan pesan warna bunga serta pot favorit Anda.",
      prod_2_title: "Hadiah Bunga Spesial",
      prod_2_desc:
        "Rangkaian bunga plastik daur ulang buatan tangan yang menawan dipadukan dengan Kartu Ucapan & Amplop kustom—sempurna untuk hadiah orang terspesial.",
      prod_3_title: "Pot Bunga Lampu LED",
      prod_3_desc:
        "Terangi ruangan Anda dengan vas bunga daur ulang buatan tangan yang dipercantik lampu LED hangat yang indah dan warna kelopak pilihan.",
      prod_feat_quality: "Bahan Berkualitas Premium",
      prod_feat_color: "Bebas Pilih Warna Bunga Favoritmu",
      prod_feat_price: "Harga Terjangkau",
      prod_feat_card: "Kartu Ucapan & Amplop",
      prod_feat_led: "Lampu LED Cantik",
      prod_pack_suffix: "/ paket",
      prod_order_btn: "Pesan Produk",
      faq_title: '<span class="hl_red">Pertanyaan</span> dari Pelanggan Kami',
      faq_desc:
        "Banyak pelanggan menanyakan berbagai hal kepada kami, silakan baca jawaban atas pertanyaan umum di bawah ini.",
      faq_q_1: "Metode pembayaran apa saja yang diterima?",
      faq_a_1:
        "ReBloom beroperasi secara eksklusif melalui Pre-Order dan Cash on Delivery (COD) / Tunai Saja. Semua pesanan dibuat dengan tangan penuh ketelitian dan dikonfirmasi langsung dengan admin kami via WhatsApp saat checkout.",
      faq_q_2: "Bisakah saya meminta warna bunga dan pot?",
      faq_a_2:
        "Sayangnya, kami hanya menyediakan empat palet warna pilihan untuk kelopak bunga.",
      faq_q_3: "Berapa lama proses pembuatan produk?",
      faq_a_3:
        "Pengerjaan membutuhkan waktu sekitar 2-4 hari kerja tergantung volume pesanan dan tingkat kerumitan permintaan khusus Anda.",
      faq_q_4: "Apakah produk dibuat dari botol plastik daur ulang?",
      faq_a_4:
        "Ya, 100% bahan kami bersumber dari botol plastik bekas daur ulang yang telah dibersihkan dan diproses secara higienis.",
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

  // Mengecek bahasa pengguna dari localStorage atau mengembalikan bahasa Inggris sebagai default.
  function get_saved_lang() {
    const saved_lang = localStorage.getItem("rebloom_lang");
    return saved_lang === "IDN" || saved_lang === "ENG" ? saved_lang : "ENG";
  }

  // Menerapkan teks terjemahan ke seluruh halaman.
  function apply_page_translation(target_lang) {
    const translations =
      landing_translations[target_lang] || landing_translations.ENG;
    // Mengecek satu per satu elemen yang punya atribut data-i18n dan mengganti kontennya dengan terjemahan yang sesuai.
    const translatable_elements = document.querySelectorAll("[data-i18n]");
    translatable_elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = translations[key];
      if (translation !== undefined) {
        // Percabangan untuk merender elemen terjemahan sebagai HTML jika memuat tag atau sebagai teks polos.
        if (translation.includes("<") && translation.includes(">")) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // mengecek untuk translate elemen placeholder yg ada data-i18n-placeholder.
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

  // Menyimpan bahasa pilihan ke penyimpanan lokal, memperbarui atribut HTML, dan menyegarkan tampilan tombol.
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
  }

  // Memasang event listener pada setiap tombol pilihan bahasa serta mengaktifkan bahasa awal.
  function init_language_switcher() {
    const lang_buttons = document.querySelectorAll(".lang_switch .lang_btn");
    if (lang_buttons.length > 0) {
      lang_buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const selected_lang =
            btn.getAttribute("data-lang") || btn.textContent.trim().toUpperCase();
          set_active_lang(selected_lang);
        });
      });
    }

    const initial_lang = get_saved_lang();
    set_active_lang(initial_lang);
  }

  // untuk mendeteksi navigasi aktif pas saat posisi gulir jendela browser.
  const nav_sections = document.querySelectorAll("section[id]");
  const nav_links = document.querySelectorAll(".nav_link");

  if (nav_sections.length > 0 && nav_links.length > 0) {
    // Event listener scroll untuk mendeteksi section yang sedang terlihat dan memperbarui indikator menu navigasi.
    window.addEventListener("scroll", () => {
      let current_section_id = "";
      const scroll_position = window.scrollY + 200;

      nav_sections.forEach((section) => {
        const section_top = section.offsetTop;
        const section_height = section.offsetHeight;

        if (
          scroll_position >= section_top && scroll_position < section_top + section_height
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

  // Logika interaktivitas daftar pertanyaan umum (FAQ) dengan mekanisme akordeon.
  const faq_items = document.querySelectorAll(".faq_item");
  if (faq_items.length > 0) {
    faq_items.forEach((item) => {
      const q_header = item.querySelector(".faq_q");
      const q_icon = item.querySelector(".faq_icon");

      if (!q_header) return;

      // Event listener klik pada judul pertanyaan untuk membuka atau menutup panel jawaban.
      q_header.addEventListener("click", () => {
        const is_active = item.classList.contains("active");

        faq_items.forEach((other_item) => {
          other_item.classList.remove("active");
          const other_icon = other_item.querySelector(".faq_icon");
          if (other_icon) {
            other_icon.className = "fa-solid fa-chevron-right faq_icon";
          }
        });

        // Percabangan untuk membuka panel pertanyaan terpilih jika status sebelumnya tertutup.
        if (!is_active) {
          item.classList.add("active");
          if (q_icon) {
            q_icon.className = "fa-solid fa-chevron-up faq_icon";
          }
        }
      });
    });
  }

  // Penanganan pengiriman formulir kontak yang dialihkan langsung menuju pesan WhatsApp admin.
  const contact_form = document.getElementById("contact_form");
  const admin_wa_number = "6282132829795";

  // Menyusun tautan URL WhatsApp API beserta format teks pesan otomatis sesuai pilihan bahasa.
  function build_contact_wa_url(sender_name, sender_email, sender_message, lang) {
    let wa_message_lines = [];

    // Percabangan untuk memilih template format pesan WhatsApp dalam Bahasa Indonesia atau Bahasa Inggris.
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

  // Fungsi penangan submit untuk memvalidasi kolom input formulir dan membuka tautan pesan WhatsApp.
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

    // Percabangan validasi untuk memastikan seluruh kolom input wajib telah diisi sebelum memproses formulir.
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

    // Percabangan penanganan fallback jika jendela baru WhatsApp diblokir oleh browser.
    if (!wa_window) {
      window.location.href = wa_url;
    }

    contact_form.reset();
  }

  // Memasang event listener submit pada elemen formulir kontak untuk menangani pengiriman pesan.
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

  // Memulai inisialisasi fitur pengalih bahasa dan navigasi seluler saat dokumen telah siap.
  init_language_switcher();
  init_mobile_nav();
});