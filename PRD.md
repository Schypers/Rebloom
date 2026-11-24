# Product Requirements Document (PRD) — ReBloom Web Application

## 1. Executive Summary & Product Vision
- **Product Name**: ReBloom
- **Brand Tagline**: *"Decor At Finest — Turning Waste Into Something Beautiful"*
- **Product Vision**: ReBloom is a direct-to-consumer (D2C) promotional storefront and pre-order web application for handcrafted floral decor crafted from 100% recycled plastic waste. The platform showcases sustainable craftsmanship, empowers customers to configure floral arrangements (pack tiers, petal colors, quantities, and custom crafting notes), maintains a robust persistent shopping cart, and finalizes pre-orders via direct WhatsApp handoff.
- **Commerce & Fulfillment Model**: 
  - **100% Pre-Order & Cash on Delivery (COD) / Cash Only**: Every piece is handcrafted to order (2–4 business days crafting time).
  - **Zero Online Payment Gateways**: No payment gateway processing, third-party checkouts, or credit card forms are used.
  - **Zero Backend / Zero Authentication**: Pure static frontend architecture. Customers browse, customize, manage cart items in `localStorage`, and checkout seamlessly via WhatsApp.
- **Bilingual Localization System (i18n)**:
  - **Default Language**: English (`ENG`) with visual active state on the `ENG` button and `<html lang="en">`.
  - **Alternate Language**: Indonesian (`IDN`) with `<html lang="id">`.
  - **Persistence**: Language selection is stored in `localStorage` under `rebloom_lang` and synchronized across all pages.
  - **Scope**: Covers static markup via `data-i18n` and `data-i18n-placeholder`, dynamic product configurator content, related products, shopping cart item cards, and WhatsApp order messages.

---

## 2. Target Audience & User Flow
### 2.1 Target Audience
- Eco-conscious buyers and gift shoppers looking for affordable (`Rp 10.000` – `Rp 15.000`), customizable, aesthetic handmade floral decor.
- International and domestic Indonesian shoppers supported seamlessly via persistent English and Indonesian localization.
- Mobile and desktop users who prioritize fast, frictionless pre-orders directly confirmed with the artisan admin via WhatsApp.

### 2.2 End-to-End User Journey
```text
[1. Discovery: index.html]
   Customer browses brand story, value pillars, FAQ, and 3 Product Packs
   ├── Sets preferred language via .lang_switch (.lang_btn: IDN / ENG)
   └── Clicks ".prod_btn" ("Order Product" / "Pesan Produk")
         │ (Routes to product.html, product_2.html, or product_3.html)
         ▼
[2. Customization: product.html, product_2.html, product_3.html]
   Customer views gallery, inspects localized Title/Description, selects Flower Color (4 swatches),
   adjusts Quantity, enters optional Custom Note, and sees live calculated price
   └── Clicks ".prod_buy_btn" ("BUY NOW" / "BELI SEKARANG")
         │ (Appends/updates cart item in localStorage 'rebloom_cart' & redirects)
         ▼
[3. Shopping Cart & Receipt: receipt.html]
   Two-State UI in Active Language:
   ├── A. Empty State (cart.length === 0):
   │      Displays centered card with soft pink cart icon, localized description,
   │      "Start Shopping" / "Mulai Belanja" CTA button, and green COD trust badge.
   └── B. Populated State (cart.length > 0):
          Two-column split view (1.35fr : 1fr):
          ├── Left: Localized cart items list (thumbnail, category badge, title, color pill,
          │         editable note with pen icon, unit price, +/- stepper, delete trash button)
          │         + "Continue Shopping" / "Lanjut Belanja" button
          └── Right: Sticky Order Summary (Payment Method, Delivery Mode, Order Date,
                    subtotal, FREE / GRATIS fee badges, grand total,
                    green COD guarantee box, Proceed to Checkout button, and footnote)
   └── Clicks "#proceed_checkout_btn" ("Proceed to Checkout" / "Lanjut ke Checkout")
         ├── Automatically copies localized itemized receipt to clipboard
         └── Opens WhatsApp (6282132829795) with pre-filled order ready to send
```

---

## 3. Bilingual Internationalization (i18n) Engine

