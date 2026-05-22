---
title: "多智能体协作（Multi-Agent Collaboration）"
description: "介绍多智能体协作（Multi-Agent Collaboration）的核心思想、协作方式，以及它和规划、工具调用的关系。"
date: 2026-05-22
math: true
categories:
    - Ai
tags:
    - Agent
    - Multi-Agent Collaboration
---

这一章讲的是 **多智能体协作（Multi-Agent Collaboration）**。它是在前面几章基础上的进一步扩展：

前面几章大概是：

```text
工具使用 Tool Use：一个 Agent 会调用外部工具
规划 Planning：一个 Agent 会把复杂任务拆成步骤
多智能体协作 Multi-Agent Collaboration：多个 Agent 分工合作完成复杂任务
```

核心一句话：

> **多智能体协作（Multi-Agent Collaboration）就是把一个复杂任务拆成多个子任务，再交给不同角色、不同能力、不同工具的智能体分别完成，最后通过通信和协调合成最终结果。** 

---

## 1. 为什么需要多智能体？

单个智能体（Single Agent）可以处理简单明确的问题，但面对复杂、多领域任务时容易出现几个问题：

第一，单个 Agent 什么都要做，容易变成系统瓶颈。

第二，它不一定同时擅长研究、写作、分析、审查、代码、设计等所有任务。

第三，复杂任务通常需要多个阶段，如果全部压给一个 Agent，过程会混乱。

比如你要做一个“AI 行业趋势报告”，单个 Agent 可能直接生成一篇文章。但更合理的方式是：

```text
研究智能体 Research Agent：负责搜集资料
分析智能体 Analysis Agent：负责提炼趋势
写作智能体 Writer Agent：负责写成文章
审查智能体 Reviewer Agent：负责检查事实和逻辑
```

这就是多智能体协作。

PDF 里也说，多智能体协作通过把高层目标拆成子问题，再分配给具备相应工具、数据访问或推理能力的智能体，从而解决单一智能体能力受限的问题。

---

## 2. 多智能体和规划有什么区别？

这两个很容易混。

### 规划（Planning）

重点是：

```text
一个任务应该拆成哪些步骤？
```

比如：

```text
1. 搜集资料
2. 分析资料
3. 写报告
4. 审查报告
```

### 多智能体协作（Multi-Agent Collaboration）

重点是：

```text
这些步骤分别由谁来做？它们之间怎么交接？
```

比如：

```text
研究员 Agent → 搜集资料
分析师 Agent → 分析资料
写作者 Agent → 写报告
审查者 Agent → 检查质量
```

所以关系是：

> **规划解决步骤问题，多智能体解决分工问题。**

复杂系统里二者通常一起出现。

---

## 3. 多智能体协作的核心组成

多智能体系统不是随便创建几个 Agent 就完事，它至少包括三个关键东西。

### 1. 角色与职责划分（Roles and Responsibilities）

每个 Agent 要有明确定位。

例如：

```text
Researcher：研究员
Writer：写作者
Reviewer：审查者
Coder：代码生成者
Tester：测试者
Supervisor：监督者
```

如果角色不清楚，多个 Agent 可能会重复工作，或者互相冲突。

---

### 2. 通信机制（Communication Mechanism）

Agent 之间要能传递信息。

比如：

```text
研究员把资料交给写作者
写作者把草稿交给审查者
审查者把修改意见交回写作者
```

这就是通信。

PDF 里强调，多智能体系统的效率不仅来自分工，还依赖智能体之间的通信机制，包括标准化通信协议和共享本体。

这里的关键词：

* **通信协议（Communication Protocol）**
* **共享本体（Shared Ontology）**

共享本体可以简单理解为：不同 Agent 对任务、字段、概念、输出格式有共同理解。比如大家都知道“趋势分析”要包括“背景、原因、影响、风险”。

---

### 3. 协调流程（Coordination Workflow）

多个 Agent 要按某种流程协作。

比如：

```text
顺序执行
并行执行
层级委托
互相辩论
生成-审查-修订
```

没有协调流程，多智能体就会变成“多个模型各说各的”。

---

## 4. 这一章列出的几种协作方式

PDF 里列了多智能体协作的几种典型形式。

### 方式一：顺序交接（Sequential Handoff）

一个 Agent 做完，把结果交给下一个 Agent。

例如：

```text
研究员 Agent → 写作者 Agent → 编辑 Agent
```

