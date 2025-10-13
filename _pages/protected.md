---
permalink: /protected/
title: "受保护页面"
author_profile: true
---

<div id="password-form">
  <h2>🔐 请输入访问密码</h2>
  <input type="password" id="password-input" placeholder="请输入密码">
  <button onclick="checkPassword()">进入</button>
  <p id="error-message" style="color: red; display: none;">密码错误，请重试</p>
</div>

<div id="protected-content" style="display: none;">
  <h1>🎉 欢迎访问受保护内容！</h1>
  
  ## 📋 私密内容区域
  
  这里是受密码保护的内容区域。
  
  ### 🔬 研究进展
  - 项目A的最新进展
  - 实验数据分析
  - 下一步计划
  
  ### 📊 个人数据
  - 重要的个人信息
  - 联系人列表
  - 内部文档链接
  
  ### 💼 工作笔记
  写一些不想公开的工作笔记和想法...
  
</div>

<script>
function checkPassword() {
  const password = document.getElementById('password-input').value;
  const correctPassword = 'haonan2025'; // 在这里设置您的密码
  
  if (password === correctPassword) {
    document.getElementById('password-form').style.display = 'none';
    document.getElementById('protected-content').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
  } else {
    document.getElementById('error-message').style.display = 'block';
  }
}

// 允许按Enter键提交
document.getElementById('password-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkPassword();
  }
});
</script>