### 3.1 State Persistence Contract (`rebloom_lang`)
- **Key**: `rebloom_lang` in `localStorage`.
- **Allowed Values**: `"ENG"` (English) and `"IDN"` (Indonesian).
- **Default Resolution**:
  ```js
  const saved_lang = localStorage.getItem("rebloom_lang");
  const current_lang = (saved_lang === "IDN" || saved_lang === "ENG") ? saved_lang : "ENG";
  ```
- **Language Switcher Control (`.lang_switch`)**:
  ```html
  <div class="lang_switch">
    <button type="button" class="lang_btn" data-lang="IDN">IDN</button>
    <button type="button" class="lang_btn active" data-lang="ENG">ENG</button>
  </div>
  ```
  On click, the target language is saved to `localStorage`, the document `lang` attribute is updated (`en` or `id`), the visual `.active` class is toggled, and translations are applied immediately.

### 3.2 HTML Data Attributes
- `data-i18n="translation_key"`: Binds static element text or formatted HTML to dictionary entries.
- `data-i18n-placeholder="translation_key"`: Binds input and textarea placeholder values to dictionary entries.

### 3.3 Dynamic Content Translation
1. **Catalog Metadata (`pack_catalog`)**:
   - `regular`: `title_en` ("Flower Pot Regular") / `title_id` ("Pot Bunga Reguler"), `desc_en` / `desc_id`, `category_en` ("Handcrafted") / `category_id` ("Buatan Tangan").
   - `bird_gift`: `title_en` ("Flower Bird Gift") / `title_id` ("Hadiah Bunga Spesial"), `desc_en` / `desc_id`, `category_en` ("Handcrafted") / `category_id` ("Buatan Tangan").
   - `lamp_pot`: `title_en` ("Lamp Flower Pot") / `title_id` ("Pot Bunga Lampu LED"), `desc_en` / `desc_id`, `category_en` ("Recycled Plastic") / `category_id` ("Plastik Daur Ulang").
2. **Product Page Components**:
   - `#prod_title` and `#prod_desc` re-render upon language switch.
   - Related product cards re-render with localized titles and button text (`Switch / Order Pack` vs `Ganti / Pesan Paket`).
   - Note input placeholder updates dynamically.
3. **Receipt & Cart Components**:
   - Item titles and category tags translate dynamically based on `pack_key`.
   - Note label displays `Note: <custom_note>` / `Note: None` in English, and `Catatan: <custom_note>` / `Catatan: Tidak ada` in Indonesian. Customer custom notes are preserved exactly as entered.
   - Order summary rows, subtotal text, fee badges (`FREE` vs `GRATIS`), and guarantee notices are localized.

---

## 4. Page-by-Page Functional Specifications

### 4.1 Landing & Brand Showcase Page (`index.html`, `assets/css/style.css`, `assets/js/script.js`)
- **Fixed Navigation Header (`.navbar`)**:
  - Logo and brand name.
  - Section links (`Home` / `Beranda`, `About` / `Tentang`, `Product` / `Produk`, `FAQ` / `FAQ`, `Contact` / `Kontak`).
  - Language switcher with default `ENG` active.
  - Cart button linking to `receipt.html`.
- **Hero Section (`.hero_sec#home`)**:
  - Main headline: `Decor At <span>Finest</span>` / `Dekorasi <span>Terbaik</span>`.
  - Subtitle: `Turning Waste Into Something Beautiful` / `Mengubah Limbah Menjadi Sesuatu yang Indah`.
  - Description and CTA button (`See Our Products` / `Lihat Produk Kami`).
- **Value Pillars Bar (`.feat_wrap`)**:
  - `Environmentally friendly` / `Ramah Lingkungan`, `Hand Made` / `Buatan Tangan`, `Affordable prices` / `Harga Terjangkau`, `Suitable as a gift` / `Cocok Sebagai Hadiah`.
- **Vision & Mission Section (`.vm_sec#vision`)**:
  - Vision and 4-point Mission translated.
- **Origin Story Section (`.about_sec#about`)**:
  - `OUR ORIGIN` / `ASAL KAMI` narrative.
- **Why Choose Us Grid (`.why_sec`)**:
  - 4 numbered value statements translated.
- **Product Catalog Grid (`.prod_sec#products`)**:
  - 3 product cards with localized titles, descriptions, checklist items, `/ pack` (`/ paket`) suffix, and `Order Product` (`Pesan Produk`) buttons.
