# UI/UX Design Brief & Design System — ReBloom (`Design_System.md`)

## 1. Project Overview & Design Philosophy
- **Brand Name**: **ReBloom**
- **Product Concept**: An eco-friendly web storefront promoting and selling handmade flower vases and floral bouquets crafted from 100% recycled plastic waste.
- **Bilingual Localization Support**: Built-in cross-page internationalization supporting English (`ENG`, default) and Indonesian (`IDN`), with persistent language state stored under `rebloom_lang` in `localStorage`.
- **Commerce & Checkout Flow**: Strictly **Pre-Order** and **Cash on Delivery (COD) / Cash Only** with direct admin confirmation via WhatsApp (`6282132829795`):
  1. **Landing & Discovery (`index.html`)**: Showcases brand story, sustainability mission, and the three-pack catalog grid (`Flower Pot Regular` at `Rp 10.000`, `Flower Bird Gift` at `Rp 12.000`, and `Lamp Flower Pot` at `Rp 15.000`).
  2. **Product Configurator (`product.html`, `product_2.html`, `product_3.html`)**: Allows users to inspect product photography, select from four circular **Flower Color** swatches (Sky Blue, Purple, Orchid Pink, Pastel Pink), adjust item **Quantity** via a pill stepper (`-` / `qty_val` / `+`) with live price calculation, enter an optional custom **Note**, and trigger checkout (`BUY NOW` / `BELI SEKARANG`).
  3. **Shopping Cart & Order Receipt (`receipt.html`)**: Presents a responsive two-state cart experience in the active language:
     - **Empty Cart State (`#empty_cart_state`)**: Features a soft pink circular cart badge, bold heading `"Your Cart is Empty"` / `"Keranjang Anda Kosong"`, descriptive copy, a pill-shaped `"Start Shopping"` / `"Mulai Belanja"` CTA button, and a green COD trust guarantee.
     - **Populated Cart State (`#populated_cart_state`)**: Responsive split layout with dynamic cart items on the left (thumbnails, tags, color pills, editable notes, trash delete buttons, unit prices, quantity steppers, and continue shopping button) and a sticky Order Summary card on the right (payment method, delivery mode, real-time order date, subtotal, free fee badges, grand total, green COD guarantee box, and WhatsApp Pre-Order checkout trigger).
- **Visual Aesthetic**: Clean, airy, modern botanical e-commerce UI combining crisp white surfaces (`#ffffff`), soft warm studio photography containers (`#f8f8f8`), expressive script accents (`Telma`), and high-contrast crimson calls-to-action (`#e03e52` / `#e3475d`).

---

## 2. Strict Frontend Architectural Invariants
All UI/UX implementations across the ReBloom codebase must obey the following non-negotiable engineering rules:
1. **Centralized `:root` Design System Tokens**: All brand colors, typography families, font scales, spacing steps, border radii, shadows, and layout dimensions are declared as CSS custom properties in `:root` at the top of `assets/css/style.css`. All stylesheets (`style.css`, `product.css`, `receipt.css`) consume these tokens via `var(--...)`. Layout boundaries use `--container_max: 75rem;` and responsive container gutters `--container_gutter: clamp(1rem, 4vw, 2rem);` ensuring unified horizontal edge alignment across the fixed navbar (`.nav_container`) and all content sections (`.container`).
2. **Scalable `rem` Units**: Typography and proportional spacing must use `rem` units anchored to `html { font-size: 100% }` (`1rem = 16px`). Fixed `px` units are retained only for hairline borders (`1px`/`2px`) and pill radii (`9999px`).
3. **Strict `snake_case` Naming**: Every HTML `class`, HTML `id`, CSS custom property (`--snake_case`), data attribute (`data-*`), translation dictionary key, and JavaScript identifier must use lowercase `snake_case` (e.g., `--color_primary`, `.nav_container`, `.desktop_only`, `.nav_lang_item`, `.hero_section`, `.hero_stage`, `.hero_glow`, `.hero_title_stack`, `.hero_title_back`, `.hero_title_front`, `.hero_title_solid`, `.hero_title_script`, `.hero_tulip_clip`, `.hero_tulip_img`, `.hero_bottom_row`, `.hero_copy`, `.hero_cta_group`, `.hero_features_card`, `.cart_page_wrapper`, `.empty_cart_card`, `.cart_item_card`, `.qty_stepper`, `init_mobile_nav`, `data-i18n`, `data-i18n-placeholder`). Standard Font Awesome classes (e.g., `fa-solid`, `fa-cart-shopping`) retain their official syntax.
4. **Font Awesome 6.4.0 Icons Only**: All icons must use Font Awesome 6.4.0 classes (`<i class="fa-solid ..."></i>`, `<i class="fa-regular ..."></i>`, or `<i class="fa-brands ..."></i>`). Inline `<svg>` elements are strictly prohibited.
5. **Icon and Nested Node Preservation**: When applying translations, never destroy nested `<i>` icons or dynamic `<span>` counters. Translators must target dedicated text nodes or targeted child elements.
6. **Zero Backend Dependencies**: All cart persistence is maintained in `localStorage` under `rebloom_cart`, language selection under `rebloom_lang`, with checkout dispatching directly to WhatsApp (`6282132829795`).

