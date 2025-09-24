// J&K Sports Journal - Main Application JavaScript
// Comprehensive sports club website with accessibility, SEO, and interactive features
// --- Loader helpers & safety hooks (paste near top of app.js) ---
(function(){
  if (window.__jk_loader_helpers_installed) return;
  window.__jk_loader_helpers_installed = true;

  window.showLoading = function() {
    try {
      const el = document.querySelector('.loading-indicator');
      if (!el) { console.warn('showLoading: .loading-indicator not found'); return; }
      el.classList.remove('hidden');
      el.style.display = '';
      el.setAttribute('aria-hidden','false');
      console.debug('showLoading called');
    } catch(e){ console.error('showLoading error', e); }
  };

  window.hideLoading = function() {
    try {
      const el = document.querySelector('.loading-indicator');
      if (!el) { console.warn('hideLoading: .loading-indicator not found'); return; }
      el.classList.add('hidden');
      el.style.display = 'none';
      el.setAttribute('aria-hidden','true');
      console.debug('hideLoading called');
    } catch(e){ console.error('hideLoading error', e); }
  };

  // Safety nets
  window.addEventListener('load', () => setTimeout(()=>{ try{ window.hideLoading(); }catch(e){} }, 100));
  window.addEventListener('hashchange', () => { try{ window.hideLoading(); }catch(e){} });
  window.addEventListener('unhandledrejection', (ev) => { console.error('Unhandled promise rejection:', ev.reason); try{ window.hideLoading(); }catch(e){} });
  // last-resort hide after 10s
  setTimeout(()=>{ try{ window.hideLoading(); }catch(e){} }, 10000);
})();

class JKSportsJournal {
    constructor() {
        this.data = this.initializeData();
        this.currentPage = 'home';
        this.searchResults = [];
        this.init();
    }

    initializeData() {
        return {
            "organization": {
                "name": "J&K Sports Journal",
                "description": "Premier sports club fostering athletic excellence and community engagement in Jammu & Kashmir",
                "founded": "1995",
                "location": "Jammu & Kashmir, India",
                "sports": ["Cricket", "Football", "Basketball", "Athletics"],
                "contact": {
                    "email": "info@jksportsjournal.com",
                    "phone": "+91-194-2345678",
                    "address": "Sports Complex, Rajouri Gardens, Jammu 180001"
                },
                "social": {
                    "facebook": "https://facebook.com/jksportsjournal",
                    "twitter": "https://twitter.com/jksportsjournal",
                    "instagram": "https://instagram.com/jksportsjournal",
                    "youtube": "https://youtube.com/jksportsjournal"
                }
            },



           "news": [],

            
            "fixtures": [],




            "teams": [],



            "staff": [],



            "sponsors": [],



            "training_schedule": [],



            "membership_tiers": []



        };
    }
    
// Fetch news from Supabase and map DB fields to the format expected by the app
async fetchNewsFromSupabase() {
  try {
    if (!window.supabase) {
      console.warn('Supabase client not found on window. Skipping remote fetch.');
      return;
    }

    // adjust column names if you used different names in your table
    const { data, error } = await window.supabase
      .from('news')
      .select('id, title, slug, summary, content, "featuredImage", author, "datePublished", tags')
      .order('"datePublished"', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Supabase fetch error:', error);
      return;
    }

    if (!data) {
      this.data.news = [];
      return;
    }

    // map DB rows to the object shape your app expects
    this.data.news = data.map(item => ({
      id: item.id,
      title: item.title || 'Untitled',
      slug: item.slug || (item.title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g,''),
      summary: item.summary || ((item.content || '').slice(0,200)),
      content: item.content || '',
      author: item.author || 'Sports Desk',
      datePublished: item.datePublished || item.created_at || new Date().toISOString(),
      featuredImage: item.featuredImage || item.featured_image || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=400&fit=crop',
      tags: item.tags || []
    }));
  } catch (e) {
    console.error('fetchNewsFromSupabase failed', e);
  }
}
async fetchTeamsFromSupabase() {
  try {
    if (!window.supabase) {
      console.warn('Supabase client not found on window. Skipping teams fetch.');
      return;
    }

    const { data, error } = await window.supabase
      .from('teams')
      .select('id, name, short_name, logo_url, description, founded, coach, stadium, created_at')
      .order('id', { ascending: true })
      .limit(100);

    if (error) {
      console.error('Supabase teams fetch error:', error);
      this.data.teams = [];
      return;
    }

    if (!data) {
      this.data.teams = [];
      return;
    }

    // Map DB rows to the shape your app expects
    this.data.teams = data.map(t => ({
      id: t.id,
      name: t.name || 'Team',
      shortName: t.short_name || (t.name || '').split(' ')[0],
      logo: t.logo_url || '',
      description: t.description || '',
      founded: t.founded || null,
      coach: t.coach || '',
      stadium: t.stadium || ''
    }));

    // If your app has a function to re-render the current page, call it.
    // Example: this.loadPage && this.loadPage('teams'); // adjust if your method name differs
  } catch (e) {
    console.error('fetchTeamsFromSupabase failed', e);
    this.data.teams = [];
  }
}

   
init() {
  this.bindEvents();
  this.initializeRouter();
  this.setupAccessibility();

  this.loadInitialPage();

  const teamsContainer = document.getElementById('teams-container');
  if (teamsContainer) teamsContainer.innerHTML = '<p>Loading teams...</p>';

  if (typeof this.fetchTeamsFromSupabase === 'function') {
    this.fetchTeamsFromSupabase()
      .then(teams => {
        console.log('Teams fetched:', teams); // debug log
        if (teams && teams.length && teamsContainer) {
          teamsContainer.innerHTML = this.renderTeams 
            ? this.renderTeams(teams) 
            : `<pre>${JSON.stringify(teams, null, 2)}</pre>`; // fallback
        } else if (teamsContainer) {
          teamsContainer.innerHTML = '<p>No teams found.</p>';
        }
      })
      .catch(err => {
        console.warn('Teams fetch error:', err);
        if (teamsContainer) teamsContainer.innerHTML = '<p>Error loading teams.</p>';
      });
  }

  if (typeof this.fetchNewsFromSupabase === 'function') {
    this.fetchNewsFromSupabase()
      .then(news => console.log('News fetched:', news))
      .catch(err => console.warn('News fetch error:', err));
  }
}




    bindEvents() {
        // Navigation events - Use event delegation to handle all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('href').slice(1);
                if (page) {
                    this.loadPage(page);
                }
            }
        });
        
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Search functionality
        const searchToggle = document.querySelector('.search-toggle');
        const searchInput = document.querySelector('.search-input');
        const searchSubmit = document.querySelector('.search-submit');
        
        if (searchToggle) {
            searchToggle.addEventListener('click', this.toggleSearch.bind(this));
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearchInput.bind(this));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        if (searchSubmit) {
            searchSubmit.addEventListener('click', this.performSearch.bind(this));
        }

        // Forms
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', this.scrollToTop.bind(this));
        }

        // Modal handling
        document.addEventListener('click', this.handleModalEvents.bind(this));
        document.addEventListener('keydown', this.handleKeyboardEvents.bind(this));

        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

