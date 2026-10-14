// ==========================================================================
// GuideConnect (Incredible India Edition) - Master Application Controller
// Unified High-Efficiency Controller
// ==========================================================================

class GuideConnectApp {
  constructor() {
    this.currentView = "explore";
    this.personaMode = localStorage.getItem("guideconnect_persona") || "tourist";
    this.darkMode = localStorage.getItem("guideconnect_theme") === "dark";
    this.currentCurrency = localStorage.getItem("guideconnect_currency") || "INR";
    this.favorites = new Set(JSON.parse(localStorage.getItem("guideconnect_favs_in") || "[]"));

    this.filters = {
      searchQuery: "",
      city: "all",
      category: "all",
      tier: "all",
      language: "all",
      maxPriceINR: 10000,
      minExperience: 0,
      minRating: 0,
      sortBy: "rating"
    };

    this.aiQuizFilters = null;
    this.typingPhrases = [
      "Experience the eternal city's spiritual depth in Varanasi...",
      "Explore secret corridors of Amer Fort in Jaipur...",
      "Witness the Taj Mahal dawn marble glow in Agra...",
      "Paddle tranquil Alleppey backwaters in Kerala...",
      "Scale ancient cliffside gompas in Leh & Ladakh...",
      "Taste authentic Portuguese feni & pastels in Goa..."
    ];
    this.typingIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.initApp();
    this.bindEvents();
    this.bindLocationSearch();
    this.initTypingAnimation();
  }

  initApp() {
    if (this.darkMode) {
      document.body.classList.add("dark-mode");
      const themeIcon = document.getElementById("theme-toggle-icon");
      if (themeIcon) themeIcon.textContent = "☀️";
    }

    const currencySelect = document.getElementById("currency-select");
    if (currencySelect) {
      currencySelect.value = this.currentCurrency;
    }

    this.setPersonaMode(this.personaMode, false);
    this.renderGuidesGrid();
    this.updateFavsCount();
    this.renderDestinationsGrid();
  }

