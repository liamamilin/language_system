---
name: book-writing
description: 写书、继续写下一章、基于 content.md 自动写作 Quarto 书籍。中文技术书写作，关键术语补充英文。使用场景：用户说"写书""继续写""写下一章""写作""写完整本书""bootstrap""初始化"时自动触发。读取 content.md 目录蓝图，按章节自动生成 .qmd 文件。
---

# Book Writing Skill

通用写书方法论。适用于任何基于 Quarto 的书籍项目。

本 skill 的目标不是机械填充章节，而是根据 `content.md` 的目录蓝图、`book-principles.md` 的写作原则、`writing-state.md` 的进度状态，持续生成一本文风统一、结构稳定、服务读者真实增益的书。

---

## 适用书籍类型

本 skill 默认适用于以下类型：

* 技术书 Technical Book
* 教程 Tutorial
* 实践手册 Practical Manual
* 方法论书 Methodology Book
* 认知体系书 Cognitive System Book
* 个人能力书 Personal Capability Book
* 写作/学习/思考训练书 Training Book
* 产品/项目/系统设计书 System Design Book
* 宣言式书籍 Manifesto-style Book
* 长文集 / 结构化文章集 Essay Collection

不同书籍类型的具体写法由 `book-principles.md` 决定。
如果 `book-principles.md` 没有明确指定，则采用本 skill 的通用原则。

---

## 前置条件

* `content.md`：目录蓝图。记录 Part、Chapter、章节说明、写作目标。
* `book-principles.md`：本书特化写作原则。可选，但强烈建议存在。
* `writing-state.md`：写作进度。由本 skill 自动创建和维护。
* `chapter-{NN}-{slug}.qmd`：章节文件。由 continue 模式自动创建。
* `_quarto.yml`：Quarto 书籍配置文件。由 bootstrap/init/package 模式创建或补全。
* `references.bib`：参考文献文件。可为空。

---

## 核心原则

### 1. 主体增益原则

任何章节都必须服务读者或作者的真实增益。

真实增益包括但不限于：

* 理解更清楚
* 判断更准确
* 行动更有效
* 表达更有力
* 创造更持续
* 系统更稳定
* 能力边界更大

如果某段内容不能帮助读者更好地理解、判断、行动、表达、创造或构建系统，就不应进入正文主线。

---

### 2. 目标读者原则

每本书都必须明确目标读者。

写作时始终回答：

* 这本书写给谁？
* 读者现在卡在哪里？
* 读者读完这一章后应该获得什么？
* 读者能拿这章内容做什么？

不得写成对所有人都“可能有用”的泛泛内容。

---

### 3. 问题驱动原则

每章以真实问题、真实困惑、真实任务或真实场景开头。

不要用“本章介绍……”作为首句。

优先使用：

* 读者遇到的困惑
* 当前能力缺口
* 现实任务压力
* 概念混乱
* 系统设计困难
* 学习或行动中的阻塞点

---

### 4. 不写百科原则

本 skill 不追求覆盖所有知识。

每章必须围绕本章目标展开，而不是把相关概念全部罗列出来。

禁止写成：

* 概念百科
* 学科综述
* 术语堆叠
* 历史沿革堆叠
* 大而空的理论说明

除非 `book-principles.md` 明确要求，否则不做百科式覆盖。

---

### 5. 结构产物原则

每章都应该产出某种结构性成果。

根据书籍类型不同，章节产物可以是：

* 判断框架
* 操作流程
* 概念结构
* 分类表
* 训练方法
* 实践步骤
* 系统模型
* 写作模板
* 检查清单
* 设计规范
* 示例方案
* 可执行动作

读者读完后，应知道自己获得了什么。

---

### 6. 上下文充分原则

不要只提出概念，而不解释上下文。

每个重要概念都需要说明：

* 它是什么
* 它解决什么问题
* 它为什么在本书中重要
* 它和前后内容有什么关系
* 它如何被读者使用
* 它的边界是什么

---

### 7. 动作化原则

尽量把抽象判断转化为可执行动作、转换步骤、结构产物和修正方法。

