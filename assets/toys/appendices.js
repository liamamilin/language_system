/* ==========================================================================
   Appendices Interactive Labs (Appendices A, B, D)
   ========================================================================== */
(function (R) {
  'use strict';

  // Appendix A Lab: Interactive 8x8 RU Tree Search & Group Lookup
  R.register(
    'appa-tree-lookup',
    {
      badge: 'Appendix A · Master Tree Lookup',
      title: 'Interactive 8×8 RU Tree Search（八大主题与 64 分组即时检索）',
      subtitle: 'Filter by keyword across all 8 Themes, 64 Groups, and Domain Languages.',
    },
    (root, { h }) => {
      const data = [
        { theme: 'Body', lang: 'condition, energy, signal, recovery', groups: ['Energy', 'Sleep', 'Diet', 'Movement', 'Health', 'Sensation', 'Stress', 'Fatigue & Pain'] },
        { theme: 'Mind', lang: 'perception, attention, emotion, cognition, self', groups: ['Perception', 'Attention', 'Memory', 'Emotion', 'Desire & Motivation', 'Cognition', 'Learning', 'Self'] },
        { theme: 'Language', lang: 'word, sentence, concept, question, argument, instruction', groups: ['Word & Phrase', 'Sentence', 'Text', 'Concept', 'Question', 'Argument', 'Narrative', 'Instruction'] },
        { theme: 'Work', lang: 'goal, plan, task, method, project, feedback', groups: ['Goal', 'Plan', 'Task', 'Method', 'Project', 'Practice', 'Problem', 'Feedback'] },
        { theme: 'Relationship', lang: 'access, trust, boundary, intimacy, repair, role', groups: ['Connection', 'Trust', 'Boundary', 'Intimacy', 'Cooperation', 'Conflict', 'Influence', 'Relational Role'] },
        { theme: 'Society', lang: 'role, group, organization, institution, market, platform', groups: ['Role', 'Group', 'Organization', 'Institution', 'Market', 'Rule', 'Career', 'Platform Ecology'] },
        { theme: 'Technology', lang: 'tool, software, AI model, data, system, automation, workflow', groups: ['Tool', 'Software', 'AI Model', 'Data', 'System', 'Technology Platform', 'Automation', 'Workflow'] },
        { theme: 'Value', lang: 'importance, benefit, cost, risk, purpose, standard, ethics, meaning', groups: ['Importance', 'Benefit', 'Cost', 'Risk', 'Purpose', 'Standard', 'Ethics', 'Meaning'] },
      ];
      let query = '';
      const input = h('input', {
        class: 'ru-input',
        placeholder: 'Search any Theme, Group, or Domain keyword (e.g., Sleep, Prompt, Market, Ethics)...',
        onInput: (e) => { query = e.target.value.trim().toLowerCase(); render(); },
      });
      const results = h('div', { class: 'ru-grid-2' });

      function render() {
        results.innerHTML = '';
        const matches = data.filter((d) =>
          !query ||
          d.theme.toLowerCase().includes(query) ||
          d.lang.toLowerCase().includes(query) ||
          d.groups.some((g) => g.toLowerCase().includes(query))
        );
        if (!matches.length) {
          results.appendChild(h('div', { class: 'ru-callout tone-warn' }, `No Theme or Group matched "${query}".`));
          return;
        }
        matches.forEach((d) => {
          results.appendChild(h('div', { class: 'ru-panel' },
            h('h5', {}, d.theme),
            h('div', { style: { fontSize: '0.82rem', color: 'var(--toy-muted)', marginBottom: '0.45rem' } }, d.lang),
            h('div', { class: 'ru-row' }, ...d.groups.map((g) => h('span', { class: 'ru-chip' }, g)))
          ));
        });
      }

      render();
      root.append(input, results);
    }
  );

  // Appendix B Lab: Interactive Concept Placement Card Builder + Copy Markdown
  R.register(
    'appb-card-exporter',
    {
      badge: 'Appendix B · Card Generator',
      title: 'Concept Placement Card Builder & Markdown Exporter（概念安置卡生成器）',
      subtitle: 'Fill in a concept and copy a clean Markdown Placement Card directly into your personal notes.',
    },
    (root, { h }) => {
      const state = {
        concept: 'Attention Residue',
        theme: 'Mind',
        group: 'Attention',
        container: 'Attention Residue',
        associated: 'Body → Energy; Work → Task',
        misplacement: 'Treating task-switching fog as ordinary laziness',
        sentence: 'My slow start on task B is attention residue from leaving task A half-open.',
      };
      const out = h('pre', { class: 'ru-pre' });
      const copyBtn = h('button', {
        type: 'button',
        class: 'ru-btn ru-btn-primary ru-btn-sm',
        onClick: () => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(out.textContent);
            copyBtn.textContent = 'Copied ✓';
            setTimeout(() => { copyBtn.textContent = 'Copy Markdown Card'; }, 1500);
          }
        },
      }, 'Copy Markdown Card');

      function update() {
        out.textContent = [
          `### Concept Placement Card: ${state.concept}`,
          `- **Primary Position:** ${state.theme} → ${state.group} → ${state.container}`,
          `- **Associated Positions:** ${state.associated}`,
          `- **Common Misplacement:** ${state.misplacement}`,
          `- **Use Sentence:** ${state.sentence}`,
        ].join('\n');
      }

      const mkField = (label, key) => h('div', { class: 'ru-control' },
        h('label', { class: 'ru-label' }, label),
        h('input', { class: 'ru-input', value: state[key], onInput: (e) => { state[key] = e.target.value; update(); } })
      );

      update();
      root.append(
        h('div', { class: 'ru-grid-3' }, mkField('Concept', 'concept'), mkField('Theme', 'theme'), mkField('Group', 'group')),
        h('div', { class: 'ru-grid-2' }, mkField('Container', 'container'), mkField('Associated Positions', 'associated')),
        h('div', { class: 'ru-grid-2' }, mkField('Common Misplacement', 'misplacement'), mkField('Use Sentence', 'sentence')),
        out,
        h('div', { class: 'ru-row' }, copyBtn)
      );
    }
  );

  // Appendix D Lab: Interactive RU Tree Stress Test Arena
  R.register(
    'appd-stress-test-arena',
    {
      badge: 'Appendix D · Interactive Stress Test',
      title: 'RU Tree Stress Test Arena（RU 树交互式压力测试）',
      subtitle: 'Classify all 8 pressure-test items into their Primary Theme and verify your passing score live.',
    },
    (root, { h, meter }) => {
      const themes = ['Body', 'Mind', 'Language', 'Work', 'Relationship', 'Society', 'Technology', 'Value'];
      const items = [
        { q: 'sleep debt', ans: 'Body' },
        { q: 'cognitive bias', ans: 'Mind' },
        { q: 'definition', ans: 'Language' },
        { q: 'milestone', ans: 'Work' },
        { q: 'trust repair', ans: 'Relationship' },
        { q: 'labor market', ans: 'Society' },
        { q: 'data pipeline', ans: 'Technology' },
        { q: 'sunk cost', ans: 'Value' },
      ];
      const picks = new Array(items.length).fill('');
      const scoreM = meter({ label: 'Stress Test Accuracy（压力测试准确率）', value: 0, tone: 'accent' });
      const grid = h('div', { class: 'ru-grid-2' });
      const status = h('div', { class: 'ru-callout' });

      function update() {
        let correct = 0;
        let answered = 0;
        picks.forEach((p, i) => {
          if (p) answered += 1;
          if (p === items[i].ans) correct += 1;
        });
        const pct = Math.round((correct / items.length) * 100);
        scoreM.update(pct, pct === 100 ? 'success' : pct >= 60 ? 'warn' : 'accent');
        status.className = `ru-callout tone-${pct === 100 ? 'success' : answered === items.length ? 'warn' : 'accent'}`;
        status.innerHTML = pct === 100
          ? '<strong>Stress Test Passed (8/8)!</strong> Your primary Theme recognition is fast and clean.'
          : `Answered ${answered}/8 · Correct ${correct}/8. Select the Primary Theme for each item above.`;
      }

      items.forEach((it, i) => {
        const sel = h('select', {
          class: 'ru-select',
          onChange: (e) => { picks[i] = e.target.value; update(); },
        }, h('option', { value: '' }, '— Choose Primary Theme —'), ...themes.map((t) => h('option', { value: t }, t)));
        grid.appendChild(h('div', { class: 'ru-control' }, h('label', { class: 'ru-label' }, `${i + 1}. ${it.q}`), sel));
      });

      update();
      root.append(grid, scoreM, status);
    }
  );
})(window.RUToys);
