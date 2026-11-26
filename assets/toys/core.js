/* ==========================================================================
   RUToys — Zero-Dependency Interactive Lab Mount Engine
   ========================================================================== */
(function (global) {
  'use strict';

  const registry = new Map();
  const mounted = new Set();

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs && typeof attrs === 'object') {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (v === undefined || v === null || v === false) return;
        if (k === 'class' || k === 'className') {
          el.className = v;
        } else if (k === 'style' && typeof v === 'object') {
          Object.assign(el.style, v);
        } else if (k.startsWith('on') && typeof v === 'function') {
          el.addEventListener(k.slice(2).toLowerCase(), v);
        } else if (k === 'dataset' && typeof v === 'object') {
          Object.keys(v).forEach((dk) => {
            el.dataset[dk] = v[dk];
          });
        } else if (k === 'html') {
          el.innerHTML = v;
        } else if (k === 'checked' || k === 'disabled' || k === 'selected') {
          el[k] = Boolean(v);
        } else if (k === 'value') {
          el.value = v;
        } else {
          el.setAttribute(k, String(v));
        }
      });
    }
    const append = (item) => {
      if (item === undefined || item === null || item === false) return;
      if (Array.isArray(item)) {
        item.forEach(append);
      } else if (item instanceof Node) {
        el.appendChild(item);
      } else {
        el.appendChild(document.createTextNode(String(item)));
      }
    };
    children.forEach(append);
    return el;
  }

  function slider({ label, min = 0, max = 100, step = 1, value = 50, unit = '', onChange }) {
    const valEl = h('span', { class: 'ru-slider-val' }, `${value}${unit}`);
    const input = h('input', {
      type: 'range',
      class: 'ru-range',
      min,
      max,
      step,
      value,
      onInput: (e) => {
        const num = Number(e.target.value);
        valEl.textContent = `${num}${unit}`;
        if (onChange) onChange(num);
      },
    });
    const wrap = h(
      'div',
      { class: 'ru-control' },
      h('div', { class: 'ru-control-head' }, h('label', { class: 'ru-label' }, label), valEl),
      input
    );
    wrap.setValue = (v) => {
      input.value = v;
      valEl.textContent = `${v}${unit}`;
    };
    return wrap;
  }

  function meter({ label, value = 50, max = 100, tone = 'accent', suffix = '%' }) {
    const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
    const valSpan = h('span', { class: 'ru-meter-val' }, `${Math.round(value)}${suffix}`);
    const fill = h('div', { class: `ru-meter-fill tone-${tone}`, style: { width: `${pct}%` } });
    const el = h(
      'div',
      { class: 'ru-meter' },
      h('div', { class: 'ru-meter-head' }, h('span', {}, label), valSpan),
      h('div', { class: 'ru-meter-track' }, fill)
    );
    el.update = (nextVal, nextTone) => {
      const p = Math.max(0, Math.min(100, Math.round((nextVal / max) * 100)));
      valSpan.textContent = `${Math.round(nextVal)}${suffix}`;
      fill.style.width = `${p}%`;
      if (nextTone) fill.className = `ru-meter-fill tone-${nextTone}`;
    };
    return el;
  }

  function register(id, meta, mountFn) {
    if (!id || typeof mountFn !== 'function') {
      throw new Error(`RUToys.register requires (id, meta, mountFn): ${id}`);
    }
    if (registry.has(id)) {
      console.warn(`[RUToys] Duplicate lab id ignored: ${id}`);
      return;
    }
    registry.set(id, { id, meta: meta || {}, mountFn });
  }

  function mountOne(container) {
    const id = container.getAttribute('data-ru-toy');
    if (!id) return false;
    const entry = registry.get(id);
    if (!entry) {
      container.innerHTML = `<div class="ru-toy ru-toy-error"><strong>Interactive lab not registered:</strong> <code>${id}</code></div>`;
      return false;
    }

    const render = () => {
      container.innerHTML = '';
      const badge = entry.meta.badge || 'Interactive Lab';
      const title = entry.meta.title || id;
      const subtitle = entry.meta.subtitle || '';
      const body = h('div', { class: 'ru-toy-body' });
      const resetBtn = h(
        'button',
        {
          type: 'button',
          class: 'ru-btn ru-btn-ghost ru-btn-sm',
          onClick: () => render(),
          title: 'Reset this lab',
        },
        'Reset'
      );
      const card = h(
        'section',
        { class: 'ru-toy', dataset: { toyId: id } },
        h(
          'header',
          { class: 'ru-toy-header' },
          h(
            'div',
            { class: 'ru-toy-title-group' },
            h('span', { class: 'ru-toy-badge' }, badge),
            h('h4', { class: 'ru-toy-title' }, title),
            subtitle ? h('p', { class: 'ru-toy-subtitle' }, subtitle) : null
          ),
          resetBtn
        ),
        body
      );
      container.appendChild(card);
      try {
        entry.mountFn(body, { h, slider, meter, reset: render });
        mounted.add(id);
      } catch (err) {
        body.innerHTML = '';
        body.appendChild(
          h('div', { class: 'ru-callout tone-danger' }, `Lab error (${id}): ${err.message}`)
        );
      }
    };

    render();
    return true;
  }

  function mountAll(root) {
    const scope = root || document;
    const nodes = scope.querySelectorAll('[data-ru-toy]');
    let count = 0;
    nodes.forEach((node) => {
      if (mountOne(node)) count += 1;
    });
    return count;
  }

  const RUToys = {
    version: '1.0.0',
    register,
    mountAll,
    h,
    slider,
    meter,
    list: () => Array.from(registry.keys()),
    mountedCount: () => mounted.size,
  };

  global.RUToys = RUToys;
})(window);
