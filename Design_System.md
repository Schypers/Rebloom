# UI/UX Design Brief & Design System — ReBloom (`Design_System.md`)

## 1. Project Overview & Design Philosophy
- **Brand Name**: **ReBloom**
- **Product Concept**: An eco-friendly web storefront promoting and selling handmade flower vases and floral bouquets crafted from 100% recycled plastic waste.
- **Commerce & Checkout Flow**: Strictly **Pre-Order** and **Cash on Delivery (COD) / Cash Only** with direct admin confirmation via WhatsApp (`6282132829795`):
  1. **Landing & Discovery (`index.html`)**: Showcases brand story, sustainability mission, and the three-pack catalog grid (`Flower Pot Regular` at `Rp 10.000`, `Flower Bird Gift` at `Rp 12.000`, and `Lamp Flower Pot` at `Rp 15.000`) routing via `?pack=...`.
  2. **Product Configurator (`product.html`)**: Allows users to inspect product photography, select from four circular **Flower Color** swatches (Sky Blue, Purple, Orchid Pink, Pastel Pink), adjust item **Quantity** via a pill stepper (`-` / `qty_val` / `+`) with live price calculation, enter an optional custom **Note**, and trigger checkout (`BUY NOW`).
  3. **Shopping Cart & Order Receipt (`receipt.html`)**: Presents a responsive two-state cart experience:
     - **Empty Cart State (`#empty_cart_state`)**: Displayed when the cart contains zero items. Features a soft pink circular cart badge, bold heading `"Your Cart is Empty"`, descriptive copy, a pill-shaped `"Start Shopping"` CTA button, and a green COD trust guarantee.
     - **Populated Cart State (`#populated_cart_state`)**: Responsive split layout with dynamic cart items on the left (thumbnails, tags, color pills, editable notes, trash delete buttons, unit prices, quantity steppers, and continue shopping button) and a sticky Order Summary card on the right (payment method, delivery mode, real-time order date, subtotal, free fee badges, grand total, green COD guarantee box, and WhatsApp Pre-Order checkout trigger).
- **Visual Aesthetic**: Clean, airy, modern botanical e-commerce UI combining crisp white surfaces (`#ffffff`), soft warm studio photography containers (`#f8f8f8`), expressive script accents (`Telma`), and high-contrast crimson calls-to-action (`#e03e52`).

---

## 2. Strict Frontend Architectural Invariants
All UI/UX implementations across the ReBloom codebase must obey the following non-negotiable engineering rules:
1. **Zero CSS Custom Properties**: Strictly **NO** `:root` declarations and **NO** `var(--...)` functions in `style.css`, `product.css`, or `receipt.css`. Every hex code, pixel dimension, and font family must be hardcoded directly onto its target CSS selector rule.
2. **Strict `snake_case` Naming**: Every HTML `class`, HTML `id`, data attribute (`data-*`), and JavaScript identifier must use lowercase `snake_case` (e.g., `.cart_page_wrapper`, `.empty_cart_card`, `.cart_item_card`, `.qty_stepper`, `.order_summary_card`, `.proceed_checkout_btn`). Standard Font Awesome classes (e.g., `fa-solid`, `fa-cart-shopping`) retain their official syntax.
3. **Font Awesome 6.4.0 Icons Only**: All icons must use Font Awesome 6.4.0 classes (`<i class="fa-solid ..."></i>`, `<i class="fa-regular ..."></i>`, or `<i class="fa-brands ..."></i>`). Inline `<svg>` elements are strictly prohibited.
4. **Zero Backend Dependencies**: All cart persistence is maintained in `localStorage` under `rebloom_cart`, with checkout dispatching directly to WhatsApp (`6282132829795`).

---

## 3. Color System (Hardcoded Hex Palette)

### 3.1 Core Brand Palette
| Role (Indonesian / English) | Hex Code | Usage & Component Binding |
| :--- | :--- | :--- |
| **Warna Utama** (Primary Brand Crimson) | `#e03e52` | Primary brand wordmark (`.logo_txt`), highlighted titles, active nav links, eyebrow tags (`.cart_eyebrow`), cart count highlight (`#cart_count_highlight`), primary CTA buttons (`.btn_cart`, `.start_shopping_btn`, `.proceed_checkout_btn`), and quantity decrement button (`.qty_btn_minus`). |
| **Primary Button Hover** | `#c83244` | Hover state background on `.start_shopping_btn`, `.proceed_checkout_btn`, and `.btn_cart`. |
| **Warna Pendukung 1** (Secondary Eco Green) | `#1bb55c` | Success green icons (`.empty_trust_note i`, `.cod_guarantee_icon`), quantity increment `+` button text (`.qty_btn_plus`), fee badges (`.free_badge`), and inline note save button (`.note_save_btn`). |
| **COD Banner Text** | `#15803d` | High-contrast green text inside the COD guarantee container (`.cod_guarantee_text`). |
| **Green Soft Fill** | `#eafaf1` | Background fill for `.free_badge`, `.cod_guarantee_box`, and `.qty_btn_plus`. |
| **Green Soft Border** | `#c8f0d8` | Subtle border around `.cod_guarantee_box`. |
| **Soft Pink Badge Fill** | `#fdecef` | Background fill for `.empty_icon_circle`, category tag badges (`.item_tag_pill`), and quantity decrement button (`.qty_btn_minus`). |
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
1. **Font Utama (Expressive Brand & Script Accent)**: `'Telma', cursive, serif` (imported via Fontshare CDN: `weights 300, 400, 500, 700`).
   - **Application**: Brand wordmark (`.logo_txt`).