  // Currency Converter Formatter
  formatCurrency(inrAmount) {
    const curr = CURRENCY_RATES[this.currentCurrency] || CURRENCY_RATES["INR"];
    const converted = inrAmount * curr.rate;
    if (this.currentCurrency === "INR") {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  }

  setCurrency(currCode) {
    this.currentCurrency = currCode;
    localStorage.setItem("guideconnect_currency", currCode);
    this.renderGuidesGrid();
    const mapInst = window.mapExplorerInstance;
    if (mapInst) {
      mapInst.renderMarkers(this.getFilteredGuides());
      mapInst.renderSidebarGuides(this.getFilteredGuides());
    }
    const bookInst = window.bookingSystemInstance;
    if (bookInst) {
      bookInst.updatePriceBreakdown();
      bookInst.renderTripsList();
    }
    this.showToast("Currency Updated", `Display currency set to ${CURRENCY_RATES[currCode].label}`, "info");
  }

  // Persona Mode (Tourist ⇄ Guide)
  setPersonaMode(mode, showNotification = true) {
    this.personaMode = mode;
    localStorage.setItem("guideconnect_persona", mode);

    const touristView = document.getElementById("tourist-experience-view");
    const guidePortalView = document.getElementById("guide-portal-view");
    const touristBtn = document.getElementById("persona-tourist-btn");
    const guideBtn = document.getElementById("persona-guide-btn");

    if (mode === "guide") {
      if (touristView) touristView.style.display = "none";
      if (guidePortalView) guidePortalView.style.display = "block";
      if (touristBtn) touristBtn.classList.remove("active");
      if (guideBtn) guideBtn.classList.add("active");
      if (showNotification) {
        this.showToast("Guide Portal Active", "Switched to verified partner dashboard for Aarav Sharma.", "info");
      }
    } else {
      if (touristView) touristView.style.display = "block";
      if (guidePortalView) guidePortalView.style.display = "none";
      if (touristBtn) touristBtn.classList.add("active");
      if (guideBtn) guideBtn.classList.remove("active");
      if (showNotification) {
        this.showToast("Tourist Mode Active", "Switched to traveler discovery and escrow booking mode.", "info");
      }
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem("guideconnect_theme", this.darkMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", this.darkMode);
    const themeIcon = document.getElementById("theme-toggle-icon");
    if (themeIcon) themeIcon.textContent = this.darkMode ? "☀️" : "🌙";
    this.showToast("Theme Toggled", `${this.darkMode ? "Dark" : "Light"} mode enabled.`, "info");
  }

  toggleFavorite(guideId, btnElement) {
    if (this.favorites.has(guideId)) {
      this.favorites.delete(guideId);
      if (btnElement) btnElement.classList.remove("active");
      this.showToast("Removed from Wishlist", "Guide removed from your saved list.", "info");
    } else {
      this.favorites.add(guideId);
      if (btnElement) btnElement.classList.add("active");
      this.showToast("Saved to Wishlist", "Guide added to your saved favorites list.", "success");
    }
    localStorage.setItem("guideconnect_favs_in", JSON.stringify(Array.from(this.favorites)));
    this.updateFavsCount();
  }

  updateFavsCount() {
    const badge = document.getElementById("favs-count-badge");
    if (badge) badge.textContent = this.favorites.size;
  }

  showWishlistModal() {
    const modal = document.getElementById("wishlist-modal");
    const container = document.getElementById("wishlist-modal-content");
    if (!modal || !container) return;

    const savedGuides = GUIDES_DATABASE.filter(g => this.favorites.has(g.id));

    if (savedGuides.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:2.5rem 1rem;background:var(--bg-card-subtle);border-radius:var(--radius-md);">
          <div style="font-size:2.5rem;margin-bottom:0.5rem;">🤍</div>
          <h4 style="font-size:1.1rem;font-weight:800;color:var(--text-main);">No Saved Guides Yet</h4>
          <p style="font-size:0.85rem;color:var(--text-muted);margin:0.4rem 0 1.2rem;">Click the heart icon (♥) on any guide card to save them to your favorites list.</p>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('wishlist-modal').classList.remove('active');document.getElementById('guides-discovery-section').scrollIntoView({behavior:'smooth'});">Browse Verified Guides</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:0.85rem;max-height:400px;overflow-y:auto;">
          ${savedGuides.map(guide => `
            <div style="background:var(--bg-card-subtle);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;">
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <img src="${guide.avatar}" alt="${guide.name}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;">
                <div>
                  <h4 style="font-size:1rem;font-weight:800;color:var(--text-main);">${guide.name}</h4>
                  <p style="font-size:0.75rem;color:var(--text-muted);">📍 ${guide.location.city} • ${this.formatCurrency(guide.hourlyRate)}/hr • ★ ${guide.rating}</p>
                </div>
              </div>
              <div style="display:flex;gap:0.4rem;">
                <button class="btn btn-secondary btn-sm" onclick="document.getElementById('wishlist-modal').classList.remove('active');app.openGuideProfile('${guide.id}')">View</button>
                <button class="btn btn-primary btn-sm" onclick="document.getElementById('wishlist-modal').classList.remove('active');app.openBookingModal('${guide.id}')">⚡ Book</button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    modal.classList.add("active");
  }

  bindEvents() {
    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Currency Switcher
    const currencySelect = document.getElementById("currency-select");
    if (currencySelect) {
      currencySelect.addEventListener("change", (e) => this.setCurrency(e.target.value));
    }

    // Persona Switcher
    const touristBtn = document.getElementById("persona-tourist-btn");
    const guideBtn = document.getElementById("persona-guide-btn");
    if (touristBtn) touristBtn.addEventListener("click", () => this.setPersonaMode("tourist"));
    if (guideBtn) guideBtn.addEventListener("click", () => this.setPersonaMode("guide"));

    // Modal close buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modal = btn.closest(".modal-overlay");
        if (modal) modal.classList.remove("active");
      });
    });

    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    });

    // Navigation links smooth scroll
    document.querySelectorAll(".nav-link").forEach(item => {
      item.addEventListener("click", (e) => {
        const targetView = item.dataset.view;
        if (targetView) this.switchTab(targetView);
      });
    });

    // Category pills in Hero and Discover
    document.querySelectorAll(".quick-city-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const city = chip.dataset.city;
        this.selectLocation(city);
      });
    });

    // Experience Category selector
    const catSelect = document.getElementById("omni-cat-select");
    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        this.filters.category = e.target.value;
        this.renderGuidesGrid();
      });
    }

    // Keyword Filter
    const kwInput = document.getElementById("filter-keyword-input");
    if (kwInput) {
      kwInput.addEventListener("input", (e) => {
        this.filters.searchQuery = e.target.value.toLowerCase().trim();
        this.renderGuidesGrid();
      });
    }

    // Tier Filter
    const tierSelect = document.getElementById("filter-tier-select");
    if (tierSelect) {
      tierSelect.addEventListener("change", (e) => {
        this.filters.tier = e.target.value;
        this.renderGuidesGrid();
      });
    }

    // Language Filter
    const langSelect = document.getElementById("filter-lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        this.filters.language = e.target.value;
        this.renderGuidesGrid();
      });
    }

    // Sorting
    const sortSelect = document.getElementById("filter-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.filters.sortBy = e.target.value;
        this.renderGuidesGrid();
      });
    }

    // Geolocation detection button
    const geoBtn = document.getElementById("use-my-location-btn");
    if (geoBtn) {
      geoBtn.addEventListener("click", () => this.detectUserLocation());
    }

    // Find Guides button
    const omniSearchBtn = document.getElementById("omni-search-btn");
    if (omniSearchBtn) {
      omniSearchBtn.addEventListener("click", () => {
        const input = document.getElementById("omni-location-input");
        if (input && input.value.trim()) {
          this.selectLocation(input.value.trim());
        }
        document.getElementById("guides-discovery-section")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  detectUserLocation() {
    this.showToast("Locating Destination...", "Scanning GPS coordinates within India...", "info");
    setTimeout(() => {
      this.selectLocation("Varanasi");
      this.showToast("Location Detected: Varanasi, Uttar Pradesh", "Found 4 available Ministry of Tourism licensed guides near Assi Ghat.", "success");
    }, 900);
  }

  bindLocationSearch() {
    const input = document.getElementById("omni-location-input");
    const dropdown = document.getElementById("location-autocomplete-dropdown");
    if (!input || !dropdown) return;

    input.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        dropdown.classList.remove("active");
        dropdown.innerHTML = "";
        return;
      }

      const cities = Array.from(new Set(GUIDES_DATABASE.map(g => g.location.city)));
      const matches = cities.filter(c => c.toLowerCase().includes(query));

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="autocomplete-item" style="cursor:default;color:var(--text-muted);">
            <span>No guides found in "${e.target.value}". Try Jaipur, Varanasi, Agra, Kerala, Ladakh...</span>
          </div>
        `;
        dropdown.classList.add("active");
        return;
      }

      dropdown.innerHTML = matches.map(city => {
        const count = GUIDES_DATABASE.filter(g => g.location.city === city).length;
        const guide = GUIDES_DATABASE.find(g => g.location.city === city);
        return `
          <div class="autocomplete-item" data-city="${city}">
            <div>
              <div class="autocomplete-city">📍 ${city}</div>
              <div class="autocomplete-state">${guide.location.state}, India</div>
            </div>
            <span class="autocomplete-guide-count">${count} Verified Guide${count > 1 ? 's' : ''}</span>
          </div>
        `;
      }).join("");

      dropdown.classList.add("active");

      dropdown.querySelectorAll(".autocomplete-item").forEach(item => {
        item.addEventListener("click", () => {
          const selectedCity = item.dataset.city;
          if (selectedCity) {
            input.value = selectedCity;
            dropdown.classList.remove("active");
            this.selectLocation(selectedCity);
          }
        });
      });
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  selectLocation(city) {
    this.filters.city = city;
    const input = document.getElementById("omni-location-input");
    if (input) input.value = city;

    // Render Spotlight Banner
    const spotlightArea = document.getElementById("location-spotlight-area");
    if (spotlightArea) {
      if (city === "all") {
        spotlightArea.innerHTML = "";
      } else {
        const guidesInCity = GUIDES_DATABASE.filter(g => g.location.city.toLowerCase() === city.toLowerCase());
        const firstGuide = guidesInCity[0];
        spotlightArea.innerHTML = `
          <div class="location-spotlight-banner">
            <div class="spotlight-left">
              <div class="spotlight-icon">🏛️</div>
              <div>
                <h3>Exploring ${city}, ${firstGuide ? firstGuide.location.state : 'India'}</h3>
                <p>Showing ${guidesInCity.length} Ministry of Tourism accredited & verified local scholars.</p>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="app.resetLocationFilter()">Show All Cities</button>
          </div>
        `;
      }
    }

    this.renderGuidesGrid();

    // Map focus if loaded
    const mapInst = window.mapExplorerInstance;
    if (mapInst && city !== "all") {
      mapInst.focusCity(city);
    }
  }

  resetLocationFilter() {
    this.filters.city = "all";
    const input = document.getElementById("omni-location-input");
    if (input) input.value = "";
    const spotlightArea = document.getElementById("location-spotlight-area");
    if (spotlightArea) spotlightArea.innerHTML = "";
    this.renderGuidesGrid();
    const mapInst = window.mapExplorerInstance;
    if (mapInst) {
      mapInst.resetMapView();
    }
  }

  getFilteredGuides() {
    return GUIDES_DATABASE.filter(guide => {
      // City Filter
      if (this.filters.city !== "all" && guide.location.city.toLowerCase() !== this.filters.city.toLowerCase()) {
        return false;
      }
      // Category Filter
      if (this.filters.category !== "all" && !guide.categories.includes(this.filters.category)) {
        return false;
      }
      // Verification Tier
      if (this.filters.tier !== "all" && guide.verificationTier < parseInt(this.filters.tier)) {
        return false;
      }
      // Language Filter
      if (this.filters.language !== "all" && !guide.languages.some(l => l.code === this.filters.language)) {
        return false;
      }
      // Keyword Search
      if (this.filters.searchQuery) {
        const q = this.filters.searchQuery;
        const inName = guide.name.toLowerCase().includes(q);
        const inCity = guide.location.city.toLowerCase().includes(q);
        const inTag = guide.tagline.toLowerCase().includes(q);
        const inTitle = guide.title.toLowerCase().includes(q);
        if (!inName && !inCity && !inTag && !inTitle) return false;
      }
      return true;
    }).sort((a, b) => {
      if (this.filters.sortBy === "rating") return b.rating - a.rating;
      if (this.filters.sortBy === "reviews") return b.reviewCount - a.reviewCount;
      if (this.filters.sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (this.filters.sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
      return 0;
    });
  }

  renderGuidesGrid() {
    const grid = document.getElementById("guides-directory-grid");
    const countEl = document.getElementById("guides-result-count");
    if (!grid) return;

    const guides = this.getFilteredGuides();

    if (countEl) {
      countEl.textContent = `${guides.length} Verified Local Guide${guides.length !== 1 ? 's' : ''} Available`;
    }

    if (guides.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem;">No Verified Guides Match Your Exact Filters</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Try resetting your filters or selecting a different heritage city in India.</p>
          <button class="btn btn-primary" onclick="app.resetLocationFilter()">Show All Indian Guides</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = guides.map(guide => {
      const isFav = this.favorites.has(guide.id);
      const formattedRate = this.formatCurrency(guide.hourlyRate);

      return `
        <div class="guide-card">
          <div class="card-cover">
            <img src="${guide.cover}" alt="${guide.location.city}" loading="lazy">
            <div class="card-cover-overlay"></div>
            
            <div class="card-status-badge">
              <span class="status-dot"></span> Available Now
            </div>

            <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="app.toggleFavorite('${guide.id}', this)" title="Save Guide">
              ♥
            </button>

            <div class="card-location-tag">
              📍 ${guide.location.city}, ${guide.location.state}
            </div>
          </div>

          <div class="card-body">
            <div class="card-header-row">
              <div class="guide-avatar-wrap">
                <img src="${guide.avatar}" alt="${guide.name}" loading="lazy">
                <div class="tier-badge-icon" title="Tier ${guide.verificationTier} MoT Licensed">
                  ★
                </div>
              </div>
              <div class="guide-name-block">
                <h3>${guide.name}</h3>
                <div class="guide-headline">${guide.title}</div>
              </div>
            </div>

            <div class="verification-badges-row">
              ${guide.verificationBadges.slice(0, 2).map(b => `
                <span class="verify-badge ${b.color}">
                  🛡️ ${b.label}
                </span>
              `).join("")}
            </div>

            <div class="card-languages">
              🗣️ ${guide.languages.map(l => `${l.flag} ${l.name}`).join(" • ")}
            </div>

            <div class="card-tagline">
              "${guide.tagline}"
            </div>

            <div class="card-footer-row">
              <div class="price-block">
                <div class="price-amount">${formattedRate} <span class="price-unit">/ hr</span></div>
              </div>

              <div class="card-rating-block">
                <span class="star-icon">★</span>
                <span>${guide.rating}</span>
                <span class="review-count">(${guide.reviewCount})</span>
              </div>
            </div>

            <div class="card-actions-row">
              <button class="btn btn-primary" style="padding: 0.5rem;" onclick="app.openGuideProfile('${guide.id}')">
                View Profile
              </button>
              <button class="btn btn-secondary" style="padding: 0.5rem;" onclick="app.openBookingModal('${guide.id}')">
                ⚡ Instant Book
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderDestinationsGrid() {
    const container = document.getElementById("destinations-grid");
    if (!container) return;

    const topDestinations = [
      { city: "Varanasi", desc: "Sacred Ganga Ghats & Sanskrit Lore", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80" },
      { city: "Jaipur", desc: "Amer Fort Secrets & Haveli Corridors", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80" },
      { city: "Agra", desc: "Mughal Architecture & Taj Sunrise", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80" },
      { city: "Kerala", desc: "Tranquil Backwaters & Spice Gardens", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80" },
      { city: "Ladakh", desc: "Cliffside Gompas & High Passes", img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80" },
      { city: "Goa", desc: "Pastel Latin Quarter & River Ferries", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" }
    ];

    container.innerHTML = topDestinations.map(d => `
      <div class="dest-card-photo" onclick="app.selectLocation('${d.city}')">
        <img src="${d.img}" alt="${d.city}" loading="lazy">
        <div class="dest-card-content">
          <h4>${d.city}</h4>
          <span>${d.desc}</span>
        </div>
      </div>
    `).join("");
  }

  openGuideProfile(guideId) {
    if (window.bookingSystemInstance) {
      window.bookingSystemInstance.openProfile(guideId);
    } else {
      // Direct robust fallback
      const guide = GUIDES_DATABASE.find(g => g.id === guideId);
      if (!guide) return;
      const modal = document.getElementById("guide-profile-modal");
      const container = document.getElementById("guide-profile-dynamic-content");
      if (modal && container) {
        container.innerHTML = `
          <button class="modal-close-btn" onclick="document.getElementById('guide-profile-modal').classList.remove('active')">×</button>
          <div style="padding:1.5rem;">
            <h2>${guide.name}</h2>
            <p>${guide.bio}</p>
          </div>
        `;
        modal.classList.add("active");
      }
    }
  }

  openBookingModal(guideId) {
    if (window.bookingSystemInstance) {
      window.bookingSystemInstance.openBooking(guideId);
    }
  }

  openChat(guideId) {
    if (window.chatMessengerInstance) {
      window.chatMessengerInstance.openConversation(guideId);
    }
  }

  initTypingAnimation() {
    const el = document.getElementById("hero-dynamic-subtitle");
    if (!el) return;

    const currentString = this.typingPhrases[this.typingIndex];

    if (this.isDeleting) {
      el.textContent = currentString.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      el.textContent = currentString.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 30 : 65;

    if (!this.isDeleting && this.charIndex === currentString.length) {
      typeSpeed = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.typingIndex = (this.typingIndex + 1) % this.typingPhrases.length;
      typeSpeed = 400;
    }

    setTimeout(() => this.initTypingAnimation(), typeSpeed);
  }

  showToast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="font-size:1.2rem;">${type === 'success' ? '✓' : type === 'danger' ? '🚨' : '🧭'}</div>
      <div>
        <div style="font-weight:800;">${title}</div>
        <div style="font-size:0.8rem;opacity:0.85;">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  switchTab(tabName) {
    document.querySelectorAll(".nav-link").forEach(item => {
      item.classList.toggle("active", item.dataset.view === tabName);
    });

    if (tabName === "explore") {
      document.getElementById("guides-discovery-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (tabName === "map") {
      document.getElementById("leaflet-map-container")?.scrollIntoView({ behavior: "smooth" });
    } else if (tabName === "trips") {
      document.getElementById("my-trips-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (tabName === "ai-match") {
      if (window.guideMatchAIInstance) {
        window.guideMatchAIInstance.openWizard();
      }
    } else if (tabName === "safety") {
      if (window.safetyHubInstance) {
        window.safetyHubInstance.openSOSModal();
      }
    }
  }
}

// Attach globally
window.app = new GuideConnectApp();
