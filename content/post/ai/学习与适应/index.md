---
title: "学习与适应（Learning and Adaptation）"
description: "介绍学习与适应（Learning and Adaptation）的核心思想，以及 PPO、DPO、SICA、OpenEvolve 和 AlphaEvolve 等案例。"
date: 2026-05-22
math: true
categories:
    - Ai
tags:
    - Agent
    - Learning and Adaptation
---

这一章讲的是 **学习与适应（Learning and Adaptation）**。它是在前面几章之后的进一步升级：

```text
工具使用 Tool Use：Agent 能调用外部工具
规划 Planning：Agent 能拆解任务
多智能体协作 Multi-Agent Collaboration：多个 Agent 能分工
记忆管理 Memory Management：Agent 能记住历史
学习与适应 Learning and Adaptation：Agent 能根据经验改变自己
```

核心一句话：

> **学习与适应（Learning and Adaptation）就是让智能体根据新经验、新数据、新反馈，改变自己的知识、策略或行为，从而在变化环境中表现得越来越好。** 

---

## 1. 为什么 Agent 需要学习与适应？

如果一个 Agent 只能按照最初写死的规则行动，它就很难应对新情况。

比如：

```text
市场环境变了
用户偏好变了
数据分布变了
任务类型变了
工具接口变了
代码库结构变了
```

如果 Agent 不会学习，它每次遇到变化都需要人手动改规则、改 prompt、改代码。

学习与适应要解决的问题是：

> 不要让 Agent 永远停留在初始版本，而是让它能从经验里改进。

这里有两个关键词：

* **学习（Learning）**：根据数据或经验更新内部知识、模型、规则或策略。
* **适应（Adaptation）**：学习之后表现出来的行为变化，比如更符合用户偏好、更会避坑、更会完成任务。

PDF 里也说，智能体通过根据新经验和数据改变思维、行为或知识来实现学习与适应，从而从简单执行指令变得更智能。

---

## 2. 这一章先列了几类学习方式

PDF 一开始列了 6 类学习方式。你不需要都深入算法细节，但要知道它们分别解决什么问题。

### 1. 强化学习（Reinforcement Learning, RL）

强化学习的基本结构是：

```text
智能体 Agent
→ 做动作 Action
→ 环境 Environment 给反馈
→ 得到奖励 Reward 或惩罚
→ 智能体调整策略 Policy
```

适合机器人控制、游戏智能体、自动驾驶、交易策略等。

关键词：

* **智能体（Agent）**
* **环境（Environment）**
* **动作（Action）**
* **奖励（Reward）**
* **策略（Policy）**

强化学习关心的是：

> 在一个环境里，Agent 应该采取什么行动，才能长期获得更高奖励？

---

### 2. 监督学习（Supervised Learning）

监督学习是用带标签的数据训练模型。

例如：

```text
输入：邮件内容
标签：垃圾邮件 / 正常邮件
```

模型学习输入和输出之间的对应关系。

适合：

```text
分类 Classification
回归 Regression
趋势预测 Trend Prediction
风险识别 Risk Detection
```

---

### 3. 无监督学习（Unsupervised Learning）

无监督学习没有标签，模型自己从数据里发现结构。

比如：

```text
用户聚类
异常检测
主题发现
行为模式挖掘
```

它适合探索性分析。

---

### 4. 少样本/零样本学习（Few-shot / Zero-shot Learning）

这是 LLM 很常见的能力。

### 零样本学习（Zero-shot Learning）

不给例子，只给指令，模型直接完成任务。

例如：

```text
请把下面的评论判断为正面/负面。
```

### 少样本学习（Few-shot Learning）

给几个例子，让模型模仿。

例如：

```text
例1：……
例2：……
现在处理这个新输入。
```

这类能力让 LLM Agent 可以快速适应新任务，而不一定需要重新训练模型。

---

### 5. 在线学习（Online Learning）

在线学习是模型持续接收新数据并更新。

比如推荐系统看到用户刚刚点击了某类视频，就马上调整推荐。

适合实时变化场景：

```text
金融市场
广告推荐
欺诈检测
用户行为建模
```

---

### 6. 基于记忆的学习（Memory-Based Learning）

这个和上一章 **记忆管理（Memory Management）** 直接相关。

