---
{ title: 偏微分方程-5, description: "", categories: [ 数学 ], tags: [ PDE ], params: { lang: zh }, date: 2026-11-15T03:05:23+08:00, draft: false, slug: 偏微分方程-5 }
---

# 5.1 傅里叶变换

傅里叶变换（Fourier Transform）在偏微分方程研究中的重要性，首先来自它对微分运算的处理。对于一般的偏微分方程，未知函数的各阶导数相互关联，直接求解往往十分困难。但如果将函数从空间变量转换到频率变量，那么微分运算就能够转化为代数乘法，从而把某些偏微分方程转化为代数方程，或者以频率为参数的常微分方程。

这种方法尤其适用于常系数线性偏微分方程。本节首先建立傅里叶变换的基本性质，再通过傅里叶反演、Parseval 恒等式和 Plancherel 定理说明变换的可逆性及其对函数范数的保持，最后将这些结论应用于椭圆方程和热方程。

## 一、傅里叶变换的基本性质

### Schwartz 空间

在定义傅里叶变换之前，需要先解决积分的收敛问题。因为傅里叶变换涉及整个 $\mathbb R^n$ 上的积分，如果对函数没有任何衰减要求，就不能保证变换存在；而后续又需要反复进行求导、积分分部和积分次序交换，所以还希望这些运算不会破坏函数原有的性质。

因此，首先考虑 Schwartz 空间（Schwartz Space）。

**Schwartz 空间** $\mathcal S(\mathbb R^n)$ 是所有满足下列条件的复值光滑函数 $u\in C^\infty(\mathbb R^n)$ 的集合：

$$
\boxed{
\sup_{x\in\mathbb R^n}
|x^\beta\partial^\alpha u(x)|<\infty,
\qquad
\forall\alpha,\beta\in\mathbb Z_+^n.
}
$$

其中 $\alpha,\beta$ 为多重指标。这个条件要求函数及其任意阶导数在无穷远处的衰减速度快于任意多项式的倒数。例如，高斯函数 $e^{-|x|^2}$ 就属于 Schwartz 空间。

这个空间的关键优势在于：它既能保证傅里叶积分的收敛，又能允许我们在变换前后进行求导等运算，而不必每次重新处理复杂的收敛条件。

### 定义 5.1.1：傅里叶变换

对任意 $u\in\mathcal S(\mathbb R^n)$，定义其傅里叶变换为

$$
\boxed{
\widehat u(\xi)
=
\frac{1}{(2\pi)^{n/2}}
\int_{\mathbb R^n}
e^{-ix\cdot\xi}u(x)\,dx.
}
$$

其中 $x$ 是原来的空间变量，$\xi$ 是变换后的频率变量，$x\cdot\xi$ 表示欧氏内积。

这一变换是线性的，即

$$
\widehat{c_1u_1+c_2u_2}
=c_1\widehat u_1+c_2\widehat u_2.
$$

此外，由于 $|e^{-ix\cdot\xi}|=1$，可以直接得到

$$
|\widehat u(\xi)|
\leq\frac{1}{(2\pi)^{n/2}}\|u\|_{L^1(\mathbb R^n)}.
$$

因此，傅里叶变换并不仅仅适用于 Schwartz 函数，也可以通过积分定义在 $L^1$ 函数上。不过，本节主要在 Schwartz 空间中建立基本理论。

### 引理 5.1.2：微分与乘法的对应

这是傅里叶变换在 PDE 中最重要的性质。

**引理 5.1.2**：若 $u\in\mathcal S(\mathbb R^n)$，则 $\widehat u\in\mathcal S(\mathbb R^n)$，且对于任意多重指标 $\alpha,\beta$，有

$$
\boxed{
\widehat{\partial_x^\alpha u}(\xi)
=(i\xi)^\alpha\widehat u(\xi),
}
$$

以及

$$
\boxed{
\partial_\xi^\beta\widehat u(\xi)
=(-i)^{|\beta|}\widehat{x^\beta u}(\xi).
}
$$

第一条公式说明，空间变量中的求导对应频率变量中的乘法。例如，

$$
\widehat{u_{x_j}}=i\xi_j\widehat u,
\qquad
\widehat{u_{x_jx_k}}
=-\xi_j\xi_k\widehat u.
$$

因此，对于拉普拉斯算子，

$$
\boxed{
\widehat{\Delta u}(\xi)
=-|\xi|^2\widehat u(\xi).
}
$$

