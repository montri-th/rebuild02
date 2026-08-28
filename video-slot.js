/* <video-slot> — a drop-in upload slot for a video the user supplies.
   Accepts any video the browser can play (incl. .mov / video/quicticktime).
   The dropped file is kept in IndexedDB under the slot's id, so it survives
   reload of the preview. Fills its container; give it a sized parent. */
(function () {
  if (window.customElements && customElements.get('video-slot')) return;

  const DB = 'om-video-slots', STORE = 'files';
  let dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  async function put(key, val) {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(val, key);
      tx.oncomplete = res; tx.onerror = () => rej(tx.error);
    });
  }
  async function get(key) {
    const d = await db();
    return new Promise((res) => {
      const tx = d.transaction(STORE, 'readonly');
      const q = tx.objectStore(STORE).get(key);
      q.onsuccess = () => res(q.result || null);
      q.onerror = () => res(null);
    });
  }

  const CSS = `
    :host { display:block; position:relative; width:100%; height:100%; min-height:180px; }
    * { box-sizing:border-box; }
    .wrap { position:absolute; inset:0; overflow:hidden; border-radius:inherit; }
    video { width:100%; height:100%; display:block; object-fit:cover; background:var(--surface-alt,#eef1ee); }
    .drop {
      position:absolute; inset:0; display:flex; flex-direction:column; align-items:center;
      justify-content:center; gap:10px; text-align:center; padding:24px; cursor:pointer;
      background:var(--surface-alt,#eef1ee); border:2px dashed var(--border-default,#e5e9e6);
      color:var(--text-metadata,#5c6a61);
      font:400 .9375rem/1.5 var(--font-body,system-ui,sans-serif);
      transition:background-color 200ms cubic-bezier(.2,0,0,1), border-color 200ms cubic-bezier(.2,0,0,1);
    }
    .drop:hover, .drop.over { background:var(--surface-blue-tint,#e8f1f4); border-color:var(--interaction-accent,#176b82); }
    .drop:focus-visible { outline:3px solid var(--interaction-focus-ring,#176b82); outline-offset:2px; }
    .glyph {
      font-family:"Material Symbols Rounded"; font-weight:normal; font-size:32px; line-height:1;
      font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24;
      color:var(--interaction-accent,#176b82);
    }
    .label { font-weight:600; color:var(--text-primary,#182327); max-width:32ch; }
    .hint { font-size:.8125rem; max-width:36ch; }
    .err { color:var(--semantic-danger-ink,#8c2f2f); font-size:.8125rem; max-width:36ch; }
    .replace {
      position:absolute; right:8px; top:8px; min-height:32px; padding:4px 14px;
      border-radius:999px; border:2px solid currentColor; background:rgba(255,255,255,.86);
      color:var(--interaction-accent,#176b82); cursor:pointer;
      font:600 .8125rem/1.2 var(--font-body,system-ui,sans-serif);
    }
    .replace:hover { background:#fff; }
    input { display:none; }
  `;

  class VideoSlot extends HTMLElement {
    static get observedAttributes() { return ['placeholder', 'hint']; }

    connectedCallback() {
      if (this._built) return;
      this._built = true;
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' + CSS + '</style>' +
        '<div class="wrap">' +
        '  <div class="drop" tabindex="0" role="button">' +
        '    <span class="glyph" aria-hidden="true">movie</span>' +
        '    <span class="label"></span>' +
        '    <span class="hint"></span>' +
        '    <span class="err" hidden></span>' +
        '  </div>' +
        '</div>' +
        '<input type="file" accept="video/*,.mov,.mp4,.webm,.m4v">';

      this._wrap = root.querySelector('.wrap');
      this._drop = root.querySelector('.drop');
      this._input = root.querySelector('input');
      this._sync();

      this._drop.addEventListener('click', () => this._input.click());
      this._drop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._input.click(); }
      });
      this._input.addEventListener('change', () => {
        if (this._input.files && this._input.files[0]) this._ingest(this._input.files[0]);
        this._input.value = '';
      });
      ['dragenter', 'dragover'].forEach((t) => this.addEventListener(t, (e) => {
        e.preventDefault(); this._drop && this._drop.classList.add('over');
      }));
      ['dragleave', 'drop'].forEach((t) => this.addEventListener(t, (e) => {
        e.preventDefault(); this._drop && this._drop.classList.remove('over');
      }));
      this.addEventListener('drop', (e) => {
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      });

      this._restore();
    }

    attributeChangedCallback() { if (this._built) this._sync(); }

    _sync() {
      if (!this._drop) return;
      this._drop.querySelector('.label').textContent =
        this.getAttribute('placeholder') || 'Drop a video here';
      this._drop.querySelector('.hint').textContent =
        this.getAttribute('hint') || 'MP4 (H.264) plays everywhere · .mov works if it is H.264, not HEVC';
    }

    _err(msg) {
      const el = this._drop && this._drop.querySelector('.err');
      if (!el) return;
      el.hidden = !msg;
      el.textContent = msg || '';
    }

    async _restore() {
      if (!this.id) return;
      const rec = await get(this.id);
      if (rec && rec.blob) this._show(rec.blob, rec.name);
    }

    async _ingest(file) {
      this._err(null);
      if (!file.type.startsWith('video/') && !/\.(mov|mp4|webm|m4v)$/i.test(file.name)) {
        this._err('That is not a video file.');
        return;
      }
      this._show(file, file.name);
      if (this.id) {
        try { await put(this.id, { blob: file, name: file.name, type: file.type }); }
        catch (e) { /* playback still works this session */ }
      }
    }

    _show(blob, name) {
      if (this._url) URL.revokeObjectURL(this._url);
      this._url = URL.createObjectURL(blob);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const v = document.createElement('video');
      v.src = this._url;
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      v.playsInline = true;
      v.preload = 'metadata';
      v.setAttribute('aria-label', this.getAttribute('video-label') || name || 'Uploaded video');
      v.addEventListener('volumechange', () => { v.muted = true; v.volume = 0; });
      if (reduce) { v.controls = true; }
      else { v.loop = true; v.autoplay = true; }
      v.addEventListener('error', () => {
        this._wrap.innerHTML = '';
        this._wrap.appendChild(this._drop);
        this._err('This browser cannot play that file — it is probably HEVC. Export it as H.264 MP4 and drop it again.');
      });
      this._wrap.innerHTML = '';
      this._wrap.appendChild(v);
      const btn = document.createElement('button');
      btn.className = 'replace';
      btn.type = 'button';
      btn.textContent = 'Replace';
      btn.addEventListener('click', (e) => { e.stopPropagation(); this._input.click(); });
      this._wrap.appendChild(btn);
      if (!reduce) v.play().catch(() => {});
    }
  }

  customElements.define('video-slot', VideoSlot);
})();
