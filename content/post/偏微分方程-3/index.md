---
{ title: 偏微分方程-3, description: "", categories: [ 数学 ], tags: [ PDE ], params: { lang: zh }, date: 2026-11-08T17:49:27+08:00, draft: false, slug: 偏微分方程-3 }
---

# 3.1 二阶偏微分方程的分类

## 初值与最高阶导数

在第二章中，我们从一阶偏微分方程的初值问题出发，发现初始超曲面的选择会影响解能否被确定。对一阶线性方程，只要初始超曲面与方程规定的方向横截，就可以利用原方程确定未知的法向导数。进入二阶方程以后，同样的问题还存在，只是未知的最高阶导数变成了二阶导数，而需要给定的初始数据也随之增加。

考虑区域 $\Omega\subset\mathbb R^n$ 上的二阶线性微分算子（Second-Order Linear Differential Operator）：

$$
Lu=\sum_{i,j=1}^n a_{ij}(x)u_{x_ix_j}
+\sum_{i=1}^n b_i(x)u_{x_i}+c(x)u.
$$

其中 $a_{ij},b_i,c$ 是连续的系数函数。由于混合偏导数在适当的光滑性条件下满足 $u_{x_ix_j}=u_{x_jx_i}$，我们总可以把二阶部分的系数写成对称形式 $a_{ij}=a_{ji}$，于是 $A(x)=(a_{ij}(x))$ 是一个实对称矩阵。下面讨论的方程为 $Lu=f(x)$，其中 $f$ 称为非齐次项（Nonhomogeneous Term）。

### 柯西问题

先取最简单的初始超平面 \(\Sigma=\{x_n=0\}\)，记 $x'=(x_1,\ldots,x_{n-1})$，并给出两组初始数据：

$$
u(x',0)=u_0(x'),\qquad u_{x_n}(x',0)=u_1(x').
$$

这里，$\Sigma$ 是初始超曲面（Initial Hypersurface），$u_0,u_1$ 是初始值（Initial Values），也称柯西数据（Cauchy Data）。把方程及这些数据放在一起，就得到柯西问题（Cauchy Problem）。与一阶方程相比，这里多出了一组法向一阶导数的数据；这是因为我们还需要利用方程确定二阶导数。

暂时假设存在一个足够光滑的解。既然 $u_0$ 与 $u_1$ 都是已知函数，就可以沿初始超平面求导：

$$
\begin{aligned}
u_{x_i}(0)&=u_{0,x_i}(0),& u_{x_n}(0)&=u_1(0),\\
u_{x_ix_j}(0)&=u_{0,x_ix_j}(0),&u_{x_ix_n}(0)&=u_{1,x_i}(0),
\end{aligned}
\qquad i,j\lt n.
$$

这已经确定了全部一阶导数，以及除了 $u_{x_nx_n}(0)$ 之外的全部二阶导数。后者涉及两次法向求导，不能仅靠在初始平面内对数据求导获得。为了确定它，只能回到原方程：

$$
\begin{aligned}
a_{nn}(0)u_{x_nx_n}(0)
={}&f(0)-\sum_{(i,j)\ne(n,n)}a_{ij}(0)u_{x_ix_j}(0)\\
&-\sum_{i=1}^n b_i(0)u_{x_i}(0)-c(0)u(0).
\end{aligned}
$$

因此，只要 $a_{nn}(0)\ne0$，就可以解出最后一个二阶导数。如果数据和系数都足够光滑，继续对方程求导，还能够逐次计算三阶、四阶乃至更高阶导数。

**这里真正起作用的是法向最高阶导数前面的系数必须非零。** 这个条件与第二章一阶方程中的 $a_n\ne0$ 具有相同的来源。

### 主符号

不过，条件 $a_{nn}\ne0$ 是针对特殊平面 $x_n=0$ 写出的。如果初始超曲面发生弯曲，我们就需要一种不依赖特定坐标轴的表达。

为此，先从算子中抽取最高阶部分的系数，组成二次型（Quadratic Form）：

$$
\boxed{
p(x;\xi)=\sum_{i,j=1}^n a_{ij}(x)\xi_i\xi_j
=\xi^{\mathsf T}A(x)\xi.
}
$$

它称为算子的主符号（Principal Symbol）。这里 $A(x)$ 是已知的二阶系数矩阵，$\xi=(\xi_1,\ldots,\xi_n)$ 是用来考察不同方向的向量。主符号只使用二阶项的系数，因为我们关心的正是沿某一方向能否确定二阶导数。

例如，对于最高阶部分 $3u_{xx}+2u_{xy}+2u_{yy}$，有

$$
A=\begin{pmatrix}3&1\\1&2\end{pmatrix},
\qquad p(\xi)=3\xi_1^2+2\xi_1\xi_2+2\xi_2^2.
$$

主符号将最高阶系数与方向向量联系起来。接下来把这个方向取为曲面的法向量，就能得到一般的非特征条件。

### 一般超曲面

设光滑超曲面由 \(\Sigma=\{x:\varphi(x)=0\}\) 给出，并满足 $\nabla\varphi\ne0$。由于 $\nabla\varphi$ 垂直于曲面，它可以充当法向量。经过必要的坐标调整，假设所研究点处 $\varphi_{x_n}\ne0$，考虑变换

$$
y=(x_1,\ldots,x_{n-1},\varphi(x)).
$$

它的 Jacobian 行列式为 $\varphi_{x_n}$，因此在该点附近可逆。原来的曲面在新坐标下就成为 $y_n=0$，我们可以重新使用刚才针对平面的分析。

根据链式法则，二阶导数变换为

$$
u_{x_ix_j}
=\sum_{k,l=1}^n y_{k,x_i}y_{l,x_j}u_{y_ky_l}
+\sum_{k=1}^n y_{k,x_ix_j}u_{y_k}.
$$

因为 $y_n=\varphi(x)$，所以新坐标中 $u_{y_ny_n}$ 前面的系数恰好是

$$
\sum_{i,j=1}^n a_{ij}(x)\varphi_{x_i}\varphi_{x_j}
=p(x;\nabla\varphi).
$$

于是，一般初始超曲面在点 $x_0$ 处的**非特征条件（Noncharacteristic Condition）** 为

$$
\boxed{p(x_0;\nu)=\nu^{\mathsf T}A(x_0)\nu\ne0,}
$$

其中 $\nu$ 是该点的法向量。反之，若 $p(x_0;\nu)=0$，则称超曲面在这一点是**特征的（Characteristic）**。在 $\mathbb R^2$ 中，超曲面就是曲线，因此相应地称为特征曲线（Characteristic Curve）。本书说一条曲线是特征曲线时，通常指它在整条曲线上处处满足特征条件。

这一条件的意义仍然来自初值问题：当 $p(x_0;\nu)\ne0$ 时，经过坐标变换，方程可以用来求解缺失的法向二阶导数；如果它为零，原来的递推方法便无法继续。条件在光滑可逆的坐标变换下保持不变，因此它描述的是方程最高阶结构与曲面法向之间的关系。

如果方程系数、非齐次项和初始数据足够光滑，非特征条件使我们能够逐阶计算假定存在的解在初始曲面上的导数，并写出形式幂级数（Formal Power Series）。但能写下级数不意味着它会收敛。当初始曲面、系数、非齐次项及初始数据都是解析的（Analytic）时，可以进一步得到局部解析解。这是柯西—柯瓦列夫斯卡娅定理（Cauchy–Kovalevskaya Theorem）的内容，本书在第七章才会展开。

## 二阶算子的分类

### 椭圆型

刚才的非特征条件考察的是某一个给定法向量。由此自然产生一个更强的问题：如果一个算子的主符号在每个非零方向上都不为零，那么经过该点的任何光滑超曲面都将是非特征的。

满足

$$
\boxed{p(x_0;\xi)\ne0,
\qquad\forall\,\xi\in\mathbb R^n\setminus\{0\}}
$$

的二阶线性算子，称为在 $x_0$ 处**椭圆型（Elliptic）**。如果在区域 $\Omega$ 的每一点都满足这个条件，就称算子在 $\Omega$ 中是椭圆型的。

因为 $A(x_0)$ 是实对称矩阵，根据谱定理（Spectral Theorem），它可以通过正交变换对角化。设其特征值为 $\lambda_1,\ldots,\lambda_n$，令 $\eta=Q^{\mathsf T}\xi$，则

$$
p(x_0;\xi)=\xi^{\mathsf T}A\xi
=\lambda_1\eta_1^2+\cdots+\lambda_n\eta_n^2.
$$

这个二次型在任意非零方向上都不为零，当且仅当全部特征值严格同号。因此，**椭圆型等价于最高阶系数矩阵正定或负定**。

### 二维分类

在 $\mathbb R^2$ 中，情况尤其简单。二阶部分为