第二条公式则反过来说明，空间变量中的乘法对应频率变量中的求导：

$$
\widehat{x_ju}(\xi)
=i\partial_{\xi_j}\widehat u(\xi).
$$

两者具有明显的对偶结构。前者通过积分分部得到，后者通过对傅里叶积分中的指数函数求导得到。

更重要的是，傅里叶变换将 Schwartz 空间映射到自身，因此这些运算可以反复进行。

### 引理 5.1.3：平移与伸缩

除了微分，傅里叶变换还可以把函数的空间平移和伸缩转换为简单的频率运算。

**引理 5.1.3**：设 $u\in\mathcal S(\mathbb R^n)$，$a\in\mathbb R^n$，$k\ne0$，则

$$
\boxed{
\widehat{u(\cdot-a)}(\xi)
=e^{-ia\cdot\xi}\widehat u(\xi),
}
$$

以及

$$
\boxed{
\widehat{u(k\cdot)}(\xi)
=\frac{1}{|k|^n}\widehat u\left(\frac{\xi}{k}\right).
}
$$

第一条公式说明，空间平移对应频率中的相位变化；第二条公式说明，空间伸缩对应频率中的反向伸缩，并伴随一个由维数决定的系数。

这两个性质都可以通过积分中的变量代换直接得到。

### 引理 5.1.4：卷积定理

在研究 PDE 的解时，经常出现卷积（Convolution）。对于两个函数 $u,v$，定义

$$
\boxed{
(u*v)(x)
=\int_{\mathbb R^n}u(x-y)v(y)\,dy.
}
$$

卷积将一个函数在不同位置上的取值与另一个函数进行加权组合。在后面研究热方程时，解就会被表示成初始函数与热核的卷积。

因此，我们还需要知道卷积经过傅里叶变换后会发生什么变化。

**引理 5.1.4**：对于 $u,v\in\mathcal S(\mathbb R^n)$，有

$$
\boxed{
\widehat{u*v}(\xi)
=(2\pi)^{n/2}\widehat u(\xi)\widehat v(\xi).
}
$$

这说明卷积运算可以转化为普通乘法。证明只需将卷积定义代入傅里叶积分，再利用 Fubini 定理交换积分次序。

需要注意，公式中的 $(2\pi)^{n/2}$ 来自本书采用的对称归一化约定。采用其他傅里叶变换定义时，这个系数会有所不同。

至此，我们已经得到两条最关键的运算规则：**微分变成多项式乘法，卷积变成函数乘法。** 它们构成了后续求解常系数 PDE 的基本工具。

### 命题 5.1.5：高斯函数的傅里叶变换

在证明傅里叶反演公式之前，作者先计算一个具有特殊地位的函数。

**命题 5.1.5**：设 $A>0$，令

$$
u(x)=e^{-A|x|^2},
$$

那么

$$
\boxed{
\widehat u(\xi)
=\frac{1}{(2A)^{n/2}}
e^{-\frac{|\xi|^2}{4A}}.
}
$$

这表明高斯函数经过傅里叶变换后，仍然是高斯函数，只是其尺度发生了变化。

该结果可以利用高斯积分公式，结合复分析中的积分方法得到。具体计算不再展开。

高斯函数的这种特殊性质不仅用于后面的反演定理，也将在热方程中再次出现，因为热核本身就是一个高斯函数。

## 二、反演公式与范数恒等式

### 定理 5.1.6：傅里叶反演

此前我们定义了如何从 $u(x)$ 得到 $\widehat u(\xi)$，但还没有说明是否能够由 $\widehat u$ 恢复原函数。

如果不能恢复，那么傅里叶变换就可能丢失原函数的信息，无法可靠地用于求解微分方程。

因此，必须建立傅里叶反演公式（Fourier Inversion Formula）。

**定理 5.1.6**：若 $u\in\mathcal S(\mathbb R^n)$，则

$$
\boxed{
u(x)
=
\frac{1}{(2\pi)^{n/2}}
\int_{\mathbb R^n}
e^{ix\cdot\xi}\widehat u(\xi)\,d\xi.
}
\tag{5.1.1}
$$

由此，可以定义逆傅里叶变换（Inverse Fourier Transform）：

$$
\mathcal F^{-1}v(x)
=
\frac{1}{(2\pi)^{n/2}}
\int_{\mathbb R^n}
e^{ix\cdot\xi}v(\xi)\,d\xi.
$$

