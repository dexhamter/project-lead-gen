/**
 * generate_lead — HubSpot Form Submission
 *
 * Deployment: GTM Custom HTML tag — All Pages trigger
 * Subproject: 1.12 HubSpot Forms Tracking
 *
 * Listens for HubSpot's postMessage callback on form submission.
 * HubSpot embedded forms fire a window message event with type 'hsFormCallback'
 * and eventName 'onFormSubmitted' on successful submission.
 */

window.addEventListener('message', function(event) {
  if (
    event.data.type === 'hsFormCallback' &&
    event.data.eventName === 'onFormSubmitted'
  ) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      form_id: 'hubspot-contact',
      service_type: '',
      lead_value: 0
    });
  }
});
