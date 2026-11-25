---
{ title: 第四章　收益率的线性模型, description: "", categories: [ 经济 ], tags: [ 量化 ], params: { lang: zh }, date: 2026-11-24T16:52:58+08:00, draft: false, slug: 第四章-收益率的线性模型 }
---

## 本章的问题

1. 什么是资产收益率的因子模型？它是如何构建的？
2. 因子模型有哪些不同的解释（图模型、效应的叠加、单资产内积）？
3. 因子张成的 Alpha 与正交 Alpha 分量如何贡献于资产收益率？
4. 可以对因子模型施加哪些变换（旋转、投影、扩展）？它们如何影响模型？
5. 因子模型在金融中的实际应用有哪些，例如业绩归因、风险管理、投资组合构建和 Alpha 研究？
6. 因子模型有哪些不同类型（特征模型、统计模型、宏观经济模型）？它们在实践中是如何使用的？

资产收益率的线性模型是本书的基石。它们灵活、可解释，在实际应用中表现良好，并有理论支持。此外，它们与均值—方差优化十分契合，也可以作为风险管理、业绩分析等若干重要任务的基础。你（读者）可能会在某个时候发现，这类模型在某些方面并不充分。但是，即使你的研究已经超出了这类模型的范围，也不意味着你会发现它们毫无用处。它们仍然能够帮助你思考整个投资过程，其中的一些理论也会派上用场。

![image](image-8.png)

***

## 4.1 因子模型

![image](image-5.png)

在第 2 章中，我们已经看到如何对单变量收益率建模。向多变量收益率的一种直接扩展，是将每只证券的收益率建模为一个独立过程。然而，这并不充分，因为收益率之间存在依赖关系。一个自然的步骤是，将股票之间的共同依赖关系建模为由少数共同的随机性来源所产生，这些来源称为 **因子（Factors）**；然后，为每只证券保留一个独立于因子的随机性来源。股票收益率的这一模型称为 **因子模型（Factor Model）** [^1]，其形式为：

$$
\mathbf r_t=\boldsymbol\alpha+\mathbf B\mathbf f_t+\boldsymbol\epsilon_t.\tag{4.1}
$$

其中：

- $t\in\mathbb N$ 表示离散时间区间。
- 随机向量 $\mathbf r_t$ 表示 $n$ 项资产的收益率减去无风险利率（见 2.1.2 节）。
- $\boldsymbol\alpha$ 是一个 $n$ 维 Alpha 向量。
- 随机向量 $\mathbf f_t$ 表示 $m$ 个因子收益率（Factor Returns）。在大多数模型中，$m$ 远小于 $n$。可以把因子收益率理解为市场中普遍存在的不确定性来源，它们以某种方式影响所有资产的收益率。
- $\mathbf B$ 是一个 $n\times m$ 的 **载荷矩阵（Loadings Matrix）**。矩阵元素 $[\mathbf B]_{i,j}$ 是资产 $i$ 相对于因子 $j$ 的载荷。可以把 $\mathbf B$ 理解为存储数据的矩阵，其中的数据规定了因子收益率如何传导至资产收益率。
- $\boldsymbol\epsilon_t$ 是由 $n$ 个 **特异性收益率（Idiosyncratic Returns）** [^2] 构成的随机向量。可以从两个方面解释这些收益率。正面的解释是，它们是资产所特有且与所有其他收益率不相关的收益率；反面的解释是，在移除普遍存在的风险来源之后，资产收益率中剩余的分量。

{{< figure src="image-7.png" alt="image" class="bw-image-caption" caption="因子描述共同的市场变化，载荷描述不同企业对这种变化的敏感程度。" original="![image](image-7.png)" >}}

如果随机向量 $\boldsymbol\epsilon_t$ 具有一般的分布，我们就无法在分析的易处理性方面获得任何好处。因此，我们假定：（i）向量 $\boldsymbol\epsilon_t$ 对所有 $s$ 都独立于因子收益率 $\mathbf f_s$；（ii）$E[\boldsymbol\epsilon_t]=0$；（iii）协方差矩阵 $\boldsymbol\Omega_{\epsilon,t}:=\operatorname{var}(\boldsymbol\epsilon_t)$ 是对角矩阵，或者至少在某种意义上是稀疏的。通常，具有对角协方差矩阵的模型称为严格因子模型（Strict Factor Models），具有稀疏协方差矩阵的模型称为近似因子模型（Approximate Factor Models）。向量 $\boldsymbol\epsilon_t$ 是资产收益率的特异性分量。


我们通常将 $\mathbf B\mathbf f_t$ 称为资产收益率的 **系统性分量（Systematic Component）**。我们假定 $(\mathbf f_t,\boldsymbol\epsilon_t)$ 在不同时间区间内同分布，或者其分布缓慢变化，并且对于每个 $t$，$\mathbf f_t$ 与 $\boldsymbol\epsilon_t$ 相互独立。分别用 $\boldsymbol\Omega_f\in\mathbb R^{m\times m}$ 和 $\boldsymbol\Omega_\epsilon\in\mathbb R^{n\times n}$ 表示 $\mathbf f_t$ 和 $\boldsymbol\epsilon_t$ 的协方差矩阵。使用这些记号，资产的协方差矩阵为：

$$
\boldsymbol\Omega_r=\mathbf B\boldsymbol\Omega_f\mathbf B^T+\boldsymbol\Omega_\epsilon.\tag{4.2}
$$

{{< figure src="image-6.png" alt="image" class="bw-image-caption" caption="严格因子模型" original="![image](image-6.png)" >}}

这一分解是线性收益率模型中波动率建模的核心，也是第 6 章和第 7 章的主题。

> **常见问题 4.1　协方差矩阵的分解**
>
>
> 协方差矩阵 $\boldsymbol\Omega_r$ 不依赖于截距 $\boldsymbol\alpha$，而且 $\mathbf B\mathbf f_t$ 与 $\boldsymbol\epsilon_t$ 相互独立，因此 $\boldsymbol\Omega_r=\operatorname{cov}(\mathbf B\mathbf f_t)+\boldsymbol\Omega_\epsilon$。因子项是 $\mathbf f_t$ 的线性变换。对于任意具有协方差矩阵 $\boldsymbol\Omega_\xi$ 的随机向量 $\boldsymbol\xi$，有 $\operatorname{cov}(\mathbf B\boldsymbol\xi)=\mathbf B\boldsymbol\Omega_\xi\mathbf B^T$，因为：
>
> $$
> [\operatorname{cov}(\mathbf B\boldsymbol\xi)]_{i,j} =\operatorname{cov}\left(\sum_k[\mathbf B]_{i,k}\xi_k,\sum_l[\mathbf B]_{j,l}\xi_l\right)=\sum_{k,l}[\mathbf B]_{i,k}[\boldsymbol\Omega_\xi]_{k,l}[\mathbf B]_{j,l}=[\mathbf B\boldsymbol\Omega_\xi\mathbf B^T]_{i,j}.
> $$
>
> 在本章中，我们暂且搁置如何从数据估计式（4.1）的参数这一非常重要的问题，转而关注它的使用和解释。接下来几节的安排如下。首先，我们回顾式（4.1）的三种解释：
>
> 1. 将其视为图模型。
> 2. 将其视为低维横截面收益率向量的叠加。
> 3. 将其视为因子收益率向量与资产载荷向量的重合。
>
> 然后，我们分析 Alpha 的来源，即因子张成的 Alpha 与正交 Alpha。这些是处于研究过程核心的基本概念。第三，我们回顾可以对因子模型进行的三种变换：
>
> 1. 旋转保持模型的维数不变，其预测也保持“不变”。
> 2. 投影降低模型的维数。
> 3. 扩展通过增加因子来扩大模型。
>
> 这些数学运算是量化投资组合管理人用来重新表述、简化或扩展模型的多用途工具。第四，我们描述因子模型的用途，其中有相当多的用途：
>
> 1. 预测和分解波动率，从而将想要承担的风险与不想承担的风险分离开来。
> 2. 作为投资组合构建的基本输入。
> 3. 理解业绩，将技能与运气区分开来。
> 4. 作为 Alpha 研究的基础。

