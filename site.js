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
      return Boolean(motionQuery && motionQuery.matches);
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
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
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
          item.removeAttribute('data-reveal');
          item.removeAttribute('data-reveal-group');
          item.removeAttribute('data-reveal-index');
          item.removeAttribute('data-reveal-from');
          item.style.removeProperty('--reveal-delay');
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

        clone.classList.add('is-revealed');
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
        var behavior = motionQuery && motionQuery.matches ? 'auto' : 'smooth';
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

    function providerSurfacesEnabled() {
      return root.getAttribute('data-theme') !== 'dark';
    }

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
      if (!providerSurfacesEnabled()) return false;
      if (target.matches('[data-social-embed]')) loadFrame(target);
      else loadTikTok(target);
      return true;
    }

    var targets = frames.concat(tiktokEmbeds);
    if (!('IntersectionObserver' in window)) {
      if (providerSurfacesEnabled()) targets.forEach(loadTarget);
      var fallbackThemeObserver = new MutationObserver(function () {
        if (providerSurfacesEnabled()) targets.forEach(loadTarget);
      });
      fallbackThemeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
      return;
    }

    var nearTargets = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          nearTargets.delete(entry.target);
          return;
        }
        nearTargets.add(entry.target);
        if (!loadTarget(entry.target)) return;
        nearTargets.delete(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '480px 0px', threshold: 0.01 });
    targets.forEach(function (target) { observer.observe(target); });

    var themeObserver = new MutationObserver(function () {
      if (!providerSurfacesEnabled()) return;
      nearTargets.forEach(function (target) {
        loadTarget(target);
        observer.unobserve(target);
      });
      nearTargets.clear();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  }

  function installHeroParallax() {
    var media = document.querySelector('[data-hero-parallax]');
    if (!media) return;
    var ticking = false;

    function update() {
      ticking = false;
      if (motionQuery && motionQuery.matches) {
        media.style.setProperty('--hero-parallax-y', '0px');
        return;
      }
      var rect = media.getBoundingClientRect();
      var travel = window.innerHeight + rect.height;
      var viewportCenter = window.innerHeight / 2;
      var mediaCenter = rect.top + (rect.height / 2);
      var progress = travel > 0 ? (viewportCenter - mediaCenter) / travel : 0;
      var offset = Math.max(-20, Math.min(20, progress * 40));
      media.style.setProperty('--hero-parallax-y', offset.toFixed(2) + 'px');
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    if (motionQuery && motionQuery.addEventListener) motionQuery.addEventListener('change', requestUpdate);
    requestUpdate();
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
    var reduced = Boolean(motionQuery && motionQuery.matches);

    function update() {
      ticking = false;
      items.forEach(function (item) {
        if (reduced) {
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
          item.container.classList.toggle('is-parallax-active', entry.isIntersecting && !reduced);
        });
        requestUpdate();
      }, { rootMargin: '20% 0px', threshold: 0 });
      items.forEach(function (item) { observer.observe(item.container); });
    } else {
      items.forEach(function (item) { item.visible = true; });
    }

    function syncMotionPreference() {
      reduced = Boolean(motionQuery && motionQuery.matches);
      items.forEach(function (item) {
        item.container.classList.toggle('is-parallax-active', item.visible && !reduced);
      });
      requestUpdate();
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    if (motionQuery && motionQuery.addEventListener) motionQuery.addEventListener('change', syncMotionPreference);
    requestUpdate();
  }

  function installVideo() {
    document.querySelectorAll('[data-autoplay-video]').forEach(function (video) {
      video.muted = true;
      video.loop = true;
      video.controls = false;
      var isNearViewport = !('IntersectionObserver' in window);

      function reducedMotion() {
        return Boolean(motionQuery && motionQuery.matches);
      }

      function restorePoster() {
        video.pause();
        if (video.getAttribute('src')) {
          video.removeAttribute('src');
          video.load();
        }
      }

      function attachAndPlay() {
        if (reducedMotion()) return;
        if (!video.getAttribute('src')) {
          video.src = video.getAttribute('data-src');
          video.load();
        }
        var attempt = video.play();
        if (attempt && attempt.catch) attempt.catch(function () {});
      }

      function syncMotionPreference() {
        if (reducedMotion()) {
          video.autoplay = false;
          video.removeAttribute('autoplay');
          restorePoster();
          return;
        }
        video.autoplay = true;
        video.setAttribute('autoplay', '');
        if (isNearViewport) attachAndPlay();
      }

      if (motionQuery && motionQuery.addEventListener) {
        motionQuery.addEventListener('change', syncMotionPreference);
      }

      if (!('IntersectionObserver' in window)) {
        syncMotionPreference();
        return;
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isNearViewport = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (!reducedMotion()) attachAndPlay();
          } else video.pause();
        });
      }, { rootMargin: '240px 0px', threshold: 0.01 });
      observer.observe(video);
      syncMotionPreference();
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

  installThemeControls();
  installCalmHeader();
  installMenu();
  installScrollSpy();
  installLocaleLinks();
  installTopicPickers();
  installContactForm();
  installShareControls();
  installMediaArrival();
  installMotion();
  installLoopingRails();
  installSocialEmbeds();
  installHeroParallax();
  installStaticImageParallax();
  installVideo();
  focusHashTarget();
  window.addEventListener('hashchange', focusHashTarget);
})();
