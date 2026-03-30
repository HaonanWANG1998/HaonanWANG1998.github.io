---
layout: single
title: '投影梯度法：从直觉到完整理论'
date: 2026-03-30 12:00:00 +0800
categories: 
  - Optimization
tags:
  - Optimization
  - Mathematics
  - Convex Analysis
  - Projected Gradient
excerpt: '系统梳理投影梯度法的动机、对标方法、与黎曼梯度的关系，以及完整的收敛性证明。'
toc: true
toc_sticky: true
---

本文是一个总结一下投影梯度法（Projected Gradient Method）的核心内容。梳理一下其理论依据，适合解决的问题，以及优缺点。

---

# 1. 投影梯度法解决什么问题

投影梯度法用于求解**带约束的优化问题**：

$$\min_{\mathbf{x} \in \mathcal{C}} f(\mathbf{x})$$

其中 $\mathcal{C}$ 是一个**闭凸约束集**。

对于无约束问题，梯度下降直接更新 $\mathbf{x}^{(k+1)} = \mathbf{x}^{(k)} - \alpha_k \nabla f(\mathbf{x}^{(k)})$ 即可。但一旦加上约束，这个更新**不保证可行**——新的点可能跑到约束集外面。投影梯度法的核心思想是：**先沿负梯度方向走一步，再将结果投影回可行集**：

$$\mathbf{x}^{(k+1)} = \mathcal{P}_{\mathcal{C}}\!\left(\mathbf{x}^{(k)} - \alpha_k \nabla f(\mathbf{x}^{(k)})\right)$$

其中 $\mathcal{P}_{\mathcal{C}}(\cdot)$ 是到集合 $\mathcal{C}$ 的欧几里得投影。当 $\mathcal{C} = \mathbb{R}^n$（无约束）时，投影是恒等映射，投影梯度法退化为普通梯度下降。

典型适用场景：
- **盒约束** $a \le x_i \le b$：投影是逐元素截断
- **单纯形约束** $\sum x_i = 1,\; x_i \ge 0$
- **范数球约束** $\|\mathbf{x}\| \le r$：投影是缩放到球面
- **半正定锥约束**：特征值截断

---

# 2. 为什么要有投影梯度法

## 2.1 对标方法一览

| 方法 | 思路 | 缺点 |
|------|------|------|
| **无约束梯度下降** | 忽略约束直接走 | 结果不可行 |
| **罚函数法 (Penalty)** | 把约束违反量加进目标函数：$\min f(\mathbf{x}) + \rho \cdot \text{violation}(\mathbf{x})$ | 需要调 $\rho$。$\rho$ 太小约束不满足，$\rho$ 太大数值病态，罚函数法的通病 |
| **拉格朗日乘子法 / KKT** | 构造拉格朗日函数，解 KKT 条件 | 需要解方程组，复杂约束下不易直接求解，求解一个漂亮的KKT甚至足以作为一篇TWC的solid contribution |
| **内点法 (Interior Point)** | 用障碍函数将约束隐式处理 | 每步需解大型线性方程组，高维时代价高 |
| **Frank-Wolfe（条件梯度法）** | 每步求约束集上的线性最小化 | 收敛慢（$O(1/k)$），不适合高精度 |
| **ADMM** | 将问题分裂，交替优化 | 引入辅助变量和对偶变量，结构更复杂 |

## 2.2 投影梯度法的优势

投影梯度法是**约束优化中最直接、最轻量的一阶方法**：

1. **概念最简单**——"先走梯度，再拉回来"，是无约束梯度下降到约束场景的最自然推广。
2. **每步代价低**——只需要一次梯度计算 + 一次投影，不需要求解线性方程组（对比内点法）或调罚参数（对比罚函数法）。
3. **投影有闭式解时极其高效**——盒约束（截断）、球约束（缩放）、单纯形等常见约束的投影都是 $O(n)$ 或 $O(n\log n)$。

投影梯度基于目标函数的梯度，相比其他优化算法，几乎没有其他额外运算（因为梯度对于迭代优化算法来讲是必须的）。

---

# 3. 投影梯度法的局限性

投影梯度法的迭代由两个动作组成：**梯度下降** + **投影**。它的局限性也对应地从这两方面产生。

