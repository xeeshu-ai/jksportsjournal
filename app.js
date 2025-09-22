// J&K Sports Journal - Main Application JavaScript
// Comprehensive sports club website with accessibility, SEO, and interactive features

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

            
            "fixtures": [
                {
                    "id": 1,
                    "name": "Regional Football Championship Final",
                    "startDate": "2024-09-25T15:30:00",
                    "location": "J&K Sports Complex Stadium",
                    "homeTeam": "J&K Sports Journal FC",
                    "awayTeam": "Kashmir Valley United",
                    "sport": "Football",
                    "status": "scheduled",
                    "ticketsAvailable": true
                },
                {
                    "id": 2,
                    "name": "Inter-Club Basketball Tournament",
                    "startDate": "2024-09-28T18:00:00",
                    "location": "Indoor Sports Arena",
                    "homeTeam": "J&K Hoops",
                    "awayTeam": "Srinagar Ballers",
                    "sport": "Basketball",
                    "status": "scheduled",
                    "ticketsAvailable": true
                },
                {
                    "id": 3,
                    "name": "Youth Cricket League Match",
                    "startDate": "2024-10-02T14:00:00",
                    "location": "Training Ground A",
                    "homeTeam": "J&K Junior Cricket",
                    "awayTeam": "Jammu Young Lions",
                    "sport": "Cricket",
                    "status": "scheduled",
                    "ticketsAvailable": false
                }
            ],
            "teams": [],

            "staff": [
                {
                    "id": 1,
                    "name": "Rajesh Sharma",
                    "role": "Head Cricket Coach",
                    "bio": "Former international cricketer with 15 years of professional experience. Specialized in developing batting techniques and team strategy.",
                    "certifications": ["ICC Level 3 Coaching", "Sports Psychology Certificate"],
                    "experience": "15 years",
                    "teams": ["Senior Cricket Team"],
                    "photo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                },
                {
                    "id": 2,
                    "name": "Maria Rodriguez",
                    "role": "Football Academy Director",
                    "bio": "Former Spanish national team player and UEFA-licensed coach. Brings international expertise to youth development programs.",
                    "certifications": ["UEFA A License", "Youth Development Specialist"],
                    "experience": "12 years",
                    "teams": ["Youth Football Academy"],
                    "photo": "https://images.unsplash.com/photo-1494790108755-2616b612b643?w=300&h=300&fit=crop&crop=face"
                },
                {
                    "id": 3,
                    "name": "Dr. Priya Patel",
                    "role": "Sports Medicine Director",
                    "bio": "Qualified sports medicine physician overseeing athlete health, injury prevention, and rehabilitation programs.",
                    "certifications": ["MBBS", "Sports Medicine Diploma", "Physiotherapy License"],
                    "experience": "10 years",
                    "teams": ["All Teams"],
                    "photo": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
                }
            ],
            "sponsors": [
                {
                    "id": 1,
                    "name": "Kashmir Bank",
                    "tier": "title",
                    "logo": "https://via.placeholder.com/200x100/1e3a8a/ffffff?text=Kashmir+Bank",
                    "description": "Title sponsor supporting all major tournaments and training programs",
                    "website": "https://kashmirbank.com",
                    "partnership": "2020-2027"
                },
                {
                    "id": 2,
                    "name": "Himalayan Sports Equipment",
                    "tier": "major",
                    "logo": "https://via.placeholder.com/200x100/f97316/ffffff?text=Himalayan+Sports",
                    "description": "Official equipment supplier for all sports programs",
                    "website": "https://himalayansports.com",
                    "partnership": "2022-2025"
                },
                {
                    "id": 3,
                    "name": "Peak Performance Nutrition",
                    "tier": "supporting",
                    "logo": "https://via.placeholder.com/200x100/10b981/ffffff?text=Peak+Nutrition",
                    "description": "Official nutrition partner providing dietary supplements and guidance",
                    "website": "https://peaknutrition.com",
                    "partnership": "2023-2024"
                }
            ],
            "training_schedule": [
                {
                    "day": "Monday",
                    "time": "16:00-18:00",
                    "activity": "Cricket Training - Senior Team",
                    "location": "Cricket Ground A",
                    "coach": "Rajesh Sharma"
                },
                {
                    "day": "Monday",
                    "time": "18:30-20:00",
                    "activity": "Football Academy - Youth",
                    "location": "Football Field B",
                    "coach": "Maria Rodriguez"
                },
                {
                    "day": "Wednesday",
                    "time": "15:00-17:00",
                    "activity": "Basketball Practice",
                    "location": "Indoor Court",
                    "coach": "TBA"
                },
                {
                    "day": "Saturday",
                    "time": "09:00-12:00",
                    "activity": "Athletics Training",
                    "location": "Track & Field",
                    "coach": "Athletics Team"
                }
            ],
            "membership_tiers": [
                {
                    "name": "Junior Member",
                    "price": "₹5,000/year",
                    "benefits": ["Access to youth programs", "Training sessions", "Equipment usage", "Tournament participation"],
                    "ageLimit": "Under 18"
                },
                {
                    "name": "Senior Member",
                    "price": "₹12,000/year",
                    "benefits": ["Full facility access", "All training programs", "Match tickets", "Guest privileges", "Equipment rental"],
                    "ageLimit": "18+"
                },
                {
                    "name": "Premium Member",
                    "price": "₹25,000/year",
                    "benefits": ["VIP facility access", "Personal training", "Priority bookings", "Exclusive events", "Family package"],
                    "ageLimit": "18+"
                }
            ],
            "faqs": [
                {
                    "category": "Membership",
                    "question": "How do I become a member of J&K Sports Journal?",
                    "answer": "You can apply for membership by filling out our online application form or visiting our office. We offer different membership tiers based on age and requirements."
                },
                {
                    "category": "Training",
                    "question": "What are the training hours for different sports?",
                    "answer": "Training schedules vary by sport and age group. Please check our Training Schedule page for detailed timings or contact our office for specific program information."
                },
                {
                    "category": "Facilities",
                    "question": "What facilities are available to members?",
                    "answer": "Our facilities include cricket grounds, football fields, basketball courts, athletics track, gymnasium, changing rooms, and medical facility. Premium members get access to additional VIP amenities."
                }
            ]
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

  // Render initial page immediately
  this.loadInitialPage();

  // Show placeholder for teams
  const teamsContainer = document.getElementById('teams-container');
  if (teamsContainer) teamsContainer.innerHTML = '<p>Loading teams...</p>';

  // Fetch teams in background and update DOM when ready
  if (typeof this.fetchTeamsFromSupabase === 'function') {
    this.fetchTeamsFromSupabase()
      .then(teams => {
        if (teamsContainer) {
          teamsContainer.innerHTML = this.renderTeams(teams); // make sure renderTeams formats your teams
        }
      })
      .catch(err => console.warn('Teams fetch error:', err));
  }

  // Fetch news (same as before)
  if (typeof this.fetchNewsFromSupabase === 'function') {
    this.fetchNewsFromSupabase().catch(err => console.warn('News fetch error:', err));
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
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });

        // Handle initial hash
        const hash = window.location.hash.slice(1);
        if (hash) {
            this.currentPage = hash;
        }
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
        const contentContainer = document.getElementById('page-content');
        let content = '';

        switch (page) {
            case 'home':
                content = this.renderHomePage();
                break;
            case 'news':
                content = this.renderNewsPage();
                break;
            case 'fixtures':
                content = this.renderFixturesPage();
                break;
            case 'teams':
                content = this.renderTeamsPage();
                break;
            case 'membership':
                content = this.renderMembershipPage();
                break;
            case 'gallery':
                content = this.renderGalleryPage();
                break;
            case 'about':
                content = this.renderAboutPage();
                break;
            case 'contact':
                content = this.renderContactPage();
                break;
            case 'training':
                content = this.renderTrainingPage();
                break;
            case 'coaches':
                content = this.renderCoachesPage();
                break;
            case 'sponsors':
                content = this.renderSponsorsPage();
                break;
            case 'faq':
                content = this.renderFAQPage();
                break;
            case 'policies':
                content = this.renderPoliciesPage();
                break;
            case 'press-kit':
                content = this.renderPressKitPage();
                break;
            default:
                content = this.render404Page();
        }

        contentContainer.innerHTML = content;
        
        // Bind new events for dynamically loaded content
        this.bindDynamicEvents();
    }

    renderHomePage() {
        return `
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
                        ${this.data.news.map(article => this.renderNewsCard(article)).join('')}
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
    }

    renderNewsPage() {
        return `
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
                        ${this.data.news.map(article => this.renderNewsCard(article, true)).join('')}
                    </div>
                </div>
            </section>
        `;
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
        return `
            <article class="card">
                <img src="${article.featuredImage}" alt="${article.title}" class="card__image" loading="lazy">
                <div class="card__content">
                    <div class="card__meta">
                        <time datetime="${article.datePublished}">${this.formatDate(article.datePublished)}</time>
                        <span>•</span>
                        <span>By ${article.author}</span>
                    </div>
                    <h3 class="card__title">
                        <a href="#news-article-${article.slug}">${article.title}</a>
                    </h3>
                    <p class="card__excerpt">${article.summary}</p>
                    ${detailed ? `
                        <div class="tags">
                            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="card__actions">
                        <a href="#news-article-${article.slug}" class="card__link">Read More</a>
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
        return `
            <div class="team-card">
                <div class="team-card__header">
                    <h3 class="team-card__name">${team.name}</h3>
                    <div class="team-card__category">${team.category} • ${team.sport}</div>
                </div>
                <div class="team-card__content">
                    <div class="team-card__stats">
                        <div class="team-card__stat">
                            <span class="team-card__stat-value">${team.roster}</span>
                            <span class="team-card__stat-label">Players</span>
                        </div>
                        <div class="team-card__stat">
                            <span class="team-card__stat-value">${team.achievements.length}</span>
                            <span class="team-card__stat-label">Achievements</span>
                        </div>
                    </div>
                    <p>${team.description}</p>
                    ${detailed ? `
                        <div>
                            <strong>Head Coach:</strong> ${team.headCoach}<br>
                            <strong>Home Venue:</strong> ${team.homeVenue}<br>
                            <strong>Founded:</strong> ${team.founded}
                        </div>
                        <div style="margin-top: 1rem;">
                            <strong>Recent Achievements:</strong>
                            <ul style="margin-top: 0.5rem;">
                                ${team.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    <div class="card__actions" style="margin-top: 1rem;">
                        <a href="#team-${team.id}" class="card__link">View Details</a>
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
    new JKSportsJournal();
});