---

## 3. Color System (Hardcoded Hex Palette)

### 3.1 Core Brand Palette
| Role (Indonesian / English) | Hex Code | Usage & Component Binding |
| :--- | :--- | :--- |
| **Warna Utama** (Primary Brand Crimson) | `#e03e52` / `#e3475d` | Primary brand wordmark (`.logo_txt`), highlighted titles (`.hl_red`), active nav links, eyebrow tags (`.cart_eyebrow`), cart count highlight (`#cart_count_highlight`), primary CTA buttons (`.btn_cart`, `.start_shopping_btn`, `.proceed_checkout_btn`), active language button (`.lang_btn.active`), and quantity decrement button (`.qty_btn_minus`). |
| **Primary Button Hover** | `#c83244` | Hover state background on `.start_shopping_btn`, `.proceed_checkout_btn`, and `.btn_cart`. |
| **Warna Pendukung 1** (Secondary Eco Green) | `#1bb55c` | Success green icons (`.empty_trust_note i`, `.cod_guarantee_icon`), quantity increment `+` button text (`.qty_btn_plus`), fee badges (`.free_badge`), and inline note save button (`.note_save_btn`). |
| **COD Banner Text** | `#15803d` | High-contrast green text inside the COD guarantee container (`.cod_guarantee_text`). |
| **Green Soft Fill** | `#eafaf1` | Background fill for `.free_badge`, `.cod_guarantee_box`, and `.qty_btn_plus`. |
| **Green Soft Border** | `#c8f0d8` | Subtle border around `.cod_guarantee_box`. |
| **Soft Pink Badge Fill** | `#fdecef` | Background fill for `.empty_icon_circle`, category tag badges (`.item_tag_pill`), and quantity decrement button (`.qty_btn_minus`). |
| **Language Switcher Border** | `#eaeaea` | 1.5px border bounding `.lang_switch` pill capsule. |
| **Page Canvas Background** | `#f6f6f6` | Viewport canvas background for `receipt.html`. |
| **Card Surface** | `#ffffff` | Elevated cards (`.empty_cart_card`, `.cart_item_card`, `.order_summary_card`, `.navbar`, `.footer_bar`). |
| **Card Border** | `#eeeeee` | 1px clean container border on cards and dividers. |
| **Card Shadow** | `0 8px 24px rgba(0, 0, 0, 0.04)` | Ambient drop shadow elevating cards from the canvas. |