2. **Font Pendukung (Primary UI, Headings & Body Copy)**: `'Figtree', sans-serif` (imported via Google Fonts CDN: `weights 400..800`).
   - **Application**: Global `body` typography, navigation links, section titles, product cards, order summary, buttons, and numeric price displays.

### 4.2 Typographic Hierarchy
- **Cart Page Title (`.cart_main_title`)**: `32px` (`font-weight: 800`, `color: #1a1a1a`, `line-height: 1.2`).
- **Eyebrow Label (`.cart_eyebrow`)**: `12px` (`font-weight: 800`, `letter-spacing: 1.5px`, `text-transform: uppercase`, `color: #e03e52`).
- **Empty State Heading (`.empty_title`)**: `24px` (`font-weight: 800`, `color: #1a1a1a`).
- **Order Summary Heading (`.summary_heading`)**: `20px` (`font-weight: 800`, `color: #1a1a1a`).
- **Item Title (`.item_title`)**: `18px` (`font-weight: 700`, `color: #1a1a1a`).
- **Grand Total Numerals (`#summary_grand_total`)**: `24px` (`font-weight: 800`, `color: #1a1a1a`).
- **Cart Unit Price (`.unit_price_val`)**: `15px` (`font-weight: 700`, `color: #1a1a1a`).
- **Footnote / Small Meta (`.checkout_footnote`, `.empty_trust_note`)**: `12px` (`font-weight: 400`, `color: #888888`).

---

## 5. Dual-State Shopping Cart Component Specifications

### 5.1 Shared Navigation & Subheader Bar
- **Top Navigation (`.navbar`)**: Fixed header with brand logo on the left, centered navigation anchors, and right utilities:
  - Language toggle pill (`.lang_switch > .lang_btn` for `IDN` and `ENG`).
  - Active solid crimson Cart button (`.btn_cart` with `<i class="fa-solid fa-cart-shopping"></i>` and `"Cart"`).
- **Cart Subheader Bar (`.cart_header_bar`)**: Horizontal row bounded by `border-bottom: 1px solid #e5e5e5;`:
  - Left: `.cart_eyebrow` (`"ECO-FRIENDLY & HANDMADE"`) + `.cart_main_title` (`"Your Cart"`).
  - Right: `.cart_review_text` (`"Reviewing <span id="cart_count_highlight">X items</span> selected for checkout"`).

### 5.2 Empty Cart State (`#empty_cart_state`)
- Displayed when `cart.length === 0`.
- **Card (`.empty_cart_card`)**: Centered white card (`max-width: 480px`, `border-radius: 20px`, `padding: 56px 40px`, `box-shadow: 0 8px 24px rgba(0,0,0,0.04)`).
- **Icon Halo (`.empty_icon_circle`)**: `64px x 64px` circular badge (`background-color: #fdecef`, `color: #e03e52`, containing `fa-cart-shopping`).
- **Title (`.empty_title`)**: `"Your Cart is Empty"`.
- **Description (`.empty_desc`)**: `"Looks like you haven't added any handcrafted floral pieces to your cart yet. Explore our sustainable collection to find your favorite."`
- **Call-to-Action (`.start_shopping_btn`)**: Pill button (`background-color: #e03e52`, `color: #ffffff`, `border-radius: 999px`, `padding: 14px 34px`) linking to `product.html`.
- **Trust Note (`.empty_trust_note`)**: Green shield icon (`fa-shield-halved` in `#1bb55c`) with `"Secure Pre-Order COD & WhatsApp Confirmation Available"`.

### 5.3 Populated Cart State (`#populated_cart_state`)
- Displayed when `cart.length > 0`.
- **Layout Grid (`.cart_split_layout`)**: `grid-template-columns: 1.35fr 1fr; gap: 32px;` (collapses to single column `<= 900px`).

