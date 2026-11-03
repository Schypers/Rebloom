# Unified Variables & Identifiers Dictionary - ReBloom Codebase

## 1. Global & Shared Utilities

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `container` | `index.html`, `product.html`, `style.css` | Container Layout Wrapper | Centers page content horizontally and constrains layout width up to 1200px. |
| `btn` | `index.html`, `product.html`, `style.css` | Button Base Component | Standardizes padding, typography, 50px pill radius, and smooth hover transitions. |
| `btn_primary` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Primary Action Button | Applies primary crimson background `#E3475D` with white text and hover lift. |
| `hl_red` | `index.html`, `product.html`, `style.css` | Highlight Crimson Text | Utility class applying bold crimson color `#E3475D` to emphasized headline words. |
| `font_telma` | `style.css` | Telma Font Family Utility | Sets typography to expressive cursive serif 'Telma' font. |
| `active` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css`, `script.js` | Active State Modifier | Dynamic state class marking active navigation links, selected language toggles, open FAQ cards, and selected color swatches. |

---

## 2. Navigation & Header Components

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `navbar` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Fixed Navigation Bar | Full-width fixed top header with semi-transparent frosted background and subtle shadow. |
| `nav_left` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Navigation Left Cluster | Left alignment wrapper grouping brand logo image and wordmark anchor. |
| `logo_img` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Logo Graphic Image | Brand mark image asset constrained to 44px height. |
| `logo_txt` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Brand Wordmark Text | Cursive brand name rendered in 'Telma' font styled in crimson `#E3475D`. |
| `nav_mid` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Navigation Center Menu | Horizontally centered menu holding primary page section anchor links. |
| `nav_link` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css`, `script.js` | Navigation Menu Link | Interactive navigation anchor with hover color transition and scroll spy active indicator. |
| `nav_right` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Navigation Right Cluster | Container clustering right-aligned utility tools such as language switchers and cart button. |
| `lang_switch` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Language Switcher Capsule | Bordered pill capsule enclosing Indonesian and English locale selector buttons. |
| `lang_btn` | `index.html`, `product.html`, `receipt.html`, `style.css`, `receipt.css` | Language Selection Button | Interactive toggle button switching between `IDN` and `ENG` interface languages. |
| `btn_cart` | `receipt.html`, `receipt.css` | Cart Action Button | Crimson pill anchor button linking to shopping cart with hover elevation. |
| `cart_icon` | `receipt.html`, `receipt.css` | Cart Glyph Icon | Font Awesome cart icon (`fa-cart-shopping`) sized at 15px inside cart button. |

---

## 3. Home Page Components (`index.html`, `assets/css/style.css`)

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `hero_sec` | `index.html`, `style.css` | Hero Main Section | Full-viewport introductory section showcasing hero title, tulip centerpiece, and catalog CTA. |
| `hero_container` | `index.html`, `style.css` | Hero Content Container | Relative vertical flex container coordinating headline and three-column subgrid. |
| `headline_wrapper` | `index.html`, `style.css` | Headline Layer Wrapper | Bounding box overlaying solid and stroked typography layers for visual depth. |
| `hero_headline` | `index.html`, `style.css` | Hero Display Headline | 160px ultra-bold title "Decor At Finest" with tight negative letter-spacing. |
| `hero_solid` | `index.html`, `style.css` | Hero Solid Text Layer | Base solid dark typography layer rendered behind outline text. |
| `hero_outline` | `index.html`, `style.css` | Hero Outline Text Layer | Top transparent typography layer with 1px stroke creating overlapping depth. |
| `hero_finest` | `index.html`, `style.css` | Hero Script Accent | Italic cursive Telma wordmark emphasizing "Finest" in crimson `#E3475D`. |
| `hero_grid` | `index.html`, `style.css` | Hero Three-Column Grid | Coordinates left description copy, center tulip visual, and right action button. |
| `hero_left` | `index.html`, `style.css` | Hero Left Text Column | Contains secondary heading and description of recycled plastic craftsmanship. |
| `hero_sub_title` | `index.html`, `style.css` | Hero Subtitle Heading | Bold 26px heading "Turning Waste Into Something Beautiful". |
| `hero_desc` | `index.html`, `style.css` | Hero Description Paragraph | Muted body copy highlighting handmade craftsmanship and sustainability. |
| `hero_center` | `index.html`, `style.css` | Hero Visual Container | Absolutely positioned container centering the tulip floral image with radial glow. |
| `tulip_img` | `index.html`, `style.css` | Centerpiece Tulip Image | 495px handcrafted tulip centerpiece image with smooth hover scaling. |
| `hero_right` | `index.html`, `style.css` | Hero Right Action Column | Right-aligned block containing the catalog CTA button and promotional caption. |
| `hero_cta_btn` | `index.html`, `style.css` | Hero Catalog Button | Crimson pill button navigating customer to `#products`. |
| `right_desc` | `index.html`, `style.css` | Right Promotional Caption | Caption text promoting the Limited Time Pack. |
| `feat_wrap` | `index.html`, `style.css` | Features Section Wrapper | Full-width section framing the elevated features card bar. |
| `feat` | `index.html`, `style.css` | Features Container Modifier | Elevates z-index of feature bar container above surrounding canvas elements. |
| `feat_bar` | `index.html`, `style.css` | Features Banner Card | Rounded surface card with border and drop shadow presenting four core value pillars. |
| `feat_item` | `index.html`, `style.css` | Feature Item Row | Horizontal flex item pairing an icon and short benefit statement. |
| `feat_divider` | `index.html`, `style.css` | Feature Vertical Divider | 1px light gray vertical line separating individual feature items. |
| `feat_icon` | `index.html`, `style.css` | Feature Icon Container | Solid green `#24CC63` icon glyph container. |
| `feat_txt` | `index.html`, `style.css` | Feature Label Text | Medium-weight label stating feature benefits (e.g., Environmentally friendly). |
| `vm_sec` | `index.html`, `style.css` | Vision & Mission Section | Two-column layout presenting brand goals, mission principles, and workshop photography. |
| `vm_box` | `index.html`, `style.css` | Vision & Mission Flex Box | Flex row container dividing artisan photo collage from mission copy. |
| `vm_media` | `index.html`, `style.css` | Vision Photo Stack Box | Relative media box with pink radial glow positioning staggered workshop images. |
| `vm_img_1` | `index.html`, `style.css` | Vision Workspace Photo | Primary top-left workshop photograph with rounded corners and shadow. |
| `vm_img_2` | `index.html`, `style.css` | Vision Product Photo | Overlapping bottom-right floral arrangement photo with hover lift. |
| `vm` | `index.html`, `style.css` | Vision & Mission Text Column | Content container holding vision summary and numbered mission list. |
| `vm_block` | `index.html`, `style.css` | Vision / Mission Content Block | Content grouping spacing subtitles, paragraphs, and lists. |
| `vm_title` | `index.html`, `style.css` | Vision / Mission Subtitle | 26px crimson bold heading for "OUR VISION" and "OUR MISION". |
| `vm_txt` | `index.html`, `style.css` | Vision Mission Description | Body text detailing ecological creativity and handmade quality goals. |
| `vm_list` | `index.html`, `style.css` | Mission Numbered List | Ordered list detailing 4 foundational commitments of the ReBloom initiative. |
| `about_sec` | `index.html`, `style.css` | About Origin Section | Section highlighting brand founding history and artisan collective. |
| `about_box` | `index.html`, `style.css` | About Layout Box | Two-column row dividing narrative story from team photo stack. |
| `about` | `index.html`, `style.css` | About Narrative Column | Left column housing "OUR ORIGIN" heading and brand background story. |
| `about_title` | `index.html`, `style.css` | About Heading | 40px section heading with crimson highlight on "ORIGIN". |
| `about_txt` | `index.html`, `style.css` | About Narrative Copy | 18px body text detailing how recycled plastic bottles are transformed into floral art. |
| `about_media` | `index.html`, `style.css` | About Media Column | Right column centering artisan and team photo composition. |
| `about_img_stack` | `index.html`, `style.css` | About Photo Composition Box | Relative container layering team and artisan photos with ambient background blur. |
| `about_img_1` | `index.html`, `style.css` | About Primary Team Photo | Top-left photo asset featuring ReBloom founders. |
| `about_img_2` | `index.html`, `style.css` | About Secondary Artisan Photo | Bottom-right photo asset showcasing artisans handcrafting vases. |
| `why_sec` | `index.html`, `style.css` | Why Choose Us Section | Section presenting 4 unique selling propositions in a structured 2x2 grid. |
| `why_header` | `index.html`, `style.css` | Why Section Header | Centered title block holding section heading and dark underline rule. |
| `why_heading` | `index.html`, `style.css` | Why Section Title | 40px bold heading "Why Choose Us". |
| `why_underline` | `index.html`, `style.css` | Why Underline Bar | 70px dark accent line centered under heading. |
| `why_grid` | `index.html`, `style.css` | Why Benefits Grid | Responsive two-column grid organizing the 4 benefit cards. |
| `why_item` | `index.html`, `style.css` | Why Benefit Card | Flex item pairing large crimson index numeral and benefit explanation. |
| `why_num` | `index.html`, `style.css` | Why Step Number | 38px bold crimson index numeral ("01.", "02.", "03.", "04."). |
| `why_txt` | `index.html`, `style.css` | Why Description Text | Descriptive paragraph outlining affordability, gifting, and uniqueness. |
| `prod_sec` | `index.html`, `product.html`, `style.css`, `product.css` | Product Catalog Section | Catalog container section showcasing product tiers or detailed single product. |
| `prod_heading` | `index.html`, `style.css` | Catalog Section Title | 40px centered title "Explore More Into Our Products" with highlighted text. |
| `prod_grid` | `index.html`, `style.css` | Product Catalog Grid | Three-column grid displaying product pack cards. |
| `prod_card` | `index.html`, `style.css` | Product Catalog Card | Elevated white card featuring pack icon, title, description, features, price, and CTA. |
| `prod_thumb_box` | `index.html`, `style.css` | Product Icon Box | Centered wrapper positioning the round decorative icon badge. |
| `prod_thumb_circle` | `index.html`, `style.css` | Product Icon Badge | 90px pastel pink disc housing crimson Font Awesome package icon. |
| `prod_title` | `index.html`, `product.html`, `style.css`, `product.css` | Product Card Title | Heading displaying pack name (`Flower Pot Regular`, `Flower Bird Gift`, `Lamp Flower Pot`). |
| `prod_sub` | `index.html`, `style.css` | Product Card Caption | Brief summary explaining customizable floral options. |
| `prod_feats` | `index.html`, `style.css` | Product Feature Checklist | Left-aligned list itemizing pack inclusions with checkmark icons. |
| `prod_price` | `index.html`, `style.css` | Product Card Price | 20px bold price display with billing unit ("/ pcs"). |
| `prod_btn` | `index.html`, `style.css` | Product Card Order CTA | Full-width crimson pill button routing to `product.html?pack=...`. |
| `faq_sec` | `index.html`, `style.css` | FAQ Section | Customer question accordion section with centered heading and subtitle. |
| `faq_heading` | `index.html`, `style.css` | FAQ Section Heading | 40px centered headline "Questions Asked By Our Customers". |
| `faq_sub` | `index.html`, `style.css` | FAQ Subtitle Caption | Muted subtitle text introducing common customer inquiries. |
| `faq_box` | `index.html`, `style.css` | FAQ Accordion Card | Rounded bordered container enclosing interactive question and answer items. |
| `faq_item` | `index.html`, `style.css`, `script.js` | FAQ Item Row | Individual accordion row holding question trigger and expandable answer. |
| `faq_q` | `index.html`, `style.css`, `script.js` | FAQ Question Trigger | Clickable header toggling accordion answer visibility and chevron icon state. |
| `faq_icon` | `index.html`, `style.css`, `script.js` | FAQ Toggle Chevron | Font Awesome chevron icon indicating collapsed (`fa-chevron-right`) or expanded (`fa-chevron-up`) state. |
| `faq_a` | `index.html`, `style.css` | FAQ Answer Drawer | Expandable drawer showing detailed response text when parent item has `.active`. |
| `contact_sec` | `index.html`, `product.html`, `style.css` | Contact Us Section | Two-column section pairing company contact details with feedback form. |
| `contact_box` | `index.html`, `product.html`, `style.css` | Contact Layout Box | Two-column flex container distributing contact copy and form inputs. |
| `contact_left` | `index.html`, `product.html`, `style.css` | Contact Info Column | Left column holding brand logo, inquiry headline, subtitle, and WhatsApp button. |
| `contact_logo_box` | `index.html`, `product.html`, `style.css` | Contact Logo Box | Flex row grouping ReBloom emblem and wordmark above contact title. |
| `contact_logo` | `index.html`, `product.html`, `style.css` | Contact Logo Graphic | 48px brand logo emblem graphic. |
| `contact_logo_txt` | `index.html`, `product.html`, `style.css` | Contact Brand Wordmark | Cursive Telma wordmark rendered in `#E3475D` crimson styling. |
| `contact_title` | `index.html`, `product.html`, `style.css` | Contact Section Title | 38px bold headline "Have More Questions In Mind?". |
| `contact_sub` | `index.html`, `product.html`, `style.css` | Contact Subtitle Prompt | Caption encouraging visitors to write down their thoughts. |
| `contact_wa_btn` | `index.html`, `product.html`, `style.css` | WhatsApp Direct CTA | Green `#24CC63` anchor linking directly to official WhatsApp support number. |
| `contact_right` | `index.html`, `product.html`, `style.css` | Contact Form Column | Right column housing customer inquiry form. |
| `contact_form` | `index.html`, `product.html`, `style.css`, `script.js` | Contact Form Element | Form element containing name, email, message inputs, and submit button. |
| `form_row` | `index.html`, `product.html`, `style.css` | Form Two-Column Row | Horizontal flex row placing name and email fields side by side. |
| `form_grp` | `index.html`, `product.html`, `style.css` | Form Field Group | Vertical flex container grouping input label and input field. |
| `form_lbl` | `index.html`, `product.html`, `style.css` | Form Field Label | 14px bold dark label identifying input purpose. |
| `form_inp` | `index.html`, `product.html`, `style.css` | Form Input Control | Styled input control with light gray fill and crimson focus border highlight. |
| `form_txt` | `index.html`, `product.html`, `style.css` | Form Textarea Control | Multiline message input with fixed height and disabled resizing. |
| `contact_submit_btn` | `index.html`, `product.html`, `style.css` | Form Submit Button | Full-width crimson button triggering client-side message submission. |
| `footer` | `index.html`, `product.html`, `style.css` | Global Footer Bar | Full-width bottom bar with top divider border displaying legal copyright. |
| `footer_txt` | `index.html`, `product.html`, `style.css` | Footer Copyright Text | Muted 14px copyright notice text ("© 2026 ReBloom. All Rights Reserved."). |

