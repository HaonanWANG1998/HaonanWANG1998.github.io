------

layout: singlelayout: single

title: 'Introduction to Convex Optimization'title: 'Introduction to Convex Optimization'

date: 2025-10-13 08:00:00 +0800date: 2025-10-13 08:00:00 +0800

categories: categories: 

  - Mathematics  - Mathematics

  - Optimization  - Optimization

tags:tags:

  - Optimization  - Optimization

  - Mathematics  - Mathematics

  - Machine Learning  - Machine Learning

  - Convex Analysis  - Convex Analysis

excerpt: 'This post introduces the fundamental concepts of convex optimization based on Boyd\'s textbook, including standard forms, optimality conditions, and the relationship between local and global optima.'excerpt: 'This post introduces the fundamental concepts of convex optimization based on Boyd textbook, including standard forms, optimality conditions, and the relationship between local and global optima.'

------



此处为Boyd凸优化教材中对于凸优化问题特征的基本描述This post introduces the fundamental concepts of convex optimization based on Boyd's textbook.



# 凸优化问题# Convex Optimization Problems

*基本描述*

## Standard Form

## 标准形式

A convex optimization problem has the following standard form:

$$\begin{array}{ll}

\text{minimize} & f_{0}(x) \\- minimize f_0(x)

\text{subject to} & f_{i}(x) \leq 0, \quad i=1, \ldots, m \\- subject to f_i(x) ≤ 0, i=1,...,m  

& h_{i}(x)=0, \quad i=1, \ldots, p- and h_i(x) = 0, i=1,...,p

\end{array}$$

### 如何判断一个优化问题是不是凸优化问题？三点要求：

### 如何判断一个优化问题是不是凸优化问题？三点要求：

1. **目标函数为凸**

1. **目标函数为凸**2. **不等式约束为凸**

2. **不等式约束为凸**3. **等式约束是仿射的**

3. **等式约束是仿射的**问题的定义域为：

问题的定义域为：

$$\mathcal{D}=\bigcap_{i=0}^{m} \text{dom} f_{i} \cap \bigcap_{i=1}^{p} \text{dom} h_{i}$$

$$\mathcal{D}=\bigcap_{i=0}^{m} \text{dom} f_{i} \cap \bigcap_{i=1}^{p} \text{dom} h_{i}$$

**凸优化问题的本质，即是在一个凸集上极小化一个凸的目标函数。**

**凸优化问题的本质，即是在一个凸集上极小化一个凸的目标函数。**

### 凸问题与拟凸问题之间的关系

### 凸问题与拟凸问题之间的关系

而如果目标函数是拟凸的，则优化问题扩展为拟凸优化问题。拟凸优化问题和凸优化问题的关系为：**凸优化问题为最优集最多包含一个点的拟凸优化问题。**由于拟凸函数和凸函数下水平集都是凸集，次优集（或最优集）都是凸的，如果目标函数严格凸，则最优集至多一个点。

而如果目标函数是拟凸的，则优化问题扩展为拟凸优化问题。拟凸优化问题和凸优化问题的关系为：**凸优化问题为最优集最多包含一个点的拟凸优化问题。**由于拟凸函数和凸函数下水平集都是凸集，次优集（或最优集）都是凸的，如果目标函数严格凸，则最优集至多一个点。

# 局部最优与全局最优

# 局部最优与全局最优

凸优化问题的特殊之处（为什么都要研究凸优化问题）：对于凸优化问题，局部最优解即全局最优解（对于拟凸问题不满足）

凸优化问题的特殊之处（为什么都要研究凸优化问题）：对于凸优化问题，局部最优解即全局最优解（对于拟凸问题不满足）

### 可微函数$f_{0}$的最优性准则

### 可微函数$f_{0}$的最优性准则

*凸优化问题的最优解怎么解*

*凸优化问题的最优解怎么解*设凸优化问题的目标函数$f_{0}$可微，对于所有的$x, y \in \text{dom} f_{0}$，有：

设凸优化问题的目标函数$f_{0}$可微，对于所有的$x, y \in \text{dom} f_{0}$，有：

$$f_{0}(y) \geq f_{0}(x)+\nabla f_{0}(x)^{T}(y-x)$$

$$f_{0}(y) \geq f_{0}(x)+\nabla f_{0}(x)^{T}(y-x)$$

以上为凸函数的一阶判定条件，用$X$表示可行集，则$x$是最优解，当且仅当$x \in X$且

以上为凸函数的一阶判定条件，用$X$表示可行集，则$x$是最优解，当且仅当$x \in X$且

$$\nabla f_{0}(x)^{T}(y-x) \geq 0 \text { for all } y \in X$$

$$\nabla f_{0}(x)^{T}(y-x) \geq 0 \text { for all } y \in X$$

其物理意义是：$-\nabla f_{0}(x)$在$x$处定义了可行集的一个支撑超平面。

