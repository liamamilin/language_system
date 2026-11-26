/* ==========================================================================
   Part 2 Interactive Labs (Chapters 05–06) — Body & Mind
   ========================================================================== */
(function (R) {
  'use strict';

  // Ch 05 Lab 1: Sleep Debt, Hydration & Stress -> Window of Tolerance Simulator
  R.register(
    'ch05-body-energy-sim',
    {
      badge: 'Ch 05 · Real-Time Simulation',
      title: 'Body Operating Base & Window of Tolerance Simulator（身体底盘与耐受窗口模拟）',
      subtitle: 'Adjust sleep, hydration, and stress load to observe real-time Mental Energy and Window of Tolerance status.',
    },
    (root, { h, slider, meter }) => {
      const state = { sleep: 6.5, hydration: 60, stress: 55 };
      const energyM = meter({ label: 'Mental Energy（脑力容量）', value: 64, tone: 'accent' });
      const windowM = meter({ label: 'Window of Tolerance Margin（耐受窗口余量）', value: 58, tone: 'teal' });
      const status = h('div', { class: 'ru-callout' });

      function update() {
        const sleepScore = Math.min(100, Math.max(10, (state.sleep - 3.5) * 20));
        const mental = Math.round(Math.max(8, Math.min(100, sleepScore * 0.55 + state.hydration * 0.25 + (100 - state.stress) * 0.2)));
        const margin = Math.round(Math.max(5, Math.min(100, (100 - state.stress) * 0.55 + sleepScore * 0.3 + state.hydration * 0.15)));
        energyM.update(mental, mental >= 65 ? 'success' : mental >= 40 ? 'warn' : 'danger');
        windowM.update(margin, margin >= 60 ? 'success' : margin >= 35 ? 'warn' : 'danger');

        let label, tone, sentence;
        if (margin < 35) {
          label = 'Outside Window of Tolerance（超出耐受窗口）';
          tone = 'danger';
          sentence = 'Regulation before problem-solving: pause complex decisions, hydrate, lower load, and repay sleep debt.';
        } else if (mental < 55) {
          label = 'Depleted Operating Base（底盘低电量）';
          tone = 'warn';
          sentence = 'My low output is a Body → Energy / Sleep Debt signal, not a character flaw. Switch to low-load tasks.';
        } else {
          label = 'Stable Operating Base（稳定运行区间）';
          tone = 'success';
          sentence = 'Physical capacity supports deep Mind and Work execution.';
        }
        status.className = `ru-callout tone-${tone}`;
        status.innerHTML = `<strong>${label}</strong><br/>${sentence}`;
      }

      const s1 = slider({ label: 'Restorative Sleep（有效睡眠）', min: 4, max: 9, step: 0.5, value: state.sleep, unit: 'h', onChange: (v) => { state.sleep = v; update(); } });
      const s2 = slider({ label: 'Hydration & Nutrition（水分与营养）', min: 10, max: 100, value: state.hydration, unit: '%', onChange: (v) => { state.hydration = v; update(); } });
      const s3 = slider({ label: 'Acute Stress Load（压力激活水平）', min: 0, max: 100, value: state.stress, unit: '%', onChange: (v) => { state.stress = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, energyM, windowM), status);
    }
  );

  // Ch 05 Lab 2: Body Misplacement Detector
  R.register(
    'ch05-body-misplacement-lab',
    {
      badge: 'Ch 05 · Strategy Comparator',
      title: 'Body Misplacement Rewriter（身体错置语言改写器）',
      subtitle: 'Compare moral self-blame against accurate Body placement and next actions.',
    },
    (root, { h }) => {
      const items = [
        { raw: '"I am lazy today."', bad: 'Mind → Motivation / Moral blame', good: 'Body → Energy → Physical / Mental Energy', action: 'Check sleep debt, eat protein, take a 15-min walk before judging willpower.' },
        { raw: '"I have no discipline after lunch."', bad: 'Value → Standard / Character flaw', good: 'Body → Sleep → Sleep Debt + Diet → Nutrition', action: 'Stop masking sleep debt with caffeine; schedule low-cognitive tasks in the afternoon.' },
        { raw: '"I am overreacting to tiny noises."', bad: 'Mind → Emotion (Personal flaw)', good: 'Body → Sensation → Sensory Threshold', action: 'Recognize shifted threshold due to fatigue; reduce ambient noise and rest.' },
        { raw: '"I should push through this neck ache."', bad: 'Work → Productivity (Endurance test)', good: 'Body → Fatigue & Pain → Pain Signal', action: 'Stop, inspect posture/ergonomics, and seek medical advice if persistent.' },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const cmp = h('div', { class: 'ru-grid-2' });
      const act = h('div', { class: 'ru-callout tone-success' });

      function render() {
        pills.innerHTML = '';
        items.forEach((it, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, it.raw));
        });
        const cur = items[idx];
        cmp.innerHTML = '';
        cmp.append(
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-danger)' } }, '✗ Misplaced Reading'), h('div', {}, cur.bad)),
          h('div', { class: 'ru-panel' }, h('h5', { style: { color: 'var(--toy-success)' } }, '✓ Accurate Body Placement'), h('div', { style: { fontWeight: 700 } }, cur.good))
        );
        act.innerHTML = `<strong>Next Move:</strong> ${cur.action}`;
      }

      render();
      root.append(pills, cmp, act);
    }
  );

  // Ch 06 Lab 1: Attention Residue & Cognitive Load Simulator
  R.register(
    'ch06-attention-residue-sim',
    {
      badge: 'Ch 06 · Real-Time Simulation',
      title: 'Attention Residue & Context-Switch Simulator（注意力残留与切换损耗模拟）',
      subtitle: 'Adjust hourly task switches and open loops to see how much usable working memory remains.',
    },
    (root, { h, slider, meter }) => {
      const state = { switches: 6, openLoops: 4, taskComplexity: 70 };
      const usableM = meter({ label: 'Usable Focus Capacity（有效专注容量）', value: 46, tone: 'warn' });
      const residueM = meter({ label: 'Attention Residue Load（注意力残留占用）', value: 54, tone: 'danger' });
      const note = h('div', { class: 'ru-callout' });

      function update() {
        const residue = Math.min(92, Math.round(state.switches * 6.5 + state.openLoops * 4.5));
        const usable = Math.max(8, 100 - residue);
        const overload = state.taskComplexity > usable;
        usableM.update(usable, usable >= 65 ? 'success' : usable >= 40 ? 'warn' : 'danger');
        residueM.update(residue, residue <= 30 ? 'success' : residue <= 55 ? 'warn' : 'danger');
        note.className = `ru-callout tone-${overload ? 'danger' : 'success'}`;
        note.innerHTML = overload
          ? `<strong>Cognitive Overload（认知过载）:</strong> Task requires ${state.taskComplexity}% capacity, but only ${usable}% remains after residue. Close open loops or batch switches before blaming motivation.`
          : `<strong>Sustainable Focus（可控区间）:</strong> ${usable}% usable focus covers the ${state.taskComplexity}% task demand.`;
      }

      const s1 = slider({ label: 'Task Switches / Hour（每小时切换次数）', min: 0, max: 14, value: state.switches, onChange: (v) => { state.switches = v; update(); } });
      const s2 = slider({ label: 'Unclosed Open Loops（未关闭待办）', min: 0, max: 10, value: state.openLoops, onChange: (v) => { state.openLoops = v; update(); } });
      const s3 = slider({ label: 'Target Task Complexity（目标任务复杂度）', min: 20, max: 95, unit: '%', value: state.taskComplexity, onChange: (v) => { state.taskComplexity = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, usableM, residueM), note);
    }
  );

  // Ch 06 Lab 2: Mind Processing Chain Debugger
  R.register(
    'ch06-mind-appraisal-lab',
    {
      badge: 'Ch 06 · Single-Step Debugger',
      title: 'Mind Processing Chain Debugger（心智加工链单步调试器）',
      subtitle: 'Walk step by step from raw Perception to Self-Narrative to locate where distortion entered.',
    },
    (root, { h }) => {
      const stages = [
        { name: '1. Perception', raw: 'Colleague gave a 2-line reply to my long proposal.', container: 'Mind → Perception → Cue', fix: 'Separate observable fact from assumed tone.' },
        { name: '2. Appraisal / Belief', raw: '"They think my work is sloppy."', container: 'Mind → Cognition → Cognitive Bias', fix: 'Treat this as a hypothesis, not a fact.' },
        { name: '3. Emotion', raw: 'Tight chest, defensiveness, urge to withdraw.', container: 'Mind → Emotion → Emotional Regulation', fix: 'Name the emotion before drafting a reply.' },
        { name: '4. Self-Narrative', raw: '"I always fail when presenting new ideas."', container: 'Mind → Self → Self-Narrative', fix: 'Interrupt global identity generalization; ask one clarifying question instead.' },
      ];
      let step = 0;
      const dots = h('div', { class: 'ru-step-dots' });
      const box = h('div', { class: 'ru-panel' });
      const controls = h('div', { class: 'ru-row' });

      function render() {
        dots.innerHTML = '';
        stages.forEach((st, i) => {
          dots.appendChild(h('button', {
            type: 'button',
            class: `ru-step-dot ${i === step ? 'is-current' : i < step ? 'is-done' : ''}`,
            onClick: () => { step = i; render(); },
          }, st.name));
        });
        const cur = stages[step];
        box.innerHTML = '';
        box.append(
          h('h5', {}, `${cur.name}  ·  ${cur.container}`),
          h('p', { style: { margin: '0.3rem 0' } }, `Observed / Inner Event: ${cur.raw}`),
          h('div', { class: 'ru-callout tone-success' }, `Placement Intervention: ${cur.fix}`)
        );
        controls.innerHTML = '';
        controls.append(
          h('button', { type: 'button', class: 'ru-btn ru-btn-sm', disabled: step === 0, onClick: () => { step -= 1; render(); } }, '← Back'),
          h('button', { type: 'button', class: 'ru-btn ru-btn-primary ru-btn-sm', disabled: step === stages.length - 1, onClick: () => { step += 1; render(); } }, 'Next Stage →')
        );
      }

      render();
      root.append(dots, box, controls);
    }
  );
})(window.RUToys);