---

## 4. Product Details & Related Showcase (`product.html`, `assets/css/product.css`)

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `prod_wrap` | `product.html`, `product.css` | Product Detail Wrapper | Two-column flex container distributing gallery showcase and purchase specifications. |
| `prod_left` | `product.html`, `product.css` | Product Gallery Column | Left column housing large primary product image and thumbnail row. |
| `prod_main_box` | `product.html`, `product.css` | Main Photo Stage | 440px rounded container showcasing active product image with soft drop shadow. |
| `prod_main_img` | `product.html`, `product.css`, `script.js` | Main Product Image Element | Dynamic primary product image updated to reflect active pack. |
| `prod_thumbs` | `product.html`, `product.css` | Thumbnail Gallery Row | Flex row organizing three interactive thumbnail image items. |
| `prod_thumb` | `product.html`, `product.css`, `script.js` | Gallery Thumbnail Card | Clickable thumbnail card with hover lift and crimson border transition. |
| `prod_thumb_img` | `product.html`, `product.css`, `script.js` | Thumbnail Image Asset | Photo asset filling thumbnail card used as swap source for main view. |
| `prod_right` | `product.html`, `product.css` | Product Info Column | Right column containing product title, review score, pricing, guarantee, and buy button. |
| `prod_desc` | `product.html`, `receipt.html`, `product.css`, `receipt.css` | Product Description / Note | In `product.html`: authentic description hook; in `receipt.html`: custom order note row with dot and text. |
| `prod_rating` | `product.html`, `product.css` | Product Rating Row | Row pairing 5 gold review stars and review score text. |
| `prod_stars` | `product.html`, `product.css` | Star Icons Wrapper | Gold `#FBBF24` Font Awesome star icons container. |
| `prod_rate_txt` | `product.html`, `product.css` | Rating Summary Text | Bold review score and count text ("5.0 \| 12 Reviews"). |
| `custom_row` | `product.html`, `product.css` | Customization Two-Column Row | Horizontal flex row organizing Flower Color swatches on the left and Quantity stepper on the right. |
| `color_sec` | `product.html`, `product.css` | Flower Color Section | Container grouping the Flower Color label and circular swatch button group. |
| `custom_lbl` | `product.html`, `product.css` | Customization Control Label | 18px bold `#1E1E1E` heading label for customization controls ("Flower Color", "Quantity", "Note"). |
| `swatch_grp` | `product.html`, `product.css` | Swatch Button Group | Horizontal flex container spacing circular color swatch buttons. |
| `color_swatch` | `product.html`, `product.css`, `script.js` | Color Swatch Button | 32px circular button representing selectable flower colors with active dark selection ring. |
| `swatch_blue` | `product.html`, `product.css` | Sky Blue Swatch Modifier | Swatch modifier applying Sky Blue background `#0084FF`. |
| `swatch_purple` | `product.html`, `product.css` | Purple Swatch Modifier | Swatch modifier applying vibrant Purple background `#A855F7`. |
| `swatch_orchid` | `product.html`, `product.css` | Orchid Swatch Modifier | Swatch modifier applying Orchid Pink background `#E199D2`. |
| `swatch_pink` | `product.html`, `product.css` | Pastel Pink Swatch Modifier | Swatch modifier applying Pastel Pink background `#F5B0C4`. |
| `qty_sec` | `product.html`, `product.css` | Quantity Stepper Section | Right-aligned container grouping Quantity label and pill stepper control. |
| `qty_box` | `product.html`, `product.css` | Quantity Stepper Capsule | Bordered pill capsule enclosing decrement button, numerical quantity value, and increment button. |
| `qty_btn` | `product.html`, `product.css` | Stepper Button Base | Base styling for quantity stepper increment and decrement buttons. |
| `qty_minus` | `product.html`, `product.css`, `script.js` | Quantity Decrement Button | Stepper button with crimson `-` symbol (`#E3475D`) reducing quantity with minimum limit 1. |
| `qty_val` | `product.html`, `product.css`, `script.js` | Quantity Value Display | Central integer display element showing currently selected purchase quantity. |
| `qty_plus` | `product.html`, `product.css`, `script.js` | Quantity Increment Button | Stepper button with green `+` symbol (`#24CC63`) increasing quantity. |
| `note_sec` | `product.html`, `product.css` | Request Note Section | Full-width container grouping Note label and special request text input. |
| `note_inp` | `product.html`, `product.css`, `script.js` | Note Input Control | Rounded 14px border input allowing users to leave special requests for admin. |
| `prod_price_box` | `product.html`, `product.css` | Price Display Block | Large pricing block grouping currency prefix and numerical price. |
| `price_curr` | `product.html`, `product.css` | Currency Prefix | 28px bold crimson currency symbol ("Rp"). |
| `price_val` | `product.html`, `product.css`, `script.js` | Price Numeric Value | Dynamic ultra-bold crimson price number calculated from unit price * quantity. |
| `prod_sec_pay` | `product.html`, `product.css` | Secure Payment Badge | Trust badge displaying green shield icon and "Secure Payment By ReBloom". |
| `sec_pay_icon` | `product.html`, `product.css` | Security Shield Icon | Green `#24CC63` Font Awesome security shield icon. |
| `sec_pay_brand` | `product.html`, `product.css` | Security Brand Wordmark | Cursive Telma font styling for ReBloom within trust badge. |
| `prod_buy_btn` | `product.html`, `product.css`, `script.js` | Buy Now Button | Full-width 50px crimson pill action button ("BUY NOW") triggering order serialization and checkout. |
| `rel_sec` | `product.html`, `product.css` | Related Products Section | Recommendation section presenting alternative flower options. |
| `rel_wrap` | `product.html`, `product.css` | Related Products Wrapper | Flex row dividing recommendation cards from section narrative. |
| `rel_left` | `product.html`, `product.css`, `script.js` | Related Cards Container | Container dynamically holding the two inactive catalog pack cards. |
| `rel_card` | `product.html`, `product.css`, `script.js` | Related Product Card | Bordered white card featuring thumbnail, title, rating, price, and CTA. |
| `rel_img_box` | `product.html`, `product.css`, `script.js` | Related Image Box | Pastel pink rounded thumbnail container holding product image. |
| `rel_img` | `product.html`, `product.css`, `script.js` | Related Product Image | Product preview thumbnail inside related product card. |
| `rel_card_title` | `product.html`, `product.css`, `script.js` | Related Card Title | Dynamic pack title for alternative catalog items. |
| `rel_card_rating` | `product.html`, `product.css`, `script.js` | Related Rating Row | Flex row displaying gold stars and review count. |
| `rel_card_count` | `product.html`, `product.css`, `script.js` | Related Review Count | Muted count caption "(10)" beside star ratings. |
| `rel_card_price` | `product.html`, `product.css`, `script.js` | Related Card Price Box | Pricing block showing small currency prefix and amount. |
| `price_curr_sm` | `product.html`, `product.css`, `script.js` | Small Currency Prefix | 18px crimson "Rp" currency prefix. |
| `price_val_sm` | `product.html`, `product.css`, `script.js` | Small Numeric Price | 32px bold crimson unit price value. |
| `rel_btn` | `product.html`, `product.css`, `script.js` | Related Order Button | Crimson pill button ("Switch / Order Pack") dynamically switching active pack. |
| `rel_right` | `product.html`, `product.css` | Related Narrative Column | Right column containing section title, horizontal divider, and paragraph. |
| `rel_title` | `product.html`, `product.css` | Related Section Title | 52px uppercase bold headline "FIND RELATED PRODUCTS". |
| `rel_divider` | `product.html`, `product.css` | Related Divider Line | 2px gray horizontal accent line beneath title. |
| `rel_desc` | `product.html`, `product.css` | Related Narrative Text | Paragraph encouraging customers to explore complementary floral packs. |