Agent 不是重新训练参数，而是回忆过去经验，然后改变当前行为。

比如：

```text
上次这种解释用户没听懂
→ 这次换一种更直接的解释方式

上次这个代码修复方案成功
→ 这次遇到相似报错优先尝试类似方案
```

这类学习更像是：

```text
保存经验 → 检索相似经验 → 调整当前决策
```

---

## 3. PPO 是什么？

PDF 里专门讲了 **PPO（Proximal Policy Optimization，近端策略优化）**。

PPO 是强化学习里很常见的一种算法，尤其用于训练策略模型。

它的核心目标是：

> 更新智能体策略时，不要一下子改太猛。

因为强化学习里如果策略更新过大，模型可能突然性能崩掉。PPO 的思路是：允许策略变好，但限制每次变化的幅度。

流程大概是：

```text
1. Agent 用当前策略和环境交互，收集经验
2. 根据奖励评估新策略是否更好
3. 用裁剪目标函数限制策略更新幅度
4. 小步更新策略
```

关键词：

* **PPO（Proximal Policy Optimization，近端策略优化）**
* **策略（Policy）**
* **奖励（Reward）**
* **裁剪机制（Clipping Mechanism）**
* **信任区间（Trust Region）**

PDF 里说，PPO 的核心是对策略进行小幅、谨慎更新，避免剧烈变化导致性能崩溃。

你可以这样理解它的本质：

> PPO 不是让 Agent 每次都大幅改变策略，而是让它稳定地、一点点变好。

---

## 4. DPO 是什么？

PDF 里还讲了 **DPO（Direct Preference Optimization，直接偏好优化）**。

DPO 是用来让 LLM 更符合人类偏好的方法。

它解决的是 LLM 对齐问题，也就是：

```text
怎样让模型更倾向于输出人类喜欢的回答，
更少输出人类不喜欢的回答？
```

传统 PPO 对齐流程比较复杂：

```text
1. 收集人类偏好数据
2. 训练奖励模型 Reward Model
3. 用 PPO 让 LLM 生成奖励模型高分的回答
```

问题是：

```text
奖励模型可能不准
训练过程复杂
模型可能学会“骗奖励模型”
```

DPO 的方式更直接：

```text
给模型一组偏好数据：
回答 A 比回答 B 好

然后直接优化模型：
提高生成 A 的概率
降低生成 B 的概率
```

关键词：

* **DPO（Direct Preference Optimization，直接偏好优化）**
* **人类偏好对齐（Human Preference Alignment）**
* **偏好数据（Preference Data）**
* **奖励模型（Reward Model）**
* **策略优化（Policy Optimization）**

PDF 里说，DPO 跳过奖励模型，直接用偏好数据更新 LLM 策略，从而简化对齐流程并提升稳定性。

---

## 5. PPO 和 DPO 的区别

可以直接对比：

| 维度       | PPO                          | DPO                            |
| -------- | ---------------------------- | ------------------------------ |
| 中文       | 近端策略优化                       | 直接偏好优化                         |
| 英文       | Proximal Policy Optimization | Direct Preference Optimization |
| 所属方向     | 强化学习                         | 偏好对齐                           |
| 是否需要奖励模型 | 通常需要                         | 不需要显式奖励模型                      |
| 优化方式     | 根据奖励信号更新策略                   | 根据偏好对直接更新模型                    |
| 复杂度      | 更复杂                          | 更直接                            |
| 风险       | 奖励模型可能被“钻空子”                 | 依赖偏好数据质量                       |

本质区别：

```text
PPO：先学一个“裁判”，再让模型讨好这个裁判
DPO：直接告诉模型哪个回答更好，让模型偏向更好的回答
```

---

## 6. 学习与适应的实际应用场景

PDF 里列了很多应用。

### 个性化助手智能体

通过长期分析用户行为，调整回答风格和建议。

比如：

```text
用户喜欢简洁直接
用户正在学习 Agent
用户对数学解释要求严谨
```

Agent 以后就会适应这些偏好。

---

### 交易机器人智能体

根据实时市场数据调整策略。

比如：

```text
市场波动变大
某个因子失效
交易成本上升
```

交易 Agent 需要动态更新决策逻辑。