## 4.2 因子模型的解释

在开始解释之前，让我们通过一个例子使因子模型更加具体。在图 4.1 中，你可以看到风险模型中使用的一个“典型”载荷矩阵。其中几列包含风格载荷（Style Loadings）[^3]。其他列由虚拟变量（Dummy Variables）[^4] 构成，用于表示股票是否属于某个特定行业。可能有一列对应“能源勘探和生产企业”，一列对应“生物技术公司”，等等。如果某只股票属于该行业，其载荷就是“1”，否则就是“0”。最后，还有一些由虚拟变量构成的列，用于表示国家分类，与行业分类类似。当某个国家或行业的因子收益率较高时，它会带动该行业的所有股票。因子结构捕捉具有某些明显共同特征的股票之间的共同变动，也捕捉那些具有不那么明显的共同特征的股票之间的共同变动。

{{< figure src="image.png" alt="image" class="bw-image-caption" caption="图 4.1　一个典型的载荷矩阵，被划分为不同的区块。风格载荷包含一个“截距”因子（有时称为“国家”因子）。其载荷均为 1，截距因子对所有资产总收益率的贡献都相同。其他风格载荷通常经过标准化。如果资产属于某个国家或行业，相应的国家和行业载荷取值为 1。" original="![image](image.png)" >}}


尽管式（4.1）比现代统计学还要古老（实际上源自高斯未发表的研究），但其含义出人意料地丰富，在金融应用中可能更加丰富。首先，让我们回顾该方程的几种解释。

### 4.2.1 图模型

第一种解释是将其视为 **图模型（Graphical Model）** [^5]。由于 $\mathbf r-\boldsymbol\alpha=\mathbf B\mathbf f$，对于每项资产 $i$，下式成立：

$$
E(r_i-\alpha_i\mid\mathbf f)=\sum_j[\mathbf B]_{i,j}f_j.
$$

众多资产的每一项收益率都依赖于少数因子收益率中的全部或一部分。在一个典型的区域风险模型（例如美洲、亚洲或欧洲）中，我们最多有 10,000 项资产和 100 个因子。图 4.2 以可视化方式展示了这一关系。少数因子（圆形）通过载荷 $\mathbf B$ 所提供的连接（箭头），决定资产超过 $\boldsymbol\alpha$ 的预期收益率（方形）。当矩阵 $\mathbf B$ 稀疏时，相应的图也是稀疏的。

{{< figure src="image-2.png" alt="image" class="bw-image-caption" caption="图 4.2　作为图模型的因子模型。" original="![image](image-2.png)" >}}

### 4.2.2 效应的叠加

第二种解释是将其视为对资产收益率的各种影响的叠加。这是一个关于收益率横截面（Cross-Section）的模型，即给定时点的收益率向量模型。设 $[\mathbf B]_{\bullet,j}$ 是矩阵 $\mathbf B$ 的第 $j$ 列。我们将 $E(\mathbf r-\boldsymbol\alpha)=\mathbf B\mathbf f$ 重写为：

$$
E(\mathbf r-\boldsymbol\alpha\mid\mathbf f)=\sum_j[\mathbf B]_{\bullet,j}f_j.
$$

预期超额收益率向量是少数向量（特定因子的载荷 $[\mathbf B]_{\bullet,j}$）按照因子收益率加权后的叠加。这清楚地表明，横截面的因子分量位于一个低维空间中：$\mathbf B$ 的列空间（Column Space）。如图 4.3 所示。

{{< figure src="image-3.png" alt="image" class="bw-image-caption" caption="图 4.3　因子模型是加权因子载荷的叠加。" original="![image](image-3.png)" >}}

### 4.2.3 单资产内积

最后一种解释适用于单项资产。在给定因子收益率的条件下，一项资产的预期收益率等于该资产的载荷与因子收益率向量的标量积（Scalar Product）：

$$
E(r_i-\alpha_i\mid\mathbf f)=\langle[\mathbf B]_{i,\bullet},\mathbf f\rangle.
$$

虽然这一公式很少在单项资产层面使用，但在将它应用于投资组合时，它却频繁出现。考虑一个投资组合 $\mathbf w\in\mathbb R^n$，其中 $w_i$ 是投资于资产 $i$ 的净市值（Net Market Value，NMV）[^6]；对于股票而言，这是股价乘以所持有的多头或空头股份数量。投资组合的预期损益为：

$$
E(\mathbf w^T\mathbf r\mid\mathbf f)=E\left(\sum_i w_i r_i\mid\mathbf f\right)=\sum_i[\alpha_i+\langle[\mathbf B]_{i,\bullet},\mathbf f\rangle]w_i.
$$

图 4.4 展示了 $\alpha_i=0$ 这一特殊情形下的关系。我们将在 4.5.1 节中解释 $\langle[\mathbf B]_{i,\bullet},\mathbf f\rangle w_i$ 这一项。它是可归因于因子收益率的损益。我们用标量积来解释投资组合的这种因子损益（Factor PnL），并在标量积中识别最大的贡献者、损益在各因子之间的分散程度，等等。这是业绩归因的出发点，本书后面将对此进行广泛讨论。

{{< figure src="image-4.png" alt="image" class="bw-image-caption" caption="图 4.4　因子模型是各股票载荷与因子收益率的标量积。" original="![image](image-4.png)" >}}

## 4.3 因子张成的 Alpha 与正交 Alpha

考虑因子方程：

$$
\mathbf r_t=\boldsymbol\alpha+\mathbf B\mathbf f_t+\boldsymbol\epsilon_t,
$$

其中 $\mathbf f_t$ 独立同分布（iid），具有有限的均值和方差；$\boldsymbol\epsilon_t$ 独立同分布（独立于 $\mathbf f_t$），具有零无条件均值和有限方差。将 $\boldsymbol\alpha$ 分解为它在 $\mathbf B$ 的列空间（即算子 $\mathbf B$ 的像）上的投影与正交补之和：$\boldsymbol\alpha=\mathbf B\boldsymbol\lambda+\boldsymbol\alpha_\perp$。根据构造，等式 $\mathbf B^T\boldsymbol\alpha_\perp=0$ 成立。因此，我们有 $\mathbf r_t=\boldsymbol\alpha_\perp+\mathbf B(\boldsymbol\lambda+\mathbf f_t)+\boldsymbol\epsilon_t$。从这一关系可以看出，因子模型存在不确定性。将模型重写为以下形式是有用的：

$$
\mathbf r_t=\boldsymbol\alpha_\perp+\mathbf B[\boldsymbol\lambda+E(\mathbf f_t)]+\mathbf B[\mathbf f_t-E(\mathbf f_t)]+\boldsymbol\epsilon_t.
$$