initializeRouter() {
    // Handle browser back/forward (history)
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            this.loadPage(e.state.page, false);
        }
    });

    // Enhanced parser to handle article routes
    const parseHash = () => {
        const raw = (window.location.hash || '#home').slice(1); // Remove the #
        console.log('parseHash raw:', raw); // DEBUG
        
        const parts = raw.split('/').filter(Boolean);
        console.log('parseHash parts:', parts); // DEBUG
        
        if (parts.length === 0) return { page: 'home', slug: null, articleId: null };
        
        // Handle article routes: #article/123
        if (parts[0] === 'article' && parts.length >= 2) {
            console.log('Found article route, ID:', parts[1]); // DEBUG
            return { page: 'article', articleId: parts[1], slug: null };
        }
        
        // Handle news with article routes: #news/article/123  
        if (parts[0] === 'news' && parts.length >= 3 && parts[1] === 'article') {
            console.log('Found news article route, ID:', parts[2]); // DEBUG
            return { page: 'article', articleId: parts[2], slug: null };
        }
        
        // Handle news with slug: #news/my-article-slug
        if (parts[0] === 'news' && parts.length >= 2) {
            console.log('Found news slug route:', parts.slice(1).join('/')); // DEBUG
            return { page: 'news', slug: decodeURIComponent(parts.slice(1).join('/')), articleId: null };
        }
        
        console.log('Standard page route:', parts[0]); // DEBUG
        return { page: parts[0], slug: null, articleId: null };
    };

    // Handle initial hash
    const parsed = parseHash();
    console.log('Initial parsed:', parsed); // DEBUG
    this.currentSlug = parsed.slug || null;
    this.currentArticleId = parsed.articleId || null;
    this.currentPage = parsed.page || 'home';

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const p = parseHash();
        console.log('Hash changed, parsed:', p); // DEBUG
        this.currentSlug = p.slug || null;
        this.currentArticleId = p.articleId || null;
        this.loadPage(p.page || 'home', true);
    }, false);
}



    setupAccessibility() {
        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#main-content');
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Ensure proper focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });
    }

  loadInitialPage() {
        this.loadPage(this.currentPage, false);
    }


    loadPage(page, updateHistory = true) {
        this.showLoading();
        
        // Clean page name (remove any extra characters)
        const cleanPage = page.toLowerCase().trim();
        
        // Update current page
        this.currentPage = cleanPage;
        
        // Update navigation state
        this.updateNavigationState(cleanPage);
        
        // Update breadcrumbs
        this.updateBreadcrumbs(cleanPage);
        
        // Load page content
        setTimeout(() => {
            this.renderPageContent(cleanPage);
            this.updateMetaTags(cleanPage);
            this.updateStructuredData(cleanPage);
            this.hideLoading();
            
            // Update browser history
            if (updateHistory) {
                history.pushState({ page: cleanPage }, '', `#${cleanPage}`);
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Close mobile menu if open
            this.closeMobileMenu();
        }, 300);
    }

    updateNavigationState(page) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page links
        document.querySelectorAll(`a[href="#${page}"]`).forEach(link => {
            link.classList.add('active');
        });
    }

    updateBreadcrumbs(page) {
        const breadcrumbList = document.getElementById('breadcrumb-list');
        if (!breadcrumbList) return;

        const pageMap = {
            'home': 'Home',
            'news': 'News',
            'fixtures': 'Fixtures & Results',
            'teams': 'Teams',
            'membership': 'Membership',
            'gallery': 'Gallery',
            'about': 'About Us',
            'contact': 'Contact',
            'training': 'Training Schedule',
            'coaches': 'Coaches & Staff',
            'sponsors': 'Sponsors & Partners',
            'faq': 'FAQ',
            'policies': 'Policies',
            'press-kit': 'Press Kit'
        };

        let breadcrumbHTML = '<li class="breadcrumb__item"><a href="#home">Home</a></li>';
        
        if (page !== 'home') {
            breadcrumbHTML += `<li class="breadcrumb__item">${pageMap[page] || page}</li>`;
        }

        breadcrumbList.innerHTML = breadcrumbHTML;
    }

  renderPageContent(page) {
    console.log('=== DEBUG renderPageContent ===');
    console.log('page:', page);
    console.log('currentArticleId:', this.currentArticleId);
    console.log('currentSlug:', this.currentSlug);
    console.log('URL hash:', window.location.hash);
    console.log('================================');
    
    const contentContainer = document.getElementById('page-content');
    let content = '';
    
    // DIRECT HASH HANDLING - Extract article ID from URL if needed
    const hash = window.location.hash;
    const articleMatch = hash.match(/#article\/(\d+)/);
    
    if (articleMatch) {
        console.log('Direct hash match found, article ID:', articleMatch[1]);
        this.currentArticleId = articleMatch[1];
        page = 'article'; // Force page to be 'article'
    }
    
    // Only handle news with slug if it's actually a news page with slug
    if (page === 'news' && this.currentSlug && !this.currentArticleId) {
        console.log('Rendering news article by slug');
        this.renderNewsArticle(this.currentSlug);
        return;
    }

    switch (page) {
        case 'home':
            console.log('Rendering home page');
            this.renderHomePage().then(homeContent => {
                contentContainer.innerHTML = homeContent;
                this.bindDynamicEvents();
            });
            return;
        case 'news':
            console.log('Rendering news page');
            this.renderNewsPage().then(newsContent => {
                contentContainer.innerHTML = newsContent;
                this.bindDynamicEvents();
            });
            return;
        case 'article':
            console.log('Rendering article page with ID:', this.currentArticleId);
            this.renderArticlePage().then(articleContent => {
                document.getElementById('page-content').innerHTML = articleContent;
                this.bindDynamicEvents();
            });
            return;
        case 'fixtures':
            console.log('Rendering fixtures page');
            content = this.renderFixturesPage();
            break;
        case 'teams':
            console.log('Rendering teams page');
            content = this.renderTeamsPage();
            break;
        case 'membership':
            console.log('Rendering membership page');
            content = this.renderMembershipPage();
            break;
        case 'gallery':
            console.log('Rendering gallery page');
            content = this.renderGalleryPage();
            break;
        case 'about':
            console.log('Rendering about page');
            content = this.renderAboutPage();
            break;
        case 'contact':
            console.log('Rendering contact page');
            content = this.renderContactPage();
            break;
        case 'training':
            console.log('Rendering training page');
            content = this.renderTrainingPage();
            break;
        case 'coaches':
            console.log('Rendering coaches page');
            content = this.renderCoachesPage();
            break;
        case 'sponsors':
            console.log('Rendering sponsors page');
            content = this.renderSponsorsPage();
            break;
        case 'faq':
            console.log('Rendering FAQ page');
            content = this.renderFAQPage();
            break;
        case 'policies':
            console.log('Rendering policies page');
            content = this.renderPoliciesPage();
            break;
        case 'press-kit':
            console.log('Rendering press-kit page');
            content = this.renderPressKitPage();
            break;
        default:
            // Handle cases where page comes as "article/1" instead of just "article"
            if (page.startsWith('article/')) {
                console.log('Handling article route in default case:', page);
                const articleId = page.split('/')[1];
                this.currentArticleId = articleId;
                this.renderArticlePage().then(articleContent => {
                    document.getElementById('page-content').innerHTML = articleContent;
                    this.bindDynamicEvents();
                });
                return;
            }
            
            console.log('DEFAULT CASE - showing 404 for page:', page);
            content = this.render404Page();
    }
    
    contentContainer.innerHTML = content;
    this.bindDynamicEvents();
}


   async renderHomePage() {
    // Show loading
    this.showLoading();
    
    try {
        // Make sure news is loaded first
        if (!this.data.news || this.data.news.length === 0) {
            await this.fetchNewsFromSupabase();
        }
        
        const content = `
            <div class="hero">
                <div class="container">
                    <div class="hero__content">
                        <h1 class="hero__title">Welcome to J&K Sports Journal</h1>
                        <p class="hero__subtitle">Premier sports club fostering athletic excellence and community engagement in Jammu & Kashmir</p>
                        <div class="hero__cta">
                            <a href="#membership" class="btn btn--primary btn--lg">Join Our Club</a>
                            <a href="#about" class="btn btn--outline btn--lg">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h2 class="section__title">Latest News</h2>
                        <p class="section__subtitle">Stay updated with our latest achievements and announcements</p>
                    </div>
                    <div class="card-grid">
                        ${this.data.news && this.data.news.length ? 
                            this.data.news.slice(0, 3).map(article => this.renderNewsCard(article)).join('') :
                            '<p>Loading news...</p>'
                        }
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <a href="#news" class="btn btn--outline">View All News</a>
                    </div>
                </div>
            </section>
            
            <section class="section section--alt">
                <div class="container">
                    <div class="section__header">
                        <h2 class="section__title">Upcoming Fixtures</h2>
                        <p class="section__subtitle">Don't miss our upcoming matches and events</p>
                    </div>
                    <div class="card-grid">
                        ${this.data.fixtures.map(fixture => this.renderFixtureCard(fixture)).join('')}
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <a href="#fixtures" class="btn btn--outline">View All Fixtures</a>
                    </div>
                </div>
            </section>
            
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h2 class="section__title">Our Teams</h2>
                        <p class="section__subtitle">Meet our competitive teams across various sports</p>
                    </div>
                    <div class="card-grid">
                        ${this.data.teams.map(team => this.renderTeamCard(team)).join('')}
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <a href="#teams" class="btn btn--outline">View All Teams</a>
                    </div>
                </div>
            </section>
            
            <section class="section section--alt">
                <div class="container">
                    <div class="section__header">
                        <h2 class="section__title">Our Sponsors</h2>
                        <p class="section__subtitle">Proudly supported by our valued partners</p>
                    </div>
                    <div class="sponsor-grid">
                        ${this.data.sponsors.map(sponsor => this.renderSponsorCard(sponsor)).join('')}
                    </div>
                </div>
            </section>
        `;
        
        this.hideLoading();
        return content;
        
    } catch (error) {
        console.error('Error rendering home page:', error);
        this.hideLoading();
        return `<div class="container"><p>Error loading content. Please refresh the page.</p></div>`;
    }
}


    async renderNewsPage() {
    // Show loading
    this.showLoading();
    
    try {
        // Make sure news is loaded first
        if (!this.data.news || this.data.news.length === 0) {
            await this.fetchNewsFromSupabase();
        }
        
        const content = `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Latest News</h1>
                        <p class="section__subtitle">Stay informed with the latest updates from J&K Sports Journal</p>
                    </div>
                    
                    <div class="filters-section" style="margin-bottom: 2rem;">
                        <div class="search-filters">
                            <input type="text" class="form-control" placeholder="Search news articles..." id="news-search" style="max-width: 300px; display: inline-block; margin-right: 1rem;">
                            <select class="form-control" id="news-filter" style="max-width: 200px; display: inline-block;">
                                <option value="">All Categories</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Football">Football</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Athletics">Athletics</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="card-grid" id="news-grid">
                        ${this.data.news && this.data.news.length ? 
                            this.data.news.map(article => this.renderNewsCard(article, true)).join('') :
                            '<p>No news articles available.</p>'
                        }
                    </div>
                </div>
            </section>
        `;
        
        this.hideLoading();
        return content;
        
    } catch (error) {
        console.error('Error rendering news page:', error);
        this.hideLoading();
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Latest News</h1>
                        <p style="color: red;">Error loading news articles. Please try again later.</p>
                    </div>
                </div>
            </section>
        `;
    }
}

filterNewsByCategory(category) {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    let filteredNews = this.data.news;
    
    if (category && category !== '') {
        // Filter by category - check if article tags include the category
        filteredNews = this.data.news.filter(article => {
            if (!article.tags) return false;
            
            // Handle both array and string tags
            const tags = Array.isArray(article.tags) ? article.tags : 
                        typeof article.tags === 'string' ? article.tags.split(',').map(t => t.trim()) : [];
            
            return tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()));
        });
    }
    
    // Re-render the filtered news
    newsGrid.innerHTML = filteredNews.length ? 
        filteredNews.map(article => this.renderNewsCard(article, true)).join('') :
        '<p>No articles found in this category.</p>';
}

// Render a single news article by slug (replace page-content with only this article)
async renderNewsArticle(slug) {
  const container = document.getElementById('page-content');
  if (!container) {
    console.error('page-content container not found');
    return;
  }
  const loadingEl = document.querySelector('.loading-indicator');
  if (loadingEl) loadingEl.classList.remove('hidden');

  try {
    const { data: article, error } = await window.supabase
      .from('news')
      .select('id, title, slug, summary, content, "featuredImage", featured_image, author, author_name, "datePublished", published_at, created_at, tags')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase error fetching article:', error);
      container.innerHTML = `<div class="article-error"><p>Unable to load the article. See console for details.</p><p><a href="#/news">Back to News</a></p></div>`;
      return;
    }
    if (!article) {
      container.innerHTML = `<div class="article-notfound"><h2>Article not found</h2><p>The article "${slug}" does not exist.</p><p><a href="#/news">Back to News</a></p></div>`;
      return;
    }

    const imgPath = article.featuredImage || article.featured_image || '';
    let imgHtml = '';
    if (imgPath) {
      if (imgPath.startsWith('http')) {
        imgHtml = `<img src="${imgPath}" alt="${(article.title||'')}" class="article-featured" loading="lazy">`;
      } else {
        try {
          const publicUrlObj = window.supabase.storage.from('news-images').getPublicUrl(imgPath);
          const publicUrl = publicUrlObj?.data?.publicUrl || '';
          imgHtml = publicUrl ? `<img src="${publicUrl}" alt="${(article.title||'')}" class="article-featured" loading="lazy">` : '';
        } catch (e) {
          console.warn('Could not get public URL for image', e);
        }
      }
    }

    const author = article.author_name || article.author || 'Sports Desk';
    const published = article.published_at || article.datePublished || article.created_at || null;
    const publishedStr = published ? new Date(published).toLocaleString() : '';

    container.innerHTML = `
      <article class="news-article">
        <div class="container">
          <a href="#/news" class="back-link">← Back to News</a>
          <h1 class="article-title">${article.title || 'Untitled'}</h1>
          <div class="article-meta">By ${author}${publishedStr ? ' • ' + publishedStr : ''}</div>
          ${imgHtml}
          <div class="article-body">${article.content || article.summary || ''}</div>
          <div class="article-footer" style="margin-top:2rem;">
            <a href="#/news" class="btn">← Back to News</a>
          </div>
        </div>
      </article>
    `;

    // Update breadcrumb if present
    const bc = document.getElementById('breadcrumb-list');
    if (bc) {
      bc.innerHTML = `<li class="breadcrumb__item"><a href="#home">Home</a></li>
                      <li class="breadcrumb__item"><a href="#/news">News</a></li>
                      <li class="breadcrumb__item" aria-current="page">${article.title || slug}</li>`;
    }

    try { document.title = `${article.title || 'Article'} — J&K Sports Journal`; } catch(e) {}
  } catch (e) {
    console.error('renderNewsArticle exception', e);
    container.innerHTML = `<p>Error loading article.</p>`;
  } finally {
    if (loadingEl) loadingEl.classList.add('hidden');
  }
}
async renderArticlePage() {
    try {
        const loadingEl = document.querySelector('.loading-indicator');
        if (loadingEl) loadingEl.classList.remove('hidden');

        // FORCE extract article ID from URL if currentArticleId is not set
        let articleId = this.currentArticleId;
        
        if (!articleId) {
            // Extract directly from URL hash
            const hash = window.location.hash; // e.g. "#article/123"
            const match = hash.match(/#article\/(\d+)/);
            if (match) {
                articleId = match[1];
                console.log('Extracted articleId from URL:', articleId);
            }
        }
        
        console.log('Looking for article with ID:', articleId);
        
        if (!articleId) {
            console.log('No article ID found');
            return this.render404Page();
        }

        // Fetch news from Supabase if not already loaded
        if (!this.data.news || this.data.news.length === 0) {
            await this.fetchNewsFromSupabase();
        }

        console.log('Available news articles:', this.data.news.map(a => ({id: a.id, title: a.title})));

        // Find the article by ID (convert both to string for comparison)
        const article = this.data.news.find(a => String(a.id) === String(articleId));
        
        if (!article) {
            console.log('Article not found with ID:', articleId);
            return this.render404Page();
        }

        console.log('Found article:', article.title);

        // Try to fetch full content from news_articles table
        let fullContent = article.content || article.summary;
        
        if (window.supabase && article.id) {
            try {
                const { data: articleData, error } = await window.supabase
                    .from('news_articles')
                    .select('content')
                    .eq('news_id', article.id)
                    .single();
                
                if (!error && articleData && articleData.content) {
                    fullContent = articleData.content;
                    console.log('Found detailed content in news_articles table');
                }
            } catch (err) {
                console.log('No detailed content found in news_articles table, using summary');
            }
        }

        const content = `
            <article class="section">
                <div class="container" style="max-width: 800px;">
                    <div class="breadcrumb" style="margin-bottom: 2rem;">
                        <a href="#news">← Back to All News</a>
                    </div>
                    
                    ${article.featuredImage ? `
                        <img src="${article.featuredImage}" 
                             alt="${article.title}" 
                             style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    ` : ''}
                    
                    <div class="article-header" style="margin-bottom: 2rem;">
                        <h1 style="margin-bottom: 1rem; font-size: 2.5rem; line-height: 1.2;">${article.title}</h1>
                        
                        <div class="article-meta" style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 1rem;">
                            <time datetime="${article.datePublished}">${this.formatDate(article.datePublished)}</time>
                            ${article.author ? `<span> • By ${article.author}</span>` : ''}
                        </div>
                        
                        ${article.tags && article.tags.length ? `
                            <div class="tags" style="margin-bottom: 1rem;">
                                ${article.tags.map(tag => `<span class="tag" style="background: var(--color-primary); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem; margin-right: 0.5rem;">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="article-content" style="line-height: 1.8; font-size: 1.1rem;">
                        ${this.formatArticleContent(fullContent)}
                    </div>
                    
                    <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
                        <a href="#news" class="btn btn--outline">← Back to All News</a>
                    </div>
                </div>
            </article>
        `;

        this.hideLoading();
        return content;

    } catch (error) {
        console.error('Error rendering article:', error);
        this.hideLoading();
        return this.render404Page();
    }
}


// Helper method to format article content
formatArticleContent(content) {
    if (!content) return '<p>No content available.</p>';
    
    // Convert line breaks to paragraphs
    const paragraphs = content.split('\n').filter(p => p.trim());
    return paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
}

    renderFixturesPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Fixtures & Results</h1>
                        <p class="section__subtitle">View upcoming matches and recent results</p>
                    </div>
                    
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Match</th>
                                    <th>Sport</th>
                                    <th>Venue</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.data.fixtures.map(fixture => `
                                    <tr>
                                        <td>${this.formatDate(fixture.startDate)}</td>
                                        <td>${fixture.homeTeam} vs ${fixture.awayTeam}</td>
                                        <td>${fixture.sport}</td>
                                        <td>${fixture.location}</td>
                                        <td><span class="status status--info">${fixture.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="card-grid" style="margin-top: 2rem;">
                        ${this.data.fixtures.map(fixture => this.renderFixtureCard(fixture, true)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderTeamsPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Our Teams</h1>
                        <p class="section__subtitle">Discover our competitive teams across various sports and age categories</p>
                    </div>
                    
                    <div class="card-grid">
                        ${this.data.teams.map(team => this.renderTeamCard(team, true)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderMembershipPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Join J&K Sports Journal</h1>
                        <p class="section__subtitle">Become part of our sporting community and unlock your potential</p>
                    </div>
                    
                    <div class="card-grid">
                        ${this.data.membership_tiers.map(tier => `
                            <div class="card">
                                <div class="card__content">
                                    <h3 class="card__title">${tier.name}</h3>
                                    <div style="font-size: 2rem; font-weight: bold; color: var(--color-navy-primary); margin: 1rem 0;">
                                        ${tier.price}
                                    </div>
                                    <p style="margin-bottom: 1rem; color: var(--color-text-secondary);">
                                        ${tier.ageLimit}
                                    </p>
                                    <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                                        ${tier.benefits.map(benefit => `
                                            <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--color-border);">
                                                ✓ ${benefit}
                                            </li>
                                        `).join('')}
                                    </ul>
                                    <button class="btn btn--primary btn--full-width membership-apply" data-tier="${tier.name}">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="text-align: center; margin-top: 3rem;">
                        <h3>Ready to Join?</h3>
                        <p>Contact us for more information or to schedule a visit</p>
                        <a href="#contact" class="btn btn--outline btn--lg">Contact Us</a>
                    </div>
                </div>
            </section>
        `;
    }

    renderGalleryPage() {
        const galleryImages = [
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
        ];
        
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Gallery</h1>
                        <p class="section__subtitle">Capturing moments of excellence and team spirit</p>
                    </div>
                    
                    <div class="card-grid">
                        ${galleryImages.map((image, index) => `
                            <div class="card gallery-item" data-image="${image}">
                                <img src="${image}" alt="Gallery image ${index + 1}" class="card__image" style="height: 250px; cursor: pointer;">
                                <div class="card__content">
                                    <h3 class="card__title">Sports Action ${index + 1}</h3>
                                    <p class="card__excerpt">Memorable moments from our training sessions and competitions.</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderAboutPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">About J&K Sports Journal</h1>
                        <p class="section__subtitle">Premier sports club fostering athletic excellence since 1995</p>
                    </div>
                    
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div class="card">
                            <div class="card__content">
                                <h2>Our Mission</h2>
                                <p>At J&K Sports Journal, we are dedicated to fostering athletic excellence and community engagement throughout Jammu & Kashmir. Since our founding in 1995, we have been committed to providing world-class training facilities and professional coaching across multiple sports disciplines.</p>
                                
                                <h2>Our History</h2>
                                <p>Founded in 1995, J&K Sports Journal has grown from a small local club to become the premier sports institution in the region. Over the years, we have produced numerous state and national champions, while maintaining our commitment to grassroots development and community engagement.</p>
                                
                                <h2>Sports We Offer</h2>
                                <div class="tags">
                                    ${this.data.organization.sports.map(sport => `<span class="tag">${sport}</span>`).join('')}
                                </div>
                                
                                <h2>Our Facilities</h2>
                                <ul>
                                    <li>Multiple cricket grounds with professional pitches</li>
                                    <li>FIFA-standard football fields</li>
                                    <li>Indoor basketball courts</li>
                                    <li>Athletics track and field facilities</li>
                                    <li>State-of-the-art gymnasium</li>
                                    <li>Sports medicine and physiotherapy center</li>
                                </ul>
                                
                                <h2>Contact Information</h2>
                                <p><strong>Address:</strong> ${this.data.organization.contact.address}</p>
                                <p><strong>Phone:</strong> ${this.data.organization.contact.phone}</p>
                                <p><strong>Email:</strong> ${this.data.organization.contact.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderContactPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Contact Us</h1>
                        <p class="section__subtitle">Get in touch with our team</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                        <div class="card">
                            <div class="card__content">
                                <h3>Send us a Message</h3>
                                <form id="contact-form" novalidate>
                                    <div class="form-group">
                                        <label for="name" class="form-label">Name *</label>
                                        <input type="text" id="name" name="name" class="form-control" required>
                                        <div class="form-error" id="name-error"></div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email" class="form-label">Email *</label>
                                        <input type="email" id="email" name="email" class="form-control" required>
                                        <div class="form-error" id="email-error"></div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="subject" class="form-label">Subject *</label>
                                        <select id="subject" name="subject" class="form-control" required>
                                            <option value="">Select a subject</option>
                                            <option value="membership">Membership Inquiry</option>
                                            <option value="training">Training Programs</option>
                                            <option value="facilities">Facilities</option>
                                            <option value="events">Events & Fixtures</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div class="form-error" id="subject-error"></div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="message" class="form-label">Message *</label>
                                        <textarea id="message" name="message" rows="5" class="form-control" required></textarea>
                                        <div class="form-error" id="message-error"></div>
                                    </div>
                                    
                                    <button type="submit" class="btn btn--primary btn--full-width">Send Message</button>
                                </form>
                            </div>
                        </div>
                        
                        <div>
                            <div class="card">
                                <div class="card__content">
                                    <h3>Contact Information</h3>
                                    <p><strong>Address:</strong><br>${this.data.organization.contact.address}</p>
                                    <p><strong>Phone:</strong><br>${this.data.organization.contact.phone}</p>
                                    <p><strong>Email:</strong><br>${this.data.organization.contact.email}</p>
                                </div>
                            </div>
                            
                            <div class="card" style="margin-top: 1rem;">
                                <div class="card__content">
                                    <h3>Office Hours</h3>
                                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                                    <p><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
                                    <p><strong>Sunday:</strong> 10:00 AM - 2:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderTrainingPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Training Schedule</h1>
                        <p class="section__subtitle">Professional coaching sessions for all skill levels</p>
                    </div>
                    
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Activity</th>
                                    <th>Location</th>
                                    <th>Coach</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.data.training_schedule.map(session => `
                                    <tr>
                                        <td><strong>${session.day}</strong></td>
                                        <td>${session.time}</td>
                                        <td>${session.activity}</td>
                                        <td>${session.location}</td>
                                        <td>${session.coach}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style="text-align: center; margin-top: 2rem;">
                        <p>Interested in joining our training programs?</p>
                        <a href="#membership" class="btn btn--primary btn--lg">Become a Member</a>
                    </div>
                </div>
            </section>
        `;
    }

    renderCoachesPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Coaches & Staff</h1>
                        <p class="section__subtitle">Meet our professional coaching team</p>
                    </div>
                    
                    <div class="card-grid">
                        ${this.data.staff.map(staff => this.renderStaffCard(staff)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderSponsorsPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Sponsors & Partners</h1>
                        <p class="section__subtitle">We are proud to be supported by these valued partners</p>
                    </div>
                    
                    <div class="sponsor-grid">
                        ${this.data.sponsors.map(sponsor => this.renderSponsorCard(sponsor, true)).join('')}
                    </div>
                    
                    <div style="text-align: center; margin-top: 3rem;">
                        <h3>Interested in Partnering with Us?</h3>
                        <p>Join our community of sponsors and help support local sports development</p>
                        <a href="#contact" class="btn btn--primary btn--lg">Contact Us</a>
                    </div>
                </div>
            </section>
        `;
    }

    renderFAQPage() {
        const faqsByCategory = this.data.faqs.reduce((acc, faq) => {
            if (!acc[faq.category]) {
                acc[faq.category] = [];
            }
            acc[faq.category].push(faq);
            return acc;
        }, {});

        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Frequently Asked Questions</h1>
                        <p class="section__subtitle">Find answers to common questions about our club</p>
                    </div>
                    
                    <div style="max-width: 800px; margin: 0 auto;">
                        ${Object.entries(faqsByCategory).map(([category, faqs]) => `
                            <div class="card" style="margin-bottom: 2rem;">
                                <div class="card__content">
                                    <h2>${category}</h2>
                                    ${faqs.map((faq, index) => `
                                        <div class="faq-item" style="border-bottom: 1px solid var(--color-border); padding: 1rem 0;">
                                            <button class="faq-question" style="width: 100%; text-align: left; background: none; border: none; font-weight: 600; cursor: pointer; padding: 0.5rem 0;" 
                                                    aria-expanded="false" aria-controls="faq-answer-${category}-${index}">
                                                ${faq.question}
                                                <span style="float: right;">+</span>
                                            </button>
                                            <div class="faq-answer hidden" id="faq-answer-${category}-${index}" style="padding-top: 1rem; color: var(--color-text-secondary);">
                                                ${faq.answer}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="text-align: center; margin-top: 2rem;">
                        <p>Can't find what you're looking for?</p>
                        <a href="#contact" class="btn btn--outline">Contact Us</a>
                    </div>
                </div>
            </section>
        `;
    }

    renderPoliciesPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Policies</h1>
                        <p class="section__subtitle">Privacy Policy and Terms of Service</p>
                    </div>
                    
                    <div style="max-width: 800px; margin: 0 auto;">
                        <div class="card">
                            <div class="card__content">
                                <h2>Privacy Policy</h2>
                                <p><strong>Last updated: September 2024</strong></p>
                                
                                <h3>Information We Collect</h3>
                                <p>We collect information you provide directly to us, such as when you register for membership, sign up for newsletters, or contact us.</p>
                                
                                <h3>How We Use Your Information</h3>
                                <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</p>
                                
                                <h3>Information Sharing</h3>
                                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                                
                                <h3>Data Security</h3>
                                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                            </div>
                        </div>
                        
                        <div class="card" style="margin-top: 2rem;">
                            <div class="card__content">
                                <h2>Terms of Service</h2>
                                <p><strong>Last updated: September 2024</strong></p>
                                
                                <h3>Membership Terms</h3>
                                <p>Membership is subject to approval and payment of applicable fees. Members must abide by club rules and regulations.</p>
                                
                                <h3>Facility Usage</h3>
                                <p>All facilities must be used in accordance with posted rules and regulations. Members are responsible for any damage caused by their actions.</p>
                                
                                <h3>Code of Conduct</h3>
                                <p>Members are expected to maintain appropriate behavior and respect for other members, staff, and facilities at all times.</p>
                                
                                <h3>Liability</h3>
                                <p>Members participate in activities at their own risk. The club is not liable for injuries or losses except where required by law.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderPressKitPage() {
        return `
            <section class="section">
                <div class="container">
                    <div class="section__header">
                        <h1 class="section__title">Press Kit</h1>
                        <p class="section__subtitle">Media resources and brand guidelines</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div class="card">
                            <div class="card__content">
                                <h3>Brand Assets</h3>
                                <ul>
                                    <li><a href="#" class="card__link">Logo Package (PNG, SVG)</a></li>
                                    <li><a href="#" class="card__link">Brand Guidelines PDF</a></li>
                                    <li><a href="#" class="card__link">Team Photos</a></li>
                                    <li><a href="#" class="card__link">Facility Images</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card__content">
                                <h3>Media Contact</h3>
                                <p><strong>Media Relations Officer</strong><br>
                                Sarah Johnson<br>
                                Phone: +91-194-2345679<br>
                                Email: media@jksportsjournal.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card" style="margin-top: 2rem;">
                        <div class="card__content">
                            <h3>About J&K Sports Journal</h3>
                            <p><strong>Boilerplate:</strong></p>
                            <p>J&K Sports Journal is the premier sports club in Jammu & Kashmir, founded in 1995. We offer professional training and competition opportunities in cricket, football, basketball, and athletics. With state-of-the-art facilities and experienced coaching staff, we are committed to developing athletic talent and fostering community engagement through sports.</p>
                            
                            <h4>Key Facts:</h4>
                            <ul>
                                <li>Founded: 1995</li>
                                <li>Location: Jammu & Kashmir, India</li>
                                <li>Sports: Cricket, Football, Basketball, Athletics</li>
                                <li>Members: 500+</li>
                                <li>Championships: 15+ state titles</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    render404Page() {
        return `
            <section class="section">
                <div class="container">
                    <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                        <h1 style="font-size: 4rem; margin-bottom: 1rem;">404</h1>
                        <h2>Page Not Found</h2>
                        <p style="margin: 2rem 0;">The page you're looking for doesn't exist or has been moved.</p>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
                            <a href="#home" class="btn btn--primary">Go Home</a>
                            <a href="#news" class="btn btn--outline">Latest News</a>
                            <a href="#contact" class="btn btn--outline">Contact Us</a>
                        </div>
                        
                        <div style="margin-top: 3rem;">
                            <h3>Popular Pages</h3>
                            <ul style="list-style: none; padding: 0;">
                                <li><a href="#fixtures" class="card__link">Fixtures & Results</a></li>
                                <li><a href="#teams" class="card__link">Our Teams</a></li>
                                <li><a href="#membership" class="card__link">Membership</a></li>
                                <li><a href="#training" class="card__link">Training Schedule</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Component rendering methods
  renderNewsCard(article, detailed = false) {
    const tags = article.tags && Array.isArray(article.tags) ? article.tags : [];
    
    return `
        <article class="card" itemscope itemtype="https://schema.org/NewsArticle">
            ${article.featuredImage ? `
                <img src="${article.featuredImage}" 
                     alt="${article.title}" 
                     class="card__image" 
                     loading="lazy"
                     itemprop="image">
            ` : ''}
            <div class="card__content">
                <div class="card__meta">
                    <time datetime="${article.datePublished}" itemprop="datePublished">
                        ${this.formatDate(article.datePublished)}
                    </time>
                    ${article.author ? `<span itemprop="author"> • By ${article.author}</span>` : ''}
                </div>
                <h3 class="card__title" itemprop="headline">
                    <a href="#article/${article.id}" class="card__link">
                        ${article.title}
                    </a>
                </h3>
                <p class="card__excerpt" itemprop="description">
                    ${article.summary || ''}
                </p>
                ${detailed && tags.length ? `
                    <div class="tags">
                        ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="card__actions">
                    <a href="#article/${article.id}" class="card__cta">Read More</a>
                </div>
            </div>
        </article>
    `;
}



    renderFixtureCard(fixture, detailed = false) {
        return `
            <div class="fixture-card">
                <div class="fixture-card__header">
                    <div class="fixture-card__date">${this.formatDate(fixture.startDate)}</div>
                    <div class="fixture-card__status fixture-card__status--${fixture.status}">${fixture.status}</div>
                </div>
                <div class="fixture-card__teams">
                    <div class="fixture-card__team">${fixture.homeTeam}</div>
                    <div class="fixture-card__vs">vs</div>
                    <div class="fixture-card__team">${fixture.awayTeam}</div>
                </div>
                <div class="fixture-card__details">
                    <span>📍 ${fixture.location}</span>
                    <span>⚽ ${fixture.sport}</span>
                    ${fixture.ticketsAvailable ? '<span>🎫 Tickets Available</span>' : '<span>🎫 Sold Out</span>'}
                </div>
            </div>
        `;
    }

   renderTeamCard(team, detailed = false) {
    // Defensive guards
    if (!team || typeof team !== 'object') {
        console.warn('renderTeamCard called with invalid team:', team);
        return `<div class="team-card"><h3>Unnamed Team</h3><p>No data</p></div>`;
    }
    console.debug('Rendering team:', team);

    const name = team.name || 'Unnamed Team';
    const category = team.category || '';
    const sport = team.sport || '';
    // roster may be number or array; normalize to count or 0
    const rosterCount = Array.isArray(team.roster) ? team.roster.length : (typeof team.roster === 'number' ? team.roster : 0);
    const achievementsCount = Array.isArray(team.achievements) ? team.achievements.length : 0;
    // staff may be object or array; pick first object if array
    const staffObj = (team.staff && typeof team.staff === 'object' && !Array.isArray(team.staff)) ? team.staff
                      : (Array.isArray(team.staff) && team.staff.length ? team.staff[0] : null);
    const staffBio = staffObj && staffObj.bio ? staffObj.bio : '';
    const staffExperience = staffObj && staffObj.experience ? staffObj.experience : '';
    const staffCerts = staffObj && Array.isArray(staffObj.certifications) ? staffObj.certifications.join(', ')
                          : (staffObj && staffObj.certifications ? String(staffObj.certifications) : '');

    return `
        <div class="team-card">
            <div class="team-card__header">
                <h3 class="team-card__name">${name}</h3>
                <div class="team-card__category">${category}${category && sport ? ' • ' : ''}${sport}</div>
            </div>
            <div class="team-card__content">
                <div class="team-card__stats">
                    <div class="team-card__stat">
                        <span class="team-card__stat-value">${rosterCount}</span>
                        <span class="team-card__stat-label">Players</span>
                    </div>
                    <div class="team-card__stat">
                        <span class="team-card__stat-value">${achievementsCount}</span>
                        <span class="team-card__stat-label">Achievements</span>
                    </div>
                </div>

                <div class="team-card__body">
                    ${detailed ? `<p class="team-card__desc">${team.description || ''}</p>` : ''}
                    ${staffObj ? `
                    <div class="staff-card" style="margin-top:1rem;">
                        <p class="staff-card__bio">${staffBio}</p>
                        <div style="margin-top: 1rem;">
                            <strong>Experience:</strong> ${staffExperience}<br>
                            <strong>Certifications:</strong> ${staffCerts}
                        </div>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}


    renderStaffCard(staff) {
        return `
            <div class="staff-card">
                <img src="${staff.photo}" alt="${staff.name}" class="staff-card__photo" loading="lazy">
                <div class="staff-card__content">
                    <h3 class="staff-card__name">${staff.name}</h3>
                    <div class="staff-card__role">${staff.role}</div>
                    <p class="staff-card__bio">${staff.bio}</p>
                    <div style="margin-top: 1rem;">
                        <strong>Experience:</strong> ${staff.experience}<br>
                        <strong>Certifications:</strong> ${staff.certifications.join(', ')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSponsorCard(sponsor, detailed = false) {
        return `
            <div class="sponsor-card">
                <img src="${sponsor.logo}" alt="${sponsor.name}" class="sponsor-card__logo" loading="lazy">
                <div style="text-align: center;">
                    <h4>${sponsor.name}</h4>
                    <div class="tag" style="margin: 0.5rem 0;">${sponsor.tier}</div>
                    ${detailed ? `
                        <p style="font-size: 0.9rem; color: var(--color-text-secondary);">${sponsor.description}</p>
                        <p style="font-size: 0.8rem;"><strong>Partnership:</strong> ${sponsor.partnership}</p>
                        <a href="${sponsor.website}" class="card__link" target="_blank" rel="noopener">Visit Website</a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateMetaTags(page) {
        const pageData = {
            'home': {
                title: 'J&K Sports Journal - Premier Sports Club in Jammu & Kashmir',
                description: 'Premier sports club fostering athletic excellence and community engagement in Jammu & Kashmir. Join our cricket, football, basketball, and athletics programs.',
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=630&fit=crop'
            },
            'news': {
                title: 'Latest News - J&K Sports Journal',
                description: 'Stay updated with the latest news, match reports, and announcements from J&K Sports Journal.',
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=630&fit=crop'
            },
            'fixtures': {
                title: 'Fixtures & Results - J&K Sports Journal',
                description: 'View upcoming matches and recent results from our cricket, football, basketball, and athletics teams.',
                image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&h=630&fit=crop'
            },
            'teams': {
                title: 'Our Teams - J&K Sports Journal',
                description: 'Meet our competitive teams across cricket, football, basketball, and athletics with professional coaching.',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop'
            },
            'membership': {
                title: 'Join Us - J&K Sports Journal Membership',
                description: 'Become part of our sporting community. Choose from Junior, Senior, or Premium membership options.',
                image: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=1200&h=630&fit=crop'
            },
            'about': {
                title: 'About Us - J&K Sports Journal',
                description: 'Learn about our history, mission, and commitment to athletic excellence in Jammu & Kashmir since 1995.',
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=630&fit=crop'
            },
            'contact': {
                title: 'Contact Us - J&K Sports Journal',
                description: 'Get in touch with our team for membership inquiries, training programs, and facility information.',
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=630&fit=crop'
            }
        };

        const data = pageData[page] || pageData['home'];
        
        // Update title
        document.title = data.title;
        
        // Update meta description
        let descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            descMeta.setAttribute('content', data.description);
        }
        
        // Update Open Graph tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', data.title);
        }
        
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', data.description);
        }
        
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
            ogImage.setAttribute('content', data.image);
        }
    }

    updateStructuredData(page) {
        // Remove existing structured data
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        let structuredData = null;

        if (page === 'about') {
            structuredData = {
                "@context": "https://schema.org",
                "@type": "SportsOrganization",
                "name": this.data.organization.name,
                "description": this.data.organization.description,
                "foundingDate": this.data.organization.founded,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": this.data.organization.contact.address,
                    "addressCountry": "IN"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": this.data.organization.contact.phone,
                    "email": this.data.organization.contact.email,
                    "contactType": "customer service"
                },
                "sameAs": Object.values(this.data.organization.social),
                "sport": this.data.organization.sports
            };
        }

        if (structuredData) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }
    }

    // Event handlers
    toggleMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileNav && mobileToggle) {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('hidden');
        }
    }

    closeMobileMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileNav && mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.add('hidden');
        }
    }

    toggleSearch() {
        const searchBar = document.querySelector('.search-bar');
        const searchInput = document.querySelector('.search-input');
        
        if (searchBar) {
            searchBar.classList.toggle('hidden');
            if (!searchBar.classList.contains('hidden')) {
                setTimeout(() => searchInput?.focus(), 100);
            }
        }
    }

    handleSearchInput(e) {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            this.performSearch(query);
        }
    }

    performSearch(query = null) {
        const searchInput = document.querySelector('.search-input');
        const searchQuery = query || searchInput?.value.toLowerCase() || '';
        
        if (searchQuery.length < 3) return;

        // Search through news articles
        this.searchResults = this.data.news.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.summary.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );

        // Show search results
        this.showSearchResults(searchQuery);
    }

    showSearchResults(query) {
        const modal = document.getElementById('modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = `Search Results for "${query}"`;
        
        if (this.searchResults.length === 0) {
            modalBody.innerHTML = `
                <p>No results found for "${query}". Try different keywords or browse our sections:</p>
                <div style="margin-top: 1rem;">
                    <a href="#news" class="btn btn--outline" style="margin-right: 1rem;">Latest News</a>
                    <a href="#teams" class="btn btn--outline" style="margin-right: 1rem;">Our Teams</a>
                    <a href="#fixtures" class="btn btn--outline">Fixtures</a>
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="search-results">
                    ${this.searchResults.map(article => `
                        <div style="padding: 1rem 0; border-bottom: 1px solid var(--color-border);">
                            <h4><a href="#news-article-${article.slug}" class="card__link">${article.title}</a></h4>
                            <p style="color: var(--color-text-secondary); margin: 0.5rem 0;">${article.summary}</p>
                            <div class="tags">
                                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        this.showModal();
    }

    showModal() {
        const modal = document.getElementById('modal-container');
        modal.classList.remove('hidden');
        modal.focus();
    }

    hideModal() {
        const modal = document.getElementById('modal-container');
        modal.classList.add('hidden');
    }

    handleModalEvents(e) {
        if (e.target.classList.contains('modal__close') || e.target.classList.contains('modal-overlay')) {
            this.hideModal();
        }
    }

    handleKeyboardEvents(e) {
        if (e.key === 'Escape') {
            this.hideModal();
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('#newsletter-email').value;
        
        if (this.validateEmail(email)) {
            // Simulate subscription
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            e.target.reset();
        } else {
            this.showNotification('Please enter a valid email address.', 'error');
        }
    }

    handleScroll() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.classList.remove('hidden');
            } else {
                backToTop.classList.add('hidden');
            }
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showLoading() {
        const loading = document.querySelector('.loading-indicator');
        if (loading) {
            loading.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loading = document.querySelector('.loading-indicator');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: 1rem 1.5rem;
            box-shadow: var(--card-shadow-hover);
            z-index: 1000;
            max-width: 400px;
        `;
        
        if (type === 'success') {
            notification.style.borderColor = 'var(--color-success)';
            notification.style.background = 'rgba(var(--color-success-rgb), 0.1)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--color-error)';
            notification.style.background = 'rgba(var(--color-error-rgb), 0.1)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    bindDynamicEvents() {
        // FAQ toggles
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', (e) => {
                const answer = button.nextElementSibling;
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                button.setAttribute('aria-expanded', !isExpanded);
                answer.classList.toggle('hidden');
                
                const icon = button.querySelector('span');
                icon.textContent = isExpanded ? '+' : '−';
            });
        });

        // Gallery lightbox
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const image = item.dataset.image;
                this.showImageLightbox(image);
            });
        });

        // Membership application
        document.querySelectorAll('.membership-apply').forEach(button => {
            button.addEventListener('click', (e) => {
                const tier = button.dataset.tier;
                this.showMembershipApplication(tier);
            });
        });

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Category filter
    const newsFilter = document.getElementById('news-filter');
    if (newsFilter) {
        newsFilter.addEventListener('change', (e) => {
            this.filterNewsByCategory(e.target.value);
        });
    }

    
    }

    showImageLightbox(imageUrl) {
        const modal = document.getElementById('modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = 'Gallery Image';
        modalBody.innerHTML = `
            <img src="${imageUrl}" alt="Gallery image" style="width: 100%; height: auto; border-radius: var(--radius-base);">
        `;

        this.showModal();
    }

    showMembershipApplication(tier) {
        const modal = document.getElementById('modal-container');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = `Apply for ${tier} Membership`;
        modalBody.innerHTML = `
            <form id="membership-form" novalidate>
                <div class="form-group">
                    <label for="member-name" class="form-label">Full Name *</label>
                    <input type="text" id="member-name" name="name" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="member-email" class="form-label">Email *</label>
                    <input type="email" id="member-email" name="email" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="member-phone" class="form-label">Phone *</label>
                    <input type="tel" id="member-phone" name="phone" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="member-age" class="form-label">Age *</label>
                    <input type="number" id="member-age" name="age" class="form-control" min="8" max="80" required>
                </div>
                
                <div class="form-group">
                    <label for="member-sports" class="form-label">Sports Interest *</label>
                    <select id="member-sports" name="sports" class="form-control" required>
                        <option value="">Select a sport</option>
                        <option value="cricket">Cricket</option>
                        <option value="football">Football</option>
                        <option value="basketball">Basketball</option>
                        <option value="athletics">Athletics</option>
                        <option value="multiple">Multiple Sports</option>
                    </select>
                </div>
                
                <input type="hidden" name="tier" value="${tier}">
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="submit" class="btn btn--primary" style="flex: 1;">Submit Application</button>
                    <button type="button" class="btn btn--outline modal__close" style="flex: 1;">Cancel</button>
                </div>
            </form>
        `;

        this.showModal();
        
        // Bind form submission
        const form = document.getElementById('membership-form');
        form.addEventListener('submit', this.handleMembershipForm.bind(this));
    }

    handleContactForm(e) {
        e.preventDefault();
        
        // Basic validation
        const form = e.target;
        const formData = new FormData(form);
        let isValid = true;
        
        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(error => error.textContent = '');
        
        // Validate required fields
        if (!formData.get('name').trim()) {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        if (!this.validateEmail(formData.get('email'))) {
            document.getElementById('email-error').textContent = 'Valid email is required';
            isValid = false;
        }
        
        if (!formData.get('subject')) {
            document.getElementById('subject-error').textContent = 'Subject is required';
            isValid = false;
        }
        
        if (!formData.get('message').trim()) {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        }
        
        if (isValid) {
            this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
        }
    }

    handleMembershipForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const tier = formData.get('tier');
        
        // Simulate form submission
        this.showNotification(`Thank you for applying for ${tier} membership! We will contact you within 2 business days.`, 'success');
        this.hideModal();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new JKSportsJournal();
    window.appInstance = app;
});
