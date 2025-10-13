document.addEventListener('DOMContentLoaded', function() {
    var contentElement = document.querySelector('.page__content');
    if (!contentElement) return;

    // Create TOC container
    var toc = document.createElement('nav');
    toc.className = 'toc';
    
    // Add title
    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = '文章目录';
    toc.appendChild(title);

    // Create TOC content
    var tocList = document.createElement('ul');
    var headings = contentElement.querySelectorAll('h1, h2, h3, h4');
    var tocItems = [];

    headings.forEach(function(heading, index) {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'toc-heading-' + index;
        }

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        a.className = 'toc-' + heading.tagName.toLowerCase();
        
        li.appendChild(a);
        tocList.appendChild(li);
    });

    toc.appendChild(tocList);

    // Insert TOC into page
    var container = document.querySelector('.page');
    if (container) {
        container.appendChild(toc);
    }

    // Highlight current section
    window.addEventListener('scroll', function() {
        var currentHeading = null;
        headings.forEach(function(heading) {
            if (heading.getBoundingClientRect().top <= 100) {
                currentHeading = heading;
            }
        });

        if (currentHeading) {
            tocList.querySelectorAll('a').forEach(function(a) {
                a.style.fontWeight = 'normal';
                if (a.getAttribute('href') === '#' + currentHeading.id) {
                    a.style.fontWeight = 'bold';
                }
            });
        }
    });
});