其中 $\boldsymbol\alpha_\parallel:=\mathbf B[\boldsymbol\lambda+E(\mathbf f_t)]$。由 $\mathbf B$ 的各列张成的“Alpha”无法与因子的预期收益率区分开来。然而，$\boldsymbol\alpha_\parallel$ 这一项并不依赖于如何划分 $\boldsymbol\lambda$ 与 $E(\mathbf f_t)$ 两项的贡献。在本书余下的部分，我们令 $\boldsymbol\lambda=0$，并令 $\boldsymbol\mu_f:=E[\mathbf f_t]$。现在，来展示一点精彩的东西：如果你选择一个与 Alpha 向量成比例的投资组合：

$$
\mathbf w=\frac{\boldsymbol\alpha_\perp}{\|\boldsymbol\alpha_\perp\|},
$$

其收益为：

$$
\mathbf w^T\mathbf r_t=\frac{1}{\|\boldsymbol\alpha_\perp\|}\boldsymbol\alpha_\perp^T\mathbf r_t=\|\boldsymbol\alpha_\perp\|+\frac{\boldsymbol\alpha_\perp^T\boldsymbol\epsilon_t}{\|\boldsymbol\alpha_\perp\|}.
$$

该投资组合的预期收益率和方差分别为：

$$
E(\mathbf w^T\mathbf r_t)=\|\boldsymbol\alpha_\perp\|,\quad \operatorname{var}(\mathbf w^T\mathbf r_t)=\frac{\boldsymbol\alpha_\perp^T\boldsymbol\Omega_\epsilon\boldsymbol\alpha_\perp}{\|\boldsymbol\alpha_\perp\|^2}.
$$

方差存在一个由算子范数（Operator Norm）给出的上界：

$$
\frac{\boldsymbol\alpha_\perp^T\boldsymbol\Omega_\epsilon\boldsymbol\alpha_\perp}{\|\boldsymbol\alpha_\perp\|^2}\leq\|\boldsymbol\Omega_\epsilon\|.
$$

因此：

$$
\mathrm{SR}=\frac{E(\mathbf w^T\mathbf r_t)}{\sqrt{\operatorname{var}(\mathbf w^T\mathbf r_t)}}\geq\frac{\|\boldsymbol\alpha_\perp\|}{\sqrt{\|\boldsymbol\Omega_\epsilon\|}}.
$$

对于对角矩阵而言，$\|\boldsymbol\Omega_\epsilon\|$ 是对角线上的最大元素。假设它存在一个上界。[^7] 这具有一些有趣的含义。考虑这样一种情形，例如，每项资产的平均绝对正交收益率为正：

$$
\frac1n\sum_i|[\boldsymbol\alpha_\perp]_i|=:\mu>0,\quad\text{或等价地}\quad\|\boldsymbol\alpha_\perp\|_1=n\mu.
$$

现在使用 1-范数与欧几里得范数之间的简单不等式：$\|\mathbf x\|_1\leq\sqrt n\|\mathbf x\|_2$。因此 $\|\boldsymbol\alpha_\perp\|_2\geq\sqrt n\mu$。将其应用于正交 Alpha 策略的夏普比率，就得到了夏普比率的一个下界：

$$
\mathrm{SR}\geq\frac{\|\boldsymbol\alpha_\perp\|}{\sqrt{\|\boldsymbol\Omega_\epsilon\|}}\geq\frac{\sqrt n\mu}{\sqrt{\|\boldsymbol\Omega_\epsilon\|}}.\tag{4.3}
$$

让我们总结到目前为止所作的假设，除了因子模型正确之外，我们还假定：

1. 最大的特异性方差[^8] 关于资产数量是一致有界的；
2. $\boldsymbol\alpha_\perp$ 各坐标绝对值的平均值具有下界 $\mu$。

我们已经获得了一个投资组合策略夏普比率的下界。如果随着 $n$ 增大，[^9] 这些界仍然是一致的，那么我们就得到一个趋向无穷大的夏普比率序列！这在现实中极不可能，因此我们所作的假设——因子模型、特异性方差的界、正交预期收益率的界——至少有一个可能是不正确的。在因子模型正确的假设下，特异性方差有限的假设似乎在实践中成立。这就只剩下一个事实：特异性的正交预期收益率随着 $n$ 增大而趋于消失。让我们用具体的语言总结这个结果：

- 如果线性模型是收益率的一个良好近似，那么 Alpha 要么是因子张成的（Alpha Spanned），要么是正交的（Alpha Orthogonal）。
- **正交 Alpha 极其宝贵**：如果在资产层面具有正的预期 Alpha，那么你的夏普比率将以 $\sqrt n$ 的速率增长；这是在不牺牲收益的情况下分散风险时出现的典型速率。
- 超额收益确实存在，但它们更有可能来自因子张成的 Alpha。正如我们将在下一章看到的，这种 Alpha 伴随着无法通过大量资产实现分散化而消除的风险。

## 4.4 变换

### 4.4.1 旋转

因子模型并不能被唯一识别。设 $\mathbf C$ 是一个 $m\times m$ 的可逆矩阵，并定义：

$$
\widetilde{\mathbf B}=\mathbf B\mathbf C^{-1},\quad \widetilde{\mathbf f}=\mathbf C\mathbf f.
$$

$\widetilde{\mathbf B}$ 的各列与 $\mathbf B$ 的各列张成相同的子空间。模型

$$
\mathbf r=\boldsymbol\alpha+\widetilde{\mathbf B}\widetilde{\mathbf f}+\boldsymbol\epsilon
$$

与原模型具有相同的收益率。这通常称为因子模型的**旋转不确定性**。

变换后的因子的协方差矩阵为 $\widetilde{\boldsymbol\Omega}_f=\mathbf C\boldsymbol\Omega_f\mathbf C^T$。本书中将有若干旋转不确定性的应用。旋转使我们能够为最终用户提供同一模型的不同视角。我们通过三个有启发性的例子探讨因子变换对因子收益率的影响：单位因子协方差矩阵、标准正交载荷以及 Z 分数标准化的载荷。

**单位因子协方差矩阵（Identity Factor Covariance Matrix）。** 有时，模型的使用者希望看到不相关且具有单位方差的因子收益率。在这一视角下，投资组合的敞口可以直接解释为因子波动率，而投资组合的因子风险是敞口的平方和，不包含协方差项。

通过对 $\boldsymbol\Omega_f=\mathbf U\mathbf S\mathbf U^T$ 进行奇异值分解（Singular Value Decomposition，SVD）[^10]，然后令 $\mathbf C:=\mathbf S^{-1/2}\mathbf U^T$，就能够获得风险模型的这一视角。由此得出：

$$
\widetilde{\boldsymbol\Omega}_f=\mathbf C\boldsymbol\Omega_f\mathbf C^T=\mathbf S^{-1/2}\mathbf U^T\mathbf U\mathbf S\mathbf U^T\mathbf U\mathbf S^{-1/2}=\mathbf I.
$$

**标准正交载荷（Orthonormal Loadings）。** 我们也可以选择一种旋转，使载荷标准正交，即 $\widetilde{\mathbf B}^T\widetilde{\mathbf B}=\mathbf I_m$。这意味着 $\widetilde{\mathbf B}$ 的每一列都具有单位范数（但不具有单位方差，因为该列可能具有非零均值），并且与其他列正交。在这种情况下，变换为 $\mathbf C^{-1}:=\mathbf V\mathbf S^{-1}$，其中 $\mathbf V$ 和 $\mathbf S$ 来自奇异值分解 $\mathbf B=\mathbf U\mathbf S\mathbf V^T$。我们得到 $\widetilde{\mathbf B}=\mathbf U$。