这适合有明显流水线结构的任务。

比如写报告：

```text
搜集资料 → 写初稿 → 审查修改 → 输出终稿
```

---

### 方式二：并行处理（Parallel Processing）

多个 Agent 同时处理任务的不同部分，然后合并结果。

例如做竞品分析：

```text
Agent A：分析竞品 1
Agent B：分析竞品 2
Agent C：分析竞品 3
综合 Agent：合并结果
```

优点是快。

适合任务可以拆成互不强依赖的部分。

---

### 方式三：辩论与共识（Debate and Consensus）

多个 Agent 从不同角度讨论问题，最后形成更稳健的结论。

例如投资分析：

```text
乐观派 Agent：提出买入理由
悲观派 Agent：提出风险
中立 Agent：综合判断
```

这种方式适合高不确定性问题，比如策略判断、方案评审、风险分析。

---

### 方式四：层级结构（Hierarchical Structure）

有一个管理者 Agent，也叫：

* **监督者（Supervisor）**
* **协调者（Coordinator）**
* **管理者智能体（Manager Agent）**

它负责把任务分配给下面的专家 Agent。

结构类似：

```text
Supervisor
├── Research Agent
├── Coding Agent
├── Writing Agent
└── Review Agent
```

第 2 页图 1 就是这个结构：用户和多智能体团队交互，团队内部有一个 Supervisor，下面有多个 Specialist。这个图想表达的是：用户不需要直接管理所有专家 Agent，而是由监督者统一协调。

---

### 方式五：专家团队（Expert Team）

多个领域专家 Agent 一起完成任务。

比如：

```text
市场研究 Agent
数据分析 Agent
文案 Agent
设计 Agent
社媒运营 Agent
```

适合营销、报告、产品方案、软件开发这类综合任务。

---

### 方式六：批评-审查者模式（Critic-Reviewer Pattern）

一个 Agent 先生成结果，另一个 Agent 专门审查。

比如：

```text
Writer Agent：写文章
Reviewer Agent：检查逻辑、事实、表达
Writer Agent：根据反馈修改
```

这在代码生成、研究写作、逻辑检查、安全合规中特别常见。PDF 里也说，这种模式可以提升健壮性、改善质量、减少幻觉或错误。

---

## 5. 多智能体适合哪些场景？

PDF 列了很多应用场景。

### 复杂研究与分析

比如：

```text
研究 Agent：查资料
总结 Agent：总结内容
趋势 Agent：发现趋势
综合 Agent：写报告
```

这和前一章 Deep Research 很接近。

---

### 软件开发

可以拆成：

```text
需求分析 Agent
架构设计 Agent
代码生成 Agent
测试 Agent
文档 Agent
代码审查 Agent
```

这个方向和你之后想做 Agent 项目很相关。

比如一个自动开发小功能的 Agent 系统，可以这样设计：

```text
Planner：拆需求
Coder：写代码
Tester：写测试并运行
Reviewer：检查代码质量
Fixer：根据错误修复
```

---

### 创意内容生成

比如营销活动：

```text
市场调研 Agent
文案 Agent
图片生成 Agent
排期 Agent
审查 Agent
```

---

### 金融分析

比如：

```text
数据抓取 Agent
新闻情绪分析 Agent
技术分析 Agent
风险评估 Agent
投资建议 Agent
```

---

### 客户支持升级

比如：

```text
前线客服 Agent：处理基础问题
技术专家 Agent：处理技术问题
账单专家 Agent：处理支付问题
人工升级 Agent：处理复杂投诉
```

---

### 供应链优化

不同 Agent 代表供应链的不同节点：

```text
供应商 Agent
制造商 Agent
仓储 Agent
物流 Agent
销售预测 Agent
```

---

### 网络分析与修复

比如运维场景：

```text
监控 Agent：发现异常
诊断 Agent：定位原因
修复 Agent：执行修复
审计 Agent：记录和验证
```

---

## 6. 第 4 页图 2：几种通信结构怎么理解？

第 4 页图 2 展示了 6 种智能体间通信与交互方式。

### 1. 单智能体（Single Agent）

一个 Agent 自己做所有事。

优点：简单。

缺点：能力有限，复杂任务容易混乱。

---

### 2. 网络型（Network）

多个 Agent 彼此直接通信。

结构类似：

```text
Agent A ↔ Agent B
Agent B ↔ Agent C
Agent A ↔ Agent C
```