### 3.2 Extended Typography & Swatch Palette
| Category | Hex Code | Usage & Component Binding |
| :--- | :--- | :--- |
| **Primary Dark Typography** | `#1a1a1a` | Headings, active labels, product titles (`.item_title`), and grand total prices. |
| **Secondary Muted Typography** | `#757575` / `#888888` | Supporting descriptions (`.empty_desc`), metadata labels (`.unit_price_label`, `.summary_info_label`), and footnotes (`.checkout_footnote`). |
| **Flower Swatch: Sky Blue** | `#0084FF` | Sky blue swatch indicator (`.color_dot`) and catalog selection. |
| **Flower Swatch: Purple** | `#A855F7` | Vibrant purple flower swatch option. |
| **Flower Swatch: Orchid Pink** | `#E199D2` | Medium orchid pink floral swatch option. |
| **Flower Swatch: Pastel Pink** | `#F5B0C4` | Soft pastel pink floral swatch indicator (`.color_dot`). |
| **Review Star Gold** | `#FBBF24` | 5-star product rating icons on `product.html`. |
| **Dashed Divider** | `#e0e0e0` | 1px dashed separation line in Order Summary (`.summary_divider_dashed`). |
| **Subheader Divider** | `#e5e5e5` | 1px solid horizontal border below cart subheader (`.cart_header_bar`). |

---

## 4. Typography System

### 4.1 Font Families
1. **Font Utama (Expressive Brand & Script Accent)**: `'Telma Variable', 'Telma', cursive, serif` (imported via Fontshare CDN: `weights 300, 400, 500, 700`, bound to `var(--font_primary)`).
   - **Application**: Brand wordmark (`.logo_txt`), script accent (`.hero_finest`, `.sec_pay_brand`).
2. **Font Pendukung (Primary UI, Headings & Body Copy)**: `'Figtree', sans-serif` (imported via Google Fonts CDN: `weights 300..900`, bound to `var(--font_secondary)`).
   - **Application**: Global `body` typography, navigation links, section titles, product cards, order summary, buttons, and numeric price displays.

### 4.2 Typographic Scale (1rem = 16px Base)
| Token | rem Value | Pixel Equivalent | Role / Component Binding |
| :--- | :--- | :--- | :--- |
| `--text_2xs` | `0.6875rem` | 11px | Micro labels, category badges (`.item_tag_pill`), unit price labels. |
| `--text_xs` | `0.75rem` | 12px | Footnotes, trust captions (`.checkout_footnote`, `.cart_eyebrow`). |
| `--text_sm` | `0.875rem` | 14px | Secondary descriptions, feature list items, footer copyright. |
| `--text_base` | `1rem` | 16px | Standard body copy, navigation menu links, inputs, and form controls. |
| `--text_md` | `1.0625rem` | 17px | Medium navigation labels, FAQ headers (`.faq_q`). |
| `--text_lg` | `1.125rem` | 18px | Sub-headings, rate ratings, product option labels (`.custom_lbl`). |
| `--text_desc` | `1.25rem` | 20px | Design System KETERANGAN, card titles (`.prod_title`), body lead copy. |
| `--text_xl` | `1.5rem` | 24px | Grand totals, empty state headings (`.empty_title`). |
| `--text_2xl` | `1.625rem` | 26px | Section subtitles (`.hero_sub_title`, `.vm_title`). |
| `--text_3xl` | `2rem` | 32px | Cart main title (`.cart_main_title`), medium display headings. |
| `--text_heading` | `2.5rem` | 40px | Design System JUDUL, major section headings (`.about_title`, `.prod_heading`). |
| `--text_hero` | `clamp(4rem, 11vw, 10rem)` | 64px–160px | Fluid Hero Display Headline (`.hero_headline`). |

---

## 5. Language Switcher UI Component (`.lang_switch`)

The navigation bar header hosts the dual-toggle language pill:
```html
<div class="lang_switch">
  <button type="button" class="lang_btn" data-lang="IDN">IDN</button>
  <button type="button" class="lang_btn active" data-lang="ENG">ENG</button>
</div>
```

### Visual Specifications
- **Capsule Container (`.lang_switch`)**:
  - `display: flex; align-items: center;`
  - `border: 1.5px solid #EAEAEA;`
  - `border-radius: 30px;`
  - `background-color: #FFFFFF;`