其物理意义是：$-\nabla f_{0}(x)$在$x$处定义了可行集的一个支撑超平面。以下讨论集中特殊凸优化问题的最优性准则：

以下讨论集中特殊凸优化问题的最优性准则：

### 无约束问题

### 无约束问题

无约束问题，可行域是$\text{dom} f_{0}$的全空间，此时最优解充要条件是：

无约束问题，可行域是$\text{dom} f_{0}$的全空间，此时最优解充要条件是：

$$\nabla f_{0}(x)=0$$

$$\nabla f_{0}(x)=0$$

这是一种之前见过的较传统情况，高中数学求函数极值点的重要准则就是找导数为0的点。根据上式解的数量，有几种可能的情况，下面是一个例子：

这是一种之前见过的较传统情况，高中数学求函数极值点的重要准则就是找导数为0的点。根据上式解的数量，有几种可能的情况，下面是一个例子：>**无约束二次规划**：最小化目标函数

>**无约束二次规划**：最小化目标函数>

>>$$f_{0}(x)=(1 / 2) x^{T} P x+q^{T} x+r$$

>$$f_{0}(x)=(1 / 2) x^{T} P x+q^{T} x+r$$>

>>其中$P$为半正定阵，则有最优解条件可得：

>其中$P$为半正定阵，则有最优解条件可得：>

>>$$\nabla f_{0}(x)=P x+q=0$$

>$$\nabla f_{0}(x)=P x+q=0$$>

>>最优解为方程组$Px=-q$的解，则有如下几种情况：

>最优解为方程组$Px=-q$的解，则有如下几种情况：>1.$q$不在$P$的列空间中，则无解，此时$f_{0}$无下界。

>1.$q$不在$P$的列空间中，则无解，此时$f_{0}$无下界。>2.如果$P \succ 0$，$f_{0}$严格凸，有唯一最小解$x^{*}=-P^{-1}q$。

>2.如果$P \succ 0$，$f_{0}$严格凸，有唯一最小解$x^{*}=-P^{-1}q$。>3.如果$P$奇异而$-q$在其列空间中，则有多个最优解，最优解集合为$X_{\mathrm{opt}}=-P^{\dagger} q+\mathcal{N}(P)$。

>3.如果$P$奇异而$-q$在其列空间中，则有多个最优解，最优解集合为$X_{\mathrm{opt}}=-P^{\dagger} q+\mathcal{N}(P)$。

### 只含等式约束

### 只含等式约束

问题形式：

问题形式：

$$\begin{array}{ll}

$$\begin{array}{ll}\text{minimize} & f_{0}(x) \\

\text{minimize} & f_{0}(x) \\\text{subject to} & A x=b

\text{subject to} & A x=b\end{array}$$

\end{array}$$

最优性条件：$\nabla f_{0}(x)\in\mathcal{R}(A^{\mathrm{T}})$，或：$\nabla f_{0}(x)$在$\mathcal{N}(A)$的正交补中。

最优性条件：$\nabla f_{0}(x)\in\mathcal{R}(A^{\mathrm{T}})$，或：$\nabla f_{0}(x)$在$\mathcal{N}(A)$的正交补中。证明：

证明：

可行集是一个仿射集，最优性条件为：对任意$Ay=b$的$y$

可行集是一个仿射集，最优性条件为：对任意$Ay=b$的$y$

$$\nabla f_{0}(x)^{\mathrm{T}}(y-x) \geq0$$

$$\nabla f_{0}(x)^{\mathrm{T}}(y-x) \geq0$$

每一个$y$都有$y=x+v$的形式，其中$v \in \mathcal{N}(A)$，最优性条件为：

每一个$y$都有$y=x+v$的形式，其中$v \in \mathcal{N}(A)$，最优性条件为：

$$\nabla f_{0}(x)^{\mathrm{T}}v \geq0, \text{for all } v \in \mathcal{N}(A) $$

$$\nabla f_{0}(x)^{\mathrm{T}}v \geq0, \text{for all } v \in \mathcal{N}(A) $$

**如果一个线性函数在子空间中非负，则它在子空间上必恒等于0**。故而$\nabla f_{0}(x)^{\mathrm{T}}v=0$，即$\nabla f_{0}(x)$在$\mathcal{N}(A)$的正交补中。所以**只含等式约束的凸优化问题最优性条件为：$\nabla f_{0}(x)\in\mathcal{R}(A^{\mathrm{T}})$，即：

**如果一个线性函数在子空间中非负，则它在子空间上必恒等于0**。故而$\nabla f_{0}(x)^{\mathrm{T}}v=0$，即$\nabla f_{0}(x)$在$\mathcal{N}(A)$的正交补中。所以**只含等式约束的凸优化问题最优性条件为：$\nabla f_{0}(x)\in\mathcal{R}(A^{\mathrm{T}})$，即：

