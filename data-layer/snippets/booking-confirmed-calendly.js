/**
 * booking_confirmed — Calendly Booking
 *
 * Deployment: GTM Custom HTML tag — All Pages trigger
 * Subproject: 1.11 Calendly Tracking
 *
 * Listens for the Calendly postMessage event fired when a user completes
 * a booking. The event origin must be validated to prevent spoofing.
 *
 * Calendly postMessage payload (event_scheduled):
 *   event.data.event   → 'calendly.event_scheduled'
 *   event.data.payload.event_type.name → event type name (e.g. "Consultation")
 */

window.addEventListener('message', function(event) {
  if (
    event.origin === 'https://calendly.com' &&
    event.data.event === 'calendly.event_scheduled'
  ) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'booking_confirmed',
      event_type: 'calendly',
      calendly_event_name: event.data.payload.event_type.name || ''
    });
  }
});
