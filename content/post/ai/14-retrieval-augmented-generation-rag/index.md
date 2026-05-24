---
title: "知识检索（RAG）"
description: ""
date: 2026-05-24
weight: 14
math: true
categories:
    - Ai
tags:
    - Agent
    - RAG
---

这一章讲的是 **知识检索（Retrieval-Augmented Generation，RAG）**。

你前面已经学过 RAG，所以这章不需要当作全新知识来看。它真正想表达的是：

> Agent 不应该只靠模型参数里的旧知识回答问题，而应该在需要时去外部知识源检索信息，再基于检索结果生成答案。

所以这一章的核心是：
**让 Agent 从“闭卷回答”变成“开卷回答”。**

PDF 里也明确说，LLM 的知识通常受限于训练数据，无法访问实时信息、企业内部数据或高度专业化细节，而 RAG 就是为了解决这个限制，让 LLM 能访问外部、最新、特定场景的信息。

---

## 1. RAG 到底在解决什么问题？

普通 LLM 有几个天然限制：

```text
1. 训练数据可能过时
2. 不知道企业内部文档
3. 不知道用户上传的专有资料
4. 对细节问题容易编造
5. 很难给出可验证来源
```

比如你问普通 LLM：

```text
我们公司 2026 年最新远程办公政策是什么？
```

如果它没有连接公司文档，它只能靠猜。

但 RAG 的思路是：

```text
不要让模型直接回答
先去知识库里找相关资料
再把资料交给模型
让模型基于资料回答
```

所以 RAG 的本质不是“模型记住了更多知识”，而是：

> 模型回答前，先查资料。

关键词：

* **知识检索（Retrieval-Augmented Generation，RAG）**：先检索外部知识，再增强提示词，让模型基于资料生成答案。
* **检索（Retrieval）**：从知识库中找相关内容。
* **增强（Augmentation）**：把检索到的内容加入 Prompt。
* **生成（Generation）**：LLM 基于问题和上下文生成答案。
* **外部知识源（External Knowledge Source）**：文档库、数据库、网页、企业 Wiki、手册等。

---

## 2. 最简单的 RAG 流程

最小 RAG 流程是：

```text
用户问题
↓
把问题转成向量
↓
去向量数据库找相似文档块
↓
把相关文档块塞进 Prompt
↓
LLM 根据这些内容回答
```

也就是：

```text
Question → Retrieve Context → Add Context to Prompt → Generate Answer
问题 → 检索上下文 → 增强提示词 → 生成答案
```

PDF 第 2 页图 1 画的就是这个过程：外部文档先被拆成 chunk，每个 chunk 转成 embedding，存入 vector database；用户 query 也转成 embedding，然后检索最相似的 chunk，最后进入 response synthesis。

你可以把它理解成：

```text
普通 LLM：
问题 → LLM → 答案

RAG：
问题 → 检索相关资料 → LLM → 基于资料的答案
```

---

## 3. Chunking：为什么要分块？

**文档分块（Chunking）** 是 RAG 的第一步。

因为一份文档可能很长，比如：

```text
一本 100 页手册
一堆 PDF
一个企业 Wiki
一整套产品文档
```

LLM 不可能每次都把所有文档读进去。

所以要先拆成小块：

```text
文档 → chunk 1
     → chunk 2
     → chunk 3
     → ...
```

比如一本用户手册可以拆成：

```text
安装指南
故障排查
账号管理
计费说明
退订流程
```

用户问“怎么取消订阅”，系统只需要检索“退订流程”相关 chunk，而不是把整本手册都塞给模型。

关键词：

* **文档分块（Chunking）**：把长文档拆成较小文本片段。
* **文本块（Chunk）**：检索的基本单位。
* **上下文窗口（Context Window）**：模型一次能接收的最大输入长度。
* **块重叠（Chunk Overlap）**：相邻 chunk 之间保留一部分重复内容，防止语义被切断。

