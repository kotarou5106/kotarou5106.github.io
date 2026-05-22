---
title: "记忆管理（Memory Management）"
description: "介绍 Agent 的短期记忆、长期记忆、Session、State 与 MemoryService。"
date: 2026-05-22
math: true
categories:
    - Ai
tags:
    - Agent
---

## 1. 什么是记忆管理？

记忆管理（Memory Management）就是让智能体不仅能处理当前输入，还能保存、检索和利用过去的信息，从而保持上下文、完成多步骤任务、实现个性化和长期学习。

它是在前几章基础上的进一步扩展：

```text
工具使用 Tool Use：Agent 能调用外部能力
规划 Planning：Agent 能拆解复杂任务
多智能体协作 Multi-Agent Collaboration：多个 Agent 分工合作
记忆管理 Memory Management：Agent 能记住信息、利用历史、保持连续性
```

## 2. 为什么 Agent 需要记忆？

没有记忆的 Agent，本质上是无状态的。

也就是说，它只能处理当前这一轮输入，无法稳定知道：

```text
你刚才说了什么
任务现在做到哪一步
你之前有什么偏好
过去哪些方案成功过
历史对话里有哪些重要信息
```

所以记忆的作用是让 Agent 从一次性问答模型，变成有上下文、有历史、有持续性的任务执行系统。

## 3. 短期记忆和长期记忆

Agent 的记忆通常分成两类：

```text
短期记忆 Short-term Memory
长期记忆 Long-term Memory
```

### 短期记忆

短期记忆也叫上下文记忆、工作记忆、上下文窗口。

它指的是模型在当前会话中能看到的内容，比如：

```text
用户前几轮说的话
模型前几轮的回答
工具调用结果
当前任务状态
临时分析过程
```

### 长期记忆

长期记忆也叫持久记忆、长期知识库。

它指的是 Agent 在多次对话、多次任务、较长周期内需要保存的信息，比如：

```text
用户偏好
用户长期目标
历史项目进度
过去成功策略
失败经验
领域知识
私有文档
长期任务记录
```

## 4. 长期记忆的实现方式

长期记忆通常会放到外部存储系统中，例如：

```text
数据库 Database
知识图谱 Knowledge Graph
向量数据库 Vector Database
文件系统 File System
托管记忆服务 Managed Memory Service
```

其中很常见的一种方式，是使用向量数据库和语义搜索：

```text
文本信息
→ 转成向量 Embedding
→ 存入向量数据库
→ 之后根据语义相似度检索
→ 找到相关记忆
→ 放回当前上下文
→ LLM 基于这些信息回答
```

## 5. 记忆管理适合哪些场景？

### 聊天机器人与对话式 AI

短期记忆负责保持当前对话连贯，长期记忆负责记住用户偏好、历史问题、过去讨论。

### 任务型智能体

多步骤任务必须记住当前进度。比如：

```text
Phase 1：理解数据
Phase 2：EDA
Phase 3：指标分析
Phase 4：README
```

### 个性化体验

长期记忆可以保存用户偏好，例如回答风格、语言习惯、解释深度。

### 学习与提升

Agent 可以记录过去哪些策略有效，哪些策略失败，从而后续调整行为。

### RAG 信息检索

RAG 可以看作长期记忆的一种使用方式：

```text
长期知识库
→ 检索相关文档
→ 放入短期上下文
→ LLM 生成回答
```

## 6. ADK 里的三个核心概念：Session、State、Memory

在 Google ADK 中，记忆管理最核心的三个概念是：

```text
Session 会话
State 状态
Memory 记忆
```

### Session

Session 指的是一次聊天线程。它会记录：

```text
session id
app name
user id
事件历史 events
当前状态 state
最后更新时间 last_update_time
```

你可以把 Session 理解成这一轮对话的容器。

### State

State 是当前会话里的临时记事本，通常是一个字典，例如：

```python
{
    "task_status": "active",
    "current_step": "data_cleaning",
    "last_greeting": "你好，很高兴见到你",
    "user:login_count": 3
}
```

它更像当前任务的变量表。

### Memory

Memory 是跨会话可检索的长期知识，负责长期保存和回忆用户偏好、历史经验、任务记录等信息。

## 7. State 和 events 的区别

### events

记录完整事件历史，比如用户说了什么、Agent 回了什么、工具调用了什么、工具返回了什么。它更像日志。

### state

记录当前任务需要随时访问的关键信息，比如当前步骤、用户偏好、任务状态、工具返回的关键结果。它更像当前任务的变量表。

所以可以简单理解为：

```text
events：完整历史
state：当前关键状态
```

## 8. 记忆服务

**MemoryService** 负责长期记忆。

它通常提供两类能力：

```text
add_session_to_memory：把会话加入长期记忆
search_memory：搜索长期记忆
```

常见实现包括：

```text
InMemoryMemoryService
VertexAiRagMemoryService
VertexAiMemoryBankService
```

## 9. 长期记忆的三种类型

### 语义记忆

记住事实和概念。

### 情景记忆

记住经历和过程。

### 程序性记忆

记住规则和做法，通常会体现在系统提示或行为策略里。

## 10. 记忆管理和前几章怎么连起来？

### 和工具调用的关系

记忆经常通过工具访问，比如 search_memory、save_memory、update_user_profile。

### 和规划的关系

多步骤任务需要记住进度，比如当前做到第几步、哪些子任务完成了、下一步该做什么。

### 和多智能体协作的关系

多个 Agent 协作时，需要共享部分记忆，例如 Research Agent 的结果需要 Writer Agent 和 Reviewer Agent 读取。

## 11. 直观总结

记忆管理的本质可以压缩成一句话：

> 让 Agent 能在有限上下文中保留当前任务状态，并通过外部长期存储回忆跨会话的信息。

你可以这样判断是否需要记忆管理：

```text
只回答一个独立问题 → 不一定需要记忆
需要连续对话 → 需要短期记忆
需要跟踪任务进度 → 需要 State
需要跨会话记住用户偏好或历史 → 需要长期记忆
需要查知识库 → 需要 Memory / RAG
```

![章节配图 12](/12.png)

![章节插图](/11.png)

## 推荐阅读

上一篇：

> [多智能体协作（Multi-Agent Collaboration）]({{< relref "多智能体协作/index.md" >}})

下一篇：

> [学习与适应（Learning and Adaptation）]({{< relref "学习与适应/index.md" >}})
