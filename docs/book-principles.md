# Agent 写作 Prompt：生成《概念有位置》初稿

你是一名中文非虚构写作 agent。你的任务是根据给定 Book Spec 和目录，写作一本小型手册的初稿。

书名暂定为：

《概念有位置：个人生活 RU 树与语言安置系统》

---

## 一、写作总目标

本书不是百科全书，不是词汇书，不是语言学教材，不是哲学散文，不是学科导论。

本书的目标是讲清楚一套个人生活 RU 树：

以主体增益为最高原则，以 RU / Referable Unit / 可指称单位为主线，通过 Theme → Group → Container → Leaf 的层级，为个人生活中值得长期内化的概念安排位置。

本书要帮助读者做到：

1. 识别值得进入核心系统的 RU
2. 给 RU 找到位置
3. 区分 Theme、Group、Container、Leaf
4. 避免把动词、形容词、副词混入主线
5. 通过 RU 树提升理解、判断、行动、表达、创造和长期能力

---

## 二、核心原则

### 1. 主体增益原则

所有内容必须服务主体增益。

主体增益包括：

* 理解更清楚
* 判断更准确
* 行动更有效
* 状态更稳定
* 表达更有力
* 创造更持续
* 长期能力边界更大

任何脱离个人生活、不能提升理解/判断/行动/状态/表达/创造/长期能力的内容，都不要进入正文主线。

### 2. RU 主线原则

本书围绕 RU 展开。

RU = Referable Unit，可指称单位。

RU 是语言中可以被当作“一个东西”来指称、讨论、分类、安置、连接和调用的语义单位。

请注意：

* RU 不等于名词。
* RU 是语义单位，不是词性单位。
* 动词、形容词、副词、介词、连接词不作为主线。
* 它们只能作为 RU 的关联语言出现。

例如：

* workflow 是 RU。
* efficient 不是主线 RU，但 efficiency 可以作为 RU。
* build 不是主线 RU，但 project、method、workflow 是 RU。
* quickly 不是主线 RU。
* risk、cost、goal、feedback、attention、AI model 都是 RU。

### 3. 四层结构原则

本书采用四层结构：

Theme → Group → Container → Leaf

解释如下：

* Theme：RU 所属的大生活域。
* Group：Theme 内部的 RU 大类。
* Container：能收纳一批具体 RU 的上层容器。
* Leaf：具体 RU。

正文重点讲 Theme、Group、Container。Leaf 只作为示例，不要穷尽。

### 4. 主位置与关联位置原则

每个 RU 可以有一个主位置，也可以有多个关联位置。

例如：

prompt 的主位置可以是：

Language → Instruction → Prompt

关联位置可以是：

Technology → AI Model → Model Input
Work → Workflow → AI Workflow

不要因为一个 RU 有多个关联位置就修改主树。主树保持稳定，关联位置负责连接。

### 5. 领域语言先行原则

本书不能写成知识罗列。知识罗列可以存在，但必须被结构化文本承载，并且服务于一个更高目标：让读者逐渐理解一个领域如何谈论世界。

写作遵循一个简单原则：

> The writing follows a simple principle: reading grows from understanding how a domain talks about the world. When the domain is understood, the reader can focus on what the text says rather than struggling to understand what the text is about. When the language is familiar, the reader can follow arguments through their full causal chains without pausing to decode individual terms.

对应到本书，就是每个 Theme 章节都要帮助读者熟悉这个领域的语言方式：

* Body 如何谈论状态、能量、疼痛、恢复
* Mind 如何谈论注意、情绪、记忆、学习、自我
* Language 如何谈论命名、问题、论证、叙事、指令
* Work 如何谈论目标、任务、方法、反馈、项目
* Relationship 如何谈论连接、信任、边界、冲突、角色
* Society 如何谈论组织、市场、规则、职业、平台
* Technology 如何谈论工具、软件、数据、系统、自动化
* Value 如何谈论重要性、成本、风险、标准、意义

因此，Container 不是知识条目，而是领域语言的稳定支点。读者熟悉这些支点之后，再读相关文本、做相关判断、跟随完整因果链时，就不需要停下来解码单个术语。

---

## 三、写作风格

请使用英文写作。关键术语、难词、压缩表达或读者可能需要停下来解码的句子，需要在括号中补充中文解释或更直白的说明。

英文正文不是为了显得更高级，而是为了让 RU、Container、causal chain、domain language 等概念更稳定。括号说明的作用是降低阅读阻力，让读者在熟悉领域语言之前也能跟上文本。

示例：