这里要注意：分块不是越小越好，也不是越大越好。

太小：

```text
信息碎了，缺上下文。
```

太大：

```text
检索不精确，占 token 多。
```

所以 RAG 项目里，chunk size 和 chunk overlap 是非常重要的参数。

---

## 4. Embedding：为什么文本能被搜索？

RAG 里最重要的技术之一是 **嵌入（Embedding）**。

Embedding 的意思是：

> 把文本变成一个向量，也就是一串数字。

比如一句话：

```text
如何取消会员订阅？
```

会被 embedding 模型转成类似：

```text
[0.13, -0.25, 0.88, ...]
```

当然真实向量可能有几百维、上千维。

为什么要这样做？

因为计算机不能直接理解“语义”，但可以计算向量之间的距离。

如果两段话语义接近，它们的向量距离就更近。

例如：

```text
如何取消会员订阅？
怎么退订我的套餐？
我想停止续费。
```

这三句话用词不同，但语义相近，所以 embedding 向量应该接近。

PDF 里也说，RAG 使用嵌入来表达文本语义，含义相近的词或短语在向量空间里距离更近。

关键词：

* **嵌入（Embedding）**：文本的向量表示。
* **向量（Vector）**：一串数字，用来表示文本语义。
* **向量空间（Vector Space）**：文本向量所在的数学空间。
* **语义相似度（Semantic Similarity）**：两段文本在意义上的相似程度。
* **语义距离（Semantic Distance）**：语义差异程度，距离越小越相似。

---

## 5. 向量数据库 Vector Database 是干什么的？

当所有 chunk 都变成 embedding 后，需要一个地方存起来，并且支持快速搜索。

这就是 **向量数据库（Vector Database）**。

它存的不是普通文本表格，而是：

```text
chunk 文本
chunk 的 embedding
chunk 来源信息
文档标题
页码
更新时间
权限信息
```

用户提问时：

```text
问题 → embedding → 去向量数据库找最近的 chunk
```

常见向量数据库包括：

```text
Pinecone
Weaviate
Chroma
Milvus
Qdrant
Postgres + pgvector
Elasticsearch
Redis
```

PDF 里也列到了 Pinecone、Weaviate、Chroma DB、Milvus、Qdrant，以及支持向量检索的 Redis、Elasticsearch、Postgres pgvector 等。

关键词：

* **向量数据库（Vector Database）**：专门存储和查询向量的数据库。
* **近似最近邻搜索（Approximate Nearest Neighbor Search，ANN）**：快速找相似向量。
* **HNSW（Hierarchical Navigable Small World）**：常见的高效向量索引算法。
* **Top-K 检索（Top-K Retrieval）**：返回最相似的前 K 个结果。

---

## 6. BM25 和向量检索有什么区别？

这一章也提到了 **BM25** 和 **混合检索（Hybrid Search）**。

### BM25

**BM25** 是传统关键词检索算法。

它擅长：

```text
精确词匹配
专有名词匹配
代码、型号、术语匹配
```

比如用户问：

```text
ERR_CODE_5027 是什么意思？
```

这种问题用 BM25 可能比 embedding 更稳，因为它需要精确匹配这个错误码。

但 BM25 不理解语义。

比如：

```text
如何取消订阅？
```

如果文档里写的是：

```text
终止会员自动续费流程
```

BM25 可能找不到，因为关键词不同。

---

### 向量检索

向量检索擅长：

```text
语义相似
同义表达
模糊问题
自然语言查询
```

但它可能在精确词上不如 BM25 稳。

---

### 混合检索 Hybrid Search

所以实际项目常用：

```text
BM25 + 向量检索
```

这叫 **混合检索（Hybrid Search）**。

也就是：

```text
既看关键词是否匹配
也看语义是否相似
```

PDF 里也说，传统 BM25 基于关键词频率，不理解语义；为了兼顾两者，常用混合检索，把 BM25 的精确匹配和语义搜索结合。