---

## 5. Order Receipt Components (`receipt.html`, `assets/css/receipt.css`)

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `rcpt_layout` | `receipt.html`, `receipt.css` | Receipt Layout Canvas | Full-height viewport flex canvas with light gray background `#F5F6F8` centering checkout receipt content. |
| `rcpt_container` | `receipt.html`, `receipt.css` | Receipt Two-Column Container | 960px max-width flex wrapper distributing left status confirmation and right receipt card. |
| `rcpt_status` | `receipt.html`, `receipt.css` | Receipt Status Section | Left column displaying confirmation badge, headline, WhatsApp instruction, and CTA buttons. |
| `status_badge` | `receipt.html`, `receipt.css` | Status Badge Outer Ring | 44px soft mint circular ring (`#DDF5E6`) framing success checkmark. |
| `badge_inner` | `receipt.html`, `receipt.css` | Status Badge Inner Disc | 22px solid vibrant green circle (`#24CC63`) centering checkmark icon. |
| `chk_icon` | `receipt.html`, `receipt.css` | Checkmark Icon | Font Awesome icon (`fa-solid fa-check`) rendering white 11px checkmark inside status badge. |
| `status_title` | `receipt.html`, `receipt.css` | Status Headline | Bold 24px heading "Your Order Is Being Processed!". |
| `status_desc` | `receipt.html`, `receipt.css` | Status Instructions | Paragraph advising customer that no screenshot is needed and receipt is copied automatically. |
| `status_actions` | `receipt.html`, `receipt.css` | Status Action Stack | Vertical column stacking primary admin WhatsApp button and back button. |
| `btn_outline` | `receipt.html`, `receipt.css` | Outline Action Button | Transparent pill button with crimson border and hover wash routing back to product. |
| `btn_arrow` | `receipt.html`, `receipt.css` | Navigation Arrow Icon | Font Awesome right arrow icon (`fa-solid fa-arrow-right`) trailing back button label. |
| `rcpt_card` | `receipt.html`, `receipt.css`, `script.js` | Receipt Card | The main white card on the right containing dynamically hydrated order metadata and totals. |
| `card_title` | `receipt.html`, `receipt.css` | Receipt Card Title | 20px bold heading "Order Details" inside receipt card. |
| `order_info` | `receipt.html`, `receipt.css` | Order Metadata Container | Vertical stack organizing order timestamp and payment mode groups. |
| `info_group` | `receipt.html`, `receipt.css` | Metadata Key-Value Group | Stacked block pairing a metadata label and corresponding value. |
| `info_label` | `receipt.html`, `receipt.css` | Metadata Field Label | Muted 15px secondary gray text describing metadata property. |
| `info_val` | `receipt.html`, `receipt.css`, `script.js` | Metadata Field Value | Dynamic bold text displaying order date/time and payment method. |
| `divider_dash` | `receipt.html`, `receipt.css` | Dashed Divider Line | 1.5px dashed border line separating order metadata from line items. |
| `items_sec` | `receipt.html`, `receipt.css` | Line Items Section | Container organizing ordered items, custom notes, and subtotal lines. |
| `items_title` | `receipt.html`, `receipt.css` | Items Subtitle | Muted 17px heading "Items Details". |
| `divider_solid` | `receipt.html`, `receipt.css` | Solid Divider Line | Crisp 1px solid separator line framing ordered line item row. |
| `item_row` | `receipt.html`, `receipt.css` | Line Item Row | Vertical block displaying item name, customer personalization note, and unit price. |
| `item_name` | `receipt.html`, `receipt.css`, `script.js` | Line Item Name | Product identifier displaying line item quantity and pack title (e.g., "2x Flower Bird Gift"). |
| `custom_dot` | `receipt.html`, `receipt.css`, `script.js` | Customization Accent Dot | Circular solid badge dynamically updated with selected color hex code. |
| `custom_text` | `receipt.html`, `receipt.css`, `script.js` | Customization Text | Label containing selected color name and user request note. |
| `item_price` | `receipt.html`, `receipt.css`, `script.js` | Line Item Price | Formatted Indonesian Rupiah subtotal for the ordered line items. |
| `total_group` | `receipt.html`, `receipt.css` | Grand Total Summary Block | Bottom summary container pairing grand total label and total amount. |
| `total_label` | `receipt.html`, `receipt.css` | Total Summary Label | Section label "Total" rendered in muted secondary typography. |
| `total_val` | `receipt.html`, `receipt.css`, `script.js` | Grand Total Price | Prominent 22px bold dark text displaying formatted order total in IDR. |

