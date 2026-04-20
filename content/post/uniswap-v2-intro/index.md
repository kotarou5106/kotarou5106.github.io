---
title: "深入浅出 Uniswap V2：恒定乘积做市商的数学之美"
description: "解析 x * y = k 原理及其在 DeFi 生态中的核心地位"
date: 2026-04-20
image: cover.jpg
math: true
categories:
    - DeFi
    - Math
tags:
    - Uniswap
    - AMM
---

## 引言

Uniswap V2 是去中心化交易所（DEX）发展史上的里程碑。它延续了 V1 的核心逻辑，并在 ERC-20/ERC-20 交易对、价格预言机等方面做了重大改进。作为数学系学生，我们最着迷的莫过于它背后简洁而强大的数学模型。

## 核心原理：恒定乘积公式

Uniswap V2 的灵魂在于 **Constant Product Market Maker (CPMM)** 公式：

$$x \cdot y = k$$

其中：
* $x$ 是流动性池中代币 A 的数量。
* $y$ 是代币 B 的数量。
* $k$ 是常数（在不发生流动性增减的情况下保持不变）。

### 交易逻辑

当你想要用 $\Delta x$ 数量的代币 A 换取代币 B 时，池子的平衡状态发生改变：

$$(x + \Delta x) \cdot (y - \Delta y) = k$$

解出 $\Delta y$，即为你将获得的代币 B 数量：

$$\Delta y = y - \frac{k}{x + \Delta x} = \frac{y \cdot \Delta x}{x + \Delta x}$$

## 为什么是 V2？

相比于 V1 必须以 ETH 作为中介桥梁，V2 引入了：
1. **任意 ERC-20 交易对**：减少了交易磨损和风险敞口。
2. **价格预言机 (TWAP)**：通过时间加权平均价格，为 DeFi 协议提供了抗操纵的价格源。
3. **闪电兑换 (Flash Swaps)**：允许用户先拿走代币，只要在同一笔交易结束前归还并支付手续费即可。

## 总结

Uniswap V2 彰显了简洁数学原理在现代金融领域中的巨大力量——只需依靠 $x \cdot y = k$ 这条恒定乘积公式，就能高效且去中心化地撮合全球数百亿美元级别的资产交易。这种极致简化的设计，不仅保障了市场的公平和流动性，更为 AMM（自动做市商）模式奠定了坚实的理论基础。深入理解 $x \cdot y = k$，就把握了去中心化交易所运作的本质与创新之处。