**Z 分数标准化载荷（Z-Scored Loadings）。** 对因子载荷进行 Z 分数标准化是一种常见的操作。它包括对一个或多个因子的载荷进行线性重新缩放，使新的载荷具有零均值和单位方差（因为它们具有零均值，所以也具有单位平方范数）。这一变换的好处是使载荷更容易解释。某只股票对该因子的敞口是否高于平均水平？高出多少？在标准化的基础上，投资组合对该因子的平均敞口是多少？这样的线性变换是否会产生一个等价的因子模型？

> **常见问题 4.2　载荷标准化与因子模型的变化**
>
>
> 只有当全 1 向量 $(1,1,\ldots,1)$ 能够表示为原模型载荷向量的线性组合时，对模型载荷进行 Z 分数标准化才会产生一个与使用原始载荷的模型具有相同预测的模型。一种特殊情形是，“国家”因子（或“截距”因子）属于原始因子。如果不是这样，对因子进行 Z 分数标准化将产生一个给出不同风险预测和业绩归因的模型。
>
> 可以将因子 $i$ 的载荷乘以常数 $\kappa_i$：只需考虑 $\mathbf C:=\operatorname{diag}(\kappa_1^{-1},\ldots,\kappa_m^{-1})$，它总是可逆的。然而，一般而言，并不能对载荷进行中心化（你可以尝试在练习 4.4 中找出一个反例）。不过，假设全 1 向量位于载荷列向量张成的子空间中，即存在一个向量 $\mathbf a\in\mathbb R^m$，使得 [^11] $\mathbf e=\mathbf B\mathbf a$。在这种情况下，中心化是可行的。如果我们希望将常数 $\kappa_i$ 加到载荷上，那么 $\widetilde{\mathbf B}=\mathbf B+\mathbf e\mathbf e^T\operatorname{diag}(\boldsymbol\kappa)=\mathbf B(\mathbf I_m+\mathbf a\mathbf a^T\mathbf B^T\operatorname{diag}(\boldsymbol\kappa))$，因此我们的变换为：
>
> $$
> \mathbf C^{-1}=\mathbf I_m+\mathbf a\mathbf a^T\mathbf B^T\operatorname{diag}(\boldsymbol\kappa).\tag{4.4}
> $$
>
> 这一假设在两种常见情形下得到满足。第一种是使用一个“市场”因子（也称为“国家”因子），所有资产对它都具有单位敞口。根据构造，此时的载荷向量就是 $\mathbf e$。第二种情形是存在国家或行业载荷，使得对于每项资产，跨行业的载荷之和恰好为 1。在这种情况下，对于一个在对应行业因子的位置上为 1、其他位置上为 0 的向量 $\mathbf a$，有 $\mathbf e=\mathbf B\mathbf a$。

### 4.4.2 投影

有时，我们可能希望使用一个比原模型具有更少因子的风险模型。乍看起来，这种操作似乎缺乏合理性。如果我们相信自己的风险模型是最准确的，为什么还要用另一个模型替代它？原因有很多。例如，在实践中，一个或多个因子的载荷可能变化得太快，以至于使投资组合管理和对冲变得困难。另一个原因是，我们使用的是供应商提供的模型，并且认为该模型并不完美，即某些因子应当从模型中剔除。第三个原因可能是，我们希望为最终用户提供一个尽可能准确的“简化”风险模型，同时保留完整模型供其他用途使用。出于这些以及其他原因，我们需要找到一个在某种意义上与原模型接近的不同风险模型。

我们有一个模型 $\mathbf r=\boldsymbol\alpha+\mathbf B\mathbf f+\boldsymbol\epsilon$ 以及相关的协方差矩阵 $\boldsymbol\Omega_r=\mathbf B\boldsymbol\Omega_f\mathbf B^T+\boldsymbol\Omega_\epsilon$，但我们希望使用另一个载荷矩阵 $\mathbf A$，其中 $\mathbf A$ 的值域包含于 $\mathbf B$ 的值域。如果我们将收益率建模为 $\mathbf r=\boldsymbol\alpha+\mathbf A\mathbf g+\boldsymbol\eta$，那么协方差矩阵将是 $\boldsymbol\Omega_r=\mathbf A\boldsymbol\Omega_g\mathbf A^T+\boldsymbol\Omega_\eta$。使我们原始模型获得最佳近似的 $\mathbf g$ 的值是什么？设原始因子收益率 $\mathbf f$ 与近似因子收益率 $\mathbf g$ 之间的距离为 $\|\mathbf B\mathbf f-\mathbf A\mathbf g\|^2$。

使距离最小化的近似因子收益率为 $\mathbf g=\mathbf H\mathbf f$，其中 $\mathbf H:=(\mathbf A^T\mathbf A)^{-1}\mathbf A^T\mathbf B$。相应的 $\boldsymbol\Omega_g$ 的值为 $\boldsymbol\Omega_g=\mathbf H\boldsymbol\Omega_f\mathbf H^T$。

> **常见问题 4.3　投影的类型**
>
>
> 哪些类型的投影在实践中有用？
>
> 1. 矩阵 $\mathbf A$ 的列是矩阵 $\mathbf B$ 的列的一个子集。因此，我们将尽可能多的风险和业绩归因于从原模型派生的嵌套因子模型。到目前为止，这是投影的主要应用。
> 2. 矩阵 $\mathbf A$ 的列张成的子空间并不包含于矩阵 $\mathbf B$ 的列张成的子空间。在这种情况下，其应用在于从定性上考察第二个模型描述第一个模型的因子风险预测的能力。
>
> 我们将算子 $\mathbf H$ 称为投影（Projection），因为它们像几何投影一样是幂等的（Idempotent）。幂等线性算子 $\boldsymbol\Pi$ 满足 $\boldsymbol\Pi^2\mathbf x=\boldsymbol\Pi\mathbf x$。几何上的直觉是，一旦将一个向量投影到一个平面上，再将所得向量投影到同一平面上，就不会得到另一个向量，因为输入向量已经位于该平面上。

### 4.4.3 扩展

在前两节中，我们介绍了一种保持因子数量的变换，以及一种减少因子数量的变换。最后一节关注增加因子数量的变换。因此，我们将载荷矩阵提升为一个新的矩阵，其列空间包含旧矩阵的列空间。为什么这可能有意义？实践中可能发生的一种情形是，我们的因子模型可能是根据无法代表当前市场状态的历史数据开发的。因此，特异性收益率表现出某种结构，即它们本身可以被表述为另一个因子模型：

$$
\boldsymbol\epsilon=\mathbf A\mathbf g+\boldsymbol\eta,
$$

其中 $\mathbf A\in\mathbb R^{n\times p}$，$\mathbf g$ 是一个取值于 $\mathbb R^p$ 的随机变量，$\boldsymbol\eta$ 是一个取值于 $\mathbb R^n$ 的随机变量。新的模型变为：

$$
\mathbf r=\boldsymbol\alpha_\perp+\mathbf B\mathbf f+\mathbf A\mathbf g+\boldsymbol\eta,\tag{4.5}
$$

其中 $\boldsymbol\eta$ 与 $\mathbf f,\mathbf g$ 不相关。在模型（4.5）的设定中，我们要求 $\mathbf A^T\mathbf B=0$。否则，原模型的因子收益率就必须被修改。为说明这一点，假设 $\mathbf B^T\mathbf A\ne0$。那么，我们可以将 $\mathbf A$ 的各列分解为平行分量和正交分量之和。用矩阵表示，对于某个 $\mathbf C\in\mathbb R^{m\times p}$，有 $\mathbf A=\mathbf B\mathbf C+\mathbf H$。由此，模型 $\mathbf r=\mathbf B\mathbf f+\mathbf A\mathbf g+\boldsymbol\eta$ 可以写为 $\mathbf r=\mathbf B(\mathbf f+\mathbf C\mathbf g)+\mathbf H\mathbf g+\boldsymbol\eta$。

