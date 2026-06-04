/**
 * generate_lead — CF7 Form Submission
 *
 * Deployment: WPCode → Footer → JavaScript
 * Subproject: 1.6 Contact Form Tracking
 *
 * Fires on successful CF7 form submission via the wpcf7mailsent DOM event.
 * Reads form field values at submission time, pushes to dataLayer, then
 * redirects to the Thank You page.
 *
 * CF7 field names:
 *   your-email    → Email Address
 *   your-phone    → Phone Number
 *   your-service  → Service Needed (dropdown)
 */

document.addEventListener('wpcf7mailsent', function(event) {
  var form = event.target;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    form_id: 'cf7-contact',
    service_type: form.querySelector('[name="your-service"]').value,
    lead_value: 0, // Dynamic value assignment implemented in 1.18 Lead Quality Tracking
    user_data: {
      email_address: form.querySelector('[name="your-email"]').value,
      phone_number: form.querySelector('[name="your-phone"]').value
    }
  });
  window.location.replace('/thank-you/');
}, false);
