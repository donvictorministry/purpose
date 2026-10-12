/* policy.js: plug and play "Privacy Policy" for any project built on the dv runtime.
   Self contained: it brings its own CSS, HTML, and JavaScript, and adds one item to the right sidebar menu.
   Edit CONFIG only. A blank value uses the automatic default (author, title, year, and email come from contents.js).
   This is a general template and is not legal advice; have it reviewed for your jurisdiction. */
(function () {
'use strict';
var D = window.DV; if (!D || !D.menu || !D.modal) return;
var CONFIG = { owner: '', site: '', email: '', updated: '12 October 2026' };

var M = (D.contents && D.contents.meta) || {};
var owner = CONFIG.owner || M.author || 'the author', site = CONFIG.site || M.title || document.title;
var email = CONFIG.email || ((M.contacts || {}).Email || '').replace(/^mailto:/, '');

function css() {
  if (document.getElementById('dvLegalCss')) return;
  var s = document.createElement('style'); s.id = 'dvLegalCss';
  s.textContent = '.dvLegalBody h3{font-size:1.1rem;margin:1.2rem 0 .3rem;line-height:1.35}.dvLegalBody p{margin:0 0 .8rem;line-height:1.7;overflow-wrap:anywhere}.dvLegalMeta{color:var(--dv-mut)}';
  document.head.appendChild(s);
}
var S = [
  ['1. Summary', 'This is a static website. It has no user accounts, no advertising, and no analytics or tracking tools operated by ' + owner + '. No personal information is collected through the site itself.'],
  ['2. Information stored on your device', 'The site saves your display choices, such as dark mode and text size, in your browser local storage, and may keep a copy of its pages in your browser cache so that it works offline. This information stays on your device and is not sent to the owner. You can remove it at any time by clearing the site data in your browser settings.'],
  ['3. Contact form and email', 'The contact form does not send data to a server. When you press Send, it opens your own email application with a message that you can review before sending. If you send it, the owner receives the name, email address, and message that you choose to include, and uses them only to reply to you. Messages are kept only as long as needed for that purpose and are not sold or shared for marketing.'],
  ['4. Hosting and technical data', 'The site is delivered by a hosting provider and by the networks between you and its server. These parties may process technical data such as your IP address, browser type, and request time to deliver and secure the service, under their own privacy policies. The owner does not receive or control this data.'],
  ['5. Cookies', 'The site does not set tracking or advertising cookies.'],
  ['6. Sharing', 'The Share button uses the sharing function of your device or copies the page address. Nothing is sent to the owner.'],
  ['7. Links to other sites', 'Outside websites that you open from this site have their own privacy practices, which the owner does not control.'],
  ['8. Children', 'The site is not directed at children, and no personal information is knowingly collected from them.'],
  ['9. Your rights', 'Under applicable data protection laws, you may ask to access, correct, or delete personal information that the owner holds about you, such as an email message you sent. Use the contact details below.'],
  ['10. Security', 'Email is not guaranteed to be secure, so please avoid sending sensitive information in a message.'],
  ['11. Changes', 'This policy may be updated from time to time. The date shown above is the date of the latest update, and continued use of the site after a change means that you accept the updated policy.']
];
S.push(['12. Contact', email ? 'For privacy questions or requests, write to ' + email + '.' : 'For privacy questions or requests, use the contact form on the About the Author page.']);

function open() {
  css();
  var w = document.createElement('div'), p, h, i;
  w.className = 'dvLegalBody';
  p = document.createElement('p'); p.className = 'dvLegalMeta'; p.textContent = site + ' | Last updated: ' + CONFIG.updated; w.appendChild(p);
  for (i = 0; i < S.length; i++) {
    h = document.createElement('h3'); h.textContent = S[i][0]; w.appendChild(h);
    p = document.createElement('p'); p.textContent = S[i][1]; w.appendChild(p);
  }
  D.modal('Privacy Policy', w);
}
var el = D.menu('right').add({ label: 'Privacy Policy', fn: open });
el.insertAdjacentHTML('afterbegin', '<svg class="dvIco" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>');
})();