---

### 应用智能体

根据用户行为调整界面和功能。

比如：

```text
用户常用某个功能
→ 系统优先展示这个功能
```

---

### 机器人与自动驾驶智能体

根据传感器数据和历史行为优化导航与控制。

---

### 反欺诈智能体

欺诈模式会不断变化，所以反欺诈系统必须持续学习新型欺诈行为。

---

### 推荐系统智能体

根据用户新行为不断调整推荐。

---

### 知识库学习智能体

通过 RAG 维护动态知识库，记录成功策略、失败经验和新知识。

---

## 7. SICA 是什么？

这一章重点案例是 **SICA（Self-Improving Coding Agent，自我改进编码智能体）**。

它的核心很强：

> SICA 不是让一个模型训练另一个模型，而是让一个编码 Agent 修改自己的源代码，然后通过测试结果判断自己有没有变强。

它的循环是：

```text
1. 查看历史版本和测试表现
2. 选择表现最好的版本
3. 分析哪里可以改进
4. 修改自己的代码库
5. 重新跑基准测试
6. 记录结果
7. 进入下一轮迭代
```

这就是自我改进。

第 4 页图 1 展示的就是这个流程：

```text
Agent 0
→ 修改成 Agent 1
→ 测试
→ 选择最佳版本
→ 修改成 Agent 2
→ 再测试
→ 不断循环
```

---

## 8. SICA 学到了什么？

PDF 里说，SICA 在迭代中逐步发展出了很多更好的代码编辑和导航工具。

比如：

### 智能编辑器（Smart Editor）

一开始它可能只是粗暴地覆盖文件。

后来学会更精细地编辑代码。

---

### 差异增强智能编辑器（Diff-Enhanced Smart Editor）

结合 **diff（差异文件）**，只修改需要改的部分。

关键词：

* **diff（差异）**
* **代码补丁（Patch）**
* **上下文编辑（Contextual Editing）**

---

### AST 符号定位器（AST Symbol Locator）

AST 是：

* **抽象语法树（Abstract Syntax Tree, AST）**

AST 可以把代码解析成结构化树。

SICA 用 AST 来定位函数、类、变量定义，而不是只靠文本搜索。

比如它要找一个函数 `run_agent()`，AST 能帮助它直接找到函数定义位置。

---

### 混合符号定位器（Hybrid Symbol Locator）

结合快速搜索和 AST 检查。

意思是：

```text
先用快速搜索缩小范围
再用 AST 精确确认位置
```

这比纯搜索更稳。

第 4 页图 2 展示了 SICA 迭代过程中的性能变化，图中标注了关键改进点，比如 Smart Edit Tool、Code Context Summarization、AST Symbol Locator、Hybrid Symbol Locator 等。

---

## 9. SICA 为什么需要子智能体和监督者？

SICA 系统里有：

```text
主智能体 Main Agent
编码子智能体 Coding Sub-Agent
问题求解子智能体 Problem-Solving Sub-Agent
推理子智能体 Reasoning Sub-Agent
异步监督者 Asynchronous Supervisor
```

子智能体的作用是分解任务。

比如：

```text
编码 Agent：负责修改代码
推理 Agent：负责分析改进方向
问题求解 Agent：负责处理基准挑战
```

监督者的作用是检查主 Agent 有没有出问题。

比如：

```text
是否陷入循环
是否长期停滞
是否重复无效操作
是否行为异常
```

PDF 里说，异步监督者会监控 SICA 行为，识别循环或停滞问题，并可干预终止执行。

这里体现了前几章的组合：

```text
多智能体协作：主 Agent + 子 Agent + 监督者
工具调用：文件操作、命令执行、代码编辑
记忆管理：历史版本、基准测试结果、上下文窗口
学习适应：根据表现修改自身代码
```

---

## 10. SICA 的安全与可观测性

这一章还提到两个工程重点。

### 安全：Docker 容器化

因为 SICA 可以执行 shell 命令、修改文件，所以必须隔离。

关键词：

* **Docker 容器化（Docker Containerization）**
* **沙箱隔离（Sandbox Isolation）**
* **文件系统风险（File System Risk）**

把 Agent 放到容器里运行，可以降低它误删主机文件、执行危险命令的风险。