- **FAQ Accordion (`.faq_sec#faq`)**:
  - All 4 questions and answers fully translated between English and Indonesian.
- **Contact Section & Footer**:
  - Labels, input placeholders, send button, and copyright notice localized.
  - Interactive Contact Form (`#contact_form`): Intercepts submissions to validate Name (`sender_name`), Email Address (`sender_email`), and Message (`sender_message`). Formats structured bilingual inquiry text, dispatches directly to ReBloom Admin WhatsApp (`https://wa.me/6282132829795`) in a new tab (`_blank`) with `window.location.href` fallback, and automatically resets the form.

### 4.2 Product Customization & Configurator Pages (`product.html`, `product_2.html`, `product_3.html`, `assets/js/product.js`)
- **Interactive Product Gallery**:
  - Farthest-Left Queue Rotation Algorithm (150ms opacity transition).
- **Configurator Controls**:
  - Dynamic localized Title and Description.
  - Reviews count: `5.0 | 12 Reviews` / `5.0 | 12 Ulasan`.
  - Labels: `Flower Color` / `Warna Bunga`, `Quantity` / `Jumlah`, `Note` / `Catatan`.
  - Placeholder: `Have a special request? Leave a note for our admin.` / `Punya permintaan khusus? Tinggalkan catatan untuk admin kami.`.
  - Trust badge: `Secure Payment By ReBloom` / `Pembayaran Aman Oleh ReBloom`.
  - Primary button: `BUY NOW` / `BELI SEKARANG`.
- **Related Products Showcase**:
  - Title: `FIND RELATED PRODUCTS` / `TEMUKAN PRODUK TERKAIT`.
  - Description and `Switch / Order Pack` (`Ganti / Pesan Paket`) buttons.

### 4.3 Shopping Cart & Order Receipt Page (`receipt.html`, `assets/js/receipt.js`)
- **Subheader**:
  - Eyebrow: `ECO-FRIENDLY & HANDMADE` / `RAMAH LINGKUNGAN & BUATAN TANGAN`.
  - Title: `Your Cart` / `Keranjang Anda`.
  - Status: `Reviewing <span id="cart_count_highlight">X items</span> selected for checkout` / `Meninjau <span id="cart_count_highlight">X produk</span> untuk checkout`.
- **Empty Cart State (`#empty_cart_state`)**:
  - `Your Cart is Empty` / `Keranjang Anda Kosong`.
  - `Start Shopping` / `Mulai Belanja`.
  - COD trust note.
- **Populated Cart State (`#populated_cart_state`)**:
  - Dynamic item cards with localized titles, category badges, note prefixes, and unit prices.
  - Quantity steppers with auto-deletion at 0.
  - Inline custom note editor.
  - Sticky Order Summary with localized row labels, free badges, grand total, and COD guarantee.
  - WhatsApp pre-order checkout dispatch.

---

## 5. Client-Side Data Contract & WhatsApp Payloads

### 5.1 Cart Storage (`localStorage.rebloom_cart`)
```json
[
  {
    "id": "item_1730680000_123",
    "pack_key": "lamp_pot",
    "pack_name": "Lamp Flower Pot",
    "category": "Recycled Plastic",
    "image": "assets/images/Product_3.jpg",
    "unit_price": 15000,
    "quantity": 1,
    "selected_color": "Sky Blue",
    "flower_color": "Sky Blue",
    "color_hex": "#0084FF",
    "custom_note": "Leave on porch",
    "item_price": "Rp 15.000,00",
    "total_price": "Rp 15.000,00",
    "total_price_num": 15000,
    "order_date": "11 Nov 2026, 01:30 PM",
    "payment_method": "Cash Only (Pre-Order COD)"
  }
]
```

### 5.2 WhatsApp Order Payloads

#### English (`ENG`)
```text
Hello ReBloom Admin! I would like to place a Pre-Order (Cash on Delivery):

*Order Date:* 11 Nov 2026, 01:30 PM
*Payment Method:* Cash Only (Pre-Order COD)
*Delivery Mode:* Direct Handover / WhatsApp Scheduled

*Order Items:*
1. *Lamp Flower Pot* (x1)
   • Flower Color: Sky Blue
   • Custom Note: Leave on porch
   • Price: Rp 15.000 × 1 = Rp 15.000

*Packaging & Recycling:* FREE
*Shipping Fee:* FREE (COD PICKUP)
*Grand Total:* Rp 15.000,00

Please confirm my pre-order details. Thank you!
```