避免大量使用问题清单作为主体内容。

可以使用少量检查问题，但最终必须转化为：

* 动作
* 规则
* 步骤
* 模板
* 产物
* 修正方式

---

### 8. 一致性原则

全书必须保持一致：

* 术语一致
* 章节结构一致
* 标题层级一致
* 风格一致
* 目标读者一致
* 核心原则一致
* 目录与正文一致

所有英文术语首次出现时可补充英文，后续保持统一。

---

## 章节结构规范

默认章节结构如下。具体书籍可在 `book-principles.md` 中覆盖或调整。

```text
## 本章要解决的问题
## 背景：为什么这个问题重要
## 核心结构
## 关键概念
## 方法 / 机制 / 操作流程
## 示例
## 常见误区或边界
## 本章产物
## 小结：连接下一章
```

不同书籍类型可使用不同模板。

---

## 可选章节模板

### A. 实践手册型章节

适合教程、工具书、技术书、操作指南。

```text
## 本章要解决的问题
## 使用场景
## 核心概念
## 输入与输出
## 操作流程
## 完整示例
## 常见错误
## 检查标准
## 本章产物
```

---

### B. 方法论型章节

适合学习方法、思维方法、写作方法、工作方法。

```text
## 本章要解决的问题
## 旧方法的问题
## 新方法的核心结构
## 概念解释
## 操作步骤
## 应用示例
## 训练方法
## 修正规则
## 本章产物
```

---

### C. 认知体系型章节

适合概念树、语言树、认知结构、世界模型类书籍。

```text
## 本章要解决的问题
## 本章位置：它在全书结构中的位置
## 核心定义
## 层级结构
## 概念安置规则
## 示例
## 与其他章节的关系
## 使用方法
## 本章产物
```

---

### D. 宣言式 / 思辨型章节

适合主张强烈、观点型、原则型书籍。

```text
## 本章主张
## 为什么这个主张重要
## 反面问题
## 核心论证
## 现实例子
## 行动含义
## 边界与误用
## 本章结论
```

---

### E. 技术书章节

适合编程、工程、AI、系统设计类书籍。

```text
## 本章要解决的问题
## 背景与场景
## 核心概念
## 系统结构
## 输入与输出
## 实现路径
## 完整例子
## 边界与取舍
## 从业者输出
```

---

## 语言规范

* 正文默认使用中文。
* 关键概念首次出现时，可用括号补充英文，例如：可指称单位（Referable Unit, RU）。
* 代码块、配置、文件名、API、工具名、命令行、包名保留英文原样。
* 不要堆砌英文术语。
* 不要把英文术语当作高级感来源。
* 术语翻译必须保持全书一致。
* 语气直接、清楚、务实。
* 根据书籍类型调整语气：

  * 技术书：准确、可执行
  * 方法论书：清楚、动作化
  * 认知体系书：结构稳定、解释充分
  * 宣言式书籍：有力度，但不能空泛
  * 教程：步骤清楚、例子完整

---

## 内容规范

每讲一个重要概念，必须尽量补齐：

* 它是什么
* 它不是什么
* 它解决什么问题
* 它为什么重要
* 它在本书结构中的位置
* 它如何服务读者
* 它如何使用
* 它的边界是什么
* 它和相邻概念有什么区别

每章至少包含一个具体例子。
如果章节是工具型或技术型，必须包含完整例子。
如果章节是理论型或体系型，必须包含概念安置示例或结构化示例。
如果章节是训练型，必须包含训练动作。

---

## 工作模式

### bootstrap

首次初始化 Quarto 书籍骨架。只在项目还没有 `content.md` 时使用。

执行：

1. 如果 `content.md` 不存在，创建空模板，写入 Part / Chapter 示例格式。
2. 如果 `book-principles.md` 不存在，创建模板，包含通用写作原则、目标读者、书籍类型、风格要求。
3. 如果 `writing-state.md` 不存在，创建空状态模板。
4. 如果 `_quarto.yml` 不存在，用模板创建。
5. 如果 `_quarto.yml` 已存在，不覆盖，只补缺失字段。
6. 创建 `index.qmd`，作为 Preface 占位。
7. 创建 `references.qmd`，作为 References 占位。
8. 创建空 `references.bib`。
9. 不写正文。

