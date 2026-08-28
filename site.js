(function () {
  'use strict';

  var root = document.documentElement;
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  root.classList.add('js-ready');

  function resolveTheme(mode) {
    return mode === 'dark' || (mode === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light';
  }

  function setTheme(mode) {
    try {
      if (mode === 'system') localStorage.removeItem('lds-theme');
      else localStorage.setItem('lds-theme', mode);
    } catch (error) {}
    root.setAttribute('data-theme-preference', mode);
    root.setAttribute('data-theme', resolveTheme(mode));
    updateThemeControls();
  }

  function updateThemeControls() {
    var mode = root.getAttribute('data-theme-preference') || 'system';
    document.querySelectorAll('[data-theme-set]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-theme-set') === mode));
    });
  }

  function installThemeControls() {
    document.querySelectorAll('[data-theme-set]').forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(button.getAttribute('data-theme-set'));
      });
    });
    updateThemeControls();
  }

  function installMenu() {
    var shell = document.querySelector('[data-menu-shell]');
    var openButton = document.querySelector('[data-menu-open]');
    if (!shell || !openButton) return;
    var panel = shell.querySelector('[role="dialog"]');
    var menuIcon = openButton.querySelector('[data-menu-icon]');
    var menuLabel = openButton.querySelector('.menu-toggle__label');
    var backgroundRegions = Array.from(document.querySelectorAll('main, footer'));
    var previousFocus = null;

    function setButtonState(isOpen) {
      openButton.setAttribute('aria-expanded', String(isOpen));
      if (menuIcon) menuIcon.textContent = isOpen ? 'close' : 'menu';
      if (menuLabel) menuLabel.textContent = isOpen
        ? (root.lang === 'th' ? 'ปิด' : 'Close')
        : (root.lang === 'th' ? 'เมนู' : 'Menu');
    }

    function closeMenu(restoreFocus) {
      if (shell.hidden) return;
      shell.hidden = true;
      document.body.classList.remove('menu-open');
      backgroundRegions.forEach(function (region) { region.inert = false; });
      setButtonState(false);
      if (restoreFocus !== false && previousFocus && previousFocus.focus) previousFocus.focus();
    }

    function openMenu() {
      previousFocus = document.activeElement;
      shell.hidden = false;
      document.body.classList.add('menu-open');
      backgroundRegions.forEach(function (region) { region.inert = true; });
      setButtonState(true);
      if (panel) panel.focus();
    }

    openButton.addEventListener('click', function () {
      if (shell.hidden) openMenu();
      else closeMenu();
    });

    shell.querySelectorAll('[data-menu-close]').forEach(function (control) {
      control.addEventListener('click', function () {
        var navigatesToFragment = control.tagName === 'A' && control.hash;
        closeMenu(!navigatesToFragment);
        if (navigatesToFragment) window.setTimeout(focusHashTarget, 0);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !shell.hidden) {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab' || shell.hidden || !panel) return;
      var items = Array.from(panel.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])'));
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
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

  function installTopicPickers() {
    document.querySelectorAll('[data-topic-picker]').forEach(function (picker) {
      var button = picker.querySelector('[data-topic-button]');
      var list = picker.querySelector('[data-topic-list]');
      var input = picker.querySelector('input[name="topic"]');
      var label = picker.querySelector('[data-topic-label]');
      var options = Array.from(picker.querySelectorAll('[data-topic-value]'));
      if (!button || !list || !input || !label || !options.length) return;

      function selectedIndex() {
        return Math.max(0, options.findIndex(function (option) {
          return option.getAttribute('aria-selected') === 'true';
        }));
      }

      function openPicker(focusIndex) {
        list.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        if (typeof focusIndex === 'number') options[focusIndex].focus();
      }

      function closePicker(restoreFocus) {
        list.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        if (restoreFocus) button.focus();
      }

      function selectOption(option, restoreFocus) {
        options.forEach(function (item) {
          item.setAttribute('aria-selected', String(item === option));
        });
        input.value = option.getAttribute('data-topic-value') || option.textContent.trim();
        label.textContent = option.textContent.trim();
        closePicker(restoreFocus);
      }

      picker.setTopic = function (value) {
        var match = options.find(function (option) {
          return option.getAttribute('data-topic-value') === value;
        });
        if (match) selectOption(match, false);
      };

      picker.resetTopic = function () {
        selectOption(options[0], false);
      };

      button.addEventListener('click', function () {
        if (list.hidden) openPicker(selectedIndex());
        else closePicker(false);
      });

      button.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !list.hidden) {
          event.preventDefault();
          closePicker(false);
          return;
        }
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        openPicker(event.key === 'ArrowDown' ? selectedIndex() : options.length - 1);
      });

      options.forEach(function (option, index) {
        option.addEventListener('click', function () { selectOption(option, true); });
        option.addEventListener('keydown', function (event) {
          var next = index;
          if (event.key === 'ArrowDown') next = (index + 1) % options.length;
          else if (event.key === 'ArrowUp') next = (index - 1 + options.length) % options.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = options.length - 1;
          else if (event.key === 'Escape') {
            event.preventDefault();
            closePicker(true);
            return;
          } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectOption(option, true);
            return;
          } else return;
          event.preventDefault();
          options[next].focus();
        });
      });

      document.addEventListener('pointerdown', function (event) {
        if (!list.hidden && !picker.contains(event.target)) closePicker(false);
      });

      picker.addEventListener('focusout', function () {
        window.setTimeout(function () {
          if (!picker.contains(document.activeElement)) closePicker(false);
        }, 0);
      });
    });

    document.querySelectorAll('[data-contact-topic]').forEach(function (link) {
      link.addEventListener('click', function () {
        var picker = document.querySelector('[data-topic-picker]');
        if (picker && picker.setTopic) picker.setTopic(link.getAttribute('data-contact-topic'));
      });
    });
  }

  function installContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var status = form.querySelector('[data-contact-status]');
    var submit = form.querySelector('button[type="submit"]');
    var submitLabel = form.querySelector('[data-submit-label]');
    var originalLabel = submitLabel ? submitLabel.textContent : '';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var values = new FormData(form);
      var payload = {
        name: String(values.get('name') || '').trim(),
        email: String(values.get('email') || '').trim(),
        phone: String(values.get('phone') || '').trim(),
        message: String(values.get('message') || '').trim(),
        topic: String(values.get('topic') || '').trim()
      };

      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
      if (status) {
        status.textContent = form.getAttribute('data-pending') || 'Sending…';
        status.removeAttribute('data-state');
      }
      if (submitLabel) submitLabel.textContent = root.lang === 'th' ? 'กำลังส่ง…' : 'Sending…';

      fetch(form.action, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.reset();
        var picker = form.querySelector('[data-topic-picker]');
        if (picker && picker.resetTopic) picker.resetTopic();
        if (status) {
          status.textContent = form.getAttribute('data-success') || 'Message sent.';
          status.setAttribute('data-state', 'success');
          status.classList.add('settle-once');
        }
      }).catch(function () {
        if (status) {
          status.textContent = form.getAttribute('data-error') || 'The message could not be sent.';
          status.setAttribute('data-state', 'error');
        }
      }).finally(function () {
        submit.disabled = false;
        form.removeAttribute('aria-busy');
        if (submitLabel) submitLabel.textContent = originalLabel;
      });
    });
  }

  function writeClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    return new Promise(function (resolve, reject) {
      var input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      try {
        if (!document.execCommand('copy')) throw new Error('copy failed');
        resolve();
      } catch (error) {
        reject(error);
      }
      input.remove();
    });
  }

  function installShareControls() {
    document.querySelectorAll('[data-share-url]').forEach(function (button) {
      button.addEventListener('click', function () {
        var url = button.getAttribute('data-share-url');
        var title = button.getAttribute('data-share-title') || document.title;
        var status = button.parentElement.querySelector('[data-share-status]');
        if (navigator.share) {
          navigator.share({ title: title, url: url }).catch(function () {});
          return;
        }
        writeClipboard(url).then(function () {
          if (status) status.textContent = button.getAttribute('data-share-success') || 'Link copied.';
        }).catch(function () {
          if (status) status.textContent = url;
        });
      });
    });
  }

  function installMediaArrival() {
    document.querySelectorAll('img[data-lazy-media]').forEach(function (image) {
      function ready() { image.classList.add('is-loaded'); }
      if (image.complete) ready();
      else {
        image.addEventListener('load', ready, { once: true });
        image.addEventListener('error', ready, { once: true });
      }
    });
  }

  function installMotion() {
    var items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;
    if ((motionQuery && motionQuery.matches) || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-revealed'); });
      return;
    }

    var computed = window.getComputedStyle(root);
    var stagger = parseFloat(computed.getPropertyValue('--motion-delay-stagger')) || 120;
    var cap = parseFloat(computed.getPropertyValue('--motion-delay-stagger-cap')) || 600;
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      Array.from(group.querySelectorAll(':scope > [data-reveal]')).forEach(function (item, index) {
        var explicit = item.getAttribute('data-reveal-index');
        var groupIndex = explicit === null ? index : Number(explicit);
        item.style.setProperty('--reveal-delay', Math.min(groupIndex * stagger, cap) + 'ms');
      });
    });

    root.classList.add('motion-ready');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (item) { observer.observe(item); });
  }

  function installVideo() {
    document.querySelectorAll('[data-autoplay-video]').forEach(function (video) {
      video.muted = true;
      video.loop = true;
      video.controls = false;
      if (motionQuery && motionQuery.matches) {
        video.autoplay = false;
        video.removeAttribute('autoplay');
        video.pause();
        return;
      }

      function attachAndPlay() {
        if (!video.getAttribute('src')) {
          video.src = video.getAttribute('data-src');
          video.load();
        }
        var attempt = video.play();
        if (attempt && attempt.catch) attempt.catch(function () {});
      }

      if (!('IntersectionObserver' in window)) {
        attachAndPlay();
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) attachAndPlay();
          else video.pause();
        });
      }, { rootMargin: '240px 0px', threshold: 0.01 });
      observer.observe(video);
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

  installThemeControls();
  installMenu();
  installLocaleLinks();
  installTopicPickers();
  installContactForm();
  installShareControls();
  installMediaArrival();
  installMotion();
  installVideo();
  focusHashTarget();
  window.addEventListener('hashchange', focusHashTarget);
})();
