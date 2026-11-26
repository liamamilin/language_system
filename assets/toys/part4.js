/* ==========================================================================
   Part 4 Interactive Labs (Chapters 09–10) — Relationship & Society
   ========================================================================== */
(function (R) {
  'use strict';

  // Ch 09 Lab 1: Relational Access, Boundary & Role Comparator
  R.register(
    'ch09-boundary-access-matrix',
    {
      badge: 'Ch 09 · Strategy Comparator',
      title: 'Relational Arrangement & Boundary Clarifier（关系边界与角色澄清器）',
      subtitle: 'Inspect how shifting from personality blame to Group + Container placement transforms conflict.',
    },
    (root, { h }) => {
      const cases = [
        {
          title: 'Daily Texting Expectation',
          blame: '"They are cold and don’t care about me."',
          placement: 'Relationship → Connection + Time Boundary',
          sentence: '"We have regular contact, but let’s clarify what response speed and support we each expect."',
        },
        {
          title: 'Great Teammate, Not Close Friend',
          blame: '"Something is wrong because we aren’t emotionally close."',
          placement: 'Relationship → Cooperation (Teamwork ≠ Intimacy)',
          sentence: '"This relationship is strong as teamwork; it does not need to become emotional intimacy."',
        },
        {
          title: 'Emotional Takeover',
          blame: '"If I don’t fix their mood, I am selfish."',
          placement: 'Relationship → Boundary → Emotional Boundary',
          sentence: '"I can care about their pain without making it my job to regulate all of it."',
        },
        {
          title: 'Mentor Role Overload',
          blame: '"My mentor failed me by not solving my career crisis."',
          placement: 'Relationship → Relational Role → Mentor',
          sentence: '"This request belongs to a mentor role (perspective), not a manager or rescuer role."',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const grid = h('div', { class: 'ru-grid-2' });
      const out = h('div', { class: 'ru-callout tone-success' });

      function render() {
        pills.innerHTML = '';
        cases.forEach((c, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, c.title));
        });
        const cur = cases[idx];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-danger)' } }, '✗ Personality Blame'), h('div', {}, cur.blame)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-success)' } }, '✓ Relational Placement'), h('div', { style: { fontWeight: 700 } }, cur.placement))
        );
        out.innerHTML = `<strong>Callable Sentence:</strong> ${cur.sentence}`;
      }

      render();
      root.append(pills, grid, out);
    }
  );

  // Ch 09 Lab 2: Trust Repair 4-Stage Stepper
  R.register(
    'ch09-trust-repair-stepper',
    {
      badge: 'Ch 09 · Single-Step Debugger',
      title: 'Trust Repair 4-Stage Stepper（信任修复四阶段单步调试）',
      subtitle: 'Walk through why an apology opens repair but only repeated behavior completes it.',
    },
    (root, { h, meter }) => {
      const stages = [
        { name: '1. Recognition', score: 25, desc: 'Both sides name the exact breach and broken expectation without minimizing it.', trap: 'Stopping here creates awareness without accountability.' },
        { name: '2. Responsibility', score: 45, desc: 'Clear ownership of the action and an explicit apology without excuses.', trap: 'Common misreading: assuming the apology alone restores full trust.' },
        { name: '3. Changed Behavior', score: 75, desc: 'Concrete new arrangement or safeguard that alters the recurring pattern.', trap: 'Promises without structural change quickly relapse.' },
        { name: '4. Evidence Over Time', score: 100, desc: 'Repeated reliable behavior across time rebuilds warranted reliance.', trap: 'Trust is earned back by consistency, not demanded by urgency.' },
      ];
      let step = 0;
      const dots = h('div', { class: 'ru-step-dots' });
      const trustM = meter({ label: 'Warranted Trust Level（有据信任度）', value: 25, tone: 'warn' });
      const panel = h('div', { class: 'ru-panel' });
      const nav = h('div', { class: 'ru-row' });

      function render() {
        dots.innerHTML = '';
        stages.forEach((s, i) => {
          dots.appendChild(h('button', {
            type: 'button',
            class: `ru-step-dot ${i === step ? 'is-current' : i < step ? 'is-done' : ''}`,
            onClick: () => { step = i; render(); },
          }, s.name));
        });
        const s = stages[step];
        trustM.update(s.score, s.score >= 75 ? 'success' : s.score >= 45 ? 'warn' : 'danger');
        panel.innerHTML = '';
        panel.append(
          h('h5', {}, s.name),
          h('p', { style: { margin: '0.25rem 0' } }, s.desc),
          h('div', { class: 'ru-callout tone-warn', style: { marginTop: '0.45rem' } }, `Watch out: ${s.trap}`)
        );
        nav.innerHTML = '';
        nav.append(
          h('button', { type: 'button', class: 'ru-btn ru-btn-sm', disabled: step === 0, onClick: () => { step -= 1; render(); } }, '← Previous'),
          h('button', { type: 'button', class: 'ru-btn ru-btn-primary ru-btn-sm', disabled: step === stages.length - 1, onClick: () => { step += 1; render(); } }, 'Next Stage →')
        );
      }

      render();
      root.append(dots, trustM, panel, nav);
    }
  );

  // Ch 10 Lab 1: Personal Flaw vs. Social Structure Comparator
  R.register(
    'ch10-structure-vs-personal',
    {
      badge: 'Ch 10 · Diagnostic Comparator',
      title: 'Personal Flaw vs. Social Structure Separator（个人缺陷与社会结构分离器）',
      subtitle: 'Diagnose whether a frustration comes from individual effort or an institutional, market, or platform rule.',
    },
    (root, { h }) => {
      const cases = [
        {
          label: 'Invisible Work in Org',
          personal: '"I must not be working hard enough."',
          structural: 'Society → Organization / Rule — promotion criteria reward visible launches over quiet maintenance.',
          move: 'Make maintenance outcomes legible to the organization’s reporting structure or renegotiate role scope.',
        },
        {
          label: 'Low Pay in Saturated Field',
          personal: '"My skills have no human worth."',
          structural: 'Society → Market → Labor Market — supply/demand pricing is not a measure of human value.',
          move: 'Separate market price (Society → Market) from worth (Value); reposition skill stack or niche.',
        },
        {
          label: 'Sudden Reach Drop Online',
          personal: '"My writing suddenly became terrible."',
          structural: 'Society → Platform Ecology — distribution algorithm or platform rule shifted.',
          move: 'Inspect platform changes and diversify distribution channels instead of spiraling into self-doubt.',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const grid = h('div', { class: 'ru-grid-2' });
      const moveBox = h('div', { class: 'ru-callout tone-success' });

      function render() {
        pills.innerHTML = '';
        cases.forEach((c, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, c.label));
        });
        const c = cases[idx];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-danger)' } }, '✗ Over-Personalized Reading'), h('div', {}, c.personal)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-accent)' } }, '✓ Society Placement'), h('div', { style: { fontWeight: 600 } }, c.structural))
        );
        moveBox.innerHTML = `<strong>Strategic Move:</strong> ${c.move}`;
      }

      render();
      root.append(pills, grid, moveBox);
    }
  );

  // Ch 10 Lab 2: Platform Rule & Incentive Field Simulator
  R.register(
    'ch10-incentive-platform-sim',
    {
      badge: 'Ch 10 · Incentive Simulation',
      title: 'Platform & Institutional Incentive Simulator（平台与制度激励场模拟）',
      subtitle: 'Adjust what a system rewards to predict what behaviors dominate—independent of individual intentions.',
    },
    (root, { h, slider, meter }) => {
      const state = { speedReward: 75, depthReward: 30, transparency: 50 };
      const depthM = meter({ label: 'Long-Term Craft & Depth（长期深度产出）', value: 35, tone: 'warn' });
      const noiseM = meter({ label: 'Short-Term Noise / Gaming（短期迎合与噪音）', value: 70, tone: 'danger' });
      const note = h('div', { class: 'ru-callout' });

      function update() {
        const depth = Math.max(8, Math.min(98, Math.round(state.depthReward * 0.65 + state.transparency * 0.35 - state.speedReward * 0.2)));
        const noise = Math.max(5, Math.min(96, Math.round(state.speedReward * 0.72 + (100 - state.transparency) * 0.3 - state.depthReward * 0.25)));
        depthM.update(depth, depth >= 60 ? 'success' : depth >= 40 ? 'warn' : 'danger');
        noiseM.update(noise, noise <= 35 ? 'success' : noise <= 60 ? 'warn' : 'danger');
        note.className = `ru-callout tone-${noise > 60 ? 'danger' : 'success'}`;
        note.innerHTML = noise > 60
          ? '<strong>Structural Drift:</strong> Even well-meaning participants produce clickbait or shallow speed when platform rules overwhelmingly reward velocity over depth.'
          : '<strong>Aligned Field:</strong> Transparent rules and depth rewards allow craft to survive without heroic individual sacrifice.';
      }

      const s1 = slider({ label: 'Reward for Speed / Virality（速度与流量权重）', min: 0, max: 100, unit: '%', value: state.speedReward, onChange: (v) => { state.speedReward = v; update(); } });
      const s2 = slider({ label: 'Reward for Verified Depth（深度与质量权重）', min: 0, max: 100, unit: '%', value: state.depthReward, onChange: (v) => { state.depthReward = v; update(); } });
      const s3 = slider({ label: 'Rule Transparency（规则透明度）', min: 0, max: 100, unit: '%', value: state.transparency, onChange: (v) => { state.transparency = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, depthM, noiseM), note);
    }
  );
})(window.RUToys);
