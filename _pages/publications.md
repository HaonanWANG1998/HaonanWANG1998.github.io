---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% include base_path %}

<div class="hw-home hw-pubpage">

{% if site.author.googlescholar %}
<p class="hw-note">You can also find my articles on my <a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener">Google Scholar profile</a>.</p>
{% endif %}

{% for category in site.publication_category %}{% assign categoryKey = category[0] %}{% assign categoryValue = category[1] %}{% assign categoryPosts = site.publications | where: "category", categoryKey | sort: "date" | reverse %}{% if categoryPosts.size > 0 %}
<h2>{{ categoryValue.title }}</h2>
{% for post in categoryPosts %}<div class="hw-pub">
  <div class="cite">{{ post.citation }}</div>{% if post.paperurl %}{% assign doi = post.paperurl | remove: "https://doi.org/" | remove: "http://dx.doi.org/" | remove: "https://dx.doi.org/" %}
  <div class="hw-links">
    <a href="{{ post.paperurl }}" target="_blank" rel="noopener">Paper</a>
    <img src="https://api.juleskreuer.eu/citation-badge.php?doi={{ doi }}" alt="citations" loading="lazy">
  </div>{% endif %}
</div>
{% endfor %}{% endif %}{% endfor %}

</div>