$$
\boldsymbol\epsilon^T\mathbf B\mathbf f=0 \quad \text{（原模型的正交条件）}
$$

$$
\boldsymbol\eta^T\mathbf A\mathbf g=0 \quad \text{（残差模型的正交条件）}
$$

$$
\boldsymbol\eta^T(\mathbf B\mathbf f+\mathbf A\mathbf g)=0 \quad \text{（最终模型的正交条件）}
$$

由第二个和第三个等式可得 $\boldsymbol\eta^T\mathbf B\mathbf f=0$；第一个等式可以重写为 $0=(\mathbf g^T\mathbf A^T+\boldsymbol\eta^T)\mathbf B\mathbf f=\mathbf g^T\mathbf A^T\mathbf B\mathbf f$，对于 $\mathbf f,\mathbf g$ 的所有实现值都成立，因此 $\mathbf A^T\mathbf B=0$。上面的例子假设每项资产的特异性收益率具有相同的波动率（同方差波动率，Homoskedastic Volatilities）。在第 9 章中，我们将看到，当特异性收益率具有异方差时，如何在特征模型框架内扩展一个风险模型。

## 4.5 应用

### 4.5.1 业绩归因

投资组合在区间 $[t-1,t]$ 内的损益是多少？

$$
(\text{投资组合损益}_t)=\mathbf w_t^T\mathbf r_t=\mathbf w_t^T\mathbf B\mathbf f_t+\mathbf w_t^T(\boldsymbol\alpha_\perp+\boldsymbol\epsilon_t)=\mathbf b_t^T\mathbf f_t+\mathbf w_t^T(\boldsymbol\alpha_\perp+\boldsymbol\epsilon_t)\quad(\mathbf b_t:=\mathbf B^T\mathbf w_t).
$$

向量 $\mathbf b_t\in\mathbb R^m$ 表示投资组合在时刻 $t$ 的 **因子敞口（Factor Exposures）**。项 $[\mathbf b_t]_i$ 是每只股票因子 $i$ 的特征按照投资组合持仓加权后的总和；请记住，特征和权重都可以为负。项 $\mathbf b_t^T\mathbf f_t$ 是时间区间 $t$ 内的因子损益，而项 $\mathbf w_t^T(\boldsymbol\alpha_\perp+\boldsymbol\epsilon_t)$ 是特异性损益（Idiosyncratic PnL）。在时间区间 $[1,\ldots,T]$ 上求和，策略的损益为：

$$
\mathrm{PnL}=(\text{因子损益})+(\text{特异性损益}).
$$
![image](image-9.png)

我们也可以按照不同的方式分配求和：

$$
\mathrm{PnL}=\sum_{t=1}^T\big[(\text{因子损益}_t)+(\text{特异性损益}_t)\big]=\sum_{t=1}^T\sum_{j=1}^m[\mathbf b_t]_j[\mathbf f_t]_j+\sum_{t=1}^T\sum_{i=1}^n[\mathbf w_t]_i[\boldsymbol\alpha_\perp+\boldsymbol\epsilon_t]_i=\sum_{j=1}^m(\text{因子 }j\text{ 的损益})+\sum_{i=1}^n(\text{股票 }i\text{ 的特异性损益}).
$$

当然，人们随后可以将因子和股票划分为不同的组，以突出例如来自风格因子、行业因子或特定股票组的业绩。

### 4.5.2 风险管理：预测与分解

如果我们拥有一个协方差矩阵（不一定来自因子模型），那么投资组合 $\mathbf w$ 的方差很容易计算：

$$
\operatorname{var}(\mathbf r^T\mathbf w)=\sum_{i,j}\operatorname{cov}(r_iw_i,r_jw_j)=\sum_{i,j}w_i\operatorname{cov}(r_i,r_j)w_j=\mathbf w^T\boldsymbol\Omega_r\mathbf w.
$$

我们可以将该公式应用于与因子模型相关的协方差矩阵：

$$
\operatorname{var}(\mathbf r^T\mathbf w)=\mathbf w^T(\mathbf B\boldsymbol\Omega_f\mathbf B^T+\boldsymbol\Omega_\epsilon)\mathbf w=\mathbf b^T\boldsymbol\Omega_f\mathbf b+\mathbf w^T\boldsymbol\Omega_\epsilon\mathbf w.
$$

![image](image-10.png)


这一公式具有两种应用。第一种是估计任意时点投资组合的事前波动率（Ex-Ante Volatility）。对于风险管理人而言，这是一项重要的信息，因为他们根据这一度量监控波动率并分配风险。第二种应用是将方差分解为因子分量和特异性分量。与归因的情形一样，这一公式是一个出发点。例如，策略中一个经常被引用的统计量是特异性方差百分比（Percentage of Idiosyncratic Variance），定义为 $100\times(\text{以美元计量的特异性方差})/(\text{总方差})$；特异性方差和因子方差的百分比之和当然为 100。通过对因子进行分组，可以进一步分解因子方差。最细致的划分是每个因子各自构成一个单元素集合，但很常见的选择是（风格组）/（行业组）/（国家组），或者（子行业组）/（风格组）/（国家组）。这一度量及相关的敏感度经常用于监控策略。

无论是对因子还是对资产进行划分，每一种划分都产生一个协方差矩阵 $\boldsymbol\Omega\in\mathbb R^{p\times p}$，其中 $\boldsymbol\Omega_{i,j}$ 是划分组 $i$ 与组 $j$ 之间的协方差。例如，假设一个投资组合的因子敞口为 $\mathbf b$，并且我们将因子划分为 $1,\ldots,p$ 组，其中组 $i$ 包含元素子集 $\mathcal S(i)$。定义 $\mathbf b_{\mathcal S(i)}$ 为一个因子敞口向量，其中不属于 $\mathcal S(i)$ 的所有项都设为零。定义 $\boldsymbol\Omega$ 为各集合损益的协方差矩阵：

$$
\boldsymbol\Omega=\begin{bmatrix}
\mathbf b_{\mathcal S(1)}^T\boldsymbol\Omega_{1,1}\mathbf b_{\mathcal S(1)}&\cdots&\mathbf b_{\mathcal S(1)}^T\boldsymbol\Omega_{1,p}\mathbf b_{\mathcal S(p)}\\
\vdots&\vdots&\vdots\\
\mathbf b_{\mathcal S(p)}^T\boldsymbol\Omega_{p,1}\mathbf b_{\mathcal S(1)}&\cdots&\mathbf b_{\mathcal S(p)}^T\boldsymbol\Omega_{p,p}\mathbf b_{\mathcal S(p)}
\end{bmatrix}.
$$

于是，总因子方差为 $v_{\mathrm{TOT}}^2:=\mathbf e^T\boldsymbol\Omega\mathbf e$，其中 $\mathbf e:=(1\ \ldots\ 1)^T$。第 $i$ 组的方差为 $v_i^2:=\mathbf b_{\mathcal S(i)}^T\boldsymbol\Omega_{i,i}\mathbf b_{\mathcal S(i)}$。

**组 $i$ 占总方差的比例（Fraction of Total Variance）** 为：

$$
p_i:=\frac{\text{组 }i\text{ 的方差}+\text{协方差贡献的一半}}{\text{投资组合方差}}=\frac{\sum_j\boldsymbol\Omega_{i,j}}{v_{\mathrm{TOT}}^2}=\frac{\operatorname{cov}(\mathbf r_i,\mathbf r_{\mathrm{TOT}})}{v_{\mathrm{TOT}}^2}=\beta_i\quad\text{（第 }i\text{ 个因子组的损益相对于总损益的 Beta）}.
$$

