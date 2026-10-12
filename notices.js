/* notices.js: plug and play friendly pop up notices that appear as visitors navigate.
   Self contained: it brings its own CSS, HTML, and JavaScript. Needs only the dv runtime (app.js).
   Edit CFG and MSG below. The WhatsApp link comes from contacts.WhatsApp in contents.js. */
(function () {
'use strict';
var D = window.DV; if (!D || !D.on || !D.icon) return;
var CFG = { first: 12000, gap: 45000, visible: 11000, max: 6 };
var MSG = [
  { t: 'Hello, Dr. Chris is more than grateful to have you here. For personal prayers and counseling, reach him via WhatsApp right now!', a: 'wa' },
  { t: 'You are not alone. Send your prayer request on WhatsApp and let us stand with you in faith.', a: 'wa' },
  { t: 'If this book is blessing you, share it with one person who needs hope today.', a: 'share' },
  { t: 'Help us reach more souls and build more free resources. Stand with Christ Ministries International.', a: 'go', go: 'support-our-mission' },
  { t: '“For I know the plans I have for you,” declares the Lord. Jeremiah 29:11', a: '' },
  { t: 'Take a quiet moment to pray before you read on. God has a word for you today.', a: '' }
];
var C = ((D.contents && D.contents.meta) || {}).contacts || {}, last = Date.now(), shown = 0, idx = 0, card, hideT;
try { idx = +sessionStorage.getItem('dvbook.ni') || 0; shown = +sessionStorage.getItem('dvbook.ns') || 0; } catch (e) {}
function css() {
  if (document.getElementById('dvNoteCss')) return;
  var s = document.createElement('style'); s.id = 'dvNoteCss';
  s.textContent = '.dvNote{position:fixed;left:50%;bottom:calc(1rem + env(safe-area-inset-bottom));z-index:22;width:min(92vw,30rem);display:flex;align-items:center;gap:.8rem;padding:.8rem;background:var(--dv-bg);color:var(--dv-fg);border:1px solid var(--dv-line);border-radius:1rem;box-shadow:0 8px 24px rgba(0,0,0,.28);transform:translate(-50%,24px);opacity:0;transition:opacity .3s,transform .3s}.dvNote.dvShow{opacity:1;transform:translate(-50%,0)}.dvNote p{flex:1;margin:0;font-size:1rem;line-height:1.45}.dvNote .dvIconBtn{flex:none}.dvNoteX{flex:none;width:2.6rem;height:2.6rem;display:inline-flex;align-items:center;justify-content:center;background:none;border:0;border-radius:50%;color:var(--dv-mut);cursor:pointer}';
  document.head.appendChild(s);
}
function hide() { clearTimeout(hideT); if (!card) return; var c = card; card = null; c.classList.remove('dvShow'); setTimeout(function () { c.remove(); }, 350); }
function share() {
  var d = { title: document.title, url: location.href };
  if (navigator.share) navigator.share(d).catch(function () {});
  else if (navigator.clipboard) navigator.clipboard.writeText(d.url).then(function () { D.toast('Link copied'); }, function () { D.toast('Could not copy the link'); });
}
function show() {
  if (card || shown >= CFG.max || document.querySelector('.dvModalWrap') || document.hidden) return;
  css();
  var m = MSG[idx % MSG.length], lead = '';
  idx++; shown++; last = Date.now();
  try { sessionStorage.setItem('dvbook.ni', idx); sessionStorage.setItem('dvbook.ns', shown); } catch (e) {}
  if (m.a === 'wa') lead = C.WhatsApp ? '<a class="dvIconBtn" href="' + C.WhatsApp + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + D.icon('wa') + '</a>' : '<button type="button" class="dvIconBtn" data-dvn="empty" aria-label="WhatsApp">' + D.icon('wa') + '</button>';
  else if (m.a === 'share') lead = '<button type="button" class="dvIconBtn" data-dvn="share" aria-label="Share">' + D.icon('share') + '</button>';
  else if (m.a === 'go') lead = '<button type="button" class="dvIconBtn" data-dvn="go" aria-label="Support">' + D.icon('list') + '</button>';
  card = document.createElement('div'); card.className = 'dvNote'; card.setAttribute('role', 'status');
  card.innerHTML = lead + '<p></p><button type="button" class="dvNoteX" data-dvn="close" aria-label="Close">' + D.icon('close') + '</button>';
  card.querySelector('p').textContent = m.t;
  card.addEventListener('click', function (e) {
    var b = e.target.closest('[data-dvn]'); if (!b) return;
    var k = b.getAttribute('data-dvn');
    if (k === 'close') hide();
    else if (k === 'share') { share(); hide(); }
    else if (k === 'go' && D.go) { D.go(m.go); hide(); }
    else if (k === 'empty') D.toast('WhatsApp link not set yet');
  });
  document.body.appendChild(card);
  requestAnimationFrame(function () { requestAnimationFrame(function () { if (card) card.classList.add('dvShow'); }); });
  hideT = setTimeout(hide, CFG.visible);
}
D.on('ready', function () { setTimeout(show, CFG.first); });
D.on('route', function () { if (Date.now() - last >= CFG.gap) show(); });
})();