关键词：

* **BM25（Best Matching 25）**：经典关键词相关性排序算法。
* **向量检索（Vector Search）**：基于 embedding 相似度检索。
* **混合检索（Hybrid Search）**：结合关键词检索和语义检索。

---

## 7. GraphRAG 是什么？

这一章还讲了 **图 RAG（GraphRAG）**。

普通 RAG 的基本单位是 chunk。

它擅长回答：

```text
某个文档里有没有相关内容？
```

但如果问题需要跨多个文档、多个实体、多个关系来综合，普通 RAG 就容易弱。

比如：

```text
A 公司收购 B 公司后，对 C 项目的预算影响是什么？
```

这里涉及：

```text
公司 A
公司 B
收购事件
项目 C
预算变化
时间线
多份文件
```

普通 RAG 可能检索到几个零散 chunk，但不知道它们之间的关系。

GraphRAG 的做法是：

```text
把知识组织成图：
实体是节点
关系是边
```

例如：

```text
A公司 --收购了--> B公司
B公司 --负责--> C项目
C项目 --预算变更为--> 65000
```

这样系统可以沿着关系链推理。

PDF 里说，GraphRAG 利用知识图谱而不是简单向量数据库，通过遍历实体节点和关系边来回答复杂问题，能整合分散在多个文档的信息。

关键词：

* **图 RAG（GraphRAG）**
* **知识图谱（Knowledge Graph）**
* **节点（Node）**：实体，比如人、公司、项目。
* **边（Edge）**：实体之间的关系。
* **实体关系抽取（Entity-Relation Extraction）**：从文本中抽取实体和关系。

GraphRAG 的优点：

```text
更擅长多跳问题；
更擅长关系推理；
更容易整合多个来源；
答案上下文更强。
```

缺点：

```text
构建知识图谱成本高；
维护复杂；
对图结构质量依赖大；
延迟可能更高。
```

---

## 8. 智能体 RAG Agentic RAG 是什么？

这一章最值得你注意的是 **智能体 RAG（Agentic RAG）**。

普通 RAG 是被动流程：

```text
用户问
↓
检索 top-k chunk
↓
塞给 LLM
↓
生成答案
```

它的问题是：

```text
检索结果可能过时；
多个来源可能冲突；
信息可能不完整；
问题可能需要拆解；
知识库里可能没有答案。
```

智能体 RAG 加了一层 Agent，让它主动判断怎么检索、检索结果能不能用、要不要继续查。

PDF 第 4 页图 2 对比了 Naive RAG 和 Agentic RAG：Naive RAG 直接用 query vectors 找 chunks，再喂给模型；Agentic RAG 则会选择工具、调用多个来源，并把结果综合后给模型。

也就是说，Agentic RAG 不只是：

```text
检索 → 生成
```

而是：

```text
分析问题 → 选择工具 → 检索多个来源 → 判断来源质量 → 处理冲突 → 补充检索 → 生成答案
```

---

## 9. Agentic RAG 具体强在哪里？

PDF 里讲了四点，非常关键。

### 第一，来源验证 Source Verification

比如用户问：

```text
公司远程办公政策是什么？
```

普通 RAG 可能同时检索到：

```text
2020 年博客
2025 年官方政策
```

如果它把两个都塞给模型，模型可能答混。

Agentic RAG 会判断：

```text
2025 年官方政策更新；
2020 年博客过时；
优先使用官方政策。
```

关键词：

* **来源验证（Source Verification）**
* **元数据（Metadata）**：文档时间、作者、来源、权限、版本等信息。
* **权威性（Authority）**
* **新鲜度（Freshness）**

---

### 第二，知识冲突处理 Conflict Resolution

比如检索到两份文件：

```text
初步方案：Q1 预算 €50,000
最终报告：Q1 预算 €65,000
```