于是

$$
\boxed{\mathcal F^{-1}\mathcal Fu=u.}
$$

这说明傅里叶变换是 Schwartz 空间到自身的双射。

作者的证明首先利用高斯函数建立特殊情形，再推广到一般 Schwartz 函数。值得注意的是，不能直接将正变换代入反变换后随意交换两个无穷积分，因为得到的二重积分不一定绝对收敛。

有了反演公式，傅里叶变换求解 PDE 的基本路径就变得完整：先在频率空间求解，再将结果变换回空间变量。

### 定理 5.1.7：Parseval 恒等式

傅里叶反演解决了信息能否恢复的问题，但研究 PDE 时还需要估计解的大小，尤其是其 $L^2$ 范数。

因此，我们希望知道傅里叶变换是否保持函数之间的内积。

**定理 5.1.7（Parseval's Identity）**：对于任意 $u,v\in\mathcal S(\mathbb R^n)$，有

$$
\boxed{
\int_{\mathbb R^n}\overline{u(x)}v(x)\,dx
=
\int_{\mathbb R^n}
\overline{\widehat u(\xi)}\widehat v(\xi)\,d\xi.
}
$$

这就是 Parseval 恒等式。

它表明，两个函数在空间域中的 $L^2$ 内积，等于其傅里叶变换在频率域中的 $L^2$ 内积。

证明主要利用傅里叶反演公式与积分次序交换。

### 推论 5.1.8：Plancherel 定理

在 Parseval 恒等式中取 $v=u$，立即得到

$$
\boxed{
\|u\|_{L^2(\mathbb R^n)}
=
\|\widehat u\|_{L^2(\mathbb R^n)}.
}
$$

这就是 Plancherel 定理（Plancherel's Theorem），在原书中列为推论 5.1.8。

它说明傅里叶变换保持 $L^2$ 范数，因此是 Schwartz 空间关于 $L^2$ 范数的等距映射（Isometry）。

更重要的是，结合引理 5.1.2，可以得到

$$
\boxed{
\|\partial^\alpha u\|_{L^2}^2
=
\int_{\mathbb R^n}
|\xi^\alpha|^2|\widehat u(\xi)|^2\,d\xi.
}
$$

这说明函数导数的 $L^2$ 范数可以通过频率空间中的加权积分来表示。微分运算所带来的复杂性，被转化为了频率变量的代数权重。

这种联系在 Sobolev 空间、正则性理论以及 PDE 的能量估计中都具有基础地位。

### 傅里叶变换在 $L^2$ 空间上的扩展

目前的理论建立在 Schwartz 空间上，但这个空间的要求较强。实际研究中，我们希望处理更加一般的平方可积函数。

由于 $\mathcal S(\mathbb R^n)$ 在 $L^2(\mathbb R^n)$ 中稠密，对于任意 $u\in L^2$，都可以选取一列 Schwartz 函数 $u_k$，使得

$$
u_k\longrightarrow u
\qquad\text{在 }L^2\text{ 中}.
$$

由 Plancherel 定理，

$$
\|\widehat u_k-\widehat u_l\|_{L^2}
=
\|u_k-u_l\|_{L^2}.
$$

因此 $\{\widehat u_k\}$ 也是 $L^2$ 中的 Cauchy 列，必然收敛。于是可以定义

$$
\boxed{
\widehat u
=
\lim_{k\to\infty}\widehat u_k
\qquad\text{在 }L^2\text{ 中}.
}
$$

这个定义与所选逼近序列无关，从而将傅里叶变换扩展到整个 $L^2(\mathbb R^n)$。扩展后的变换仍然保持 $L^2$ 范数，并且具有逆变换。

这一步的意义在于：我们不再需要要求函数具有任意阶导数并快速衰减，而是能够在更一般的 Hilbert 空间中使用傅里叶变换。

## 三、傅里叶变换与常系数 PDE

前面建立的理论，最终要用于求解微分方程。作者通过一个椭圆方程和一个热方程，说明这一方法的具体运作过程。

### 例 5.1.9：椭圆方程

考虑

$$
\boxed{
-\Delta u+u=f
\qquad\text{在 }\mathbb R^n.
}
\tag{5.1.3}
$$

由于微分算子的系数都是常数，可以对方程两边取傅里叶变换。利用

$$
\widehat{-\Delta u}=|\xi|^2\widehat u,
$$

