(function () {
  'use strict';

  var root = document.documentElement;
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  root.classList.add('js-ready');

  function pageMotionPaused() {
    return root.getAttribute('data-motion-paused') === 'true';
  }

  function pageMotionCanRun() {
    return !pageMotionPaused() && !document.hidden;
  }

  function installMotionControls() {
    var controls = Array.prototype.slice.call(document.querySelectorAll('[data-motion-toggle]'));
    var isThai = (root.lang || '').toLowerCase().indexOf('th') === 0;
    var userPaused = false;

    function systemReduced() {
      return Boolean(motionQuery && motionQuery.matches);
    }

    function copyFor(paused) {
      if (systemReduced()) {
        return isThai
          ? { label: 'ระบบตั้งค่าให้ลดภาพเคลื่อนไหว' }
          : { label: 'Motion reduced by system' };
      }

      if (isThai) {
        return paused
          ? { label: 'เล่นภาพเคลื่อนไหว' }
          : { label: 'หยุดภาพเคลื่อนไหว' };
      }

      return paused
        ? { label: 'Play motion' }
        : { label: 'Pause motion' };
    }

    function render(paused) {
      var copy = copyFor(paused);

      controls.forEach(function (control) {
        var label = control.querySelector('[data-motion-toggle-label]');

        control.setAttribute('aria-pressed', paused ? 'true' : 'false');
        control.setAttribute('aria-disabled', systemReduced() ? 'true' : 'false');
        control.setAttribute('aria-label', copy.label);
        control.setAttribute('title', copy.label);
        if (label) label.textContent = copy.label;
      });
    }

    function setPaused(paused) {
      var nextPaused = Boolean(paused);
      root.setAttribute('data-motion-paused', nextPaused ? 'true' : 'false');
      render(nextPaused);
      document.dispatchEvent(new CustomEvent('landometer:motionchange', {
        detail: { paused: nextPaused }
      }));
    }

    controls.forEach(function (control) {
      control.addEventListener('click', function () {
        if (systemReduced()) return;
        userPaused = !pageMotionPaused();
        setPaused(userPaused);
      });
    });

    if (motionQuery) {
      var syncPreference = function (event) {
        setPaused(event.matches ? true : userPaused);
      };

      if (motionQuery.addEventListener) motionQuery.addEventListener('change', syncPreference);
      else if (motionQuery.addListener) motionQuery.addListener(syncPreference);
    }

    setPaused(systemReduced());
  }

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
    var mode = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = mode === 'dark' ? 'light' : 'dark';
    var icons = { light: 'light_mode', dark: 'dark_mode' };
    document.querySelectorAll('[data-theme-cycle]').forEach(function (button) {
      var label = button.querySelector('[data-theme-cycle-label]');
      var icon = button.querySelector('[data-theme-cycle-icon]');
      var accessibleLabel = root.lang === 'th'
        ? (next === 'dark' ? 'สลับเป็นธีมมืด' : 'สลับเป็นธีมสว่าง')
        : (next === 'dark' ? 'Switch to dark theme' : 'Switch to light theme');
      if (label) label.textContent = accessibleLabel;
      if (icon) icon.textContent = icons[next];
      button.setAttribute('data-theme-current', mode);
      button.setAttribute('aria-label', accessibleLabel);
      button.setAttribute('title', accessibleLabel);
    });
  }

  function installThemeControls() {
    document.querySelectorAll('[data-theme-cycle]').forEach(function (button) {
      button.addEventListener('click', function () {
        setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    });
    updateThemeControls();
  }

  function installCalmHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var wakeZone = header.querySelector('[data-calm-wake]');
    var scrollingElement = document.scrollingElement || document.documentElement;
    var lastY = new WeakMap();
    var pointerInside = false;
    var focusInside = false;
    var menuOpen = false;
    var wakeTimer = 0;

    function reducedMotion() {
      return pageMotionPaused() || Boolean(motionQuery && motionQuery.matches);
    }

    function setCalm(isCalm) {
      header.classList.toggle('is-calm', Boolean(isCalm) && !reducedMotion() && !pointerInside && !focusInside && !menuOpen);
    }

    function syncFromPagePosition() {
      setCalm(scrollingElement.scrollTop >= 24);
    }

    function scrollTarget(event) {
      var target = event.target;
      if (target === document || target === document.documentElement || target === document.body) return scrollingElement;
      return target;
    }

    header.addEventListener('pointerenter', function () {
      if (header.classList.contains('is-calm')) {
        header.classList.add('is-waking');
        window.clearTimeout(wakeTimer);
        wakeTimer = window.setTimeout(function () {
          header.classList.remove('is-waking');
        }, 600);
      }
      pointerInside = true;
      setCalm(false);
    });

    header.addEventListener('pointerleave', function () {
      pointerInside = false;
      if (!focusInside && !menuOpen) syncFromPagePosition();
    });

    header.addEventListener('focusin', function () {
      focusInside = true;
      setCalm(false);
    });

    header.addEventListener('focusout', function () {
      window.setTimeout(function () {
        focusInside = header.contains(document.activeElement);
        if (!focusInside && !pointerInside && !menuOpen) syncFromPagePosition();
      }, 0);
    });

    document.addEventListener('landometer-menu-state', function (event) {
      menuOpen = Boolean(event.detail && event.detail.open);
      if (menuOpen) setCalm(false);
      else if (!pointerInside && !focusInside) syncFromPagePosition();
    });

    document.addEventListener('landometer:motionchange', function (event) {
      if (event.detail && event.detail.paused) setCalm(false);
      else if (!pointerInside && !focusInside && !menuOpen) syncFromPagePosition();
    });

    if (wakeZone) {
      wakeZone.addEventListener('pointerdown', function (event) {
        var forwardedTarget = null;
        var closestDistance = Infinity;

        header.querySelectorAll('.site-header__row a[href], .site-header__row button:not([disabled])').forEach(function (control) {
          var bounds = control.getBoundingClientRect();
          var centerX = bounds.left + (bounds.width / 2);
          var centerY = bounds.top + (bounds.height / 2);
          var deltaX = Math.abs(event.clientX - centerX);
          var deltaY = Math.abs(event.clientY - centerY);
          var distance = (deltaX * deltaX) + (deltaY * deltaY);

          if (deltaX <= 22 && deltaY <= 22 && distance < closestDistance) {
            forwardedTarget = control;
            closestDistance = distance;
          }
        });

        event.preventDefault();
        setCalm(false);

        if (forwardedTarget) {
          window.setTimeout(function () {
            if (forwardedTarget.isConnected) forwardedTarget.click();
          }, 0);
        }
      });
    }

    document.addEventListener('scroll', function (event) {
      var target = scrollTarget(event);
      if (!target || typeof target.scrollTop !== 'number') return;
      var y = target.scrollTop;
      var previousY = lastY.has(target) ? lastY.get(target) : 0;
      var delta = y - previousY;
      lastY.set(target, y);
      if (reducedMotion() || pointerInside || focusInside || menuOpen) {
        setCalm(false);
        return;
      }
      if (y < 24) {
        setCalm(false);
        return;
      }
      if (delta > 4) setCalm(true);
      else if (delta < -4) setCalm(false);
    }, true);

    if (motionQuery) {
      var onMotionPreference = function (event) {
        if (event.matches) setCalm(false);
        else syncFromPagePosition();
      };
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionPreference);
      else if (motionQuery.addListener) motionQuery.addListener(onMotionPreference);
    }

    lastY.set(scrollingElement, scrollingElement.scrollTop);
    syncFromPagePosition();
  }

  function installMenu() {
    var shell = document.querySelector('[data-menu-shell]');
    var openButton = document.querySelector('[data-menu-open]');
    if (!shell || !openButton) return;
    var panel = shell.querySelector('[role="dialog"]');
    var previousFocus = null;

    function setButtonState(isOpen) {
      openButton.setAttribute('aria-expanded', String(isOpen));
      var icon = openButton.querySelector('[data-menu-icon]');
      var label = root.lang === 'th'
        ? (isOpen ? 'ปิดเมนู' : 'เปิดเมนู')
        : (isOpen ? 'Close menu' : 'Open menu');
      if (icon) icon.textContent = isOpen ? 'close' : 'menu';
      openButton.setAttribute('aria-label', label);
      openButton.setAttribute('title', label);
    }

    function closeMenu(restoreFocus) {
      if (shell.hidden) return;
      shell.hidden = true;
      document.body.classList.remove('menu-open');
      setButtonState(false);
      document.dispatchEvent(new CustomEvent('landometer-menu-state', { detail: { open: false } }));
      if (restoreFocus !== false && previousFocus && previousFocus.focus) previousFocus.focus();
    }

    function openMenu() {
      previousFocus = document.activeElement;
      shell.hidden = false;
      document.body.classList.add('menu-open');
      setButtonState(true);
      document.dispatchEvent(new CustomEvent('landometer-menu-state', { detail: { open: true } }));
      if (panel) {
        try { panel.focus({ preventScroll: true }); } catch (error) { panel.focus(); }
      }
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
    });
  }

  function installScrollSpy() {
    var links = Array.from(document.querySelectorAll('[data-scrollspy-link]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var sections = links.map(function (link) {
      return document.getElementById(link.getAttribute('data-scrollspy-link'));
    }).filter(Boolean);
    var visible = {};

    function setActive(id) {
      links.forEach(function (link) {
        if (link.getAttribute('data-scrollspy-link') === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible[entry.target.id] = entry.intersectionRect.height;
        else delete visible[entry.target.id];
      });
      var active = Object.keys(visible).sort(function (a, b) { return visible[b] - visible[a]; })[0];
      setActive(active || '');
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5] });

    sections.forEach(function (section) { observer.observe(section); });
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

  function installLandometerMotifs() {
    var motifs = Array.from(document.querySelectorAll('lm-motif'));
    if (!motifs.length) return;
    var observer = null;

    function meetsVisibilityThreshold(element, threshold) {
      var bounds = element.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return false;
      var visibleWidth = Math.max(0, Math.min(window.innerWidth, bounds.right) - Math.max(0, bounds.left));
      var visibleHeight = Math.max(0, Math.min(window.innerHeight, bounds.bottom) - Math.max(0, bounds.top));
      return (visibleWidth * visibleHeight) / (bounds.width * bounds.height) >= threshold;
    }

    function clearLoop(motif) {
      if (!motif._loop) return;
      window.clearTimeout(motif._loop);
      motif._loop = null;
    }

    var states = motifs.map(function (motif) {
      motif.removeAttribute('loop');
      return {
        element: motif,
        nativePlay: typeof motif.play === 'function' ? motif.play : null,
        pausedAnimations: [],
        pending: false,
        inView: false,
        started: false,
        complete: false
      };
    });

    function completeState(state) {
      if (state.complete) return;
      state.complete = true;
      state.pending = false;
      state.pausedAnimations = [];
      if (observer) observer.unobserve(state.element);
    }

    function watchForCompletion(state) {
      if (typeof state.element.getAnimations !== 'function') {
        completeState(state);
        return;
      }
      var animations = state.element.getAnimations({ subtree: true });
      if (!animations.length) {
        completeState(state);
        return;
      }
      Promise.all(animations.map(function (animation) {
        return animation.finished.catch(function () {});
      })).then(function () {
        completeState(state);
      });
    }

    function startState(state) {
      if (state.started || state.complete || !state.inView) return;
      if (!pageMotionCanRun()) {
        state.pending = true;
        return;
      }
      if (!state.nativePlay) {
        completeState(state);
        return;
      }

      state.pending = false;
      state.started = true;
      state.nativePlay.call(state.element);
      window.requestAnimationFrame(function () {
        watchForCompletion(state);
      });
    }

    function pauseState(state) {
      if (state.complete) return;
      clearLoop(state.element);
      if (typeof state.element.getAnimations !== 'function') return;
      state.element.getAnimations({ subtree: true }).forEach(function (animation) {
        if (animation.playState !== 'running') return;
        animation.pause();
        if (state.pausedAnimations.indexOf(animation) === -1) state.pausedAnimations.push(animation);
      });
    }

    function resumeState(state) {
      if (state.complete || !state.inView || !pageMotionCanRun()) return;

      state.pausedAnimations.forEach(function (animation) {
        if (animation.playState === 'paused') animation.play();
      });
      state.pausedAnimations = [];

      if (!state.started && (state.pending || meetsVisibilityThreshold(state.element, 0.14))) startState(state);
    }

    function finishState(state) {
      if (state.complete) return;
      clearLoop(state.element);
      state.pausedAnimations = [];
      state.pending = false;
      state.element.removeAttribute('data-play');
      completeState(state);
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var state = states.find(function (candidate) { return candidate.element === entry.target; });
          if (!state || state.complete) return;
          state.inView = entry.isIntersecting;
          if (!entry.isIntersecting) {
            if (state.started) finishState(state);
            return;
          }
          if (entry.intersectionRatio >= 0.14) startState(state);
        });
      }, { threshold: [0, 0.14], rootMargin: '0px 0px -12% 0px' });
      states.forEach(function (state) { observer.observe(state.element); });
    } else {
      states.forEach(function (state) {
        state.inView = true;
        startState(state);
      });
    }

    document.addEventListener('landometer:motionchange', function (event) {
      var paused = event.detail ? Boolean(event.detail.paused) : pageMotionPaused();
      if (paused && motionQuery && motionQuery.matches) {
        states.forEach(finishState);
        return;
      }
      states.forEach(paused ? pauseState : resumeState);
    });

    document.addEventListener('visibilitychange', function () {
      states.forEach(document.hidden ? finishState : resumeState);
    });

    window.addEventListener('pagehide', function () {
      states.forEach(finishState);
    });
    window.addEventListener('beforeprint', function () {
      states.forEach(finishState);
    });

    if (motionQuery && motionQuery.matches) states.forEach(finishState);
  }

  function installCityChatMotifs() {
    var hosts = Array.from(document.querySelectorAll('[data-citychat-motif]'));
    if (!hosts.length) return;
    var observer = null;
    var modulePromise = null;

    var states = hosts.map(function (host) {
      return {
        element: host,
        base: host.closest('.citychat-logo-stage') ? host.closest('.citychat-logo-stage').querySelector('.citychat-logo-stage__base') : null,
        basePromise: null,
        inView: false,
        started: false,
        complete: false
      };
    });

    function decodeBase(state) {
      if (!state.base) return Promise.resolve();
      if (state.basePromise) return state.basePromise;
      state.basePromise = new Promise(function (resolve, reject) {
        function decode() {
          if (typeof state.base.decode !== 'function') {
            resolve();
            return;
          }
          state.base.decode().then(resolve, reject);
        }
        if (state.base.complete) {
          if (state.base.naturalWidth) decode();
          else reject(new Error('CityChat logo base failed'));
          return;
        }
        state.base.addEventListener('load', decode, { once: true });
        state.base.addEventListener('error', function () { reject(new Error('CityChat logo base failed')); }, { once: true });
      });
      return state.basePromise;
    }

    function loadModule() {
      if (modulePromise) return modulePromise;
      var url = new URL('assets/motifs/citychat/citychat-motif-motion.js?v=1.0.1-approved-20260908', document.baseURI).href;
      modulePromise = import(url).then(function (citychat) {
        if (!document.querySelector('[data-citychat-motif-styles]')) {
          var style = document.createElement('style');
          style.setAttribute('data-citychat-motif-styles', '1.0.1-owner-approved-20260908');
          style.textContent = citychat.css;
          document.head.appendChild(style);
        }
        return citychat;
      });
      return modulePromise;
    }

    function completeState(state) {
      if (state.complete) return;
      state.complete = true;
      if (observer) observer.unobserve(state.element);
    }

    function finishState(state) {
      if (state.complete) return;
      if (typeof state.element.getAnimations === 'function') {
        state.element.getAnimations({ subtree: true }).forEach(function (animation) {
          try { animation.finish(); } catch (error) {}
        });
      }
      state.element.classList.add('is-finished');
      completeState(state);
    }

    function watchForCompletion(state) {
      if (typeof state.element.getAnimations !== 'function') {
        completeState(state);
        return;
      }
      var animations = state.element.getAnimations({ subtree: true });
      if (!animations.length) {
        completeState(state);
        return;
      }
      Promise.all(animations.map(function (animation) {
        return animation.finished.catch(function () {});
      })).then(function () {
        completeState(state);
      });
    }

    function startState(state) {
      if (state.started || state.complete || !state.inView || !pageMotionCanRun()) return;
      state.started = true;
      Promise.all([loadModule(), decodeBase(state)]).then(function (ready) {
        var citychat = ready[0];
        if (state.complete) return;
        if (!pageMotionCanRun()) {
          state.started = false;
          return;
        }
        var id = state.element.getAttribute('data-citychat-id') || 'a';
        var rendition = state.element.getAttribute('data-citychat-rendition') || 'light';
        var family = citychat.svg && citychat.svg[id];
        var markup = family && family[rendition];
        if (!markup) {
          state.started = false;
          return;
        }
        state.element.innerHTML = markup;
        var svg = state.element.querySelector('svg');
        if (svg) {
          svg.removeAttribute('role');
          svg.removeAttribute('aria-label');
          svg.setAttribute('aria-hidden', 'true');
          svg.setAttribute('focusable', 'false');
        }
        window.requestAnimationFrame(function () {
          watchForCompletion(state);
        });
      }).catch(function () {
        state.started = false;
      });
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var state = states.find(function (candidate) { return candidate.element === entry.target; });
          if (!state || state.complete) return;
          state.inView = entry.isIntersecting;
          if (!entry.isIntersecting) {
            if (state.started) finishState(state);
            return;
          }
          if (entry.intersectionRatio >= 0.14) startState(state);
        });
      }, { threshold: [0, 0.14], rootMargin: '0px 0px -12% 0px' });
      states.forEach(function (state) { observer.observe(state.element); });
    } else {
      states.forEach(function (state) {
        state.inView = true;
        startState(state);
      });
    }

    document.addEventListener('landometer:motionchange', function (event) {
      var paused = event.detail ? Boolean(event.detail.paused) : pageMotionPaused();
      if (!paused) states.forEach(startState);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) states.forEach(finishState);
    });

    if (motionQuery) {
      var finishForReducedMotion = function (event) {
        if (event.matches) states.forEach(finishState);
      };
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', finishForReducedMotion);
      else if (motionQuery.addListener) motionQuery.addListener(finishForReducedMotion);
    }

    window.addEventListener('pagehide', function () {
      states.forEach(finishState);
    });
    window.addEventListener('beforeprint', function () {
      states.forEach(finishState);
    });

    if (motionQuery && motionQuery.matches) states.forEach(finishState);
  }

  function installIjjiLogoStings() {
    var hosts = Array.from(document.querySelectorAll('[data-ijji-logo-sting]'));
    if (!hosts.length) return;

    var layerFiles = [
      'i-1.png',
      'i-2.png',
      'jj.png',
      'tag-1-1.png',
      'tag-1-2.png',
      'tag-1-3.png',
      'tag-2-1.png',
      'tag-2-2.png',
      'tag-2-3.png'
    ];
    var observer = null;
    var states = hosts.map(function (host) {
      return {
        element: host,
        component: null,
        preloadPromise: null,
        inView: false,
        ready: false,
        started: false,
        complete: false,
        pausedByUser: false,
        pausedByVisibility: false
      };
    });

    function preloadImage(url) {
      return new Promise(function (resolve, reject) {
        var image = new Image();
        image.decoding = 'async';
        image.onload = function () {
          var decode = typeof image.decode === 'function' ? image.decode() : Promise.resolve();
          decode.then(resolve, function () {
            reject(new Error('ijji layer decode failed: ' + url));
          });
        };
        image.onerror = function () { reject(new Error('ijji layer failed: ' + url)); };
        image.src = url;
      });
    }

    function completeState(state) {
      state.complete = true;
      state.pausedByUser = false;
      state.pausedByVisibility = false;
      if (observer) observer.unobserve(state.element);
    }

    function preserveFallback(state) {
      state.element.classList.add('is-fallback-only');
      completeState(state);
      return null;
    }

    function prepareState(state) {
      if (state.ready) return Promise.resolve(state.component);
      if (state.preloadPromise) return state.preloadPromise;
      if (!window.customElements || !window.customElements.get('ijji-logo-sting')) {
        return Promise.resolve(preserveFallback(state));
      }

      var base = new URL(state.element.getAttribute('data-ijji-assets') || 'assets/motifs/ijji/logo-sting/layers/', document.baseURI);
      state.preloadPromise = Promise.all(layerFiles.map(function (file) {
        return preloadImage(new URL(file, base).href);
      })).then(function () {
        if (state.complete || !state.element.isConnected) return null;

        var logo = document.createElement('ijji-logo-sting');
        logo.setAttribute('manual', '');
        logo.setAttribute('notagline', '');
        logo.setAttribute('bounce', 'extra');
        logo.setAttribute('assets', base.href);
        logo.setAttribute('aria-hidden', 'true');
        logo.addEventListener('ijji-sting-end', function () {
          completeState(state);
        });
        state.component = logo;
        state.element.appendChild(logo);

        return new Promise(function (resolve) {
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              if (state.complete || !state.element.isConnected) {
                resolve(null);
                return;
              }
              state.ready = true;
              state.element.classList.add('is-runtime-ready');
              resolve(logo);
            });
          });
        });
      }).catch(function () {
        return preserveFallback(state);
      });

      return state.preloadPromise;
    }

    function finishState(state) {
      if (state.complete) return;
      if (state.component && typeof state.component.finish === 'function') {
        state.component.finish();
      } else {
        completeState(state);
      }
    }

    function startState(state) {
      if (state.started || state.complete || !state.inView || !pageMotionCanRun()) return;
      prepareState(state).then(function (component) {
        if (!component || state.started || state.complete || !state.inView || !pageMotionCanRun()) return;
        state.started = true;
        if (typeof component.play === 'function') component.play();
        else preserveFallback(state);
      });
    }

    function resumeState(state) {
      if (state.complete || !state.inView || !pageMotionCanRun()) return;
      if (!state.started) {
        startState(state);
        return;
      }
      state.pausedByUser = false;
      state.pausedByVisibility = false;
      if (state.component && typeof state.component.play === 'function') state.component.play();
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var state = states.find(function (candidate) {
            return candidate.element === entry.target;
          });
          if (!state || state.complete) return;

          state.inView = entry.isIntersecting;
          if (!entry.isIntersecting) {
            if (state.started) finishState(state);
            return;
          }

          if (!state.started && entry.intersectionRatio >= 0.14) startState(state);
          else if (state.pausedByVisibility && !pageMotionPaused()) resumeState(state);
        });
      }, { threshold: [0, 0.14] });
      states.forEach(function (state) { observer.observe(state.element); });
    } else {
      states.forEach(function (state) {
        state.inView = true;
        startState(state);
      });
    }

    document.addEventListener('landometer:motionchange', function (event) {
      var paused = event.detail ? Boolean(event.detail.paused) : pageMotionPaused();
      states.forEach(function (state) {
        if (state.complete) return;
        if (paused) {
          if (state.started && state.component) {
            state.pausedByUser = true;
            state.component.pause();
          }
          return;
        }
        if (!state.started || state.pausedByUser) resumeState(state);
      });
    });

    document.addEventListener('visibilitychange', function () {
      states.forEach(function (state) {
        if (state.complete) return;
        if (document.hidden) {
          finishState(state);
          return;
        }
        if (!state.started || state.pausedByVisibility) resumeState(state);
      });
    });

    if (motionQuery) {
      var finishForReducedMotion = function (event) {
        if (event.matches) states.forEach(finishState);
      };
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', finishForReducedMotion);
      else if (motionQuery.addListener) motionQuery.addListener(finishForReducedMotion);
    }

    window.addEventListener('pagehide', function () {
      states.forEach(finishState);
    });
    window.addEventListener('beforeprint', function () {
      states.forEach(finishState);
    });

    if (motionQuery && motionQuery.matches) states.forEach(finishState);
  }

  function installMotion() {
    document.querySelectorAll('.pillar, .feature-grid').forEach(function (pair) {
      var pairItems = Array.from(pair.children).filter(function (item) {
        return item.hasAttribute('data-reveal');
      });
      if (pairItems[0]) pairItems[0].setAttribute('data-reveal-from', 'left');
      if (pairItems[1]) pairItems[1].setAttribute('data-reveal-from', 'right');
    });

    var items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;
    if ((motionQuery && motionQuery.matches) || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-revealed'); });
      return;
    }

    var stagger = 150;
    var cap = 450;
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
        var loopItem = entry.target.getAttribute('data-loop-item');
        var loopRail = entry.target.closest('[data-loop-rail]');
        var revealSet = loopItem !== null && loopRail
          ? Array.from(loopRail.querySelectorAll('[data-loop-item]')).filter(function (item) {
              return item.getAttribute('data-loop-item') === loopItem;
            })
          : [entry.target];
        revealSet.forEach(function (item) {
          item.classList.add('is-revealed');
          observer.unobserve(item);
        });
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -12% 0px' });
    items.forEach(function (item) { observer.observe(item); });
  }

  function installLoopingRails() {
    document.querySelectorAll('[data-loop-rail]').forEach(function (rail) {
      var originals = Array.from(rail.children).filter(function (item) {
        return !item.hasAttribute('data-loop-clone');
      });
      if (originals.length < 2) return;
      originals.forEach(function (item, index) {
        item.setAttribute('data-loop-item', String(index));
      });

      var cycleStart = 0;
      var cycleEnd = 0;
      var cycleWidth = 0;
      var cardStep = 0;
      var pointerActive = false;
      var resetting = false;
      var resetFrame = 0;
      var scrollTimer = 0;
      var resizeFrame = 0;
      var lastClientWidth = rail.clientWidth;
      var supportsScrollEnd = 'onscrollend' in rail;

      function paddingStart() {
        var style = window.getComputedStyle(rail);
        return parseFloat(style.paddingInlineStart || style.paddingLeft) || 0;
      }

      function itemPosition(item) {
        var railBounds = rail.getBoundingClientRect();
        var itemBounds = item.getBoundingClientRect();
        return itemBounds.left - railBounds.left + rail.scrollLeft - paddingStart();
      }

      function sanitizeClone(clone) {
        clone.setAttribute('data-loop-clone', '');
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('inert', '');
        clone.setAttribute('tabindex', '-1');
        clone.classList.remove('static-parallax', 'is-parallax-active');
        clone.style.removeProperty('--static-parallax-y');

        [clone].concat(Array.from(clone.querySelectorAll('*'))).forEach(function (item) {
          item.removeAttribute('id');
          item.removeAttribute('aria-labelledby');
          item.removeAttribute('aria-describedby');
          item.removeAttribute('aria-controls');
          item.removeAttribute('aria-owns');
          item.removeAttribute('for');
          item.removeAttribute('headers');
          if (item !== clone) {
            item.removeAttribute('data-reveal');
            item.removeAttribute('data-reveal-group');
            item.removeAttribute('data-reveal-index');
            item.removeAttribute('data-reveal-from');
            item.style.removeProperty('--reveal-delay');
          }
          item.classList.remove('static-parallax__layer');

          if (item.matches('a, button, input, select, textarea, summary, [tabindex]')) {
            item.setAttribute('tabindex', '-1');
          }
          if (item.tagName === 'IMG') {
            item.setAttribute('alt', '');
            item.removeAttribute('data-lazy-media');
            item.classList.add('is-loaded');
          }
        });

        return clone;
      }

      function removeClones() {
        Array.from(rail.children).forEach(function (item) {
          if (item.hasAttribute('data-loop-clone')) item.remove();
        });
      }

      function measureCycle() {
        var tailFirst = Array.from(rail.children).find(function (item) {
          return item.getAttribute('data-loop-clone') === 'tail';
        });
        cycleStart = itemPosition(originals[0]);
        cycleEnd = tailFirst ? itemPosition(tailFirst) : cycleStart;
        cycleWidth = cycleEnd - cycleStart;
        cardStep = cycleWidth / originals.length;
      }

      function releaseReset() {
        window.cancelAnimationFrame(resetFrame);
        resetFrame = window.requestAnimationFrame(function () {
          rail.classList.remove('is-loop-resetting');
          resetting = false;
        });
      }

      function setPosition(left) {
        resetting = true;
        rail.classList.add('is-loop-resetting');
        rail.scrollLeft = left;
        releaseReset();
      }

      function logicalIndex() {
        var items = Array.from(rail.children);
        if (!items.length) return 0;
        return nearestItemIndex(items) % originals.length;
      }

      function buildClones(index) {
        var head = document.createDocumentFragment();
        var tail = document.createDocumentFragment();
        removeClones();

        originals.forEach(function (item) {
          var headClone = sanitizeClone(item.cloneNode(true));
          var tailClone = sanitizeClone(item.cloneNode(true));
          headClone.setAttribute('data-loop-clone', 'head');
          tailClone.setAttribute('data-loop-clone', 'tail');
          head.appendChild(headClone);
          tail.appendChild(tailClone);
        });

        rail.insertBefore(head, originals[0]);
        rail.appendChild(tail);
        measureCycle();
        setPosition(itemPosition(originals[index] || originals[0]));
        rail.setAttribute('data-loop-ready', '');
      }

      function normalizePosition() {
        if (resetting || pointerActive || !cycleWidth || !cardStep) return;
        var left = rail.scrollLeft;
        var target = left;
        var lowerBoundary = cycleStart - (cardStep / 2);
        var upperBoundary = cycleEnd - (cardStep / 2);

        while (target < lowerBoundary) target += cycleWidth;
        while (target >= upperBoundary) target -= cycleWidth;
        if (Math.abs(target - left) > 1) setPosition(target);
      }

      function nearestItemIndex(items) {
        var left = rail.scrollLeft;
        var nearest = 0;
        var distance = Infinity;
        items.forEach(function (item, index) {
          var candidate = Math.abs(itemPosition(item) - left);
          if (candidate < distance) {
            distance = candidate;
            nearest = index;
          }
        });
        return nearest;
      }

      function scrollToItem(item) {
        var behavior = pageMotionPaused() || (motionQuery && motionQuery.matches) ? 'auto' : 'smooth';
        rail.scrollTo({ left: itemPosition(item), behavior: behavior });
        if (behavior === 'auto') window.requestAnimationFrame(normalizePosition);
      }

      rail.addEventListener('keydown', function (event) {
        if (event.target !== rail || event.altKey || event.ctrlKey || event.metaKey) return;
        var items = Array.from(rail.children);
        var current = nearestItemIndex(items);
        var target = null;

        if (event.key === 'ArrowLeft') target = items[Math.max(0, current - 1)];
        else if (event.key === 'ArrowRight') target = items[Math.min(items.length - 1, current + 1)];
        else if (event.key === 'Home') target = originals[0];
        else if (event.key === 'End') target = originals[originals.length - 1];
        else return;

        event.preventDefault();
        scrollToItem(target);
      });

      function scheduleNormalize() {
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(normalizePosition, 180);
      }

      if (supportsScrollEnd) rail.addEventListener('scrollend', normalizePosition);
      else rail.addEventListener('scroll', scheduleNormalize, { passive: true });

      function beginPointer() { pointerActive = true; }
      function endPointer() {
        if (!pointerActive) return;
        pointerActive = false;
        scheduleNormalize();
      }

      rail.addEventListener('pointerdown', beginPointer, { passive: true });
      window.addEventListener('pointerup', endPointer, { passive: true });
      window.addEventListener('pointercancel', endPointer, { passive: true });

      if ('ResizeObserver' in window) {
        var resizeObserver = new ResizeObserver(function () {
          if (Math.abs(rail.clientWidth - lastClientWidth) < 1) return;
          var index = logicalIndex();
          lastClientWidth = rail.clientWidth;
          window.cancelAnimationFrame(resizeFrame);
          resizeFrame = window.requestAnimationFrame(function () {
            measureCycle();
            setPosition(itemPosition(originals[index] || originals[0]));
          });
        });
        resizeObserver.observe(rail);
      }

      buildClones(0);
    });
  }

  function installSocialEmbeds() {
    var frames = Array.from(document.querySelectorAll('[data-social-embed]'));
    var tiktokEmbeds = Array.from(document.querySelectorAll('[data-tiktok-embed]'));
    if (!frames.length && !tiktokEmbeds.length) return;

    function sizeInstagramFrame(frame) {
      var container = frame.closest('.social-embed--instagram');
      if (!container) return;
      var width = Math.max(280, container.getBoundingClientRect().width);
      var height = width <= 500
        ? Math.ceil((width * .82) + 148)
        : Math.ceil((width * (2 / 3)) + 223);
      frame.style.height = height + 'px';
    }

    frames.forEach(function (frame) {
      if (!frame.closest('.social-embed--instagram')) return;
      sizeInstagramFrame(frame);
      frame.addEventListener('load', function () { sizeInstagramFrame(frame); });
      var container = frame.closest('.social-embed--instagram');
      if ('ResizeObserver' in window && container) {
        var resizeObserver = new ResizeObserver(function () { sizeInstagramFrame(frame); });
        resizeObserver.observe(container);
      } else {
        window.addEventListener('resize', function () { sizeInstagramFrame(frame); });
      }
    });

    function loadFrame(frame) {
      if (frame.hasAttribute('src') || !frame.getAttribute('data-src')) return;
      var source = frame.getAttribute('data-src');
      if (source.indexOf('https://www.facebook.com/plugins/page.php') === 0) {
        var container = frame.closest('.social-embed');
        var width = container ? Math.floor(container.getBoundingClientRect().width) : 500;
        var facebookUrl = new URL(source);
        facebookUrl.searchParams.set('width', String(Math.max(180, Math.min(500, width))));
        source = facebookUrl.toString();
      }
      frame.addEventListener('load', function () {
        frame.closest('.social-embed').classList.add('is-loaded');
      }, { once: true });
      frame.src = source;
    }

    function loadTikTok(container) {
      if (container.getAttribute('data-embed-loaded') === 'true') return;
      container.setAttribute('data-embed-loaded', 'true');
      if (document.getElementById('tiktok-embed-script')) return;
      var script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    function loadTarget(target) {
      if (target.matches('[data-social-embed]')) loadFrame(target);
      else loadTikTok(target);
    }

    var targets = frames.concat(tiktokEmbeds);
    if (!('IntersectionObserver' in window)) {
      targets.forEach(loadTarget);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadTarget(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '480px 0px', threshold: 0.01 });
    targets.forEach(function (target) { observer.observe(target); });
  }

  function installStaticImageParallax() {
    var selectors = [
      '.media-figure',
      '.location-question__media',
      '.solution-card__media',
      '.service-route__media',
      '.showcase-hero',
      '.showcase-tile'
    ];
    var items = Array.from(document.querySelectorAll(selectors.join(','))).map(function (container) {
      var layer = container.querySelector(':scope > picture') || container.querySelector(':scope > img');
      if (!layer) return null;
      container.classList.add('static-parallax');
      layer.classList.add('static-parallax__layer');
      return { container: container, layer: layer, visible: false };
    }).filter(Boolean);
    if (!items.length) return;

    var ticking = false;
    var paused = pageMotionPaused() || document.hidden;

    function update() {
      ticking = false;
      items.forEach(function (item) {
        if (paused) {
          item.container.style.setProperty('--static-parallax-y', '0px');
          return;
        }
        if (!item.visible) return;
        var rect = item.container.getBoundingClientRect();
        var travel = window.innerHeight + rect.height;
        var viewportCenter = window.innerHeight / 2;
        var mediaCenter = rect.top + (rect.height / 2);
        var progress = travel > 0 ? (viewportCenter - mediaCenter) / travel : 0;
        var limit = Math.max(10, Math.min(22, rect.height * .045));
        var offset = Math.max(-limit, Math.min(limit, progress * limit * 2));
        item.container.style.setProperty('--static-parallax-y', offset.toFixed(2) + 'px');
      });
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var item = items.find(function (candidate) { return candidate.container === entry.target; });
          if (!item) return;
          item.visible = entry.isIntersecting;
          item.container.classList.toggle('is-parallax-active', entry.isIntersecting && !paused);
        });
        requestUpdate();
      }, { rootMargin: '20% 0px', threshold: 0 });
      items.forEach(function (item) { observer.observe(item.container); });
    } else {
      items.forEach(function (item) {
        item.visible = true;
        item.container.classList.toggle('is-parallax-active', !paused);
      });
    }

    function syncMotionState() {
      paused = pageMotionPaused() || document.hidden;
      items.forEach(function (item) {
        item.container.classList.toggle('is-parallax-active', item.visible && !paused);
      });
      requestUpdate();
    }

    function settleForPrint() {
      paused = true;
      items.forEach(function (item) {
        item.container.classList.remove('is-parallax-active');
        item.container.style.setProperty('--static-parallax-y', '0px');
      });
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    document.addEventListener('landometer:motionchange', syncMotionState);
    document.addEventListener('visibilitychange', syncMotionState);
    window.addEventListener('beforeprint', settleForPrint);
    window.addEventListener('afterprint', syncMotionState);
    requestUpdate();
  }

  function installVideo() {
    document.querySelectorAll('[data-autoplay-video]').forEach(function (video) {
      video.muted = true;
      video.loop = true;
      video.controls = false;
      var isNearViewport = !('IntersectionObserver' in window);

      function playbackBlocked() {
        return pageMotionPaused() || document.hidden;
      }

      function restorePoster() {
        video.pause();
        if (video.getAttribute('src')) {
          video.removeAttribute('src');
          video.load();
        }
      }

      function attachAndPlay() {
        if (playbackBlocked() || !isNearViewport) return;
        if (!video.getAttribute('src')) {
          var source = video.getAttribute('data-src');
          if (!source) return;
          video.src = source;
          video.load();
        }
        var attempt = video.play();
        if (attempt && attempt.catch) attempt.catch(function () {});
      }

      function syncPlayback() {
        if (playbackBlocked()) {
          video.autoplay = false;
          video.removeAttribute('autoplay');
          video.pause();
          if (motionQuery && motionQuery.matches) restorePoster();
          return;
        }
        video.autoplay = true;
        video.setAttribute('autoplay', '');
        if (isNearViewport) attachAndPlay();
      }

      document.addEventListener('landometer:motionchange', syncPlayback);
      document.addEventListener('visibilitychange', syncPlayback);
      window.addEventListener('beforeprint', function () { video.pause(); });
      window.addEventListener('afterprint', syncPlayback);
      window.addEventListener('pagehide', function () { video.pause(); });

      if (!('IntersectionObserver' in window)) {
        syncPlayback();
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isNearViewport = entry.isIntersecting;
          if (entry.isIntersecting) syncPlayback();
          else video.pause();
        });
      }, { rootMargin: '240px 0px', threshold: 0.01 });
      observer.observe(video);
      syncPlayback();
    });
  }

  var hashFocusRun = 0;
  var clearHashAlignment = null;

  function focusHashTarget() {
    if (clearHashAlignment) clearHashAlignment();
    if (!window.location.hash) {
      root.classList.remove('hash-navigation-active');
      return;
    }
    var id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (error) { return; }
    var target = document.getElementById(id);
    if (!target) return;
    root.classList.add('hash-navigation-active');
    if (target.hasAttribute('tabindex')) {
      try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); }
    }

    var run = ++hashFocusRun;
    var expectedHash = window.location.hash;
    var delays = [0, 100, 300, 700, 1500, 3000, 5000, 7500];
    var headerOffset = parseFloat(window.getComputedStyle(root).getPropertyValue('--site-header-height')) || 0;
    var desiredTop = headerOffset + 12;
    var settleTimer = null;
    var stopTimer = null;
    var resizeObserver = null;
    var stopped = false;
    var controlEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

    function stopAlignment() {
      if (stopped) return;
      stopped = true;
      if (settleTimer) window.clearTimeout(settleTimer);
      if (stopTimer) window.clearTimeout(stopTimer);
      if (resizeObserver) resizeObserver.disconnect();
      controlEvents.forEach(function (name) {
        window.removeEventListener(name, stopAlignment, true);
      });
      if (clearHashAlignment === stopAlignment) clearHashAlignment = null;
    }

    clearHashAlignment = stopAlignment;
    controlEvents.forEach(function (name) {
      window.addEventListener(name, stopAlignment, true);
    });

    function alignTarget() {
      if (stopped || run !== hashFocusRun || window.location.hash !== expectedHash) {
        stopAlignment();
        return false;
      }
      var delta = target.getBoundingClientRect().top - desiredTop;
      if (Math.abs(delta) > 2) window.scrollBy(0, delta);
      return true;
    }

    function settle(index) {
      if (!alignTarget()) return;
      if (index + 1 < delays.length) {
        settleTimer = window.setTimeout(function () { settle(index + 1); }, delays[index + 1] - delays[index]);
      }
    }

    if ('ResizeObserver' in window && document.body) {
      resizeObserver = new ResizeObserver(function () {
        window.requestAnimationFrame(alignTarget);
      });
      resizeObserver.observe(document.body);
    }
    stopTimer = window.setTimeout(stopAlignment, 8000);

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () { settle(0); });
    });
  }

  installMotionControls();
  installThemeControls();
  installCalmHeader();
  installMenu();
  installScrollSpy();
  installLocaleLinks();
  installTopicPickers();
  installContactForm();
  installShareControls();
  installMediaArrival();
  installLandometerMotifs();
  installCityChatMotifs();
  installIjjiLogoStings();
  installLoopingRails();
  installMotion();
  installSocialEmbeds();
  installStaticImageParallax();
  installVideo();
  focusHashTarget();
  window.addEventListener('hashchange', focusHashTarget);
})();