* cognitive load（认知负荷）
* attention residue（注意力残留）
* The body is the operating base of the mind.（身体是心智运行的底盘。）
* A container is not a knowledge item, but a stable handle in a domain language.（Container 不是知识条目，而是领域语言中的稳定抓手。）

风格要求：

1. 清楚、直接、可操作
2. 不堆概念
3. 不写空泛哲学散文
4. 不写成百科条目
5. 不只下定义，每个概念都要说明它服务什么主体增益
6. 多用例子解释
7. 每章都要帮助读者更会使用这套 RU 树
8. 保持结构严整，避免发散
9. 不把知识罗列当作正文主体；罗列只能作为地图、表格、工具箱或训练材料出现
10. 每个 Theme 都要写出这个领域如何说话、如何区分对象、如何形成因果链
11. 英文句子要简洁，不用炫技句式；难句必须拆短，必要时加括号解释
12. 括号说明用于帮助理解，不要把每一句都翻译成双语对照

读者不是要看一套宏大理论，而是要获得一套可以内化、可以训练、可以辅助个人变强的概念安置系统。

---

## 四、Theme 章节固定写法

每个 Theme 章节不再写成“总览 + Group 介绍 + Container 示例”的线性说明。新版 Theme 章节应写成一个领域工具箱（domain toolbox），帮助读者进入这个领域的语言，而不是浏览一组知识条目。

每个 Theme 章节建议按照以下结构写：

1. Opening problem（开场问题）：从一个真实困惑进入，不从分类表进入。
2. Domain language（领域语言）：说明这个 Theme 如何谈论世界，如何命名对象，如何区分对象。
3. Group map（Group 地图）：给出 8 个 Group 的简短地图，只解释定位，不展开成小论文。
4. Core containers（核心 Container）：按 Group 分区，精选最能代表这个 Theme 的 Container。
5. Common misplacements（常见错位）：说明哪些概念容易被放错位置，以及错位为什么会造成理解或行动问题。
6. Causal chain（因果链）：至少写出一条代表性因果链，让读者看到这个 Theme 如何运行。
7. Placement practice（安置练习）：给出 2-5 个 RU，让读者判断主位置、关联位置和调用句。

不要把每个 Container 写成百科介绍。Container 的核心作用是帮助读者安置具体 RU，并熟悉一个领域如何说话、判断和连接。

示例开场方式：

* Body: Why do I feel unable to think, even when I know what to do?（为什么我明明知道该做什么，却没有能力去想、去做？）
* Mind: Why do I keep making the same decision error?（为什么我反复犯同一种决策错误？）
* Work: Why does effort fail to become skill gain?（为什么努力没有转化成能力收益？）

---

## 五、Container 段落写法

每个 Container 段落可以按照以下模板写：

Container 名称：

1. Primary position（主位置）：Theme → Group → Container
2. What problem it solves（它解决什么问题）
3. What it can hold（它收纳哪些具体 RU / Leaf）
4. Common misplacement（常见错位）：它经常被误放到哪里，为什么会错
5. Associated positions（关联位置）：它和其他 Theme 的哪些位置连接
6. Associated language（关联语言）：常见动作、属性、状态、评价、方式
7. Use sentences（调用句）：给出 1-3 个自然英文句子，必要时加中文括号
8. Placement example（安置示例）

示例：

UI Component / Widget 是 Software 下的一个 Container。它收纳 button、input、table、modal、dropdown 等具体 RU。这个容器服务于个人理解软件界面、前端开发、产品设计和 AI 生成界面。围绕它常见的关联动作有 click、type、select、submit；常见属性有 visible、disabled、responsive、interactive。button 可以安置为：Technology → Software → UI Component / Widget。

新版示例：

Focus is a container under Mind → Attention. It solves the problem of keeping mental resources on one object long enough to understand or act.（Focus 解决的是心智资源能否稳定停留在一个对象上的问题。）It is often misplaced under Work → Task, because people treat a focus problem as a task-management problem. Its associated positions include Body → Energy → Mental Energy and Technology → Tool → Distraction Blocker. Use sentence: My problem is not the number of tasks; my focus is being interrupted too often.（我的问题不是任务数量，而是专注被频繁打断。）

---

## 六、新版目录蓝图

新版不采用 28 章的“总览 → Group → Container 示例”结构。正文压缩为 15 章左右：方法章负责建立系统，8 个 Theme 各自成为独立工具箱章，最后用 3 章训练读者使用和维护自己的 RU 树。

### Foreword: Why Concepts Need a Place