普通 RAG 可能不知道哪个对。

Agentic RAG 会判断：

```text
最终报告比初步方案更可信；
采用 €65,000；
必要时说明来源冲突。
```

关键词：

* **知识冲突（Knowledge Conflict）**
* **冲突调和（Conflict Resolution）**
* **版本优先级（Version Priority）**

---

### 第三，多步推理 Multi-step Reasoning

比如用户问：

```text
我们产品的功能和定价与竞争对手 X 有什么区别？
```

这不是一次简单检索能解决的。

Agentic RAG 会拆成：

```text
1. 检索我们产品功能
2. 检索我们产品定价
3. 检索竞争对手功能
4. 检索竞争对手定价
5. 做结构化对比
```

关键词：

* **多步推理（Multi-step Reasoning）**
* **查询拆解（Query Decomposition）**
* **子查询（Sub-query）**
* **答案综合（Answer Synthesis）**

---

### 第四，识别知识空缺并调用外部工具

比如用户问：

```text
昨天新产品发布后，市场即时反应如何？
```

内部知识库每周更新一次，所以里面没有昨天的信息。

普通 RAG 可能说“不知道”，或者拿旧信息硬答。

Agentic RAG 会发现：

```text
内部知识库没有最新数据
↓
调用 Web Search
↓
查新闻和社交媒体
↓
再综合回答
```

关键词：

* **知识空缺（Knowledge Gap）**
* **工具调用（Tool Calling）**
* **实时搜索（Real-time Search）**
* **外部工具（External Tool）**

---

## 10. 这一章的代码示例在做什么？

这一章有三个代码方向。

---

### 示例 1：Google Search Tool

```python
from google.adk.tools import google_search
from google.adk.agents import Agent

search_agent = Agent(
    name="research_assistant",
    model="gemini-2.0-flash-exp",
    instruction="You help users research topics. When asked, use the Google Search tool",
    tools=[google_search]
)
```

这个是最简单的“联网检索型 Agent”。

它不是自己知道答案，而是：

```text
用户问研究类问题
↓
Agent 调用 Google Search
↓
基于搜索结果回答
```

这也是 RAG 的一种形式：外部知识源是 Web Search。

---

### 示例 2：Vertex AI RAG Memory Service

```python
memory_service = VertexAiRagMemoryService(
    rag_corpus=RAG_CORPUS_RESOURCE_NAME,
    similarity_top_k=SIMILARITY_TOP_K,
    vector_distance_threshold=VECTOR_DISTANCE_THRESHOLD
)
```

这里重点是两个参数：

```text
SIMILARITY_TOP_K = 5
VECTOR_DISTANCE_THRESHOLD = 0.7
```

含义是：

* **SIMILARITY_TOP_K**：最多取几个相关结果。
* **VECTOR_DISTANCE_THRESHOLD**：语义距离阈值，超过这个距离的结果不要。

也就是说，它在控制：

```text
检索多少条？
相似度至少要多高？
```

如果 top_k 太小：

```text
可能漏掉有用信息。
```

如果 top_k 太大：

```text
可能塞入太多噪声。
```

如果 threshold 太严格：

```text
可能什么都检索不到。
```

如果 threshold 太宽松：

```text
可能拿到无关内容。
```

---

### 示例 3：LangChain + LangGraph RAG

这部分代码展示完整 RAG 流程。

核心步骤是：

```python
loader = TextLoader('./state_of_the_union.txt')
documents = loader.load()
```

加载文档。

```python
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(documents)
```

分块。

```python
vectorstore = Weaviate.from_documents(
    documents=chunks,
    embedding=OpenAIEmbeddings()
)
```

把 chunk 转 embedding，存进 Weaviate 向量库。

```python
retriever = vectorstore.as_retriever()
```

创建检索器。

然后定义 LangGraph 的状态：

```python
class RAGGraphState(TypedDict):
    question: str
    documents: List[Document]
    generation: str
```