---

### 可观测性（Observability）

SICA 有事件总线和调用图可视化。

开发者可以看：

```text
Agent 做了哪些动作
调用了哪些工具
子 Agent 如何交互
监督者发了什么消息
哪里出现循环或停滞
```

这对自我改进系统尤其重要，因为系统越自主，越需要能被观察和审计。

---

## 11. AlphaEvolve 是什么？

这一章还介绍了 **AlphaEvolve**。

它是 Google 开发的智能体，目标是发现和优化算法。PDF 说它结合了：

```text
LLM：Gemini Flash 和 Gemini Pro
自动评估系统
进化算法框架
```

大概流程是：

```text
Gemini Flash 生成大量候选算法
Gemini Pro 做深入分析和优化
自动评估系统给算法打分
进化算法保留表现好的方案
继续迭代
```

关键词：

* **AlphaEvolve**
* **进化算法（Evolutionary Algorithm）**
* **自动评估（Automatic Evaluation）**
* **算法发现（Algorithm Discovery）**
* **算法优化（Algorithm Optimization）**

PDF 里提到，AlphaEvolve 被用于 Google 基础设施优化、硬件设计优化、AI 性能提升和基础数学研究。

---

## 12. OpenEvolve 是什么？

**OpenEvolve** 是一种进化式编码智能体。

它的目标是：

> 用 LLM 不断生成代码修改，通过评估筛选更好的程序，让代码逐轮进化。

PDF 里说，它支持整个代码文件进化，不局限于单一函数，并支持多目标优化、灵活提示工程和分布式评估。

第 6 页图 3 展示了 OpenEvolve 架构，大概包括：

```text
Controller Orchestration：控制器，负责协调整体流程
Program Database：程序数据库，保存程序和指标
Prompt Sampler：提示采样器，生成上下文丰富的 prompt
LLM Ensemble：LLM 集群，生成代码修改
Evaluator Pool：评估池，测试程序并打分
```

流程是：

```text
从程序数据库取历史程序
→ Prompt Sampler 构造 prompt
→ LLM 生成代码修改
→ Evaluator Pool 评估
→ 更新 Program Database
→ 继续进化
```

这就是一种“生成—评估—选择—再生成”的循环。

---

## 13. OpenEvolve 代码示例在做什么？

代码很短：

```python
from openevolve import OpenEvolve

evolve = OpenEvolve(
    initial_program_path="path/to/initial_program.py",
    evaluation_file="path/to/evaluator.py",
    config_path="path/to/config.yaml"
)

best_program = await evolve.run(iterations=1000)

for name, value in best_program.metrics.items():
    print(f"{name}: {value:.4f}")
```

它做了几件事：

### 1. 指定初始程序

```python
initial_program_path="path/to/initial_program.py"
```

也就是从哪个代码开始进化。

### 2. 指定评估文件

```python
evaluation_file="path/to/evaluator.py"
```

这个文件决定怎么评估程序好坏。

比如：

```text
准确率
运行速度
内存占用
通过测试数量
收益风险比
```

### 3. 指定配置文件

```python
config_path="path/to/config.yaml"
```

配置模型、迭代参数、评估方式等。

### 4. 运行 1000 次迭代

```python
best_program = await evolve.run(iterations=1000)
```

系统不断生成新代码、评估、筛选，最后返回最佳程序。

---

## 14. 第 8 页图 4 怎么理解？

第 8 页图 4 是学习与适应模式。

结构大概是：

```text
User 用户
  ↓
Prompt 提示词
  ↓
Agent 智能体
  ↔
Learning 学习模块
  ↓
Output 输出
  ↓
User 用户
```

它表达的是：

Agent 不只是根据 prompt 输出结果，还会把经验反馈给学习模块。

学习模块可能包括：

```text
用户反馈
任务结果
测试分数
工具调用记录
历史成功失败经验
模型更新
规则更新
记忆更新
代码更新
```

然后 Agent 未来的行为会受到这些学习结果影响。

所以图的重点是：

> 输出不只是结束，输出结果和反馈还会反过来影响 Agent 的未来表现。

---

## 15. 学习与适应和记忆管理的区别

这两个很容易混。

### 记忆管理（Memory Management）