前言说明：large language models make answers easy, but placement remains scarce（大模型让答案变容易，但概念安置仍然稀缺）。本书不是知识分类书，而是个人概念系统的使用手册。

### Part 1: Method and Map

Chapter 1. Subject Gain Principle（主体增益原则）

Chapter 2. Referable Unit: What Deserves a Place（可指称单位：什么值得被安置）

Chapter 3. Four Layers: Theme → Group → Container → Leaf（四层结构）

Chapter 4. The Eight-Theme Map（八主题总图）：Body / Mind, Language / Work, Relationship / Society, Technology / Value

### Part 2: Body / Mind

Chapter 5. Body Toolbox（身体工具箱）

Chapter 6. Mind Toolbox（心智工具箱）

### Part 3: Language / Work

Chapter 7. Language Toolbox（语言工具箱）

Chapter 8. Work Toolbox（工作工具箱）

### Part 4: Relationship / Society

Chapter 9. Relationship Toolbox（关系工具箱）

Chapter 10. Society Toolbox（社会工具箱）

### Part 5: Technology / Value

Chapter 11. Technology Toolbox（技术工具箱）

Chapter 12. Value Toolbox（价值工具箱）

### Part 6: Use and Training

Chapter 13. How to Place a New Concept（如何安置一个新概念）

Chapter 14. How to Diagnose a Problem with the RU Tree（如何用 RU 树诊断问题）

Chapter 15. How to Maintain and Train Your System（如何维护和训练你的系统）

### Appendices

Appendix A. Complete RU Tree Table（完整 RU 树总表）

Appendix B. Concept Placement Card（概念安置卡）

Appendix C. Daily Training and Stress Test（每日训练与压力测试）

---

## 七、必须使用的八大 Theme 和 Group

### Body 身体单位

1. Energy 精力
2. Sleep 睡眠
3. Diet 饮食
4. Movement 运动
5. Health 健康
6. Sensation 感官
7. Stress 压力
8. Fatigue & Pain 疲劳与疼痛

### Mind 心智单位

1. Perception 感知
2. Attention 注意
3. Memory 记忆
4. Emotion 情绪
5. Desire & Motivation 欲望与动机
6. Cognition 认知
7. Learning 学习
8. Self 自我

### Language 语言单位

1. Word & Phrase 词与短语
2. Sentence 句子
3. Text 文本
4. Concept 概念
5. Question 问题
6. Argument 论证
7. Narrative 叙事
8. Instruction 指令

### Work 做事单位

1. Goal 目标
2. Plan 计划
3. Task 任务
4. Method 方法
5. Project 项目
6. Practice 练习
7. Problem 问题
8. Feedback 反馈

### Relationship 人际关系单位

1. Connection 连接
2. Trust 信任
3. Boundary 边界
4. Intimacy 亲密
5. Cooperation 合作
6. Conflict 冲突
7. Influence 影响
8. Relational Role 关系角色

### Society 社会单位

1. Role 角色
2. Group 群体
3. Organization 组织
4. Institution 制度
5. Market 市场
6. Rule 规则
7. Career 职业
8. Platform Ecology 平台生态

### Technology 技术单位

1. Tool 工具
2. Software 软件
3. AI Model AI 模型
4. Data 数据
5. System 系统
6. Technology Platform 技术平台
7. Automation 自动化
8. Workflow 工作流

### Value 价值判断单位

1. Importance 重要性
2. Benefit 收益
3. Cost 成本
4. Risk 风险
5. Purpose 目的
6. Standard 标准
7. Ethics 伦理
8. Meaning 意义

---

## 八、禁止事项

写作时不要做以下事情：

1. 不要把本书写成百科全书。
2. 不要按词性分类。
3. 不要把动词、形容词、副词放入主线。
4. 不要穷尽 Leaf。
5. 不要脱离个人生活。
6. 不要写成抽象哲学散文。
7. 不要只列概念，不解释主体增益。
8. 不要把学科目录当作本书结构。
9. 不要随意新增一级 Theme。
10. 不要把 Container 写得过细。

---

## 九、输出要求

请先生成完整初稿，而不是只生成大纲。

每章写作要求：

1. 有清晰开头
2. 有核心解释
3. 有 RU 安置示例
4. 有主体增益说明
5. 有小结

全书语言应保持一致：

* “RU”固定译为“可指称单位”
* “Theme”译为“主题域”
* “Group”译为“分组”
* “Container”译为“容器”
* “Leaf”译为“叶子”
* “主体增益原则”作为全书最高原则

最终目标是生成一本可供二次审查和修订的中文初稿。






