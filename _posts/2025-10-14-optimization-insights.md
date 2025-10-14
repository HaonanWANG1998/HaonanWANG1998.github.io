---
layout: single
title: 'Optimization Insight'
date: 2025-10-14 12:00:00 +0800
categories: 
  - Optimization
tags:
  - Optimization
  - Mathematics
  - Machine Learning
  - Convex Analysis
excerpt: 'A description of some useful optimization insights.'
---

This is a note for some useful optimization insights, including concave-convex procedure (CCCP), alternating direction method of multipliers (ADMM), etc.

# Concave-Convex Procedure (CCCP)

Normally, the non-convex cannot be solved directly. However, if the non-convex problem can be decomposed into **a difference of one convex function and one concave function**, i.e.,

$$\min_x \ f(x) = g(x) - h(x)$$

where $g(x)$ is convex and $h(x)$ is concave, we can use the CCCP to solve it iteratively. **The key idea is to linearize the concave part $h(x)$ at the current point $x^{(t)}$ and solve the resulting convex problem:**

$$\begin{aligned}
x^{(t+1)} & = \arg\min_x \ g(x) - \nabla h(x^{(t)})^T (x - x^{(t)}) \\
& = \arg\min_x \ g(x) - \nabla h(x^{(t)})^T x + \text{constant}
\end{aligned}$$

This process is repeated until convergence. CCCP **cannot guarantee a global optimum**, but it often converges to a good local optimum in practice. What's more, **CCCP can provide closed-form solutions for some specific problems**, making it computationally efficient. <span style="color: red;">The WMMSE algorithm for sum-rate maximization in downlink MU-MISO systems is an example of CCCP.</span>

# Alternating Direction Method of Multipliers (ADMM)

ADMM is a powerful optimization technique for solving problems with separable objectives and constraints. It combines the benefits of dual decomposition and augmented Lagrangian methods. The general form of an optimization problem suitable for ADMM is:

$$\begin{aligned}
\min_{x, z} & \quad f(x) + g(z) \\
\text{s.t.} & \quad Ax + Bz = c
\end{aligned}$$

where $f(x)$ and $g(z)$ are convex functions.

ADMM works by breaking the problem into smaller subproblems that can be solved more easily. The main idea is to introduce auxiliary variables and use the method of multipliers to enforce the constraints. The ADMM algorithm consists of the following steps:

1. **Update $x$**: Solve the optimization problem for $x$ while keeping $z$ fixed.
2. **Update $z$**: Solve the optimization problem for $z$ while keeping $x$ fixed.
3. **Update the dual variable**: Update the dual variable associated with the constraint.

This process is repeated until convergence. ADMM is particularly well-suited for large-scale optimization problems and has been widely used in various applications, including machine learning, image processing, and signal processing.