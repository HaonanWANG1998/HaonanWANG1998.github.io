---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for category in site.publication_category %}
  {% assign categoryKey = category[0] %}
  {% assign categoryValue = category[1] %}
  {% assign categoryPosts = site.publications | where: "category", categoryKey | sort: "date" | reverse %}
  {% if categoryPosts.size > 0 %}
  <h2 class="archive__subtitle">{{ categoryValue.title }}</h2>
  {% for post in categoryPosts %}
    {% include archive-single.html %}
  {% endfor %}
  {% endif %}
{% endfor %}
