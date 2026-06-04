# Data Layer Specification

**Project:** FlowFix Plumbing — Lead Gen Demo  
**Date:** 2026-06-04  
**Status:** ✅ Complete

---

## What This Does & Why

This document is the single source of truth for every `dataLayer.push()` on the lead gen site. It is written before any GTM tags are built. GTM configuration in subsequent subprojects implements this spec — if GTM and this spec ever disagree, this spec is correct.

The dataLayer is the contract between the website and GTM. Everything GTM knows about a user action comes from what the site puts into the dataLayer. If it's not in the dataLayer, GTM cannot track it.

---

## Prerequisites

- [x] Measurement plan complete (1.1) — event names and parameters agreed
- [x] CF7 form field names confirmed (`your-email`, `your-phone`, `your-service`)
- [x] WPCode plugin installed and active
- [x] GTM container installed via GTM4WP

---

## dataLayer Initialisation

GTM4WP initialises the dataLayer automatically in the `<head>` before the GTM container loads:

```javascript
var dataLayer = dataLayer || [];
```

No additional initialisation required. Do not add a second `window.dataLayer = window.dataLayer || [];` in WPCode — it is redundant.

> **Note on plugin load order:** GTM4WP fires its `<head>` snippet before WPCode header snippets. This means WPCode cannot be used to push data to the dataLayer before GTM loads. GCLID capture is therefore handled inside GTM as a Custom HTML tag (documented in 1.3 GTM Foundation).

---

## Events

### 1. `generate_lead` — CF7 Form Submission

**Trigger:** User submits the Contact Form 7 form successfully  
**Where it fires:** WPCode footer snippet, listening for the `wpcf7mailsent` DOM event  
**Subproject:** 1.6 Contact Form Tracking

#### Parameters

| Parameter | Type | Example Value | Notes |
|-----------|------|---------------|-------|
| `event` | string | `"generate_lead"` | GA4 recommended event name |
| `form_id` | string | `"cf7-contact"` | Hard-coded — identifies this specific form |
| `service_type` | string | `"Boiler Repair"` | Read from `[name="your-service"]` at submission time |
| `lead_value` | number | `0` | Set to 0 here; dynamic value assignment implemented in 1.18 |
| `user_data.email_address` | string | `"john@example.com"` | Read from `[name="your-email"]`; used by Enhanced Conversions (1.14) |
| `user_data.phone_number` | string | `"07700900123"` | Read from `[name="your-phone"]`; used by Enhanced Conversions (1.14) |

#### Code

```javascript
document.addEventListener('wpcf7mailsent', function(event) {
  var form = event.target;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    form_id: 'cf7-contact',
    service_type: form.querySelector('[name="your-service"]').value,
    lead_value: 0,
    user_data: {
      email_address: form.querySelector('[name="your-email"]').value,
      phone_number: form.querySelector('[name="your-phone"]').value
    }
  });
  window.location.replace('/thank-you/');
}, false);
```

**Deployment:** WPCode → Footer → JavaScript  
**Snippet file:** `data-layer/snippets/generate-lead-cf7.js`

---

### 2. `generate_lead` — HubSpot Form Submission

**Trigger:** User submits a HubSpot embedded form successfully  
**Where it fires:** GTM Custom HTML tag, listening for `window.message` postMessage  
**Subproject:** 1.12 HubSpot Forms Tracking

#### Parameters

| Parameter | Type | Example Value | Notes |
|-----------|------|---------------|-------|
| `event` | string | `"generate_lead"` | Same event name as CF7 — same macro conversion |
| `form_id` | string | `"hubspot-contact"` | Hard-coded — identifies HubSpot form |
| `service_type` | string | `""` | HubSpot forms may not have service dropdown; defaults to empty string |
| `lead_value` | number | `0` | Default; dynamic assignment in 1.18 |

#### Code

```javascript
window.addEventListener('message', function(event) {
  if (event.data.type === 'hsFormCallback' &&
      event.data.eventName === 'onFormSubmitted') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      form_id: 'hubspot-contact',
      service_type: '',
      lead_value: 0
    });
  }
});
```

**Deployment:** GTM Custom HTML tag — All Pages trigger  
**Snippet file:** `data-layer/snippets/generate-lead-hubspot.js`

---

### 3. `generate_lead` — AJAX Form Submission

**Trigger:** User submits a non-CF7 AJAX form successfully (no page reload)  
**Where it fires:** GTM Custom HTML tag, JS mutation observer or success callback  
**Subproject:** 1.7 AJAX Form Tracking

#### Parameters

| Parameter | Type | Example Value | Notes |
|-----------|------|---------------|-------|
| `event` | string | `"generate_lead"` | Same macro conversion event |
| `form_id` | string | `"ajax-enquiry"` | Identifies the specific AJAX form |
| `lead_value` | number | `0` | Default |

#### Code

```javascript
// To be implemented in 1.7 — pattern depends on AJAX form plugin used.
// Push structure:
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'generate_lead',
  form_id: 'ajax-enquiry',
  lead_value: 0
});
```

**Deployment:** GTM Custom HTML tag  
**Snippet file:** `data-layer/snippets/generate-lead-ajax.js`

---

### 4. `phone_call_click` — Tel: Link Click