因此 $\sum_i p_i=1$。组 $\mathcal S(i)$ 的方差百分比（再次强调，这包括单个因子和单项资产——也许是最常使用的划分！），就是该组收益率相对于整个投资组合的 Beta。

**组 $\mathcal S(i)$ 的边际风险贡献（Marginal Contribution to Risk，MCR）** 定义为：

$$
m_i:=\frac{\text{买入集合 }\mathcal S(i)\text{ 的 100 万美元波动率时组合的波动率变化}}{\text{100 万美元}}=\left.\frac{\partial}{\partial(x_iv_i)}\sqrt{\mathbf x^T\boldsymbol\Omega\mathbf x}\right|_{\mathbf x=\mathbf e}=\frac{1}{v_i v_{\mathrm{TOT}}}\sum_j[\boldsymbol\Omega]_{i,j}=\rho_i\quad\text{（第 }i\text{ 个因子组损益与总损益的相关系数）}=\frac{v_{\mathrm{TOT}}}{v_i}p_i.
$$

**夏普比率敏感度（Sharpe Ratio Sensitivity）。** 计算夏普比率对某个组的波动率变化的敏感度也是有用的。总投资组合的夏普比率相对于组 $i$ 波动率增加的敏感度由下式给出：

$$
\frac{\partial}{\partial(v_ix_i)}\frac{E(\mathrm{PnL})}{\operatorname{vol}(\mathrm{PnL})} =\frac{\operatorname{vol}(\mathrm{PnL})\times\frac{\partial E(\mathrm{PnL})}{\partial(x_iv_i)}-\frac{\partial\operatorname{vol}(\mathrm{PnL})}{\partial(x_iv_i)}\times E(\mathrm{PnL})}{\operatorname{var}(\mathrm{PnL})}=\frac{\operatorname{vol}(\mathrm{PnL})\times\frac{\partial E(\mathrm{PnL})}{\partial(x_iv_i)}-m_i\times\mathrm{SR}_{\mathrm{TOT}}\times\operatorname{vol}(\mathrm{PnL})}{\operatorname{var}(\mathrm{PnL})}=\frac{\mathrm{SR}_{\mathrm{TOT}}}{v_{\mathrm{TOT}}}\left(\frac{\mathrm{SR}_i}{\mathrm{SR}_{\mathrm{TOT}}}-m_i\right).
$$

如果一个组的夏普比率超过某个阈值，则它对总夏普比率的贡献为正。这个阈值就是它的边际风险贡献与总夏普比率的乘积。

> **常见问题 4.4　模型旋转与风险分解**
>
>
> 当我们旋转一个因子模型时，分别将因子载荷和因子协方差矩阵变换为 $\widetilde{\mathbf B}=\mathbf B\mathbf C^{-1}$ 和 $\widetilde{\boldsymbol\Omega}_f=\mathbf C\boldsymbol\Omega_f\mathbf C^T$。在旋转后的模型中，投资组合 $\mathbf w$ 的因子敞口为 $\widetilde{\mathbf b}=\widetilde{\mathbf B}^T\mathbf w=(\mathbf C^T)^{-1}\mathbf b$，因子风险为：
>
> $$
> \widetilde{\mathbf b}^T\widetilde{\boldsymbol\Omega}_f\widetilde{\mathbf b}=\mathbf b^T\mathbf C^{-1}(\mathbf C\boldsymbol\Omega_f\mathbf C^T)(\mathbf C^T)^{-1}\mathbf b=\mathbf b^T\boldsymbol\Omega_f\mathbf b.
> $$
>
> 总因子方差保持不变。总特异性方差（以及单项资产的特异性方差）也保持不变，因为它不依赖于旋转。然而，单个因子的风险方差受到旋转的影响。这是一项优点，而不是缺点。它使我们能够灵活地将风险归因于比其他因子组更有意义（例如，更直观）的因子组。

> **常见问题 4.5　经验协方差矩阵的局限**
>
>
> 在处理因子模型的估计之前，我们先讨论一个初步问题。给定具有总体协方差矩阵 $\boldsymbol\Omega_r$ 的收益率时间序列 $\mathbf r_t$，它最简单的估计量是经验协方差矩阵（Empirical Covariance Matrix）：
>
> $$
> \widehat{\boldsymbol\Omega}_r=\frac1T\sum_{t=1}^T\mathbf r_t\mathbf r_t^T.
> $$
>
> 或者，如果我们用 $\mathbf R\in\mathbb R^{n\times T}$ 表示收益率矩阵，其中 $\mathbf R_{\bullet,t}=\mathbf r_t$，则可以写为 $\widehat{\boldsymbol\Omega}_r=T^{-1}\mathbf R\mathbf R^T$。众所周知（而且容易证明），这一估计量使多元正态分布的对数似然最大化，具有渐近一致性，并且存在一个中心极限定理（Anderson，1963）。为什么不使用它作为协方差矩阵的估计量？原因是，当 $T\ll n$ 时，该估计量对于波动率估计和投资组合优化而言非常不充分。协方差矩阵的秩至多为 $T$。设 $\mathbf w_i$，$i=1,\ldots,T-n$，是 $\mathbf R^T$ 的零空间的一组基，即 $\mathbf R^T\mathbf w_i=0$。我们可以将这些向量解释为投资组合。投资组合 $i$ 的波动率为 $\mathbf w_i^T\widehat{\boldsymbol\Omega}_r\mathbf w_i=T^{-1}\|\mathbf R^T\mathbf w_i\|^2=0$。因此，大多数独立的投资组合具有零波动率。在投资组合优化中，情况甚至更糟。均值—方差问题
>
> $$
> \max_{\mathbf w}\left[\boldsymbol\alpha^T\mathbf w-(2\lambda)^{-1}\mathbf w^T\widehat{\boldsymbol\Omega}_r\mathbf w\right]
> $$
>
> 的解为 $\mathbf w=\lambda\widehat{\boldsymbol\Omega}_r^{-1}\boldsymbol\alpha$。在这种情况下，如果 $\boldsymbol\alpha$ 位于 $\boldsymbol\Omega$ 的零空间中，投资组合就没有定义。选择一个接近零空间的 Alpha 将产生任意大的投资组合，以及任意大的夏普比率。

### 4.5.3 投资组合管理

因子模型在若干方面对投资组合管理有用。第一个方面与风险管理相邻：波动率是风险管理人与投资组合管理人共同使用的语言，而它通常由因子模型生成。第二个方面是协方差矩阵的逆矩阵，也称为精度矩阵（Precision Matrix）。这一矩阵在投资组合优化中发挥着核心作用。如常见问题 4.5 所讨论的，经验协方差矩阵通常不可逆。因子结构使我们能够同时估计 $\boldsymbol\Omega_r$ 和 $\boldsymbol\Omega_r^{-1}$。第三个方面是将资产预期收益率建模为两项之和：$\boldsymbol\alpha$ 和 $\mathbf B^T E(\mathbf f)$。这两项产生了两类在性质上不同的预期收益率。这在直觉上是合理的，因为基于因子的收益率伴随着一定的变动性和风险，而风险本身由因子协方差矩阵 $\boldsymbol\Omega_f$ 捕捉。相反，Alpha 项似乎不伴随风险。如何管理这些收益率来源，是投资组合管理所关注的问题。最后，因子模型是可读的（Legible）：将它应用于投资组合时，它会产生因子敞口、风险分解和业绩分解，如上所述。可读性使投资组合管理人的工作变得更加容易，因为它使他们能够规划（交易前）、监控（交易中）和理解（交易后）其策略。