## 3.1 梯度方面：一阶方法的收敛瓶颈

投影梯度法本质上是一阶方法——只利用梯度（一阶导数）信息。这决定了它在**高精度需求**下的天然劣势。

### 精度与收敛速度

"精度"指当前解 $\mathbf{x}^{(k)}$ 与最优解 $\mathbf{x}^*$ 之间的目标函数值差距 $f(\mathbf{x}^{(k)}) - f(\mathbf{x}^*)$。"收敛速度"决定了**达到某个精度需要多少步迭代**。不同方法的对比如下：

| 方法 | 收敛阶 | 达到精度 $\epsilon$ 所需迭代数 | 例子 |
|------|--------|-------------------------------|------|
| 投影梯度法 | $O(1/k)$（次线性） | $O(1/\epsilon)$ | $\epsilon=10^{-6}$ 需 $\sim 10^6$ 步 |
| 加速梯度法 (Nesterov) | $O(1/k^2)$ | $O(1/\sqrt{\epsilon})$ | $\epsilon=10^{-6}$ 需 $\sim 10^3$ 步 |
| 内点法 | 超线性/二次 | $O(\log\log(1/\epsilon))$ | $\epsilon=10^{-6}$ 需 $\sim 10\text{-}50$ 步 |

当精度要求从 $10^{-3}$ 提高到 $10^{-6}$（提高 1000 倍）时：
- 一阶方法（投影梯度）：迭代次数增加 **1000 倍**
- 二阶方法（内点法）：迭代次数可能只增加 **几步**

### 直觉

- **一阶方法**只知道"哪个方向是下坡"（梯度），每步走固定大小。接近最优点时，梯度变小，步子越来越碎，最后一点距离要走很久。
- **二阶方法**还知道"地形的曲率"（Hessian），能精准判断最低点的位置，到了附近几步就能跳到极高精度。

### 对比：为什么内点法能做到二阶收敛

内点法处理约束的方式是引入**障碍函数**：

$$\min_{\mathbf{x}} \; f(\mathbf{x}) - \frac{1}{t}\sum_i \ln(b_i - \mathbf{a}_i^T \mathbf{x})$$

对于每一个固定的 $t$，用**牛顿法**求解上面这个无约束问题。牛顿法的更新公式为：

$$\mathbf{x}^{(k+1)} = \mathbf{x}^{(k)} - \left[\nabla^2 \phi(\mathbf{x}^{(k)})\right]^{-1} \nabla \phi(\mathbf{x}^{(k)})$$

其中 $\nabla^2 \phi$ 是 Hessian 矩阵（二阶导数信息）。用到了二阶导数，所以是二阶方法。二次收敛意味着：误差从 $10^{-1} \to 10^{-2} \to 10^{-4} \to 10^{-8}$，几步就到机器精度。当然，代价是每步需要计算 Hessian 并求解线性方程组（$O(n^3)$），所以内点法是"每步贵但步数少"，投影梯度法是"每步便宜但步数多"。

## 3.2 投影方面：投影本身可能很难算

投影梯度法"每步轻量"的前提是**投影 $\mathcal{P}_\mathcal{C}(\cdot)$ 容易计算**。然而并非所有约束集都满足这个条件。

### 容易的投影

盒约束 $\mathcal{C} = \lbrace\mathbf{x} : a_i \le x_i \le b_i\rbrace$，投影是逐元素截断：

$$[\mathcal{P}_{\mathcal{C}}(\mathbf{x})]_i = \text{clip}(x_i, a_i, b_i)$$

计算量 $O(n)$，几乎免费。

### 困难的例子一：半正定锥约束

约束 $\mathcal{C} = \lbrace\mathbf{X} : \mathbf{X} \succeq 0\rbrace$（半正定），投影需要：

1. 对矩阵做**特征值分解**：$\mathbf{X} = \sum_i \lambda_i \mathbf{v}_i \mathbf{v}_i^T$
2. 把**负特征值截为零**：$\mathcal{P}_{\mathcal{C}}(\mathbf{X}) = \sum_i \max(\lambda_i, 0)\, \mathbf{v}_i \mathbf{v}_i^T$