$$
a_{11}u_{x_1x_1}+2a_{12}u_{x_1x_2}+a_{22}u_{x_2x_2},
\qquad
A=\begin{pmatrix}a_{11}&a_{12}\\a_{12}&a_{22}\end{pmatrix}.
$$

因为 $A$ 的两个特征值 $\lambda_1,\lambda_2$ 满足 $\lambda_1\lambda_2=\det A$，所以只看行列式的符号，就可以完成二维二阶算子的分类：

- 当 $\det A>0$ 时，两个特征值同号，算子是椭圆型（Elliptic）。
- 当 $\det A<0$ 时，两个特征值异号，算子是双曲型（Hyperbolic）。
- 当 $\det A=0$ 时，至少一个特征值为零，算子是退化型（Degenerate）。

这里的分类还能解释特征曲线的数量。设曲线由 $\varphi(x_1,x_2)=0$ 表示，其法向量为 $\nabla\varphi$，那么特征条件是

$$
a_{11}\varphi_{x_1}^2
+2a_{12}\varphi_{x_1}\varphi_{x_2}
+a_{22}\varphi_{x_2}^2=0.
$$

在 $\varphi_{x_1}\ne0$ 的局部区域，令 $r=\varphi_{x_2}/\varphi_{x_1}$，得到关于方向比值的二次方程

$$
a_{22}r^2+2a_{12}r+a_{11}=0.
$$

它的判别式为

$$
D=(2a_{12})^2-4a_{22}a_{11}
=-4\det A.
$$

因此，双曲型算子有两个不同的实特征方向，局部形成两族特征曲线；椭圆型算子没有实特征方向，也就不存在实特征曲线。对于不能用上述比值表示的方向，可以换用另一种局部表示，结论不变。

## 三个典型的二维方程

### 拉普拉斯方程

首先考虑二维拉普拉斯算子（Laplace Operator）：

$$
\Delta u=u_{xx}+u_{yy}.
$$

它的二阶系数矩阵是单位矩阵，因而是椭圆型的。相应方程 $\Delta u=0$ 称为拉普拉斯方程（Laplace Equation），其解称为调和函数（Harmonic Function）。若换用极坐标 $x=r\cos\theta$、$y=r\sin\theta$，可得到

$$
\Delta u=u_{rr}+\frac1r u_r+\frac1{r^2}u_{\theta\theta}.
$$

调和函数还与复分析有直接联系。设 $u(x,y)$ 调和，在局部可以找到共轭调和函数（Conjugate Harmonic Function）$v(x,y)$，满足柯西—黎曼方程（Cauchy–Riemann Equations）

$$
u_x=v_y,\qquad u_y=-v_x.
$$

于是 $F(z)=u(x,y)+iv(x,y)$ 是解析函数；反过来，解析函数的实部与虚部都调和。例如，$\operatorname{Re}(x+iy)^k$、$\operatorname{Im}(x+iy)^k$ 是次数为 $k$ 的齐次调和多项式，而 $e^x\cos y$、$e^x\sin y$ 也都是调和函数。在相应的二维流体模型中，向量场 $(u,-v)$ 还是无旋、不可压缩的。

### 初值不适定性

椭圆型算子没有实特征曲线，因而任何光滑初始曲线都是非特征的。但这是否足以保证柯西问题适定？作者紧接着用拉普拉斯方程给出了否定的回答。

考虑 $u_{xx}+u_{yy}=0$，并在直线 $y=0$ 上规定初值。对每个正整数 $k$，取

$$
u_k(x,y)=\frac1k\sin(kx)e^{ky}.
$$

直接求导可知 $u_{k,xx}+u_{k,yy}=0$，因此每个 $u_k$ 都满足拉普拉斯方程。同时，

$$
\begin{aligned}
u_{k,x}&=\cos(kx)e^{ky},\\
u_{k,y}&=\sin(kx)e^{ky},\\
|\nabla u_k|^2&=e^{2ky}.
\end{aligned}
$$

在初始直线 $y=0$ 上，$|\nabla u_k|=1$，与 $k$ 无关；但离开初始直线，只要固定 $y>0$，就有 $|\nabla u_k|=e^{ky}\to\infty$。也就是说，初始数据的一阶导数始终受到统一控制，内部解的一阶导数却可以任意大。

若要更明确地验证连续依赖性的失败，固定一个 $y_0>0$，再令 $v_k=e^{-ky_0}u_k$。它们在 $y=0$ 上的函数值、切向导数与法向导数都趋于零，而在 $y=y_0$ 上仍有 $|\nabla v_k|=1$。因此，拉普拉斯方程的柯西问题缺乏 $C^1$ 范数意义下的连续依赖性。

这与第一章的哈达玛适定性（Hadamard Well-Posedness）相联系：一个初值问题不仅要能够讨论导数的确定，还需要考察解的存在、唯一性，以及对初始数据的连续依赖性。非特征条件只解决了其中的一个局部代数问题。

### 波动方程

二维波动算子（Wave Operator）为

$$
\Box u=u_{tt}-u_{xx}.
$$

若将自变量按 $(x,t)$ 排列，系数矩阵为 $\operatorname{diag}(-1,1)$，行列式等于 $-1$，因此它是双曲型的。对应的波动方程（Wave Equation）为 $u_{tt}-u_{xx}=0$。这里通常把 $x$ 理解为空间位置，$t$ 理解为时间，所以它又称一维空间的波动方程。