- **Toggle Button (`.lang_btn`)**:
  - `border: none; background: transparent;`
  - `padding: 13px 18px;`
  - `font-size: 13px; font-weight: 700;`
  - `cursor: pointer; transition: all 0.2s ease;`
- **Curved Ends**:
  - `.lang_btn:first-child`: `border-radius: 20px 0 0 20px;`
  - `.lang_btn:last-child`: `border-radius: 0 20px 20px 0;`
- **Active State (`.lang_btn.active`)**:
  - `background-color: #E3475D;`
  - `color: #FFFFFF;`

---

## 6. Dual-State Shopping Cart Component Specifications

### 6.1 Shared Navigation & Subheader Bar
- **Top Navigation (`.navbar`)**: Fixed header with brand logo on the left, centered navigation anchors, and right utilities:
  - Language toggle pill (`.lang_switch`).
  - Active solid crimson Cart button (`.btn_cart`).
- **Cart Subheader Bar (`.cart_header_bar`)**: Horizontal row bounded by `border-bottom: 1px solid #e5e5e5;`:
  - Left: `.cart_eyebrow` (`"ECO-FRIENDLY & HANDMADE"` / `"RAMAH LINGKUNGAN & BUATAN TANGAN"`) + `.cart_main_title` (`"Your Cart"` / `"Keranjang Anda"`).
  - Right: `.cart_review_text` (`"Reviewing <span id="cart_count_highlight">X items</span> selected for checkout"` / `"Meninjau <span id="cart_count_highlight">X produk</span> untuk checkout"`).

### 6.2 Empty Cart State (`#empty_cart_state`)
- Displayed when `cart.length === 0`.
- **Card (`.empty_cart_card`)**: Centered white card (`max-width: 480px`, `border-radius: 20px`, `padding: 56px 40px`, `box-shadow: 0 8px 24px rgba(0,0,0,0.04)`).
- **Icon Halo (`.empty_icon_circle`)**: `64px x 64px` circular badge (`background-color: #fdecef`, `color: #e03e52`, containing `fa-cart-shopping`).
- **Title (`.empty_title`)**: `"Your Cart is Empty"` / `"Keranjang Anda Kosong"`.
- **Description (`.empty_desc`)**: `"Looks like you haven't added any handcrafted floral pieces to your cart yet. Explore our sustainable collection to find your favorite."` / `"Sepertinya Anda belum menambahkan produk bunga kerajinan tangan ke keranjang. Jelajahi koleksi ramah lingkungan kami untuk menemukan favorit Anda."`.
- **Call-to-Action (`.start_shopping_btn`)**: Pill button (`background-color: #e03e52`, `color: #ffffff`, `border-radius: 999px`, `padding: 14px 34px`) linking to `product.html`.
- **Trust Note (`.empty_trust_note`)**: Green shield icon (`fa-shield-halved` in `#1bb55c`) with `"Secure Pre-Order COD & WhatsApp Confirmation Available"` / `"Tersedia Pre-Order COD Aman & Konfirmasi WhatsApp"`.

### 6.3 Populated Cart State (`#populated_cart_state`)
- Displayed when `cart.length > 0`.
- **Layout Grid (`.cart_split_layout`)**: `grid-template-columns: 1.35fr 1fr; gap: 32px;` (collapses to single column `<= 900px`).