优点：灵活，去中心化。

缺点：通信复杂，容易混乱，难以保证一致性。

---

### 3. 监督者型（Supervisor）

一个 Supervisor 管理多个 Agent。

```text
Supervisor
├── Agent A
├── Agent B
└── Agent C
```

优点：结构清楚，容易控制。

缺点：Supervisor 可能成为瓶颈，也可能出现单点故障。

---

### 4. 工具型监督者（Supervisor as Tools）

这里比较抽象。

普通 Supervisor 是“指挥别人”。

工具型监督者更像是“给别人提供能力或支持”。

也就是说，某些 Agent 可以把 Supervisor 当成工具来调用，获得指导、资源、分析结果。

---

### 5. 层级型（Hierarchical）

多层管理结构。

```text
总 Supervisor
├── 子 Supervisor A
│   ├── Agent A1
│   └── Agent A2
└── 子 Supervisor B
    ├── Agent B1
    └── Agent B2
```

适合非常复杂的系统，比如大规模企业流程、复杂软件工程、多部门协作。

---

### 6. 定制型（Custom）

根据具体任务设计特殊结构。

比如有些任务需要：

```text
研究 Agent 并行搜索
→ 辩论 Agent 互相质疑
→ 审查 Agent 检查
→ 总结 Agent 输出
```

它不是标准流水线，而是混合结构。

---

## 7. CrewAI 示例在做什么？

这一章的 CrewAI 示例是一个“AI 趋势博客创作团队”。

它定义了两个 Agent：

```text
researcher：高级研究分析师
writer：技术内容写作者
```

研究员负责：

```text
调研 2024-2025 年 AI 三大新兴趋势
```

写作者负责：

```text
根据研究结果撰写 500 字博客
```

关键代码是：

```python
writing_task = Task(
    description="根据研究结果撰写一篇 500 字博客，内容通俗易懂。",
    agent=writer,
    context=[research_task],
)
```

这里的 `context=[research_task]` 很重要。

它表示：

> 写作任务依赖研究任务的输出。

也就是：

```text
research_task 的结果 → 作为 writing_task 的上下文
```

然后 Crew 设置为顺序执行：

```python
process=Process.sequential
```

所以整个流程是：

```text
研究员 Agent 完成研究
→ 输出研究结果
→ 写作者 Agent 读取研究结果
→ 写成博客
```

这就是最基础的多智能体顺序协作。

---

## 8. Google ADK 示例在讲什么？

这一章后半部分讲了 Google ADK 的几种多智能体协作模式。

### 1. 层级智能体结构（Hierarchical Agent Structure）

代码里有：

```text
Coordinator
├── Greeter
└── TaskExecutor
```

`Coordinator` 是协调者。

它根据用户需求决定委托给谁：

```text
问候 → Greeter
执行任务 → TaskExecutor
```

这就是父子 Agent 关系。

---

### 2. LoopAgent：循环执行

`LoopAgent` 用来实现迭代流程。

比如：

```text
执行一步
→ 检查是否完成
→ 没完成就继续
→ 完成就停止
```

代码里的 `ConditionChecker` 会检查：

```python
status == "completed"
```

如果完成，就终止循环。

这适合需要反复尝试、反复检查的任务，比如：

```text
代码修复
数据清洗
任务轮询
多轮优化
```

---

### 3. SequentialAgent：顺序执行

`SequentialAgent` 是线性流水线。

例子是：

```text
Step1_Fetch：获取数据，存入 state["data"]
Step2_Process：读取 data 并分析总结
```

这和 CrewAI 的顺序任务很像。

---

### 4. ParallelAgent：并行执行

`ParallelAgent` 让多个 Agent 同时执行。

例子是：

```text
weather_fetcher：获取天气
news_fetcher：获取新闻
```

然后分别把结果存入：

```text
state["weather_data"]
state["news_data"]
```

适合可以同时做的任务。

---

### 5. 智能体即工具（Agent as Tool）

这个很重要。

PDF 里最后的例子是：

```text
artist_agent
→ 调用 image_generator_agent
→ image_generator_agent 再调用 generate_image 工具
```

也就是说，一个 Agent 可以被包装成另一个 Agent 的工具。

关键词：

* **智能体即工具（Agent as Tool）**
* **AgentTool**
* **父智能体（Parent Agent）**
* **子智能体（Sub-Agent）**

这个模式非常重要，因为它把系统做成了嵌套结构：