特征值分解的复杂度是 $O(n^3)$。若 $n = 1000$，**每一步投影就要做 $10^9$ 量级的运算**，而投影梯度法可能需要成百上千步迭代。

### 困难的例子二：多面体约束

$$\mathcal{C} = \lbrace\mathbf{x} : \mathbf{A}\mathbf{x} \le \mathbf{b}\rbrace$$

投影**没有闭式解**，本身需要解一个二次规划（QP）：

$$\mathcal{P}_{\mathcal{C}}(\mathbf{y}) = \arg\min_{\mathbf{x}} \|\mathbf{x} - \mathbf{y}\|^2 \quad \text{s.t. } \mathbf{A}\mathbf{x} \le \mathbf{b}$$

每做一次投影，就要求解一个完整的优化问题——"用一个优化算法，每步内部再套一个优化算法"——此时投影梯度法失去了"每步轻量"的优势。

### 投影困难时的替代方案：黎曼梯度法

当投影难以计算时，一个自然的问题是：**能不能绕开投影？** 对于一类重要的约束——约束集本身是一个**光滑流形**（如球面、正交矩阵、低秩矩阵等等式约束），答案是可以，用黎曼梯度法。

投影梯度法把约束集视为欧氏空间中的一个子集，先在外部空间走一步再拉回来。黎曼梯度法则转换视角：把约束集本身视为一个弯曲的空间（流形），**直接在流形上移动**，从一开始就不离开可行集，因此根本不需要投影。

| | 投影梯度法 | 黎曼梯度法 |
|--|----------|-----------|
| **视角** | 约束集 $\mathcal{C}$ 是欧氏空间中的子集 | 约束集 $\mathcal{M}$ 是一个流形（弯曲空间） |
| **迭代逻辑** | 在欧氏空间走一步，再投影回去 | 直接在流形上走 |
| **搜索方向** | 欧氏梯度 $\nabla f$ | 黎曼梯度 $\text{grad}\_\mathcal{M} f$（切空间中的梯度） |
| **回到可行集** | 投影 $\mathcal{P}\_\mathcal{C}(\cdot)$ | 回缩 (retraction) $\mathcal{R}\_\mathbf{x}(\cdot)$ |

以球面 $\lVert\mathbf{x}\rVert = 1$ 为例来说明两者的差异：

**投影梯度：**
1. 站在球面上，按欧氏梯度方向走一步——**飞离球面**进入三维空间
2. 从空间中把点**投影**（拉回）到最近的球面上

$$\mathbf{x}^{(k+1)} = \mathcal{P}_{\mathcal{M}}\!\left(\mathbf{x}^{(k)} - \alpha \nabla f(\mathbf{x}^{(k)})\right)$$

**黎曼梯度：**
1. 站在球面上，计算**切平面**上的梯度分量——方向从一开始就贴着球面
2. 沿切方向走一步，用**回缩映射**映回流形

$$\mathbf{x}^{(k+1)} = \mathcal{R}_{\mathbf{x}^{(k)}}\!\left(-\alpha \, \text{grad}_\mathcal{M} f(\mathbf{x}^{(k)})\right)$$

对于某些简单流形，两者实际上**等价或近似等价**。例如球面约束上，黎曼梯度 = 欧氏梯度投影到切空间 $\text{grad}\_\mathcal{M} f = (\mathbf{I} - \mathbf{x}\mathbf{x}^T)\nabla f$，回缩 = 归一化 $\mathcal{R}\_\mathbf{x}(\mathbf{v}) = \frac{\mathbf{x}+\mathbf{v}}{\lVert\mathbf{x}+\mathbf{v}\rVert}$。但黎曼方法真正的价值体现在**投影困难的流形约束**上：

**关键例子：Stiefel 流形** $\mathbf{X}^T\mathbf{X} = \mathbf{I}$（正交矩阵约束）。投影梯度需要做 SVD（$O(n^3)$），且本质上是在解一个隐式优化子问题；黎曼梯度用 QR 分解做回缩，常数更小且数值更稳定。

总结一下两者的适用场景：