### 4.5.4 Alpha 研究

正如波动率是风险管理人与投资组合管理人共同使用的语言，Alpha 也是信号研究人员与投资组合管理人共同理解的东西。如果不惜进行过度概括，可以说信号研究人员关心 $\boldsymbol\alpha$，风险管理人关心 $\mathbf B\mathbf f$，而投资组合管理人加入交易成本，试图将所有这些项结合为一个盈利策略。实际上，$\mathbf B\mathbf f$ 项中也包含值得交易的“有风险的”Alpha。我暂时宽泛地使用这些术语，目的是在接下来的章节中使其更加严谨。此外，有时这些人是同一个人，尽管在规模足够大、足够复杂的策略中，这些角色日益分离。因子模型从两个方面改进了 Alpha 研究。首先，$\mathbf B\mathbf f$ 很重要，对于某一类投资者而言，它是唯一重要的东西。[^12] 其次，基于因子的方法有助于区分投资组合预期收益率的两个来源。一个来源是持有因子敞口。这些收益率伴随着因子收益率变动所带来的相关风险。第二个来源是收益率的“真正截距”，即对 Alpha 向量具有敞口。

![image](image-11.png)

## 4.6 因子模型的类型

![image](image-12.png)

从这里开始，我们使用的模型由式（4.1）给出。我们已经将这一模型视为理所当然。但模型的数据和参数来自哪里？对于因子模型而言，答案尤其重要，因为赋予各种符号的含义十分重要。实践者使用三种广泛的方法来识别方程中的全部参数：

- **特征模型（Characteristic Model）。** 这是最常见的方法。模型的输入数据是时间序列 $\mathbf r_t$ 和 $\mathbf B_t$。因子收益率和特异性收益率从这些数据中估计。我们将 $\mathbf B_t$ 定义为在区间 $[t-1,t]$ 开始时可获得的 [^13] 资产特征矩阵。其直觉是，这些特征在一定程度上决定了股票收益率。我将在第 6 章讨论这一方法。
- **统计模型（Statistical Model）。** 在这一模型中，唯一的原始数据是 $\mathbf r_t$，而 $\mathbf B_t$、$\mathbf f_t$ 和 $\boldsymbol\epsilon_t$ 都是估计得到的。我将在第 7 章讨论这些模型。
- **宏观经济模型（Macroeconomic Model）。** 在这一方法中，原始数据是 $\mathbf r_t$ 和 $\mathbf f_t$，而 $\mathbf B_t$ 和 $\boldsymbol\epsilon_t$ 是估计得到的。$\mathbf f_t$ 通常表示一个由宏观经济时间序列组成的向量。

建模者必须处理的相关方法论问题是：

1. 用于评价模型的最佳损失函数是什么？
2. 一旦我们获得了因子收益率与特异性收益率的估计值（或原始数据），如何从横截面估计中估计协方差矩阵？
3. 每一种框架内的最佳方法是什么？

## 4.7 附录

### 4.7.3 弗里施—沃—洛弗尔定理

让我们沿着上一节的思路继续讨论，在上一节中，我们刻画了回归变量的分组，如式（4.19）所示。像前面一样，我们从 $\mathbf X_2$ 的各列中移除与 $\mathbf X_1$ 的各列共线的分量，并将所得矩阵记为 $\widetilde{\mathbf X}_2$。

然而，这一变换使我们能够分阶段连续地执行回归，其中每个阶段都求解一个独立的线性估计问题。这一洞见通过下面的定理得到形式化表述。

**定理 4.1（Frisch–Waugh–Lovell Theorem）。** 将参考模型记为：

$$
\mathbf y=\mathbf X_1\boldsymbol\beta_1+\widetilde{\mathbf X}_2\boldsymbol\beta_2+\boldsymbol\epsilon,\tag{4.20}
$$

其估计参数为 $\widehat{\boldsymbol\beta}_1,\widehat{\boldsymbol\beta}_2,\widehat{\boldsymbol\epsilon}$。

分阶段估计该系统。第一阶段的模型为：

$$
\mathbf y=\mathbf X_1\boldsymbol\gamma_1+\boldsymbol\eta_1,\tag{4.21}
$$

由此得到估计值 $\widehat{\boldsymbol\gamma}_1,\widehat{\boldsymbol\eta}_1$。

第二阶段的模型使用第一阶段得到的 $\widehat{\boldsymbol\eta}_1$：

$$
\widehat{\boldsymbol\eta}_1=\widetilde{\mathbf X}_2\boldsymbol\gamma_2+\boldsymbol\eta_2,\tag{4.22}
$$

由此得到估计值 $\widehat{\boldsymbol\gamma}_2,\widehat{\boldsymbol\eta}_2$。以下恒等式成立：

$$
\widehat{\boldsymbol\gamma}_1=\widehat{\boldsymbol\beta}_1,\quad \widehat{\boldsymbol\gamma}_2=\widehat{\boldsymbol\beta}_2,\quad \widehat{\boldsymbol\eta}_2=\widehat{\boldsymbol\epsilon}.
$$

**证明。** 我们使用 $\mathbf X_1$ 的帽子矩阵（Hat Matrix）：$\mathbf H=\mathbf X_1(\mathbf X_1^T\mathbf X_1)^{-1}\mathbf X_1^T$。该算子是一个投影，即 $\mathbf H^2=\mathbf H$，且 $(\mathbf I_n-\mathbf H)^2=\mathbf I_n-\mathbf H$。首先，我们刻画 $\widehat{\boldsymbol\beta}_1,\widehat{\boldsymbol\beta}_2$ 的解。我们使用如下性质：

$$
\mathbf X_1^T\widetilde{\mathbf X}_2=\mathbf X_1^T(\mathbf I_n-\mathbf H)\mathbf X_2=(\mathbf X-\mathbf X)\mathbf X_2=0.
$$

$$
\mathbf y=\begin{bmatrix}\mathbf X_1&\widetilde{\mathbf X}_2\end{bmatrix}\begin{bmatrix}\boldsymbol\beta_1\\\boldsymbol\beta_2\end{bmatrix}+\boldsymbol\epsilon,
$$

$$
\begin{bmatrix}\widehat{\boldsymbol\beta}_1\\\widehat{\boldsymbol\beta}_2\end{bmatrix}=\begin{bmatrix} \mathbf X_1^T\mathbf X_1&\mathbf X_1^T\widetilde{\mathbf X}_2\\ \widetilde{\mathbf X}_2^T\mathbf X_1&\widetilde{\mathbf X}_2^T\widetilde{\mathbf X}_2 \end{bmatrix}^{-1}\begin{bmatrix}\mathbf X_1^T\\\widetilde{\mathbf X}_2^T\end{bmatrix}\mathbf y,
$$

$$
\widehat{\boldsymbol\beta}_1=(\mathbf X_1^T\mathbf X_1)^{-1}\mathbf X_1^T\mathbf y,
$$

$$
\widehat{\boldsymbol\beta}_2=(\widetilde{\mathbf X}_2^T\widetilde{\mathbf X}_2)^{-1}\widetilde{\mathbf X}_2^T\mathbf y.
$$

现在，让我们写出第一阶段的输出 $\widehat{\boldsymbol\beta}_1,\widetilde{\mathbf X}_2$：

