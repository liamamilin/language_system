/* ==========================================================================
   Part 6 Interactive Labs (Chapters 13–15) — Use, Diagnosis & Maintenance
   ========================================================================== */
(function (R) {
  'use strict';

  // Ch 13 Lab 1: 6-Step New Concept Placement Single-Step Debugger
  R.register(
    'ch13-six-step-placer',
    {
      badge: 'Ch 13 · Single-Step Debugger',
      title: '6-Step New Concept Placement Walkthrough（新概念安置六步单步演练）',
      subtitle: 'Walk a real concept through all six steps from hearing Domain Language to writing a callable Use Sentence.',
    },
    (root, { h }) => {
      const examples = {
        'Opportunity Cost': [
          'Step 1 (Hear Domain): Talks about trade-offs, cost, and choices → Value.',
          'Step 2 (Locate Group): Belongs to the Cost neighborhood → Value → Cost.',
          'Step 3 (Choose Container): Actionable holder → Opportunity Cost.',
          'Step 4 (Add Links): Touches Work → Goal / Priority and Society → Market.',
          'Step 5 (Placement Card): Misplacement prevented = counting only money while ignoring foregone time/energy.',
          'Step 6 (Sentence Test): "Accepting this side gig has an opportunity cost: it consumes the recovery weekend I need."',
        ],
        'Prompt': [
          'Step 1 (Hear Domain): Talks about instructions, constraints, and clarity → Language.',
          'Step 2 (Locate Group): Belongs to Instruction → Language → Instruction.',
          'Step 3 (Choose Container): Actionable holder → Prompt.',
          'Step 4 (Add Links): Touches Technology → Workflow, Work → Task, Value → Standard.',
          'Step 5 (Placement Card): Misplacement prevented = treating weak output as purely a model failure.',
          'Step 6 (Sentence Test): "Before switching models, I will rewrite the prompt with explicit constraints and acceptance criteria."',
        ],
        'Burnout': [
          'Step 1 (Hear Domain): Talks about chronic depletion and exhaustion → Body first.',
          'Step 2 (Locate Group): Belongs to Energy & Stress → Body → Energy / Stress.',
          'Step 3 (Choose Container): Actionable holder → Chronic Depletion / Stress Response.',
          'Step 4 (Add Links): Touches Mind → Emotion, Work → Project, Society → Organization.',
          'Step 5 (Placement Card): Misplacement prevented = diagnosing chronic overload as personal laziness.',
          'Step 6 (Sentence Test): "My exhaustion is chronic load plus low recovery, not a character defect."',
        ],
      };
      const names = Object.keys(examples);
      let curName = names[0];
      let step = 0;
      const conceptRow = h('div', { class: 'ru-row' });
      const dots = h('div', { class: 'ru-step-dots' });
      const box = h('div', { class: 'ru-callout tone-success' });
      const nav = h('div', { class: 'ru-row' });

      function render() {
        conceptRow.innerHTML = '';
        names.forEach((n) => {
          conceptRow.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${n === curName ? 'is-active' : ''}`,
            onClick: () => { curName = n; step = 0; render(); },
          }, n));
        });
        const steps = examples[curName];
        dots.innerHTML = '';
        steps.forEach((_, i) => {
          dots.appendChild(h('button', {
            type: 'button',
            class: `ru-step-dot ${i === step ? 'is-current' : i < step ? 'is-done' : ''}`,
            onClick: () => { step = i; render(); },
          }, `Step ${i + 1}`));
        });
        box.textContent = steps[step];
        nav.innerHTML = '';
        nav.append(
          h('button', { type: 'button', class: 'ru-btn ru-btn-sm', disabled: step === 0, onClick: () => { step -= 1; render(); } }, '← Back'),
          h('button', { type: 'button', class: 'ru-btn ru-btn-primary ru-btn-sm', disabled: step === steps.length - 1, onClick: () => { step += 1; render(); } }, 'Next Step →')
        );
      }

      render();
      root.append(conceptRow, dots, box, nav);
    }
  );

  // Ch 13 Lab 2: 7 Classic Placement Error Detector
  R.register(
    'ch13-placement-error-audit',
    {
      badge: 'Ch 13 · Error Auditor',
      title: 'Placement Error Detector & Re-Router（七类典型错置检测器）',
      subtitle: 'Click any common placement error to see the hidden misrouting and the clean correction.',
    },
    (root, { h }) => {
      const errors = [
        { err: 'Everything felt internally → Mind', fix: 'Check Body first (sleep, energy, stress response) before assuming a Mind-only issue.' },
        { err: 'Everything important → Value', fix: 'Ask what domain operates it (e.g., Confidence operates in Mind + Work, not only Value).' },
        { err: 'Social structure → Personal weakness', fix: 'Place org rules, markets, and platform algorithms under Society first.' },
        { err: 'Workflow failure → Tool problem', fix: 'Separate Technology → Tool from Technology → Workflow and Work → Process.' },
        { err: 'Language unclarity → Low intelligence', fix: 'Treat vague output as Language → Term / Definition / Question, not IQ.' },
        { err: 'Body signal → Laziness', fix: 'Place fatigue and brain fog under Body → Energy / Sleep Debt.' },
        { err: 'Relational boundary → Rejection', fix: 'Place limits under Relationship → Boundary (protection & clarity, not hostility).' },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const out = h('div', { class: 'ru-panel' });

      function render() {
        pills.innerHTML = '';
        errors.forEach((e, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, `#${i + 1} ${e.err.split('→')[0].trim()}`));
        });
        const cur = errors[idx];
        out.innerHTML = '';
        out.append(
          h('h5', { style: { color: 'var(--toy-danger)' } }, `Common Error: ${cur.err}`),
          h('div', { class: 'ru-callout tone-success', style: { marginTop: '0.45rem' } }, `Correction: ${cur.fix}`)
        );
      }

      render();
      root.append(pills, out);
    }
  );

  // Ch 14 Lab 1: Symptom / Structure / Judgment Live Knot Splitter
  R.register(
    'ch14-three-layer-splitter',
    {
      badge: 'Ch 14 · Knot Splitter',
      title: 'Symptom · Structure · Judgment Separator（症状、结构与判断三层拆解器）',
      subtitle: 'Unpack a messy complaint into observable symptom, underlying structure, and attached value judgment.',
    },
    (root, { h }) => {
      const knots = [
        {
          raw: '"I am lazy."',
          symptom: 'Low energy, avoidance, slow starts (Body / Mind)',
          structure: 'Unclear next action, no feedback loop, 5h sleep (Work / Body)',
          judgment: '"If I struggle, I am weak." (Value → Standard)',
        },
        {
          raw: '"This relationship feels unequal."',
          symptom: 'Resentment, exhaustion after conversations (Mind / Body)',
          structure: 'Unstated time boundary & mismatched relational role (Relationship)',
          judgment: '"They don’t respect me as a person." (Value / Mind)',
        },
        {
          raw: '"The team is busy but nothing ships."',
          symptom: 'Full calendars, long meetings, zero shipped artifacts (Work)',
          structure: 'No milestone, missing acceptance criteria, unclear org role (Work / Language / Society)',
          judgment: '"Nobody here cares about execution." (Relationship / Value)',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const grid = h('div', { class: 'ru-grid-3' });

      function render() {
        pills.innerHTML = '';
        knots.forEach((k, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, k.raw));
        });
        const k = knots[idx];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'ru-panel' }, h('h5', {}, '1. Symptom（表现）'), h('div', {}, k.symptom)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-teal)' } }, '2. Structure（结构）'), h('div', {}, k.structure)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-amber)' } }, '3. Judgment（附着判断）'), h('div', {}, k.judgment))
        );
      }

      render();
      root.append(pills, grid);
    }
  );

  // Ch 14 Lab 2: 5-Step Conceptual Diagnosis & Intervention Matcher
  R.register(
    'ch14-causal-chain-debugger',
    {
      badge: 'Ch 14 · Intervention Matcher',
      title: 'Diagnostic Intervention Matcher（诊断定位与干预匹配器）',
      subtitle: 'Pick a primary domain placement to compare a mismatched intervention against a targeted first move.',
    },
    (root, { h }) => {
      const domains = [
        { name: 'Body', wrong: 'Buying a new productivity app or giving a pep talk.', right: 'Adjust sleep recovery, hydration, physical load, or seek medical advice.' },
        { name: 'Mind', wrong: 'Working 2 extra hours through panic.', right: 'Name emotion, reduce task switches, test the underlying belief.' },
        { name: 'Language', wrong: 'Holding more status meetings with the same vague words.', right: 'Define terms, write acceptance criteria, ask a diagnostic question.' },
        { name: 'Work', wrong: 'Meditating while leaving the project undefined.', right: 'Define one artifact, one milestone, and one 20-minute Single Action Task.' },
        { name: 'Relationship', wrong: 'Silently hoping the other person guesses your expectation.', right: 'Name the Group (Boundary / Trust / Role) and state the arrangement explicitly.' },
        { name: 'Society', wrong: 'Assuming every systemic bottleneck is a personal character flaw.', right: 'Map the institutional rule, market incentive, or platform constraint.' },
        { name: 'Technology', wrong: 'Blaming yourself for a broken, unverified toolchain.', right: 'Inspect input, model step, verification gate, and storage workflow.' },
        { name: 'Value', wrong: 'Optimizing speed on a goal that no longer matters.', right: 'Clarify priority, opportunity cost, risk budget, and ethical boundary.' },
      ];
      let sel = 0;
      const pills = h('div', { class: 'ru-row' });
      const grid = h('div', { class: 'ru-grid-2' });

      function render() {
        pills.innerHTML = '';
        domains.forEach((d, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === sel ? 'is-active' : ''}`,
            onClick: () => { sel = i; render(); },
          }, d.name));
        });
        const d = domains[sel];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-danger)' } }, '✗ Mismatched Intervention'), h('div', {}, d.wrong)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-success)' } }, `✓ Matched ${d.name} First Move`), h('div', { style: { fontWeight: 600 } }, d.right))
        );
      }

      render();
      root.append(pills, grid);
    }
  );

  // Ch 15 Lab 1: Tree Drift Maintenance Simulator
  R.register(
    'ch15-drift-maintenance-sim',
    {
      badge: 'Ch 15 · System Health Simulator',
      title: 'RU Tree Drift & Maintenance Rhythm Simulator（系统漂移与维护节律模拟）',
      subtitle: 'Balance capture volume against weekly sentence practice and monthly review to keep the tree alive.',
    },
    (root, { h, slider, meter }) => {
      const state = { weeklyItems: 3, monthlyReview: 1, unplacedBacklog: 10 };
      const healthM = meter({ label: 'Tree Usability & Health（系统可用健康度）', value: 82, tone: 'success' });
      const museumM = meter({ label: 'Museum / Stagnation Risk（博物馆化风险）', value: 18, tone: 'teal' });
      const out = h('div', { class: 'ru-callout' });

      function update() {
        const health = Math.max(10, Math.min(100, Math.round(55 + state.monthlyReview * 18 + Math.min(5, state.weeklyItems) * 6 - state.unplacedBacklog * 1.4)));
        const museum = Math.max(5, Math.min(95, Math.round(100 - health)));
        healthM.update(health, health >= 70 ? 'success' : health >= 45 ? 'warn' : 'danger');
        museumM.update(museum, museum <= 30 ? 'success' : museum <= 55 ? 'warn' : 'danger');
        out.className = `ru-callout tone-${health >= 70 ? 'success' : health >= 45 ? 'warn' : 'danger'}`;
        out.innerHTML = health >= 70
          ? '<strong>Living Runtime Tree:</strong> Light capture (3 items/week) + monthly drift check keeps concepts callable without clerical overload.'
          : '<strong>Drift Detected:</strong> Either backlog is overcrowding containers or reviews stopped—prune, move, or split before adding more concepts.';
      }

      const s1 = slider({ label: 'Weekly Practiced Items（每周造句演练条数）', min: 0, max: 10, value: state.weeklyItems, onChange: (v) => { state.weeklyItems = v; update(); } });
      const s2 = slider({ label: 'Monthly Drift Reviews（每月结构复盘次数）', min: 0, max: 2, value: state.monthlyReview, onChange: (v) => { state.monthlyReview = v; update(); } });
      const s3 = slider({ label: 'Unplaced Backlog Size（未安置积压条数）', min: 0, max: 40, value: state.unplacedBacklog, onChange: (v) => { state.unplacedBacklog = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, healthM, museumM), out);
    }
  );

  // Ch 15 Lab 2: Move / Split / Merge Concept Refactoring Router
  R.register(
    'ch15-split-merge-router',
    {
      badge: 'Ch 15 · Refactoring Router',
      title: 'Move · Split · Merge Decision Router（概念迁移、拆分与合并决策器）',
      subtitle: 'Diagnose a friction in your tree and get the right structural refactoring operation.',
    },
    (root, { h }) => {
      const scenarios = [
        {
          label: '"Confidence" feels awkward under Value',
          op: 'MOVE（迁移）',
          tone: 'accent',
          reason: 'Every real use involves emotion, attention, and action readiness → Move Primary Position to Mind, keep Work & Value as Associated.',
        },
        {
          label: '"Stress" holds 15 unrelated notes',
          op: 'SPLIT（拆分）',
          tone: 'warn',
          reason: 'One word hides four distinct containers → Split into Body load, Mind appraisal, Work pressure, and Society role demand.',
        },
        {
          label: '"Task Friction" and "Start Resistance" do the same job',
          op: 'MERGE（合并）',
          tone: 'success',
          reason: 'Same Group, same sentence, same action → Merge into one Container and keep the other as a synonym.',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const out = h('div', { class: 'ru-callout' });

      function render() {
        pills.innerHTML = '';
        scenarios.forEach((s, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, s.label));
        });
        const s = scenarios[idx];
        out.className = `ru-callout tone-${s.tone}`;
        out.innerHTML = `<strong>Recommended Operation: ${s.op}</strong><br/>${s.reason}`;
      }

      render();
      root.append(pills, out);
    }
  );
})(window.RUToys);