| 场景 | 更适合 | 原因 |
|------|--------|------|
| 约束是**不等式**（盒约束、凸集） | 投影梯度 | 不等式约束定义的是"区域"，不是流形 |
| 约束是**等式/光滑流形**（球面、Stiefel 流形） | 黎曼梯度 | 流形结构天然存在，黎曼方法直接利用几何 |
| 约束集投影**容易算** | 投影梯度 | 简单直接 |
| 约束集投影**难算**但流形结构清晰 | 黎曼梯度 | 回缩通常比投影容易 |

> 一句话概括：投影梯度是"在外面走，拉回来"；黎曼梯度是"一直在里面走"。约束定义的是凸集时用投影，定义的是光滑流形时用黎曼。

---

# 4. 投影梯度法的完整收敛性理论

以下给出投影梯度法有效的完整理论推导，每一步都有严格证明。

## 4.0 问题设定

$$\min_{\mathbf{x} \in \mathcal{C}} f(\mathbf{x})$$

**假设：**
- $\mathcal{C} \subseteq \mathbb{R}^n$ 是非空闭凸集
- $f$ 是凸函数
- $\nabla f$ 是 $L$-Lipschitz 连续的：$\lVert\nabla f(\mathbf{x}) - \nabla f(\mathbf{y})\rVert \le L\lVert\mathbf{x} - \mathbf{y}\rVert$

投影梯度法的迭代：

$$\mathbf{x}^{(k+1)} = \mathcal{P}_\mathcal{C}\!\left(\mathbf{x}^{(k)} - \alpha \nabla f(\mathbf{x}^{(k)})\right)$$

## 4.1 投影算子的基本性质

### 4.1.1 投影的存在唯一性

对闭凸集 $\mathcal{C}$ 和任意 $\mathbf{y} \in \mathbb{R}^n$，投影定义为：

$$\mathcal{P}_\mathcal{C}(\mathbf{y}) = \arg\min_{\mathbf{x} \in \mathcal{C}} \|\mathbf{x} - \mathbf{y}\|^2$$

$\lVert\cdot - \mathbf{y}\rVert^2$ 是强凸函数，$\mathcal{C}$ 是闭凸集，所以最小化问题有**唯一解**。

### 4.1.2 投影的变分刻画

$\hat{\mathbf{x}} = \mathcal{P}_\mathcal{C}(\mathbf{y})$ 当且仅当：

$$\langle \mathbf{y} - \hat{\mathbf{x}},\; \mathbf{z} - \hat{\mathbf{x}} \rangle \le 0, \quad \forall \mathbf{z} \in \mathcal{C} \tag{P1}$$

**证明：** $\hat{\mathbf{x}}$ 是 $\min_{\mathbf{z} \in \mathcal{C}} \frac{1}{2}\lVert\mathbf{z} - \mathbf{y}\rVert^2$ 的解。由凸优化的一阶最优性条件（方向导数非负）：

$$\langle \nabla_\mathbf{z} \tfrac{1}{2}\|\mathbf{z} - \mathbf{y}\|^2 \big|_{\mathbf{z}=\hat{\mathbf{x}}},\; \mathbf{z} - \hat{\mathbf{x}} \rangle \ge 0, \quad \forall \mathbf{z} \in \mathcal{C}$$

$$\Rightarrow \langle \hat{\mathbf{x}} - \mathbf{y},\; \mathbf{z} - \hat{\mathbf{x}} \rangle \ge 0 \quad \Leftrightarrow \quad \langle \mathbf{y} - \hat{\mathbf{x}},\; \mathbf{z} - \hat{\mathbf{x}} \rangle \le 0 \qquad \blacksquare$$

**几何含义：** 从 $\hat{\mathbf{x}}$ 出发，指向 $\mathbf{y}$ 的方向和指向可行集内任何点 $\mathbf{z}$ 的方向，夹角 $\ge 90°$。

### 4.1.3 非扩张性

由 (P1) 可推出：

$$\|\mathcal{P}_\mathcal{C}(\mathbf{x}) - \mathcal{P}_\mathcal{C}(\mathbf{y})\| \le \|\mathbf{x} - \mathbf{y}\|, \quad \forall \mathbf{x}, \mathbf{y} \tag{P2}$$