$$\mathcal{N}(A)+A^\mathrm{T}v=0$$

$$\mathcal{N}(A)+A^\mathrm{T}v=0$$

这是经典的Lagrange乘子最优条件。

这是经典的Lagrange乘子最优条件。

### 非负象限中的极小化

### 非负象限中的极小化

问题形式：

问题形式：

$$\begin{array}{ll}

$$\begin{array}{ll}\text{minimize} & f_{0}(x) \\

\text{minimize} & f_{0}(x) \\\text{subject to} & x \succeq 0

\text{subject to} & x \succeq 0\end{array}$$

\end{array}$$

最优性条件：

最优性条件：

$$x \succeq 0, \quad \nabla f_{0}(x) \succeq 0, \quad x_{i}\left(\nabla f_{0}(x)\right)_{i}=0, \quad i=1, \ldots, n$$

$$x \succeq 0, \quad \nabla f_{0}(x) \succeq 0, \quad x_{i}\left(\nabla f_{0}(x)\right)_{i}=0, \quad i=1, \ldots, n$$

证明：

证明：由可微$f_{0}(x)$的最优性条件可知：

由可微$f_{0}(x)$的最优性条件可知：

$$x \succeq 0, \quad \nabla f_{0}(x)^{T}(y-x) \geq 0 \text { for all } y \succeq 0$$

$$x \succeq 0, \quad \nabla f_{0}(x)^{T}(y-x) \geq 0 \text { for all } y \succeq 0$$

其中$\nabla f_{0}(x)^{T} y$是$y$的线性函数且在$y \succeq 0$上无下界。于是最优条件简化为$-\nabla f_{0}(x)^{T} x\geq0$，而$x \succeq 0$且$\nabla f_{0}(x)\succeq 0$，所以有$\nabla f_{0}(x)=0$，即：

其中$\nabla f_{0}(x)^{T} y$是$y$的线性函数且在$y \succeq 0$上无下界。于是最优条件简化为$-\nabla f_{0}(x)^{T} x\geq0$，而$x \succeq 0$且$\nabla f_{0}(x)\succeq 0$，所以有$\nabla f_{0}(x)=0$，即：$$\sum_{i=1}^{n}(\nabla f_{0}(x))_{i}x_{i}=0$$

$$\sum_{i=1}^{n}(\nabla f_{0}(x))_{i}x_{i}=0$$这是$n$个非负项乘积之和，故而每一项乘积都是0，得证。

这是$n$个非负项乘积之和，故而每一项乘积都是0，得证。**$\quad x_{i}\left(\nabla f_{0}(x)\right)_{i}=0$该项称为互补性，表明$x$和$\nabla f_{0}(x)$的稀疏模式互补，也是KKT条件中的重要内容。**

**$\quad x_{i}\left(\nabla f_{0}(x)\right)_{i}=0$该项称为互补性，表明$x$和$\nabla f_{0}(x)$的稀疏模式互补，也是KKT条件中的重要内容。**

# 等价凸问题

# 等价凸问题

*如何将一般问题转化为凸问题*

*如何将一般问题转化为凸问题*

### 消除等式约束

### 消除等式约束

$$\begin{array}{ll}

$$\begin{array}{ll}\text{minimize} & f_{0}\left(F z+x_{0}\right) \\

\text{minimize} & f_{0}\left(F z+x_{0}\right) \\\text{subject to} & f_{i}\left(F z+x_{0}\right) \leq 0, \quad i=1, \ldots, m

\text{subject to} & f_{i}\left(F z+x_{0}\right) \leq 0, \quad i=1, \ldots, m\end{array}$$

\end{array}$$

其中$F$的值域为$A$的零空间，$Ax_{0}=b$，则等式约束有：

其中$F$的值域为$A$的零空间，$Ax_{0}=b$，则等式约束有：

$$A(Fz+x_{0})=AFz+Ax_{0}=Ax_{0}=b, \text{for all }z$$

$$A(Fz+x_{0})=AFz+Ax_{0}=Ax_{0}=b, \text{for all }z$$

### 引入等式约束

### 引入等式约束若问题中有这种形式：$f_{i}\left(A_{i} x+b_{i}\right)$，则用$y_{i}=A_{i}x+b_{i}$代替。

若问题中有这种形式：$f_{i}\left(A_{i} x+b_{i}\right)$，则用$y_{i}=A_{i}x+b_{i}$代替。

### 松弛变量

### 松弛变量

将不等式约束$f_{i}(x)\leq0$引入松弛变量$s_{i}$，变不等式约束为等式约束：

将不等式约束$f_{i}(x)\leq0$引入松弛变量$s_{i}$，变不等式约束为等式约束：$$f_{i}(x)+s_{i}=0$$

$$f_{i}(x)+s_{i}=0$$