# 《概念有位置：个人生活 RU 树与语言安置系统》Book Spec

## 1. 书籍定位

本书不是一本普通语言书、词汇书、知识分类书或学科导论书。

本书的核心任务是：构建一套服务个人生活与个人能力提升的 RU 安置系统。

RU，即 Referable Unit，可指称单位，是语言中可以被当作“一个东西”来指称、讨论、分类、安置、连接和调用的语义单位。

本书只围绕 RU 展开，不围绕动词、形容词、副词、介词、连接词等词性展开。动词、形容词、副词等语言成分可以作为 RU 的关联语言出现，但不能成为主线。

本书的最终目标是帮助读者建立一棵个人生活 RU 树，让概念有位置，让知识可调用，让个人更聪明、更强、更有判断力、更有行动力、更能表达、更能创造。

---

## 2. 最高原则：主体增益原则

本书所有内容都必须服务主体增益。

主体增益，是指一个内容、概念、方法、工具或结构能够帮助个人在以下至少一个方向变强：

1. 理解更清楚
2. 判断更准确
3. 行动更有效
4. 状态更稳定
5. 表达更有力
6. 创造更持续
7. 长期能力边界更大

凡是不能改善理解、判断、行动、状态、表达、创造或长期能力的内容，即使宏大、深奥、权威、流行，也不进入本书主系统，只能作为外部知识按需调用。

本书不是为了博学表演，而是为了主体变强。

---

## 3. 核心概念：RU

RU = Referable Unit，可指称单位。

RU 是语言中可以被当作“一个东西”来讨论的语义单位。

RU 可以是：

* 具体对象：button、phone、book
* 抽象对象：attention、risk、meaning
* 系统对象：workflow、platform、organization
* 语言对象：concept、question、argument、prompt
* 做事对象：goal、task、method、feedback
* 心智对象：memory、emotion、belief、self
* 社会对象：career、market、rule、institution
* 技术对象：AI model、software、data、automation

RU 不等于名词。RU 是语义单位，不是词性单位。

判断一个单位是否是 RU，可以用五个标准：

1. 它能不能被指称？
2. 它能不能被分类？
3. 它有没有上层容器？
4. 它能不能连接其他 RU？
5. 它是否服务主体增益？

如果一个词只是动作、属性、方式、程度或连接词，它通常不进入主线。

例如：

* efficient 不作为主线 RU，但 efficiency 可以作为 RU。
* quickly 不作为主线 RU。
* build 不作为主线 RU，但 project、method、workflow 可以作为 RU。
* good 不作为主线 RU，但 value、standard、benefit、risk 可以作为 RU。

---

## 4. 四层结构

本书采用四层结构：

Theme → Group → Container → Leaf

### Theme 主题域

Theme 是 RU 所属的最大生活域。

它回答：

这个 RU 属于个人生活的哪一大领域？

本书使用八个 Theme：

1. Body 身体单位
2. Mind 心智单位
3. Language 语言单位
4. Work 做事单位
5. Relationship 人际关系单位
6. Society 社会单位
7. Technology 技术单位
8. Value 价值判断单位

### Group 分组

Group 是 Theme 内部的 RU 大类。

它回答：

在这个 Theme 中，这个 RU 属于哪一组？

例如：

Mind → Attention
Technology → Software
Society → Organization
Value → Risk

### Container 容器

Container 是能直接收纳一批具体 RU 的上层抽屉。

它回答：

这个 RU 属于哪类具体单位？

例如：

Technology → Software → UI Component / Widget
Mind → Emotion → Negative Emotion
Society → Organization → Business Organization
Language → Question → Diagnostic Question

好 Container 的标准是：

1. 比 Group 更具体
2. 比 Leaf 更抽象
3. 能直接收纳一批具体 RU
4. 看到它能自然想到一组例子
5. 服务主体增益

### Leaf 叶子

Leaf 是具体 RU。

例如：

button、input、anxiety、company、prompt、workflow、risk、goal、feedback。

本书不主动穷尽 Leaf。叶子无限，主树有限。本书重点内化 Theme、Group、Container。

---

## 5. 八大 Theme 与二级 Group

### Body 身体单位

1. Energy 精力
2. Sleep 睡眠
3. Diet 饮食
4. Movement 运动
5. Health 健康
6. Sensation 感官
7. Stress 压力
8. Fatigue & Pain 疲劳与疼痛

### Mind 心智单位

1. Perception 感知
2. Attention 注意
3. Memory 记忆
4. Emotion 情绪
5. Desire & Motivation 欲望与动机
6. Cognition 认知
7. Learning 学习
8. Self 自我

