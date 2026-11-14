---
{ title: 偏微分方程-4, description: "", categories: [ 数学 ], tags: [ PDE ], params: { lang: zh }, date: 2026-11-14T00:40:49+08:00, draft: false, slug: 偏微分方程-4 }
---

# 4.1 节

第三章已经把二阶偏微分方程区分为椭圆型、抛物型和双曲型，并利用分离变量法求解了若干特殊区域上的边值问题。但分离变量法依赖区域形状与边界条件：矩形、圆盘等区域具有适合展开的坐标结构，换成一般区域，就很难继续直接计算。拉普拉斯方程的研究于是必须走向另一个方向：即使不知道解的显式表达式，能否建立一种统一的表示方法，并由此确定解的光滑性、唯一性以及对边界数据的依赖？

本节围绕两个方程展开：拉普拉斯方程 $\Delta u=0$ 与泊松方程 $\Delta u=f$。其中 $\Delta=\sum_{i=1}^n\partial_{x_ix_i}$ 是拉普拉斯算子（Laplace Operator）；满足 $\Delta u=0$ 的 $C^2$ 函数称为调和函数（Harmonic Function）。讨论分为四个相互衔接的部分：4.1.1 从球对称性寻找基本解并建立格林表示公式；4.1.2 利用调和修正消除未知的边界法向导数；4.1.3 在球形区域中构造格林函数与泊松核；4.1.4 利用积分表示进一步证明调和函数的光滑性、导数估计与解析性。

## 4.1.1 格林恒等式

### 径向函数与基本解

为了构造一般方程的解，首先需要找到一个足够简单、但又能够表达局部源项影响的特殊解。拉普拉斯算子在旋转下保持不变，因此可以先寻找只依赖于距原点距离 $r=|x|$ 的径向函数（Radial Function）$u(x)=v(r)$。这种对称性将一个 $n$ 维偏微分方程降为常微分方程，而不是预先假设所有解都具有径向对称性。

由链式法则，$\partial_{x_i}r=x_i/r$，所以

$$
u_{x_i}=v'(r)\frac{x_i}{r},\qquad
u_{x_ix_i}=v''(r)\frac{x_i^2}{r^2}+v'(r)\left(\frac1r-\frac{x_i^2}{r^3}\right).
$$

对 $i$ 求和并使用 $\sum_i x_i^2=r^2$，得到

