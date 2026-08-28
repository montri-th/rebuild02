(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js-ready');
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function themeLabel(mode, lang) {
    if (lang === 'th') {
      return mode === 'light' ? 'ธีม: สว่าง' : mode === 'dark' ? 'ธีม: มืด' : 'ธีม: ตามระบบ';
    }
    return mode === 'light' ? 'Theme: light' : mode === 'dark' ? 'Theme: dark' : 'Theme: system';
  }

  function resolveTheme(mode) {
    return mode === 'dark' || (mode === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';
  }

  function updateThemeControls() {
    var mode = root.getAttribute('data-theme-preference') || 'system';
    var lang = root.lang || 'en';
    document.querySelectorAll('[data-theme-cycle]').forEach(function (button) {
      var label = themeLabel(mode, lang);
      var text = button.querySelector('[data-theme-label]');
      if (text) text.textContent = label;
      button.setAttribute('aria-label', lang === 'th' ? 'สลับธีม สถานะปัจจุบัน — ' + label : 'Cycle theme. Current setting: ' + label);
    });
  }

  function cycleTheme() {
    var order = ['system', 'light', 'dark'];
    var current = root.getAttribute('data-theme-preference') || 'system';
    var next = order[(order.indexOf(current) + 1) % order.length];
    try { localStorage.setItem('lds-theme', next === 'system' ? '' : next); } catch (error) {}
    root.setAttribute('data-theme-preference', next);
    root.setAttribute('data-theme', resolveTheme(next));
    updateThemeControls();
  }

  function installMenu() {
    var shell = document.querySelector('[data-menu-shell]');
    var openButton = document.querySelector('[data-menu-open]');
    if (!shell || !openButton) return;
    var panel = shell.querySelector('[role="dialog"]');
    var backgroundRegions = Array.from(document.querySelectorAll('header, main, footer'));
    var previousFocus = null;

    function closeMenu(restoreFocus) {
      shell.hidden = true;
      backgroundRegions.forEach(function (region) { region.inert = false; });
      openButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (restoreFocus !== false && previousFocus && previousFocus.focus) previousFocus.focus();
    }

    function openMenu() {
      previousFocus = document.activeElement;
      shell.hidden = false;
      backgroundRegions.forEach(function (region) { region.inert = true; });
      openButton.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = panel && panel.querySelector('button, a[href]');
      if (first) first.focus();
    }

    openButton.addEventListener('click', openMenu);
    shell.querySelectorAll('[data-menu-close]').forEach(function (control) {
      control.addEventListener('click', function () {
        var navigatesToFragment = control.tagName === 'A' && control.hash;
        closeMenu(!navigatesToFragment);
        if (navigatesToFragment) {
          var target = document.getElementById(decodeURIComponent(control.hash.slice(1)));
          if (target && target.focus) {
            try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); }
          }
        }
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !shell.hidden) closeMenu();
      if (event.key !== 'Tab' || shell.hidden || !panel) return;
      var items = Array.from(panel.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])'));
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function installLocaleLinks() {
    document.querySelectorAll('[data-locale-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        link.href = link.getAttribute('href').split(/[?#]/)[0] + window.location.search + window.location.hash;
      });
    });
  }

  function writeClipboard(value, status, success, failure) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () {
        status.textContent = success;
        status.classList.add('settle-once');
      }).catch(function () {
        status.textContent = failure;
      });
      return;
    }
    var input = document.createElement('textarea');
    input.value = value;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      var copied = document.execCommand('copy');
      if (!copied) throw new Error('copy command returned false');
      status.textContent = success;
      status.classList.add('settle-once');
    } catch (error) {
      status.textContent = failure;
    }
    input.remove();
  }

  function installCopyControls() {
    document.querySelectorAll('[data-copy-target]').forEach(function (button) {
      var target = document.querySelector(button.getAttribute('data-copy-target'));
      var status = document.querySelector(button.getAttribute('data-status-target'));
      if (!target || !status) return;
      button.addEventListener('click', function () {
        var value = target.value || target.textContent || '';
        writeClipboard(
          value,
          status,
          button.getAttribute('data-success') || 'Copied.',
          button.getAttribute('data-failure') || 'Copy failed. Select the text above.'
        );
      });
    });
  }

  function installToolHandoff() {
    document.querySelectorAll('[data-map-open]').forEach(function (link) {
      var input = document.querySelector(link.getAttribute('data-query-target'));
      if (input && input.hasAttribute('data-editable-query')) input.readOnly = false;
      link.addEventListener('click', function () {
        if (input) link.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(input.value);
      });
    });
  }

  function installContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var values = new FormData(form);
      var lang = root.lang || 'en';
      var body = (lang === 'th' ? 'หัวข้อ: ' : 'Topic: ') + (values.get('topic') || '') + '\n' +
        (lang === 'th' ? 'ชื่อ: ' : 'Name: ') + (values.get('name') || '') + '\n' +
        (lang === 'th' ? 'อีเมล: ' : 'Email: ') + (values.get('email') || '') + '\n' +
        (lang === 'th' ? 'โทรศัพท์: ' : 'Phone: ') + (values.get('phone') || '') + '\n\n' +
        (values.get('message') || '');
      var subject = lang === 'th' ? 'ติดต่อจากเว็บ Landometer' : 'Landometer website enquiry';
      var mailto = 'mailto:hello@landometer.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var fallback = document.querySelector('[data-contact-fallback]');
      var fallbackLink = fallback && fallback.querySelector('a');
      if (fallbackLink) fallbackLink.href = mailto;
      if (fallback) fallback.hidden = false;
      window.location.href = mailto;
    });
  }

  function installMotion() {
    var items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length || (motionQuery && motionQuery.matches) || !('IntersectionObserver' in window)) return;
    var computed = window.getComputedStyle(root);
    var stagger = parseFloat(computed.getPropertyValue('--motion-delay-stagger'));
    var cap = parseFloat(computed.getPropertyValue('--motion-delay-stagger-cap'));
    var revealDuration = parseFloat(computed.getPropertyValue('--motion-duration-reveal'));
    if (!stagger || !cap || !revealDuration) return;
    items.forEach(function (item, index) {
      var groupIndex = Number(item.getAttribute('data-reveal-index') || index % 5);
      item.style.setProperty('--reveal-delay', Math.min(groupIndex * stagger, cap) + 'ms');
    });
    root.classList.add('motion-ready');
    function allRevealed() {
      return items.every(function (item) { return item.classList.contains('is-revealed'); });
    }
    function stopRevealFallback() {
      window.removeEventListener('scroll', revealReachedFallback);
      window.removeEventListener('resize', revealReachedFallback);
    }
    function revealReachedFallback() {
      items.forEach(function (item) {
        var box = item.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom >= 0) item.classList.add('is-revealed');
      });
      if (allRevealed()) stopRevealFallback();
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
      if (allRevealed()) stopRevealFallback();
    }, { threshold: 0.16 });
    items.forEach(function (item) { observer.observe(item); });
    window.addEventListener('scroll', revealReachedFallback, { passive: true });
    window.addEventListener('resize', revealReachedFallback);
    revealReachedFallback();
  }

  function protectVideo() {
    document.querySelectorAll('video').forEach(function (video) {
      video.muted = true;
      video.loop = false;
      video.autoplay = false;
      video.controls = true;
      if (motionQuery && motionQuery.matches) video.pause();
    });
  }

  function focusHashTarget() {
    if (!window.location.hash) return;
    var id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (error) { return; }
    var target = document.getElementById(id);
    if (!target || !target.hasAttribute('tabindex')) return;
    try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); }
  }

  document.querySelectorAll('[data-theme-cycle]').forEach(function (button) {
    button.addEventListener('click', cycleTheme);
  });
  updateThemeControls();
  installMenu();
  installLocaleLinks();
  installCopyControls();
  installToolHandoff();
  installContactForm();
  protectVideo();
  installMotion();
  focusHashTarget();
  window.addEventListener('hashchange', focusHashTarget);
})();