---

## 6. HTML Unique Identifiers (`id`)

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `home` | `index.html` | Home Section Anchor | Navigation jump anchor targeting top hero landing section (`#home`). |
| `vision` | `index.html` | Vision Section Anchor | Navigation jump anchor targeting vision and mission section (`#vision`). |
| `about` | `index.html` | About Section Anchor | Navigation jump anchor targeting company origin and story section (`#about`). |
| `products` | `index.html` | Products Catalog Anchor | Navigation jump anchor targeting product catalog cards grid (`#products`). |
| `faq` | `index.html` | FAQ Section Anchor | Navigation jump anchor targeting frequently asked questions accordion (`#faq`). |
| `contact` | `index.html`, `product.html` | Contact Section Anchor | Navigation jump anchor targeting contact details and inquiry form (`#contact`). |
| `product_detail` | `product.html`, `product.css`, `script.js` | Product Detail Section ID | Container section identifier for product detail showcase view. |
| `prod_title` | `product.html`, `script.js` | Product Title ID | Target heading dynamically updated with active pack title. |
| `prod_desc` | `product.html`, `script.js` | Product Description ID | Target paragraph dynamically updated with active pack description. |
| `prod_main_img` | `product.html`, `script.js` | Main Product Image ID | Target image element dynamically updated when active pack or gallery thumbnails change. |
| `price_val` | `product.html`, `script.js` | Price Numeric Value ID | Target price numeral element dynamically updated with quantity-calculated price. |
| `custom_note` | `product.html`, `script.js` | Custom Note Input ID | Input field ID capturing special crafting requests and custom notes for admin. |
| `related_products` | `product.html`, `script.js` | Related Products Section ID | Container section identifier for related catalog recommendations. |
| `user_name` | `index.html`, `product.html` | User Name Input ID | Form control ID for sender's name field in contact form. |
| `user_email` | `index.html`, `product.html` | User Email Input ID | Form control ID for sender's email address in contact form. |
| `user_msg` | `index.html`, `product.html` | User Message Textarea ID | Form control ID for inquiry message textarea in contact form. |
| `contact_form` | `index.html`, `product.html`, `script.js` | Contact Form ID | Target form ID intercepted by JavaScript to handle submit events without page reload. |
| `btn_admin` | `receipt.html`, `script.js` | Admin WhatsApp Button ID | Anchor ID targeting WhatsApp click-to-chat API (`wa.me`) with prefilled receipt message and clipboard copy. |
| `btn_back` | `receipt.html` | Back To Catalog Button ID | Anchor ID routing user back to product catalog (`product.html`). |