```text
主 Agent 不需要知道图片生成细节
它只需要调用 ImageGen 这个子 Agent
```

子 Agent 内部再决定怎么调用具体工具。

---

## 9. 多智能体、工具调用、规划之间的完整关系

到这里，你可以把这几章串起来：

### 工具调用（Tool Calling）

解决：

```text
Agent 如何使用外部能力？
```

比如搜索、数据库、代码执行、图片生成。

---

### 规划（Planning）

解决：

```text
复杂任务应该分成哪些步骤？
```

比如先搜集资料，再分析，再写报告。

---

### 多智能体协作（Multi-Agent Collaboration）

解决：

```text
这些步骤由哪些不同角色完成？
它们怎么通信、交接、并行或审查？
```

所以一个比较完整的 Agent 系统可能是：

```text
Supervisor Agent：理解目标并规划
Research Agent：调用搜索工具
Data Agent：调用数据库或 Python
Writer Agent：生成报告
Reviewer Agent：检查逻辑和事实
Supervisor Agent：整合最终输出
```

这就是典型的多智能体系统。

---

## 10. 什么时候该用多智能体？什么时候不要用？

### 适合用多智能体

当任务满足这些条件时：

```text
任务复杂
涉及多个专业领域
需要多个阶段
需要并行处理
需要互相审查
需要不同工具组合
```

比如：

```text
复杂研究报告
软件开发
投研分析
竞品分析
营销内容生产
客服分流
自动化运维
```

PDF 里也说，当任务过于复杂，需要拆分为需专长或工具的子任务时，就适合采用多智能体模式。

### 不适合用多智能体

如果任务很简单，就没必要。

比如：

```text
翻译一句话
总结一小段文字
查询一个字段
生成一个简单 SQL
解释一个概念
```

这时候多智能体反而会增加成本和不确定性。

---

## 11. 你需要掌握的重点

你现在学这一章，不需要把所有 ADK 代码都手敲。真正要掌握的是系统设计思路。

重点是这几个问题：

```text
1. 任务能不能拆？
2. 拆出来的子任务是否需要不同能力？
3. 子任务之间是顺序、并行、层级，还是审查关系？
4. 哪个 Agent 负责协调？
5. 每个 Agent 的输入和输出是什么？
6. 最后谁负责整合结果？
```

这比单纯记代码更重要。

---

## 12. 一段师生对话理解

学生：老师，多智能体是不是就是开很多个 ChatGPT？

老师：不是。重点不是数量多，而是角色、职责、通信和协作流程清楚。

学生：那两个 Agent 算多智能体吗？

老师：算。比如一个负责研究，一个负责写作，只要它们之间有任务交接，就是多智能体协作。

学生：那它和规划有什么区别？

老师：规划是拆步骤，多智能体是分配角色。比如规划说“先研究，再写作，再审查”；多智能体说“研究交给 Researcher，写作交给 Writer，审查交给 Reviewer”。

学生：为什么不让一个 Agent 全做？

老师：简单任务可以。但复杂任务中，一个 Agent 容易遗漏、混乱或质量不稳定。分工之后，每个 Agent 可以专注于自己的目标和工具。

学生：那多智能体一定更好吗？

老师：不是。多智能体会增加通信成本、协调成本和系统复杂度。只有当任务真的复杂，或者需要多种专业能力时，才值得用。

---

## 13. 最直观总结

这一章的本质是：

> **多智能体协作（Multi-Agent Collaboration）不是简单地堆多个模型，而是把复杂任务按角色拆开，让不同智能体通过顺序交接、并行处理、层级委托、辩论或审查来共同完成目标。**

你可以这样判断：

```text
一个 Agent 能清楚完成 → 不要多智能体
任务需要多个专业角色 → 可以多智能体
任务需要互相检查和修正 → 很适合多智能体
任务可以并行拆分 → 很适合多智能体
```

对于你想做 Agent 项目来说，这章最有用的不是 CrewAI 或 ADK 的具体语法，而是：

```text
Supervisor + Specialist
Planner + Worker
Researcher + Writer + Reviewer
Coder + Tester + Fixer
```

这些结构设计。

![章节插图](/7.png)

## 推荐阅读

上一篇：

> [规划（Planning）]({{< relref "规划/index.md" >}})

下一篇：

> [学习与适应（Learning and Adaptation）]({{< relref "学习与适应/index.md" >}})