#### Indonesian (`IDN`)
```text
Halo Admin ReBloom! Saya ingin memesan Pre-Order (Cash on Delivery):

*Tanggal Pesanan:* 11 Nov 2026, 01:30 PM
*Metode Pembayaran:* Tunai Saja (Pre-Order COD)
*Metode Pengiriman:* Serah Terima Langsung / Terjadwal via WhatsApp

*Daftar Produk:*
1. *Pot Bunga Lampu LED* (x1)
   • Warna Bunga: Sky Blue
   • Catatan Khusus: Leave on porch
   • Harga: Rp 15.000 × 1 = Rp 15.000

*Biaya Kemasan & Daur Ulang:* GRATIS
*Biaya Pengiriman:* GRATIS (AMBIL COD)
*Total:* Rp 15.000,00

Mohon konfirmasi detail pesanan pre-order saya. Terima kasih!
```

### 5.3 WhatsApp Contact Inquiry Payloads

The contact form (`#contact_form`) on `index.html` and all product pages (`product.html`, `product_2.html`, `product_3.html`) routes customer questions directly to the ReBloom Admin WhatsApp number `6282132829795`.

#### Inquiry Mechanics
- **Target URL**: `https://wa.me/6282132829795?text={encoded_message}`
- **Required Fields**: Name (`sender_name`), Email Address (`sender_email`), Message / Question (`sender_message`).
- **Validation**: All three inputs are trimmed. If any field is empty, the first empty control is focused and submission aborts.
- **Language Synchronization**: Uses `get_saved_lang()` (`"ENG"` default, `"IDN"` alternate).
- **Handoff & Fallback**: Dispatches via `window.open(wa_url, "_blank")`, falling back to `window.location.href = wa_url` if blocked.
- **Form State**: Form is automatically reset via `contact_form.reset()` after handoff initiation.

#### English (`ENG`)
```text
Hello ReBloom Admin! I have a question from the website contact form:

*Name:* {sender_name}
*Email:* {sender_email}

*Question / Message:*
{sender_message}
```

#### Indonesian (`IDN`)
```text
Halo Admin ReBloom! Saya ingin bertanya melalui formulir kontak website:

*Nama:* {sender_name}
*Email:* {sender_email}

*Pertanyaan / Pesan:*
{sender_message}
```

---

## 6. Acceptance Criteria Checklist
- [x] Initial visit loads English (`ENG`) by default with visual `.active` on `ENG` button.
- [x] Language selection persists across pages and refreshes in `localStorage` (`rebloom_lang`).
- [x] Clicking `IDN` translates landing page, product configurators, and cart page into natural Indonesian.
- [x] Clicking `ENG` restores complete English wording.
- [x] Missing or invalid `rebloom_lang` values default safely to `"ENG"`.
- [x] All 4 FAQ questions and answers are translated accurately.
- [x] Contact form labels, placeholders, and validation are bilingual, intercepting submissions to hand off inquiries to ReBloom Admin WhatsApp (`6282132829795`) in a new tab (with `window.location.href` fallback) and resetting the form.
- [x] Product titles and descriptions use catalog fields `title_en`/`title_id` and `desc_en`/`desc_id`.
- [x] Related product cards re-render in the active language.
- [x] Cart item cards translate category tags, product titles, note labels, and unit price labels.
- [x] User-entered custom notes are preserved exactly without modification.
- [x] Order summary labels and free badges (`FREE` / `GRATIS`) update dynamically.
- [x] Font Awesome icons and dynamic counter spans (`#cart_count_highlight`, `#summary_item_count`) are preserved without DOM destruction.
- [x] WhatsApp message payload formats in the active language upon checkout.
- [x] Strict 1-to-1 page-to-script architecture maintained across all pages.
- [x] Centralized `:root` CSS custom property architecture implemented with strict `--snake_case` tokens.
- [x] Scalable `rem` typography and layout spacing anchored to `html { font-size: 100% }` (1rem = 16px).
- [x] Responsive layout verified across all viewports (360px–1440px+) with zero horizontal overflow.
- [x] Dedicated iPhone 16 viewport optimization (393px × 852px) with safe-area insets and mobile drawer navigation.
- [x] All identifiers adhere strictly to `snake_case`.
