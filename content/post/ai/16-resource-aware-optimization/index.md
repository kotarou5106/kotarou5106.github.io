---
title: "资源感知优化"
description: ""
date: 2026-05-24
weight: 16
math: true
categories:
    - Ai
tags:
    - Agent
---

这一章讲的是 **资源感知优化（Resource-Aware Optimization）**。它的核心不是“让 Agent 更聪明地完成任务”，而是让 Agent 在完成任务时，能同时考虑 **成本（cost）**、**时间（latency/time）**、**算力（compute）**、**模型能力（model capability）**、**稳定性（reliability）** 等约束。也就是说，Agent 不只是问“怎么做完”，还要问“用多少资源做完最划算”。

---

## 1. 这一章的核心问题是什么？

普通 Agent 规划时，重点通常是：

> 用户给我一个目标，我拆成步骤，然后一步步执行。

但现实系统里不能只考虑步骤，还要考虑资源。例如：

简单问题有没有必要调用最贵的模型？
用户要快速答案时，还要不要慢慢做深度推理？
主模型不可用时，是直接失败，还是切到备用模型？
搜索、工具调用、长上下文输入，会不会把成本拉得太高？

所以这一章的本质是：

> 给 Agent 加上 **资源意识（resource awareness）**，让它能在质量、成本、速度之间做动态权衡。

这和前面讲的 **目标设定与监控模式（Goal Setting and Monitoring Pattern）** 有关系，但重点不同。

目标设定与监控模式关注：

> 我有没有朝目标前进？有没有偏离目标？

资源感知优化关注：

> 我用什么模型、什么工具、多少上下文、多少预算来完成这个目标最合理？

---

## 2. 资源感知优化到底优化什么？

这一章提到的资源主要有几类。

第一类是 **计算资源（computational resources）**。比如调用大模型要消耗 GPU 算力，复杂推理也会更慢。

第二类是 **时间资源（time resources）** 或 **延迟（latency）**。有些场景用户要的是快速响应，不一定要最完整的答案。

第三类是 **财务资源（financial resources）**。LLM API、搜索 API、数据库查询、工具调用都可能产生费用。

第四类是 **上下文资源（context resources）**。上下文越长，token 越多，成本越高，也可能让模型注意力变分散。

所以它不是单纯“省钱”，而是在不同场景下做 **质量-成本-速度权衡（quality-cost-latency tradeoff）**。

---

## 3. 最典型的做法：动态模型切换

这一章最重要的技术是 **动态模型切换（dynamic model switching）**，也可以叫 **模型路由（model routing）**。

意思是：不要所有问题都用同一个模型，而是先判断任务类型，再选择合适模型。

比如：

简单事实问题：用便宜、快的小模型。
复杂推理问题：用能力更强但更贵的大模型。
需要最新信息的问题：调用搜索工具，再用模型总结。
主模型不可用：自动切到备用模型。

文中举了 Gemini 的例子：简单任务可以用 **Gemini Flash**，复杂任务用 **Gemini Pro**。Flash 更快更便宜，Pro 更适合复杂推理。

这背后的逻辑可以写成：

```text
用户问题
  ↓
路由智能体判断任务复杂度
  ↓
简单问题 → 便宜模型
复杂问题 → 强模型
时效问题 → 搜索工具 + 模型总结
  ↓
返回答案
```

这里的关键角色是 **路由智能体（Router Agent）**。

---

## 4. 路由智能体是什么？

**路由智能体（Router Agent）** 就是负责分流的 Agent。

它不一定直接回答问题，而是判断：

这个问题简单还是复杂？
是否需要搜索？
是否需要工具调用？
应该用便宜模型还是强模型？
当前预算够不够？
有没有超时风险？

文中的示例用很简单的规则：根据问题长度判断。短问题用 Flash，长问题用 Pro。

这个例子很粗糙，但适合理解思想。

更真实的系统不会只看长度，而是综合判断：

问题是否需要多步推理；
是否涉及数学、代码、规划；
是否需要实时信息；
用户是否要求高精度；
当前预算是否充足；
当前模型是否限流或不可用。

