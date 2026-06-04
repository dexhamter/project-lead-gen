# 01 — Measurement Plan

**Project:** FlowFix Plumbing — Lead Gen Demo  
**Business type:** Home services (plumbing)  
**Date:** 2026-06-04  
**Status:** ✅ Complete

---

## What This Does & Why

A measurement plan is the foundation of any Google Ads measurement implementation. It defines what success looks like for the business, maps that to trackable events, establishes naming conventions, and documents every system involved before a single tag is deployed.

For FlowFix Plumbing, the measurement plan translates plumbing business goals into a concrete tracking architecture: which user actions become conversion signals, which become audience-building events, and how data flows from the browser through GTM, GA4, and Google Ads.

Without a measurement plan, tracking implementations are reactive — tags get added ad hoc, naming becomes inconsistent, and the relationship between tracked events and business outcomes is unclear. This plan resolves all of that before implementation begins.

---

## Prerequisites

- [x] Google Ads MCC account exists (`440-830-5844`)
- [x] Google Ads child account created for this project (`347-722-8703`)
- [x] GTM container created (`GTM-5K9QS6NZ`)
- [x] GA4 property created (`G-VH9CHBBWR7`)
- [x] LocalWP site running at `http://lead-gen.local`

---

## Business Requirement

Define the measurement objectives, KPIs, conversion events, naming conventions, and data flow for the FlowFix Plumbing lead gen implementation — before any tracking tags are deployed.

---

## Business Objectives & KPIs

| # | Objective | KPI |
|---|-----------|-----|
| 1 | Generate qualified leads | Total macro-conversions per month (form submissions + phone calls + bookings) |
| 2 | Maximise lead quality | Average lead value / % of leads marked high quality |
| 3 | Reduce cost per acquisition | Google Ads cost per qualified lead (CPL) |
| 4 | Build remarketing audiences | GA4 / Google Ads remarketing audience size |

---

## Conversion Event Definitions

### Macro Conversions

Primary Google Ads conversion signals. Used for Smart Bidding optimisation.

| Event Name | Trigger | Tracking Method | Google Ads Conversion Action |
|-----------|---------|-----------------|------------------------------|
| `generate_lead` | CF7 form submission | `wpcf7mailsent` DOM event → dataLayer push | Contact Form Submission |
| `generate_lead` | HubSpot embedded form submission | `window.message` postMessage → dataLayer push | HubSpot Form Submission |
| `generate_lead` | AJAX form submission | JS success callback → dataLayer push | AJAX Form Submission |
| `phone_call_click` | Click on `tel:` link | GTM Click URL trigger | Phone Call Click |
| `booking_confirmed` | Calendly event scheduled | `calendly.event_scheduled` postMessage → dataLayer push | Meeting Booked |

> Note: The `/thank-you/` page redirect also triggers a `generate_lead` conversion via a GTM page path trigger — no additional dataLayer push required.

### Micro Conversions

Tracked in GA4 only. Not used for Google Ads Smart Bidding. Used for audience building and engagement insight.

| Event Name | Trigger | Tracking Method |
|-----------|---------|-----------------|
| `chat_started` | Tawk.to chat initiated | Tawk.to JS API → dataLayer push |
| `scroll_depth` | 75% page scroll | GA4 Enhanced Measurement (built-in) |
| `outbound_click` | Click to external URL | GA4 Enhanced Measurement (built-in) |
| `page_view` | Every page load | GA4 Enhanced Measurement (built-in) |

---

## Event Taxonomy & Naming Conventions

### Rules

- **Format:** `snake_case` only — no spaces, no camelCase, no hyphens
- **GA4 recommended names:** Use wherever an official GA4 recommended event name exists
- **Custom names:** Use `snake_case` descriptive names where no GA4 recommended equivalent exists
- **Parameters:** `snake_case`, descriptive (`form_id`, `lead_value`, `service_type`)
- **No PII in events:** No raw email addresses, phone numbers, or names in event parameters — hashed data only, sent via Enhanced Conversions

### Event Name Decisions

