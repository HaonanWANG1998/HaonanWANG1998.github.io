---
layout: single
title: 'Numerical Methods for Optimization'
date: 2025-10-14 12:00:00 +0800
categories: 
  - Optimization
tags:
  - Optimization
  - Mathematics
  - Machine Learning
  - Convex Analysis
excerpt: 'A summary of commonly used numerical optimization methods.'
---

This note summarizes some commonly used numerical methods for optimization. We mainly consider the general optimization problem as follows:
$$\begin{aligned}
\min_x & \quad f(x) \\
\text{s.t.} & \quad g_i(x) \leq 0, \quad i = 1, \ldots, m \\
& \quad h_j(x) = 0, \quad j = 1, \ldots, p
\end{aligned}$$

If $g_i(x)$ and $h_j(x)$ are absent, it is an **unconstrained optimization problem**. Otherwise, it is a **constrained optimization problem**.

We discuss the following numerical methods for optimization:
- For unconstrained optimization:
  1. Gradient Descent
  2. Conjugate Gradient Descent
  3. Bi-Conjugate Gradient Method
  4. Newton's Method
  5. Quasi-Newton Methods (e.g., BFGS, L-BFGS)

- For constrained optimization:
    1. Gradient Projection Method
    2. Conjugate Gradient Projection Method
    3. Interior Point Method

The methods for constrainted optimization problems are built upon those for unconstrained optimization problems. **The difference lies in how to handle the constraints.** ***Specifically, the methods for unconstrained optimization focus on the objective function directly. Based on that, the methods for constrained optimization discussed how to handle the constraints effectively.***

# Unconstrained Optimization Methods
## Gradient Descent (GD)
### Main Insight
The main idea of GD is to update $x$ iteratively in the direction which **decreases the objective function mostly**, i.e., the negative gradient direction $-\nabla f(x)$. The update rule is given by:
$$x^{(t+1)} = x^{(t)} - \alpha^{(
t)} \nabla f(x^{(t)})$$
where $\alpha^{(t)}$ is the step size at iteration $t$.
### Pros and Cons
- Pros: Simple to implement and understand; works well for small to medium-sized problems.
- Cons: Can be slow to converge, especially for ill-conditioned problems; sensitive to the choice of step size.
## Conjugate Gradient Descent (CGD)
### Main Insight
For large-scale problems, CGD improves upon GD by considering the conjugate directions instead of the steepest descent direction. The update rule is given by:
$$x^{(t+1)} = x^{(t)} + \alpha^{(t)} d^{(t)}$$
where $d^{(t)}$ is the update direction at iteration $t$. The direction is computed using the previous gradient and direction:
$$d^{(t)} = -\nabla f(x^{(t)}) + \beta^{(t)} d^{(t-1)}$$
where $\beta^{(t)}$ is a scalar that ensures conjugacy.

**The reason for using CGD is that the GD method may exhibit zig-zagging behavior in narrow valleys of the objective function, leading to slow convergence. By using conjugate directions, CGD can ensure that the information of previous steps, which is reflected in the conjugate directions, is utilized effectively to accelerate convergence.**

**The essence of the so called "conjugate" directions is the linear combination of the current gradient and the previous direction.**

### Pros and Cons
- Pros: More efficient than GD for large-scale problems; converges in at most $n$ iterations for quadratic functions.
- Cons: More complex to implement; requires storage of previous directions.

## Bi-Conjugate Gradient Descent (Bi-CGD)
### Main Insight
Considering solving a large-scale linear system $Ax = b$, the equalvalent optimization problem is minimizing $\frac{1}{2} x^T A x - b^T x$. the CDG method requires $A$ to be symmetric positive definite while calculating $\Delta f(x)$. However, in many practical scenarios, $A$ may not be symmetric. The Bi-CGD method extends the CGD to handle non-symmetric matrices by maintaining two sequences of vectors: one for the original system and another for the transposed system. The update rules are similar to CGD but involve both $A$ and $A^T$. Mathematically, the update directions are computed as:
$$d^{(t)} = -\nabla f(x^{(t)}) + \beta^{(t)} d^{(t-1)}$$
$$\tilde{d}^{(t)} = -\nabla f^T(x^{(t)}) + \tilde{\beta}^{(t)} \tilde{d}^{(t-1)}$$
where $\tilde{d}^{(t)}$ is the direction for the transposed system.   

### Pros and Cons
- Pros: Can handle non-symmetric matrices; retains the efficiency of CGD.
- Cons: More complex than CGD; requires additional storage for the transposed system.