为了找出它的特征曲线，设曲线局部表示为 $t=g(x)$，并令 $\varphi(x,t)=t-g(x)$。这个函数只是用来表示曲线 $\varphi=0$；它的梯度 $\nabla\varphi=(-g'(x),1)$ 正好是曲线的法向量。波动算子的主符号为 $p(\xi_x,\xi_t)=-\xi_x^2+\xi_t^2$，所以特征条件变成

$$
p(\nabla\varphi)=1-[g'(x)]^2=0.
$$

因此 $g'(x)=\pm1$，积分后得到两族特征直线：

$$
\boxed{t=x+C,\qquad t=-x+C.}
$$

这就是双曲型算子具有两个实特征方向的具体表现。

### 热方程

二维热算子（Heat Operator）为

$$
Lu=u_t-u_{xx},
$$

相应的热方程（Heat Equation）为 $u_t-u_{xx}=0$。它的二阶系数矩阵为 $\operatorname{diag}(-1,0)$，行列式等于零，所以在之前的二维三分法中属于退化型。

它的主符号是 $p(\xi_x,\xi_t)=-\xi_x^2$。对曲线 $t=t_0$，取 $\varphi=t-t_0$，则法向量为 $(0,1)$，所以 $p(\nabla\varphi)=0$。因此，**固定时刻的直线 $t=t_0$ 是热方程的特征曲线**。

不过，热方程在时间上只有一阶导数。若给定初始温度 $u(x,0)=u_0(x)$，则原方程直接给出 $u_t(x,0)=u_0''(x)$；若数据光滑，继续求导还可以得到 $u_{tt}(x,0)=u_0^{(4)}(x)$ 等关系。因此，它通常只需要一组初始数据。作者还指出，如果只给出初始直线上一小段区间的数据，通常不足以确定附近的热方程解；这反映了它与一般二阶柯西问题不同的时间演化结构。

### 混合型方程

还有一些方程甚至不能在整个区域内保持同一种类型。典型例子是特里科米方程（Tricomi Equation）：

$$
u_{x_2x_2}+x_2u_{x_1x_1}=f.
$$

其二阶系数矩阵是 $A=\operatorname{diag}(x_2,1)$，因此 $\det A=x_2$。当 $x_2>0$ 时，它是椭圆型；当 $x_2<0$ 时，它是双曲型；当 $x_2=0$ 时，它退化。这样的方程称为混合型方程（Mixed-Type Equation）。它的难点在于，最高阶微分结构会随着位置改变。

## 特征曲线与导数跳跃

此前，特征曲线来自初值问题：沿特征曲线，方程无法用通常的方法确定法向最高阶导数。但这个代数条件还有一个更深的意义。作者在命题 3.1.6 中指出，**如果解及其一阶导数连续，而二阶导数沿某条曲线发生跳跃，那么这条曲线必须是特征曲线。**

### 跳跃

设曲线 $\Gamma$ 把区域分成 $\Omega^+$ 与 $\Omega^-$。对于从两侧趋向曲线上一点 $x_0$ 时具有极限的函数 $w$，记

$$
w^\pm(x_0)=\lim_{\substack{x\to x_0\\x\in\Omega^\pm}}w(x),
\qquad [w](x_0)=w^+(x_0)-w^-(x_0).
$$

$[w]$ 称为函数跨越曲线的跳跃量（Jump）。如果两侧极限不同，就发生了非零跳跃。对于二阶导数，我们将它们组成黑塞矩阵（Hessian Matrix）

$$
\nabla^2u=
\begin{pmatrix}
u_{x_1x_1}&u_{x_1x_2}\\
u_{x_1x_2}&u_{x_2x_2}\end{pmatrix},
$$

并用 $[\nabla^2u]$ 表示矩阵两侧极限之差。这个跳跃非零，意味着至少有一个二阶偏导数的两侧极限不同。

### 命题 3.1.6

有了跳跃的概念，我们就可以更准确地讨论：如果解的一阶导数连续，而二阶导数沿某条曲线发生跳跃，那么这条曲线需要满足什么条件？

**命题 3.1.6（Proposition 3.1.6）** 设 $\Omega\subset\mathbb R^2$ 是一个区域，$\Gamma$ 是将 $\Omega$ 分成两部分的 $C^1$ 曲线。假设 $a_{ij},b_i,c,f$ 在 $\Omega$ 内连续，并且函数 $u$ 满足

$$
u\in C^1(\Omega)\cap C^2(\Omega\setminus\Gamma),
$$

以及二阶线性偏微分方程

$$
\sum_{i,j=1}^{2}a_{ij}u_{x_ix_j}
+\sum_{i=1}^{2}b_i u_{x_i}+cu=f,
\qquad x\in\Omega\setminus\Gamma.
$$

如果二阶导数矩阵 $\nabla^2u$ 沿 $\Gamma$ 发生非零跳跃，那么 $\Gamma$ 必须是特征曲线，即对于曲线上任意一点 $x_0$，其法向量 $\nu$ 满足

$$
\boxed{
\sum_{i,j=1}^{2}a_{ij}(x_0)\nu_i\nu_j=0.
}
$$

这个命题揭示了特征曲线的另一层意义。此前，我们从初值问题出发，发现特征条件意味着 PDE 无法按照通常的方法确定法向最高阶导数。现在则从解的正则性出发，发现二阶导数的不连续性也受到同一个条件的约束。

其原因在于，一阶导数的连续性限制了二阶导数能够发生跳跃的方向，而原 PDE 又进一步限制了这种跳跃的大小。两种约束共同作用，最终迫使曲线的法向量满足特征条件。

### 二阶导数的约束

命题假设 $u\in C^1(\Omega)\cap C^2(\Omega\setminus\Gamma)$，方程系数及右端项连续，且解在曲线两侧满足同一个二阶线性方程。在这些条件下，二阶导数的跳跃并不能任意出现。

首先，因为 $u$ 的一阶导数在整条曲线上连续，从曲线两侧沿切向求导，结果必须一致。记曲线的单位切向量为 $\tau$、单位法向量为 $\nu$，并令 $J=[\nabla^2u]$，那么

$$
J\tau=0.
$$

又因为 $J$ 是对称矩阵，在二维情况下，上述条件意味着它只能保留法向上的变化，即

$$
J=\alpha\nu\nu^{\mathsf T}.
$$

这一步揭示了直观的几何约束：**一阶导数连续，已经排除了二阶导数沿切向任意跳跃的可能，剩下的变化只能集中在法向。**

其次，方程在曲线两侧都成立。将两侧的方程取极限并相减，因 $u$、一阶导数、系数与非齐次项都连续，低阶项全部消失，只剩下

$$
\sum_{i,j=1}^2a_{ij}[u_{x_ix_j}]=0.
$$

代入 $J=\alpha\nu\nu^{\mathsf T}$，便得到 \(\alpha\,p(x;\nu)=0\)。既然二阶导数矩阵确实发生非零跳跃，$\alpha\ne0$，因此

$$
\boxed{p(x;\nu)=0.}
$$

这恰好是特征曲线的定义，命题得证。整个证明只有两个核心约束：一阶导数连续限制跳跃的方向，原方程进一步要求该方向使主符号为零。

可以直接用波动方程验证这一现象。取

$$
u(x,t)=
\begin{cases}
(t-x)^2,&t>x,\\
0,&t\le x.
\end{cases}
$$

在直线 $t=x$ 两侧，$u$ 及一阶导数都连续，但 $u_{xx}$ 与 $u_{tt}$ 均从 $0$ 跳到 $2$，而 $u_{xt}$ 从 $0$ 跳到 $-2$。于是 $u_{tt}-u_{xx}=0$ 在两侧仍然成立，因为两个最高阶导数的跳跃恰好相互抵消。发生跳跃的直线 $t=x$ 正是波动方程的一条特征曲线。

因此，特征曲线还与奇异性传播（Propagation of Singularities）有关：当解的低阶导数保持连续时，高阶导数的不连续性只能沿符合特征条件的曲线出现。这一命题揭示的是跳跃出现的必要条件。

## 高维推广

二维例子已经体现出三种方程的基本结构。现在把它们推广到更高维，可以发现分类与特征条件依然由最高阶部分决定。

### 拉普拉斯算子

在 $\mathbb R^n$ 中，拉普拉斯算子为

$$
\boxed{\Delta u=\sum_{i=1}^n u_{x_ix_i}},
\qquad p(x;\xi)=|\xi|^2.
$$

因此，它在任意维度下都是椭圆型的。若 $x=Ay$ 且 $A$ 为正交矩阵，则 $\Delta_xu=\Delta_yu$，这就是拉普拉斯算子的旋转不变性（Rotational Invariance）。方程 $\Delta u=0$ 的解仍称调和函数；如果右端项非零，方程 $\Delta u=f$ 称为泊松方程（Poisson Equation）。

### 热算子

在 $\mathbb R^{n+1}$ 中，把 $x=(x_1,\ldots,x_n)$ 作为空间变量，$t$ 作为时间变量，热算子变为

$$
\boxed{Lu=u_t-\Delta_xu},
\qquad p(x,t;\xi,\tau)=-|\xi|^2.
$$

主符号不含时间方向的 $\tau$，因为 $u_t$ 只是一阶导数。对于由 $\varphi(x,t)=0$ 给出的光滑超曲面，其非特征条件为 $|\nabla_x\varphi|^2\ne0$；如果 $\nabla_x\varphi=0$ 且 $\varphi_t\ne0$，则它是特征超曲面。特别地，所有固定时刻的超平面 $t=t_0$ 都是特征的。

### 波动算子

高维波动算子为

$$
\boxed{\Box u=u_{tt}-\Delta_xu},
\qquad p(x,t;\xi,\tau)=\tau^2-|\xi|^2.
$$

它的特征超曲面需要满足

$$
\varphi_t^2-|\nabla_x\varphi|^2=0.
$$

一个重要的例子是以 $(x_0,t_0)$ 为顶点的特征锥（Characteristic Cone）：

$$
\boxed{|x-x_0|^2=(t-t_0)^2.}
$$

令 $\varphi(x,t)=|x-x_0|^2-(t-t_0)^2$，则 $\nabla_x\varphi=2(x-x_0)$，$\varphi_t=-2(t-t_0)$。因此，在锥面上有

$$
\varphi_t^2-|\nabla_x\varphi|^2
=4(t-t_0)^2-4|x-x_0|^2=0.
$$

除顶点处不光滑之外，整个锥面都是特征的。特别是当空间只有一维时，这个关系分解成 $t-t_0=\pm(x-x_0)$，恰好回到前面的两族特征直线。

### 一般方程

目前讨论的三个算子，最高阶系数都很简单。为了包含变系数与低阶项，本节最后还引入了更一般的抛物型和双曲型方程。设空间二阶系数矩阵 $A(x,t)=(a_{ij}(x,t))$ 正定，则

$$
\begin{aligned}
\text{抛物型：}\quad
&u_t-\sum_{i,j=1}^n a_{ij}u_{x_ix_j}
+\sum_{i=1}^n b_i u_{x_i}+cu=f,\\[5pt]
\text{双曲型：}\quad
&u_{tt}-\sum_{i,j=1}^n a_{ij}u_{x_ix_j}
+\sum_{i=1}^n b_i u_{x_i}+cu=f.
\end{aligned}
$$

各项系数都可以依赖 $(x,t)$。两者在空间上都有正定的二阶部分，区别在于时间导数分别是一阶与二阶。

这里的抛物型（Parabolic）尤其值得说明。前面的二维三分法只有椭圆型、双曲型和退化型，而热方程属于退化型，因为它缺少时间方向的二阶导数。但“退化型”只告诉我们最高阶矩阵有零特征值，无法区分 $u_{xx}=0$ 与 $u_t-u_{xx}=0$ 这类结构不同的方程。抛物型正是从这种宽泛的退化型中进一步区分出来的一类：空间二阶部分正定，时间上具有一阶演化项。在本书的框架下，它是具有特殊结构的退化型方程。

## 三种方程的联系

现在三个经典算子及其高维形式都已经介绍完毕，可以把它们放在一起，考察数学结构与物理来源之间的关系。拉普拉斯方程、热方程和波动方程都包含空间拉普拉斯算子 $\Delta_x$，但它们描述的过程有根本差异：一个是空间中的平衡关系，一个是随时间发生的扩散过程，一个是由惯性与作用力产生的振动。

### 平衡与热扩散

先从热量守恒出发。设 $u(x,t)$ 是温度，$F$ 是热通量密度（Heat Flux Density），并把材料密度、比热容等常数归一化。对于任意光滑子区域 $\Omega'$，内部热量的变化率等于流入的净热量：

$$
\frac{d}{dt}\int_{\Omega'}u\,dx
=-\int_{\partial\Omega'}F\cdot\nu\,dS.
$$

应用散度定理（Divergence Theorem），并利用 $\Omega'$ 的任意性，便得到局部守恒关系

$$
u_t=-\operatorname{div}F.
$$

这里还不能直接得到热方程，因为我们尚未说明热通量与温度之间的联系。根据傅里叶热传导定律（Fourier's Law of Heat Conduction），在各向同性、导热系数为正常数 $a$ 的情形下，

$$
F=-a\nabla u.
$$

负号表示热量由高温区域向低温区域流动。代入守恒关系，得到

$$
u_t=-\operatorname{div}(-a\nabla u)=a\Delta u.
$$

当 $a=1$ 时，这就是标准热方程 $u_t-\Delta u=0$。

如果系统达到稳态，即温度不再随时间变化，那么 $u_t=0$，上述方程立即化为

$$
\boxed{\Delta u=0.}
$$

所以，在同一个热传导模型中，热方程描述温度分布的时间演化，拉普拉斯方程则描述这种演化所满足的平衡条件。若区域内部存在持续的热源，平衡方程右端就可能出现非零项，对应泊松方程。

### 作用力与惯性

波动方程的物理来源不同。现在令 $u(x,t)$ 表示位移，而非温度。位移随时间的二阶导数 $u_{tt}$ 表示加速度。根据牛顿第二定律，质量乘以加速度等于合外力。

假设质量密度归一化为 $1$。采用书中关于作用力通量 $F$ 的符号约定，对任意子区域 $\Omega'$ 有

$$
\frac{d^2}{dt^2}\int_{\Omega'}u\,dx
=-\int_{\partial\Omega'}F\cdot\nu\,dS.
$$

通过散度定理，得到 $u_{tt}=-\operatorname{div}F$。在书中的简化模型 $F=-a\nabla u$ 下，便有

$$
\boxed{u_{tt}=a\Delta u.}
$$

当 $a=1$ 时，就得到标准波动方程。这里的 $a$ 与热方程中的导热系数具有不同的物理含义；在这个简化波动模型中，传播速度为 $\sqrt a$。

因此，热方程与波动方程的空间部分虽然都含 $\Delta_x$，时间上的变化规律却不同。热方程通过一阶时间导数描述温度如何变化；波动方程通过二阶时间导数联系位移、加速度与恢复力。这也解释了它们需要不同数量的初始数据：热方程通常给定初始温度，波动方程则需要初始位移与初始速度。

### 模态与时间演化

上述物理区别还可以直接从数学方程中看出来。为了观察空间变化如何影响时间演化，考虑一个非零空间频率 $k\ne0$ 对应的傅里叶模态（Fourier Mode）：

$$
u(x,t)=T(t)e^{i k\cdot x},
$$

其中 $k\in\mathbb R^n$ 表示空间频率向量。因为

$$
\Delta_x e^{ik\cdot x}=-|k|^2e^{ik\cdot x},
$$

把这一形式代入不同方程，就能将 PDE 简化为关于 $T(t)$ 的常微分方程。

对于热方程 $u_t-a\Delta_xu=0$，有

$$
T'(t)+a|k|^2T(t)=0,
\qquad T(t)=T(0)e^{-a|k|^2t}.
$$

所以，每个非零空间频率对应的振幅都会随时间指数衰减，并且 $|k|$ 越大，衰减越快。空间变化越剧烈的成分，消失得越快。这是热扩散使温度分布逐渐平滑的一个直接数学原因。

对于波动方程 $u_{tt}-a\Delta_xu=0$，则得到

$$
T''(t)+a|k|^2T(t)=0.
$$

其通解为

$$
T(t)=C_1\cos(\sqrt a|k|t)
+C_2\sin(\sqrt a|k|t).
$$

这次空间频率没有带来指数衰减，而是决定了振动频率。热方程对应衰减，波动方程对应振荡；两种截然不同的时间行为，直接来自一阶和二阶时间导数的区别。

从这个角度再看拉普拉斯方程，它描述的是不再发生时间演化时的空间平衡关系。三者共同使用 $\Delta_x$，却通过不同的时间结构产生了不同的解的行为。

### 特征结构

这种差别也反映在主符号上。拉普拉斯算子的主符号为 $|\xi|^2$，对任何非零方向都为正，因此没有实特征超曲面。热算子的主符号为 $-|\xi|^2$，时间方向没有二阶项，因而固定时刻的超平面是特征的。波动算子的主符号则是 $\tau^2-|\xi|^2$，时间与空间的二阶部分符号相反，于是存在特征直线和特征锥。

至此，方程的类型、初始数据的数量、特征几何以及典型的时间演化行为，都能够从最高阶微分结构中找到联系。

## 分类与特征小结

### 二维算子的分类

对于二阶系数矩阵

$$
A=\begin{pmatrix}a_{11}&a_{12}\\a_{12}&a_{22}\end{pmatrix},
\qquad
p(\xi)=\xi^{\mathsf T}A\xi,
$$

二维算子的分类可概括为：

| 类型 | 判定条件 | 特征方向 |
|---|---|---|
| 椭圆型（Elliptic） | $\det A>0$，两个特征值同号 | 没有实特征方向 |
| 双曲型（Hyperbolic） | $\det A<0$，两个特征值异号 | 两个不同的实特征方向 |
| 退化型（Degenerate） | $\det A=0$，至少一个零特征值 | 需进一步分析退化结构 |

在更高维度中，椭圆型要求 $p(x;\xi)\ne0$ 对所有非零 $\xi$ 成立，等价于二阶系数矩阵正定或负定。抛物型在本节指空间二阶部分正定、时间方向只有一阶导数的特殊退化结构。

### 三个典型算子

| 方程 | 算子 | 主符号 | 特征曲面 |
|---|---|---|---|
| 拉普拉斯方程 | $\Delta u$ | $\lvert\xi\rvert^2$ | 无实特征超曲面 |
| 热方程 | $u_t-\Delta_xu$ | $-\lvert\xi\rvert^2$ | $t=t_0$ |
| 波动方程 | $u_{tt}-\Delta_xu$ | $\tau^2-\lvert\xi\rvert^2$ | $\lvert x-x_0\rvert^2=(t-t_0)^2$ 等特征面 |

对于一维空间中的波动方程，两族特征曲线是 $t=x+C$ 与 $t=-x+C$。对一般光滑超曲面 \(\Sigma=\{\varphi=0\}\)，其特征条件统一为

$$
\boxed{p(x;\nabla\varphi)=0,}
$$

非特征条件则为 $p(x;\nabla\varphi)\ne0$。它保证方程可以用来确定法向最高阶导数；命题 3.1.6 进一步说明，在函数与一阶导数连续的前提下，二阶导数的非零跳跃只能沿特征曲线发生。

### 物理关系

| 数学模型 | 方程 | 主要关系 |
|---|---|---|
| 稳态平衡 | $\Delta u=0$ | 热通量散度为零，温度不再随时间变化 |
| 热扩散 | $u_t=a\Delta u$ | 守恒律与梯度通量，空间频率随时间衰减 |
| 波动 | $u_{tt}=a\Delta u$ | 牛顿第二定律与恢复力，空间频率对应时间振荡 |

这也给出了理解本节各类方程的一条统一思路：先看最高阶系数如何构成主符号，再看特征方向与初始数据的关系，最后结合时间导数的结构判断方程描述的演化性质。

---

# 3.2 能量估计

在 3.1 节中，我们研究二阶偏微分方程的最高阶结构，区分了椭圆型、抛物型与双曲型方程，并说明特征超曲面如何与初值问题及导数跳跃联系起来。不过，知道一个方程属于哪种类型，仍然不能直接回答另一个问题：如果我们规定了初始数据或边界数据，方程的解是否唯一？当这些已知数据发生微小变化时，解又会发生多大的变化？

这一节采用的工具是能量估计（Energy Estimates），它属于先验估计（A Priori Estimates）。与第二章 2.3 节的思想相同，我们暂时假设解存在，利用方程建立解的范数与已知数据之间的不等式。**这里的主要目标是证明唯一性与连续依赖性，也就是稳定性，而不是直接求出解的具体表达式。** 在数据为零时，有些估计确实会进一步迫使解为零；这也是证明唯一性最常用的办法。至于解的存在性，单凭本节这些计算一般还不能解决。

与一阶方程不同，二阶方程直接包含 $\Delta u$、$u_{tt}$ 等高阶导数。为了让这些项产生可以控制的量，我们将方程乘以合适的函数，再进行分部积分，把二阶导数转化为一阶导数的平方。这里最常用的是 $L^2$ 范数（$L^2$ Norm）：

$$
\|u\|_{L^2(\Omega)}=\left(\int_\Omega |u|^2\,dx\right)^{1/2},\qquad
\|\nabla u\|_{L^2(\Omega)}=\left(\int_\Omega |\nabla u|^2\,dx\right)^{1/2}.
$$

这些积分量之所以适合做估计，是因为平方非负，而且分部积分后往往恰好能得到它们。作者依次讨论拉普拉斯方程、泊松方程、热方程和波动方程，最后再研究一个定义在整个空间上的椭圆型方程。

## 拉普拉斯方程的边值问题

### Dirichlet 问题

首先考虑有界 $C^1$ 区域 $\Omega\subset\mathbb R^n$ 上的拉普拉斯方程，并在边界规定函数值：

$$
\begin{cases}
\Delta u=0,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega.
\end{cases}
$$

这称为狄利克雷边值问题（Dirichlet Boundary-Value Problem）。这里 $\partial\Omega$ 是区域边界，$\varphi$ 是已知的边界函数。由于拉普拉斯方程描述的是空间中的平衡关系，没有时间变量，因此我们给出的是空间边界条件，而不是初始条件。

现在假设有两个足够光滑的解 $u_1,u_2\in C^2(\Omega)\cap C^1(\overline\Omega)$。为了证明唯一性，令 $w=u_1-u_2$。由线性性和相同的边界条件，得到

$$
\begin{cases}
\Delta w=0,&x\in\Omega,\\
w=0,&x\in\partial\Omega.
\end{cases}
$$

这样，证明两个解相等，就转化为证明满足齐次边界条件的 $w$ 必须为零。作者将方程乘以 $w$。根据乘积求导法则，

$$
\begin{aligned}
\operatorname{div}(w\nabla w)
&=\sum_{i=1}^n(ww_{x_i})_{x_i}\\
&=\sum_{i=1}^n\bigl(w_{x_i}^2+ww_{x_ix_i}\bigr)\\
&=|\nabla w|^2+w\Delta w.
\end{aligned}
$$

因此

$$
w\Delta w=\operatorname{div}(w\nabla w)-|\nabla w|^2.
$$

对 $\Omega$ 积分，并利用 $\Delta w=0$：

$$
0=\int_\Omega\operatorname{div}(w\nabla w)\,dx
-\int_\Omega|\nabla w|^2\,dx.
$$

这里使用散度定理（Divergence Theorem），把区域内部的散度积分变成边界上的通量积分。设 $\nu$ 为 $\partial\Omega$ 的外单位法向量，则

$$
\int_\Omega\operatorname{div}(w\nabla w)\,dx
=\int_{\partial\Omega}(w\nabla w)\cdot\nu\,dS
=\int_{\partial\Omega}w\frac{\partial w}{\partial\nu}\,dS,
$$

其中 $\partial w/\partial\nu=\nabla w\cdot\nu$ 是沿外法向的方向导数。因而

$$
0=\int_{\partial\Omega}w\frac{\partial w}{\partial\nu}\,dS
-\int_\Omega|\nabla w|^2\,dx.
$$

由于 $w=0$ 在边界上，第一项消失，得到

$$
\boxed{\int_\Omega|\nabla w|^2\,dx=0.}
$$

被积函数处处非负，所以 $\nabla w=0$。又因为 $\Omega$ 连通，$w$ 在区域内是常数；结合边界上的 $w=0$，可知 $w\equiv0$，从而 $u_1=u_2$。

这个证明的核心不是直接计算 $w$ 的值，而是利用一个非负积分迫使它的梯度为零。由此，作者给出 **引理 3.2.1**：若 $f\in C(\overline\Omega)$、$\varphi\in C(\partial\Omega)$，则泊松方程的 Dirichlet 问题

$$
\begin{cases}
\Delta u=f,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega
\end{cases}
$$

在 $C^2(\Omega)\cap C^1(\overline\Omega)$ 中至多有一个解。证明完全相同：两个解相减以后，非齐次项 $f$ 抵消，得到的仍是刚才的齐次问题。作者还提到，第四章将通过最大值原理（Maximum Principle）把唯一性结论推广到 $C^2(\Omega)\cap C(\overline\Omega)$ 中的解。

### Neumann 问题

作者随后简单介绍诺伊曼边值问题（Neumann Boundary-Value Problem）。这次给定的不是函数在边界上的取值，而是它的法向导数：

$$
\begin{cases}
\Delta u=0,&x\in\Omega,\\
\dfrac{\partial u}{\partial\nu}=\psi,&x\in\partial\Omega.
\end{cases}
$$

这里的唯一性与 Dirichlet 问题不同。若 $u$ 是一个解，那么 $u+C$ 对任意常数 $C$ 也都是解，因为常数的梯度和拉普拉斯算子都为零。因此，这个问题的解只能在相差一个加法常数的意义下唯一。若取两个解之差 $w$，同样的积分恒等式配合齐次法向边界条件 $\partial w/\partial\nu=0$，恰好证明 $\nabla w=0$，也就证明了这一点。

此外，边界数据 $\psi$ 不能任意给定。对方程积分并应用散度定理：

$$
0=\int_\Omega\Delta u\,dx
=\int_{\partial\Omega}\frac{\partial u}{\partial\nu}\,dS
=\int_{\partial\Omega}\psi\,dS.
$$

所以，一个解存在的必要条件是

$$
\boxed{\int_{\partial\Omega}\psi\,dS=0.}
$$

如果把 $\nabla u$ 看成某种通量，这个条件意味着区域内部没有源项时，穿过整个边界的净通量必须为零。它同时揭示了不同边界条件的数学作用：Dirichlet 数据固定函数的绝对取值，而 Neumann 数据只固定边界上的变化率。

## 庞加莱不等式

前面的证明解决了唯一性，但我们还希望得到更强的定量结论。对于泊松方程 $\Delta u=f$，若 $f$ 不为零，解通常也不会是零。我们需要知道：$f$ 在 $L^2$ 意义下很小时，解是否也必须很小？

将方程乘以 $u$ 并分部积分会自然出现 \(\|\nabla u\|_{L^2}\)，但要估计 \(\|u\|_{L^2}\)，还缺少一个关键联系。原因在于，梯度只描述变化率，无法单独控制函数的绝对大小。例如，一个很大的常数函数虽然具有很大的 $L^2$ 范数，其梯度却恒为零。只有先用边界条件排除这种常数自由度，才能让梯度真正控制函数。

这就引出了庞加莱不等式（Poincaré Inequality）。原书的 **引理 3.2.2** 说明：若 $\Omega\subset\mathbb R^n$ 是有界 $C^1$ 区域，$u\in C^1(\overline\Omega)$ 且 $u=0$ 在 $\partial\Omega$ 上，则

$$
\boxed{
\|u\|_{L^2(\Omega)}
\le\operatorname{diam}(\Omega)\|\nabla u\|_{L^2(\Omega)}.
}
$$

这里 $\operatorname{diam}(\Omega)=\sup_{x,y\in\Omega}|x-y|$ 是区域的直径。这个结论的直观意义是：函数在边界上被固定为零，那么内部任何非零取值都必须由沿空间方向逐渐积累的变化产生。梯度衡量变化有多大，区域直径则限制这种变化能积累多远。

证明只需要沿一条穿过区域的直线运用一元微积分。固定其他坐标 $x'=(x_1,\ldots,x_{n-1})$，假设这条平行于 $x_n$ 轴的直线与区域相交得到一个区间 $a<x_n<b$。由于端点位于边界，$u(x',a)=0$，于是

$$
u(x',x_n)=\int_a^{x_n}u_{x_n}(x',s)\,ds.
$$

由柯西—施瓦茨不等式（Cauchy–Schwarz Inequality），

$$
\begin{aligned}
|u(x',x_n)|^2
&\le(x_n-a)\int_a^{x_n}|u_{x_n}(x',s)|^2\,ds\\
&\le(b-a)\int_a^b|u_{x_n}(x',s)|^2\,ds.
\end{aligned}
$$

在 $x_n\in(a,b)$ 上积分，并利用 $b-a\le\operatorname{diam}(\Omega)$：

$$
\int_a^b |u(x',x_n)|^2\,dx_n
\le\operatorname{diam}(\Omega)^2
\int_a^b|u_{x_n}(x',s)|^2\,ds.
$$

如果一条直线与区域相交得到多个不相连的区间，就在每个区间上作同样的估计，再将它们相加。最后对 $x'$ 积分，并使用 $|u_{x_n}|^2\le|\nabla u|^2$，得到

$$
\int_\Omega|u|^2\,dx
\le\operatorname{diam}(\Omega)^2\int_\Omega|\nabla u|^2\,dx.
$$

两边开平方，即得到原不等式。作者的图 3.2.1 画的就是这种沿直线从边界积分到内部的过程。理解这个引理时，最重要的是边界零值使函数的大小不能独立于它的变化率，这正是下一步估计所必需的。

## 泊松方程的先验估计

现在考虑带有齐次 Dirichlet 边界条件（Homogeneous Dirichlet Boundary Condition）的泊松方程：

$$
\boxed{
\begin{cases}
\Delta u=f,&x\in\Omega,\\
u=0,&x\in\partial\Omega.
\end{cases}
}
\tag{3.2.1}
$$

这里“齐次”只修饰边界条件 $u=0$；如果 $f\not\equiv0$，方程本身仍然是非齐次的。作者之所以采用这样的边界条件，是因为它能让分部积分中的边界项消失，而且恰好满足庞加莱不等式的前提。

**定理 3.2.3** 指出：在 $\Omega$ 有界且边界为 $C^1$、$f\in C(\overline\Omega)$，以及 $u\in C^2(\Omega)\cap C^1(\overline\Omega)$ 是上述问题的解的条件下，存在只依赖 $\Omega$ 的正常数 $C$，满足

$$
\boxed{
\|u\|_{L^2(\Omega)}+\|\nabla u\|_{L^2(\Omega)}
\le C\|f\|_{L^2(\Omega)}.
}
$$

证明沿用前面已经建立的多维分部积分公式。将 $\Delta u=f$ 乘以 $u$，在区域上积分：

$$
\int_\Omega uf\,dx
=\int_{\partial\Omega}u\frac{\partial u}{\partial\nu}\,dS
-\int_\Omega|\nabla u|^2\,dx.
$$

由于 $u=0$ 在边界上，得到

$$
\boxed{
\|\nabla u\|_{L^2}^2=-\int_\Omega uf\,dx.
}
$$

利用柯西—施瓦茨不等式，以及刚才证明的庞加莱不等式，令 $d=\operatorname{diam}(\Omega)$：

$$
\begin{aligned}
\|\nabla u\|_{L^2}^2
&\le\|u\|_{L^2}\|f\|_{L^2}\\
&\le d\|\nabla u\|_{L^2}\|f\|_{L^2}.
\end{aligned}
$$

若 \(\|\nabla u\|_{L^2}>0\)，两边约去一个梯度范数；若它为零，结果也显然成立。于是

$$
\|\nabla u\|_{L^2}\le d\|f\|_{L^2},
\qquad
\|u\|_{L^2}\le d\|\nabla u\|_{L^2}\le d^2\|f\|_{L^2}.
$$

最终

$$
\boxed{
\|u\|_{L^2}+\|\nabla u\|_{L^2}
\le(d+d^2)\|f\|_{L^2}.
}
$$

所以可以取 $C=d+d^2$。这个证明有两个彼此衔接的环节：分部积分首先控制梯度，再通过庞加莱不等式控制函数本身。由此，原方程右端的已知函数 $f$ 就同时控制了未知解的大小及其变化率。

## 热方程的能量估计

### 初边值问题

接下来作者研究抛物型的热方程。与拉普拉斯方程不同，热方程涉及时间，因此我们不仅要规定空间边界上的温度，还要规定初始时刻的温度分布：

$$
\boxed{
\begin{cases}
u_t-\Delta_xu=f,&(x,t)\in\Omega\times(0,\infty),\\
u(x,0)=u_0(x),&x\in\Omega,\\
u=0,&(x,t)\in\partial\Omega\times(0,\infty).
\end{cases}
}
\tag{3.2.2}
$$

这里 \(\Omega\times\{0\}\) 上规定的是初始值（Initial Values），$\partial\Omega\times(0,\infty)$ 上规定的是边界值（Boundary Values），两者承担不同的作用。这样的方程和条件合起来称为初边值问题（Initial/Boundary-Value Problem），也称混合问题（Mixed Problem）。原书假定 $\Omega$ 是有界 $C^1$ 区域，$f$、$u_0$ 连续，且 $u\in C^2(\Omega\times(0,\infty))\cap C^1(\overline\Omega\times[0,\infty))$ 是相应的经典解。

**定理 3.2.4** 给出任意时刻的 $L^2$ 估计：

$$
\boxed{
\|u(t)\|_{L^2(\Omega)}
\le\|u_0\|_{L^2(\Omega)}
+\int_0^t\|f(s)\|_{L^2(\Omega)}\,ds,
\qquad t>0.
}
$$

这里 $u(t)$ 表示固定时刻 $t$ 时的空间函数 $u(\cdot,t)$。这个不等式的意义是：当前解的大小受到初始数据与非齐次项在过去时间中的累计作用控制。如果 $f\equiv0$，它进一步给出 \(\|u(t)\|_{L^2}\le\|u_0\|_{L^2}\)，即 $L^2$ 范数不会随时间增大。

### 耗散恒等式

现在看这一估计从何而来。将热方程乘以 $u$：

$$
u u_t-u\Delta_xu=fu.
$$

时间项恰好是 $u^2$ 的时间导数，而空间项可以使用前面已经得到的散度恒等式：

$$
u u_t=\frac12(u^2)_t,
\qquad
-u\Delta_xu=-\operatorname{div}_x(u\nabla_xu)+|\nabla_xu|^2.
$$

因此

$$
\frac12(u^2)_t-\operatorname{div}_x(u\nabla_xu)
+|\nabla_xu|^2=fu.
$$

固定时刻 $t$，对空间区域 $\Omega$ 积分，利用散度定理与齐次边界条件 $u=0$，得到

$$
\boxed{
\frac12\frac{d}{dt}\int_\Omega u(x,t)^2\,dx
+\int_\Omega|\nabla_xu(x,t)|^2\,dx
=\int_\Omega f(x,t)u(x,t)\,dx.
}
$$

这是热方程的基本能量恒等式。当 $f=0$ 时，右边消失，因而

$$
\frac{d}{dt}\int_\Omega u^2\,dx
=-2\int_\Omega|\nabla_xu|^2\,dx\le0.
$$

所以，**热方程具有能量耗散（Energy Dissipation）的性质**。这里的能量指 \(\int_\Omega u^2\,dx\)，只要温度分布存在空间梯度，它就会随时间减小。这个结论也呼应了 3.1 节：热扩散使空间分布中的起伏逐渐衰减。

### 定理的证明

回到一般的非齐次方程，令

$$
E(t)=\|u(t)\|_{L^2(\Omega)}.
$$

利用能量恒等式和柯西—施瓦茨不等式：

$$
\begin{aligned}
\frac12\frac{d}{dt}E(t)^2+\|\nabla_xu(t)\|_{L^2}^2
&=\int_\Omega f(t)u(t)\,dx\\
&\le\|f(t)\|_{L^2}E(t).
\end{aligned}
$$

由于梯度平方项非负，将它舍去就有

$$
\frac12\frac{d}{dt}E(t)^2\le\|f(t)\|_{L^2}E(t).
$$

当 $E(t)>0$ 时，利用 $\frac12(E^2)'=EE'$ 并约去 $E$，得到 \(E'(t)\le\|f(t)\|_{L^2}\)。对时间从 $0$ 积分到 $t$，便得到定理中的估计。若 $E$ 在某些时刻为零，可以先将 $E$ 替换为 $\sqrt{E^2+\varepsilon^2}$，积分以后再令 $\varepsilon\to0$，结论仍然成立。

这个不等式立即带来唯一性。如果两个解具有相同的 $f$、初始数据和边界数据，那么它们的差 $w$ 满足齐次问题，且 $w(0)=0$。对 $w$ 应用定理，得到 \(\|w(t)\|_{L^2}=0\)，因此两解相同。

更一般地，对于不同数据 $(u_{01},f_1)$ 和 $(u_{02},f_2)$ 所对应的两个解，差函数满足同样类型的方程，从而

$$
\boxed{
\begin{aligned}
\|u_1(t)-u_2(t)\|_{L^2}
\le{}&\|u_{01}-u_{02}\|_{L^2}\\
&+\int_0^t\|f_1(s)-f_2(s)\|_{L^2}\,ds.
\end{aligned}
}
$$

所以定理同时证明了解对初始数据和非齐次项的连续依赖性。我们并没有求出任意时刻的温度函数，但已经知道它的演化不会任意放大输入数据的差异。

## 波动方程的能量估计

### 初边值问题

接下来考虑双曲型的波动方程。由于它在时间上包含二阶导数，除初始函数以外，还需要给定初始时间导数：

$$
\boxed{
\begin{cases}
u_{tt}-\Delta_xu=f,&(x,t)\in\Omega\times(0,\infty),\\
u(x,0)=u_0(x),&x\in\Omega,\\
u_t(x,0)=u_1(x),&x\in\Omega,\\
u=0,&(x,t)\in\partial\Omega\times(0,\infty).
\end{cases}
}
\tag{3.2.3}
$$

热方程只需规定初始温度，而波动方程需要初始位移 $u_0$ 与初始速度 $u_1$。这个区别恰好来自时间导数阶数的不同。现在我们希望证明：只要这两组初始数据和外部作用 $f$ 已知，就能控制波动过程中位移、速度及空间梯度的大小。

这里有一个与热方程不同的选择。热方程乘以 $u$，可以得到 $u^2$ 的时间导数；但波动方程有 $u_{tt}$，为了得到 $u_t^2$ 的时间导数，我们应当乘以 $u_t$。事实上，

$$
u_tu_{tt}=\frac12(u_t^2)_t,
$$

同时，利用乘积求导法则和混合偏导数的交换关系，

$$
\begin{aligned}
-u_t\Delta_xu
&=-\sum_{i=1}^n u_tu_{x_ix_i}\\
&=-\sum_{i=1}^n(u_tu_{x_i})_{x_i}
  +\sum_{i=1}^n u_{tx_i}u_{x_i}\\
&=-\operatorname{div}_x(u_t\nabla_xu)
  +\frac12(|\nabla_xu|^2)_t.
\end{aligned}
$$

因此，把 $u_{tt}-\Delta_xu=f$ 乘以 $u_t$，得到

$$
\boxed{
\frac12\frac{\partial}{\partial t}
\left(u_t^2+|\nabla_xu|^2\right)
-\operatorname{div}_x(u_t\nabla_xu)=fu_t.
}
$$

这个恒等式告诉我们，波动方程自然对应的能量同时包含两部分：$u_t^2$ 衡量速度，$|\nabla_xu|^2$ 衡量空间形变。在相应的物理模型中，它们分别对应动能与势能。

### 能量守恒

固定时间并对空间积分，应用散度定理：

$$
\begin{aligned}
&\frac12\frac{d}{dt}\int_\Omega
\bigl(u_t^2+|\nabla_xu|^2\bigr)\,dx\\
&\qquad-\int_{\partial\Omega}u_t\frac{\partial u}{\partial\nu}\,dS
=\int_\Omega fu_t\,dx.
\end{aligned}
$$

由于边界条件 $u=0$ 对所有时间都成立，在边界上也有 $u_t=0$，所以边界积分消失。于是

$$
\boxed{
\frac12\frac{d}{dt}\int_\Omega
\bigl(u_t^2+|\nabla_xu|^2\bigr)\,dx
=\int_\Omega fu_t\,dx.
}
$$

定义波动方程的能量

$$
\mathcal E(t)=\frac12\int_\Omega
\bigl(u_t^2+|\nabla_xu|^2\bigr)\,dx.
$$

就得到

$$
\mathcal E'(t)=\int_\Omega fu_t\,dx.
$$

特别地，当 $f\equiv0$ 时，$\mathcal E'(t)=0$，因此

$$
\boxed{\mathcal E(t)=\mathcal E(0).}
$$

这就是能量守恒（Conservation of Energy）。与热方程的耗散行为形成鲜明对照：热方程的 $L^2$ 能量会逐渐减少，而没有外部作用的波动方程则保持动能与势能之和不变。

### 定理 3.2.5

为了处理一般的 $f$，作者考虑能量平方根。记

$$
J(t)=\left(\|u_t(t)\|_{L^2(\Omega)}^2
+\|\nabla_xu(t)\|_{L^2(\Omega)}^2\right)^{1/2}.
$$

根据能量恒等式，

$$
\begin{aligned}
J(t)J'(t)
&=\int_\Omega f(t)u_t(t)\,dx\\
&\le\|f(t)\|_{L^2}\|u_t(t)\|_{L^2}\\
&\le\|f(t)\|_{L^2}J(t).
\end{aligned}
$$

在 $J(t)>0$ 时约去 $J(t)$，得到 \(J'(t)\le\|f(t)\|_{L^2}\)；在 $J(t)=0$ 时同样可以通过给 $J^2$ 加一个正的小常数来完成严格的积分估计。因此

$$
J(t)\le J(0)+\int_0^t\|f(s)\|_{L^2}\,ds.
$$

由于初始条件是 $u(0)=u_0$、$u_t(0)=u_1$，所以

$$
J(0)=\left(\|u_1\|_{L^2}^2
+\|\nabla_xu_0\|_{L^2}^2\right)^{1/2}.
$$

在原书的条件下，$\Omega$ 为有界 $C^1$ 区域，$f$ 连续、$u_0\in C^1(\overline\Omega)$、$u_1$ 连续，且 $u\in C^2(\Omega\times(0,\infty))\cap C^1(\overline\Omega\times[0,\infty))$ 是满足初边值条件的解。这样就得到 **定理 3.2.5** 的第一个估计：

$$
\boxed{
\begin{aligned}
&\left(\|u_t(t)\|_{L^2}^2
+\|\nabla_xu(t)\|_{L^2}^2\right)^{1/2}\\
&\qquad\le
\left(\|u_1\|_{L^2}^2
+\|\nabla_xu_0\|_{L^2}^2\right)^{1/2}
+\int_0^t\|f(s)\|_{L^2}\,ds.
\end{aligned}
}
$$

这个不等式控制了任意时刻的速度与空间梯度，但还没有直接控制位移 $u$ 本身。因此，作者继续考虑 \(F(t)=\|u(t)\|_{L^2}\)。由于

$$
F(t)^2=\int_\Omega u(x,t)^2\,dx,
$$

求导并使用柯西—施瓦茨不等式：

$$
\begin{aligned}
F(t)F'(t)
&=\int_\Omega u(t)u_t(t)\,dx\\
&\le\|u(t)\|_{L^2}\|u_t(t)\|_{L^2}\\
&\le F(t)J(t).
\end{aligned}
$$

因此 $F'(t)\le J(t)$，再代入已经证明的估计：

$$
F'(t)\le J(0)+\int_0^t\|f(s)\|_{L^2}\,ds.
$$

对时间再次积分：

$$
F(t)\le F(0)+tJ(0)
+\int_0^t\left(\int_0^r\|f(s)\|_{L^2}\,ds\right)dr.
$$

最后的二重积分可以交换积分次序。注意积分区域为 $0\le s\le r\le t$，因此

$$
\begin{aligned}
\int_0^t\int_0^r\|f(s)\|_{L^2}\,ds\,dr
&=\int_0^t\int_s^t\|f(s)\|_{L^2}\,dr\,ds\\
&=\int_0^t(t-s)\|f(s)\|_{L^2}\,ds.
\end{aligned}
$$

于是得到第二个估计：

$$
\boxed{
\begin{aligned}
\|u(t)\|_{L^2}
\le{}&\|u_0\|_{L^2}
+t\left(\|u_1\|_{L^2}^2+\|\nabla_xu_0\|_{L^2}^2\right)^{1/2}\\
&+\int_0^t(t-s)\|f(s)\|_{L^2}\,ds.
\end{aligned}
}
$$

这里的逻辑很清楚：先利用波动方程的能量估计控制时间导数 $u_t$，再对时间积分，得到对位移 $u$ 的控制。两个估计合在一起，就能像热方程一样，对两个解的差应用同样的不等式，得到初边值问题的唯一性和对数据的连续依赖性。

## 能量估计的方法

回顾前面三个方程的证明，可以发现它们使用了同一种计算策略，却选择了不同的乘子。拉普拉斯方程与热方程乘以 $u$，是为了得到 $|\nabla u|^2$ 或 $u^2$；波动方程乘以 $u_t$，是为了将 $u_{tt}$ 转化为 $u_t^2$ 的时间导数，同时将空间项转化为 $|\nabla u|^2$ 的时间导数。乘子选得合适，原 PDE 才能变成一个含有非负平方项的积分恒等式。

随后，分部积分把空间内部的二阶导数转化成一阶导数和边界积分。边界条件决定哪些边界项能够消失；最后使用柯西—施瓦茨不等式、庞加莱不等式等，把未知量与给定数据联系起来。这也是作者强调能量估计可以推广到更一般的椭圆型、抛物型、双曲型方程的原因。

原书在这里还将波动方程的第一个估计改写为平方形式。由 \(J(t)\le J(0)+\int_0^t\|f(s)\|_{L^2}\,ds\)，利用 $(a+b)^2\le2a^2+2b^2$，再对时间积分使用柯西—施瓦茨不等式，可得

$$
\boxed{
J(t)^2\le2J(0)^2
+2t\int_0^t\|f(s)\|_{L^2}^2\,ds.
}
$$

它同样控制波动方程的能量，只是右端由平方的初始能量与外力的时空 $L^2$ 范数组成。进一步在时间上积分，可以得到整个时空区域上的能量估计。这些形式与前面的不等式并不矛盾，具体使用哪一种，取决于后续问题需要控制的范数。

## 全空间上的椭圆型方程

### 一阶导数的估计

这一节最后，作者回到椭圆型方程，但不再把方程定义在有界区域上，而是考虑整个 $\mathbb R^n$：

$$
\boxed{-\Delta u+u=f\qquad\text{在 }\mathbb R^n.}
\tag{3.2.4}
$$

它仍然是椭圆型的，因为椭圆性只由最高阶项决定。其主符号为 $p(\xi)=-|\xi|^2$，对所有非零 $\xi$ 都严格小于零；这里的零阶项 $u$ 不影响分类。

但整个空间没有有限的边界，前面利用齐次边界条件消去边界积分的办法无法直接使用。作者因此作出新的假设：**$u$ 及其有关导数在无穷远处衰减得足够快，使分部积分产生的无穷远边界项消失。** 严格地说，我们可以先在半径为 $R$ 的球 $B_R$ 上积分，完成分部积分后再令 $R\to\infty$，而不是直接把无穷远处当成普通边界处理。

先将方程乘以 $u$：

$$
-u\Delta u+u^2=fu.
$$

根据之前反复使用的散度恒等式，

$$
|\nabla u|^2+u^2-\operatorname{div}(u\nabla u)=fu.
$$

在整个空间积分，并用衰减条件消去散度项，得到

$$
\int_{\mathbb R^n}(|\nabla u|^2+u^2)\,dx
=\int_{\mathbb R^n}fu\,dx.
$$

再利用 $fu\le\frac12u^2+\frac12f^2$：

$$
\int_{\mathbb R^n}(|\nabla u|^2+u^2)\,dx
\le\frac12\int_{\mathbb R^n}(u^2+f^2)\,dx.
$$

整理便得到

$$
\boxed{
\int_{\mathbb R^n}\left(2|\nabla u|^2+u^2\right)dx
\le\int_{\mathbb R^n}f^2\,dx.
}
$$

这说明，在衰减条件下，仅靠方程右端的 $L^2$ 范数，就能控制 $u$ 和它的全部一阶导数。这里的 $u$ 项还有一个作用：它本身直接产生了 $u^2$，因此不再需要通过边界零值和庞加莱不等式来控制函数的绝对大小。

### 全部二阶导数的估计

作者进一步提出一个更强的问题：方程中只有拉普拉斯算子 $\Delta u$，也就是 Hessian 矩阵（Hessian Matrix，黑塞矩阵）对角线元素之和，我们能否控制全部二阶偏导数，包括混合导数？

先区分这两个对象：

$$
\Delta u=\sum_{i=1}^n u_{x_ix_i},
\qquad
\nabla^2u=(u_{x_ix_j})_{i,j=1}^n.
$$

$\Delta u$ 是一个标量，$\nabla^2u$ 则是包含所有二阶偏导数的矩阵。只看某一点上 Hessian 的迹，显然无法确定矩阵的全部元素；这里的进一步控制来自 PDE 在整个空间上的微分结构与分部积分。

将方程平方并积分：

$$
(-\Delta u+u)^2=f^2
\quad\Longrightarrow\quad
\int_{\mathbb R^n}\left((\Delta u)^2-2u\Delta u+u^2\right)dx
=\int_{\mathbb R^n}f^2\,dx.
$$

其中第二项通过分部积分变成

$$
-2\int_{\mathbb R^n}u\Delta u\,dx
=2\int_{\mathbb R^n}|\nabla u|^2\,dx.
$$

现在计算第一项。把拉普拉斯算子展开：

$$
\int_{\mathbb R^n}(\Delta u)^2\,dx
=\sum_{i,j=1}^n\int_{\mathbb R^n}
 u_{x_ix_i}u_{x_jx_j}\,dx.
$$

对于每一对指标 $i,j$，先沿 $x_i$ 分部积分，再沿 $x_j$ 分部积分，且利用混合偏导数可以交换次序：

$$
\begin{aligned}
\int_{\mathbb R^n}u_{x_ix_i}u_{x_jx_j}\,dx
&=-\int_{\mathbb R^n}u_{x_i}u_{x_ix_jx_j}\,dx\\
&=\int_{\mathbb R^n}u_{x_ix_j}^2\,dx.
\end{aligned}
$$

代回双重求和，就有

$$
\boxed{
\int_{\mathbb R^n}(\Delta u)^2\,dx
=\sum_{i,j=1}^n\int_{\mathbb R^n}u_{x_ix_j}^2\,dx
=\int_{\mathbb R^n}|\nabla^2u|^2\,dx.
}
$$

这里的 $|\nabla^2u|$ 指 Hessian 矩阵的 Frobenius 范数（Frobenius Norm），即全部矩阵元素平方和的平方根。将前面计算的两部分放回平方后的方程，最终得到

$$
\boxed{
\int_{\mathbb R^n}
\left(|\nabla^2u|^2+2|\nabla u|^2+u^2\right)dx
=\int_{\mathbb R^n}f^2\,dx.
}
\tag{3.2.5}
$$

这个恒等式立即说明

$$
\boxed{\|\nabla^2u\|_{L^2(\mathbb R^n)}
\le\|f\|_{L^2(\mathbb R^n)}.}
$$

它比前面的一阶估计更强：虽然方程最高阶部分只包含 $\Delta u$，也就是二阶导数的一个特定组合，但在全空间积分及充分衰减的条件下，我们实际上能够控制 Hessian 的每一个分量。这体现出椭圆型方程的重要特征，后面研究解的正则性时还会继续用到。

这里的衰减条件不能省略。比如取 $u(x)=e^{x_1}$，有 $\Delta u=e^{x_1}=u$，因此它是 $-\Delta u+u=0$ 的非零解。但 $e^{x_1}$ 在正向无穷远处指数增长，不满足衰减条件，相关积分也不会有限。正是这一类解解释了为什么我们必须为全空间的积分恒等式附加条件。

## 本节结论

到这里，3.2 节没有给出三个典型方程的一般显式解，却证明了许多关于解的重要性质。其共同做法是将 PDE 乘以合适的函数，通过散度定理和分部积分把高阶导数变成非负平方项，再由已知数据得到先验估计。

| 方程或问题 | 核心估计或恒等式 | 主要结论 |
|---|---|---|
| 拉普拉斯方程，齐次 Dirichlet 数据 | \(\int_\Omega \lvert\nabla w\rvert^2\,dx=0\) | 解唯一 |
| 庞加莱不等式 | $\lVert u\rVert_{L^2}\le d\lVert\nabla u\rVert_{L^2}$ | 边界零值使梯度控制函数本身 |
| 泊松方程，齐次 Dirichlet 数据 | $\lVert u\rVert_{L^2}+\lVert\nabla u\rVert_{L^2}\le C\lVert f\rVert_{L^2}$ | 解与梯度由非齐次项控制 |
| 热方程 | \(\frac12\frac{d}{dt}\lVert u\rVert_{L^2}^2+\lVert\nabla u\rVert_{L^2}^2=\int_\Omega fu\,dx\) | 齐次时能量耗散；唯一性与连续依赖性 |
| 波动方程 | \(\mathcal E'(t)=\int_\Omega fu_t\,dx\) | 齐次时能量守恒；唯一性与连续依赖性 |
| 全空间椭圆方程 | $\lVert\nabla^2u\rVert_{L^2}^2+2\lVert\nabla u\rVert_{L^2}^2+\lVert u\rVert_{L^2}^2=\lVert f\rVert_{L^2}^2$ | 在充分衰减条件下控制全部二阶导数 |

其中，$d=\operatorname{diam}(\Omega)$，$C$ 是只依赖于区域的正常数，波动方程的能量定义为

$$
\mathcal E(t)=\frac12\int_\Omega\left(u_t^2+\lvert\nabla u\rvert^2\right)dx.
$$

比较三个经典方程，可以发现它们的类型差异已经转化为解的行为差异：椭圆型方程的边值问题能够通过空间积分建立唯一性与整体导数估计；抛物型的热方程自然表现为耗散；双曲型的波动方程则表现为能量守恒。

这些结论使我们能够在没有显式解的情况下研究解的性质。接下来的 3.3 节将进一步使用分离变量法，实际构造这些方程的解。