得到

$$
(1+|\xi|^2)\widehat u(\xi)=\widehat f(\xi).
$$

原来的椭圆型 PDE 由此变成了一个代数方程，可以直接解出

$$
\boxed{
\widehat u(\xi)
=
\frac{\widehat f(\xi)}{1+|\xi|^2}.
}
$$

再利用傅里叶反演公式：

$$
\boxed{
u(x)
=
\frac{1}{(2\pi)^{n/2}}
\int_{\mathbb R^n}
e^{ix\cdot\xi}
\frac{\widehat f(\xi)}{1+|\xi|^2}\,d\xi.
}
\tag{5.1.5}
$$

这就得到了解的表达式。

这里需要区分形式求解与严格证明。上述计算首先给出了候选解，而是否真正满足原方程，还需要检查积分收敛、函数的可微性以及微分与积分能否交换。

### 命题 5.1.10：解的存在与 $L^2$ 恒等式

**命题 5.1.10**：若 $f\in\mathcal S(\mathbb R^n)$，由式 (5.1.5) 定义的 $u$ 属于 Schwartz 空间，并且是 $-\Delta u+u=f$ 的光滑解。此外，

$$
\boxed{
\int_{\mathbb R^n}
\left(
|u|^2+2|\nabla u|^2+|\nabla^2u|^2
\right)\,dx
=
\int_{\mathbb R^n}|f|^2\,dx.
}
$$

这里

$$
|\nabla^2u|^2
=\sum_{i,j=1}^n|u_{x_ix_j}|^2.
$$

这个恒等式实际上是 Plancherel 定理的直接应用。因为

$$
(1+|\xi|^2)^2|\widehat u|^2
=|\widehat f|^2,
$$

将左边展开，就得到

$$
|\widehat u|^2
+2|\xi|^2|\widehat u|^2
+|\xi|^4|\widehat u|^2
=|\widehat f|^2.
$$

再利用傅里叶变换对导数的作用，以及 Plancherel 恒等式，就得到原来的 $L^2$ 能量恒等式。

因此，傅里叶变换不仅能用于构造解，还能用于控制解及其导数的范数。

### 例 5.1.11：非齐次热方程

最后，作者研究非齐次热方程的初值问题：

$$
\boxed{
\begin{cases}
u_t-\Delta u=f(x,t),
&x\in\mathbb R^n,\ t>0,\\
u(x,0)=u_0(x),
&x\in\mathbb R^n.
\end{cases}
}
\tag{5.1.6}
$$

与前面的椭圆方程不同，热方程同时包含时间变量和空间变量。因此，我们只对空间变量 $x$ 进行傅里叶变换，将时间变量 $t$ 保留下来。

对方程变换后，

$$
\boxed{
\widehat u_t+|\xi|^2\widehat u=\widehat f,
}
$$

同时有初始条件

$$
\widehat u(\xi,0)=\widehat u_0(\xi).
$$

现在，对于每一个固定的 $\xi$，这都是一个关于时间 $t$ 的一阶线性常微分方程。

利用积分因子，可以得到

$$
\boxed{
\widehat u(\xi,t)
=
e^{-|\xi|^2t}\widehat u_0(\xi)
+
\int_0^t
e^{-|\xi|^2(t-s)}
\widehat f(\xi,s)\,ds.
}
$$

这个表达式中的第一项描述初始数据的演化，第二项描述外部源项在各个时刻对解产生的贡献。

为了将结果转换回空间变量，定义函数 $K(x,t)$，使得

$$
\widehat K(\xi,t)
=
\frac{1}{(2\pi)^{n/2}}e^{-|\xi|^2t}.
$$

利用前面高斯函数的傅里叶变换公式，可以求出

$$
\boxed{
K(x,t)
=
\frac{1}{(4\pi t)^{n/2}}
\exp\left(-\frac{|x|^2}{4t}\right),
\qquad t>0.
}
\tag{5.1.8}
$$

这就是热方程的基本解（Fundamental Solution），也称为热核（Heat Kernel）。

现在结合傅里叶反演公式和卷积定理，得到

$$
\boxed{
\begin{aligned}
u(x,t)
={}&\int_{\mathbb R^n}
K(x-y,t)u_0(y)\,dy\\
&+\int_0^t\int_{\mathbb R^n}
K(x-y,t-s)f(y,s)\,dy\,ds.
\end{aligned}
}
\tag{5.1.7}
$$

