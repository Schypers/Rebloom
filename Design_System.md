# UI/UX Design Brief & Design System — ReBloom (`Design_System.md`)

## 1. Project Overview & Design Philosophy
- **Brand Name**: **ReBloom**
- **Product Concept**: An eco-friendly web storefront promoting and selling handmade flower vases and floral bouquets crafted from 100% recycled plastic waste.
- **Commerce & Checkout Flow**: Strictly **Pre-Order** and **Cash on Delivery (COD) / Cash Only** with direct admin confirmation via WhatsApp (`6282132829795`):
  1. **Landing & Discovery (`index.html`)**: Showcases brand story, sustainability mission, and the three-pack catalog grid (`Flower Pot Regular` at `Rp 10.000`, `Flower Bird Gift` at `Rp 12.000`, and `Lamp Flower Pot` at `Rp 15.000`) routing via `?pack=...`.
  2. **Product Configurator (`product.html`)**: Allows users to inspect product photography, select from four circular **Flower Color** swatches (Sky Blue, Purple, Orchid Pink, Pastel Pink), adjust item **Quantity** via a pill stepper (`-` / `qty_val` / `+`) with live price calculation, enter an optional custom **Note**, and trigger checkout (`BUY NOW`).
  3. **Order Receipt & WhatsApp Handoff (`receipt.html`)**: Displays the itemized dynamic order summary (with custom color dot `.custom_dot` and customer request note `.custom_text`) and enables one-click clipboard copy + WhatsApp handoff without requiring screenshots.
- **Visual Aesthetic**: Clean, airy, modern botanical e-commerce UI combining crisp white surfaces (`#FFFFFF`), soft warm studio photography containers (`#F7F4ED`), expressive script accents (`Telma`), and high-contrast crimson calls-to-action (`#E3475D`).

---

## 2. Strict Frontend Architectural Invariants
All UI/UX implementations across the ReBloom codebase must obey the following non-negotiable engineering rules:
1. **Zero CSS Custom Properties**: Strictly **NO** `:root` declarations and **NO** `var(--...)` functions in `style.css`, `product.css`, or `receipt.css`. Every hex code, pixel dimension, and font family must be hardcoded directly onto its target CSS selector rule.
2. **Strict `snake_case` Naming**: Every HTML `class`, HTML `id`, data attribute (`data-*`), and JavaScript identifier must use lowercase `snake_case` (e.g., `.btn_cart`, `.color_swatch`, `.swatch_purple`, `.qty_btn`, `#custom_note`, `#prod_title`).
3. **Font Awesome 6.4.0 Icons Only**: All icons must use Font Awesome 6.4.0 classes (`<i class="fa-solid ..."></i>` or `<i class="fa-brands ..."></i>`). Inline `<svg>` elements are strictly prohibited.

---

## 3. Color System (Hardcoded Hex Palette)

### 3.1 Core Brand Palette
| Role (Indonesian / English) | Hex Code | Usage & Component Binding |
| :--- | :--- | :--- |
| **Warna Utama** (Primary Brand Crimson) | `#E3475D` | Primary brand wordmark (`.logo_txt`, `.brand_name`), highlighted title words (`.hl_red`), active nav links (`.nav_link.active`), active language toggle (`.lang_btn.active`), price displays (`.price_curr`, `.price_val`, `.price_val_sm`), and ambient background blur glows. |
| **Warna Pendukung 1** (Secondary Eco Green) | `#24CC63` | Feature bar icons (`.feat_icon`), security shield icon (`.sec_pay_icon`), quantity increment `+` button text (`.qty_plus`), order receipt confirmation disc (`.badge_inner`), and WhatsApp direct CTA (`.contact_wa_btn`). |
| **Warna Pendukung 2** (Secondary Pastel Pink) | `#F5B0C4` | Secondary brand pink accent, decorative highlights, and soft floral pink color swatch option (`.swatch_pink`). |
| **Warna Button** (Primary CTA Fill) | `#E3475D` | Primary action buttons (`.btn_primary`, `.prod_buy_btn`, `.rel_btn`, `.btn_cart`, `.contact_submit_btn`) and quantity decrement `-` button text (`.qty_minus`). |