**证明：** 记 $\hat{\mathbf{x}} = \mathcal{P}_\mathcal{C}(\mathbf{x})$，$\hat{\mathbf{y}} = \mathcal{P}_\mathcal{C}(\mathbf{y})$。由 (P1)：

$$\langle \mathbf{x} - \hat{\mathbf{x}},\; \hat{\mathbf{y}} - \hat{\mathbf{x}} \rangle \le 0$$

$$\langle \mathbf{y} - \hat{\mathbf{y}},\; \hat{\mathbf{x}} - \hat{\mathbf{y}} \rangle \le 0$$

两式相加：

$$\langle (\mathbf{x} - \hat{\mathbf{x}}) - (\mathbf{y} - \hat{\mathbf{y}}),\; \hat{\mathbf{y}} - \hat{\mathbf{x}} \rangle \le 0$$

$$\langle (\mathbf{x} - \mathbf{y}) - (\hat{\mathbf{x}} - \hat{\mathbf{y}}),\; \hat{\mathbf{y}} - \hat{\mathbf{x}} \rangle \le 0$$

$$\langle \mathbf{x} - \mathbf{y},\; \hat{\mathbf{y}} - \hat{\mathbf{x}} \rangle + \|\hat{\mathbf{x}} - \hat{\mathbf{y}}\|^2 \le 0$$

由 Cauchy-Schwarz 不等式：

$$\|\hat{\mathbf{x}} - \hat{\mathbf{y}}\|^2 \le \langle \mathbf{x} - \mathbf{y},\; \hat{\mathbf{x}} - \hat{\mathbf{y}} \rangle \le \|\mathbf{x} - \mathbf{y}\| \cdot \|\hat{\mathbf{x}} - \hat{\mathbf{y}}\|$$

两边除以 $\lVert\hat{\mathbf{x}} - \hat{\mathbf{y}}\rVert$ 即得 $\lVert\hat{\mathbf{x}} - \hat{\mathbf{y}}\rVert \le \lVert\mathbf{x} - \mathbf{y}\rVert$。$\blacksquare$

### 4.1.4 推论：到可行点的距离不增

若 $\mathbf{z} \in \mathcal{C}$，则 $\mathcal{P}_\mathcal{C}(\mathbf{z}) = \mathbf{z}$，所以：

$$\|\mathcal{P}_\mathcal{C}(\mathbf{y}) - \mathbf{z}\| \le \|\mathbf{y} - \mathbf{z}\|, \quad \forall \mathbf{z} \in \mathcal{C} \tag{P3}$$

投影后离可行集内任何一点（包括最优解）**只会更近，不会更远**。

## 4.2 Descent Lemma

这是梯度下降理论的基础工具，和投影无关。

**引理：** 若 $\nabla f$ 是 $L$-Lipschitz 的，则：

$$f(\mathbf{y}) \le f(\mathbf{x}) + \langle \nabla f(\mathbf{x}),\; \mathbf{y} - \mathbf{x} \rangle + \frac{L}{2}\|\mathbf{y} - \mathbf{x}\|^2, \quad \forall \mathbf{x}, \mathbf{y} \tag{DL}$$

含义：$f$ 可以被一个二次函数从上方控制住。梯度 Lipschitz 意味着函数不会弯曲得太厉害。

## 4.3 最优性条件等价于不动点

**命题：** $\mathbf{x}^\*$ 是 $\min_\mathcal{C} f(\mathbf{x})$ 的最优解 $\Leftrightarrow$ 对任意 $\alpha > 0$：

$$\mathbf{x}^* = \mathcal{P}_\mathcal{C}\!\left(\mathbf{x}^* - \alpha \nabla f(\mathbf{x}^*)\right) \tag{FP}$$

**证明（$\Leftrightarrow$）：**

$\mathbf{x}^\*$ 是凸问题的最优解 $\Leftrightarrow$ 一阶最优性条件：

$$\langle \nabla f(\mathbf{x}^*),\; \mathbf{z} - \mathbf{x}^* \rangle \ge 0, \quad \forall \mathbf{z} \in \mathcal{C} \tag{OPT}$$

由 (P1)，$\mathbf{x}^\* = \mathcal{P}\_\mathcal{C}(\mathbf{x}^\* - \alpha \nabla f(\mathbf{x}^\*))$ 当且仅当