这个状态保存三样东西：

```text
用户问题 question
检索到的文档 documents
最终生成 generation
```

然后两个节点：

```python
def retrieve_documents_node(state):
    documents = retriever.invoke(question)
    return {"documents": documents, "question": question, "generation": ""}
```

负责检索。

```python
def generate_response_node(state):
    context = "\n\n".join([doc.page_content for doc in documents])
    generation = rag_chain.invoke({"context": context, "question": question})
    return {"question": question, "documents": documents, "generation": generation}
```

负责生成。

最后 LangGraph 组织流程：

```python
workflow.add_node("retrieve", retrieve_documents_node)
workflow.add_node("generate", generate_response_node)
workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "generate")
workflow.add_edge("generate", END)
```

这就是：

```text
retrieve → generate → end
```

PDF 里也总结说，这段代码用 LangChain 和 LangGraph 实现了 RAG：先创建知识库，分块并转 embedding，存入 Weaviate，然后用 StateGraph 管理检索和生成两个节点。

---

## 11. 这一章和 Agent 有什么关系？

严格说，普通 RAG 不一定是 Agent。

普通 RAG 是一个固定管道：

```text
检索 → 生成
```

它没有太多自主决策。

但 Agentic RAG 才更像 Agent，因为它会：

```text
判断要不要检索；
判断查哪个知识源；
判断结果是否可靠；
发现不够时继续查；
遇到冲突时做取舍；
必要时调用工具。
```

所以你可以这样区分：

| 类型               | 本质                  | 是否像 Agent |
| ---------------- | ------------------- | --------- |
| 普通 RAG Naive RAG | 固定检索管道              | 弱         |
| GraphRAG         | 基于知识图谱检索            | 中         |
| Agentic RAG      | Agent 主动规划、检索、验证、综合 | 强         |

---

## 12. RAG 的主要挑战

这一章也讲了 RAG 的问题。

### 第一，检索不完整

答案可能分散在多个文档里。

如果只检索到其中一部分，答案就会不完整。

---

### 第二，检索噪声

如果检索到无关 chunk，LLM 可能被误导。

这就是：

```text
garbage in, garbage out
```

RAG 的答案质量强依赖检索质量。

---

### 第三，信息冲突

不同文档可能说法不一致。

比如旧版政策和新版政策同时存在。

如果系统不会判断版本，就容易答错。

---

### 第四，知识库维护成本高

RAG 不是把文件丢进去就完了。

真实项目里要处理：

```text
文档更新；
增量索引；
权限控制；
重复文档；
过期文档；
元数据；
引用；
评估指标；
检索延迟；
成本。
```

PDF 里也说，RAG 需要把知识库预处理并存入专用数据库，还要定期同步以保持最新，这会增加延迟、运维成本和 token 数量。

---

## 13. 最直观的总结

这一章可以用一句话概括：

> RAG 让 Agent 在回答前先查资料；Agentic RAG 则让 Agent 不只是查资料，还会判断资料靠不靠谱、够不够、有没有冲突。

普通 LLM 是：

```text
闭卷考试
```

RAG 是：

```text
开卷考试
```

Agentic RAG 是：

```text
会自己决定查哪本书、查哪几页、比较多个来源、发现不够再继续查的开卷系统
```

所以这一章的关键不是再背一遍 RAG 流程，而是理解它在 Agent 系统里的意义：

> RAG 给 Agent 提供外部知识；Agentic RAG 给 Agent 提供主动检索、验证和综合知识的能力。

前者解决“模型不知道”的问题。
后者进一步解决“查到的信息未必可靠、完整、最新”的问题。

## 推荐阅读

上一篇：

> [人类参与环节（Human-in-the-Loop，HITL）](../13-human-in-the-loop/)

下一篇：

> [智能体间通信（A2A）](../15-agent-to-agent-communication-a2a/)

