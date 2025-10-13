document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已存在目录（避免与主题自带的TOC冲突）
    if (document.querySelector('.toc-custom')) return;

    var contentElement = document.querySelector('.page__content') || document.querySelector('article');
    if (!contentElement) return;

    // 创建目录容器
    var toc = document.createElement('nav');
    toc.className = 'toc-custom';
    
    // 添加标题和折叠按钮
    var title = document.createElement('div');
    title.className = 'toc-custom-title';
    
    var titleText = document.createElement('span');
    titleText.textContent = '目录';
    title.appendChild(titleText);
    
    var toggleButton = document.createElement('span');
    toggleButton.className = 'toc-toggle';
    title.appendChild(toggleButton);
    
    // 从 localStorage 获取之前的折叠状态
    var isCollapsed = localStorage.getItem('tocCollapsed') === 'true';
    if (isCollapsed) {
        toc.classList.add('collapsed');
    }
    
    // 添加点击事件处理折叠/展开
    title.addEventListener('click', function() {
        toc.classList.toggle('collapsed');
        localStorage.setItem('tocCollapsed', toc.classList.contains('collapsed'));
    });
    
    toc.appendChild(title);

    // 创建目录列表
    var tocList = document.createElement('ul');
    var headings = contentElement.querySelectorAll('h1, h2, h3, h4');
    var tocItems = [];
    var currentLevel = 0;
    var levels = [];

    headings.forEach(function(heading, index) {
        // 为标题添加ID
        if (!heading.id) {
            heading.id = 'toc-' + heading.tagName.toLowerCase() + '-' + index;
        }

        var level = parseInt(heading.tagName.charAt(1));
        
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        a.className = 'toc-' + heading.tagName.toLowerCase();
        
        li.appendChild(a);
        tocList.appendChild(li);
        tocItems.push(a);
    });

    toc.appendChild(tocList);

    // 插入目录到页面
    var container = document.querySelector('.page') || document.body;
    container.appendChild(toc);

    // 滚动监听和高亮
    var headingPositions = [];
    
    function updateHeadingPositions() {
        headingPositions = Array.from(headings).map(function(heading) {
            return {
                id: heading.id,
                top: heading.getBoundingClientRect().top + window.pageYOffset
            };
        });
    }

    updateHeadingPositions();
    window.addEventListener('resize', updateHeadingPositions);

    window.addEventListener('scroll', function() {
        var scrollPosition = window.pageYOffset;
        
        // 找到当前位置对应的标题
        var current = headingPositions.find(function(heading, index) {
            var nextHeading = headingPositions[index + 1];
            if (nextHeading) {
                return scrollPosition >= heading.top - 10 && scrollPosition < nextHeading.top - 10;
            }
            return scrollPosition >= heading.top - 10;
        });

        // 更新高亮
        tocItems.forEach(function(item) {
            item.classList.remove('active');
            if (current && item.getAttribute('href') === '#' + current.id) {
                item.classList.add('active');
            }
        });
    });

    // 平滑滚动
    tocItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').slice(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});