所以，路由智能体本质上是一个 **资源分配决策器（resource allocation decision-maker）**。

---

## 5. OpenAI 代码示例在做什么？

这一章后面给了一个 OpenAI 版的问答系统。它把用户问题分成三类：

**simple：简单问题**
直接可答，不需要复杂推理，也不需要最新信息。

**reasoning：推理问题**
需要逻辑推理、多步分析、数学或复杂解释。

**internet_search：联网搜索问题**
需要最新信息、实时数据、训练数据之外的内容。

流程是：

```text
用户输入问题
  ↓
classify_prompt 分类
  ↓
simple → gpt-4o-mini
reasoning → o4-mini
internet_search → Google Search + gpt-4o
  ↓
generate_response 生成答案
```

这段代码的重点不是具体模型名，而是架构思想：

> 先分类，再路由，再生成。

这就是 **分类-路由-执行（classify-route-execute）** 的资源优化结构。

不过这段代码也有明显简化：

分类器本身用了 `gpt-4o`，这可能已经有一定成本；
分类只分三类，真实系统可能需要更细的任务类型；
搜索结果只取一个，答案质量可能不稳定；
没有严格的预算统计；
没有失败回退逻辑；
没有质量评估环节。

所以它是教学示例，不是完整生产系统。

---

## 6. 批判智能体在这里有什么用？

这一章还讲了 **批判智能体（Critique Agent / Critic Agent）**。

它的作用不是直接回答用户，而是检查别的 Agent 的输出质量。

它可以判断：

答案是否准确；
是否漏掉关键信息；
推理是否有矛盾；
是否用了不合适的模型；
是不是简单问题却调用了昂贵模型；
是不是复杂问题却误用了便宜模型。

所以批判智能体和资源优化的关系是：

> 它通过评估答案质量，反过来优化路由策略。

比如系统发现：

Flash 经常答不好某类问题，之后就把这类问题路由到 Pro。
Pro 经常被用于很简单的问题，之后就降低这类问题的模型规格。
搜索类问题答案质量差，就调整搜索结果数量或搜索策略。

这就形成了一个反馈闭环：

```text
路由智能体选择模型
  ↓
答题智能体生成答案
  ↓
批判智能体评估质量
  ↓
反馈给路由策略
  ↓
下次分流更合理
```

这部分其实已经接近 **自我优化系统（self-optimizing system）** 的雏形。

---

## 7. OpenRouter 这一节在讲什么？

OpenRouter 这一节主要讲 **统一模型接口（unified model interface）** 和 **模型回退（model fallback）**。

OpenRouter 可以让你通过一个统一 API 调用多个模型。文中提到两种方式：

第一种是 **自动模型选择（automatic model selection）**。

你写：

```json
{
  "model": "openrouter/auto"
}
```

系统自动帮你选一个合适模型。

第二种是 **顺序模型回退（sequential model fallback）**。

你给一个模型列表：

```json
{
  "models": ["anthropic/claude-3.5-sonnet", "gryphe/mythomax-l2-13b"]
}
```

系统先调用第一个模型，如果第一个不可用、限流、失败，再切到第二个。

这对应生产系统里非常重要的能力：**优雅降级（graceful degradation）**。

意思是：

> 系统不一定永远保持最高质量，但在资源不足或模型不可用时，至少保持基本可用，而不是直接崩掉。

---

## 8. 除了模型切换，还有哪些资源优化方法？

这一章后面列了一组更大的技术谱系。重点有这些：

**动态模型切换（Dynamic Model Switching）**
根据任务复杂度选择不同模型。

**自适应工具选择（Adaptive Tool Selection）**
不是每个问题都调用所有工具，而是选择最合适、成本最低、延迟可接受的工具。

**上下文剪枝与摘要（Context Pruning and Summarization）**
长对话或长文档不要全部塞进模型，而是保留关键信息、摘要历史，减少 token 成本。

**主动资源预测（Proactive Resource Prediction）**
提前预测任务负载，避免系统高峰时崩溃。