$$\langle (\mathbf{x}^* - \alpha \nabla f(\mathbf{x}^*)) - \mathbf{x}^*,\; \mathbf{z} - \mathbf{x}^* \rangle \le 0, \quad \forall \mathbf{z} \in \mathcal{C}$$

$$\Leftrightarrow \quad \langle -\alpha \nabla f(\mathbf{x}^*),\; \mathbf{z} - \mathbf{x}^* \rangle \le 0$$

$$\Leftrightarrow \quad \langle \nabla f(\mathbf{x}^*),\; \mathbf{z} - \mathbf{x}^* \rangle \ge 0 \qquad (\alpha > 0)$$

这正是 (OPT)。$\blacksquare$

**意义：** 投影梯度法的迭代找的就是不动点，而不动点恰好就是 KKT 最优解。

## 4.4 核心收敛证明

记 $\mathbf{x}^\*$ 为最优解，步长 $\alpha = 1/L$。

**目标：** 证明 $f(\mathbf{x}^{(K)}) - f(\mathbf{x}^\*) \le \frac{L\lVert\mathbf{x}^{(0)} - \mathbf{x}^\*\rVert^2}{2K}$。

### 步骤 A：单步函数值下降

记 $\mathbf{x}^+ = \mathbf{x}^{(k+1)}$，$\mathbf{x} = \mathbf{x}^{(k)}$，$\mathbf{g} = \nabla f(\mathbf{x})$。由 Descent Lemma (DL) 取 $\mathbf{y} = \mathbf{x}^+$：

$$f(\mathbf{x}^+) \le f(\mathbf{x}) + \langle \mathbf{g},\; \mathbf{x}^+ - \mathbf{x} \rangle + \frac{L}{2}\|\mathbf{x}^+ - \mathbf{x}\|^2 \tag{S1}$$

### 步骤 B：利用投影的性质

$\mathbf{x}^+ = \mathcal{P}_\mathcal{C}(\mathbf{x} - \alpha\mathbf{g})$，由 (P1) 对所有 $\mathbf{z} \in \mathcal{C}$：

$$\langle (\mathbf{x} - \alpha\mathbf{g}) - \mathbf{x}^+,\; \mathbf{z} - \mathbf{x}^+ \rangle \le 0$$

取 $\mathbf{z} = \mathbf{x}^\*$ 并整理：

$$\langle \mathbf{g},\; \mathbf{x}^+ - \mathbf{x}^* \rangle \le \frac{1}{\alpha}\langle \mathbf{x} - \mathbf{x}^+,\; \mathbf{x}^* - \mathbf{x}^+ \rangle \tag{S2}$$

### 步骤 C：利用凸性

$f$ 是凸函数，所以：

$$f(\mathbf{x}^*) \ge f(\mathbf{x}) + \langle \mathbf{g},\; \mathbf{x}^* - \mathbf{x} \rangle$$

$$\Rightarrow \langle \mathbf{g},\; \mathbf{x} - \mathbf{x}^* \rangle \le f(\mathbf{x}) - f(\mathbf{x}^*) \tag{S3}$$

### 步骤 D：组合

由 (S1)：

$$f(\mathbf{x}^+) - f(\mathbf{x}^*) \le f(\mathbf{x}) - f(\mathbf{x}^*) + \langle \mathbf{g},\; \mathbf{x}^+ - \mathbf{x} \rangle + \frac{L}{2}\|\mathbf{x}^+ - \mathbf{x}\|^2$$

将 $\langle \mathbf{g},\; \mathbf{x}^+ - \mathbf{x} \rangle = \langle \mathbf{g},\; \mathbf{x}^+ - \mathbf{x}^\* \rangle + \langle \mathbf{g},\; \mathbf{x}^\* - \mathbf{x} \rangle$ 代入，利用 (S3)：

$$f(\mathbf{x}^+) - f(\mathbf{x}^*) \le \langle \mathbf{g},\; \mathbf{x}^+ - \mathbf{x}^* \rangle + \frac{L}{2}\|\mathbf{x}^+ - \mathbf{x}\|^2$$

由 (S2)，取 $\alpha = 1/L$：