### Language 语言单位

1. Word & Phrase 词与短语
2. Sentence 句子
3. Text 文本
4. Concept 概念
5. Question 问题
6. Argument 论证
7. Narrative 叙事
8. Instruction 指令

### Work 做事单位

1. Goal 目标
2. Plan 计划
3. Task 任务
4. Method 方法
5. Project 项目
6. Practice 练习
7. Problem 问题
8. Feedback 反馈

### Relationship 人际关系单位

1. Connection 连接
2. Trust 信任
3. Boundary 边界
4. Intimacy 亲密
5. Cooperation 合作
6. Conflict 冲突
7. Influence 影响
8. Relational Role 关系角色

### Society 社会单位

1. Role 角色
2. Group 群体
3. Organization 组织
4. Institution 制度
5. Market 市场
6. Rule 规则
7. Career 职业
8. Platform Ecology 平台生态

### Technology 技术单位

1. Tool 工具
2. Software 软件
3. AI Model AI 模型
4. Data 数据
5. System 系统
6. Technology Platform 技术平台
7. Automation 自动化
8. Workflow 工作流

### Value 价值判断单位

1. Importance 重要性
2. Benefit 收益
3. Cost 成本
4. Risk 风险
5. Purpose 目的
6. Standard 标准
7. Ethics 伦理
8. Meaning 意义

---

## 6. 写作目标

本书初稿不追求百科完整，而追求主线清楚、结构稳定、可执行、可内化。

本书不把知识罗列当作正文主体。知识罗列可以作为地图、表格、工具箱或训练材料存在，但它必须服务于“领域语言熟悉化”：让读者理解一个 Theme 如何谈论世界，如何命名对象，如何区分对象，如何把对象连接成因果链。

写作遵循这个原则：

> The writing follows a simple principle: reading grows from understanding how a domain talks about the world. When the domain is understood, the reader can focus on what the text says rather than struggling to understand what the text is about. When the language is familiar, the reader can follow arguments through their full causal chains without pausing to decode individual terms.

每个 Theme 要讲清楚：

1. 这个 Theme 是什么
2. 它为什么服务主体增益
3. 它包含哪些 Group
4. 每个 Group 下有哪些高频 Container
5. 这些 Container 如何收纳具体 RU
6. 如何用这一层提升个人理解、判断、行动、表达、创造能力
7. 这个 Theme 的领域语言如何组织世界、形成判断、支持因果理解

---

## 7. 非目标

本书不做以下事情：

1. 不整理所有词汇
2. 不按名词、动词、形容词、副词分类
3. 不写成百科全书
4. 不写成学科导论
5. 不追求知识覆盖面
6. 不脱离个人生活
7. 不为宏大而宏大
8. 不把动词、形容词、副词放进主线
9. 不穷尽 Leaf
10. 不写成空泛哲学散文

---

## 8. 写作风格

本书正文改为英文写作。英文应该清楚、直接、可操作，不使用炫技句式。

对难度较高的术语、短语或句子，在括号中补充中文解释或更直白的说明。括号说明不是逐句翻译，而是在读者可能卡住的地方提供支撑。

示例：

* referable unit（可指称单位）
* domain language（一个领域谈论世界的方式）
* causal chain（因果链）
* The reader first learns how a domain talks about the world.（读者先学会一个领域如何谈论世界。）

每个核心概念必须回答：

1. 它是什么
2. 它解决什么问题
3. 它服务什么主体增益
4. 它如何进入 RU 树
5. 它如何被使用和训练

不要只下定义。
不要堆概念。
不要只列目录。
不要把 Container 写成知识卡片堆叠。
要让读者通过 Container 熟悉一个领域的说话方式，从而能跟随这个领域里的完整论证和因果链。
英文要服务理解，不要服务装饰；能用短句就不用长句。
每一部分都要把结构和个人生活连接起来。

新版 Theme 章节必须优先遵循这个结构：

1. Opening problem（开场问题）
2. Domain language（领域语言）
3. Group map（Group 地图）
4. Core containers（核心 Container）
5. Common misplacements（常见错位）
6. Causal chain（因果链）
7. Placement practice（安置练习）

每个 Theme 至少要包含一条代表性因果链，例如：

* sleep debt → lower attention stability → weaker task execution → more stress → worse sleep（睡眠债 → 注意稳定性下降 → 任务执行变弱 → 压力增加 → 睡眠更差）
* unclear goal → vague task → weak feedback → no skill gain（目标不清 → 任务模糊 → 反馈弱 → 没有能力收益）