---

## 7. JavaScript Variables & Runtime Identifiers (`assets/js/script.js`)

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `pack_catalog` | `script.js` | Pack Catalog Dictionary | Master object storing definitions for `regular`, `bird_gift`, and `lamp_pot`. |
| `format_idr` | `script.js` | IDR Currency Formatter | Utility function converting numeric integers into standard `Rp XX.000,00` strings. |
| `format_order_timestamp` | `script.js` | Timestamp Formatter | Utility function generating real timestamps in `dd MMM yyyy, hh:mm AM/PM` format. |
| `product_detail_sec` | `script.js` | Product Detail Section | DOM reference to `#product_detail` used to detect product page and scroll into view. |
| `prod_title_el` | `script.js` | Product Title Element | DOM reference to `#prod_title`. |
| `prod_desc_el` | `script.js` | Product Description Element | DOM reference to `#prod_desc`. |
| `prod_main_img_el` | `script.js` | Main Product Image Element | DOM reference to `#prod_main_img`. |
| `price_val_el` | `script.js` | Price Value Element | DOM reference to `#price_val`. |
| `qty_val_el` | `script.js` | Quantity Value Element | DOM reference to `.qty_val`. |
| `qty_minus_btn` | `script.js` | Quantity Decrement Button | DOM reference to `.qty_minus`. |
| `qty_plus_btn` | `script.js` | Quantity Increment Button | DOM reference to `.qty_plus`. |
| `note_input` | `script.js` | Note Input Element | DOM reference to `#custom_note`. |
| `buy_btn` | `script.js` | Buy Button Element | DOM reference to `.prod_buy_btn`. |
| `color_swatches` | `script.js` | Swatches NodeList | DOM NodeList of `.color_swatch` buttons. |
| `rel_container` | `script.js` | Related Container Element | DOM reference to `#related_products .rel_left`. |
| `active_pack_key` | `product.js` | Active Pack Key String | Tracks currently active pack key (`regular`, `bird_gift`, `lamp_pot`). |
| `get_initial_pack_key` | `product.js` | Initial Pack Key Resolver | Reads URL query param `?pack=` or URL pathname to resolve initial active pack. |
| `init_gallery_swapper` | `product.js` | Gallery Swapper Initializer | Binds farthest-left queue rotation listener to `.prod_thumb` elements. |
| `get_current_qty` | `product.js` | Quantity Reader Helper | Reads and parses integer from `.qty_val` with minimum 1 fallback. |
| `update_price_display` | `product.js` | Price Display Updater | Recalculates `unit_price * quantity` and updates `#price_val`. |
| `render_related_packs` | `product.js` | Related Packs Renderer | Populates `.rel_left` with the two inactive catalog packs. |
| `render_pack_details` | `product.js` | Pack Details Renderer | Updates title, description, 4-photo gallery, and price for the active pack. |
| `switch_active_pack` | `product.js` | Pack Switcher Function | Performs full page navigation via `window.location.href = target_pack.page_url`. |
| `rebloom_order` | `script.js` | Order Payload Record | JSON payload serialized into `sessionStorage` under `rebloom_order`. |
| `rcpt_card` | `script.js` | Receipt Card Reference | DOM element reference to `.rcpt_card` on receipt page. |
| `stored_order_data` | `script.js` | Raw Stored Order String | Raw JSON string retrieved from `sessionStorage.getItem('rebloom_order')`. |
| `parsed_order` | `script.js` | Deserialized Order Record | Parsed JavaScript object holding order configuration fields. |
| `info_vals` | `script.js` | Order Metadata Values NodeList | DOM NodeList collection of `.info_val` spans on receipt card. |
| `item_name_el` | `script.js` | Line Item Name Reference | DOM element displaying quantity multiplier and pack title. |
| `custom_dot_el` | `script.js` | Custom Dot Reference | DOM element updated to match selected swatch hex. |
| `custom_text_el` | `script.js` | Custom Note Text Reference | DOM element displaying selected color name and user note. |
| `item_price_el` | `script.js` | Item Price Reference | DOM element displaying subtotal price on receipt card. |
| `total_val_el` | `script.js` | Total Value Reference | DOM element displaying grand total price on receipt card. |
| `admin_btn` | `script.js` | Admin Button Reference | DOM anchor element receiving WhatsApp URL and clipboard copy handler. |
| `wa_message` | `script.js` | Formatted WhatsApp Payload | Plain-text receipt summary formatted for WhatsApp and clipboard copy. |
| `wa_encoded` | `script.js` | Encoded WhatsApp URL String | URI-encoded message string appended to WhatsApp click-to-chat API. |
| `wa_url` | `script.js` | WhatsApp Direct URL String | Full WhatsApp link with prefilled message. |