#### Left Column: Cart Items (`.cart_items_column`)
- **Cart Item Card (`.cart_item_card`)**:
  - Elevated card (`background-color: #ffffff`, `border-radius: 16px`, `border: 1px solid #eeeeee`, `padding: 20px`, `display: flex`, `gap: 20px`, `position: relative`).
  - **Thumbnail (`.item_thumb`)**: `110px x 110px`, `border-radius: 12px`, `object-fit: cover`.
  - **Category Pill (`.item_tag_pill`)**: Soft pink pill (`#fdecef`, `#e03e52`) displaying `"Recycled Plastic"` / `"Plastik Daur Ulang"` or `"Handcrafted"` / `"Buatan Tangan"`.
  - **Product Title (`.item_title`)**: Pack name in `18px`, `font-weight: 700` localized according to `current_lang`.
  - **Metadata Row (`.item_meta_row`)**:
    - **Color Pill (`.color_pill`)**: Bordered white pill with circular color swatch dot (`.color_dot`) and color name.
    - **Customer Note (`.note_pill`)**: Displays `Note: None` / `Catatan: Tidak ada` or `Note: <custom_note>` / `Catatan: <custom_note>` with an edit icon button (`.note_edit_btn`). Clicking toggles into an inline `.note_edit_form` with a text input, save checkmark, and cancel button.
  - **Delete Button (`.item_delete_btn`)**: Positioned at top-right with `fa-trash-can` (`#888888`, hover `#e03e52`).
  - **Bottom Row (`.item_bottom_row`)**: Divided by `border-top: 1px solid #f2f2f2;`:
    - **Unit Price Block (`.unit_price_block`)**: Label `"Unit Price"` / `"Harga Satuan"` and price numeral in IDR format.
    - **Quantity Stepper (`.qty_stepper`)**: Decrement (`.qty_btn_minus`), value (`.qty_value`), and increment (`.qty_btn_plus`).
- **Continue Shopping Button (`.continue_shopping_btn`)**: Outline pill button displaying `<i class="fa-solid fa-arrow-left"></i> Continue Shopping` / `Lanjut Belanja`.

#### Right Column: Order Summary (`.order_summary_card`)
- **Card Surface**: White card (`border-radius: 20px`, `padding: 32px`, `border: 1px solid #eeeeee`, `position: sticky; top: 100px;`).
- **Heading (`.summary_heading`)**: `"Order Summary"` / `"Ringkasan Pesanan"`.
- **Payment & Delivery Information (`.summary_info_group`)**:
  - `PAYMENT METHOD` / `METODE PEMBAYARAN`: `"Cash Only (Pre-Order COD)"` / `"Tunai Saja (Pre-Order COD)"`.
  - `DELIVERY MODE` / `METODE PENGIRIMAN`: `"Direct Handover / WhatsApp Scheduled"` / `"Serah Terima Langsung / Terjadwal via WhatsApp"`.
  - `ORDER DATE` / `TANGGAL PESANAN`: Real-time order timestamp (`#summary_order_date`).
- **Dashed Divider (`.summary_divider_dashed`)**: `1px dashed #e0e0e0;`.
- **Subtotal & Fee Rows (`.summary_rows`)**:
  - `Items Subtotal (X items)` / `Subtotal Produk (X produk)`.
  - `Packaging & Recycling Fee` / `Biaya Kemasan & Daur Ulang`: Green badge `<span class="free_badge">FREE</span>` / `"GRATIS"`.
  - `Shipping Fee` / `Biaya Pengiriman`: Green badge `<span class="free_badge">FREE (COD PICKUP)</span>` / `"GRATIS (AMBIL COD)"`.
- **Solid Divider (`.summary_divider_solid`)**: `1px solid #eeeeee;`.
- **Grand Total Row (`.summary_total_row`)**: Label `"Total"` and dynamic IDR value.
- **COD Guarantee Banner (`.cod_guarantee_box`)**: Soft green box pairing checkmark icon (`#1bb55c`) and bold text `"Secure Pre-Order COD By ReBloom"` / `"Pre-Order COD Aman Oleh ReBloom"`.
- **Primary Checkout Button (`#proceed_checkout_btn`)**: Crimson pill reading `"Proceed to Checkout"` / `"Lanjut ke Checkout"`.
- **Checkout Footnote (`.checkout_footnote`)**: `"Orders are confirmed directly with our admin via WhatsApp upon checkout."` / `"Pesanan dikonfirmasi langsung dengan admin kami melalui WhatsApp saat checkout."`.
