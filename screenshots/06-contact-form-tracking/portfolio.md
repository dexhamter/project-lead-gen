# Portfolio Inventory

> One entry per portfolio piece. Add a new entry each time you publish a portfolio item to your Upwork profile.
> Type tags must match project type letters: A, B, C, D, E (comma-separated for pieces that span multiple types).
> Leave URL blank until the piece is live on your Upwork profile.

---

## Portfolio Pieces

<!-- Template — copy and fill in for each new piece:

### [Project Title]
Type: [A/B/C/D/E]
Description: [One line — the business problem, your approach, and the outcome. Write as you would in a proposal.]
Upwork URL:

-->

### CF7 Contact Form Tracking via GTM - GA4 & Google Ads Conversions

Type: B, D
Description: A WordPress lead gen site had no visibility into form submissions. Google Ads was running blind with zero conversion signals. I implemented end-to-end Contact Form 7 tracking using a wpcf7mailsent dataLayer push, capturing form_id and service_type parameters on every submission. In GTM I built a Custom Event trigger, a GA4 Event tag with beacon transport (to survive the post-submit redirect), and a direct Google Ads Conversion tag tied to a new conversion action. The client now has accurate lead conversion data flowing into both GA4 and Google Ads Smart Bidding.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2062888984733851648

### Google Ads Purchase Tracking for Fashion Ecommerce Store

Type: A
Description: Set up full Google Ads conversion tracking via GTM — Google Tag, Conversion Linker, Conversion ID variable, and a purchase event tag pulling order value, transaction ID, and currency from the ecommerce dataLayer. Delivered two purchase conversion actions (direct + GA4-imported), real order value flowing to Smart Bidding, and transaction ID deduplication.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2060420729595736064

---

### AJAX Form Tracking for Contact Form 7 via GTM dataLayer & GA4

Type: B, D
Description: A WooCommerce site using Contact Form 7 had zero lead form visibility — CF7's AJAX behavior meant standard GTM triggers never fired. Built a Custom HTML listener tag that intercepts CF7 JavaScript events and pushes a structured dataLayer object on success, failure, and invalid submissions, capturing form_name, business_type, company_size, monthly_volume, annual_revenue, and estimated lead value — mapped to GA4 events: generate_lead, cf7_form_invalid, and cf7_form_error.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2059558884571054080

---

### Full Custom Shopify GA4 + GTM Ecommerce Tracking Implementation

Type: A, C
Description: Advanced Shopify store with zero ecommerce tracking — no cart visibility, no product view data, no purchase attribution. Installed GTM via theme.liquid and built a 16-entity ecommerce suite: fetch interceptor for add_to_cart/remove_from_cart, Liquid-injected dataLayer for view_item_list, and a Custom Pixel using the GA4 Measurement Protocol for checkout events. A client_id bridge synced GA4 session identity into Shopify's isolated checkout. All events including purchase with transaction_id, value, tax, and shipping verified in DebugView and Realtime Reports.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2059250188722642944

---

### File Download Tracking for WooCommerce via GTM & GA4

Type: C, D
Description: A WooCommerce site had zero visibility into file downloads — PDFs and other assets were completely invisible in GA4. Implemented file download tracking via GTM using a Click URL trigger scoped to file extensions, two Custom JavaScript variables to extract file_name and file_extension, and a GA4 event tag passing all three parameters. Validated in GA4 DebugView with file_download events firing correctly on every click.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2058618663934128128

---

### GA4 Ecommerce Event Schema: Tracking Plan & Parameter Map

Type: E
Description: Small ecommerce brands launching GA4 with no event planning end up with sessions but no revenue, funnel data, or channel attribution. This tracking plan defines the full GA4 event schema for a WooCommerce store — 10 events across the ecommerce funnel plus key custom interactions, with every required parameter named, typed, and scoped correctly — delivered before implementation so the GTM build has a single source of truth.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2055001094503092224

---

### Full WooCommerce GA4 + GTM Setup: Purchase Funnel Tracking, Key Events

Type: A, C
Description: WooCommerce store spending $2,100/month on Google Ads with zero purchase tracking in GA4 — no GTM container, no ecommerce events, no conversion data. Built a full GTM container via GTM4WP with 7 tags covering the complete funnel from view_item_list to purchase. GA4 property configured with 14-month retention, internal traffic filter, and conversion marking. Result: full checkout funnel visible within 72 hours. Organic search converting at 3.8% vs paid search at 1.4%.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2054951138228523008

---

### GA4 Attribution Model | BigQuery SQL | Multi-Touch Analysis

Type: F
Description: A B2B SaaS team relying on GA4 last-click attribution had limited visibility across a 90-day sales cycle. Built a custom multi-touch attribution model in BigQuery — transforming GA4 event data into user journeys and implementing first-touch, last-touch, and time-decay models in SQL. Analysis revealed Direct as a dominant closing channel and Organic Search as a consistent top-of-funnel contributor, providing channel performance visibility beyond last-click bias.
Upwork URL: https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2045944612035428352

<!-- ⚠️ NOTE — Type F does not currently exist in the skill's A–E project type system. This project covers attribution modeling and BigQuery SQL analysis — Phase 2+ territory. Consider adding Type F: Attribution Modeling / BigQuery Analysis to SKILL.md when you start applying to these jobs on Upwork. The skill will flag this piece as "no match" for any A–E job until that update is made. -->

---

### Restored GA4 Purchase Tracking Lost to Cross-Domain Iframe

Type: B, D
Description: A WordPress restaurant and grocery site processed all orders through Zuppler — a third-party ordering system embedded via iframe on an external domain — but GA4 recorded zero purchase conversions. Identified two root causes: cross-domain iframes block GA4 tracking entirely, and the GTM purchase tag had a trigger that could never fire. Configured Zuppler to redirect post-order to a first-party confirmation page, built a GTM Custom HTML setup tag to read URL parameters and push a full ecommerce payload (transaction_id, value, currency, items[]) via tag sequencing. All three tags verified firing in GTM Preview; purchase event confirmed in GA4 DebugView with green conversion flag.
Upwork URL:https://www.upwork.com/freelancers/~01aecb0bb707917aa5?p=2061384828647047168
