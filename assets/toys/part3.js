/* ==========================================================================
   Part 3 Interactive Labs (Chapters 07–08) — Language & Work
   ========================================================================== */
(function (R) {
  'use strict';

  // Ch 07 Lab 1: Claim / Evidence / Counterargument Debugger
  R.register(
    'ch07-claim-evidence-lab',
    {
      badge: 'Ch 07 · Argument Debugger',
      title: 'Claim vs. Evidence & Counterargument Inspector（主张、证据与反例检验器）',
      subtitle: 'Inspect statements to separate fluent rhetoric from testable claims and evidence.',
    },
    (root, { h }) => {
      const samples = [
        {
          title: 'Fluent Opinion',
          text: '"Everyone on my feed switched to Tool X, so our team is falling behind."',
          claim: 'Our team is falling behind by not adopting Tool X.',
          evidence: 'None — relies on Social Proof (Relationship → Influence), not operational evidence.',
          counter: 'What measurable workflow bottleneck does Tool X actually remove for us?',
          tone: 'warn',
        },
        {
          title: 'Testably Framed Claim',
          text: '"Splitting weekly review into 15-minute checklists cut missed deadlines from 4 to 1 over 4 weeks."',
          claim: 'Short checklist reviews reduced missed deadlines.',
          evidence: '4-week before/after count (4 → 1).',
          counter: 'Did project complexity also drop during those 4 weeks?',
          tone: 'success',
        },
        {
          title: 'Conflated Definition',
          text: '"We need better alignment and higher quality immediately."',
          claim: 'Unclear — "alignment" and "quality" lack operational definitions.',
          evidence: 'Missing — cannot verify what is not defined.',
          counter: 'Define one acceptance criterion and one owner before demanding action.',
          tone: 'danger',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const grid = h('div', { class: 'ru-grid-3' });
      const quote = h('div', { class: 'ru-callout' });

      function render() {
        pills.innerHTML = '';
        samples.forEach((s, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, s.title));
        });
        const cur = samples[idx];
        quote.className = `ru-callout tone-${cur.tone}`;
        quote.textContent = cur.text;
        grid.innerHTML = '';
        grid.append(
          h('div', { class: 'ru-panel' }, h('h5', {}, 'Claim（主张）'), h('div', {}, cur.claim)),
          h('div', { class: 'ru-panel' }, h('h5', {}, 'Evidence（证据）'), h('div', {}, cur.evidence)),
          h('div', { class: 'ru-panel' }, h('h5', {}, 'Diagnostic Question（检验问题）'), h('div', {}, cur.counter))
        );
      }

      render();
      root.append(pills, quote, grid);
    }
  );

  // Ch 07 Lab 2: Instruction & Prompt Precision Comparator
  R.register(
    'ch07-prompt-precision-lab',
    {
      badge: 'Ch 07 · Instruction Builder',
      title: 'Prompt & Instruction Precision Builder（指令清晰度对比实验）',
      subtitle: 'Toggle instruction components to watch an ambiguous request become a verifiable instruction.',
    },
    (root, { h, meter }) => {
      const toggles = [
        { label: 'Audience & Context（受众与语境）', text: 'For a non-technical project stakeholder,' },
        { label: 'Concrete Deliverable（具体产出格式）', text: 'write a 3-bullet status brief' },
        { label: 'Explicit Constraints（约束边界）', text: 'under 120 words, without internal jargon,' },
        { label: 'Acceptance Criteria（验收标准）', text: 'ending with 1 clear decision needed by Friday.' },
      ];
      const on = [true, true, false, false];
      const m = meter({ label: 'Instruction Executability（可执行清晰度）', value: 50, tone: 'warn' });
      const out = h('pre', { class: 'ru-pre' });
      const list = h('div', { class: 'ru-grid-2' });

      function update() {
        const count = on.filter(Boolean).length;
        const score = count * 25;
        m.update(score, score >= 75 ? 'success' : score >= 50 ? 'warn' : 'danger');
        const parts = toggles.filter((_, i) => on[i]).map((t) => t.text);
        out.textContent = parts.length
          ? parts.join(' ')
          : '"Help me write an update." (Vague — forces guessing at every step)';
      }

      toggles.forEach((t, i) => {
        const cb = h('input', {
          type: 'checkbox',
          checked: on[i],
          onChange: (e) => { on[i] = e.target.checked; update(); },
        });
        list.appendChild(h('label', { class: 'ru-check-row' }, cb, h('span', {}, t.label)));
      });

      update();
      root.append(list, m, out);
    }
  );

  // Ch 08 Lab 1: Vague Project -> Single Action Task Splitter
  R.register(
    'ch08-single-action-splitter',
    {
      badge: 'Ch 08 · Execution Debugger',
      title: 'Project → Single Action Task Decomposer（模糊项目拆解为单一行动任务）',
      subtitle: 'Compare a high-friction project label against a bounded milestone, artifact, and 20-minute next move.',
    },
    (root, { h }) => {
      const cases = [
        {
          vague: '"Work on my portfolio"',
          artifact: 'One published case-study page with 3 screenshots',
          milestone: 'Draft 400-word problem/result narrative by Thursday',
          singleAction: 'Open editor and write 3 bullet points listing the before/after metrics (15 min)',
        },
        {
          vague: '"Get better at writing"',
          artifact: '4 edited 500-word essays this month',
          milestone: 'Complete Essay #1 rough draft + 1 revision pass',
          singleAction: 'Write 1 thesis claim and 3 supporting examples on a blank doc (20 min)',
        },
        {
          vague: '"Fix team communication"',
          artifact: 'Shared weekly async update template',
          milestone: 'Pilot template for 2 consecutive Fridays',
          singleAction: 'Draft 4 template fields (Done, Blocked, Next, Decision Needed) and share in chat (10 min)',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const cards = h('div', { class: 'ru-grid-3' });

      function render() {
        pills.innerHTML = '';
        cases.forEach((c, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, c.vague));
        });
        const c = cases[idx];
        cards.innerHTML = '';
        cards.append(
          h('div', { class: 'ru-panel' }, h('h5', {}, 'Artifact（可交付物）'), h('div', {}, c.artifact)),
          h('div', { class: 'ru-panel' }, h('h5', {}, 'Milestone（里程碑）'), h('div', {}, c.milestone)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-success)' } }, 'Single Action Task（下一步）'), h('div', { style: { fontWeight: 600 } }, c.singleAction))
        );
      }

      render();
      root.append(pills, cards);
    }
  );

  // Ch 08 Lab 2: Feedback Loop Cadence Simulator
  R.register(
    'ch08-feedback-loop-sim',
    {
      badge: 'Ch 08 · Iteration Simulator',
      title: 'Feedback Loop Cadence & Learning Velocity Simulator（反馈回路周期模拟）',
      subtitle: 'Tune cycle length and acceptance-criteria clarity to see how fast a skill or project compounds.',
    },
    (root, { h, slider, meter }) => {
      const state = { cycleDays: 7, criteriaClarity: 70, reflectionRate: 65 };
      const velM = meter({ label: '30-Day Learning Velocity（30 天迭代速度）', value: 65, tone: 'teal' });
      const driftM = meter({ label: 'Wasted Effort / Drift Risk（返工漂移风险）', value: 30, tone: 'warn' });
      const out = h('div', { class: 'ru-callout' });

      function update() {
        const cycles = Math.max(1, Math.floor(30 / state.cycleDays));
        const qualityFactor = (state.criteriaClarity * 0.55 + state.reflectionRate * 0.45) / 100;
        const velocity = Math.min(100, Math.round(Math.log2(cycles + 1) * 28 * qualityFactor + 12));
        const drift = Math.max(5, Math.min(95, Math.round((state.cycleDays * 2.5) + (100 - state.criteriaClarity) * 0.55 - state.reflectionRate * 0.2)));
        velM.update(velocity, velocity >= 65 ? 'success' : velocity >= 40 ? 'warn' : 'danger');
        driftM.update(drift, drift <= 30 ? 'success' : drift <= 55 ? 'warn' : 'danger');
        out.className = `ru-callout tone-${velocity >= 65 ? 'success' : 'warn'}`;
        out.innerHTML = `<strong>${cycles} feedback cycles / month:</strong> Shortening the loop without clear acceptance criteria creates noise; pairing short cycles with explicit criteria compounds skill.`;
      }

      const s1 = slider({ label: 'Feedback Cycle Length（反馈周期）', min: 1, max: 30, value: state.cycleDays, unit: ' days', onChange: (v) => { state.cycleDays = v; update(); } });
      const s2 = slider({ label: 'Acceptance Criteria Clarity（验收标准清晰度）', min: 10, max: 100, value: state.criteriaClarity, unit: '%', onChange: (v) => { state.criteriaClarity = v; update(); } });
      const s3 = slider({ label: 'Output-to-Input Revision（复盘回流率）', min: 10, max: 100, value: state.reflectionRate, unit: '%', onChange: (v) => { state.reflectionRate = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, velM, driftM), out);
    }
  );
})(window.RUToys);
