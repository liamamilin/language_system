/* ==========================================================================
   Part 1 Interactive Labs (Chapters 01–04) — Method & Map
   ========================================================================== */
(function (R) {
  'use strict';

  // Ch 01 Lab 1: 4-Question Subject Gain Screening Calculator
  R.register(
    'ch01-gain-filter',
    {
      badge: 'Ch 01 · Screening Simulator',
      title: 'Subject Gain 4-Question Filter（主体增益四问筛查器）',
      subtitle: 'Test a candidate concept against the four screening questions to route it to Core Tree, Temporary Shelf, or External Knowledge.',
    },
    (root, { h, meter }) => {
      const presets = [
        { name: 'Attention Residue（注意力残留）', checks: [true, true, true, true], gain: 'Understanding + Regulation' },
        { name: 'Opportunity Cost（机会成本）', checks: [true, true, true, true], gain: 'Judgment + Action' },
        { name: 'Obscure Baroque Taxonomic Term', checks: [false, false, false, false], gain: 'External reference only' },
        { name: 'Emerging AI Agent Protocol', checks: [true, false, false, true], gain: 'Promising — watch in Temporary Shelf' },
      ];
      const questions = [
        '1. Does it clarify a problem I repeatedly meet?',
        '2. Does it make a sharper distinction than my current language?',
        '3. Does it change how I act, speak, or judge?',
        '4. Am I likely to call this concept again soon?',
      ];
      const state = { concept: presets[0].name, checks: [...presets[0].checks] };
      const scoreMeter = meter({ label: 'Subject Gain Score', value: 100, max: 100, tone: 'success' });
      const input = h('input', {
        class: 'ru-input',
        value: state.concept,
        placeholder: 'Type any concept (e.g., Sunk Cost, Window of Tolerance)...',
        onInput: (e) => { state.concept = e.target.value; update(); },
      });
      const checksWrap = h('div', { class: 'ru-grid-2' });
      const verdict = h('div', { class: 'ru-callout tone-success' });

      function update() {
        const score = state.checks.filter(Boolean).length;
        const pct = Math.round((score / 4) * 100);
        let route, tone, advice;
        if (score >= 3) {
          route = 'Core RU Tree（核心系统）';
          tone = 'success';
          advice = `Assign "${state.concept || 'this concept'}" a stable Primary Theme → Group → Container and write one callable Use Sentence.`;
        } else if (score >= 1) {
          route = 'Temporary Shelf（暂存观察）';
          tone = 'warn';
          advice = `Keep "${state.concept || 'this concept'}" in a light note. Promote it to a stable Container only if real life calls for it repeatedly.`;
        } else {
          route = 'External Knowledge（外部知识）';
          tone = 'danger';
          advice = `Do not add "${state.concept || 'this concept'}" to the core tree—avoid warehouse bloat. Look it up on demand.`;
        }
        scoreMeter.update(pct, tone);
        verdict.className = `ru-callout tone-${tone}`;
        verdict.innerHTML = `<strong>Route: ${route}</strong> (${score}/4 Yes)<br/>${advice}`;
      }

      const presetRow = h('div', { class: 'ru-row' },
        h('span', { class: 'ru-label' }, 'Presets:'),
        ...presets.map((p) =>
          h('button', {
            type: 'button',
            class: 'ru-btn ru-btn-sm',
            onClick: () => {
              state.concept = p.name;
              state.checks = [...p.checks];
              input.value = p.name;
              renderChecks();
              update();
            },
          }, p.name.split('（')[0])
        )
      );

      function renderChecks() {
        checksWrap.innerHTML = '';
        questions.forEach((q, idx) => {
          const cb = h('input', {
            type: 'checkbox',
            checked: state.checks[idx],
            onChange: (e) => { state.checks[idx] = e.target.checked; update(); },
          });
          checksWrap.appendChild(h('label', { class: 'ru-check-row' }, cb, h('span', {}, q)));
        });
      }

      renderChecks();
      update();
      root.append(presetRow, input, checksWrap, scoreMeter, verdict);
    }
  );

  // Ch 01 Lab 2: Warehouse vs. Runtime Tree Parameter Simulator
  R.register(
    'ch01-gain-radar',
    {
      badge: 'Ch 01 · Parameter Simulation',
      title: 'Warehouse vs. Callable Tree Simulator（仓库化与可调用度模拟）',
      subtitle: 'Tune selectivity and review cadence to see how unscreened concepts degrade recall speed.',
    },
    (root, { h, slider, meter }) => {
      const state = { intake: 25, filterStrictness: 70, sentencePractice: 60 };
      const recallMeter = meter({ label: 'Real-Time Callability（可调用度）', value: 78, tone: 'success' });
      const bloatMeter = meter({ label: 'Warehouse Bloat Risk（仓库膨胀风险）', value: 22, tone: 'warn' });
      const summary = h('div', { class: 'ru-callout' });

      function update() {
        const stored = Math.max(4, Math.round(state.intake * (1 - state.filterStrictness / 115)));
        const bloat = Math.min(100, Math.max(5, Math.round((stored / 22) * 85 - state.sentencePractice * 0.25)));
        const recall = Math.min(98, Math.max(12, Math.round(state.filterStrictness * 0.48 + state.sentencePractice * 0.55 - bloat * 0.38)));
        recallMeter.update(recall, recall >= 70 ? 'success' : recall >= 45 ? 'warn' : 'danger');
        bloatMeter.update(bloat, bloat <= 30 ? 'success' : bloat <= 60 ? 'warn' : 'danger');
        let mode = 'Balanced Runtime Tree';
        let tone = 'success';
        if (state.filterStrictness < 35) { mode = 'Over-Inclusive Warehouse（过度收录仓库）'; tone = 'danger'; }
        else if (state.filterStrictness > 92 && state.intake < 10) { mode = 'Over-Narrow Filter（过窄过滤，削弱想象力）'; tone = 'warn'; }
        summary.className = `ru-callout tone-${tone}`;
        summary.innerHTML = `<strong>System State: ${mode}</strong> · ~${stored} concepts/month enter Core Tree. High callability comes from strict screening paired with Use Sentence practice.`;
      }

      const s1 = slider({ label: 'Monthly Concept Intake（每月接触新概念）', min: 5, max: 60, value: state.intake, onChange: (v) => { state.intake = v; update(); } });
      const s2 = slider({ label: 'Subject Gain Filter Strictness（过滤严格度）', min: 0, max: 100, unit: '%', value: state.filterStrictness, onChange: (v) => { state.filterStrictness = v; update(); } });
      const s3 = slider({ label: 'Weekly Use-Sentence Practice（造句调用练习）', min: 0, max: 100, unit: '%', value: state.sentencePractice, onChange: (v) => { state.sentencePractice = v; update(); } });

      update();
      root.append(h('div', { class: 'ru-grid-3' }, s1, s2, s3), h('div', { class: 'ru-grid-2' }, recallMeter, bloatMeter), summary);
    }
  );

  // Ch 02 Lab 1: Interactive 5-Test RU Validator
  R.register(
    'ch02-ru-five-tests',
    {
      badge: 'Ch 02 · Interactive Debugger',
      title: 'Five-Test RU Validator（可指称单位五项检测器）',
      subtitle: 'Compare raw vocabulary against true Referable Units across all five tests.',
    },
    (root, { h }) => {
      const cases = [
        {
          label: '"better" (Raw Word)',
          pass: [false, false, false, false, false],
          verdict: 'Fails as an RU — too vague to point to or classify. Upgrade to "Quality Standard（质量标准）".',
          tone: 'danger',
        },
        {
          label: '"stress" (Unplaced Word)',
          pass: [true, false, true, true, false],
          verdict: 'Partial — "stress" is vocabulary until placed as Body → Stress Response, Mind appraisal, or Work load.',
          tone: 'warn',
        },
        {
          label: '"Quality Standard" (True RU)',
          pass: [true, true, true, true, true],
          verdict: 'Strong RU — Primary: Value → Standard. Holds acceptance criteria, rubrics, and ship thresholds.',
          tone: 'success',
        },
        {
          label: '"Feedback Loop" (True RU)',
          pass: [true, true, true, true, true],
          verdict: 'Strong RU — Primary: Work → Feedback; connects to Mind → Learning and Technology → Automation.',
          tone: 'success',
        },
      ];
      const testNames = ['1. Pointable（可指称）', '2. Classifiable（可分类）', '3. Holds Examples（可容纳例子）', '4. Connectable（可关联）', '5. Subject Gain（有主体增益）'];
      let active = 0;
      const btnRow = h('div', { class: 'ru-row' });
      const grid = h('div', { class: 'ru-grid-3' });
      const out = h('div', { class: 'ru-callout' });

      function render() {
        btnRow.innerHTML = '';
        cases.forEach((c, idx) => {
          btnRow.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${idx === active ? 'is-active' : ''}`,
            onClick: () => { active = idx; render(); },
          }, c.label));
        });
        const cur = cases[active];
        grid.innerHTML = '';
        testNames.forEach((name, i) => {
          const ok = cur.pass[i];
          grid.appendChild(h('div', { class: 'ru-panel' },
            h('div', { style: { fontWeight: 700, color: ok ? 'var(--toy-success)' : 'var(--toy-danger)' } }, ok ? '✓ PASS' : '✗ FAIL'),
            h('div', { style: { fontSize: '0.84rem', marginTop: '0.2rem' } }, name)
          ));
        });
        out.className = `ru-callout tone-${cur.tone}`;
        out.textContent = cur.verdict;
      }

      render();
      root.append(btnRow, grid, out);
    }
  );

  // Ch 02 Lab 2: Primary vs. Associated Position & Language Builder
  R.register(
    'ch02-position-splitter',
    {
      badge: 'Ch 02 · Position Comparator',
      title: 'Primary vs. Associated Position Explorer（主位置与关联语言拆解）',
      subtitle: 'Inspect how one RU speaks from a single Primary Position while touching multiple Associated Positions.',
    },
    (root, { h }) => {
      const items = [
        {
          ru: 'Trust Repair（信任修复）',
          primary: 'Relationship → Trust',
          associated: ['Language → Statement', 'Value → Ethics', 'Work → Feedback'],
          verbs: 'acknowledge, repair, verify, rebuild',
          mistake: 'Treating a verbal apology as completed repair.',
          sentence: 'The apology happened, but trust repair still needs repeated behavioral evidence.',
        },
        {
          ru: 'Prompt（提示词）',
          primary: 'Language → Instruction',
          associated: ['Technology → Workflow', 'Work → Task', 'Value → Standard'],
          verbs: 'specify, constrain, iterate, test',
          mistake: 'Blaming the AI model when the instruction lacked acceptance criteria.',
          sentence: 'Before switching models, I should tighten the prompt constraints and output format.',
        },
        {
          ru: 'Sleep Debt（睡眠负债）',
          primary: 'Body → Sleep',
          associated: ['Body → Energy', 'Mind → Attention', 'Work → Task'],
          verbs: 'accumulate, mask, repay, recover',
          mistake: 'Trying to solve sleep debt with caffeine or willpower.',
          sentence: 'My afternoon fog is accumulated sleep debt, not a lack of discipline.',
        },
      ];
      let idx = 0;
      const pills = h('div', { class: 'ru-row' });
      const view = h('div', { class: 'ru-grid-2' });
      const sentenceBox = h('div', { class: 'ru-callout tone-success' });

      function render() {
        pills.innerHTML = '';
        items.forEach((it, i) => {
          pills.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === idx ? 'is-active' : ''}`,
            onClick: () => { idx = i; render(); },
          }, it.ru));
        });
        const cur = items[idx];
        view.innerHTML = '';
        view.append(
          h('div', { class: 'ru-panel' },
            h('h5', {}, 'Primary Position（主位置：它是什么）'),
            h('div', { style: { fontWeight: 700, fontSize: '1rem' } }, cur.primary),
            h('div', { style: { marginTop: '0.5rem', fontSize: '0.84rem', color: 'var(--toy-muted)' } }, `Verbs: ${cur.verbs}`)
          ),
          h('div', { class: 'ru-panel' },
            h('h5', {}, 'Associated Positions（关联位置：它触及什么）'),
            h('div', { class: 'ru-row' }, ...cur.associated.map((a) => h('span', { class: 'ru-chip' }, a))),
            h('div', { style: { marginTop: '0.5rem', fontSize: '0.84rem', color: 'var(--toy-danger)' } }, `Trap prevented: ${cur.mistake}`)
          )
        );
        sentenceBox.innerHTML = `<strong>Callable Use Sentence:</strong> “${cur.sentence}”`;
      }

      render();
      root.append(pills, view, sentenceBox);
    }
  );

  // Ch 03 Lab 1: Four-Layer Zoom Stepper
  R.register(
    'ch03-four-layer-stepper',
    {
      badge: 'Ch 03 · Single-Step Debugger',
      title: 'Four-Layer Zoom Stepper（四层结构单步缩放器）',
      subtitle: 'Step from Layer 1 (Theme) to Layer 4 (Leaf) to observe how each layer turns vague labels into action.',
    },
    (root, { h }) => {
      const steps = [
        {
          layer: 'Layer 1 · Theme',
          path: 'Value',
          sentence: '"This is about Value."',
          clarity: 20,
          note: 'Too broad for action — you know the life domain, but not what kind of judgment to make.',
        },
        {
          layer: 'Layer 2 · Group',
          path: 'Value → Cost',
          sentence: '"This is about Value → Cost."',
          clarity: 48,
          note: 'Narrows to the Cost neighborhood, separating it from Benefit, Risk, or Ethics.',
        },
        {
          layer: 'Layer 3 · Container',
          path: 'Value → Cost → Opportunity Cost',
          sentence: '"This is about Value → Cost → Opportunity Cost."',
          clarity: 82,
          note: 'Operational core! Now you know to evaluate what accepting this option prevents.',
        },
        {
          layer: 'Layer 4 · Leaf',
          path: 'Value → Cost → Opportunity Cost → Weekend Recovery Lost',
          sentence: '"This project has an opportunity cost: it takes the weekend I need for recovery."',
          clarity: 100,
          note: 'Connected to lived reality — ready to drive a concrete decision or boundary.',
        },
      ];
      let cur = 0;
      const dots = h('div', { class: 'ru-step-dots' });
      const panel = h('div', { class: 'ru-panel' });
      const nav = h('div', { class: 'ru-row' });

      function render() {
        dots.innerHTML = '';
        steps.forEach((s, i) => {
          dots.appendChild(h('button', {
            type: 'button',
            class: `ru-step-dot ${i === cur ? 'is-current' : i < cur ? 'is-done' : ''}`,
            onClick: () => { cur = i; render(); },
          }, s.layer));
        });
        const s = steps[cur];
        panel.innerHTML = '';
        panel.append(
          h('h5', {}, `${s.layer} — Actionability ${s.clarity}%`),
          h('div', { style: { fontWeight: 700, marginBottom: '0.4rem' } }, s.path),
          h('div', { class: 'ru-callout tone-success', style: { marginBottom: '0.5rem' } }, s.sentence),
          h('div', { style: { fontSize: '0.86rem', color: 'var(--toy-muted)' } }, s.note)
        );
        nav.innerHTML = '';
        nav.append(
          h('button', { type: 'button', class: 'ru-btn ru-btn-sm', disabled: cur === 0, onClick: () => { cur -= 1; render(); } }, '← Previous Layer'),
          h('button', { type: 'button', class: 'ru-btn ru-btn-primary ru-btn-sm', disabled: cur === steps.length - 1, onClick: () => { cur += 1; render(); } }, 'Zoom Deeper →')
        );
      }

      render();
      root.append(dots, panel, nav);
    }
  );

  // Ch 03 Lab 2: Live Placement Card Studio
  R.register(
    'ch03-placement-card-studio',
    {
      badge: 'Ch 03 · Card Builder',
      title: 'Interactive Placement Card Studio（四层安置卡生成器）',
      subtitle: 'Assemble a four-layer placement card and generate a ready-to-use sentence in real time.',
    },
    (root, { h }) => {
      const state = {
        theme: 'Technology',
        group: 'Workflow',
        container: 'AI Workflow',
        leaf: 'Drafting a report without a human verification step',
        misplacement: 'Treating the AI model as the entire workflow',
      };
      const themes = ['Body', 'Mind', 'Language', 'Work', 'Relationship', 'Society', 'Technology', 'Value'];
      const preview = h('pre', { class: 'ru-pre' });

      function update() {
        preview.textContent = [
          `Primary Position : ${state.theme} → ${state.group} → ${state.container}`,
          `Concrete Leaf    : ${state.leaf}`,
          `Misplacement Risk: ${state.misplacement}`,
          `Callable Output  : This concept belongs first to ${state.theme}, inside ${state.group}, under ${state.container}, with this concrete Leaf: "${state.leaf}".`,
        ].join('\n');
      }

      const selTheme = h('select', { class: 'ru-select', onChange: (e) => { state.theme = e.target.value; update(); } },
        ...themes.map((t) => h('option', { value: t, selected: t === state.theme }, t))
      );
      const inGroup = h('input', { class: 'ru-input', value: state.group, onInput: (e) => { state.group = e.target.value; update(); } });
      const inCont = h('input', { class: 'ru-input', value: state.container, onInput: (e) => { state.container = e.target.value; update(); } });
      const inLeaf = h('input', { class: 'ru-input', value: state.leaf, onInput: (e) => { state.leaf = e.target.value; update(); } });
      const inTrap = h('input', { class: 'ru-input', value: state.misplacement, onInput: (e) => { state.misplacement = e.target.value; update(); } });

      update();
      root.append(
        h('div', { class: 'ru-grid-3' },
          h('div', { class: 'ru-control' }, h('label', { class: 'ru-label' }, 'Theme'), selTheme),
          h('div', { class: 'ru-control' }, h('label', { class: 'ru-label' }, 'Group'), inGroup),
          h('div', { class: 'ru-control' }, h('label', { class: 'ru-label' }, 'Container'), inCont)
        ),
        h('div', { class: 'ru-grid-2' },
          h('div', { class: 'ru-control' }, h('label', { class: 'ru-label' }, 'Concrete Leaf'), inLeaf),
          h('div', { class: 'ru-control' }, h('label', { class: 'ru-label' }, 'Common Misplacement'), inTrap)
        ),
        preview
      );
    }
  );

  // Ch 04 Lab 1: Eight-Theme Pair Explorer
  R.register(
    'ch04-eight-theme-explorer',
    {
      badge: 'Ch 04 · Map Explorer',
      title: 'Eight-Theme Domain Language Switcher（八大主题领域语言切换器）',
      subtitle: 'Click any Theme to inspect its core question, domain vocabulary, and boundary from its pair.',
    },
    (root, { h }) => {
      const themes = [
        { name: 'Body（身体）', pair: 'Body / Mind', lang: 'Condition, energy, signal, recovery', q: 'What physical condition is supporting or limiting the system?', diff: 'Body is physical capacity; Mind is inner processing.' },
        { name: 'Mind（心智）', pair: 'Body / Mind', lang: 'Attention, emotion, belief, memory, decision', q: 'What inner process is shaping perception, feeling, and judgment?', diff: 'Mind interprets signals; Body generates physical capacity.' },
        { name: 'Language（语言）', pair: 'Language / Work', lang: 'Term, statement, question, argument, prompt', q: 'What needs to be named, clarified, argued, or instructed?', diff: 'Language clarifies meaning; Work executes action.' },
        { name: 'Work（工作）', pair: 'Language / Work', lang: 'Goal, task, method, project, feedback, output', q: 'How does intention become executable action and result?', diff: 'Work ships artifacts; Language defines what they mean.' },
        { name: 'Relationship（关系）', pair: 'Relationship / Society', lang: 'Access, trust, boundary, intimacy, repair, role', q: 'What is the live arrangement between specific people?', diff: 'Relationship is interpersonal; Society is structural.' },
        { name: 'Society（社会）', pair: 'Relationship / Society', lang: 'Role, organization, institution, market, rule, platform', q: 'What social structure or incentive is shaping this situation?', diff: 'Society sets rules and markets; Relationship manages personal access.' },
        { name: 'Technology（技术）', pair: 'Technology / Value', lang: 'Tool, software, AI model, data, system, workflow', q: 'What technical object mediates action, and where does it sit?', diff: 'Technology mediates execution; Value defines what is good.' },
        { name: 'Value（价值）', pair: 'Technology / Value', lang: 'Importance, benefit, cost, risk, standard, ethics, meaning', q: 'What matters, according to which standard, at what cost?', diff: 'Value governs standards; Technology provides capability.' },
      ];
      let sel = 0;
      const row = h('div', { class: 'ru-row' });
      const card = h('div', { class: 'ru-panel' });

      function render() {
        row.innerHTML = '';
        themes.forEach((t, i) => {
          row.appendChild(h('button', {
            type: 'button',
            class: `ru-btn ru-btn-sm ${i === sel ? 'is-active' : ''}`,
            onClick: () => { sel = i; render(); },
          }, t.name));
        });
        const t = themes[sel];
        card.innerHTML = '';
        card.append(
          h('h5', {}, `${t.name}  ·  Pair: ${t.pair}`),
          h('p', { style: { margin: '0.25rem 0', fontWeight: 600 } }, `Core Question: ${t.q}`),
          h('p', { style: { margin: '0.25rem 0', fontSize: '0.88rem' } }, `Domain Language: ${t.lang}`),
          h('div', { class: 'ru-callout', style: { marginTop: '0.5rem' } }, `Pair Boundary: ${t.diff}`)
        );
      }

      render();
      root.append(row, card);
    }
  );

  // Ch 04 Lab 2: Multi-Theme Problem Decomposer
  R.register(
    'ch04-multi-theme-decomposer',
    {
      badge: 'Ch 04 · 8-Lens Diagnostic',
      title: 'Multi-Theme Problem Decomposer（“项目推进不了”八维拆解器）',
      subtitle: 'Toggle active symptoms to see which Theme speaks first for a stalled project.',
    },
    (root, { h }) => {
      const lenses = [
        { theme: 'Body', cue: 'Slept < 6h / afternoon crash', move: 'Recover energy and lower cognitive load first.' },
        { theme: 'Mind', cue: 'Fear of judgment / tab-switching spiral', move: 'Regulate emotion and close distracting tabs.' },
        { theme: 'Language', cue: 'Cannot state the deliverable in one sentence', move: 'Write a 1-sentence problem & acceptance definition.' },
        { theme: 'Work', cue: 'No concrete next 20-minute Single Action Task', move: 'Break the milestone into one executable first move.' },
        { theme: 'Relationship', cue: 'Waiting on unstated collaboration expectations', move: 'Clarify role, handoff, and timeline with partner.' },
        { theme: 'Society', cue: 'Conflicting org incentives or platform rules', move: 'Map the institutional constraint before self-blame.' },
        { theme: 'Technology', cue: 'Broken toolchain or noisy AI workflow', move: 'Fix the bottleneck step in the workflow.' },
        { theme: 'Value', cue: 'Unsure if this project is worth the opportunity cost', move: 'Re-rank priority and confirm whether to continue.' },
      ];
      const active = new Set([0, 3]);
      const list = h('div', { class: 'ru-grid-2' });
      const out = h('div', { class: 'ru-callout tone-success' });

      function render() {
        list.innerHTML = '';
        lenses.forEach((l, i) => {
          const cb = h('input', {
            type: 'checkbox',
            checked: active.has(i),
            onChange: (e) => {
              if (e.target.checked) active.add(i); else active.delete(i);
              render();
            },
          });
          list.appendChild(h('label', { class: 'ru-check-row' }, cb, h('span', {}, h('strong', {}, `${l.theme}: `), l.cue)));
        });
        const picked = Array.from(active).sort((a, b) => a - b).map((i) => lenses[i]);
        if (!picked.length) {
          out.className = 'ru-callout tone-warn';
          out.textContent = 'Select at least one active cue to see which Theme speaks first.';
        } else {
          out.className = 'ru-callout tone-success';
          out.innerHTML = `<strong>Primary Theme Speaking First: ${picked[0].theme}</strong> → ${picked[0].move}` +
            (picked.length > 1 ? `<br/><span style="font-size:0.84rem">Secondary active positions: ${picked.slice(1).map((p) => p.theme).join(' · ')}</span>` : '');
        }
      }

      render();
      root.append(list, out);
    }
  );
})(window.RUToys);
