---
title: 'Introduction to Convex Optimization'
date: 2025-10-13
permalink: /posts/2025/10/convex-optimization/
tags:
  - Optimization
  - Mathematics
  - Machine Learning
  - Convex Analysis
---

{% include base_path %}

# 凸优化问题
此处为Boyd凸优化教材中对于凸优化问题特征的基本描述

## 什么是凸优化问题
*凸优化问题的基本描述*

### 标准形式
$$\begin{array}{ll}
\text{minimize} & f_{0}(x) \\
\text{subject to} & f_{i}(x) \leq 0, \quad i=1, \ldots, m \\
& h_{i}(x)=0, \quad i=1, \ldots, p
\end{array}$$

### 如何判断一个优化问题是不是凸优化问题？
三点要求：

{: .notice--danger}
1. **目标函数为凸**
2. **不等式约束为凸**
3. **等式约束是仿射的**

问题的定义域为：
$$\mathcal{D}=\bigcap_{i=0}^{m} \operatorname{dom} f_{i} \cap \bigcap_{i=1}^{p} \operatorname{dom} h_{i}$$

**凸优化问题的本质，即是在一个凸集上极小化一个凸的目标函数。**

### 凸问题与拟凸问题之间的关系
而如果目标函数是拟凸的，则优化问题扩展为拟凸优化问题。拟凸优化问题和凸优化问题的关系为：**凸优化问题为最优集最多包含一个点的拟凸优化问题。**由于拟凸函数和凸函数下水平集都是凸集，次优集（或最优集）都是凸的，如果目标函数严格凸，则最优集至多一个点。