| Interaction | Event Name | Rationale |
|-------------|-----------|-----------|
| Form submission (all types) | `generate_lead` | GA4 recommended name — maps directly to Google Ads lead conversion |
| Phone `tel:` link click | `phone_call_click` | Custom — no GA4 recommended equivalent for this specific action |
| Calendly booking confirmed | `booking_confirmed` | Custom — `schedule` exists in GA4 but is too generic |
| Chat initiated | `chat_started` | Custom — no GA4 recommended equivalent |
| Thank-you page view | *(no push — GTM page path trigger only)* | Page path trigger fires the `generate_lead` conversion tag directly |

### Standard Parameters

Every dataLayer event should include these parameters where applicable:

| Parameter | Type | Example | Notes |
|-----------|------|---------|-------|
| `form_id` | string | `"cf7-contact"` | Identifies which form fired |
| `service_type` | string | `"boiler-repair"` | From dropdown field selection |
| `lead_value` | number | `150` | Assigned based on service type (see 1.18) |
| `page_path` | string | `"/contact/"` | Auto-captured by GA4 |

---

## Data Sources

| System | Role | Data Direction |
|--------|------|---------------|
| GTM (`GTM-5K9QS6NZ`) | Tag management — fires all tracking tags | → GA4, Google Ads |
| GA4 (`G-VH9CHBBWR7`) | Event collection, conversion tracking, audience building | ← GTM; → Google Ads (audiences) |
| Google Ads (`347-722-8703`) | Conversion optimisation, remarketing | ← GA4, offline CSV imports |
| Cookiebot (free tier) | Consent signals | → GTM (consent state updates) |
| Calendly (free tier) | Booking events via postMessage | → GTM dataLayer |
| HubSpot (free tier) | Embedded forms, simulated CRM | → GTM dataLayer |
| Tawk.to (free) | Live chat events | → GTM dataLayer |
| Manual CSV (simulated CRM) | Offline GCLID + lead outcome data | → Google Ads offline import |

---

## Account IDs Reference

| System | ID |
|--------|----|
| GTM Container | `GTM-5K9QS6NZ` |
| GTM Container Name | Lead Gen |
| GA4 Measurement ID | `G-VH9CHBBWR7` |
| GA4 Property Name | Lead Gen Demo |
| GA4 Stream URL | `http://lead-gen.local` |
| Google Ads MCC | `440-830-5844` |
| Google Ads Account | `347-722-8703` |
| Google Ads Account Name | Lead Gen Demo |

---

## Data Flow Diagram

See: `screenshots/01-measurement-plan/data-flow-diagram.png`

**Flow summary:**
1. User visits `http://lead-gen.local` → browser loads GTM container
2. Cookiebot fires first → sets consent state → GTM respects consent before firing any tags
3. User interacts (submits form / clicks phone / books Calendly) → event pushed to dataLayer
4. GTM reads dataLayer → fires GA4 event tag + Google Ads conversion tag
5. GA4 receives events → builds audiences → pushes audiences to Google Ads
6. CRM receives lead (simulated) → GCLID matched → CSV exported → imported to Google Ads as offline conversion

---

## Validation Steps

This is a planning document — no live validation required. Validation occurs per subproject as each tracking implementation is completed.

Refer to the QA checklists in each subsequent subproject guide (1.3 onwards).

---

## QA Checklist

- [x] Business objectives defined and agreed
- [x] Each objective mapped to a measurable KPI
- [x] All macro and micro conversion events defined
- [x] Event naming conventions documented
- [x] All data sources listed with data direction
- [x] All account IDs documented
- [ ] Data flow diagram created and saved to screenshots folder
- [ ] Plan reviewed before 1.2 (Data Layer Spec) begins

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Tracking covers too many events | No upfront plan — tracking added reactively | Define macro vs micro conversions before implementation; only macro events go to Google Ads |
| Inconsistent event naming across subprojects | No naming convention established | Follow the snake_case rules above; never deviate mid-project |
| Conversion actions created in MCC instead of child account | MCC vs child account confusion | Conversion actions must be created in the child account (`347-722-8703`), not the MCC |

---

## Reusable Assets

- See `guides/01-planning-architecture/measurement-planning-framework.md` for the reusable framework extracted from this plan

---

## Related Guides

- `guides/01-planning-architecture/measurement-planning-framework.md`
- `docs/02-data-layer-spec.md` (next subproject)