$$\le L\langle \mathbf{x} - \mathbf{x}^+,\; \mathbf{x}^* - \mathbf{x}^+ \rangle + \frac{L}{2}\|\mathbf{x}^+ - \mathbf{x}\|^2$$

利用恒等式 $\langle \mathbf{a}, \mathbf{b} \rangle = \frac{1}{2}(\lVert\mathbf{a}\rVert^2 + \lVert\mathbf{b}\rVert^2 - \lVert\mathbf{a}-\mathbf{b}\rVert^2)$ 展开并化简，得到关键的**单步不等式**：

$$\boxed{f(\mathbf{x}^{(k+1)}) - f(\mathbf{x}^*) \le \frac{L}{2}\left(\|\mathbf{x}^{(k)} - \mathbf{x}^*\|^2 - \|\mathbf{x}^{(k+1)} - \mathbf{x}^*\|^2\right)} \tag{Key}$$

### 步骤 E：求和得收敛速率

对 $k = 0, 1, \ldots, K-1$ 求和 (Key)：

$$\sum_{k=0}^{K-1} \left(f(\mathbf{x}^{(k+1)}) - f(\mathbf{x}^*)\right) \le \frac{L}{2}\left(\|\mathbf{x}^{(0)} - \mathbf{x}^*\|^2 - \|\mathbf{x}^{(K)} - \mathbf{x}^*\|^2\right)$$

右边是伸缩和（telescoping sum），大量项对消。因为 $\lVert\mathbf{x}^{(K)} - \mathbf{x}^\*\rVert^2 \ge 0$：

$$\sum_{k=0}^{K-1} \left(f(\mathbf{x}^{(k+1)}) - f(\mathbf{x}^*)\right) \le \frac{L}{2}\|\mathbf{x}^{(0)} - \mathbf{x}^*\|^2$$

由 (Key) 知函数值递减，左边最小项是最后一项，因此：

$$K \cdot \left(f(\mathbf{x}^{(K)}) - f(\mathbf{x}^*)\right) \le \frac{L}{2}\|\mathbf{x}^{(0)} - \mathbf{x}^*\|^2$$

$$\boxed{f(\mathbf{x}^{(K)}) - f(\mathbf{x}^*) \le \frac{L\|\mathbf{x}^{(0)} - \mathbf{x}^*\|^2}{2K} = O(1/K)}$$

## 4.5 强凸情况下的线性收敛

若 $f$ 还是 $\mu$-强凸的（$\nabla^2 f \succeq \mu \mathbf{I}$），强凸给出更紧的下界：

$$f(\mathbf{x}^*) \ge f(\mathbf{x}) + \langle \nabla f(\mathbf{x}),\; \mathbf{x}^* - \mathbf{x} \rangle + \frac{\mu}{2}\|\mathbf{x}^* - \mathbf{x}\|^2$$

将这个更强的条件代入上面的推导，最终得到：

$$\boxed{\|\mathbf{x}^{(K)} - \mathbf{x}^*\|^2 \le \left(1 - \frac{\mu}{L}\right)^K \|\mathbf{x}^{(0)} - \mathbf{x}^*\|^2}$$

这是**线性收敛（R-linear）**：每步误差乘以常数 $(1 - \mu/L) < 1$。比值 $\kappa = L/\mu$ 称为**条件数**，$\kappa$ 越小收敛越快。

---

# 5. 完整逻辑链总结

```
投影的存在唯一性（闭凸集 + 强凸距离函数）
        │
        ▼
投影的变分刻画 (P1)
        │
        ├──► 非扩张性 (P2)/(P3)：投影不破坏进展
        │
        └──► 不动点 = KKT 最优解 (FP)：迭代方向正确
                │
                ▼
      Descent Lemma (DL)：L-光滑给出函数值上界
                │
                ▼
     单步不等式 (Key)：每步距离 x* 更近 + 函数值下降
                │
                ▼
      伸缩求和 ──► O(1/K) 收敛速率（凸）
                    或 线性收敛（强凸）
```

投影梯度法的理论核心可以归结为一句话：**凸集投影的非扩张性保证投影不破坏梯度下降的进展，而最优解恰好是迭代的不动点，两者结合使得无约束梯度下降的收敛性分析几乎原封不动地搬到约束情况。**
