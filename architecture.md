# Architecture Documentation - ReBloom Web Application (`architecture.md`)

## Table of Contents
1. [System Overview & End-to-End Web Flow](#1-system-overview--end-to-end-web-flow)
2. [Project Directory Structure](#2-project-directory-structure)
3. [Page-Level DOM Architecture](#3-page-level-dom-architecture)
   - [3.1 Landing Page (`index.html`)](#31-landing-page-architecture-indexhtml)
   - [3.2 Product Detail & Configurator (`product.html`)](#32-product-detail--configurator-architecture-producthtml)
   - [3.3 Shopping Cart & Receipt Page (`receipt.html`)](#33-shopping-cart--receipt-page-architecture-receipthtml)
4. [Layout Systems, Grid Mechanics & Responsive Breakpoints](#4-layout-systems-grid-mechanics--responsive-breakpoints)
5. [Client-Side Runtime & Decoupled Script Architecture](#5-client-side-runtime--decoupled-script-architecture)
6. [External Asset, Typography & Styling Pipeline](#6-external-asset-typography--styling-pipeline)

---

## 1. System Overview & End-to-End Web Flow
ReBloom is a static, zero-backend, micro-storefront frontend web application designed to promote handmade floral decorations crafted from 100% recycled plastic waste and facilitate **Pre-Order / Cash on Delivery (COD)** purchases. The architecture operates without database servers, backend routing, or third-party payment gateways, conducting state persistence across pages via `localStorage` (`rebloom_cart`) and finalizing transactions via direct WhatsApp handoff (`6282132829795`).

```text
ReBloom End-to-End Application Flow
┌────────────────────────────────────────────────────────────────────────────┐
│ 1. Discovery & Brand Storytelling (index.html + style.css + script.js)     │
│    ├── Brand Hero, Features Bar, Vision & Mission, Origin, Why Choose Us   │
│    ├── Three-Pack Catalog Grid (.prod_grid > 3x .prod_card > .prod_btn)    │
│    │   ├── Card 1 -> product.html                                          │
│    │   ├── Card 2 -> product_2.html                                        │
│    │   └── Card 3 -> product_3.html                                        │
│    └── FAQ Accordion (.faq_box) [Pre-Order COD] & Direct Contact           │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │ Clicks "Order Product" (.prod_btn)
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 2. Dedicated Product Pages (product.html, product_2.html, product_3.html)  │
│    ├── Dedicated Controller: assets/js/product.js                          │
│    ├── Standardized 4-Photo Gallery (#prod_main_img + 3x .prod_thumb)      │
│    │   └── Farthest-Left Queue Rotation on thumbnail click (150ms opacity) │
│    ├── Dynamic Pack Configurator (.prod_right)                             │
│    │   ├── Hooks: #prod_title, #prod_desc, #price_val                      │
│    │   ├── 4x Flower Color Swatches (Sky Blue, Purple, Orchid, Pastel Pink)│
│    │   ├── Quantity Stepper Pill (.qty_box > - / qty_val / +)              │
│    │   ├── Live Quantity-Based Price Calculation (#price_val)              │
│    │   ├── Special Request Note Input (#custom_note.note_inp)              │
│    │   └── Primary Checkout Action (.prod_buy_btn [BUY NOW])               │
│    └── Related Products Showcase (.rel_sec#related_products)               │
│        └── .rel_btn navigates to other packs via window.location.href      │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │ Saves / appends configured item into
                                      │ localStorage ('rebloom_cart')
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 3. Shopping Cart & Receipt Page (receipt.html + receipt.css + receipt.js)  │
│    ├── Subheader Bar: Eyebrow, "Your Cart", & Dynamic Count Highlight      │
│    ├── State A: Empty Cart (#empty_cart_state)                             │
│    │   └── Centered card, soft pink cart circle, Start Shopping CTA        │
│    └── State B: Populated Cart (#populated_cart_state)                     │
│        ├── Left Column: Cart Items List (.cart_items_column)               │
│        │   ├── Item Cards (.cart_item_card): Thumbnail, category badge,    │
│        │   │   title, color dot pill, editable note, trash delete button,  │
│        │   │   unit price, and +/- quantity stepper                        │
│        │   └── Continue Shopping Button (.continue_shopping_btn)           │
│        └── Right Column: Sticky Order Summary (.order_summary_card)        │
│            ├── Payment Method: Cash Only (Pre-Order COD)                   │
│            ├── Delivery Mode: Direct Handover / WhatsApp Scheduled         │
│            ├── Real-Time Order Date (#summary_order_date)                  │
│            ├── Subtotal (#summary_subtotal_price)                          │
│            ├── Green FREE Badges for Packaging & Shipping Fees             │
│            ├── Grand Total (#summary_grand_total)                          │
│            ├── Green COD Guarantee Box (.cod_guarantee_box)                │
│            ├── Proceed to Checkout Button (#proceed_checkout_btn)          │
│            │   └── Copies itemized receipt & opens WhatsApp (wa.me)        │
│            └── Checkout Footnote (.checkout_footnote)                      │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Project Directory Structure

```text
ReBloom Project Root
├── index.html                  # Promotional landing page (loads ONLY assets/js/script.js)
├── product.html                # Pack 1 (Flower Pot Regular) page (loads ONLY assets/js/product.js)
├── product_2.html              # Pack 2 (Flower Bird Gift) page (loads ONLY assets/js/product.js)
├── product2.html               # Synced Pack 2 mirror route for zero-404 compatibility
├── product_3.html              # Pack 3 (Lamp Flower Pot) page (loads ONLY assets/js/product.js)
├── product3.html               # Synced Pack 3 mirror route for zero-404 compatibility
├── receipt.html                # Dual-state shopping cart (loads ONLY assets/js/receipt.js)
├── AGENT.md                    # Antigravity AI workflow entry guide & reading sequence
├── PRD.md                      # Master Product Requirements Document
├── Design_System.md            # UI/UX Design Brief & Hardcoded Design System specifications
├── architecture.md             # Full-project structural & layout architecture documentation
├── variables.md                # Unified dictionary of all HTML/CSS/JS snake_case identifiers
├── changelog.md                # Chronological log of codebase refactors & feature updates
└── assets/
    ├── css/
    │   ├── style.css           # Global & landing page styles (shared navbar, footer, contact)
    │   ├── product.css         # Product detail, configurator & related products styles
    │   └── receipt.css         # Shopping cart dual-state layout, item cards & sticky summary
    ├── js/
    │   ├── script.js           # Dedicated Landing Page Controller (index.html ONLY)
    │   ├── product.js          # Dedicated Product Configurator & Gallery Controller (product*.html ONLY)
    │   └── receipt.js          # Dedicated Shopping Cart & WhatsApp Controller (receipt.html ONLY)
    └── images/
        ├── Logo.png            # Brand emblem graphic
        ├── Tulip_hero.png      # Hero section centerpiece floral image
        ├── VM.jpg              # Vision & Mission workshop photo 1
        ├── BungaVM.jpg         # Vision & Mission floral arrangement photo 2
        ├── Fotbar1.jpg         # About Origin team photo 1
        ├── Fotbar2.jpg         # About Origin artisan photo 2
        ├── Product_1.jpg       # Pack 1 main showcase image (Flower Pot Regular)
        ├── Product_1_Desk.jpg  # Pack 1 desk thumbnail
        ├── Product_1_Makro.jpg # Pack 1 macro thumbnail
        ├── Product_1_Black.jpg # Pack 1 black background thumbnail
        ├── Product_2.jpg       # Pack 2 main showcase image (Flower Bird Gift)
        ├── Product_2_Desk.jpg  # Pack 2 desk thumbnail
        ├── Product_2_Makro.jpg # Pack 2 macro thumbnail
        ├── Product_2_Black.jpg # Pack 2 black background thumbnail
        ├── Product_3.jpg       # Pack 3 main showcase image (Lamp Flower Pot)
        ├── Product_3_Desk.jpg  # Pack 3 desk thumbnail
        ├── Product_3_Makro.jpg # Pack 3 macro thumbnail
        ├── Product_3_Black.jpg # Pack 3 black background thumbnail
        ├── Product_img_4.jpg   # Product gallery legacy asset
        └── Product_thumbnail.jpg # Catalog preview thumbnail
```

---

## 3. Page-Level DOM Architecture

### 3.1 Landing Page Architecture (`index.html`)

```text
Landing Page Architecture (index.html -> assets/js/script.js)
├── Fixed Navigation Header (.navbar)
│   ├── Brand Cluster (.nav_left > a > .logo_img, .logo_txt)
│   ├── Section Links (.nav_mid > li > .nav_link [Home, About, Product, FAQ, Contact])
│   └── Right Utilities (.nav_right > .lang_switch > .lang_btn [IDN, ENG])
│
├── Hero Section (.hero_sec#home)
│   └── Hero Container (.container.hero_container)
│       ├── Dual-Layer Headline (.headline_wrapper > .hero_headline.hero_solid, .hero_headline.hero_outline)
│       └── Three-Column Hero Grid (.hero_grid)
│
├── Value Pillars Bar (.feat_wrap > .container.feat > .feat_bar)
├── Vision & Mission Section (.vm_sec#vision > .container.vm_box)
├── About Origin Section (.about_sec#about > .container.about_box)
├── Why Choose Us Section (.why_sec > .container)
├── Product Catalog Section (.prod_sec#products > .container)
├── FAQ Accordion Section (.faq_sec#faq > .container)
├── Contact Section (.contact_sec#contact > .container.contact_box)
└── Global Footer (.footer > .container > .footer_txt)
```

### 3.2 Product Detail & Configurator Architecture (`product.html`, `product_2.html`, `product_3.html`)

```text
Product Detail & Configurator Architecture (product*.html -> assets/js/product.js)
├── Fixed Navigation Header (.navbar)
├── Product Detail Section (.prod_sec#product_detail > .container.prod_wrap)
│   ├── Left Column: Photo Stage & Gallery (.prod_left)
│   │   ├── Stage Photo (#prod_main_img)
│   │   └── Thumbnails (.prod_thumbs > 3x .prod_thumb > .prod_thumb_img)
│   │       └── Farthest-Left Queue Rotation Algorithm (promotes clicked thumb, shifts old preview to index 0)
│   └── Right Column: Dynamic Configurator Panel (.prod_right)
│       ├── Title (#prod_title) & Description (#prod_desc)
│       ├── Rating Row (.prod_rating)
│       ├── Customization Row (.custom_row > .color_sec, .qty_sec)
│       │   ├── 4x Swatches (Sky Blue, Purple, Orchid Pink, Pastel Pink)
│       │   └── Stepper (- / qty_val / +)
│       ├── Note Input (.note_sec > #custom_note.note_inp)
│       ├── Live Price Display (.prod_price_box > .price_curr, #price_val)
│       ├── Trust Badge (.prod_sec_pay)
│       └── Buy Button (.prod_buy_btn [BUY NOW])
├── Related Products Showcase (.rel_sec#related_products)
│   └── 2x Related Cards (.rel_card > .rel_btn [Switch / Order Pack]) -> window.location.href
├── Contact Section (.contact_sec#contact)
└── Global Footer (.footer)
```

### 3.3 Shopping Cart & Receipt Page Architecture (`receipt.html`)

```text
ReBloom Shopping Cart & Receipt Architecture (receipt.html -> assets/js/receipt.js)
├── Navigation Header (header > nav.navbar)
│   ├── Brand Cluster (.nav_left > a > .logo_img, .logo_txt)
│   ├── Menu Links (.nav_mid > li > .nav_link)
│   └── Actions (.nav_right > .lang_switch, .btn_cart)
│
└── Main Layout Wrapper (.cart_page_wrapper)
    └── Page Container (.cart_page_container)
        ├── Cart Subheader Bar (.cart_header_bar)
        │   ├── Left: Eyebrow (.cart_eyebrow) + Title (.cart_main_title)
        │   └── Right: Review Count (.cart_review_text > #cart_count_highlight)
        │
        ├── State 1: Empty Cart Section (#empty_cart_state)
        │   └── Centered Card (.empty_cart_card)
        │       ├── Icon Halo (.empty_icon_circle > fa-cart-shopping)
        │       ├── Heading (.empty_title ["Your Cart is Empty"])
        │       ├── Description (.empty_desc)
        │       ├── Start Shopping CTA (.start_shopping_btn > fa-arrow-right)
        │       └── Trust Note (.empty_trust_note > fa-shield-halved)
        │
        └── State 2: Populated Cart Section (#populated_cart_state)
            └── Split Layout Grid (.cart_split_layout)
                ├── Left Column: Cart Items (.cart_items_column)
                │   ├── Dynamic Items Container (#cart_items_list)
                │   │   └── Cart Item Cards (.cart_item_card)
                │   │       ├── Thumbnail (.item_thumb)
                │   │       ├── Delete Action (.item_delete_btn > fa-trash-can)
                │   │       └── Details (.item_details)
                │   │           ├── Category Pill (.item_tag_pill)
                │   │           ├── Product Title (.item_title)
                │   │           ├── Meta Row (.item_meta_row)
                │   │           │   ├── Color Pill (.color_pill > .color_dot, color name)
                │   │           │   └── Note Pill (.note_pill > .note_edit_btn) OR Inline Form (.note_edit_form)
                │   │           └── Bottom Row (.item_bottom_row)
                │   │               ├── Unit Price (.unit_price_block > .unit_price_label, .unit_price_val)
                │   │               └── Stepper (.qty_stepper > .qty_btn_minus, .qty_value, .qty_btn_plus)
                │   └── Continue Shopping Button (.continue_shopping_wrapper > .continue_shopping_btn)
                │
                └── Right Column: Order Summary (.order_summary_column)
                    └── Sticky Summary Card (.order_summary_card)
                        ├── Heading (.summary_heading ["Order Summary"])
                        ├── Info Group (.summary_info_group)
                        │   ├── Payment Method (.summary_info_row > label, value)
                        │   ├── Delivery Mode (.summary_info_row > label, value)
                        │   └── Order Date (.summary_info_row > label, #summary_order_date)
                        ├── Dashed Divider (.summary_divider_dashed)
                        ├── Summary Rows (.summary_rows)
                        │   ├── Items Subtotal (#summary_item_count, #summary_subtotal_price)
                        │   ├── Packaging Fee (.free_badge ["FREE"])
                        │   └── Shipping Fee (.free_badge ["FREE (COD PICKUP)"])
                        ├── Solid Divider (.summary_divider_solid)
                        ├── Grand Total Row (.summary_total_row > #summary_grand_total)
                        ├── COD Guarantee Banner (.cod_guarantee_box > fa-circle-check, text)
                        ├── Checkout Button (#proceed_checkout_btn)
                        └── Footnote (.checkout_footnote)
```

---

## 4. Layout Systems, Grid Mechanics & Responsive Breakpoints

### 4.1 Split Layout Grid Mechanics (`assets/css/receipt.css`)
- **Cart Split Grid (`.cart_split_layout`)**:
  - `display: grid; grid-template-columns: 1.35fr 1fr; gap: 32px; align-items: flex-start;`
  - Allows the cart items list to comfortably occupy the wider primary area, while the summary card stays anchored in the complementary column.
- **Sticky Column (`.order_summary_column`)**:
  - `position: sticky; top: 100px;` ensuring seamless accessibility during long cart reviews.

### 4.2 Responsive Breakpoints Matrix
| Breakpoint | Target Scope | Structural Transformations |
| :--- | :--- | :--- |
| **`> 900px`** | `receipt.css` | 2-column split layout (`1.35fr 1fr`), sticky order summary, full navigation links. |
| **`<= 900px`** | `receipt.css` | Collapses `.cart_split_layout` to single column (`1fr`). `.order_summary_column` becomes `position: static`. Hides `.nav_mid` links. |
| **`<= 576px`** | `receipt.css` | Cart item cards stack vertically (`flex-direction: column`). Thumbnail expands to full width (`100%`, `180px`). Padding compacts. |

---

## 5. Client-Side Runtime & Decoupled Script Architecture

To eliminate cross-page dead code and prevent double-bound event listeners, JavaScript controllers are strictly decoupled into a 1-to-1 page-to-script architecture:

### 5.1 Landing Page Controller (`assets/js/script.js` -> `index.html` ONLY)
Contains strictly scoped Landing Page features initialized on `DOMContentLoaded`:
1. **Language Switcher (`.lang_switch .lang_btn`)**: Switches active language toggle between `IDN` and `ENG`.
2. **Navbar Scroll Spy (`section[id]`, `.nav_link`)**: Updates active anchor states as the user scrolls.
3. **FAQ Accordion (`.faq_item`, `.faq_q`, `.faq_icon`)**: Single-open interactive accordion with chevron glyph toggling.
4. **Contact Form (`#contact_form`)**: Client-side inquiry submission interceptor and alert.

### 5.2 Product Configurator Controller (`assets/js/product.js` -> `product.html`, `product_2.html`, `product_3.html`)
Contains all product-specific logic initialized on `DOMContentLoaded`:
1. **Master Catalog Contract (`pack_catalog`)**: Definitions for `regular` (`Rp 10.000`, `product.html`), `bird_gift` (`Rp 12.000`, `product_2.html`), and `lamp_pot` (`Rp 15.000`, `product_3.html`) with standardized 4-photo gallery sets.
2. **Farthest-Left Queue Rotation Gallery Swapper**: Promotes clicked thumbnail to `#prod_main_img` and shifts previous main preview into the farthest-left slot (`thumb_imgs[0]`), sliding intermediate thumbnails to the right with a 150ms opacity transition.
3. **Multi-Page Routing & Navigation**: Evaluates pathname or `?pack=` query param to initialize pack state, and navigates across dedicated pages (`product.html`, `product_2.html`, `product_3.html`) via `window.location.href = target_pack.page_url`.
4. **Related Products Switcher**: Dynamically renders alternative packs with `.rel_btn` calling `switch_active_pack`.
5. **Color Swatch Selection**: Toggles active selection among 4 floral swatches.
6. **Quantity Stepper & Live Pricing**: Bound stepper with minimum limit 1 and live IDR formatting.
7. **Cart Persistence & Buy Action**: Appends or increments item in `localStorage` under `rebloom_cart`, stores `sessionStorage` fallback under `rebloom_order`, and redirects to `receipt.html`.
8. **Shared Utilities**: Page-scoped language toggle and contact form handler.

### 5.3 Shopping Cart & Receipt Controller (`assets/js/receipt.js` -> `receipt.html` ONLY)
Dedicated shopping cart and WhatsApp pre-order controller initialized on `DOMContentLoaded`:
1. **`localStorage` State Persistence**: Reads and updates `rebloom_cart` array with legacy single-item migration fallback.
2. **Two-State Dynamic Hydration**: Dispatches `#empty_cart_state` when empty, or renders `#populated_cart_state` with live card items.
3. **Quantity Steppers & Removal**: Live increment, decrement (auto-delete at 0), and trash icon removal.
4. **Inline Customer Note Editing**: Interactive form toggling with checkmark save and cancel.
5. **Real-Time Recalculations**: Subtotals, grand total, and currency formatting (`Rp XX.000` / `Rp XX.000,00`).
6. **WhatsApp Pre-Order COD Checkout**: Itemizes cart contents into pre-formatted message, copies to clipboard, and opens `https://wa.me/6282132829795`.

---

## 6. External Asset, Typography & Styling Pipeline
- **Fontshare CDN**: Font `Telma` (`weights 300, 400, 500, 700`).
- **Google Fonts CDN**: Font `Figtree` (`weights 400, 500, 600, 700, 800`).
- **Font Awesome CDN (v6.4.0)**: Icons for cart (`fa-cart-shopping`), trash (`fa-trash-can`), arrows (`fa-arrow-right`, `fa-arrow-left`), checkmarks (`fa-circle-check`, `fa-check`), cancel (`fa-xmark`), pen (`fa-pen-to-square`), and shield (`fa-shield-halved`).
- **Zero CSS Variables**: Hardcoded color hexes and dimensions throughout.