**Trigger:** User clicks a `tel:` link on the site  
**Where it fires:** No dataLayer push — GTM Click URL trigger handles this directly  
**Subproject:** 1.9 Phone Call Tracking

> **No dataLayer push required.** GTM's built-in Click URL trigger matches `tel:` links and fires tags without a custom push. GTM built-in variables `{{Click URL}}` and `{{Click Text}}` capture the phone number and link text automatically.

#### GTM Trigger Condition (for reference)

```
Trigger type: Click — All Elements
Fire on: Click URL contains "tel:"
```

---

### 5. `booking_confirmed` — Calendly Booking

**Trigger:** User completes a Calendly booking  
**Where it fires:** GTM Custom HTML tag, listening for `calendly.event_scheduled` postMessage  
**Subproject:** 1.11 Calendly Tracking

#### Parameters

| Parameter | Type | Example Value | Notes |
|-----------|------|---------------|-------|
| `event` | string | `"booking_confirmed"` | Custom name — no GA4 recommended equivalent |
| `event_type` | string | `"calendly"` | Identifies booking source |
| `calendly_event_name` | string | `"consultation"` | From Calendly postMessage payload |

#### Code

```javascript
window.addEventListener('message', function(event) {
  if (event.origin === 'https://calendly.com' &&
      event.data.event === 'calendly.event_scheduled') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'booking_confirmed',
      event_type: 'calendly',
      calendly_event_name: event.data.payload.event_type.name || ''
    });
  }
});
```

**Deployment:** GTM Custom HTML tag — All Pages trigger  
**Snippet file:** `data-layer/snippets/booking-confirmed-calendly.js`

---

### 6. `chat_started` — Tawk.to Chat Initiated

**Trigger:** User initiates a live chat conversation in Tawk.to  
**Where it fires:** GTM Custom HTML tag, using Tawk.to JavaScript API  
**Subproject:** 1.13 Live Chat Tracking (🟨 Simulated)

#### Parameters

| Parameter | Type | Example Value | Notes |
|-----------|------|---------------|-------|
| `event` | string | `"chat_started"` | Custom name — micro-conversion only |
| `chat_provider` | string | `"tawkto"` | Identifies provider; future-proofs for tool swaps |

#### Code

```javascript
// Requires Tawk.to script to be loaded first
var Tawk_API = Tawk_API || {};
Tawk_API.onChatStarted = function() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'chat_started',
    chat_provider: 'tawkto'
  });
};
```

**Deployment:** GTM Custom HTML tag — All Pages trigger  
**Snippet file:** `data-layer/snippets/chat-started-tawkto.js`

---

## Events Not in This Spec

These events are handled without a dataLayer push:

| Event | Reason |
|-------|--------|
| `page_view` | GA4 Enhanced Measurement — automatic |
| `scroll` | GA4 Enhanced Measurement — automatic |
| `click` (outbound) | GA4 Enhanced Measurement — automatic |
| GCLID capture | GTM Custom HTML tag + localStorage variable — no push needed. Documented in 1.3 GTM Foundation. |
| Thank-you page conversion | GTM Page Path trigger (`/thank-you/`) fires `generate_lead` conversion tag directly — no push needed |

---

## Service Type Values Reference

The `your-service` CF7 dropdown options, as configured in the form:

| Dropdown Label | `service_type` value pushed to dataLayer |
|----------------|------------------------------------------|
| Emergency Callout | `"Emergency Callout"` |
| Drain Unblocking | `"Drain Unblocking"` |
| Boiler Repair | `"Boiler Repair"` |
| Bathroom Installation | `"Bathroom Installation"` |
| Other / Not Sure | `"Other / Not Sure"` |

> The value pushed is whatever the user selected — no transformation applied at the dataLayer level. Lead value mapping by service type is implemented in 1.18.

---

## QA Checklist

- [ ] `generate_lead` fires on CF7 submission — not on page load
- [ ] `service_type` populates with the correct dropdown value
- [ ] `user_data.email_address` and `user_data.phone_number` populate correctly
- [ ] No duplicate `generate_lead` events on single submission
- [ ] `booking_confirmed` fires after Calendly booking — not on widget load
- [ ] `chat_started` fires on chat initiation — not on widget load
- [ ] Phone `tel:` clicks captured by GTM trigger — no dataLayer event visible in Preview
- [ ] GTM Preview dataLayer panel shows all expected parameters

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `generate_lead` fires on page load | Listener attached to wrong event | Ensure listener is on `wpcf7mailsent`, not `wpcf7submit` |
| `service_type` is empty string | Field name mismatch in querySelector | Confirm CF7 field name is exactly `your-service` |
| `user_data` fields empty | Form not yet submitted when push fires | `wpcf7mailsent` fires after submission — check event timing in GTM Preview |
| Duplicate `generate_lead` events | Both WPCode snippet and GTM Form trigger firing | Remove GTM Form Submit trigger if WPCode snippet handles the push |
| Calendly postMessage not caught | Calendly domain check failing | Confirm `event.origin === 'https://calendly.com'` matches actual origin |

---

## Related Guides

- `guides/02-data-collection/data-layer-fundamentals.md`
- `docs/01-measurement-plan.md`
- `docs/03-gtm-foundation.md` (GCLID capture implementation)
