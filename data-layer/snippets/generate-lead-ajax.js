/**
 * generate_lead — AJAX Form Submission
 *
 * Deployment: GTM Custom HTML tag
 * Subproject: 1.7 AJAX Form Tracking
 *
 * Pattern depends on the AJAX form plugin used. The push structure below
 * is the agreed spec — the trigger mechanism is defined in 1.7.
 *
 * Common patterns:
 *   - Mutation observer watching for a success message element
 *   - Plugin-specific success callback (e.g. WPForms, Ninja Forms JS hooks)
 */

// Push structure — wire to the appropriate success callback in 1.7:
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'generate_lead',
  form_id: 'ajax-enquiry',
  lead_value: 0
});