### 3.2 Extended Surface, Swatch & Neutral Palette
| Category | Hex Code | Usage & Component Binding |
| :--- | :--- | :--- |
| **Primary Button Hover** | `#cc374c` | Hover state background on `.btn_primary`, `.prod_buy_btn`, `.rel_btn`, `.btn_cart`, and `.contact_submit_btn`. |
| **Pastel Pink Surface Tints** | `#FDE8EC` / `#FCE8EE` / `#FFF0F2` | `.prod_thumb_circle` icon disc (`#FDE8EC`), `.rel_img_box` background (`#FCE8EE`), and `.btn_outline:hover` background wash (`#FFF0F2`). |
| **Confirmation Badge Ring** | `#DDF5E6` | Outer circular halo `.status_badge` framing the `#24CC63` checkmark disc on `receipt.html`. |
| **Flower Swatch: Sky Blue** | `#0084FF` | Primary blue swatch (`.swatch_blue`, active default) and dynamic customization indicator dot (`.custom_dot`) on `receipt.html`. |
| **Flower Swatch: Purple** | `#A855F7` | Vibrant purple flower swatch (`.swatch_purple`) for customizable bouquets. |
| **Flower Swatch: Orchid Pink** | `#E199D2` | Medium orchid pink floral swatch (`.swatch_orchid`). |
| **Flower Swatch: Pastel Pink** | `#F5B0C4` | Soft pastel pink floral swatch (`.swatch_pink`). |
| **Review Star Gold** | `#FBBF24` | 5-star product rating icons (`.prod_stars`, `.rel_card_rating`) on `product.html`. |
| **Primary Dark Typography** | `#1E1E1E` / `#333333` | Headings, active labels, body copy, and selected swatch outer border ring (`2px solid #1E1E1E`). |
| **Secondary Muted Typography** | `#5A5A5A` / `#6E6E6E` | Supporting descriptions, captions, metadata labels (`.info_label`), and form placeholders. |
| **Primary Canvas & Card Surface** | `#FFFFFF` | Main page background (`index.html`, `product.html`), elevated cards (`.prod_card`, `.rcpt_card`), and header bars. |
| **Secondary Viewport / Stage Surfaces** | `#F5F6F8` / `#F7F4ED` / `#F4F4F4` | Receipt page background (`#F5F6F8`), product image gallery frame (`#F7F4ED`), and contact form input fill (`#F4F4F4`). |
| **Borders & Dividers** | `#EAEAEA` | Card borders, navbar bottom border, `.lang_switch` border, quantity pill border, note input border, `.divider_dash`, and `.divider_solid`. |

---

## 4. Typography System

### 4.1 Font Families
1. **Font Utama (Expressive Brand & Script Accent)**: `'Telma', cursive, serif` (imported via Fontshare CDN: `weights 300, 400, 500, 700`).
   - **Application**: Brand wordmarks (`.logo_txt`, `.brand_name`, `.contact_logo_txt`), hero accent word (`.hero_finest`), and trust badge wordmark (`.sec_pay_brand`).
2. **Font Pendukung (Primary UI, Headings & Body Copy)**: `'Figtree', sans-serif` (imported via Google Fonts CDN: `weights 300..900`).
   - **Application**: Global `body` typography, navigation links, section headings, product configurator labels, price numerals, receipt data, and buttons.

### 4.2 Core Typographic Scale
- **Judul (Standard Section Heading)**: `40px` (`font-weight: 800`, `color: #1E1E1E`, `line-height: 1.2`) — Applied to `.about_title`, `.why_heading`, `.prod_heading`, and `.faq_heading`.
- **Keterangan (Base Body & Description)**: `20px` (`font-weight: 400`, `line-height: 1.6`, `color: #333333`) — Global `body` baseline in `style.css`.
- **Component-Specific Display & UI Exceptions**:
  - **Hero Display Headline (`.hero_headline`)**: `160px` (`font-weight: 750`, `letter-spacing: -3px`, dual-layer solid `#1E1E1E` + `1px` outline stroke).
  - **Product Configurator Title (`#product_detail .prod_title`)**: `46px` (`font-weight: 800`, `color: #1E1E1E`).
  - **Product Configurator Price (`.price_val`)**: `56px` (`font-weight: 900`, `color: #E3475D`) paired with `28px` `.price_curr` (`"Rp"`).
  - **Configurator Sub-Labels (`Flower Color`, `Quantity`, `Note`)**: `18px` (`font-weight: 700`, `color: #1E1E1E`).

---

## 5. Core UI Component Specifications

### 5.1 Navigation Header & Pending Purchases Cart Button
- **Header Layout (`.navbar`)**: Sticky/fixed top navigation bar with brand identity on the left (`.logo_img` + `.logo_txt` in `Telma` `#E3475D`), section links in the center (`Home`, `About`, `Product`, `FAQ`, `Contact`), and utility actions on the right.
- **Language Switcher (`.lang_switch`)**: Pill container (`border: 1.5px solid #EAEAEA`, `border-radius: 30px`, `background-color: #FFFFFF`) holding `IDN` and `ENG` toggle buttons (`.lang_btn`), where `.lang_btn.active` is filled with `#E3475D` and `#FFFFFF` text.
- **Cart Button (`.btn_cart`)**: Inline-flex pill (`background-color: #E3475D`, `color: #FFFFFF`, `padding: 13px 18px`, `border-radius: 50px`, `font-size: 14px`, `font-weight: 600`) containing `<i class="fa-solid fa-cart-shopping cart_icon"></i>` and `<span>Cart</span>`.

### 5.2 Product Configurator (`product.html`)
The right column (`.prod_right`) of `#product_detail` follows the official ReBloom configurator design:
1. **Product Title & Description**:
   - Bold pack title `.prod_title#prod_title` (dynamically rendered from catalog: `Flower Pot Regular`, `Flower Bird Gift`, or `Lamp Flower Pot`).
   - Warm descriptive paragraph `.prod_desc#prod_desc` detailing the authentic recycled plastic craftsmanship and custom options.