---

### init

从已有 `content.md` 生成：

* `writing-state.md`
* `book-principles.md` 模板，如果尚不存在
* Chapter Manifest
* 初始 Terminology
* `_quarto.yml` chapters 顺序

不写正文。

---

### continue

最常用模式。

执行：

1. 读取 `writing-state.md`。
2. 找到下一个未完成章节。
3. 读取 `content.md` 中对应章节说明。
4. 读取 `book-principles.md`。
5. 读取已有术语表和前文摘要。
6. 写作该章节 `.qmd` 文件。
7. 做章节自检。
8. 更新 `writing-state.md`。
9. 更新 `_quarto.yml` chapters 顺序。

---

### write-chapter

指定章节写作。

适用于用户明确要求：

* 写第 N 章
* 重写某章
* 写某一 Part
* 写某一节

执行时必须读取：

* `content.md`
* `book-principles.md`
* `writing-state.md`
* 相关前后章节摘要

---

### audit

对照 `content.md` 和实际 `.qmd` 文件检查全书完成度。

输出：

* 已完成章节
* 缺失章节
* 文件名不一致
* `_quarto.yml` 顺序问题
* 标题层级问题
* 术语不一致
* TODO 残留
* 内容偏离原则的问题

---

### principles

按 `book-principles.md` 和本 skill 核心原则逐章审核。

重点检查：

* 是否服务目标读者
* 是否服务主体增益
* 是否偏成百科
* 是否只列概念不解释
* 是否缺少例子
* 是否缺少章节产物
* 是否违反本书特定原则
* 是否和全书结构不一致

---

### polish

统一全书风格与格式。

执行：

* 统一术语
* 清理标题格式
* 去除手动章节序号
* 修正 Quarto 标题层级
* 统一中英文术语写法
* 清理重复句式
* 消除口语残留
* 清理 TODO
* 统一章节开头和结尾风格

---

### package

整理 Quarto 项目，准备构建输出。

执行：

* 确认 `_quarto.yml` 章节顺序
* 补齐元数据
* 检查 `references.bib`
* 检查缺失章节
* 检查 Quarto YAML
* 检查标题层级
* 输出构建前报告

---

## content.md 格式建议

`content.md` 应包含书籍结构。推荐格式：

```markdown
# Book Title

## Book Metadata

- title:
- subtitle:
- author:
- book_type:
- target_reader:
- core_goal:
- writing_style:

## Part 1：总论

### Chapter 1：章节标题

- goal:
- reader_problem:
- key_concepts:
- expected_output:
- notes:

### Chapter 2：章节标题

- goal:
- reader_problem:
- key_concepts:
- expected_output:
- notes:
```

---

## book-principles.md 格式建议

```markdown
# Book Principles

## 1. Book Type

说明本书类型，例如 technical / methodology / manual / cognitive-system / manifesto / tutorial。

## 2. Target Reader

说明目标读者是谁。

## 3. Core Goal

说明本书最终要让读者获得什么能力、结构、理解或产物。

## 4. Core Principles

列出本书特化原则。

## 5. Writing Style

说明语气、节奏、抽象度、例子密度。

## 6. Required Structure

如果每章有固定结构，在这里说明。

## 7. Forbidden Patterns

列出禁止事项，例如不要百科化、不要学术化、不要写问题清单等。

## 8. Terminology

记录关键术语中英文对照。
```

---

## writing-state.md 结构

由 bootstrap 或 init 模式自动创建，包含：

```markdown
# Writing State

## Book Metadata

- title:
- subtitle:
- author:
- book_type:
- target_reader:
- total_parts:
- total_chapters:

## Chapter Manifest

| NN | Part | Chapter Title | File | Status | Notes |
|---|---|---|---|---|---|

## Terminology

| Chinese | English | Abbrev | Notes |
|---|---|---|---|

## Chapter Summaries

| Chapter | Summary | Key Terms | Open Threads |
|---|---|---|---|

## Open Issues

- [ ] issue

## Progress Log

- YYYY-MM-DD:
```

