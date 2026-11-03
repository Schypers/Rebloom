# Architecture Documentation - ReBloom Web Application (`architecture.md`)

## Table of Contents
1. [System Overview & End-to-End Web Flow](#1-system-overview--end-to-end-web-flow)
2. [Project Directory Structure](#2-project-directory-structure)
3. [Page-Level DOM Architecture](#3-page-level-dom-architecture)
   - [3.1 Landing Page (`index.html`)](#31-landing-page-architecture-indexhtml)
   - [3.2 Product Detail & Configurator (`product.html`)](#32-product-detail--configurator-architecture-producthtml)
   - [3.3 Receipt Page (`receipt.html`)](#33-receipt-page-architecture-receipthtml)
4. [Layout Systems, Grid Mechanics & Responsive Breakpoints](#4-layout-systems-grid-mechanics--responsive-breakpoints)
5. [Client-Side Runtime & State Architecture (`assets/js/script.js`)](#5-client-side-runtime--state-architecture-assetsjsscriptjs)
6. [External Asset, Typography & Styling Pipeline](#6-external-asset-typography--styling-pipeline)

---

## 1. System Overview & End-to-End Web Flow
ReBloom is a static, zero-backend, micro-site frontend web application designed to promote handmade floral decorations crafted from 100% recycled plastic waste and facilitate **Pre-Order / Cash on Delivery (COD)** purchases. The architecture operates without database servers, backend routing, or third-party payment gateways, conducting state transfer across pages via `sessionStorage` (`rebloom_order`) and finalizing transactions via direct WhatsApp handoff (`6282132829795`).

```text
ReBloom End-to-End Application Flow
┌────────────────────────────────────────────────────────────────────────────┐
│ 1. Discovery & Brand Storytelling (index.html + style.css)                 │
│    ├── Brand Hero, Features Bar, Vision & Mission, Origin, Why Choose Us   │
│    ├── Three-Pack Catalog Grid (.prod_grid > 3x .prod_card > .prod_btn)    │
│    │   ├── Card 1 -> product.html?pack=regular                             │
│    │   ├── Card 2 -> product.html?pack=bird_gift                           │
│    │   └── Card 3 -> product.html?pack=lamp_pot                            │
│    └── FAQ Accordion (.faq_box) [Pre-Order COD] & Direct Contact           │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │ Clicks "Order Product" (.prod_btn)
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 2. Product Configurator & Detail Showcase (product.html + product.css)     │
│    ├── Photo Gallery (#prod_main_img + .prod_thumb swapper)                │
│    ├── Dynamic Pack Configurator (.prod_right)                             │
│    │   ├── Hooks: #prod_title, #prod_desc, #price_val                      │
│    │   ├── 4x Flower Color Swatches (Sky Blue, Purple, Orchid, Pastel Pink)│
│    │   ├── Quantity Stepper Pill (.qty_box > - / qty_val / +)              │
│    │   ├── Live Quantity-Based Price Calculation (#price_val)              │
│    │   ├── Special Request Note Input (#custom_note.note_inp)              │
│    │   └── Primary Checkout Action (.prod_buy_btn [BUY NOW])               │
│    └── Dynamic Related Products Showcase (.rel_sec#related_products)       │
│        └── Renders inactive packs + .rel_btn switches active pack via URL  │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │ Captures configuration & saves to
                                      │ sessionStorage ('rebloom_order')
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 3. Order Receipt & WhatsApp Handoff (receipt.html + receipt.css)           │
│    ├── Hydrated Post-Checkout Order Receipt (assets/js/script.js)          │
│    ├── Left Status Confirmation (.rcpt_status)                             │
│    │   ├── Checkmark Status Badge (.status_badge > .badge_inner)           │
│    │   ├── Headline & Screenshot-Free Copy (.status_desc)                  │
│    │   ├── Auto-Copy & WhatsApp CTA (#btn_admin [Send To Admin])           │
│    │   └── Return Navigation (#btn_back [Back To Product])                 │
│    └── Right Dynamic Receipt Card (.rcpt_card)                             │
│        ├── Real Order Timestamp (.info_val [dd MMM yyyy, hh:mm AM/PM])     │
│        ├── Payment Method (.info_val [Cash Only (Pre-Order COD)])          │
│        ├── Line Item (.item_name [<qty>x <pack_name>])                     │
│        ├── Color Indicator Dot (.custom_dot styled with color_hex)         │
│        ├── Custom Text (.custom_text [<Color>, "<Note>" or (No note)])     │
│        ├── Line Item Subtotal (.item_price [Rp XX.000,00])                 │
│        └── Grand Total Summary (.total_group > .total_val [Rp XX.000,00])  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Project Directory Structure

```text
ReBloom Project Root
├── index.html                  # Promotional landing page & product tier catalog
├── product.html                # Dynamic product configurator, color/qty/note selection & related items
├── receipt.html                # Post-checkout dynamic order receipt & WhatsApp handoff view
├── AGENTS.md                   # Antigravity AI workflow entry guide & reading sequence
├── PRD.md                      # Master Product Requirements Document
├── Design_System.md            # UI/UX Design Brief & Hardcoded Design System specifications
├── architecture.md             # Full-project structural & layout architecture documentation
├── variables.md                # Unified dictionary of all HTML/CSS/JS snake_case identifiers
├── changelog.md                # Chronological log of codebase refactors & feature updates
└── assets/
    ├── css/
    │   ├── style.css           # Global & landing page styles (shared navbar, footer, contact)
    │   ├── product.css         # Product detail, configurator & related products styles
    │   └── receipt.css         # Standalone receipt page layout & card styles
    ├── js/
    │   └── script.js           # Shared client runtime: catalog, configurator, dynamic receipt & WhatsApp
    └── images/
        ├── Logo.png            # Brand emblem graphic
        ├── Tulip_hero.png      # Hero section centerpiece floral image
        ├── VM.jpg              # Vision & Mission workshop photo 1
        ├── BungaVM.jpg         # Vision & Mission floral arrangement photo 2
        ├── Fotbar1.jpg         # About Origin team photo 1
        ├── Fotbar2.jpg         # About Origin artisan photo 2
        ├── Product_img.jpg     # Primary product showcase image (regular)
        ├── Product_img_2.jpg   # Product gallery thumbnail 1
        ├── Product_img_3.jpg   # Product gallery thumbnail 2
        ├── Product_img_4.jpg   # Product gallery thumbnail 3 (lamp_pot)
        └── Product_thumbnail.jpg # Catalog and related product preview image (bird_gift)
```

---

## 3. Page-Level DOM Architecture

### 3.1 Landing Page Architecture (`index.html`)

```text
Landing Page Architecture (index.html)
├── Fixed Navigation Header (.navbar)
│   ├── Brand Cluster (.nav_left > a > .logo_img, .logo_txt)
│   ├── Section Links (.nav_mid > li > .nav_link [Home, About, Product, FAQ, Contact])
│   └── Right Utilities (.nav_right > .lang_switch > .lang_btn [IDN, ENG])
│
├── Hero Section (.hero_sec#home)
│   └── Hero Container (.container.hero_container)
│       ├── Dual-Layer Headline (.headline_wrapper > .hero_headline.hero_solid, .hero_headline.hero_outline)
│       └── Three-Column Hero Grid (.hero_grid)
│           ├── Left Copy (.hero_left > .hero_sub_title, .hero_desc)
│           ├── Center Visual (.hero_center > .tulip_img + blurred #E3475D glow)
│           └── Right Action (.hero_right > .btn.btn_primary.hero_cta_btn, .hero_desc.right_desc)
│
├── Value Pillars Bar (.feat_wrap > .container.feat > .feat_bar)
│   └── 4x Feature Items (.feat_item > .feat_icon, .feat_txt) separated by .feat_divider
│
├── Vision & Mission Section (.vm_sec#vision > .container.vm_box)
├── About Origin Section (.about_sec#about > .container.about_box)
├── Why Choose Us Section (.why_sec > .container)
│
├── Product Catalog Section (.prod_sec#products > .container)
│   ├── Section Heading (.prod_heading)
│   └── 3-Column Catalog Grid (.prod_grid > 3x .prod_card)
│       ├── Card 1 (Flower Pot Regular -> product.html?pack=regular)
│       ├── Card 2 (Flower Bird Gift -> product.html?pack=bird_gift)
│       └── Card 3 (Lamp Flower Pot -> product.html?pack=lamp_pot)
│
├── FAQ Accordion Section (.faq_sec#faq > .container)
│   └── Accordion Items (.faq_box > 4x .faq_item > .faq_q, .faq_a [Item 1: Pre-Order COD])
│
├── Contact Section (.contact_sec#contact > .container.contact_box)
│   ├── Left Info (.contact_left > .contact_logo_box, .contact_title, .contact_wa_btn)
│   └── Right Form (.contact_right > #contact_form)
│
└── Global Footer (.footer > .container > .footer_txt)
```

### 3.2 Product Detail & Configurator Architecture (`product.html`)

```text
Product Detail & Configurator Architecture (product.html)
├── Fixed Navigation Header (.navbar) [Shared with index.html]
│
├── Product Detail & Configurator Section (.prod_sec#product_detail > .container.prod_wrap)
│   ├── Left Gallery Column (.prod_left)
│   │   ├── Main Photo Stage (.prod_main_box > .prod_main_img#prod_main_img)
│   │   └── Thumbnail Switcher Row (.prod_thumbs > 3x .prod_thumb > .prod_thumb_img)
│   │
│   └── Right Configurator Column (.prod_right)
│       ├── Product Heading (.prod_title#prod_title)
│       ├── Product Description (.prod_desc#prod_desc)
│       ├── Review Rating Row (.prod_rating > .prod_stars [5x fa-star], .prod_rate_txt)
│       ├── Interactive Customization Controls
│       │   ├── Two-Column Customization Row (.custom_row)
│       │   │   ├── Flower Color Selector (.color_sec > .custom_lbl, .swatch_grp > 4x .color_swatch)
│       │   │   │   ├── Sky Blue (.swatch_blue [active])
│       │   │   │   ├── Purple (.swatch_purple)
│       │   │   │   ├── Orchid Pink (.swatch_orchid)
│       │   │   │   └── Pastel Pink (.swatch_pink)
│       │   │   └── Quantity Stepper Pill (.qty_sec > .custom_lbl, .qty_box > .qty_minus, .qty_val, .qty_plus)
│       │   └── Special Request Note (.note_sec > .custom_lbl, #custom_note.note_inp)
│       ├── Live Price Display (.prod_price_box > .price_curr ["Rp"], .price_val#price_val)
│       ├── Security Trust Badge (.prod_sec_pay > .sec_pay_icon, .sec_pay_brand)
│       └── Primary Checkout CTA (.btn.btn_primary.prod_buy_btn [BUY NOW])
│
├── Related Products Section (.rel_sec#related_products > .container.rel_wrap)
│   ├── Left Recommendation Cards (.rel_left) [Dynamically rendered from pack_catalog]
│   │   └── 2x .rel_card (.rel_img_box, .rel_card_title, .rel_card_rating, .rel_card_price, .rel_btn)
│   └── Right Section Narrative (.rel_right > .rel_title, .rel_divider, .rel_desc)
│
├── Contact Section (.contact_sec#contact) [Shared with index.html]
└── Global Footer (.footer) [Shared with index.html]
```

### 3.3 Receipt Page Architecture (`receipt.html`)

```text
ReBloom Receipt Page Architecture (receipt.html)
├── Navigation Header (header > nav.navbar)
│   ├── Brand Cluster (.nav_left > a > .logo_img, .logo_txt)
│   ├── Menu Links (.nav_mid > li > .nav_link)
│   └── Actions (.nav_right > .lang_switch, .btn_cart)
│
└── Main Layout Canvas (.rcpt_layout)
    └── Two-Column Container (.rcpt_container)
        ├── Left Column: Order Confirmation (.rcpt_status)
        │   ├── Circular Status Badge (.status_badge > .badge_inner > .chk_icon)
        │   ├── Status Headline (.status_title)
        │   ├── Screenshot-Free Instruction Paragraph (.status_desc)
        │   └── Action Buttons (.status_actions)
        │       ├── Primary WhatsApp & Auto-Copy CTA (.btn_primary#btn_admin) [Send To Admin]
        │       └── Outline Return CTA (.btn_outline#btn_back) [Back To Product > .btn_arrow]
        │
        └── Right Column: Dynamic Receipt Card (.rcpt_card)
            ├── Card Title (.card_title ["Order Details"])
            ├── Order Metadata (.order_info)
            │   ├── Date & Time Group (.info_group > .info_label, .info_val [Real Timestamp])
            │   └── Payment Method Group (.info_group > .info_label, .info_val ["Cash Only (Pre-Order COD)"])
            ├── Dashed Divider (.divider_dash)
            ├── Line Items Section (.items_sec)
            │   ├── Section Header (.items_title ["Items Details"])
            │   ├── Top Solid Divider (.divider_solid)
            │   ├── Item Row (.item_row)
            │   │   ├── Item Name (.item_name [<qty>x <pack_name>])
            │   │   ├── Custom Note & Swatch Indicator (.prod_desc > .custom_dot, .custom_text)
            │   │   └── Item Subtotal (.item_price [Calculated Total])
            │   └── Bottom Solid Divider (.divider_solid)
            └── Grand Total (.total_group > .total_label ["Total"], .total_val [Calculated Total])
```

---

## 4. Layout Systems, Grid Mechanics & Responsive Breakpoints

### 4.1 Global Containers & Layout Mechanics
- **Primary Content Wrapper (`.container`)**: Constrains content width to `1200px` (`width: 100%`, `margin: 0 auto`, `padding: 0 20px`).
- **Landing Page Grids (`assets/css/style.css`)**:
  - `.hero_grid`: 3-column CSS Grid (`grid-template-columns: 1fr auto 1fr`).
  - `.why_grid`: 2-column CSS Grid (`grid-template-columns: 1fr 1fr`, `gap: 40px 60px`).
  - `.prod_grid`: 3-column CSS Grid (`grid-template-columns: repeat(3, 1fr)`, `gap: 30px`).
- **Product Showcase & Configurator Layout (`assets/css/product.css`)**:
  - `.prod_wrap`: 2-column Flexbox layout (`gap: 55px`, `width: 100%`) partitioning `.prod_left` gallery (`flex: 1`) and `.prod_right` configurator (`flex: 1.1`).
  - `.custom_row`: 2-column Flexbox row pairing circular `.color_sec` swatches with `.qty_sec` pill stepper.
  - `.rel_wrap`: 2-column Flexbox layout (`gap: 60px`) partitioning recommendation cards (`.rel_left`, `flex: 1.1`) and narrative copy (`.rel_right`, `flex: 0.9`).
- **Receipt Canvas (`assets/css/receipt.css`)**:
  - `.rcpt_layout`: Viewport-centering flex container (`min-height: 100vh`, `padding: 60px 24px`, `background-color: #F5F6F8`).
  - `.rcpt_container`: 2-column horizontal flexbox (`max-width: 960px`, `gap: 50px`) pairing `.rcpt_status` and `.rcpt_card`.

### 4.2 Responsive Breakpoints Matrix
| Breakpoint | Target Scope | Structural Transformations |
| :--- | :--- | :--- |
| **`<= 1200px`** | `style.css` | Scales `.hero_headline` from `160px` down to `130px`. |
| **`<= 992px`** | `style.css`, `product.css` | Collapses `.hero_grid`, `.why_grid`, and `.prod_grid` to `1fr`. Stacks `.vm_box`, `.about_box`, `.contact_box`, `.feat_bar`, and `.prod_wrap` vertically (`flex-direction: column`). Inverts `.rel_wrap` order (`flex-direction: column-reverse`). |
| **`<= 860px`** | `receipt.css` | Hides `.nav_mid` links on receipt navbar. Transitions `.rcpt_container` from 2 columns to a single-column vertical stack (`flex-direction: column`, `gap: 40px`) with `100%` width on status and receipt cards. |
| **`<= 768px`** | `product.css` | Scales `#product_detail .prod_title` to `34px`, `.price_val` to `42px`, and stacks `.rel_left` related cards vertically. |
| **`<= 576px`** | `style.css` | Hides center navigation links (`.nav_mid`), scales `.hero_headline` to `64px`, and scales section titles to `30px`. |
| **`<= 480px`** | `receipt.css`, `product.css` | Compacts `.navbar` padding (`14px 16px`), `.rcpt_card` padding (`24px 20px`), `.status_title` font size (`20px`), full-width `.status_actions`, and single-column collapse for `.custom_row`. |

---

## 5. Client-Side Runtime & State Architecture (`assets/js/script.js`)

All client-side application logic is contained in `assets/js/script.js` and initialized on `DOMContentLoaded`:

1. **Pack Catalog Contract (`pack_catalog`)**:
   - Dictionary storing `regular` (`Rp 10.000`), `bird_gift` (`Rp 12.000`), and `lamp_pot` (`Rp 15.000`) with exact titles, descriptions, numeric unit prices, and imagery.
2. **URL-Based Pack Routing & Sync**:
   - Reads `?pack=` on `product.html` load, defaulting to `regular` if missing or invalid.
   - Synchronizes product heading (`#prod_title`), description (`#prod_desc`), primary image (`#prod_main_img`), and unit price.
   - Updates `window.history.pushState` when switching packs via related products and listens to `popstate` events.
3. **Dynamic Related Products Generator**:
   - Filters the catalog to find the two inactive packs and dynamically renders `.rel_card` elements with `Switch / Order Pack` buttons.
4. **Live Price Calculation**:
   - Computes `unit_price * quantity` and updates `#price_val` on quantity increment/decrement and pack switching.
5. **Color Swatch Interaction**:
   - Supports 4 swatches (Sky Blue `#0084FF`, Purple `#A855F7`, Orchid Pink `#E199D2`, Pastel Pink `#F5B0C4`).
   - Toggles `.active` styling and captures `data-color` and `data-hex`.
6. **Pre-Order State Persistence (`sessionStorage`)**:
   - On `.prod_buy_btn` click, packages order details into `rebloom_order` and navigates to `receipt.html`.
7. **Receipt Dynamic Hydration**:
   - Reads `sessionStorage.getItem('rebloom_order')` in `receipt.html`.
   - Hydrates timestamp, payment method (`Cash Only (Pre-Order COD)`), line item title (`<qty>x <pack_name>`), color dot hex, formatted note, item price, and total amount.
8. **Automated Clipboard Copy & WhatsApp Handoff**:
   - Constructs structured plain-text receipt summary `wa_message`.
   - Copies `wa_message` to clipboard via `navigator.clipboard.writeText()` and redirects to `https://wa.me/6282132829795?text=...` with visual feedback ("Receipt Copied! Opening WhatsApp...").

---

## 6. External Asset, Typography & Styling Pipeline
- **Hardcoded CSS Policy**: Strictly zero `:root` declarations and zero `var(--...)` custom properties across `style.css`, `product.css`, and `receipt.css`. Hex colors and dimensions are hardcoded directly into rules:
  - Primary Brand Crimson: `#E3475D` (Hover: `#cc374c`, Tints: `#FFF0F2`, `#FDE8EC`, `#FCE8EE`).
  - Secondary Eco Green: `#24CC63` (Ring: `#DDF5E6`).
  - Secondary Pastel Pink: `#F5B0C4`.
  - Swatch Purple: `#A855F7`.
  - Swatch Orchid Pink: `#E199D2`.
  - Swatch Sky Blue: `#0084FF`.
  - Review Star Gold: `#FBBF24`.
  - Neutrals: `#1E1E1E` (Headings/Active), `#5A5A5A` / `#6E6E6E` (Muted), `#FFFFFF` (Surfaces), `#F5F6F8` (Receipt Canvas), `#F7F4ED` (Image Stage), `#EAEAEA` (Borders).
- **Typography Pipeline**:
  - **Brand Wordmark & Accent**: `'Telma', cursive, serif` (weights `300, 400, 500, 700`) via Fontshare CDN.
  - **Primary UI & Body**: `'Figtree', sans-serif` (weights `300..900`) via Google Fonts CDN.
- **Iconography Pipeline**:
  - **Font Awesome 6.4.0** loaded globally. Inline `<svg>` tags are strictly forbidden across all HTML files.