---

## 8. Shopping Cart & Receipt Page Identifiers (`receipt.html`, `receipt.css`, `receipt.js`)

| Identifier | File Source | Full Meaning | Function & Purpose |
| :--- | :--- | :--- | :--- |
| `cart_page_wrapper` | `receipt.html`, `receipt.css` | Cart Page Wrapper | Main layout container padding top for fixed header and framing cart views. |
| `cart_page_container` | `receipt.html`, `receipt.css` | Cart Page Container | Width-constrained flex/grid content container max 1200px. |
| `cart_header_bar` | `receipt.html`, `receipt.css` | Cart Header Bar | Horizontal subheader bar with bottom border framing cart title and item count. |
| `cart_header_left` | `receipt.html`, `receipt.css` | Cart Header Left | Flex cluster for eyebrow label and main title. |
| `cart_eyebrow` | `receipt.html`, `receipt.css` | Cart Eyebrow Label | Uppercase crimson bold tag "ECO-FRIENDLY & HANDMADE". |
| `cart_main_title` | `receipt.html`, `receipt.css` | Cart Main Title | 32px bold title "Your Cart". |
| `cart_header_right` | `receipt.html`, `receipt.css` | Cart Header Right | Container aligning live item review count to the right. |
| `cart_review_text` | `receipt.html`, `receipt.css` | Cart Review Text | Descriptive label "Reviewing X items selected for checkout". |
| `cart_count_highlight` | `receipt.html`, `receipt.css`, `receipt.js` | Cart Count Highlight ID | Bold crimson span displaying dynamic total items in cart. |
| `empty_cart_state` | `receipt.html`, `receipt.js` | Empty Cart State ID | Section displayed when cart array contains zero items. |
| `empty_cart_section` | `receipt.html`, `receipt.css` | Empty Cart Section | Class defining 100% width container for empty state card. |
| `empty_cart_card` | `receipt.html`, `receipt.css` | Empty Cart Card | Centered 480px white card with soft shadow and rounded corners. |
| `empty_icon_circle` | `receipt.html`, `receipt.css` | Empty Icon Halo | 64px soft pink disc framing crimson cart glyph icon. |
| `empty_title` | `receipt.html`, `receipt.css` | Empty Cart Title | 24px bold heading "Your Cart is Empty". |
| `empty_desc` | `receipt.html`, `receipt.css` | Empty Cart Description | 14px muted explanation encouraging user to browse products. |
| `start_shopping_btn` | `receipt.html`, `receipt.css` | Start Shopping Button | Crimson pill button routing to product catalog. |
| `empty_trust_note` | `receipt.html`, `receipt.css` | Empty Trust Note | Security reassurance badge pairing green shield with COD copy. |
| `populated_cart_state` | `receipt.html`, `receipt.js` | Populated Cart State ID | Section displayed when cart array contains 1 or more items. |
| `populated_cart_section` | `receipt.html`, `receipt.css` | Populated Cart Section | Class defining layout wrapper for active cart view. |
| `cart_split_layout` | `receipt.html`, `receipt.css` | Cart Split Layout | Responsive 2-column CSS Grid (1.35fr 1fr) collapsing below 900px. |
| `cart_items_column` | `receipt.html`, `receipt.css` | Cart Items Column | Left column container for cart items list and continue shopping action. |
| `cart_items_list` | `receipt.html`, `receipt.css`, `receipt.js` | Cart Items List ID | Dynamic container element populated with individual item cards. |
| `cart_item_card` | `receipt.html`, `receipt.css`, `receipt.js` | Cart Item Card | Elevated white card displaying item thumbnail, metadata, and controls. |
| `item_thumb` | `receipt.html`, `receipt.css`, `receipt.js` | Item Thumbnail Image | 110px x 110px product photo thumbnail with rounded corners. |
| `item_details` | `receipt.html`, `receipt.css`, `receipt.js` | Item Details Column | Flex container organizing title, category, meta row, and bottom pricing. |
| `item_top_row` | `receipt.html`, `receipt.css`, `receipt.js` | Item Top Row | Cluster organizing category badge, product title, and options. |
| `item_tag_pill` | `receipt.html`, `receipt.css`, `receipt.js` | Category Tag Pill | Soft pink badge displaying "Recycled Plastic" or "Handcrafted". |
| `item_title` | `receipt.html`, `receipt.css`, `receipt.js` | Item Title Heading | 18px bold product title. |
| `item_meta_row` | `receipt.html`, `receipt.css`, `receipt.js` | Item Meta Row | Horizontal flex row pairing color pill and customer note. |
| `color_pill` | `receipt.html`, `receipt.css`, `receipt.js` | Selected Color Pill | Bordered capsule displaying circular color dot and color name. |
| `color_dot` | `receipt.html`, `receipt.css`, `receipt.js` | Color Indicator Dot | 8px circular dot filled with item's hex color. |
| `note_pill` | `receipt.html`, `receipt.css`, `receipt.js` | Customer Note Pill | Capsule displaying customer request note or "Note: None". |
| `note_pill_text` | `receipt.html`, `receipt.css`, `receipt.js` | Note Pill Text | Ellipsis-truncated text element for customer note display. |
| `note_edit_btn` | `receipt.html`, `receipt.css`, `receipt.js` | Note Edit Button | Icon button triggering inline note edit form. |
| `note_edit_form` | `receipt.html`, `receipt.css`, `receipt.js` | Note Edit Form | Inline form container with input, save, and cancel actions. |
| `note_edit_input` | `receipt.html`, `receipt.css`, `receipt.js` | Note Edit Input | Text input capturing inline customer note edits. |
| `note_save_btn` | `receipt.html`, `receipt.css`, `receipt.js` | Note Save Button | Green checkmark button saving note edits to localStorage. |
| `note_cancel_btn` | `receipt.html`, `receipt.css`, `receipt.js` | Note Cancel Button | Muted xmark button canceling inline note edits. |
| `item_delete_btn` | `receipt.html`, `receipt.css`, `receipt.js` | Item Delete Button | Trash icon button positioned top-right to remove item from cart. |
| `item_bottom_row` | `receipt.html`, `receipt.css`, `receipt.js` | Item Bottom Row | Divided bottom row holding unit price block and quantity stepper. |
| `unit_price_block` | `receipt.html`, `receipt.css`, `receipt.js` | Unit Price Block | Flex container organizing unit price label and numeral. |
| `unit_price_label` | `receipt.html`, `receipt.css` | Unit Price Label | 11px uppercase muted label "Unit Price". |
| `unit_price_val` | `receipt.html`, `receipt.css`, `receipt.js` | Unit Price Value | 15px bold numeral formatted as integer Rupiah. |
| `qty_stepper` | `receipt.html`, `receipt.css`, `receipt.js` | Quantity Stepper Pill | Bordered capsule enclosing decrement, quantity value, and increment buttons. |
| `qty_btn_minus` | `receipt.html`, `receipt.css`, `receipt.js` | Quantity Minus Button | Soft pink circular button decrementing item quantity. |
| `qty_value` | `receipt.html`, `receipt.css`, `receipt.js` | Quantity Numeral Display | Numeric text element reflecting item quantity. |
| `qty_btn_plus` | `receipt.html`, `receipt.css`, `receipt.js` | Quantity Plus Button | Soft green circular button incrementing item quantity. |
| `continue_shopping_wrapper` | `receipt.html`, `receipt.css` | Continue Shopping Wrapper | Container spacing the continue shopping button. |
| `continue_shopping_btn` | `receipt.html`, `receipt.css` | Continue Shopping Button | Outline pill button linking back to catalog. |
| `order_summary_column` | `receipt.html`, `receipt.css` | Order Summary Column | Right sticky column holding order summary card. |
| `order_summary_card` | `receipt.html`, `receipt.css` | Order Summary Card | 20px rounded white card displaying summary details. |
| `summary_heading` | `receipt.html`, `receipt.css` | Summary Card Heading | 20px bold title "Order Summary". |
| `summary_info_group` | `receipt.html`, `receipt.css` | Summary Info Group | Flex container grouping payment method, delivery mode, and date. |
| `summary_info_row` | `receipt.html`, `receipt.css` | Summary Info Row | Key-value vertical pairing for summary metadata. |
| `summary_info_label` | `receipt.html`, `receipt.css` | Summary Info Label | 11px uppercase label for metadata fields. |
| `summary_info_val` | `receipt.html`, `receipt.css` | Summary Info Value | 14px bold text for metadata values. |
| `summary_order_date` | `receipt.html`, `receipt.js` | Summary Order Date ID | Dynamic element receiving real-time formatted order timestamp. |
| `summary_divider_dashed` | `receipt.html`, `receipt.css` | Dashed Summary Divider | 1px dashed separation line. |
| `summary_rows` | `receipt.html`, `receipt.css` | Summary Rows Container | Container spacing itemized subtotal and fee rows. |
| `summary_row` | `receipt.html`, `receipt.css` | Summary Line Row | Justified row pairing label and price/badge. |
| `summary_row_label` | `receipt.html`, `receipt.css` | Summary Row Label | Label for subtotal, packaging, or shipping fees. |
| `summary_row_val` | `receipt.html`, `receipt.css` | Summary Row Value | Numeric price text for line items. |
| `summary_item_count` | `receipt.html`, `receipt.js` | Summary Item Count ID | Span reflecting total quantity count in subtotal label. |
| `summary_subtotal_price` | `receipt.html`, `receipt.js` | Summary Subtotal ID | Span reflecting calculated subtotal in IDR format. |
| `free_badge` | `receipt.html`, `receipt.css` | Free Fee Badge | Soft green pill badge reading "FREE". |
| `summary_divider_solid` | `receipt.html`, `receipt.css` | Solid Summary Divider | 1px solid horizontal separation line. |
| `summary_total_row` | `receipt.html`, `receipt.css` | Summary Grand Total Row | Horizontal row highlighting grand total label and price. |
| `summary_total_label` | `receipt.html`, `receipt.css` | Summary Total Label | 16px bold label "Total". |
| `summary_total_val` | `receipt.html`, `receipt.css` | Summary Total Numeral | 24px bold numeral element for grand total. |
| `summary_grand_total` | `receipt.html`, `receipt.js` | Summary Grand Total ID | Span displaying final grand total amount. |
| `cod_guarantee_box` | `receipt.html`, `receipt.css` | COD Guarantee Box | Soft green bordered banner with checkmark and guarantee copy. |
| `cod_guarantee_icon` | `receipt.html`, `receipt.css` | COD Guarantee Icon | Font Awesome circle checkmark icon in eco green. |
| `cod_guarantee_text` | `receipt.html`, `receipt.css` | COD Guarantee Text | Bold green text "Secure Pre-Order COD By ReBloom". |
| `proceed_checkout_btn` | `receipt.html`, `receipt.css`, `receipt.js` | Proceed Checkout Button ID | Full-width crimson pill button dispatching WhatsApp checkout. |
| `checkout_footnote` | `receipt.html`, `receipt.css` | Checkout Footnote | Muted 12px notice on WhatsApp admin order confirmation. |
| `footer_bar` | `receipt.html`, `receipt.css` | Footer Bar | Full-width clean white footer bar. |
| `footer_container` | `receipt.html`, `receipt.css` | Footer Container | Centered container for footer copyright text. |
| `footer_copy` | `receipt.html`, `receipt.css` | Footer Copy Text | Copyright text string for ReBloom. |
| `cart_storage_key` | `receipt.js` | Cart Storage Key Constant | Constant "rebloom_cart" referencing localStorage array. |
| `legacy_order_key` | `receipt.js` | Legacy Order Key Constant | Constant "rebloom_order" referencing sessionStorage single order. |
| `admin_whatsapp_phone` | `receipt.js` | Admin Phone Constant | Admin phone string "6282132829795" for WhatsApp handoff. |
| `get_cart_items` | `receipt.js` | Cart Items Getter | Reads and parses cart array from localStorage with legacy migration. |
| `save_cart_items` | `receipt.js` | Cart Items Setter | Serializes and saves cart array to localStorage under rebloom_cart. |
| `update_cart_quantity` | `receipt.js` | Quantity Updater | Increases or decreases item quantity, pruning at 0. |
| `remove_cart_item` | `receipt.js` | Item Remover | Deletes item matching ID from cart array and updates state. |
| `update_cart_note` | `receipt.js` | Note Updater | Saves edited customer note string to cart item in localStorage. |
| `render_cart_view` | `receipt.js` | Cart View Dispatcher | Evaluates cart length and hydrates empty or populated cart view. |
| `format_currency_unit` | `receipt.js` | Unit Currency Formatter | Formats number to "Rp XX.000" integer currency format. |
| `format_currency_summary` | `receipt.js` | Summary Currency Formatter | Formats number to "Rp XX.000,00" comma-cents currency format. |