也可以写成卷积形式：

$$
\boxed{
u(\cdot,t)
=
K(\cdot,t)*u_0
+
\int_0^tK(\cdot,t-s)*f(\cdot,s)\,ds.
}
$$

第一项表示初始数据在热核作用下的扩散，第二项表示各个历史时刻产生的源项经过后续扩散后，对当前解形成的贡献。

整个求解过程清楚地展示了傅里叶变换的作用：原来的抛物型 PDE 被转化为关于时间的一阶 ODE，而求解所得的指数因子经过逆变换，又变成空间中的高斯热核。

需要注意，本节的推导主要是形式性的。上述表达式在什么条件下真正定义经典解、能否恢复初始条件，以及解具有怎样的正则性，都是下一节 5.2 要严格讨论的问题。

## 四、5.1 总览

本节的核心并不在于记住大量公式，而是理解傅里叶变换建立了怎样的对应关系，以及这些关系为什么能用来研究 PDE。

| 内容 | 核心公式或结论 | 数学意义 |
|---|---|---|
| Schwartz 空间 | $x^\beta\partial^\alpha u$ 有界 | 为傅里叶变换及相关运算提供合适的函数空间 |
| 傅里叶变换 | $\widehat u(\xi)=(2\pi)^{-n/2}\int e^{-ix\cdot\xi}u(x)\,dx$ | 将空间函数转换到频率空间 |
| 微分性质 | $\widehat{\partial^\alpha u}=(i\xi)^\alpha\widehat u$ | 将微分运算转化为代数乘法 |
| 乘法性质 | $\widehat{x^\beta u}=i^{|\beta|}\partial_\xi^\beta\widehat u$ | 空间乘法对应频率求导 |
| 平移性质 | $\widehat{u(\cdot-a)}=e^{-ia\cdot\xi}\widehat u$ | 空间平移对应频率相位变化 |
| 伸缩性质 | $\widehat{u(k\cdot)}=|k|^{-n}\widehat u(\xi/k)$ | 空间伸缩对应频率伸缩 |
| 卷积定理 | $\widehat{u*v}=(2\pi)^{n/2}\widehat u\widehat v$ | 将卷积运算转化为乘法 |
| 高斯函数 | $\widehat{e^{-A|x|^2}}=(2A)^{-n/2}e^{-|\xi|^2/(4A)}$ | 高斯函数在傅里叶变换下保持高斯形式 |
| 反演公式 | $\mathcal F^{-1}\mathcal Fu=u$ | 保证能够由频率表示恢复原函数 |
| Parseval 恒等式 | $(u,v)_{L^2}=(\widehat u,\widehat v)_{L^2}$ | 傅里叶变换保持内积 |
| Plancherel 定理 | $\|u\|_{L^2}=\|\widehat u\|_{L^2}$ | 保持 $L^2$ 范数，并允许扩展到整个 $L^2$ 空间 |
| 椭圆方程 | $(1+|\xi|^2)\widehat u=\widehat f$ | 将常系数椭圆型 PDE 转化为代数方程 |
| 热方程 | $\widehat u_t+|\xi|^2\widehat u=\widehat f$ | 将抛物型 PDE 转化为关于时间的 ODE |
| 热核 | $K(x,t)=(4\pi t)^{-n/2}e^{-|x|^2/(4t)}$ | 通过卷积表示热方程的解 |

从整个结构来看，最重要的是三条联系。

首先，傅里叶变换使**空间微分与频率乘法**相对应，因此能够把常系数 PDE 的微分结构转化为容易处理的代数结构。其次，傅里叶反演保证这种转换不会丢失原函数的信息，而 Parseval 恒等式和 Plancherel 定理进一步保证了 $L^2$ 结构在转换过程中得以保留。最后，热方程的求解展示了这些性质的综合应用：空间微分变成频率乘法，原 PDE 变成时间 ODE，再通过高斯函数和卷积恢复空间中的解。

因此，傅里叶变换并不只是求解特殊方程的一种技巧。它同时提供了一种研究微分算子、函数正则性和能量估计的基本方法，并由此成为后续 Sobolev 空间理论和更一般 PDE 分析的重要基础。

---

**参考文献**

〔1〕Han, Qing. *A Basic Course in Partial Differential Equations*. Graduate Studies in Mathematics, Vol. 120. American Mathematical Society, 2011. Chapter 5, §5.1, pp. 148–157.