### 上境图问题

### 上境图问题

传统问题可转化为：

传统问题可转化为：

$$\begin{array}{ll}

$$\begin{array}{ll}\text{minimize} & t \\

\text{minimize} & t \\\text{subject to} & f_{0}(x)-t \leq 0 \\

\text{subject to} & f_{0}(x)-t \leq 0 \\& f_{i}(x) \leq 0, \quad i=1, \ldots, m \\

& f_{i}(x) \leq 0, \quad i=1, \ldots, m \\& a_{i}^{T} x=b_{i}, \quad i=1, \ldots, p

& a_{i}^{T} x=b_{i}, \quad i=1, \ldots, p\end{array}$$

\end{array}$$

**因为任何凸优化问题都可以转化为具有线性目标函数的问题，所以称线性目标函数对凸优化问题是普适的。**

**因为任何凸优化问题都可以转化为具有线性目标函数的问题，所以称线性目标函数对凸优化问题是普适的。**极小化部分变量

极小化部分变量

# 拟凸优化

# 拟凸优化### 问题描述

### 问题描述传统凸优化问题的目标函数拓展为拟凸函数。（这里要说明，凸约束函数没必要拓展到拟凸，因为**约束函数有用的仅是下水平集**，而凸函数与拟凸函数的下水平集都是凸集）

传统凸优化问题的目标函数拓展为拟凸函数。（这里要说明，凸约束函数没必要拓展到拟凸，因为**约束函数有用的仅是下水平集**，而凸函数与拟凸函数的下水平集都是凸集）

### 最优性条件

### 最优性条件

*最优解怎么取*

*最优解怎么取*$$x \in X, \quad \nabla f_{0}(x)^{T}(y-x)>0 \text { for all } y \in X \backslash\{x\}$$

$$x \in X, \quad \nabla f_{0}(x)^{T}(y-x)>0 \text { for all } y \in X \backslash\{x\}$$>**拟凸问题最优解条件与凸问题不同：**

>**拟凸问题最优解条件与凸问题不同：**>1.对拟凸问题，该条件为充分条件；而凸问题是充要条件。拟凸问题中最优解可以不满足该条件。

>1.对拟凸问题，该条件为充分条件；而凸问题是充要条件。拟凸问题中最优解可以不满足该条件。>2.拟凸问题要求$f_{0}$的梯度非0，凸问题则不需要

>2.拟凸问题要求$f_{0}$的梯度非0，凸问题则不需要

### 用凸可行性问题求解拟凸优化问题

### 用凸可行性问题求解拟凸优化问题*拟凸问题怎么解*

*拟凸问题怎么解*思路：**用一族凸不等式来表示拟凸函数的下水平集**

思路：**用一族凸不等式来表示拟凸函数的下水平集**令$\phi_{t}: \mathbf{R}^{n} \rightarrow \mathbf{R}, t \in \mathbf{R}$为满足

令$\phi_{t}: \mathbf{R}^{n} \rightarrow \mathbf{R}, t \in \mathbf{R}$为满足$$f_{0}(x) \leq t \Longleftrightarrow \phi_{t}(x) \leq 0$$

$$f_{0}(x) \leq t \Longleftrightarrow \phi_{t}(x) \leq 0$$的一族凸函数，且对每一个$x$，$\phi_{t}(x)$关于$t$非增（*由于用$\phi_{t}(x)$的下水平集表示原拟凸函数的下水平集，原函数当$t$变大时，在该原集合中的$x$仍然在新的下水平集中，这一限定既是为了满足该特点*）。

的一族凸函数，且对每一个$x$，$\phi_{t}(x)$关于$t$非增（*由于用$\phi_{t}(x)$的下水平集表示原拟凸函数的下水平集，原函数当$t$变大时，在该原集合中的$x$仍然在新的下水平集中，这一限定既是为了满足该特点*）。用$p^{\star}$表示拟凸优化问题的最优值，可以构造如下凸的可行性问题：

用$p^{\star}$表示拟凸优化问题的最优值，可以构造如下凸的可行性问题：

$$\begin{array}{ll}

$$\begin{array}{ll}\text { find } & x \\

\text { find } & x \\\text { subject to } & \phi_{t}(x) \leq 0 \\

\text { subject to } & \phi_{t}(x) \leq 0 \\& f_{i}(x) \leq 0, \quad i=1, \ldots, m \\

& f_{i}(x) \leq 0, \quad i=1, \ldots, m \\& A x=b

& A x=b\end{array}$$

\end{array}$$

该可行性问题可用来判断最优值与给定$t$之间的关系：如果对于给定$t$，上述有解，则说明$p^{\star}\leq t$，反之同理。
该可行性问题可用来判断最优值与给定$t$之间的关系：如果对于给定$t$，上述有解，则说明$p^{\star}\leq t$，反之同理。