重点是：

```text
存什么、怎么存、怎么检索
```

比如：

```text
保存用户偏好
保存历史对话
保存任务进度
保存知识库内容
```

### 学习与适应（Learning and Adaptation）

重点是：

```text
根据这些经验，行为有没有变得更好
```

比如：

```text
用户不喜欢长篇回答
→ 以后回答更短

某个代码修复策略成功
→ 以后优先尝试

某个算法版本测试分数更高
→ 保留并继续优化
```

关系是：

```text
记忆提供经验材料
学习利用经验改变行为
```

---

## 16. 学习与适应和前几章怎么组合？

这一章实际上把前面的模式串起来了。

以 SICA 为例：

```text
工具使用 Tool Use：
它能读写文件、执行命令、运行测试

规划 Planning：
它要决定下一轮改哪里、怎么改

多智能体协作 Multi-Agent Collaboration：
主智能体、编码子智能体、推理子智能体、监督者协作

记忆管理 Memory Management：
它保存历史版本、基准测试表现、上下文信息

学习与适应 Learning and Adaptation：
它根据测试结果修改自身代码，让下一版本更强
```

所以学习与适应不是单独存在的，它通常建立在前面所有能力之上。

---

## 17. 你现在需要掌握到什么程度？

这章对你来说，重点不是马上去实现 PPO、DPO 或 SICA，而是理解“Agent 如何变强”的几种路径。

可以分成三层：

### 第一层：轻量适应

不改模型参数，只改记忆和提示词。

```text
保存用户偏好
更新系统提示
总结失败经验
下次检索出来使用
```

这是你做普通 Agent 项目最容易落地的。

---

### 第二层：基于评估的迭代

Agent 生成结果后，用测试或评分器评估，再修改。

比如代码 Agent：

```text
生成代码
→ 运行测试
→ 失败则读取错误
→ 修改代码
→ 再运行测试
```

这很实用。

---

### 第三层：真正自我改进

Agent 能修改自己的代码、工具或策略。

比如 SICA、OpenEvolve、AlphaEvolve。

这属于更高级、更研究型的方向，需要安全隔离、评估系统和可观测性。

---

## 18. 一段师生对话理解

学生：老师，学习与适应是不是就是微调模型？

老师：不一定。微调只是学习的一种方式。Agent 的学习也可以是更新记忆、更新规则、改 prompt、改工具使用策略，甚至修改自己的代码。

学生：那记忆和学习有什么区别？

老师：记忆是保存经验，学习是根据经验改变行为。只记住但不改变，不算真正适应。

学生：PPO 和 DPO 是不是都在训练模型？

老师：对，但思路不同。PPO 通常通过奖励模型和强化学习更新策略，DPO 直接用偏好数据让模型更倾向于好回答。

学生：SICA 为什么厉害？

老师：因为它不是只回答代码问题，而是会修改自己的代码，然后用基准测试判断新版本好不好。表现好的版本会被保留，继续迭代。

学生：这是不是很危险？

老师：有风险，所以需要 Docker 沙箱、监督者、日志、调用图、测试系统和权限控制。越自主的 Agent，越需要安全和可观测性。

---

## 19. 最直观总结

这一章的本质是：

> **学习与适应（Learning and Adaptation）让 Agent 不再是固定流程系统，而是能根据经验、反馈、测试结果或用户偏好持续调整自己。**

你可以这样理解：

```text
记忆：我记得发生过什么
学习：我从这些事情里总结出什么
适应：我下一次因此做得不一样
```

对于你现在要学 Agent 应用，最有价值的是：

```text
1. 先不用急着学 PPO/DPO 细节
2. 重点理解“反馈—评估—修改—再评估”的循环
3. 项目里可以先做轻量学习：记忆用户偏好、记录失败案例、用测试结果驱动修复
4. 高级方向才是 SICA / OpenEvolve / AlphaEvolve 这类自我改进系统
```
![章节配图 11](/11.png)

![章节插图](/8.png)

## 推荐阅读

上一篇：

> [多智能体协作（Multi-Agent Collaboration）]({{< relref "多智能体协作/index.md" >}})

下一篇：

> [模型上下文协议（MCP）]({{< relref "模型上下文协议/index.md" >}})