$$
\widehat{\boldsymbol\eta}_1=(\mathbf I_n-\mathbf H)\mathbf y,\quad \widetilde{\mathbf X}_2=(\mathbf I_n-\mathbf H)\mathbf X_2.
$$

这些量用于产生 $\widehat{\boldsymbol\gamma}_1,\widehat{\boldsymbol\gamma}_2$。我们证明它们分别与 $\widehat{\boldsymbol\beta}_1,\widehat{\boldsymbol\beta}_2$ 相同：

$$
\widehat{\boldsymbol\gamma}_1=(\mathbf X_1^T\mathbf X_1)^{-1}\mathbf X_1^T\mathbf y=\widehat{\boldsymbol\beta}_1,
$$

$$
\widehat{\boldsymbol\gamma}_2=(\widetilde{\mathbf X}_2^T\widetilde{\mathbf X}_2)^{-1}\widetilde{\mathbf X}_2^T\widehat{\boldsymbol\eta}_1=(\mathbf X_2^T(\mathbf I_n-\mathbf H)^2\mathbf X_2)^{-1}\mathbf X_2^T(\mathbf I_n-\mathbf H)\mathbf y=(\widetilde{\mathbf X}_2^T\widetilde{\mathbf X}_2)^{-1}\widetilde{\mathbf X}_2^T\mathbf y=\widehat{\boldsymbol\beta}_2.
$$

$\widehat{\boldsymbol\eta}_2$ 与 $\widehat{\boldsymbol\epsilon}$ 相等，由式（4.20）—（4.22）得出。$\square$

我们以两点说明结束本节。

- 在 4.7.2 节中，我们已经证明，式（4.22）产生的估计值与对总收益率进行回归所得的估计值相同。也就是说，使用 $\widehat{\boldsymbol\eta}_1=\widetilde{\mathbf X}_2\boldsymbol\gamma_2+\boldsymbol\eta_2$ 与 $\mathbf r=\widetilde{\mathbf X}_2\boldsymbol\beta_3+\boldsymbol\eta$ 估计系数，会得到相同的估计值：$\widehat{\boldsymbol\gamma}_2=\widehat{\boldsymbol\beta}_3$。这意味着，在将自变量正交化之后，我们可以选择直接对总收益率进行回归。然而，估计残差 $\widehat{\boldsymbol\eta}_2$ 与 $\widehat{\boldsymbol\eta}$ 将会不同。
- 上面的公式适用于特异性波动率相同的情形。对于一般情形，$\widetilde{\mathbf X}_2$ 的公式变为：

$$
\widetilde{\mathbf X}_2=\left(\mathbf I_n-\mathbf X_1(\mathbf X_1^T\boldsymbol\Omega_\epsilon^{-1}\mathbf X_1)^{-1}\mathbf X_1^T\boldsymbol\Omega_\epsilon^{-1}\right)\mathbf X_2.
$$

这一结论的证明留作练习（通过左乘 $\boldsymbol\Omega_\epsilon^{-1/2}$ 对收益率进行白化（Whitening），使用上面的结果，再变换回来）。

#### 步骤 4.1　分阶段线性回归

1. 估计模型

   $$
   \mathbf y=\mathbf X\boldsymbol\beta_1+\boldsymbol\epsilon,\tag{4.23}
   $$

   得到估计值 $\widehat{\boldsymbol\beta}_1$ 和 $\widehat{\boldsymbol\epsilon}$。
2. 将 $\mathbf Z$ 的各列对 $\mathbf X$ 进行回归，并取每次回归的残差。将 $\widetilde{\mathbf Z}$ 定义为一个矩阵，其第 $i$ 列是 $[\mathbf Z]_{\bullet,i}$ 对 $\mathbf X$ 进行回归所得的残差向量。
3. 估计模型 $\widehat{\boldsymbol\epsilon}=\widetilde{\mathbf Z}\boldsymbol\beta_2+\boldsymbol\xi$，得到估计值 $\widehat{\boldsymbol\beta}_2$ 和 $\widehat{\boldsymbol\xi}$。

## 本章要点

1. **因子模型** 将资产收益率表示为因子贡献和特异性分量的组合。其一般形式为：

   $$
   \mathbf r_t=\boldsymbol\alpha+\mathbf B\mathbf f_t+\boldsymbol\epsilon_t.
   $$

2. **因子模型的解释**
   - 图模型。使用节点和边将资产与因子之间的依赖关系可视化。
   - 效应的叠加。资产收益率是加权因子贡献之和。
   - 单资产内积。一项资产的预期收益率是其因子载荷与因子收益率的内积。
3. **Alpha 分量**
   - 因子张成的 Alpha。由因子解释的 Alpha 部分；无法与预期因子收益率区分开来。
   - 正交 Alpha。无法由因子解释的 Alpha 部分；带来分散化的好处，并且可以提高夏普比率。
4. **因子模型的变换**
   - 旋转。改变因子的表示而不改变模型预测（例如标准正交载荷）。
   - 投影。在近似原模型的同时减少因子数量。
   - 扩展。通过加入新的因子扩大模型，以捕捉额外的结构。
5. **因子模型的应用**
   - 业绩归因。将投资组合收益率分解为因子贡献和特异性贡献。
   - 风险管理。预测投资组合波动率，并将其分解为系统性风险和特异性风险。
   - 投资组合构建。利用因子风险敞口和预期收益率优化投资组合。
   - Alpha 研究。通过分析 Alpha 分量，识别收益率的来源，并将技能与运气区分开来。

[^1]: 因子模型可以追溯到 19 世纪末至 20 世纪初心理测量学的诞生。教材中的讨论见 Johnson 和 Wichern（2007）、Rencher 和 Christensen（2012）。在金融领域，因子模型最早由 Sharpe（1964、1965、1966）针对单因子情形引入，随后由 Ross（1976）扩展到多因子情形。关于金融中因子模型的良好入门资料，包括 Connor 和 Korajczyk（2010）、Fan 等（2016）的综述论文，以及 Connor 等（2010）、Connor 和 Korajczyk（2010）、MacKinlay（1995）的著作。
[^2]: 我们也使用残差（Residual）和特定（Specific）来代替“特异性”（Idiosyncratic）。
[^3]: 当我们在后面将风格与载荷投资风格联系起来时，“风格”一词的使用就会变得清楚。
[^4]: 虚拟变量是取二元值（例如 0 或 1）的变量，或者更一般地说，是在有限集合中取值的变量。我们只使用二元变量。
[^5]: 关于图模型的讨论见专著 Lauritzen（1996）、机器学习教材 Bishop（2006）和 Murphy（2012），以及综述论文 Models（2004）。
[^6]: 净市值（NMV）是以参考货币（Numeraire）计量的投资于该证券的金额。
[^7]: 例如，对于美国股票，最大的年化特异性波动率约为 40%。
[^8]: 或者，更一般地说，是稀疏矩阵 $\boldsymbol\Omega_\epsilon$ 的最大特征值。
[^9]: 经济学家将“增长的”经济体理解为可交易资产的函数。我认为这种程度的抽象并不能带来多少好处，因此将论述和不等式保持在有限维空间中。
[^10]: 关于奇异值分解及矩阵平方根的介绍，见附录 4.7.4 节，本书将贯穿使用这些工具。
[^11]: 我们使用记号 $\mathbf e:=(1,1,\ldots,1)^T$。
[^12]: 用于描述这种投资风格的营销术语是智能 Beta（Smart Beta）。
[^13]: 重要提示：使用商业数据时，始终检查数据规范，以确保载荷的时间索引没有错开一期。大多数供应商使用时间戳 $t$ 表示在区间 $[t-1,t]$ 结束时可获得的数据。