---

## 统一 Quarto YAML 模板

bootstrap 模式下，创建或补全 `_quarto.yml` 时使用以下配置。

标题、日期等占位内容需要用户确认后修改。

```yaml
project:
  type: book

book:
  title: "TODO"
  subtitle: "TODO"
  author: "TODO"
  date: today
  chapters:
    - index.qmd
    - references.qmd
  search: true
  page-navigation: true
  reader-mode: true

bibliography: references.bib

format:
  html:
    theme:
      light: cosmo
      dark: darkly
    toc: true
    toc-depth: 3
    number-sections: true
    code-copy: true
    code-overflow: wrap
    smooth-scroll: true
    anchor-sections: true
    fig-cap-location: bottom
    tbl-cap-location: top
  pdf:
    documentclass: scrreprt
    toc: true
    number-sections: true
    colorlinks: true

editor: visual
```

`_quarto.yml` 处理规则：

* 不存在：按模板创建。
* 已存在：按字段检查，缺失字段用模板补充，已有字段保留不动。
* chapters 列表：bootstrap 阶段只保留 `index.qmd` 和 `references.qmd`。
* init / continue / package 阶段根据 `content.md` 和已生成章节更新 chapters 顺序。
* repo-actions：只有项目配置了 Git remote 或用户提供 repo-url 时才添加。

---

## 质量闸门

每章写完后必须检查：

1. 是否服务目标读者？
2. 是否服务主体增益？
3. 是否解决了本章问题？
4. 是否偏成概念百科？
5. 是否只提出概念但没有解释？
6. 是否给出例子？
7. 是否有章节产物？
8. 是否给出边界或误用提醒？
9. 是否和前后章连续？
10. 英文术语是否与全书一致？
11. 标题层级是否符合 Quarto 规范？
12. 是否出现手动章节序号？
13. 是否违反 `book-principles.md`？

---

## 文件规约

* 章节文件名：`chapter-{NN}-{english-slug}.qmd`
* 每章以 YAML frontmatter 开头：

```yaml
---
title: "中文标题（English Title）"
---
```

* 不在正文中手动写 Chapter 编号。
* Quarto 层级：

  * `#` 通常由 Quarto 章节标题控制，正文中慎用。
  * `##` = 主要小节。
  * `###` = 子小节。
  * `####` = 必要时使用的更细层级。
* 不要跳级使用标题。
* 不要在 body 中写手动章节序号。
* 文件名使用英文 slug，小写，单词用连字符连接。

---

## 默认章节生成流程

continue 或 write-chapter 模式下，执行：

1. 读取 `content.md`，确定章节目标。
2. 读取 `book-principles.md`，确定本书特化原则。
3. 读取 `writing-state.md`，获取术语、进度、前文摘要。
4. 确定章节类型和章节模板。
5. 生成章节正文。
6. 自检质量闸门。
7. 如有明显问题，直接修正。
8. 写入 `.qmd` 文件。
9. 更新 `writing-state.md`。
10. 必要时更新 `_quarto.yml`。

---

## 默认章节长度

除非用户或 `book-principles.md` 另有要求：

* 短章节：1500–2500 中文字
* 标准章节：3000–5000 中文字
* 深入章节：6000–10000 中文字

不要为了凑字数扩写。
不要为了简短而省略关键上下文。

---

## 特殊说明

本 skill 是通用写书 skill。
任何书籍的具体方向都应由 `content.md` 和 `book-principles.md` 决定。

如果 `book-principles.md` 与本 skill 默认规则冲突，优先遵守 `book-principles.md`，但不得违反以下底线：

1. 不制造虚假引用。
2. 不声称已阅读不存在的材料。
3. 不覆盖用户已有文件，除非用户明确要求。
4. 不破坏 Quarto 项目结构。
5. 不脱离章节目标自由发挥。