$$
\boxed{\Delta u=v''(r)+\frac{n-1}{r}v'(r).}
$$

因此 $\Delta u=0$ 等价于

$$
v''+\frac{n-1}{r}v'=0
\quad\Longleftrightarrow\quad
\bigl(r^{n-1}v'(r)\bigr)'=0.
$$

于是 $v'(r)=Cr^{1-n}$。当 $n=2$ 时，积分给出 $v(r)=c_1+c_2\log r$；当 $n\ge3$ 时，得到 $v(r)=c_3+c_4r^{2-n}$。二维出现对数，高维出现幂函数，仅仅是积分 $r^{1-n}$ 时维度不同造成的结果。更重要的是，非恒定部分都在 $r=0$ 发生奇异，而在原点之外满足 $\Delta u=0$。

为什么要保留这种奇异性？普通调和函数描述的是“无源”的区域，而一般泊松方程 $\Delta u=f$ 含有源项。我们需要一个集中于单个位置的单位点源，再用积分叠加不同位置的点源贡献。为此，规定径向解穿过任意原点球面的外向通量等于 $1$：

$$
\int_{\partial B_r}\frac{\partial u}{\partial\nu}\,dS=1.
$$

这里 $\nu$ 是单位外法向量（Outward Unit Normal Vector），$\partial_\nu u=\nabla u\cdot\nu$。在以原点为球心的球面上，径向导数就是外法向导数，而球面面积为 $\omega_nr^{n-1}$，其中 $\omega_n$ 表示 $\mathbb R^n$ 中单位球面的面积。因此

$$
\int_{\partial B_r}\partial_\nu u\,dS=v'(r)\omega_nr^{n-1}=C\omega_n.
$$

令它等于 $1$，得到 $C=1/\omega_n$。这就固定了常数，产生拉普拉斯算子的基本解（Fundamental Solution）：

$$
\boxed{
\Gamma(x)=
\begin{cases}
\dfrac1{2\pi}\log|x|,&n=2,\\[5pt]
\dfrac1{(2-n)\omega_n}|x|^{2-n},&n\ge3.
\end{cases}}
$$

本书对 $\Delta$ 而非 $-\Delta$ 定义基本解，因此高维情况下 $\Gamma$ 为负；若采用 $-\Delta$，基本解的符号相应改变。对于 $x\ne0$，有

$$
\Gamma_{x_i}(x)=\frac{x_i}{\omega_n|x|^n},\qquad
\Gamma_{x_ix_j}(x)=\frac1{\omega_n}\left(\frac{\delta_{ij}}{|x|^n}-\frac{nx_ix_j}{|x|^{n+2}}\right),
$$

其中 $\delta_{ij}$ 是克罗内克符号（Kronecker Delta）。基本解与它的一阶导数在原点附近局部可积，但二阶导数一般不能作为局部绝对可积的普通函数处理。这个差异将在格林表示公式中直接出现。

### 分部积分与格林公式

在一维，乘积求导公式 $(vu')'=v'u'+vu''$ 给出

$$
\int_a^b vu''\,dx=[vu']_a^b-\int_a^b v'u'\,dx.
$$

我们希望将这种“内部二阶导数与边界项联系起来”的结构推广到高维。对向量场 $F=v\nabla u$ 使用乘积法则，

$$
\nabla\cdot(v\nabla u)=\nabla v\cdot\nabla u+v\Delta u.
$$

散度定理（Divergence Theorem）说，向量场内部的散度积分等于它穿过边界的净通量：$\int_\Omega\nabla\cdot F\,dx=\int_{\partial\Omega}F\cdot\nu\,dS$。其中 $\operatorname{div}F$ 与 $\nabla\cdot F$ 是同一个散度（Divergence）运算的两种写法，而 $\nabla$ 本身不等于散度。由此得到第一格林公式（Green's First Identity）：

$$
\boxed{\int_\Omega\bigl(v\Delta u+\nabla v\cdot\nabla u\bigr)\,dx
=\int_{\partial\Omega}v\,\partial_\nu u\,dS.}
$$

当 $v=1$，它退化为 $\int_\Omega\Delta u=\int_{\partial\Omega}\partial_\nu u$：内部的拉普拉斯算子积分，就是梯度场的边界总通量。一般的 $v$ 则是对梯度场进行加权，权重自身的变化会额外产生 $\nabla v\cdot\nabla u$。

交换 $u,v$ 并将两式相减，梯度内积因为对称性而抵消，于是得到第二格林公式（Green's Second Identity）：

$$
\boxed{\int_\Omega(v\Delta u-u\Delta v)\,dx
=\int_{\partial\Omega}(v\partial_\nu u-u\partial_\nu v)\,dS.}
$$

第一格林公式最容易从几何上理解：它是加权梯度场的散度定理。第二格林公式的价值则在于交换拉普拉斯算子的作用对象；两种积分之间的差异完全由边界项承担。当两个函数在边界上均为零时，边界项消失，$\int v\Delta u=\int u\Delta v$，这也体现了拉普拉斯算子的对称结构。

### 格林表示公式

上述公式还不能直接给出内部某个点 $x$ 的函数值。关键是把第二格林公式中的 $v(y)$ 选成 $\Gamma(x-y)$：基本解在 $y\ne x$ 时调和，而在 $y=x$ 时存在奇点，其特殊的球面通量正好能提取出 $u(x)$。

由于奇点不能直接放进经典格林公式，我们先从 $\Omega$ 挖去一个小球，记 $D_r=\Omega\setminus\overline{B_r(x)}$。在 $D_r$ 内应用第二格林公式，利用 $\Delta_y\Gamma(x-y)=0$，得到

$$
\int_{D_r}\Gamma(x-y)\Delta u(y)\,dy
=\int_{\partial\Omega}(\Gamma\partial_\nu u-u\partial_\nu\Gamma)\,dS
+\int_{\partial B_r(x)}(\Gamma\partial_\nu u-u\partial_\nu\Gamma)\,dS.
$$

这里第二个边界上的 $\nu$ 是**剩余区域 $D_r$ 的外法向量**，方向指向被挖掉的小球内部，即 $\nu=-(y-x)/r$。它与小球自身的外法向量恰好相反。这是法向量的反向，而不是简单套用“顺时针为负”之类的平面边界取向规则。

令 $r\to0$，需要分别处理三个地方，不能仅仅因为“小球收缩为一点”就默认所有积分为零。

- **挖去的小球体积分消失。** 当 $n\ge3$，$|\Gamma(x-y)|\asymp|x-y|^{2-n}$，薄球壳体积与 $\rho^{n-1}d\rho$ 成正比，乘起来是 $\rho\,d\rho$；于是 $\int_{B_r(x)}|\Gamma(x-y)|\,dy=O(r^2)\to0$。二维时相应量为 $O(r^2|\log r|)\to0$。由于 $\Delta u$ 在 $x$ 附近有界，$\int_{D_r}\Gamma\Delta u$ 可以趋于整个 $\Omega$ 上的积分。
- **小球面上的 $\Gamma\,\partial_\nu u$ 消失。** 由于 $\partial_\nu u$ 有界，$\Gamma$ 在球面上的量级为 $r^{2-n}$，而面积为 $r^{n-1}$，所以积分是 $O(r)\to0$；二维时为 $O(r|\log r|)\to0$。
- **小球面上的 $-u\,\partial_\nu\Gamma$ 不消失。** 在内边界上 $\partial_\nu\Gamma=-1/(\omega_nr^{n-1})$，所以

$$
-\int_{\partial B_r(x)}u(y)\partial_\nu\Gamma(x-y)\,dS_y
=\frac1{\omega_nr^{n-1}}\int_{\partial B_r(x)}u(y)\,dS_y.
$$

右边不是普通的“小球面积分”，而是**除以球面面积后的平均值**。由于 $u$ 连续，球面上的全部点都逼近 $x$，其函数值一致接近 $u(x)$，因此该平均值趋于 $u(x)$。这一步不需要 $u$ 调和，只需要连续。它与下一节的平均值性质也不同：这里是 $r\to0$ 的极限；调和函数的平均值性质则对每一个允许的正半径精确成立。

因此得到定理 4.1.2 的格林表示公式（Green's Representation Formula）：

$$
\boxed{\begin{aligned}
u(x)={}&\int_\Omega\Gamma(x-y)\Delta u(y)\,dy\\
&-\int_{\partial\Omega}\left[\Gamma(x-y)\frac{\partial u}{\partial\nu_y}(y)
-u(y)\frac{\partial\Gamma}{\partial\nu_y}(x-y)\right]dS_y.
\end{aligned}}
$$

这里 $x$ 是固定的内部点，$y$ 是积分变量，$\nu_y$ 强调在边界点 $y$ 处、相对于 $y$ 求法向导数，尤其 $\nabla_y\Gamma(x-y)=-\nabla\Gamma(x-y)$。取 $u\equiv1$，立刻得到 $\int_{\partial\Omega}\partial_{\nu_y}\Gamma(x-y)\,dS_y=1$：只要区域包围奇点，单位点源的总通量仍然为 $1$。

如果 $u$ 在 $\Omega$ 内具有紧支撑（Compact Support），即 $\operatorname{supp}u$ 是包含在 $\Omega$ 内部的紧集，那么在边界附近有一整层区域 $u\equiv0$，于是 $u|_{\partial\Omega}=0$ 且 $\partial_\nu u|_{\partial\Omega}=0$，边界积分完全消失：

$$
\boxed{u(x)=\int_\Omega\Gamma(x-y)\Delta u(y)\,dy.}
$$

紧支撑比“仅在边界上等于零”更强；后者通常不能推出法向导数也为零。对光滑紧支撑的测试函数，以上等式可以写成分布意义下的 $\Delta_y\Gamma(x-y)=\delta_x(y)$，其中 $\delta_x$ 是作用为 $\langle\delta_x,\phi\rangle=\phi(x)$ 的狄拉克测度（Dirac Measure）。**基本解之所以“基本”，不是因为它在奇点外又给出了一个调和函数，而是它能够产生单位点源，从而为一般源项的叠加提供核函数。**

## 4.1.2 格林函数

### 未知的边界法向导数

考虑狄利克雷边值问题（Dirichlet Boundary-Value Problem）：

$$
\begin{cases}
\Delta u=f,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega.
\end{cases}
$$

把已知的 $f$ 与 $\varphi$ 代入格林表示公式，可以将 $u(x)$ 写为一个体积分和两个边界积分。然而，其中一项包含未知的 $\partial_{\nu_y}u$。边界值 $u=\varphi$ 并不能直接给出法向导数；若直接把它当成已知，就等于预先知道了我们尚未求出的解。

解决办法不是另找一个完全无关的基本解，而是修正现有的 $\Gamma$，使它在边界上为零。固定 $x\in\Omega$，寻找一个关于 $y$ 调和的函数 $\Phi(x,y)$，满足

$$
\begin{cases}
\Delta_y\Phi(x,y)=0,&y\in\Omega,\\
\Phi(x,y)=\Gamma(x-y),&y\in\partial\Omega.
\end{cases}
$$

为什么是这两个条件？第一，$\Phi$ 调和，故可以对它与 $u$ 使用第二格林公式，得到一个等于零的积分恒等式；第二，$\Phi$ 在边界上与 $\Gamma$ 相等，减去这个恒等式后，未知的 $\partial_\nu u$ 的系数就变成 $\Gamma-\Phi=0$。

因此定义区域 $\Omega$ 的格林函数（Green's Function）为

$$
\boxed{G(x,y)=\Gamma(x-y)-\Phi(x,y).}
$$

它关于 $y$ 在 $y\ne x$ 处调和，在边界上为零，在分布意义下仍保留点源 $\Delta_yG(x,y)=\delta_x(y)$。现在把用 $\Phi$ 得到的零恒等式从原格林表示公式中相减，得到

$$
u(x)=\int_\Omega G(x,y)\Delta u(y)\,dy
-\int_{\partial\Omega}\left[G(x,y)\partial_{\nu_y}u(y)-u(y)\partial_{\nu_y}G(x,y)\right]dS_y.
$$

由于 $G|_{\partial\Omega}=0$，包含未知法向导数的项消失，于是

$$
\boxed{u(x)=\int_\Omega G(x,y)f(y)\,dy
+\int_{\partial\Omega}\varphi(y)\frac{\partial G}{\partial\nu_y}(x,y)\,dS_y.}
$$

注意，$G=0$ 在边界上并不意味着 $\partial_\nu G=0$；恰恰是后者保留了边界数据对内部解的影响。这个公式清楚地区分了内部源项的贡献与边界值的贡献。

### 唯一性与对称性

格林函数的构造把原问题转化成了求解另一个调和函数的狄利克雷问题，因此一般区域中 $\Phi$ 的存在性此时尚未解决。不过，一旦存在，它就是唯一的：若 $\Phi_1,\Phi_2$ 都满足相同方程及边界条件，则它们的差满足 $\Delta(\Phi_1-\Phi_2)=0$、边界值为零；由齐次狄利克雷问题的唯一性可知差恒为零。

引理 4.1.5 进一步指出

$$
\boxed{G(x,y)=G(y,x),\qquad x\ne y.}
$$

这一对称性不能仅由 $\Gamma(x-y)=\Gamma(y-x)$ 直接推出，因为修正项 $\Phi$ 的对称性尚未确定。证明的核心是固定两个不同点 $x_1,x_2$，取 $G_1(y)=G(x_1,y)$ 与 $G_2(y)=G(x_2,y)$，再把各自的奇点附近小球挖去，对剩余区域应用第二格林公式。外边界积分因为两个函数都为零而消失；当两小球收缩时，两个内边界分别留下 $G(x_2,x_1)$ 与 $-G(x_1,x_2)$，二者之和必须为零。这个结果体现了拉普拉斯算子在相应边界条件下的对称结构。

## 4.1.3 泊松积分公式

### 球形区域的格林函数

格林函数虽然消去了原解的未知法向导数，却仍需要解出修正函数 $\Phi$。在一般区域中很难显式做到这一点，因此作者转向球 $B_R=\{x:|x|<R\}$。球面反演恰好提供了一种不改变球内调和性的修正方式。

首先，若固定点 $x=0$，$\Gamma(-y)$ 在 $|y|=R$ 的球面上是常数，直接减去这个常数即可。因此当 $n\ge3$，

$$
G(0,y)=\frac1{(2-n)\omega_n}\bigl(|y|^{2-n}-R^{2-n}\bigr),
$$

而在二维，$G(0,y)=\frac1{2\pi}(\log|y|-\log R)$。

对于 $x\ne0$，引入球外反演点

$$
\boxed{X=\frac{R^2}{|x|^2}x,\qquad |x||X|=R^2.}
$$

由于 $|x|<R$，故 $|X|>R$，也就是 $X$ 位于球外。所以 $\Gamma(y-X)$ 在整个球内调和，能够充当修正项。关键几何关系是：对球面上的任何 $y$，

$$
\boxed{|y-x|=\frac{|x|}{R}|y-X|.}
$$

这个关系可以由 $|y|=R$、$X=R^2x/|x|^2$ 代入平方距离直接展开得到。它保证两种基本解在球面上只相差一个**不依赖边界点 $y$ 的系数**，于是可以调整系数使边界取值完全一致。对于 $n\ge3$，令

$$
\Phi(x,y)=\left(\frac R{|x|}\right)^{n-2}\Gamma(y-X),
$$

便得到

$$
\boxed{G(x,y)=\frac1{(2-n)\omega_n}\left[|y-x|^{2-n}-\left(\frac R{|x|}\right)^{n-2}|y-X|^{2-n}\right].}
$$

二维时，由 $\log|y-x|=\log\bigl(\frac{|x|}{R}|y-X|\bigr)$ 在球面上成立，可选择相应的对数修正项，得到

$$
\boxed{G(x,y)=\frac1{2\pi}\left[\log|y-x|-\log\left(\frac{|x|}{R}|y-X|\right)\right].}
$$

这里最值得理解的不是结果的复杂外形，而是构造原则：**把奇点放在球外，获得一个球内调和的函数；再利用球面的反演几何，使它在边界上与原基本解精确相等。**

### 泊松核

对于拉普拉斯方程 $\Delta u=0$，格林表示公式中的体积分已经消失，真正需要的只是 $G$ 关于边界积分变量 $y$ 的外法向导数。因此作者计算了球面上的 $\partial_{\nu_y}G$。以 $n\ge3$ 为例，对两个幂函数求 $y$ 梯度，再用 $|y-X|=(R/|x|)|y-x|$ 化简，得到边界上

$$
\nabla_yG(x,y)=\frac{R^2-|x|^2}{\omega_nR^2|x-y|^n}\,y.
$$

球面的外法向量是 $\nu_y=y/R$，故

$$
\boxed{\frac{\partial G}{\partial\nu_y}(x,y)
=\frac{R^2-|x|^2}{\omega_nR|x-y|^n}.}
$$

二维情形也得到同一公式。将它定义为泊松核（Poisson Kernel）：

$$
\boxed{K(x,y)=\frac{R^2-|x|^2}{\omega_nR|x-y|^n},\qquad x\in B_R,\ y\in\partial B_R.}
$$

引理 4.1.8 列出的五条性质恰好对应后面构造解时所需要的条件：

1. **光滑性**：对固定边界点 $y$，$K(x,y)$ 在球内部关于 $x$ 光滑，因为 $x\ne y$，分母没有奇点。
2. **正性**：$K(x,y)>0$，因为 $R^2-|x|^2>0$。
3. **远处一致衰减**：固定球面点 $x_0$，当内部点 $x\to x_0$ 时，对所有与 $x_0$ 保持距离 $|y-x_0|\ge\delta$ 的边界点 $y$，$K(x,y)\to0$，且一致收敛。这里是 **$x$ 靠近边界点 $x_0$，而 $y$ 远离它**，两个变量不能混淆。
4. **调和性**：$\Delta_xK(x,y)=0$，来自格林函数的调和结构，也可以直接对显式公式求导验证。
5. **归一性**：$\int_{\partial B_R}K(x,y)\,dS_y=1$。在格林表示公式中取常数调和函数 $u\equiv1$ 即可得到。

第三条尤其重要。由于 $x\to x_0$ 时分子 $R^2-|x|^2\to0$，而远离 $x_0$ 的边界点使分母 $|x-y|^n$ 有正下界，故这些远处位置上的核趋于零；相反，当 $y$ 也靠近 $x_0$ 时，核可能明显增大。**核的权重集中到靠近 $x_0$ 的边界部分，但整个球面上的总权重始终为 $1$。** 这正是泊松积分能恢复边界数据的机制。

### 泊松积分与狄利克雷问题

定理 4.1.9 给出：若 $\varphi\in C(\partial B_R)$，定义

$$
\boxed{u(x)=\int_{\partial B_R}K(x,y)\varphi(y)\,dS_y,\qquad x\in B_R,}
$$

则 $u$ 在球内光滑、满足 $\Delta u=0$，并且当 $x$ 从球内趋近边界点 $x_0$ 时，$u(x)\to\varphi(x_0)$。因此它确实解出了球形区域中 $f=0$ 的狄利克雷问题，而不仅仅是给出一个形式上的积分表达式。

证明的关键分成两步。由于积分核在内部关于 $x$ 光滑且调和，可以把求导移入积分得到 $\Delta u=0$；为了证明边界收敛，利用核的归一性写成

$$
u(x)-\varphi(x_0)=\int_{\partial B_R}K(x,y)[\varphi(y)-\varphi(x_0)]\,dS_y.
$$

随后把球面分成靠近 $x_0$ 与远离 $x_0$ 两部分。前一部分利用 $\varphi$ 的连续性使括号内足够小；后一部分虽不保证 $\varphi(y)$ 接近 $\varphi(x_0)$，但泊松核在那里一致趋于零，两部分积分因此都趋于零。

这里值得保留一个限制：4.1.2 一开始提出的是含有一般源项 $f$ 的问题，格林表示给出 $\int_\Omega Gf$ 与边界积分的组合；但本小节真正严格构造并验证的是 **$f=0$ 的球上问题**。当 $f\ne0$，还需要研究奇异体积分的正则性和求导合法性。本书在后面的泊松方程部分继续讨论这些问题，不能把“表示公式”与“存在性定理”混为一谈。

### 二维圆盘与傅里叶级数

在 $n=2$ 时，设 $x=(r\cos\theta,r\sin\theta)$、$y=(R\cos\eta,R\sin\eta)$，则

$$
|x-y|^2=R^2+r^2-2Rr\cos(\theta-\eta),\qquad dS_y=R\,d\eta.
$$

代入泊松核得到经典的圆盘泊松公式：

$$
\boxed{u(r,\theta)=\frac1{2\pi}\int_0^{2\pi}
\frac{R^2-r^2}{R^2-2Rr\cos(\theta-\eta)+r^2}\,\varphi(\eta)\,d\eta.}
$$

第三章用分离变量法得出的解具有形式

$$
u(r,\theta)=\frac{a_0}{2}+\sum_{k=1}^\infty\left(\frac rR\right)^k
(a_k\cos k\theta+b_k\sin k\theta).
$$

两者并不是互不相干的办法。令 $t=r/R$，泊松核中归一化后的因子满足

$$
\frac{1-t^2}{1-2t\cos\alpha+t^2}
=1+2\sum_{k=1}^\infty t^k\cos(k\alpha),\qquad |t|<1.
$$

所以泊松积分实际把各个傅里叶模态重新组合成了一个积分核。分离变量法先分解边界数据，再逐项求解；泊松公式直接对边界数据积分，但它们在圆盘上给出同一个解。

### 平均值与最大值

最后，在泊松公式中取 $x=0$。由于此时 $|y|=R$，泊松核变为常数 $K(0,y)=1/(\omega_nR^{n-1})$，所以

$$
\boxed{u(0)=\frac1{\omega_nR^{n-1}}\int_{\partial B_R}u(y)\,dS_y.}
$$

调和函数在球心处的值等于球面函数值的平均。这是 **对每一个允许半径都成立的精确等式**，不是仅在球半径趋于零时才成立。利用平移可以把球心换成一般的 $x$。

同时，因为 $K>0$ 且 $\int K=1$，泊松积分是边界函数值的正权重平均，立即有

$$
\boxed{\min_{\partial B_R}\varphi\leq u(x)\leq\max_{\partial B_R}\varphi.}
$$

这在球形区域上已经显露出最大值原理。为什么平均值性质能够反过来刻画调和性，以及为什么最大值只能在边界上取得，将在 4.2 节从散度定理与平均值性质本身出发重新证明。

## 4.1.4 调和函数的正则性

### 从二阶可微到无限次可微

按照定义，调和函数只需要属于 $C^2(\Omega)$ 并满足 $\Delta u=0$。但二阶可微一般不能推出三阶、四阶导数存在；更不能直接对方程反复求导来证明高阶光滑性，因为那样会预先使用待证明的导数。

定理 4.1.10 断言：

$$
\boxed{\Delta u=0,\quad u\in C^2(\Omega)\ \Longrightarrow\ u\in C^\infty(\Omega).}
$$

证明只需在原区域内部取一个闭包紧含于 $\Omega$ 的光滑子区域 $\Omega'$。因为 $u$ 调和，格林表示公式中的体积分消失，仅剩下 $\partial\Omega'$ 上的两个边界积分。固定内部点 $x$，它与积分边界 $\partial\Omega'$ 有正距离，因此 $\Gamma(x-y)$ 及其关于 $x$ 的任意阶导数都不遇到奇点，可以反复将求导移进积分号。这证明 $u$ 在任意内部子区域中光滑，因此 $u\in C^\infty(\Omega)$。

这个结论是**内部正则性（Interior Regularity）**：并不自动意味着高阶导数可以连续延伸到原区域边界。边界函数可能只有连续性，但球内部的泊松积分解仍然无限次可微。

### 内部梯度估计

知道导数存在还不够，还需要控制导数究竟能有多大。定理 4.1.11 证明，若 $u$ 在 $B_R(x_0)$ 内调和并连续到闭球，则

$$
\boxed{|\nabla u(x_0)|\leq\frac CR\max_{\overline{B_R(x_0)}}|u|,}
$$

其中 $C$ 只依赖于维度 $n$。它控制的是**局部变化速度**，而不是单纯说明梯度存在；$1/R$ 是空间缩放后梯度必然出现的尺度因子。

书中证明先取 $x_0=0,R=1$，再选择截断函数（Cutoff Function）$\varphi\in C_c^\infty(B_{3/4})$，使 $\varphi=1$ 在 $B_{1/2}$ 内成立。对 $u$ 与 $\varphi\Gamma(x-\cdot)$ 在挖去奇点的小球后的区域应用第二格林公式，外边界因为 $\varphi=0$ 消失，内边界留下 $u(x)$。利用

$$
\Delta_y(\varphi\Gamma)=\Gamma\Delta\varphi+2\nabla\varphi\cdot\nabla_y\Gamma+\varphi\Delta\Gamma,
$$

且奇点外 $\Delta\Gamma=0$，得到对于 $x\in B_{1/4}$，

$$
\boxed{u(x)=-\int_{\{1/2\leq|y|\leq3/4\}}u(y)
\bigl[\Delta\varphi(y)\Gamma(x-y)+2\nabla\varphi(y)\cdot\nabla_y\Gamma(x-y)\bigr]dy.}
$$

为什么这是一个有用的变化？因为 $\nabla\varphi$ 与 $\Delta\varphi$ 只在中间环带可能非零；当 $x\in B_{1/4}$ 时，那里所有 $y$ 都满足 $|x-y|\ge1/4$。原来在 $y=x$ 的奇点被完全排除，因而可对 $x$ 求导，并用基本解导数的有界性控制积分核，得到 $|\nabla u(0)|\leq C\sup_{B_1}|u|$。

最后令 $\widetilde u(z)=u(x_0+Rz)$，则 $\widetilde u$ 在单位球中仍调和，且 $\nabla\widetilde u(0)=R\nabla u(x_0)$。把单位球估计代入，就得到一般 $R$ 的结果。

### 任意阶导数估计

定理 4.1.12 将上一结论推广到任意阶。若 $|\alpha|=m$，则

$$
\boxed{|\partial^\alpha u(x_0)|\leq
\frac{C^me^{m-1}m!}{R^m}\max_{\overline{B_R(x_0)}}|u|.}
$$

证明的核心是归纳法。因为调和函数已知光滑，且 $\Delta(\partial^\alpha u)=\partial^\alpha(\Delta u)=0$，所以任意偏导数仍然调和。为控制 $m+1$ 阶导数，令 $v$ 为一个 $m$ 阶偏导数，先在较小球 $B_{(1-\theta)R}(x_0)$ 上对 $v$ 使用一阶梯度估计；再对该小球中的每个点，在仍包含于原球的 $B_{\theta R}$ 上使用 $m$ 阶归纳假设。这样得到

$$
|\nabla v(x_0)|\leq
\frac{C^{m+1}e^{m-1}m!}{(1-\theta)\theta^mR^{m+1}}
\max_{\overline{B_R(x_0)}}|u|.
$$

选择 $\theta=m/(m+1)$ 使 $(1-\theta)\theta^m$ 最大，并用 $(1+1/m)^m<e$，即可得到 $m+1$ 阶的系数。这种把原球分为两个彼此衔接的缩小尺度的办法，使高阶估计可以递推；公式中的 $m!$ 也为最后的解析性证明做好了准备。

### 调和函数序列的紧性

推论 4.1.13 指出：若 $\{u_k\}$ 是一列调和函数，并且对所有 $k$ 都有 $\sup_\Omega|u_k|\le M$，则可以提取一个子序列，在任意紧含于 $\Omega$ 的内部区域上连同各阶导数一致收敛，其极限仍然调和。

这里不只是“有界便收敛”。一般函数序列即使一致有界，也可能越来越剧烈地振荡。真正起作用的是高阶导数估计：在离边界有正距离的内部区域上，所有阶导数都具有与 $k$ 无关的统一上界，进而获得等度连续性（Equicontinuity）。阿尔泽拉–阿斯科利定理（Arzelà–Ascoli Theorem）允许逐阶提取一致收敛子序列，再用对角线方法得到同一个适用于所有内部紧子区域与各阶导数的子序列。特别是二阶导数收敛，使 $\Delta u=\lim\Delta u_k=0$，所以极限仍然调和。

这也解释了偏微分方程里反复建立**估计（Estimate）**的原因：在很多区域与边界条件下，我们根本没有显式解，却仍可借助估计证明唯一性、稳定性、正则性和紧性；在近似解方法中，统一估计还经常是提取极限、进一步证明存在性的前提。

### 解析性

无限次可微仍不足以推出解析性（Analyticity）：一个 $C^\infty$ 函数的泰勒级数未必收敛到原函数。定理 4.1.14 进一步证明调和函数是实解析函数（Real Analytic Function），即在每个内部点 $x_0$ 附近都能由自身的多元泰勒级数表示：

$$
\boxed{u(x)=\sum_\alpha\frac{\partial^\alpha u(x_0)}{\alpha!}(x-x_0)^\alpha.}
$$

证明取 $\overline{B_{2R}(x_0)}\subset\Omega$，沿固定方向 $h$ 考察一元函数 $g(t)=u(x_0+th)$。一维泰勒公式给出

$$
u(x_0+h)=\sum_{i=0}^{m-1}\frac1{i!}(h\cdot\nabla)^iu(x_0)+R_m(h),
\qquad
R_m(h)=\frac1{m!}(h\cdot\nabla)^mu(x_0+\theta h).
$$

把 $m$ 次方向导数展开，至多涉及 $n^m$ 个 $m$ 阶偏导数；再使用定理 4.1.12，对余项有

$$
\boxed{|R_m(h)|\leq
\left(\frac{Cne|h|}{R}\right)^m
\max_{\overline{B_{2R}(x_0)}}|u|.}
$$

关键是高阶导数估计中的 $m!$ 与泰勒余项中的 $1/m!$ 恰好抵消。只要 $|h|$ 足够小，使 $Cne|h|/R<1$，余项便按几何级数速度趋于零。于是泰勒级数确实收敛到 $u(x_0+h)$，解析性得证。

## 结论与对照

4.1 节从径向函数的一个奇异解出发，逐步建立了调和函数的表示方法、球形区域上的显式求解公式，以及解的高阶正则性。几条贯穿全节的判断值得单独保留：

- **基本解的奇异性是必要结构。** 它本身局部可积，因而小球体积分消失；但法向导数的奇异程度恰好抵消球面面积，使小球面极限留下 $u(x)$。
- **格林函数的构造目标是处理边界条件。** $G=\Gamma-\Phi$ 中的 $\Phi$ 不是任意修正，而是既要调和，又要在边界上匹配 $\Gamma$，从而消除未知的 $\partial_\nu u$。
- **泊松核连接了边界与内部。** 它为正、总积分为 $1$，内部点趋向某个边界点时，核的权重集中于该点附近，因此既能构造解，也能恢复边界值。
- **显式表示与一般存在性不是同一回事。** 格林公式给出一般 $\Delta u=f$ 的候选表示，但球上的泊松积分定理直接证明的是 $f=0$ 的狄利克雷问题。
- **估计不是附属计算。** 梯度估计控制变化速度，高阶估计控制导数增长，继而导出函数序列的紧性与调和函数的解析性。

| 位置 | 对象或结论 | 关键表达式 | 用途与限制 |
|---|---|---|---|
| 4.1.1 | 径向拉普拉斯公式 | $\Delta v=v''+(n-1)v'/r$ | 将径向 PDE 化为 ODE |
| 4.1.1 | 基本解 | $\Delta\Gamma=\delta_0$（分布意义） | 单位点源，原点处有奇异性 |
| 4.1.1 | 第一格林公式 | $\int(v\Delta u+\nabla v\cdot\nabla u)=\int_{\partial\Omega}v\partial_\nu u$ | 多维分部积分、能量估计 |
| 4.1.1 | 第二格林公式 | $\int(v\Delta u-u\Delta v)=\int_{\partial\Omega}(v\partial_\nu u-u\partial_\nu v)$ | 交换微分算子、构造表示公式 |
| 定理 4.1.2 | 格林表示 | $u=\int_\Omega\Gamma\Delta u-\int_{\partial\Omega}(\Gamma\partial_\nu u-u\partial_\nu\Gamma)$ | 将内部值分解为源项和边界贡献 |
| 定义 4.1.4 | 格林函数 | $G=\Gamma-\Phi,\ G|_{\partial\Omega}=0$ | 消除未知边界法向导数 |
| 引理 4.1.5 | 对称性 | $G(x,y)=G(y,x)$ | 反映拉普拉斯算子的对称结构 |
| 定理 4.1.6 | 球上格林函数 | 由 $X=R^2x/|x|^2$ 构造 | 利用反演几何获得显式表达式 |
| 推论 4.1.7 | 泊松核 | $K=(R^2-|x|^2)/(\omega_nR|x-y|^n)$ | 格林函数的边界外法向导数 |
| 引理 4.1.8 | 泊松核性质 | $K>0,\ \Delta_xK=0,\ \int_{\partial B_R}K=1$ | 正权重平均与边界收敛 |
| 定理 4.1.9 | 泊松积分 | $u=\int_{\partial B_R}K\varphi$ | 严格解决球上 $\Delta u=0$ 的狄利克雷问题 |
| 定理 4.1.10 | 光滑性 | $u\in C^\infty(\Omega)$ | 内部具有任意阶连续导数 |
| 定理 4.1.11 | 梯度估计 | $|\nabla u(x_0)|\le CM/R$ | 控制内部局部变化速度 |
| 定理 4.1.12 | 高阶导数估计 | $|\partial^\alpha u(x_0)|\le C^me^{m-1}m!M/R^m$ | 控制任意阶导数，准备解析性 |
| 推论 4.1.13 | 紧性 | 一致有界 $\Rightarrow$ 存在局部 $C^\infty$ 收敛子序列 | 极限仍然调和 |
| 定理 4.1.14 | 解析性 | $u$ 等于局部泰勒级数 | 由阶乘型估计控制余项 |

4.1 节最后已经通过泊松积分看到了平均值性质：调和函数在球心处的值等于球面上的平均值。但这一性质究竟为什么等价于 $\Delta u=0$，以及净通量为何恰好控制球面平均值关于半径的变化率，还需要一个不依赖球上显式格林函数的说明。这正是下一篇 4.2 节的起点。

# 4.2 节

在 4.1 节中，我们利用基本解、格林函数与泊松积分公式研究了拉普拉斯方程。那些构造给出了球形区域上的显式解，也带来一个相当特别的结论：调和函数在球心处的值，等于它在整个球面上的平均值。但如果离开了球上的泊松核，这个等式是否仍然成立？更进一步，平均值性质是不是只是一条求解公式的推论，还是足以反过来决定函数必须满足什么方程？

4.2 节的出发点就是这个问题。它不再依靠基本解的奇异性或球面反演，而是将平均值性质直接作为研究调和函数的工具。随后，作者利用它重新证明光滑性与梯度估计，再由非负性得到 Harnack 不等式、Liouville 定理，最终证明强最大值原理及狄利克雷问题的唯一性。这里最值得理解的，不是这些结论的数量，而是它们如何从一个积分等式中逐步产生。

设 $\Omega\subset\mathbb R^n$ 是区域，$\Delta u=\sum_{i=1}^n u_{x_ix_i}$ 是拉普拉斯算子（Laplace Operator），满足 $u\in C^2(\Omega)$ 且 $\Delta u=0$ 的函数称为调和函数（Harmonic Function）。下面基本按照教材第 4.2 节的顺序展开。证明较长的地方只保留决定结论的步骤；而我们讨论中反复涉及的“净通量为什么等于圆周平均值的变化率”“为什么半径不变的平均值就是中心值”等问题，会单独解释。

## 平均值性质

### 定义 4.2.1：两种平均

先考虑一个连续函数 $u\in C(\Omega)$。一般连续函数只保证：当球面收缩到球心时，球面上的平均值趋于中心值。我们在证明格林表示公式时已经用过这个极限。但调和函数满足的条件强得多——只要闭球包含于定义域内，**对于每一个允许的正半径，中心值就精确等于球面平均值 **，不需要取极限。

定义 4.2.1 给出了两种平均值性质（Mean-Value Property）。记 $\omega_n=|\partial B_1|$，即 $\mathbb R^n$ 中单位球面的面积；半径为 $r$ 的球面面积和球体积分别为

$$
|\partial B_r(x)|=\omega_n r^{n-1},\qquad |B_r(x)|=\frac{\omega_n r^n}{n}.
$$

第二个公式可以直接从球壳累积得到：$|B_r|=\int_0^r\omega_n\rho^{n-1}\,d\rho=\omega_n r^n/n$。所以两种平均值的归一化系数并非人为选择，而是分别除以球面的面积或球体的体积。

**球面平均值性质（Mean-Value Property over Spheres）**：对于任意 $\overline{B_r(x)}\subset\Omega$，都有

$$
\boxed{u(x)=\frac{1}{\omega_n r^{n-1}}\int_{\partial B_r(x)}u(y)\,dS_y.}
$$

**球体平均值性质（Mean-Value Property over Balls）**：对于同样的球，都有

$$
\boxed{u(x)=\frac{n}{\omega_n r^n}\int_{B_r(x)}u(y)\,dy.}
$$

两者分别平均球面上的值和整个球内部的值。在二维，它们对应圆周平均与圆盘平均。虽然积分区域不同，但这两种性质实际上等价，因为整个球正好由从中心向外的一层层球面组成。

### 两种形式的等价

先假设满足球面平均性质。将球面半径记为 $\rho$，则

$$
\omega_n\rho^{n-1}u(x)=\int_{\partial B_\rho(x)}u(y)\,dS_y.
$$

对 $\rho\in(0,r)$ 积分，左侧得到 $\omega_n r^n u(x)/n$；右侧由球坐标分层公式，得到 $\int_{B_r(x)}u(y)\,dy$。因此

$$
\frac{\omega_n r^n}{n}u(x)=\int_{B_r(x)}u(y)\,dy,
$$

除以球体积就得到球体平均值性质。反过来，若已知

$$
\frac{\omega_n r^n}{n}u(x)=\int_{B_r(x)}u(y)\,dy,
$$

两边对 $r$ 求导。左边等于 $\omega_n r^{n-1}u(x)$；右边由变半径球体积分的求导公式，等于 $\int_{\partial B_r(x)}u(y)\,dS_y$。再除以球面面积，即恢复球面平均值性质。这个推导依赖 $u$ 连续，使球壳积分随半径连续，并能使用微积分基本定理。

作者接着把积分区域固定为单位球。令 $y=x+rz$，球面上的面积元素满足 $dS_y=r^{n-1}dS_z$，球内体积元素满足 $dy=r^n\,dz$。于是两种性质又可分别写成

$$
\boxed{u(x)=\frac1{\omega_n}\int_{\partial B_1}u(x+rz)\,dS_z,\qquad
u(x)=\frac n{\omega_n}\int_{B_1}u(x+rz)\,dz.}
$$

这里第二个公式左边同样是 $u(x)$。固定积分区域的好处是，当我们改变半径 $r$ 或对 $x$ 求导时，积分区域不再跟着变化；只需要处理被积函数 $u(x+rz)$。

### 调和性与平均值的直观联系

此前我们讨论了很久的一个疑问是：$\Delta u=0$ 明明是每个点上的二阶导数条件，为什么能决定整个圆周上的函数平均值？最容易混淆的，是把“圆心的二阶变化平衡”误当成了“圆内处处平衡”。这两件事差别很大。

在二维，固定圆心 $x_0$，定义半径为 $r$ 的圆周平均值

$$
A(r)=\frac{1}{2\pi}\int_0^{2\pi}u\bigl(x_0+r(\cos\theta,\sin\theta)\bigr)\,d\theta.
$$

它是一个关于半径 $r$ 的函数。**平均值性质说的是 $A(r)=u(x_0)$；而我们先要证明的是 $A'(r)=0$。** 这两个结论不是一回事，中间还需要连续性来确定那个不变的常数。

先研究 $A'(r)$。固定方向 $\theta$，半径增加意味着圆周上的对应点沿径向向外移动；此时函数值的变化率就是法向导数 $\partial_\nu u=\nabla u\cdot\nu$。所以

$$
\begin{aligned}
A'(r)
&=\frac1{2\pi}\int_0^{2\pi}\partial_r u\bigl(x_0+r(\cos\theta,\sin\theta)\bigr)\,d\theta\\
&=\frac1{2\pi r}\int_{\partial B_r(x_0)}\nabla u\cdot\nu\,dS.
\end{aligned}
$$

我们把圆周上梯度场的净通量记为 $F(r)=\int_{\partial B_r(x_0)}\nabla u\cdot\nu\,dS$，就有

$$
\boxed{F(r)=2\pi r\,A'(r).}
$$

这就是净通量与圆周平均值导数之间的精确关系。它们成正比，比例系数是圆周长 $2\pi r$，并不是相差一个加法常数。通量是沿整个圆周累积的总径向变化率；$A'(r)$ 则是这些变化率的平均，所以自然只差一个圆周长度因子。若某些方向向外移动时函数值增加，而另一些方向减少，净通量就是对这些正负贡献的总计。

为什么 $\Delta u=0$ 会让这个净通量等于零？因为 $\Delta u=\nabla\cdot(\nabla u)$，散度定理（Divergence Theorem）给出

$$
\boxed{F(r)=\int_{\partial B_r(x_0)}\nabla u\cdot\nu\,dS
=\int_{B_r(x_0)}\Delta u(y)\,dy.}
$$

直观地看，可以把整个圆盘分成许多小区域。每个小区域的散度积分决定它的边界净通量；合并区域时，相邻区域共享的边界具有相反的外法向，内部通量相互抵消，只剩最外层圆周的通量。调和性要求的不是某个方向没有变化，而是圆盘 **内部每个点 ** 都满足 $\Delta u=0$，因而整个圆盘的净通量也为零。于是 $F(r)=0$，从而 $A'(r)=0$。

可是 $A'(r)=0$ 只说明 $A(r)$ 是常数，还没说明它等于圆心值。最后使用 $u$ 在 $x_0$ 处的连续性：当 $r\to0$，圆周上的点全部接近 $x_0$，所以

$$
\lim_{r\to0}A(r)=u(x_0).
$$

既然 $A(r)$ 对所有允许的半径都保持同一个常数，这个常数只能是 $u(x_0)$。因此得到 $A(r)=u(x_0)$。完整关系是

$$
\boxed{\Delta u=0\ \Longrightarrow\ F(r)=0\ \Longrightarrow\ A'(r)=0
\ \Longrightarrow\ A(r)\equiv\lim_{\rho\to0}A(\rho)=u(x_0).}
$$

这就是为什么 **局部微分条件会变成任意半径的积分条件 **。本质是两次转换：散度定理把圆内部每一点的局部平衡汇总成圆周净通量为零；半径求导把零通量转化为平均值不随半径变化。最后由连续性确定平均值恰好是圆心值。在 $\mathbb R^n$ 中，唯一的形式差别是

$$
\boxed{A'(r)=\frac1{\omega_n r^{n-1}}\int_{B_r(x_0)}\Delta u(y)\,dy,\quad
A(r)=\frac1{\omega_n r^{n-1}}\int_{\partial B_r(x_0)}u(y)\,dS_y.}
$$

注意并不能只要求 $\Delta u(x_0)=0$。例如 $u(x,y)=(x^2+y^2)^2$ 在原点满足 $\Delta u(0,0)=0$，但圆周平均值为 $A(r)=r^4$，随半径改变。真正足以推出所有半径平均值恒定的，是 $\Delta u=0$ 在 **整个球内处处成立 **。

### 二阶变化的另一种理解

上述证明解释了从微分条件到有限尺度平均值的全过程。若只想理解拉普拉斯算子为何与“周围平均”有关，也可以取一个很小的球面，对 $C^2$ 函数做二阶泰勒展开。设 $z\in\partial B_1$，则

$$
u(x+rz)=u(x)+r\nabla u(x)\cdot z+\frac{r^2}{2}z^TD^2u(x)z+o(r^2).
$$

把它对单位球面平均。由于对称性，$z_i$ 的平均为零，$z_iz_j$ 在 $i\ne j$ 时平均为零，各个 $z_i^2$ 的平均相同；又因 $\sum_i z_i^2=1$，所以每个 $z_i^2$ 的平均为 $1/n$。于是

$$
\boxed{A(r)=u(x)+\frac{r^2}{2n}\Delta u(x)+o(r^2),\qquad
\Delta u(x)=\lim_{r\to0}\frac{2n}{r^2}[A(r)-u(x)].}
$$

这说明 $\Delta u$ 测量的，正是极小球面平均值与中心值之间的二阶偏离。在二维，系数是 $r^2/4$。但这只是无穷小尺度的关系；要把它推广为所有允许半径的精确等式，仍然需要上面的净通量论证。

具体看 $u(x,y)=x^2-y^2$。它沿 $x$ 方向向上弯曲、沿 $y$ 方向向下弯曲，两个二阶导数分别为 $2$ 和 $-2$，因此 $\Delta u=0$。以原点为圆心，圆周上的值是 $r^2\cos2\theta$，向外扩张时的径向导数为 $2r\cos2\theta$。有的方向在增加，有的方向在减少，沿圆周积分正好抵消，所以圆周平均始终是 $0$，也就是圆心值。调和性从来不意味着函数在任何方向都不弯曲，而是意味着各方向的变化满足一个精确的整体平衡。

相反，对于 $u(x,y)=x^2+y^2$，沿所有径向向外移动时函数值都增加。它的拉普拉斯算子为 $\Delta u=4$；以原点为中心的圆周平均值是 $A(r)=r^2$，因此 $A'(r)=2r$。梯度场为 $(2x,2y)$，圆周净通量为 $F(r)=\int_{\partial B_r}2r\,dS=4\pi r^2$，正好满足 $F(r)=2\pi r A'(r)$。这个对照也说明：净通量与平均值变化率的关系对一般光滑函数就成立，调和性额外保证的是通量恰好等于零。

## 调和性与平均值性质

### 定理 4.2.2

现在作者正式证明：对于区域 $\Omega$ 中的函数，调和性与平均值性质是等价的。但这里有一个不能忽略的正则性差异。调和函数的定义预先要求 $u\in C^2$，而定义 4.2.1 只要求 $u$ 连续。因此，反向证明不能直接对 $u$ 求二阶导数；必须先从积分条件中推出光滑性。

定理 4.2.2 分为两部分：

1. 若 $u\in C^2(\Omega)$ 且 $\Delta u=0$，则 $u$ 满足平均值性质。
2. 若 $u\in C(\Omega)$ 且满足平均值性质，则 $u\in C^\infty(\Omega)$ 且 $\Delta u=0$。

第一部分的核心就是公式 (4.2.1)。固定 $x$，取 $0<\rho<r$ 且 $\overline{B_r(x)}\subset\Omega$。对梯度场使用散度定理，并令球面上的点为 $y=x+\rho w$，其中 $|w|=1$。由于球面外法向为 $w$，链式法则给出 $\partial_\nu u(x+\rho w)=\partial_\rho u(x+\rho w)$，且 $dS_y=\rho^{n-1}dS_w$。因此

$$
\boxed{
\int_{B_\rho(x)}\Delta u(y)\,dy
=\rho^{n-1}\frac{\partial}{\partial\rho}
\int_{\partial B_1}u(x+\rho w)\,dS_w.
}

$$

如果 $\Delta u=0$，左边等于零，因此右边的球面积分关于 $\rho$ 的导数为零。于是该积分与 $\rho$ 无关；让 $\rho\to0$，由连续性可知它等于 $\omega_nu(x)$，两边除以 $\omega_n$ 就得到球面平均值性质。这也给出了刚才净通量解释在一般维度下的严格证明。

### 反向证明与光滑卷积

困难在第二部分：若 $u$ 仅连续，不能事先假设 $\Delta u$ 存在。作者先构造一个光滑的径向核 $\varphi$。取在原点附近恒定、在单位球边界附近为零的光滑函数 $\psi:[0,1]\to\mathbb R$，并要求

$$
\omega_n\int_0^1\rho^{n-1}\psi(\rho)\,d\rho=1.
$$

定义 $\varphi(z)=\psi(|z|)$，则 $\varphi\in C_c^\infty(B_1)$，且由球坐标积分可知 $\int_{B_1}\varphi(z)\,dz=1$。再作缩放

$$
\varphi_\varepsilon(z)=\varepsilon^{-n}\varphi(z/\varepsilon),
$$

于是 $\operatorname{supp}\varphi_\varepsilon\subset B_\varepsilon$，并保持 $\int\varphi_\varepsilon=1$。其中 $\varepsilon^{-n}$ 正是为了抵消坐标缩放后体积元素产生的 $\varepsilon^n$。

通常，光滑核与连续函数的卷积只能 **近似 ** 原函数；但对具有平均值性质的 $u$，作者证明了更强的等式：只要 $\varepsilon<\operatorname{dist}(x,\partial\Omega)$，就有

$$
\boxed{u(x)=\int_\Omega u(y)\varphi_\varepsilon(y-x)\,dy.}
$$

证明并不复杂，真正发挥作用的是径向性。先把积分变量平移到 $x$，再按 $\varepsilon$ 缩放到单位球，最后用极坐标分层：

$$
\begin{aligned}
\int_\Omega u(y)\varphi_\varepsilon(y-x)\,dy
&=\int_{B_1}u(x+\varepsilon z)\varphi(z)\,dz\\
&=\int_0^1\psi(\rho)\rho^{n-1}
\left[\int_{\partial B_1}u(x+\varepsilon\rho w)\,dS_w\right]d\rho\\
&=u(x)\,\omega_n\int_0^1\psi(\rho)\rho^{n-1}\,d\rho\\
&=u(x).
\end{aligned}
$$

第三行使用球面平均值性质，内层积分正好等于 $\omega_nu(x)$；第四行使用核的归一化条件。**径向核把各个半径上的球面平均加权组合起来，而每一层的平均都等于同一个 $u(x)$，所以组合以后仍然是 $u(x)$。**

为什么这就证明了光滑性？在任意内部点附近先固定足够小的 $\varepsilon$，使卷积核的支撑始终位于 $\Omega$ 内。对 $x$ 求导时，导数落在光滑的 $\varphi_\varepsilon(y-x)$ 上，而不是原来只有连续性的 $u(y)$ 上：

$$
\partial^\alpha u(x)=(-1)^{|\alpha|}
\int_\Omega u(y)\,\partial^\alpha\varphi_\varepsilon(y-x)\,dy.
$$

光滑紧支撑核允许任意次求导，故 $u\in C^\infty(\Omega)$。现在才有资格使用公式 (4.2.1)。由于球面积分始终等于 $\omega_nu(x)$，其对半径的导数为零，所以 $\int_{B_r(x)}\Delta u(y)\,dy=0$。再除以球体积，让 $r\to0$。因为 $\Delta u$ 已经连续，它的球体平均趋于 $\Delta u(x)$，故 $\Delta u(x)=0$。

于是证明了

$$
\boxed{u\in C(\Omega)\text{ 且满足平均值性质}\quad\Longleftrightarrow\quad
u\in C^2(\Omega),\ \Delta u=0.}
$$

更强的是，平均值性质实际上自动推出 $u\in C^\infty(\Omega)$。推论 4.2.3 随即总结：**调和函数光滑，而且满足平均值性质。** 这与 4.1 节通过格林表示公式证明光滑性形成了两种不同的证明路径。书中也提醒：如此精确的球面平均值性质是拉普拉斯方程的特殊结构，不能原样推广到一般椭圆型方程。

## 内部梯度估计

### 定理 4.2.4

前一节的定理 4.1.11 已经建立了 $|\nabla u(x_0)|\le CM/R$，但证明需要基本解、截断函数与对奇异核的估计。既然现在掌握了平均值性质，就可以用更直接的方式重新证明，并将常数写成明确的维度 $n$。设 $u$ 在 $B_R(x_0)$ 内调和且连续延伸到闭球，则

$$
\boxed{|\nabla u(x_0)|\le\frac nR\max_{\overline{B_R(x_0)}}|u|.}
$$

由于调和函数光滑，且 $\Delta(u_{x_i})=\partial_{x_i}(\Delta u)=0$，所以每个一阶偏导数 $u_{x_i}$ 仍然调和。对它应用球体平均值性质，再对球内的 $u_{x_i}$ 使用分部积分或散度定理：

$$
\begin{aligned}
u_{x_i}(x_0)
&=\frac n{\omega_nR^n}\int_{B_R(x_0)}u_{x_i}(y)\,dy\\
&=\frac n{\omega_nR^n}\int_{\partial B_R(x_0)}u(y)\nu_i(y)\,dS_y.
\end{aligned}
$$

这里 $\nu_i$ 是球面单位外法向量的第 $i$ 个分量。各分量合并为向量等式，再取欧几里得范数，利用 $|\nu|=1$ 和球面面积 $\omega_nR^{n-1}$，得到

$$
\begin{aligned}
|\nabla u(x_0)|
&\le\frac n{\omega_nR^n}\int_{\partial B_R(x_0)}|u(y)|\,dS_y\\
&\le\frac n{\omega_nR^n}\,\omega_nR^{n-1}
\max_{\overline{B_R(x_0)}}|u|\\
&=\frac nR\max_{\overline{B_R(x_0)}}|u|.
\end{aligned}
$$

严格地说，如果只知道 $u$ 连续到闭球，而不预先知道导数可以延伸到边界，应先在 $B_\rho(x_0)$（$\rho<R$）上进行上述计算，再令 $\rho\uparrow R$。估计中的 $1/R$ 是导数对空间缩放的自然响应：控制函数值的球越大，对球心梯度的限制越强。这里的重点不是常数 $n$ 本身，而是 **函数的内部变化速度可以仅由函数值与到边界的尺度控制 **。

### 定理 4.2.5：微分 Harnack 不等式

当函数有正负变化时，刚才的估计需要使用整个球上 $|u|$ 的最大值。但若额外假设 $u\ge0$，我们可以直接用球心值控制梯度。这是微分 Harnack 不等式（Differential Harnack Inequality）：

$$
\boxed{|\nabla u(x_0)|\le\frac nR u(x_0).}
$$

证明仍从刚才得到的向量公式出发。因为 $u\ge0$，积分中的 $|u(y)|$ 可以直接换成 $u(y)$，然后使用球面平均值性质：

$$
\begin{aligned}
|\nabla u(x_0)|
&\le\frac n{\omega_nR^n}\int_{\partial B_R(x_0)}u(y)\,dS_y\\
&=\frac n{\omega_nR^n}\cdot\omega_nR^{n-1}u(x_0)
=\frac nR u(x_0).
\end{aligned}
$$

非负性为什么这样重要？因为球面平均值等于中心值，但一般函数的正负部分可能抵消；而非负函数不存在这种抵消，所以总积分本身就能控制绝对值积分。若 $u>0$，还可以除以 $u(x_0)$：

$$
\boxed{|\nabla\log u(x_0)|=\frac{|\nabla u(x_0)|}{u(x_0)}\le\frac nR.}
$$

因此，这条估计控制的不仅是绝对变化速度，更是 **相对于函数自身大小的变化速度 **。这恰好是随后比较不同位置函数值所需要的东西。这里的结论不能去掉非负性，例如 $u(x)=x_1$ 虽然调和，但在原点函数值为零而梯度非零。

## Liouville 定理与 Harnack 不等式

### 推论 4.2.6：Liouville 定理

在有界区域里，内部梯度只受到一个与半径有关的限制。但如果调和函数定义在整个 $\mathbb R^n$ 上，我们就可以选取任意大的球，让这个限制越来越强。推论 4.2.6 的结论是：**定义在整个 $\mathbb R^n$ 上、且有上界或有下界的调和函数必为常数。** 这称为 Liouville 定理（Liouville's Theorem）。

例如若 $u\ge c$，令 $v=u-c\ge0$。因为常数的拉普拉斯算子为零，$v$ 仍然调和。任取固定点 $x_0\in\mathbb R^n$，对任意 $R>0$ 都能在 $B_R(x_0)$ 上应用微分 Harnack 估计：

$$
0\le|\nabla v(x_0)|\le\frac nR v(x_0).
$$

点 $x_0$ 已经固定，所以 $v(x_0)$ 是固定值；令 $R\to\infty$，右边趋于零，从而 $\nabla v(x_0)=0$。由于点任意，$\nabla v\equiv0$；又因 $\mathbb R^n$ 连通，$v$ 和 $u$ 都是常数。如果 $u$ 只有上界，改用 $v=c-u\ge0$ 即可。

这里“整个空间”和“单侧有界”都是决定性条件。非恒定调和函数 $u(x,y)=x^2-y^2$ 在 $\mathbb R^2$ 上同时上下无界，因此不与定理矛盾；而有界区域上的 $u(x)=x_1$ 既有界又调和，却不是常数，因为我们无法让所在球的半径趋于无穷。这个例子体现了 PDE 中估计的一个常见机制：**局部估计在允许无限扩大的定义域中，可以变成全局刚性结论。**

### 推论 4.2.7：Harnack 不等式

微分 Harnack 估计告诉我们，正调和函数的相对变化率不能太大。接下来可以沿一条路径把相对变化率累积起来，直接比较两点的函数值。推论 4.2.7 断言：如果 $u\ge0$ 在 $B_R(x_0)$ 中调和，那么存在仅依赖维度 $n$ 的常数 $C$，使得

$$
\boxed{u(x)\le C\,u(y),\qquad x,y\in B_{R/2}(x_0).}
$$

这就是 Harnack 不等式（Harnack Inequality）。需要强调两个限制：首先是非负性，其次是比较点必须位于离外边界有一定距离的内部球中。接近边界时，内部估计所能使用的球半径会缩小，不能指望同一个常数继续适用。

书中首先假设 $u>0$。任取 $z\in B_{R/2}(x_0)$，以 $z$ 为球心的 $B_{R/2}(z)$ 包含在原球中，所以微分 Harnack 估计给出

$$
|\nabla\log u(z)|\le\frac{2n}{R}.
$$

任取 $x,y\in B_{R/2}(x_0)$，连接两点的线段 $\gamma(t)=tx+(1-t)y$ 仍在这个小球内。沿线段积分：

$$
\begin{aligned}
\log\frac{u(x)}{u(y)}
&=\int_0^1\nabla\log u(\gamma(t))\cdot(x-y)\,dt\\
&\le\frac{2n}{R}|x-y|\le2n.
\end{aligned}
$$

最后取指数，得到 $u(x)\le e^{2n}u(y)$。若最初仅有 $u\ge0$，先对严格正的 $u+\varepsilon$ 做同样证明，再令 $\varepsilon\downarrow0$。因为交换 $x,y$ 仍可使用这个结论，所以对于正调和函数，任意两点之间还满足 $e^{-2n}\le u(x)/u(y)\le e^{2n}$。这说明正调和函数在固定内部区域中，其值不仅被边界限制，而且彼此不能相差任意多倍。

### 平均值性质的第二种证明

书中第 110 页又给出一种不依赖梯度估计的证明。它的出发点是：既然非负调和函数的值等于一个球内的平均值，那么只要把一个小球包含到另一个较大的球中，就能比较两个球心的函数值。

取 $B_{4r}(\widetilde x)\subset B_R(x_0)$，并令 $x\in B_r(\widetilde x)$，则 $B_r(x)\subset B_{3r}(\widetilde x)$。利用非负性，扩张积分区域只会增加积分：

$$
\begin{aligned}
u(x)
&=\frac n{\omega_nr^n}\int_{B_r(x)}u(z)\,dz\\
&\le\frac n{\omega_nr^n}\int_{B_{3r}(\widetilde x)}u(z)\,dz\\
&=3^n u(\widetilde x).
\end{aligned}
$$

于是附近两点的函数值可以按固定倍数比较。作者接着取 $r=R/8$，通过对内部球 $B_{R/2}(x_0)$ 进行有限覆盖，把任意两点用一条彼此重叠的小球链连接起来，逐次应用 $u(x)\le3^n u(\widetilde x)$。因为所需球数只依赖维度，所有倍数相乘后仍然得到一个与具体函数无关的 $C$。

这一思路也可以具体化：沿连接 $x$ 与 $y$ 的线段等分成九段，每段长度小于 $R/9<R/8=r$，所有节点都在凸的内部球 $B_{R/2}(x_0)$ 中。逐段使用局部比较，就可以得到较粗的常数 $3^{9n}$。书中的有限覆盖证明则更适合推广到一般内部紧集。两种 Harnack 证明的本质区别是：**第一种对 $\log u$ 的梯度沿路径积分，第二种直接比较邻近小球的平均值，再通过有限条局部比较连接两点。**

## 最大值原理与唯一性

### 定理 4.2.8：强最大值原理

我们在 4.1 节已经通过泊松核的正权重平均发现：球内的调和函数不可能超出边界数据的最大值和最小值。现在作者用平均值性质证明一般有界区域上的更强结论。设 $\Omega$ 是有界 **连通 ** 区域，$u\in C(\overline\Omega)$ 在 $\Omega$ 内调和。那么除非 $u$ 是常数，否则它既不能在内部取得全局最大值，也不能在内部取得全局最小值；并且

$$
\boxed{\min_{\partial\Omega}u\le u(x)\le\max_{\partial\Omega}u,\qquad x\in\Omega.}
$$

这就是强最大值原理（Strong Maximum Principle）。所谓“强”，不只是给出函数的上下界，而是断言：**只要非恒定调和函数在一个内部点达到全局极值，就已经不可能继续保持非恒定。**

为什么会出现这种严格限制？设 $M=\max_{\overline\Omega}u$，并假设某个内部点 $x_0$ 满足 $u(x_0)=M$。在 $x_0$ 周围取一个小球 $B_r(x_0)\Subset\Omega$。球体平均值性质给出

$$
M=u(x_0)=\frac1{|B_r(x_0)|}\int_{B_r(x_0)}u(y)\,dy.
$$

但由于 $M$ 是整个区域上的最大值，球内处处满足 $u(y)\le M$。若存在某点 $y_0$ 使 $u(y_0)<M$，连续性就保证它附近一小片区域上仍严格小于 $M$；这样球体平均值必然严格小于 $M$，与上面的等式矛盾。因此必须有 $u\equiv M$ 在整个小球内成立。

作者将这个局部结论推广到整个连通区域。定义内部最大值点集

$$
D=\{x\in\Omega:u(x)=M\}.
$$

连续性保证 $D$ 在 $\Omega$ 中相对闭；刚才的平均值论证又说明，对于任何 $x_0\in D$，总有小球 $B_r(x_0)\subset D$，所以 $D$ 也是开集。由于 $\Omega$ 连通，一个既开又闭的子集只有两种可能：$D=\varnothing$ 或 $D=\Omega$。如果 $D=\varnothing$，最大值只能在边界取得；如果 $D=\Omega$，函数在整个区域恒为 $M$。对 $-u$ 重复同样的推理，就得到关于最小值的结论。

这项证明真正依赖的是两个因素：平均值性质让内部极值自动传播到一个邻域；连通性又让这种局部传播无法停在某个局部部分。它并不是简单地要求二阶导数“向上弯曲”或“向下弯曲”，而是从平均值无法超过最大值这一事实直接获得全局结论。

### 推论 4.2.9：狄利克雷问题的唯一性

最后作者将最大值原理应用于狄利克雷边值问题（Dirichlet Boundary-Value Problem）：

$$
\begin{cases}
\Delta u=f,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega.
\end{cases}
$$

这里 $f\in C(\Omega)$、$\varphi\in C(\partial\Omega)$，并假设 $\Omega$ 有界。推论 4.2.9 断言：在 $C^2(\Omega)\cap C(\overline\Omega)$ 中，问题 **至多有一个解 **。作者说的不是解一定存在，而是如果存在两个，它们必定相同。

证明取两个解 $u_1,u_2$，令 $w=u_1-u_2$。因为两者的方程源项相同、边界数据相同，所以

$$
\Delta w=\Delta u_1-\Delta u_2=f-f=0,
\qquad w|_{\partial\Omega}=\varphi-\varphi=0.
$$

于是 $w$ 调和且边界上恒为零。最大值原理给出 $w\le0$；对 $-w$ 使用同样的原理又得到 $w\ge0$。因此 $w\equiv0$，即 $u_1=u_2$，唯一性得到证明。

这与第三章利用能量估计（Energy Estimate）证明唯一性不同。能量法使用分部积分，将二阶微分算子转化成非负的梯度平方积分；最大值原理则直接利用调和函数的取值约束。尤其重要的是，后者只要求 $u\in C^2(\Omega)\cap C(\overline\Omega)$，不必预先假设一阶导数连续延伸到边界。因此两种方法虽然得到同一个唯一性结论，却利用了不同的数学结构。

## 结论与对照

4.2 节的所有结果都可以从平均值性质的一个核心特征出发理解：**内部的函数值并不是独立的，它必须与周围各个尺度上的取值保持精确一致。** 这个约束同时决定了函数的光滑性、局部变化速度以及全局极值的位置。

以下几个结论值得单独保留：

- **平均值性质比连续函数的小球极限强得多。** 连续性只保证球面平均在 $r\to0$ 时趋于中心值；调和性则保证每个允许半径下都精确相等。
- **净通量连接了局部方程与有限半径的平均。** $\Delta u=0$ 在整个球内成立，通过散度定理得到零通量；通量恰好等于球面面积乘以平均值关于半径的导数，因此平均值不随半径变化；连续性再把这个常数固定为中心值。
- **两种平均值性质等价。** 球面平均对半径积分得到球体平均；球体平均对半径求导又恢复球面平均。
- **非负性明显增强估计。** 一般调和函数的梯度只能由整个球上的最大绝对值控制；非负调和函数的梯度却可以直接由中心值控制，因此能进一步比较不同位置的函数值。
- **最大值原理来自平均值的刚性。** 内部点已经达到最大值，却又等于周围所有值的平均，这就迫使周围全部取同一最大值；连通性最终让函数只能恒定。
- **估计是后续理论的工具。** 梯度估计导出 Harnack 不等式，尺度扩大导出 Liouville 定理；最大值原理则在不求出显式解的情况下证明狄利克雷问题的唯一性。

| 位置 | 对象或结论 | 核心表达式 | 必要条件与意义 |
|---|---|---|---|
| 定义 4.2.1 | 球面平均 | $u(x)=\dfrac1{\omega_nr^{n-1}}\int_{\partial B_r(x)}u$ | 与球体平均等价；对每个内部闭球成立 |
| 定义 4.2.1 | 球体平均 | $u(x)=\dfrac n{\omega_nr^n}\int_{B_r(x)}u$ | 半径积分与求导联系两种平均 |
| 公式 (4.2.1) | 球内散度与球面变化 | $\int_{B_r}\Delta u=r^{n-1}\partial_r\int_{\partial B_1}u(x+rw)$ | 连接局部拉普拉斯算子与半径变化 |
| 定理 4.2.2 | 平均值性质刻画调和性 | $\Delta u=0\iff u$ 连续且满足平均值性质 | 逆向用光滑卷积先证明 $C^\infty$ |
| 推论 4.2.3 | 光滑与平均值 | $u\in C^\infty$ 且满足球面、球体平均 | 调和函数的结构性性质 |
| 定理 4.2.4 | 内部梯度估计 | $|\nabla u(x_0)|\le\dfrac nR\max_{\overline{B_R}}|u|$ | 梯度由球内函数值控制 |
| 定理 4.2.5 | 微分 Harnack | $|\nabla u(x_0)|\le\dfrac nR u(x_0)$ | 要求 $u\ge0$；正时得到 $|\nabla\log u|\le n/R$ |
| 推论 4.2.6 | Liouville 定理 | 整空间单侧有界调和函数为常数 | 利用 $R\to\infty$ 压低梯度 |
| 推论 4.2.7 | Harnack 不等式 | $u(x)\le C u(y)$，$x,y\in B_{R/2}$ | 非负性、内部区域；$C$ 只依赖维度 |
| 定理 4.2.8 | 强最大值原理 | $\min_{\partial\Omega}u\le u\le\max_{\partial\Omega}u$ | 非恒定时不能在内部取得全局极值；用连通性 |
| 推论 4.2.9 | 狄利克雷唯一性 | $\Delta w=0,\ w|_{\partial\Omega}=0\Rightarrow w=0$ | 说明至多一个解，不保证存在 |

回头看 4.1 与 4.2 两节，理论重心发生了清楚的转移。4.1 从基本解与格林函数出发，先构造表示公式，再由泊松核发现调和函数的性质；4.2 则反过来把平均值性质作为起点，不依赖显式格林函数，直接推出正则性、定量估计与唯一性。两条路线最后指向同一个事实：拉普拉斯方程的解并不是一组任意满足二阶等式的函数，它的每个内部取值都与周围区域的整体结构紧密相连。

# 4.3 最大值原理

前两节已经通过基本解、泊松积分和平均值性质，建立了调和函数的光滑性、梯度估计、Harnack 不等式以及强最大值原理。但这些性质是否只能用于满足 $\Delta u=0$ 的调和函数？事实上，对于限制函数在内部取得最大值而言，平均值严格相等并不是必要条件。只要函数值不超过周围的平均值，就已经足以产生某种最大值约束。

本节从这一观察出发，将研究对象从调和函数推广到次调和函数，再扩展到含零阶项的一般椭圆型方程。随后利用最大值原理研究 Dirichlet 与 Neumann 问题的唯一性、解的先验估计和梯度估计，最后通过可去奇点定理与 Perron 方法，解决孤立奇点的延拓以及一般区域上 Dirichlet 问题的存在性。

## 4.3.1 弱最大值原理

### 次调和函数与上调和函数

**定义 4.3.1** 设 $u\in C^2(\Omega)$。如果

$$
\Delta u\geq0\qquad\text{在 }\Omega,
$$

则称 $u$ 为次调和函数（Subharmonic Function）；如果 $\Delta u\leq0$，则称其为上调和函数（Superharmonic Function）。

这一命名看起来与不等号方向相反，但 Sub 与 Super 描述的并不是拉普拉斯算子的正负，而是函数相对于具有相同边界值的调和函数的位置。

设 $h$ 在球 $B$ 内调和，且 $h=u$ 在 $\partial B$ 上成立。如果 $\Delta u\geq0$，那么 $w=u-h$ 满足 $\Delta w\geq0$，边界上 $w=0$。由最大值原理可得 $u\leq h$。因此，次调和函数位于对应的调和函数下方，上调和函数则位于上方。

这一关系也体现在平均值性质中：

$$
\begin{aligned}
\Delta u=0
&\quad\Longrightarrow\quad
u(x)=\fint_{\partial B_r(x)}u\,dS,\\
\Delta u\geq0
&\quad\Longrightarrow\quad
u(x)\leq\fint_{\partial B_r(x)}u\,dS,\\
\Delta u\leq0
&\quad\Longrightarrow\quad
u(x)\geq\fint_{\partial B_r(x)}u\,dS.
\end{aligned}
$$

这里 $\fint$ 表示归一化平均积分，且所取闭球包含于 $\Omega$。调和函数满足平均值等式，次调和函数与上调和函数则分别满足次平均值与上平均值不等式。

### 定理 4.3.2：弱最大值原理

设 $\Omega\subset\mathbb R^n$ 是有界区域，$u\in C^2(\Omega)\cap C(\overline\Omega)$，且 $\Delta u\geq0$。那么

$$
\boxed{\max_{\overline\Omega}u=\max_{\partial\Omega}u.}
$$

这称为弱最大值原理（Weak Maximum Principle）。

直观上，次调和函数满足中心值不超过周围平均值的约束，因此不能在内部形成严格高于周围所有点的峰值。相比调和函数，这里只要求 $\Delta u\geq0$，说明最大值原理并不依赖平均值的精确相等。

在一维中，这一事实尤其容易理解：$u''\geq0$ 意味着函数凸，而凸函数在区间内部的值不超过两端函数值的加权平均，因此最大值可以在端点取得。

证明的核心是处理非严格不等式。当 $\Delta u>0$ 时，内部最大值点的 Hessian 半负定，必有 $\Delta u\leq0$，直接产生矛盾。对于一般的 $\Delta u\geq0$，取足够大的球 $B_R\supset\Omega$，构造

$$
u_\varepsilon(x)=u(x)-\varepsilon(R^2-|x|^2).
$$

由于 $\Delta|x|^2=2n$，

$$
\Delta u_\varepsilon=\Delta u+2n\varepsilon>0.
$$

于是可以先对 $u_\varepsilon$ 使用严格情形，再令 $\varepsilon\to0$，恢复原结论。

需要区分弱原理与上一节已经证明过的强最大值原理：**弱最大值原理只保证最大值能够在边界取得，并不排除内部也取得相同最大值；强最大值原理进一步排除非常数函数的内部最大值。** 这里的“弱”描述结论的强弱，而不是因为研究对象从调和函数换成了次调和函数。

### 含零阶项的椭圆型方程

接下来考虑比拉普拉斯方程稍微一般的方程：

$$
\Delta u+cu=f.
$$

其中 $cu$ 称为零阶项（Zeroth-Order Term），因为它不包含 $u$ 的导数。对于这一方程，若

$$
\Delta u+cu\geq f,
$$

则称 $u$ 为次解（Subsolution）；若不等号反向，则称为上解（Supersolution）。

这里的困难在于，即使 $\Delta u+cu\geq0$，我们也不能直接推出 $\Delta u\geq0$。所以需要对系数 $c$ 增加条件。

**定理 4.3.3** 设 $\Omega$ 有界，$c\in C(\Omega)$ 且 $c\leq0$。若 $u\in C^2(\Omega)\cap C(\overline\Omega)$ 满足

$$
\Delta u+cu\geq0\qquad\text{在 }\Omega,
$$

则

$$
\boxed{\max_{\overline\Omega}u\leq\max_{\partial\Omega}u^+,}
\qquad u^+=\max\{u,0\}.
$$

这里为何只控制非负最大值？因为在 $u>0$ 的区域内，$c\leq0$ 保证 $-cu\geq0$，于是

$$
\Delta u\geq-cu\geq0.
$$

所以 $u$ 至少在自身的正值区域内是次调和函数，可以应用前面的最大值原理。若 $u<0$，就没有同样的符号保证。这正是定理中出现 $u^+$ 而不是直接出现 $u$ 的原因。

作者还指出，这些结果并不限于拉普拉斯算子。对于一般的二阶线性椭圆型算子

$$
Lu=\sum_{i,j=1}^n a_{ij}(x)u_{x_ix_j}
+\sum_{i=1}^n b_i(x)u_{x_i}
+c(x)u,
$$

通常要求二阶项的系数矩阵 $A(x)=(a_{ij}(x))$ 满足一致椭圆性（Uniform Ellipticity）：

$$
\boxed{
\xi^TA(x)\xi\geq\lambda|\xi|^2,
\qquad \forall x\in\Omega,\ \xi\in\mathbb R^n,
}
$$

其中 $\lambda>0$ 与 $x$ 无关。它要求矩阵在所有位置都保持统一程度的正定性，而不仅仅是逐点正定。本书统一采用正定的主部符号；负定的椭圆型算子可以通过将方程乘以 $-1$ 转换。

为什么正定性能够帮助控制最大值？在内部局部最大值点 $x_0$，有 $\nabla u(x_0)=0$，且 Hessian $H=\nabla^2u(x_0)$ 半负定。于是所有一阶项消失，而正定矩阵 $A$ 与半负定矩阵 $H$ 满足

$$
\sum_{i,j}a_{ij}u_{x_ix_j}
=\operatorname{tr}(AH)\leq0.
$$

这不是因为各个 $a_{ij}$ 都为正，而是因为将 $A$ 正交对角化后，上式成为正特征值与 $H$ 沿相应方向的非正二次型之和。若最大值又非负且 $c\leq0$，零阶项 $cu$ 也非正。因此，在内部非负最大值点必有 $Lu\leq0$，这正是一般椭圆型最大值原理的局部结构。

### 比较原理与唯一性

最大值原理的重要性不仅在于研究单个函数的极值，更在于比较两个函数。

**推论 4.3.4** 若 $c\leq0$ 且

$$
\begin{cases}
\Delta u+cu\geq0,&x\in\Omega,\\
u\leq0,&x\in\partial\Omega,
\end{cases}
$$

则 $u\leq0$ 在整个 $\Omega$ 中成立。这是定理 4.3.3 的直接结果。

**推论 4.3.5：比较原理（Comparison Principle）** 设 $c\leq0$。如果

$$
\begin{cases}
\Delta u+cu\geq\Delta v+cv,&x\in\Omega,\\
u\leq v,&x\in\partial\Omega,
\end{cases}
$$

那么

$$
\boxed{u\leq v\qquad\text{在 }\Omega.}
$$

证明只需令 $w=u-v$，把两个函数的比较转化为单个函数的符号问题：

$$
\Delta w+cw\geq0,\qquad w|_{\partial\Omega}\leq0.
$$

于是由推论 4.3.4 得到 $w\leq0$。

**推论 4.3.6** 对于有界区域上的 Dirichlet 问题

$$
\begin{cases}
\Delta u+cu=f,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega,
\end{cases}
\qquad c\leq0,
$$

在 $C^2(\Omega)\cap C(\overline\Omega)$ 中至多存在一个解。若 $u_1,u_2$ 都是解，其差 $w=u_1-u_2$ 满足齐次方程和零边界条件；分别对 $w$ 与 $-w$ 应用最大值原理，得到 $w=0$。

这里的结论仍然只是唯一性，并不意味着解必然存在。

作者随后通过反例说明两个条件的重要性。首先，若区域无界，零边界条件可能不足以确定解。例如在上半空间 $\{x_n>0\}$ 上，$u(x)=x_n$ 满足 $\Delta u=0$ 和零边界条件，但不是零函数。在 $n\geq3$ 时，单位球外部的函数 $u(x)=|x|^{2-n}-1$ 也给出有界的非零调和解。

其次，即使区域有界，若取消 $c\leq0$，唯一性也可能失败。取 $\Omega=(0,\pi)^n$ 和

$$
u(x)=\prod_{i=1}^n\sin x_i,
$$

则

$$
\Delta u+nu=0,\qquad u|_{\partial\Omega}=0.
$$

这个非零函数与零函数同时满足齐次问题。事实上，$n$ 是 $-\Delta$ 的一个 Dirichlet 特征值，$u$ 是相应的特征函数。这说明正的零阶系数可能使齐次方程出现非零解，从而破坏唯一性。

## 4.3.2 强最大值原理

### Hopf 引理

前面的弱最大值原理允许最大值同时出现在边界和内部。为了排除这种情况，作者首先需要一种比函数值比较更强的性质：当函数在某个边界点取得严格最大值时，它的法向导数究竟有什么限制？

**引理 4.3.7：Hopf 引理（Hopf's Lemma）** 设 $B$ 是一个开球，$x_0\in\partial B$，$c\leq0$。若

$$
u\in C^2(B)\cap C^1(\overline B),\qquad
\Delta u+cu\geq0,
$$

且

$$
u(x)<u(x_0)\quad(x\in B),\qquad u(x_0)\geq0,
$$

那么

$$
\boxed{\frac{\partial u}{\partial\nu}(x_0)>0,}
$$

其中 $\nu$ 是球面在 $x_0$ 处的外单位法向量。

普通可微函数即使在边界取得严格最大值，法向导数仍然可能等于零。例如一维函数 $u(x)=1-(1-x)^2$ 在 $x=1$ 取得严格最大值，但 $u'(1)=0$。它之所以不违反 Hopf 引理，是因为 $u''=-2<0$，并不满足次调和条件。

在一维，如果 $u''\geq0$，则 $u$ 是凸函数。其导数单调不减，因此从内部较低的函数值上升到右端点的严格最大值时，端点导数不可能为零。多维情形不能直接照搬这一论证，因为 $\Delta u\geq0$ 并不意味着每个方向上的二阶导数都非负，但椭圆型微分不等式仍然能够排除这种过度平坦的边界接触。

证明使用辅助函数

$$
w(x)=e^{-\alpha|x|^2}-e^{-\alpha R^2},
$$

并在环形区域 $B_R\setminus\overline{B_{R/2}}$ 中研究 $v=u-u(x_0)+\varepsilon w$。选取足够大的 $\alpha$ 和足够小的 $\varepsilon$，利用弱最大值原理得到

$$
u(x_0)-u(x)\geq\varepsilon w(x).
$$

由于 $w$ 在外球面上等于零，而向球内部移动距离 $t$ 时，$w$ 以正的线性量级增长，因此

$$
\frac{\partial u}{\partial\nu}(x_0)
\geq2\varepsilon\alpha R e^{-\alpha R^2}>0.
$$

这就是 Hopf 引理的核心：**椭圆型微分不等式不仅控制边界最大值的位置，还迫使函数从内部趋向严格最大值时，至少具有一阶的变化幅度。**

**注释 4.3.8** 将结果推广到满足内球条件（Interior Sphere Condition）的区域。所谓内球条件，是指在指定边界点 $x_0$，存在一个完全位于 $\Omega$ 内部、且在 $x_0$ 处与边界相切的开球。由于可以直接在这个内切球上使用 Hopf 引理，所以不必要求整个区域本身是球。$C^2$ 光滑区域满足这一条件。

### 定理 4.3.9：强最大值原理

设 $\Omega$ 是有界连通区域，$c\leq0$，且 $u\in C^2(\Omega)\cap C(\overline\Omega)$ 满足

$$
\Delta u+cu\geq0.
$$

那么，除非 $u$ 是常数，否则它在 $\overline\Omega$ 上的非负最大值只能在 $\partial\Omega$ 取得。

与定理 4.2.8 相比，这个结果已经不再要求 $u$ 调和，而是适用于更一般的次解。由于存在零阶项 $cu$，这里仍需保留最大值非负的条件。当 $c=0$ 时，这个限制可以去掉。

证明的核心是反证法。设 $M=\max_{\overline\Omega}u\geq0$，并定义内部最大值点集合

$$
D=\{x\in\Omega:u(x)=M\}.
$$

假设 $D$ 非空，但又不等于整个 $\Omega$。利用连通性，可以在 $\Omega\setminus D$ 中找到一个开球，使其边界在某个内部点 $x_0\in D$ 处与最大值点集合相切。在这个球内部处处有 $u(x)<u(x_0)$，因此 Hopf 引理给出 $\partial_\nu u(x_0)>0$。

但 $x_0$ 又是 $\Omega$ 的内部最大值点，所以 $\nabla u(x_0)=0$，特别是 $\partial_\nu u(x_0)=0$，产生矛盾。于是 $D$ 只能为空或等于整个区域。

这个证明的决定性结构就是

$$
\underbrace{\partial_\nu u(x_0)>0}_{\text{Hopf 引理}}
\qquad\text{与}\qquad
\underbrace{\partial_\nu u(x_0)=0}_{\text{内部极值条件}}.
$$

弱最大值原理只能提供非严格的大小关系；Hopf 引理提供的严格导数不等式，才使强最大值原理成为可能。

**推论 4.3.10** 若 $c\leq0$，且

$$
\Delta u+cu\geq0\text{ 在 }\Omega,\qquad
u\leq0\text{ 在 }\partial\Omega,
$$

则要么 $u<0$ 在整个内部成立，要么 $u$ 是一个非正常数。此前的弱原理只能推出 $u\leq0$；强原理则进一步排除了非常数函数在内部接触零值的可能性。

### Neumann 问题的唯一性

Dirichlet 边界条件规定函数在边界上的取值，而 Neumann 边界条件（Neumann Boundary Condition）规定外法向导数。对于后者，弱最大值原理并不能直接解决唯一性，因为两个解的差在边界上未必等于零。

**推论 4.3.11** 考虑

$$
\begin{cases}
\Delta u+cu=f,&x\in\Omega,\\
\partial_\nu u=\varphi,&x\in\partial\Omega,
\end{cases}
$$

其中 $\Omega$ 有界，具有 $C^1$ 边界并处处满足内球条件，$c\leq0$，且 $u\in C^2(\Omega)\cap C^1(\overline\Omega)$。若 $c\not\equiv0$，则解至多一个；若 $c\equiv0$，则解在相差一个加法常数的意义下唯一。

证明仍然考察两个解的差 $w=u_1-u_2$。它满足

$$
\Delta w+cw=0,\qquad \partial_\nu w=0.
$$

若 $w$ 非常数且具有正最大值，强最大值原理迫使最大值出现在边界，而 Hopf 引理要求该点的外法向导数严格为正。这与 $\partial_\nu w=0$ 矛盾。对 $-w$ 作同样分析，最终得到 $w$ 必须是常数。若 $c\not\equiv0$，代入方程又迫使这个常数为零。

当 $c\equiv0$ 时，加法常数无法被方程或 Neumann 条件识别，因为 $\Delta(u+C)=\Delta u$，且 $\partial_\nu(u+C)=\partial_\nu u$。这是 Neumann 问题自身的结构，而非证明方法的缺陷。

## 4.3.3 先验估计

### 定理 4.3.12

前面通过最大值原理证明了唯一性，但即使不求出具体解，我们还希望知道解究竟能够有多大。这就需要先验估计（A Priori Estimate）：根据已知的方程系数、源项和边界数据，在解的表达式未知时建立统一界限。

考虑 Dirichlet 问题

$$
\begin{cases}
\Delta u+cu=f,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega,
\end{cases}
\qquad c\leq0.
$$

**定理 4.3.12** 设 $\Omega$ 有界，$c,f$ 在 $\Omega$ 内连续，$\varphi\in C(\partial\Omega)$，且 $u\in C^2(\Omega)\cap C(\overline\Omega)$ 是解。那么存在只依赖于维数 $n$ 和区域直径 $\operatorname{diam}(\Omega)$ 的常数 $C>0$，使得

$$
\boxed{
\sup_\Omega|u|
\leq\sup_{\partial\Omega}|\varphi|
+C\sup_\Omega|f|.
}
$$

这个估计将未知解的幅度分为两种来源：边界给定的函数值，以及区域内部的源项。如果 $f=0$，就退化为最大值原理所提供的边界控制。

证明的核心是构造一个可以直接比较的辅助函数。记

$$
F=\sup_\Omega|f|,
\qquad
\Phi=\sup_{\partial\Omega}|\varphi|.
$$

取包含 $\Omega$ 的球 $B_R$，定义

$$
v(x)=\Phi+\frac{F}{2n}(R^2-|x|^2).
$$

由于 $\Delta|x|^2=2n$，并且 $v\geq0$、$c\leq0$，有

$$
\Delta v+cv=-F+cv\leq-F.
$$

另一方面，

$$
(\Delta+c)(\pm u)=\pm f\geq-F.
$$

边界上又有 $\pm u\leq\Phi\leq v$。因此，利用比较原理得到 $\pm u\leq v$，即

$$
|u(x)|\leq\Phi+\frac{F}{2n}(R^2-|x|^2).
$$

特别地，当 $\Omega=B_R(x_0)$ 时，可以直接得到

$$
\boxed{
\sup_{B_R(x_0)}|u|
\leq\sup_{\partial B_R(x_0)}|\varphi|
+\frac{R^2}{2n}\sup_{B_R(x_0)}|f|.
}
$$

这里真正需要保留的是辅助函数的构造原则：使辅助函数在边界上足够大，同时让它的微分算子与原方程满足适当的比较关系。最大值原理便能够把这种已知函数的控制转移给未知解。

## 4.3.4 梯度估计

### 定理 4.3.13：内部梯度估计

控制函数本身的大小，并不自动意味着可以控制导数。例如 $u_k(x)=\sin(kx)$ 始终满足 $|u_k|\leq1$，但梯度最大值随 $k$ 增长。不过，调和函数受到 $\Delta u=0$ 的约束，其内部变化率不能任意增大。

**定理 4.3.13** 若 $u\in C(\overline{B_1})$ 且在 $B_1$ 内调和，那么

$$
\boxed{
\sup_{B_{1/2}}|\nabla u|
\leq C_n\sup_{\partial B_1}|u|,
}
$$

其中 $C_n$ 只依赖于维数。

这与 4.1 节的内部梯度估计在结论上相通，但证明方法发生了变化。此前主要通过格林公式和积分核控制梯度；这里则采用 Bernstein 方法（Bernstein Method），即研究由未知解的导数构造的新函数，再对它应用最大值原理。

最重要的恒等式是

$$
\boxed{
\Delta(|\nabla u|^2)
=2\sum_{i,j=1}^n u_{x_ix_j}^2
+2\nabla u\cdot\nabla(\Delta u)
=2\sum_{i,j=1}^n u_{x_ix_j}^2\geq0.
}
$$

因此，调和函数的梯度平方 $|\nabla u|^2$ 本身是次调和函数。

但直接使用最大值原理，只能用边界梯度控制内部梯度，尚不能得到定理要求的函数值控制。作者于是引入截断函数（Cutoff Function），使构造出的辅助函数在内部保留梯度信息、在边界附近消除梯度项，再利用最大值原理获得内部估计。

这一方法值得注意的不是重复获得了一个梯度不等式，而是**将最大值原理应用于由导数构造的辅助函数，从而把函数值的控制进一步转化为导数的控制**。

### 定理 4.3.14：微分 Harnack 不等式

前面研究的是梯度的绝对大小。但对于正调和函数，我们还可以研究相对于函数自身取值的变化率，即 $|\nabla u|/u$。

因为 $u>0$ 时

$$
\nabla\log u=\frac{\nabla u}{u},
$$

所以这一问题可以转化为估计对数梯度。

**定理 4.3.14** 设 $u>0$ 且在 $B_1$ 内调和，那么

$$
\boxed{
\sup_{B_{1/2}}|\nabla\log u|\leq C_n.
}
$$

右边不再依赖于 $\sup|u|$。即使将 $u$ 整体乘以一个很大的正常数，对数梯度也不会改变。因此，这个结果描述的是正调和函数在内部的相对变化率约束。

证明令 $v=\log u$。由于 $\Delta u=0$，有

$$
\Delta v
=\frac{\Delta u}{u}-\frac{|\nabla u|^2}{u^2}
=-|\nabla v|^2.
$$

再令 $w=|\nabla v|^2$，计算得到

$$
\Delta w+2\nabla v\cdot\nabla w
=2\sum_{i,j}v_{x_ix_j}^2.
$$

利用 Hessian 的 Cauchy–Schwarz 不等式，

$$
\sum_{i,j}v_{x_ix_j}^2
\geq\frac1n(\Delta v)^2
=\frac{w^2}{n},
$$

于是

$$
\boxed{
\Delta w+2\nabla v\cdot\nabla w
\geq\frac2n w^2.
}
$$

这个微分不等式中的正二次项 $w^2$ 是控制梯度的关键。结合截断函数及最大值点的微分条件，就能推出 $w$ 在内部小球上有统一上界。

**推论 4.3.15：Harnack 不等式（Harnack Inequality）** 若 $u$ 是 $B_1$ 内的非负调和函数，则对任意 $x_1,x_2\in B_{1/2}$，

$$
\boxed{u(x_1)\leq C_nu(x_2).}
$$

对于严格正的 $u$，这是对 $\nabla\log u$ 沿连接两点的线段积分，再取指数得到的。非负情形则可通过 $u+\varepsilon$ 的逼近处理。

实际上，这些定理与 4.2 节具有明确的对应关系。定理 4.2.5 已经证明

$$
|\nabla u(x_0)|\leq\frac nR u(x_0)
$$

对于非负调和函数成立。因此，只需在单位球内部任一点 $x\in B_{1/2}$ 取半径为 $1/2$ 的球，便能直接得到 $|\nabla\log u(x)|\leq2n$。所以 4.3.14 并非一个此前未知的性质；作者是在用 Bernstein 方法和最大值原理重新建立这一估计。

同理，4.3.15 与 4.2.7 都是 Harnack 不等式。区别主要在证明机制：此前借助平均值性质和直接梯度估计，这里则从关于梯度平方的微分不等式出发。这种方法上的转变，也为更一般的椭圆型方程提供了思路。

## 4.3.5 可去奇点

### 定理 4.3.16

前面研究拉普拉斯算子的基本解时，我们已经知道，它在原点之外调和，却在原点具有奇异性。忽略常数系数，其增长量级为

$$
\Gamma(x)\asymp
\begin{cases}
\log|x|,&n=2,\\
|x|^{2-n},&n\geq3.
\end{cases}
$$

这里的 $\asymp$ 表示绝对值的增长量级可比。

但一个函数在某点没有定义，并不意味着那个点是真正的奇点。例如 $u(x)=x_1^2-x_2^2$ 即使被人为限制在去心球上，仍然可以通过定义 $u(0)=0$ 恢复整个球内的调和性。

那么，如果一个函数只在孤立点之外调和，什么条件能够保证这个缺失点可以补上？

**定理 4.3.16：可去奇点定理（Removable Singularity Theorem）** 假设 $u$ 在 $B_R\setminus\{0\}$ 内调和，并且当 $|x|\to0$ 时满足

$$
\boxed{
u(x)=
\begin{cases}
o(\log|x|),&n=2,\\
o(|x|^{2-n}),&n\geq3.
\end{cases}
}
$$

那么可以适当定义 $u(0)$，使得 $u$ 在整个 $B_R$ 内调和。

其中小 $o$ 记号（Little-o Notation）表示函数相对于给定增长尺度可以忽略。例如 $u=o(|x|^{2-n})$ 意味着

$$
\frac{u(x)}{|x|^{2-n}}\longrightarrow0.
$$

这条定理没有预先要求 $u$ 在原点附近有界，而是允许我们只通过增长速度来判断奇点是否可去。

为什么基本解恰好提供了判断标准？因为基本解描述了拉普拉斯方程在集中点源附近的典型奇异行为。在分布意义下，它满足 $\Delta\Gamma=\delta_0$，因此原点的奇异性代表了一个无法靠重新赋值消除的点源。定理说明，如果一个去心区域上的调和函数增长严格弱于这种基本解尺度，那么该奇异性实际上不能真正存在。

证明的核心仍然是最大值原理。首先用原函数在外球面上的取值构造一个完整球上的调和函数 $v$：

$$
\Delta v=0\text{ 在 }B_R,\qquad v=u\text{ 在 }\partial B_R.
$$

然后令 $w=u-v$。它在去心球内调和，在外球面上为零。对于 $n\geq3$，利用函数 $|x|^{2-n}$ 在环形区域上建立比较界限：

$$
|w(x)|\leq
\frac{r^{n-2}}{|x|^{n-2}}
\max_{\partial B_r}|w|.
$$

固定 $x\ne0$，令 $r\to0$。由于 $u$ 的增长严格小于基本解，而 $v$ 有界，右边趋于零，因此 $w(x)=0$。二维则使用对数型调和函数构造相应比较界限。

由此 $u=v$ 在去心球内成立，而 $v$ 已经在原点处调和，只需定义 $u(0)=v(0)$ 即可。

这个定理的意义不仅是补上一个缺失点，更是利用微分方程与增长条件，判断一个看似奇异的函数是否实际上具有更强的正则性。它后来也被用于 4.4 节的反例分析。

## 4.3.6 Perron 方法

### 次调和函数的比较定义

此前通过最大值原理，我们已经证明了 Dirichlet 问题的唯一性，也利用 Poisson 积分公式解决了球形区域上的存在性。但对于一般形状的区域，我们未必能够显式构造 Green 函数或 Poisson 核。因此，仍然需要一种不依赖特殊区域坐标的存在性方法。

Perron 方法（Perron's Method）的基本思想是：**不直接寻找未知的调和解，而是先收集所有满足边界约束的次调和函数，再取这些函数的逐点上确界。**

不过，这要求我们先解决一个问题。原来的次调和函数定义 $\Delta v\geq0$ 需要 $v\in C^2$，但取两个函数的最大值可能产生不可微点，因此这个定义不适合直接用于上确界构造。

**引理 4.3.17** 设 $v\in C^2(\Omega)$，那么以下两个条件等价：

1. $\Delta v\geq0$ 在 $\Omega$ 中成立。
2. 对任意闭包含于 $\Omega$ 的球 $B$ 和任意在 $B$ 内调和、在 $\overline B$ 上连续的函数 $w$，只要 $v\leq w$ 在 $\partial B$ 上成立，就必有 $v\leq w$ 在 $B$ 内成立。

第一个条件推出第二个条件，是弱最大值原理的直接应用。反过来，如果某处 $\Delta v<0$，就可以在附近的小球上构造具有相同边界数据的调和函数，并利用最大值原理得到与比较性质相反的结果。

**定义 4.3.18** 由此可以将次调和性推广到连续函数。若 $v\in C(\Omega)$，并且对于任意这样的球 $B$ 和调和函数 $w$，都有

$$
\boxed{
v\leq w\text{ 在 }\partial B
\quad\Longrightarrow\quad
v\leq w\text{ 在 }B,
}
$$

则称 $v$ 为次调和函数；上调和函数则满足反向比较关系。

这是一种不依赖二阶导数的定义。对于 $C^2$ 函数，它与 $\Delta v\geq0$ 完全等价；对于一般连续函数，它又允许我们进行取最大值等操作。

### 引理 4.3.19：广义比较原理

设 $\Omega$ 有界，$u,v\in C(\overline\Omega)$，其中 $u$ 次调和，$v$ 上调和。如果 $u\leq v$ 在 $\partial\Omega$ 上成立，那么

$$
\boxed{u\leq v\qquad\text{在 }\Omega.}
$$

这个结果将此前依赖经典二阶导数的比较原理，推广到只满足调和比较性质的连续函数。

它对于 Perron 方法的作用非常直接：如果边界函数为 $\varphi$，取 $M=\max_{\partial\Omega}\varphi$，那么所有边界上不超过 $\varphi$ 的次调和函数，也都不超过常数函数 $M$。因此，候选函数的上确界不会无界增长。

### Perron 上确界

考虑一般有界区域上的 Dirichlet 问题

$$
\begin{cases}
\Delta u=0,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega,
\end{cases}
\qquad\varphi\in C(\partial\Omega).
\tag{4.3.2}
$$

定义候选函数集合

$$
S_\varphi=
\{v\in C(\overline\Omega):
v\text{ 在 }\Omega\text{ 内次调和，且 }v\leq\varphi\text{ 在 }\partial\Omega\}.
$$

然后逐点取上确界：

$$
\boxed{
u_\varphi(x)=\sup_{v\in S_\varphi}v(x).
}
\tag{4.3.3}
$$

这里并不是从所有候选函数中选出某个整体最大的函数，而是在每一个位置 $x$，分别取所有候选函数值的上确界。

这一定义首先是有意义的。令 $m=\min_{\partial\Omega}\varphi$、$M=\max_{\partial\Omega}\varphi$，则常数函数 $m$ 属于 $S_\varphi$，而比较原理保证所有候选函数都不超过 $M$，因此

$$
m\leq u_\varphi(x)\leq M.
$$

接下来要解决两个相互独立的问题：$u_\varphi$ 在内部是否调和，以及它是否能够连续地取得给定边界值。

### 引理 4.3.20：调和提升

设 $v$ 是次调和函数，$B\Subset\Omega$ 是一个球。保留 $v$ 在球外的取值，而在球内用具有相同球面边界值的调和函数替换它，得到新函数 $w$。

引理 4.3.20 证明：

$$
\boxed{w\geq v,\qquad w\text{ 仍然次调和}.}
$$

这一操作称为调和提升（Harmonic Lifting）。

为什么它适合 Perron 方法？因为由次调和函数的比较性质，调和替换不可能使函数降低。如果某个候选函数在局部尚未调和，就可以使用调和提升，在保持边界限制的同时改进它。

**引理 4.3.21** 进一步证明：由公式 (4.3.3) 定义的 Perron 上确界 $u_\varphi$ 在整个 $\Omega$ 内调和。

证明首先利用有限个候选函数的逐点最大值仍属于 $S_\varphi$，把不同候选函数的局部优势合并起来；然后在小球内作调和提升，并利用调和函数序列的局部收敛性质，证明上确界必须与其调和替换一致。

因此

$$
\boxed{\Delta u_\varphi=0\qquad\text{在 }\Omega.}
$$

不过，这里只解决了内部方程。$u_\varphi$ 最初只定义在 $\Omega$ 内部，并不自动保证它在边界上连续，更不能直接断言其边界极限等于 $\varphi$。

### 障碍函数与边界收敛

为了确保 Perron 解能够取得指定边界值，需要控制它在每个边界点附近的行为。

**引理 4.3.22** 设 $x_0\in\partial\Omega$。如果存在一个在 $\overline\Omega$ 上连续、在 $\Omega$ 内次调和的函数 $w_{x_0}$，满足

$$
\boxed{
w_{x_0}(x_0)=0,\qquad
w_{x_0}(x)<0\quad(x\in\partial\Omega\setminus\{x_0\}),
}
\tag{4.3.4}
$$

那么

$$
\boxed{
\lim_{\substack{x\to x_0\\x\in\Omega}}
u_\varphi(x)=\varphi(x_0).
}
$$

满足上述条件的函数称为障碍函数（Barrier Function）。

它的作用是构造能够在 $x_0$ 处收缩到同一个边界值的上下界。对任意 $\varepsilon>0$，取足够大的 $K$，就可以使用

$$
\varphi(x_0)-\varepsilon+Kw_{x_0}(x)
\quad\text{与}\quad
\varphi(x_0)+\varepsilon-Kw_{x_0}(x)
$$

分别从下方和上方控制 $u_\varphi$，得到

$$
\varphi(x_0)-\varepsilon+Kw_{x_0}(x)
\leq u_\varphi(x)
\leq\varphi(x_0)+\varepsilon-Kw_{x_0}(x).
$$

由于 $w_{x_0}(x)\to0$ 当 $x\to x_0$，再令 $\varepsilon\to0$，便得到正确的边界极限。

这解释了为什么单纯证明 Perron 上确界在内部调和还不够：**内部存在性与边界行为是两个不同的问题。前者由局部调和提升解决，后者则依赖区域的局部边界几何。**

### 外球条件与存在性

为了构造障碍函数，作者引入外球条件（Exterior Sphere Condition）：对于边界点 $x_0$，存在一个位于区域外部的球 $B_r(y_0)$，其闭包与 $\overline\Omega$ 恰好在 $x_0$ 相交。

由于外球球心 $y_0$ 位于区域外，可以利用基本解在 $\Omega$ 内构造调和函数，并通过调节常数使它在 $x_0$ 等于零、在其他边界点严格为负，从而得到障碍函数。

按 4.1 节中采用的 $\Delta\Gamma=\delta_0$ 的符号约定，$\Gamma$ 随半径递增，因此可取

$$
w_{x_0}(x)=\Gamma(x_0-y_0)-\Gamma(x-y_0).
$$

这样，当 $x\neq x_0$ 且 $x\in\overline\Omega$ 时，由 $|x-y_0|>|x_0-y_0|$ 可知 $w_{x_0}(x)<0$。若使用 $-\Delta$ 的基本解约定，则两项次序相反。

$C^2$ 光滑区域满足外球条件，因此对于通常的光滑区域，可以在每个边界点构造这种障碍函数。

**定理 4.3.23** 设 $\Omega\subset\mathbb R^n$ 是有界区域，且每个边界点都满足外球条件。那么，对于任意连续边界函数 $\varphi\in C(\partial\Omega)$，Dirichlet 问题

$$
\begin{cases}
\Delta u=0,&x\in\Omega,\\
u=\varphi,&x\in\partial\Omega
\end{cases}
$$

存在一个解

$$
\boxed{u\in C^\infty(\Omega)\cap C(\overline\Omega).}
$$

再结合此前已经证明的最大值原理与唯一性，便得到相应 Dirichlet 问题的存在唯一性。

Perron 方法的关键在于把原问题分为两部分：**内部调和性由候选次调和函数的上确界与调和提升保证；边界值由障碍函数与外球条件保证。** 内部的解构造与边界的几何约束由此被清楚地区分开来。

## 结论与对照

4.3 节最重要的变化，是不再只依赖调和函数特有的显式积分公式，而是把最大值原理作为一种能够反复使用的比较工具。从次调和函数的定义出发，作者首先推广最大值原理，再用严格的法向导数性质证明强最大值原理，并进一步研究唯一性、先验估计与梯度估计。

最后两小节则将最大值原理应用到更深的结构问题：可去奇点定理利用基本解的增长尺度判断孤立奇点的真实性；Perron 方法通过次调和函数的上确界构造调和解，再用障碍函数处理边界收敛。至此，最大值原理不仅用于限制已知解，也成为证明解存在的工具。

| 位置 | 对象或结论 | 核心表达式 | 意义与限制 |
|---|---|---|---|
| 定义 4.3.1 | 次调和函数 | $\Delta u\geq0$ | 中心值不超过球面平均值 |
| 定理 4.3.2 | 弱最大值原理 | $\max_{\overline\Omega}u=\max_{\partial\Omega}u$ | 适用于有界区域上的 $C^2$ 次调和函数 |
| 定理 4.3.3 | 含零阶项的最大值原理 | $\Delta u+cu\geq0\Rightarrow\max_{\overline\Omega}u\leq\max_{\partial\Omega}u^+$ | 要求 $c\leq0$；控制非负最大值 |
| 推论 4.3.5 | 比较原理 | $Lu\geq Lv,\ u\leq v$ 在边界 $\Rightarrow u\leq v$ 在内部 | 将两个函数的比较转化为差函数的符号问题 |
| 推论 4.3.6 | Dirichlet 唯一性 | $Lw=0,\ w|_{\partial\Omega}=0\Rightarrow w=0$ | 至多一个解，不保证存在 |
| 引理 4.3.7 | Hopf 引理 | $\partial_\nu u(x_0)>0$ | 边界严格非负最大值点的外法向导数具有严格符号 |
| 定理 4.3.9 | 强最大值原理 | 非常数次解不能在内部取得非负全局最大值 | 使用 Hopf 引理及连通性 |
| 推论 4.3.11 | Neumann 唯一性 | $c\not\equiv0$ 时唯一；$c\equiv0$ 时至多差常数 | 利用 Hopf 引理排除非恒定的解之差 |
| 定理 4.3.12 | 先验估计 | $\sup|u|\leq\sup|\varphi|+C\sup|f|$ | 用边界值与源项控制解的幅度 |
| 定理 4.3.13 | 内部梯度估计 | $\sup_{B_{1/2}}|\nabla u|\leq C_n\sup_{\partial B_1}|u|$ | 利用梯度平方的次调和性 |
| 定理 4.3.14 | 微分 Harnack 不等式 | $\sup_{B_{1/2}}|\nabla\log u|\leq C_n$ | 正调和函数的相对变化率受控 |
| 推论 4.3.15 | Harnack 不等式 | $u(x_1)\leq C_nu(x_2)$ | 比较非负调和函数的内部取值 |
| 定理 4.3.16 | 可去奇点 | $u=o(\Gamma)$ 的增长量级 | 严格弱于基本解奇异尺度时可调和延拓 |
| 定义 4.3.18 | 调和比较定义 | $v\leq h$ 在球面 $\Rightarrow v\leq h$ 在球内 | 将次调和性推广到连续函数 |
| 引理 4.3.20 | 调和提升 | $v\leq w$，且 $w$ 仍次调和 | 改进 Perron 候选函数 |
| 引理 4.3.22 | 障碍函数 | $w_{x_0}(x_0)=0,\ w_{x_0}<0$ 在其他边界点 | 控制 Perron 解的边界极限 |
| 定理 4.3.23 | Perron 存在性 | $\Delta u=0,\ u|_{\partial\Omega}=\varphi$ | 外球条件保证连续 Dirichlet 数据能够被实现 |

回顾此前的 4.1 与 4.2 节，可以看到三种方法上的变化：4.1 通过基本解和积分公式表示解，4.2 从平均值性质推出调和函数的结构，4.3 则将最大值原理推广为比较工具，并反过来利用它构造解。

尤其是最后的 Perron 方法，已经使我们不再局限于球形区域的显式积分表达式。但以上讨论的主体仍然是 $\Delta u=0$。如果将右端项换成一般的 $f$，不仅需要构造处理源项的特解，还要进一步研究解的正则性，以及当经典二阶导数不存在时究竟该怎样理解方程。这正是 4.4 节要解决的问题。
