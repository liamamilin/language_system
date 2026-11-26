/* ==========================================================================
   Part 5 Interactive Labs (Chapters 11–12) — Technology & Value
   ========================================================================== */
(function (R) {
  'use strict';

  // Ch 11 Lab 1: AI Model vs. Full AI Workflow Single-Step Debugger
  R.register(
    'ch11-ai-workflow-stepper',
    {
      badge: 'Ch 11 · Workflow Debugger',
      title: 'AI Model vs. Full AI Workflow Stepper（AI 模型与完整工作流单步调试）',
      subtitle: 'Step through all five stages to see why model generation is only one link in a reliable workflow.',
    },
    (root, { h }) => {
      const stages = [
        { name: '1. Input & Framing', domain: 'Language → Instruction', desc: 'Define goal, constraints, source data, and acceptance criteria before calling any model.', fail: 'Vague input guarantees plausible-sounding generic output.' },
        { name: '2. AI Model Step', domain: 'Technology → AI Model', desc: 'Generate draft, transform structure, or synthesize candidate patterns.', fail: 'Misplacement trap: treating this single step as the entire workflow.' },
        { name: '3. Verification & Review', domain: 'Value → Standard', desc: 'Audit facts, edge cases, citations, and logic against human quality standards.', fail: 'Fluency is not evidence; skipping review ships silent errors.' },
        { name: '4. Storage & Integration', domain: 'Technology → System', desc: 'Save outputs into versioned files, structured repos, or searchable notes.', fail: 'Chat-only output disappears and cannot compound.' },
        { name: '5. Reuse & Feedback', domain: 'Work → Feedback', desc: 'Log what worked and refine prompts/templates for the next cycle.', fail: 'Without feedback, you solve the same problem from scratch every time.' },
      ];
      let step = 0;
      const dots = h('div', { class: 'ru-step-dots' });
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
        panel.innerHTML = '';
        panel.append(
          h('h5', {}, `${s.name}  ·  ${s.domain}`),
          h('p', { style: { margin: '0.25rem 0' } }, s.desc),
          h('div', { class: 'ru-callout tone-warn', style: { marginTop: '0.45rem' } }, `Failure mode if skipped: ${s.fail}`)
        );
        nav.innerHTML = '';
        nav.append(
          h('button', { type: 'button', class: 'ru-btn ru-btn-sm', disabled: step === 0, onClick: () => { step -= 1; render(); } }, '← Previous'),
          h('button', { type: 'button', class: 'ru-btn ru-btn-primary ru-btn-sm', disabled: step === stages.length - 1, onClick: () => { step += 1; render(); } }, 'Next Step →')
        );
      }

      render();
      root.append(dots, panel, nav);
    }
  );

  // Ch 11 Lab 2: Tool Dependency & Automation Leverage Simulator
  R.register(
    'ch11-automation-leverage-sim',
    {
      badge: 'Ch 11 · Trade-off Simulation',
      title: 'Automation Leverage vs. Fragility Simulator（自动化杠杆与脆弱性模拟）',
      subtitle: 'Tune task repetition, setup complexity, and review depth to see when automation pays off.',
    },
    (root, { h, slider, meter }) => {
      const state = { runsPerMonth: 12, setupHours: 4, reviewStrictness: 75 };
      const roiM = meter({ label: 'Net Workflow Leverage（净杠杆收益）', value: 68, tone: 'success' });
      const riskM = meter({ label: 'Silent Error / Lock-in Risk（静默错误风险）', value: 25, tone: 'warn' });
      const out = h('div', { class: 'ru-callout' });

      function update() {
        const net = Math.max(5, Math.min(100, Math.round(state.runsPerMonth * 3.8 - state.setupHours * 4.5 + state.reviewStrictness * 0.28)));
        const risk = Math.max(8, Math.min(95, Math.round((100 - state.reviewStrictness) * 0.7 + state.setupHours * 2.5)));
        roiM.update(net, net >= 60 ? 'success' : net >= 35 ? 'warn' : 'danger');
        riskM.update(risk, risk <= 30 ? 'success' : risk <= 55 ? 'warn' : 'danger');
        out.className = `ru-callout tone-${net >= 55 && risk <= 45 ? 'success' : 'warn'}`;
        out.innerHTML = net < 40
          ? '<strong>Over-Engineering Alert:</strong> Low repetition + high setup cost means manual checklists beat custom automation.'
          : risk > 55
          ? '<strong>Unverified Automation Alert:</strong> High speed with weak review amplifies errors faster than you can catch them.'
          : '<strong>Healthy Leverage:</strong> High repetition + strong verification turns automation into reliable capacity.';
      }

      const s1 = slider({ label: 'Task Runs / Month（每月复用频次）', min: 1, max: 30, value: state.runsPerMonth, onChange: (v) => { state.runsPerMonth = v; update(); } });
      const s2 = slider({ label: 'Setup & Maintenance Cost（搭建维护小时）', min: 1, max: 20, unit: 'h', value: state.setupHours, onChange: (v) => { state.setupHours = v; update(); } });
      const s3 = slider({ label: 'Human Verification Gate（人工验收强度）', min: 10, max: 100, unit: '%', value: state.reviewStrictness, onChange: (v) => { state.reviewStrictness = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, roiM, riskM), out);
    }
  );

  // Ch 12 Lab 1: Opportunity Cost, Sunk Cost & Time Cost Calculator
  R.register(
    'ch12-opportunity-cost-calc',
    {
      badge: 'Ch 12 · Value Trade-off Calculator',
      title: 'Opportunity Cost vs. Sunk Cost Simulator（机会成本与沉没成本权衡器）',
      subtitle: 'Separate already-spent sunk hours from forward-looking opportunity cost before committing more time.',
    },
    (root, { h, slider, meter }) => {
      const state = { sunkHours: 40, remainingHours: 25, nextBestValue: 80, currentExpected: 45 };
      const keepM = meter({ label: 'Continue Current Path (Forward Net)', value: 45, tone: 'warn' });
      const switchM = meter({ label: 'Switch to Next-Best Option', value: 80, tone: 'success' });
      const verdict = h('div', { class: 'ru-callout' });

      function update() {
        const keepScore = Math.max(5, Math.min(100, Math.round(state.currentExpected - state.remainingHours * 0.45 + 15)));
        const switchScore = Math.max(5, Math.min(100, Math.round(state.nextBestValue)));
        keepM.update(keepScore, keepScore >= switchScore ? 'success' : 'warn');
        switchM.update(switchScore, switchScore > keepScore ? 'success' : 'accent');
        const diff = switchScore - keepScore;
        verdict.className = `ru-callout tone-${diff > 10 ? 'warn' : 'success'}`;
        verdict.innerHTML = diff > 10
          ? `<strong>Sunk Cost Trap Warning:</strong> The ${state.sunkHours}h already spent cannot be recovered. Forward opportunity cost favors switching (+${diff} pts) rather than pouring ${state.remainingHours}h more into a weaker path.`
          : `<strong>Continue Forward:</strong> Based purely on forward value (ignoring the ${state.sunkHours}h sunk cost), staying the course remains competitive.`;
      }

      const s1 = slider({ label: 'Already Spent — Sunk Cost（已投入沉没工时）', min: 0, max: 120, unit: 'h', value: state.sunkHours, onChange: (v) => { state.sunkHours = v; update(); } });
      const s2 = slider({ label: 'Remaining Hours Needed（还需投入工时）', min: 5, max: 80, unit: 'h', value: state.remainingHours, onChange: (v) => { state.remainingHours = v; update(); } });
      const s3 = slider({ label: 'Current Path Forward Value（当前路径未来收益）', min: 10, max: 100, value: state.currentExpected, onChange: (v) => { state.currentExpected = v; update(); } });
      const s4 = slider({ label: 'Next-Best Alternative Value（次优替代收益）', min: 10, max: 100, value: state.nextBestValue, onChange: (v) => { state.nextBestValue = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-2' }, s1, s2, s3, s4), h('div', { class: 'ru-grid-2' }, keepM, switchM), verdict);
    }
  );

  // Ch 12 Lab 2: Market Price vs. Human Value & Ethics Filter
  R.register(
    'ch12-value-standard-matrix',
    {
      badge: 'Ch 12 · Judgment Comparator',
      title: 'Value Standard & Ethics Separator（市场价格、能力标准与伦理底线分离器）',
      subtitle: 'Distinguish what a market pays from what carries intrinsic human value or ethical risk.',
    },
    (root, { h }) => {
      const cases = [
        {
          title: 'Low-Paid Caregiving / Teaching',
          trap: 'Collapsing Society → Market Price into Value → Meaning ("low pay = low worth").',
          split: 'Society → Market (price signal) ≠ Value → Meaning / Benefit (human worth).',
          sentence: 'Market compensation measures supply/demand pricing, not the human value of this work.',
        },
        {
          title: 'High-Profit Dark Pattern',
          trap: 'Treating short-term Benefit as sufficient while ignoring Value → Ethics and Risk.',
          split: 'Value → Benefit (revenue) conflicts with Value → Ethics (coercion/harm).',
          sentence: 'Profitable output still fails if it violates our ethical standard and long-term trust.',
        },
        {
          title: 'Busyness Without Standard',
          trap: 'Using Work effort as a substitute for Value → Standard.',
          split: 'Work → Effort ≠ Value → Quality Standard.',
          sentence: 'Effort shows expenditure; acceptance criteria and quality standards show completion.',
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
        const c = cases[idx];
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-danger)' } }, '✗ Collapsed Judgment'), h('div', {}, c.trap)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-accent)' } }, '✓ Clean Value Split'), h('div', { style: { fontWeight: 600 } }, c.split))
        );
        out.innerHTML = `<strong>Callable Sentence:</strong> “${c.sentence}”`;
      }

      render();
      root.append(pills, grid, out);
    }
  );
})(window.RUToys);