#### Left Column: Cart Items (`.cart_items_column`)
- **Cart Item Card (`.cart_item_card`)**:
  - Elevated card (`background-color: #ffffff`, `border-radius: 16px`, `border: 1px solid #eeeeee`, `padding: 20px`, `display: flex`, `gap: 20px`, `position: relative`).
  - **Thumbnail (`.item_thumb`)**: `110px x 110px`, `border-radius: 12px`, `object-fit: cover`.
  - **Category Pill (`.item_tag_pill`)**: Soft pink pill (`#fdecef`, `#e03e52`) displaying `"Recycled Plastic"` or `"Handcrafted"`.
  - **Product Title (`.item_title`)**: Pack name in `18px`, `font-weight: 700`.
  - **Metadata Row (`.item_meta_row`)**:
    - **Color Pill (`.color_pill`)**: Bordered white pill with circular color swatch dot (`.color_dot`) and color name.
    - **Customer Note (`.note_pill`)**: Displays `Note: None` or `Note: <custom_note>` with an edit icon button (`.note_edit_btn`). Clicking toggles into an inline `.note_edit_form` with a text input, save checkmark, and cancel button for immediate `localStorage` updates.
  - **Delete Button (`.item_delete_btn`)**: Positioned at top-right with `fa-trash-can` (`#888888`, hover `#e03e52`).
  - **Bottom Row (`.item_bottom_row`)**: Divided by `border-top: 1px solid #f2f2f2;`:
    - **Unit Price Block (`.unit_price_block`)**: Label `"Unit Price"` (`11px`, `#888888`) and price numeral in IDR format (e.g., `"Rp 15.000"`).
    - **Quantity Stepper (`.qty_stepper`)**: Pill container holding:
      - Decrement (`.qty_btn_minus`): Soft pink circle (`#fdecef`, `#e03e52`).
      - Value (`.qty_value`): Bold text (`14px`, `#1a1a1a`).
      - Increment (`.qty_btn_plus`): Soft green circle (`#eafaf1`, `#1bb55c`).
- **Continue Shopping Button (`.continue_shopping_btn`)**: Outline pill button (`border: 1px solid #333333`, `border-radius: 999px`, `padding: 12px 24px`) displaying `<i class="fa-solid fa-arrow-left"></i> Continue Shopping`.

#### Right Column: Order Summary (`.order_summary_card`)
- **Card Surface**: White card (`border-radius: 20px`, `padding: 32px`, `border: 1px solid #eeeeee`, `position: sticky; top: 100px;`).
- **Heading (`.summary_heading`)**: `"Order Summary"`.
- **Payment & Delivery Information (`.summary_info_group`)**:
  - `PAYMENT METHOD`: `"Cash Only (Pre-Order COD)"`.
  - `DELIVERY MODE`: `"Direct Handover / WhatsApp Scheduled"`.
  - `ORDER DATE`: Real-time order timestamp (`#summary_order_date`).
- **Dashed Divider (`.summary_divider_dashed`)**: `1px dashed #e0e0e0;`.
- **Subtotal & Fee Rows (`.summary_rows`)**:
  - `Items Subtotal (X items)`: Calculated total formatted as `"Rp 25.000,00"`.
  - `Packaging & Recycling Fee`: Green badge `<span class="free_badge">FREE</span>` (`#eafaf1` / `#1bb55c`).
  - `Shipping Fee`: Green badge `<span class="free_badge">FREE (COD PICKUP)</span>`.
- **Solid Divider (`.summary_divider_solid`)**: `1px solid #eeeeee;`.
- **Grand Total Row (`.summary_total_row`)**:
  - Label: `"Total"` (`16px`, `700`).
  - Numeral: Dynamic value in `24px`, `800` (`#summary_grand_total`).
- **COD Guarantee Banner (`.cod_guarantee_box`)**: Soft green box (`#eafaf1`, `border: 1px solid #c8f0d8`, `border-radius: 12px`, `padding: 12px 16px`) pairing checkmark icon (`#1bb55c`) and bold text `"Secure Pre-Order COD By ReBloom"` (`#15803d`).
- **Primary Checkout Button (`#proceed_checkout_btn`)**: Full-width crimson pill (`background-color: #e03e52`, `color: #ffffff`, `padding: 16px`, `border-radius: 999px`, `font-weight: 700`) reading `"Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>"`.
- **Checkout Footnote (`.checkout_footnote`)**: Centered text (`12px`, `#888888`) stating `"Orders are confirmed directly with our admin via WhatsApp upon checkout."`.

---

## 6. Currency Formatting Rules
- **Item Unit Price (`.unit_price_val`)**: Formatted as integer currency without fractional cents:
  - Example: `Rp 10.000`, `Rp 12.000`, `Rp 15.000`.
- **Order Summary Subtotal & Grand Total (`#summary_subtotal_price`, `#summary_grand_total`)**: Formatted with standard Indonesian comma separators and `,00` suffix:
  - Example: `Rp 25.000,00`.

---

## 7. Responsive Breakpoints & Layout Mechanics
1. **Desktop (`> 900px`)**:
   - Split layout: `grid-template-columns: 1.35fr 1fr; gap: 32px;`.
   - Right column `.order_summary_column` uses `position: sticky; top: 100px;`.
2. **Tablet & Mobile (`<= 900px`)**:
   - Layout collapses to single column: `grid-template-columns: 1fr;`.
   - `.order_summary_column` becomes `position: static;`.
   - `.nav_mid` centers menu is hidden for streamlined viewport real estate.
3. **Small Mobile (`<= 576px`)**:
   - `.cart_item_card` switches to vertical column layout (`flex-direction: column`).
   - `.item_thumb` expands to `100%` width with `height: 180px`.
   - Card padding reduces to `24px 18px` for comfortable compact screens.