2. **Rating Summary Row (`.prod_rating`)**:
   - 5 solid gold stars (`.prod_stars` in `#FBBF24`) followed by `.prod_rate_txt` (`"5.0 | 12 Reviews"`).
3. **Interactive Customization Row (`.custom_row`)**:
   - Two-column horizontal flex row (`justify-content: space-between`, `align-items: flex-start`):
     - **Left — Flower Color Swatch Selector (`.color_sec`)**:
       - Label `.custom_lbl`: `"Flower Color"` (`font-weight: 700`, `color: #1E1E1E`).
       - Swatch Group `.swatch_grp`: 4 circular color buttons `.color_swatch` (`width: 32px`, `height: 32px`, `border-radius: 50%`):
         - Sky Blue (`#0084FF`, `.swatch_blue`)
         - Purple (`#A855F7`, `.swatch_purple`)
         - Orchid Pink (`#E199D2`, `.swatch_orchid`)
         - Pastel Pink (`#F5B0C4`, `.swatch_pink`)
       - Active state: `border: 2px solid #1E1E1E; box-shadow: inset 0 0 0 2px #FFFFFF;`.
     - **Right — Quantity Stepper (`.qty_sec`)**:
       - Label `.custom_lbl`: `"Quantity"`.
       - Pill Stepper `.qty_box`:
         - Decrement `.qty_btn.qty_minus` (`-` in crimson `#E3475D`).
         - Value Display `.qty_val` (`1` in bold `#1E1E1E`, minimum 1).
         - Increment `.qty_btn.qty_plus` (`+` in eco green `#24CC63`).
4. **Custom Request Note Input (`.note_sec`)**:
   - Label `.custom_lbl`: `"Note"`.
   - Input Field `#custom_note.note_inp`: Rounded rectangle input with placeholder `"Have a special request? Leave a note for our admin."`.
5. **Live Price Display, Trust Badge & Primary Buy CTA**:
   - **Price Display (`.prod_price_box`)**: `"Rp"` (`.price_curr`) + dynamic price (`#price_val.price_val`) in `#E3475D`.
   - **Trust Badge (`.prod_sec_pay`)**: Green shield icon (`#24CC63`) + `"Secure Payment By ReBloom"`.
   - **Primary CTA Button (`.prod_buy_btn`)**: Full-width crimson pill button (`border-radius: 50px`, `background-color: #E3475D`, `color: #FFFFFF`, `padding: 16px`, `font-weight: 700`) labeled `"BUY NOW"`.

### 5.3 Order Receipt & WhatsApp Handoff (`receipt.html`)
- **Two-Column Canvas (`.rcpt_layout` > `.rcpt_container`)**: Centered inside a `#F5F6F8` viewport with a `50px` gap between columns.
- **Left Status Column (`.rcpt_status`)**:
  - Mint outer ring `.status_badge` (`44px`, `#DDF5E6`) + green inner disc `.badge_inner` (`22px`, `#24CC63`) + white checkmark `.chk_icon`.
  - Headline `.status_title` (`"Your Order Is Being Processed!"`).
  - Screenshot-Free Instruction Copy `.status_desc` (`"Thank you for your purchase! No screenshot needed—just click 'Send To Admin' to automatically copy your ready-to-paste order receipt and send it via WhatsApp."`).
  - Action Stack `.status_actions`:
    - `#btn_admin.btn_primary` (`"Send To Admin"`): Copies formatted plain-text receipt to clipboard and opens `https://wa.me/6282132829795?text=...` with feedback.
    - `#btn_back.btn_outline` (`"Back To Product"` + `fa-arrow-right`).
- **Right Receipt Card (`.rcpt_card`)**:
  - Elevated white card (`max-width: 440px`, `border-radius: 24px`, `border: 1px solid #EAEAEA`, `padding: 36px`).
  - Displays dynamic `Order Date & Time`, `Payment Method` (`Cash Only (Pre-Order COD)`), dashed divider `.divider_dash`, `Items Details` row showing `<Quantity>x <Pack Name>`, custom color dot `.custom_dot` (colored to matching hex) + `.custom_text` note, unit/subtotal `.item_price`, and calculated grand total `.total_val`.

---

## 6. Responsive Breakpoints & Layout Grid
1. **Desktop (`> 992px`)**:
   - `.container`: `max-width: 1200px`, centered with `20px` horizontal padding.
   - `product.html`: 2-column `.prod_wrap` (`gap: 55px`) with gallery (`flex: 1`) and configurator (`flex: 1.1`).
   - `receipt.html`: 2-column `.rcpt_container` (`max-width: 960px`, `gap: 50px`).
2. **Tablet (`<= 992px` / `<= 860px`)**:
   - Multi-column flex/grid layouts collapse to single-column vertical stacks (`flex-direction: column`).
   - `.rel_wrap` uses `flex-direction: column-reverse`.
   - `.rcpt_container` stacks `.rcpt_status` above `.rcpt_card` at `100%` width.
   - `.nav_mid` navigation menu collapses on mobile.
3. **Mobile (`<= 576px` / `<= 480px`)**:
   - `.custom_row` collapses vertically.
   - Compact card padding (`24px 20px`) and full-width action buttons.