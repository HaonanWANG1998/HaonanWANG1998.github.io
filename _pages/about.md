---
layout: single
permalink: /
excerpt: "Haonan Wang (王浩楠) — Ph.D. candidate in Electrical Engineering at City University of Hong Kong, working on reconfigurable MIMO, movable/fluid antennas, and optimization for 6G."
author_profile: false
editorial_home: true
news_limit: 4
research_limit: 2
publication_limit: 3
redirect_from: 
  - /about/
  - /about.html
---

<div class="hw-home hw-editorial-home">
  <div class="hw-front-grid">
    <div class="hw-main-column">
      <section class="hw-profile" aria-label="About Haonan Wang">
        <div class="hw-profile-identity">
          <img src="{{ '/images/' | append: site.author.avatar | relative_url }}" alt="Haonan Wang's avatar" width="60" height="60">
          <p>Ph.D. Candidate in Electrical Engineering<br><a href="https://www.cityu.edu.hk/">City University of Hong Kong</a></p>
        </div>
        <p class="hw-intro">I develop optimization frameworks for reconfigurable MIMO, movable and fluid antennas, and next-generation wireless systems. My advisor is <a href="https://www.ee.cityu.edu.hk/~alexyu/" target="_blank" rel="noopener">Prof. Xianghao Yu</a>.</p>
        <p>I welcome discussions and collaborations on these research directions.</p>
        <div class="hw-cta">
          <a class="hw-btn" href="{{ '/files/CV_Haonan_Wang.pdf' | relative_url }}" target="_blank" rel="noopener"><i class="fas fa-fw fa-download" aria-hidden="true"></i> Download CV</a>
          <a class="hw-btn hw-btn--ghost" href="{{ site.author.googlescholar }}" target="_blank" rel="noopener"><i class="ai ai-google-scholar" aria-hidden="true"></i> Scholar</a>
          <a class="hw-btn hw-btn--ghost" href="{{ site.author.orcid }}" target="_blank" rel="noopener"><i class="ai ai-orcid" aria-hidden="true"></i> ORCID</a>
          <a class="hw-btn hw-btn--ghost" href="mailto:{{ site.author.email }}"><i class="fas fa-fw fa-envelope" aria-hidden="true"></i> Email</a>
        </div>
      </section>

      <section aria-labelledby="home-research">
        <div class="hw-section-heading">
          <h2 id="home-research">Research</h2>
          <a href="{{ '/portfolio/' | relative_url }}">All research <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
        <div class="hw-front-research">
          {% assign homeResearch = site.portfolio | sort: 'date' | reverse %}
          {% for post in homeResearch limit:page.research_limit %}
          <article class="hw-research-feature">
            <a href="{{ post.url | relative_url }}">
              {% if post.teaser %}<div class="hw-feature-media"><img src="{{ post.teaser | relative_url }}" alt="Research diagram for {{ post.title | escape }}" loading="lazy"></div>{% endif %}
              <h3>{{ post.title }}</h3>
            </a>
            {% if post.excerpt %}<p>{{ post.excerpt | markdownify | strip_html | strip_newlines }}</p>{% endif %}
          </article>
          {% endfor %}
        </div>
      </section>
    </div>

    <aside class="hw-news-panel" aria-labelledby="home-news">
      <h2 id="home-news">Latest News</h2>
      {% assign latestNews = site.data.news | sort: 'date' | reverse %}
      <ul class="hw-news">
        {% for item in latestNews limit:page.news_limit %}
        <li><time class="date" datetime="{{ item.date }}">{{ item.label }}</time><span class="body">{{ item.content }}</span></li>
        {% endfor %}
      </ul>
      <p class="hw-more"><a href="{{ '/news/' | relative_url }}">All news <i class="fas fa-arrow-right" aria-hidden="true"></i></a></p>
    </aside>
  </div>

  <section class="hw-recent-publications" aria-labelledby="home-publications">
    <div class="hw-section-heading">
      <h2 id="home-publications">Recent Publications</h2>
      <a href="{{ '/publications/' | relative_url }}">All publications <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    </div>
    {% assign recentPublications = site.publications | where: 'category', 'manuscripts' | sort: 'date' | reverse %}
    {% for post in recentPublications limit:page.publication_limit %}
    {% assign pubSlug = post.title | slugify %}
    {% assign scholarPub = site.data.scholar_citations.publications[pubSlug] %}
    <article class="hw-home-publication">
      <span class="hw-publication-index">0{{ forloop.index }}</span>
      <div>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p class="hw-publication-meta">{{ post.venue }} &middot; <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%Y' }}</time></p>
        <div class="hw-links">
          {% if post.paperurl %}<a href="{{ post.paperurl }}" target="_blank" rel="noopener"><i class="fas fa-file-pdf" aria-hidden="true"></i> Paper</a>{% endif %}
          {% if scholarPub %}<a href="{{ scholarPub.url | default: site.author.googlescholar }}" target="_blank" rel="noopener"><i class="ai ai-google-scholar" aria-hidden="true"></i> Cited by {{ scholarPub.citations }}</a>{% endif %}
        </div>
      </div>
    </article>
    {% endfor %}
  </section>

  <div class="hw-background-grid">
    <section aria-labelledby="home-education">
      <h2 id="home-education">Education</h2>
      <ul class="hw-list">
        <li><strong>Ph.D. in Electrical Engineering</strong><span class="year">2024 &ndash; 2028</span><span class="meta">City University of Hong Kong<br>Advisor: <a href="https://www.ee.cityu.edu.hk/~alexyu/" target="_blank" rel="noopener">Prof. Xianghao Yu</a></span></li>
        <li><strong>M.Eng. in Information &amp; Communications Engineering</strong><span class="year">2020 &ndash; 2023</span><span class="meta">Xi'an Jiaotong University<br>Advisor: <a href="https://faculty.xjtu.edu.cn/ang-li/zh_CN/index.htm" target="_blank" rel="noopener">Prof. Ang Li</a></span></li>
        <li><strong>B.Eng. in Information Engineering</strong><span class="year">2016 &ndash; 2020</span><span class="meta">Xi'an Jiaotong University<br>Advisor: <a href="https://dice.xjtu.edu.cn/info/1258/1441.htm" target="_blank" rel="noopener">Dr. Li Sun</a></span></li>
      </ul>
    </section>

    <section aria-labelledby="home-service">
      <h2 id="home-service">Professional Service</h2>
      <h3>Academic Service</h3>
      <ul class="hw-list">
        <li><strong>TPC Member</strong>, Wireless Communications Symposium, IEEE ICC 2027</li>
        <li><strong>Session Chair</strong>, "Novel Antenna Systems I: Movable &amp; Fluid Antennas," IEEE ICC 2026, Glasgow, UK</li>
        <li><strong>TPC Member</strong>, Wireless Communications Symposium, IEEE ICC 2026</li>
        <li><strong>Reviewer</strong>, IEEE JSAC, TCOM, TMC, TSP, Communications Letters, OJ-SP, EURASIP JWCN; IEEE ICC, GLOBECOM, ICCC, ISWCS, WCNC</li>
      </ul>
      <h3>Teaching</h3>
      <ul class="hw-list">
        <li><strong>Teaching Assistant</strong>, EE3008 Principles of Communications<span class="year">Fall 2025 &middot; Spring 2026</span><span class="meta">City University of Hong Kong</span></li>
        <li><strong>Teaching Assistant</strong>, EE5415<span class="year">Fall 2024</span><span class="meta">City University of Hong Kong</span></li>
        <li><strong>Final-Year Project Guider</strong><span class="year">2024/25 &middot; 2025/26</span><span class="meta">City University of Hong Kong</span></li>
      </ul>
    </section>

    <section aria-labelledby="home-honors">
      <h2 id="home-honors">Awards &amp; Honors</h2>
      <ul class="hw-list">
        <li>IEEE ICC 2026 Student Travel Grant<span class="year">2026</span></li>
        <li>Exemplary Reviewer, <i>IEEE Communications Letters</i><span class="year">2022 &middot; 2023 &middot; 2025</span></li>
        <li>China Scholarship Council full Ph.D. scholarship<span class="year">2023</span></li>
        <li>Excellent Postgraduate, Xi'an Jiaotong University<span class="year">2021 &ndash; 2022</span></li>
        <li>Academic Scholarship, Xi'an Jiaotong University<span class="year">2020 &ndash; 2021</span></li>
        <li>Excellent Student, Xi'an Jiaotong University<span class="year">2016 &ndash; 2019</span></li>
        <li>Siyuan Academic Scholarship, Xi'an Jiaotong University<span class="year">2016 &ndash; 2017</span></li>
      </ul>
    </section>
  </div>

  <section id="contact" class="hw-contact" aria-labelledby="home-contact">
    <div>
      <h2 id="home-contact">Contact</h2>
      <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>
    </div>
    <a class="hw-btn hw-btn--ghost" href="{{ '/cv/' | relative_url }}">Full curriculum vitae <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </section>
</div>
