/* SOLEN & FORM — independent website concept; no network submission. */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const menuButton = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    mobileNav.classList.remove('open');
    mobileNav.inert = true;
    document.body.classList.remove('nav-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen) { closeMenu(); return; }
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
    mobileNav.classList.add('open');
    mobileNav.inert = false;
    document.body.classList.add('nav-open');
    $('a', mobileNav)?.focus();
  });
  $$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));

  const dialog = $('#enquiry-dialog');
  const closeButton = $('.dialog-close');
  const form = $('#brief-form');
  const status = $('#copy-status');
  const lightbox = $('#lightbox');
  let lastFocus = null;
  const lockBody = () => { document.body.style.overflow = 'hidden'; };
  const unlockBody = () => { document.body.style.overflow = ''; };
  const openDialog = () => {
    closeMenu(); lastFocus = document.activeElement;
    dialog.hidden = false; lockBody(); closeButton.focus();
  };
  const closeDialog = () => {
    dialog.hidden = true; unlockBody(); lastFocus?.focus?.();
  };
  $$('[data-enquire]').forEach(button => button.addEventListener('click', openDialog));
  closeButton.addEventListener('click', closeDialog);
  dialog.addEventListener('mousedown', e => { if (e.target === dialog) closeDialog(); });
  function briefText() {
    const data = new FormData(form);
    return `Hello,\n\nI would like to discuss an interior design project.\n\nName: ${String(data.get('name') || '').trim()}\nEmail: ${String(data.get('email') || '').trim()}\nSpace: ${String(data.get('type') || '').trim()}\n\nProject details:\n${String(data.get('message') || '').trim()}\n\nPrepared using a fictional SOLEN & FORM concept website. Please add the intended recipient before sending.`;
  }
  form.addEventListener('submit', e => {
    e.preventDefault(); if (!form.reportValidity()) return;
    const subject = encodeURIComponent('Interior design enquiry — SOLEN & FORM concept');
    const body = encodeURIComponent(briefText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    status.textContent = 'Email draft prepared. Add a recipient in your email app.';
  });
  $('#copy-brief').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(briefText());
      status.textContent = 'Brief copied. Add the intended recipient before sending.';
    } catch {
      status.textContent = 'Clipboard unavailable. Use Prepare email instead.';
    }
  });
  dialog.addEventListener('keydown', e => trapFocus(e, dialog));

  const filterButtons = $$('.filter-button');
  const cards = $$('.project-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));
  const images = $$('.project-photo');
  let originalFocus = null;
  const closeViewer = () => {
    lightbox.hidden = true; unlockBody(); originalFocus?.focus?.();
  };
  images.forEach(button => button.addEventListener('click', () => {
    originalFocus = document.activeElement;
    const img = $('img', button);
    $('#lightbox-image').src = img.src;
    $('#lightbox-image').alt = img.alt;
    $('#lightbox-title').textContent = button.closest('article').querySelector('h3').textContent;
    lightbox.hidden = false; lockBody(); $('.lightbox-close').focus();
  }));
  $('.lightbox-close').addEventListener('click', closeViewer);
  lightbox.addEventListener('mousedown', e => { if (e.target === lightbox) closeViewer(); });
  lightbox.addEventListener('keydown', e => trapFocus(e, lightbox));
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!lightbox.hidden) closeViewer();
    else if (!dialog.hidden) closeDialog();
    else closeMenu();
  });
  function trapFocus(e, root) {
    if (e.key !== 'Tab') return;
    const focusable = $$('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])', root).filter(el => el.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
})();