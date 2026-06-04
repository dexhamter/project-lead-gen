/**
 * chat_started — Tawk.to Live Chat
 *
 * Deployment: GTM Custom HTML tag — All Pages trigger
 * Subproject: 1.13 Live Chat Tracking (🟨 Simulated)
 *
 * Uses the Tawk.to JavaScript API onChatStarted callback.
 * Requires Tawk.to script to be loaded before this tag fires.
 * Set GTM tag firing priority lower than the Tawk.to load tag.
 *
 * Generic pattern: this callback approach is the same pattern used by
 * Intercom (onShow), Drift (on('conversation:opened')), and Zendesk
 * (zE('messenger:on', 'open', fn)) — only the API method name differs.
 */

var Tawk_API = Tawk_API || {};
Tawk_API.onChatStarted = function() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'chat_started',
    chat_provider: 'tawkto'
  });
};