**成本敏感探索（Cost-Sensitive Exploration）**
多智能体协作时，不是让所有 Agent 都充分交流，而是控制通信和计算成本。

**能效部署（Energy-Efficient Deployment）**
在边缘设备、电池设备上尤其重要。

**并行与分布式计算感知（Parallel and Distributed Computing Awareness）**
大任务可以拆给多个节点并行处理，提高吞吐。

**学习型资源分配策略（Learning-Based Resource Allocation Strategy）**
系统根据历史反馈不断学习更好的资源分配方式。

**优雅降级与回退机制（Graceful Degradation and Fallback Mechanism）**
主模型或高质量路径不可用时，切换到低成本或备用路径。

---

## 9. 第 10 页图 2 怎么理解？

第 10 页的图 2 是这一章的视觉摘要：用户输入 Prompt，Agent 处理任务，同时受到 Budget 的约束，最后输出结果。

这张图的重点是：

> Agent 不是孤立地处理 Prompt，而是在预算约束下处理 Prompt。

也就是说：

```text
Prompt 不是唯一输入
Budget 也是输入
```

真实系统里，预算可以是：

最多花多少钱；
最多响应几秒；
最多调用几次工具；
最多使用多少 token；
最多调用几次高阶模型；
失败后最多重试几次。

所以资源感知 Agent 的决策输入其实是：

```text
用户目标 + 当前任务 + 资源预算 + 系统状态
```

输出才是：

```text
选择哪个模型 / 哪个工具 / 哪条执行路径 / 是否降级 / 是否继续尝试
```

---

## 10. 这一章可以如何直观理解？

可以把这一章理解成：

> 让 Agent 从“只会完成任务”，升级为“会精打细算地完成任务”。

一个不资源感知的 Agent 是：

```text
所有问题都用最强模型
所有上下文都塞进去
能调用工具就调用工具
失败了就报错
```

一个资源感知 Agent 是：

```text
简单问题用小模型
复杂问题用强模型
需要实时信息才搜索
上下文太长就摘要
主模型失败就回退
预算不足就降级
质量不够再升级模型
```

所以它不是单个技术，而是一种系统设计思想。

---

## 11. 和 Agent 岗位有什么关系？

如果你准备做 Agent 项目，这一章很值得放进项目里，因为它比“我调了一个大模型 API”更像真实业务系统。

你可以在项目 README 里写：

> 本项目实现了资源感知路由机制（Resource-Aware Routing）：系统先对用户请求进行复杂度分类，再根据任务类型选择不同模型或工具路径。简单请求使用低成本模型，复杂推理请求使用高能力模型，实时信息请求触发搜索工具。同时设计了 fallback 机制，在主模型不可用时自动切换备用模型，从而平衡响应质量、成本和稳定性。

这会比单纯写“使用 LangGraph 搭建 Agent”更有含金量。

---

## 12. 这一章最重要的结论

这一章的重点可以压缩成一句话：

> 资源感知优化（Resource-Aware Optimization）让 Agent 在执行任务时动态选择模型、工具、上下文和执行路径，从而在质量、成本、速度和稳定性之间取得平衡。

最关键的几个关键词是：

**资源感知优化（Resource-Aware Optimization）**
**动态模型切换（Dynamic Model Switching）**
**模型路由（Model Routing）**
**路由智能体（Router Agent）**
**批判智能体（Critique Agent / Critic Agent）**
**上下文剪枝（Context Pruning）**
**自适应工具选择（Adaptive Tool Selection）**
**优雅降级（Graceful Degradation）**
**回退机制（Fallback Mechanism）**
**质量-成本-延迟权衡（Quality-Cost-Latency Tradeoff）**

你真正需要掌握的是：
**Agent 不应该无脑调用最强模型，而应该根据任务复杂度、预算、时间要求和系统状态动态选择最合适的执行路径。**

## 推荐阅读

上一篇：

> [智能体间通信（A2A）]({< relref "../15-agent-to-agent-communication-a2a/index.md" >})

下一篇：

> [推理技术]({< relref "../17-reasoning-techniques/index.md" >})

