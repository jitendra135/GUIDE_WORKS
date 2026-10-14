// ==========================================================================
// GuideConnect (Incredible India Edition) - GuideMatch AI Recommendation Engine
// ==========================================================================

class GuideMatchAI {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.preferences = {
      destination: "Varanasi",
      travelStyle: "Spiritual & Wellness",
      personality: "Spiritual",
      groupType: "Family",
      budgetPace: "Balanced"
    };

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    this.wizardModal = document.getElementById("ai-wizard-modal");
    this.stepIndicators = document.querySelectorAll(".ai-step-dot");
    this.computingScreen = document.getElementById("ai-computing-state");
    this.resultsContainer = document.getElementById("ai-results-state");
    this.prevBtn = document.getElementById("ai-prev-btn");
    this.nextBtn = document.getElementById("ai-next-btn");
  }

  bindEvents() {
    // Open wizard trigger buttons
    document.querySelectorAll(".trigger-ai-match").forEach(btn => {
      btn.addEventListener("click", () => this.openWizard());
    });

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.handleNextStep());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.handlePrevStep());
    }

    // Step 1: Destination Selection
    document.querySelectorAll("#ai-step-1 .ai-choice-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll("#ai-step-1 .ai-choice-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this.preferences.destination = card.dataset.dest;
      });
    });

    // Step 2: Travel Style
    document.querySelectorAll("#ai-step-2 .ai-choice-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll("#ai-step-2 .ai-choice-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this.preferences.travelStyle = card.dataset.style;
      });
    });

    // Step 3: Guide Personality
    document.querySelectorAll("#ai-step-3 .ai-choice-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll("#ai-step-3 .ai-choice-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this.preferences.personality = card.dataset.persona;
      });
    });

    // Step 4: Group & Safety
    document.querySelectorAll("#ai-step-4 .ai-choice-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll("#ai-step-4 .ai-choice-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this.preferences.groupType = card.dataset.group;
      });
    });
  }

  openWizard() {
    this.currentStep = 1;
    this.updateStepUI();
    if (this.wizardModal) {
      this.wizardModal.classList.add("active");
    }
  }

  handleNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateStepUI();
    } else {
      this.runComputingAlgorithm();
    }
  }

  handlePrevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepUI();
    }
  }

  updateStepUI() {
    // Update step visibility
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepEl = document.getElementById(`ai-step-${i}`);
      if (stepEl) {
        stepEl.style.display = i === this.currentStep ? "block" : "none";
      }
    }

    if (this.computingScreen) this.computingScreen.style.display = "none";
    if (this.resultsContainer) this.resultsContainer.style.display = "none";

    // Update Dots
    document.querySelectorAll(".ai-step-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index + 1 === this.currentStep);
    });

    if (this.prevBtn) {
      this.prevBtn.style.visibility = this.currentStep > 1 ? "visible" : "hidden";
    }

    if (this.nextBtn) {
      this.nextBtn.innerHTML = this.currentStep === this.totalSteps ? "⚡ Calculate Matches" : "Continue →";
    }
  }

  runComputingAlgorithm() {
    // Hide question steps
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepEl = document.getElementById(`ai-step-${i}`);
      if (stepEl) stepEl.style.display = "none";
    }

    if (this.prevBtn) this.prevBtn.style.visibility = "hidden";
    if (this.nextBtn) this.nextBtn.style.display = "none";

    if (this.computingScreen) this.computingScreen.style.display = "block";

    const scanningText = document.getElementById("ai-scanning-status");
    const statuses = [
      `Filtering 5,200+ verified guides in ${this.preferences.destination}...`,
      `Matching compatibility for "${this.preferences.travelStyle}" & ${this.preferences.groupType} party...`,
      `Verifying Ministry of Tourism licenses & police clearances...`,
      `Finalizing ranked compatibility scores...`
    ];

    let sIndex = 0;
    const interval = setInterval(() => {
      sIndex++;
      if (scanningText && statuses[sIndex]) {
        scanningText.textContent = statuses[sIndex];
      }
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      this.displayMatchedResults();
    }, 1800);
  }

  calculateGuideScore(guide) {
    let score = 75;
    if (guide.location.city.toLowerCase() === this.preferences.destination.toLowerCase()) {
      score += 15;
    }
    if (guide.categories.includes(this.preferences.travelStyle)) {
      score += 5;
    }
    if (guide.personality.includes(this.preferences.personality)) {
      score += 4;
    }
    return Math.min(score, 99);
  }

  displayMatchedResults() {
    if (this.computingScreen) this.computingScreen.style.display = "none";
    if (this.resultsContainer) this.resultsContainer.style.display = "block";

    const matchedGuides = GUIDES_DATABASE
      .map(guide => ({
        ...guide,
        matchScore: this.calculateGuideScore(guide)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    const grid = document.getElementById("ai-matched-guides-grid");
    if (!grid) return;

    grid.innerHTML = matchedGuides.map(guide => `
      <div style="background:var(--bg-card-subtle);border:1px solid var(--border-color);border-radius:var(--radius-lg);padding:1.25rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
        <div style="display:flex;align-items:center;gap:1rem;">
          <img src="${guide.avatar}" alt="${guide.name}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid var(--accent-indigo);">
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <h4 style="font-size:1.1rem;font-weight:800;">${guide.name}</h4>
              <span class="active-badge">${guide.matchScore}% Match</span>
            </div>
            <p style="font-size:0.8rem;color:var(--text-muted);">📍 ${guide.location.city}, ${guide.location.state} • ★ ${guide.rating} (${guide.reviewCount})</p>
            <div style="font-size:0.78rem;color:var(--primary);font-weight:700;margin-top:0.2rem;">
              ${app.formatCurrency(guide.hourlyRate)}/hr • ${guide.experienceYears} yrs experience
            </div>
          </div>
        </div>

        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('ai-wizard-modal').classList.remove('active');app.openGuideProfile('${guide.id}')">
            View Profile
          </button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('ai-wizard-modal').classList.remove('active');app.openBookingModal('${guide.id}')">
            ⚡ Instant Book
          </button>
        </div>
      </div>
    `).join("");

    if (this.nextBtn) {
      this.nextBtn.style.display = "block";
      this.nextBtn.innerHTML = "Explore All Matching Guides";
      this.nextBtn.onclick = () => {
        this.wizardModal.classList.remove("active");
        app.selectLocation(this.preferences.destination);
      };
    }
  }
}

window.guideMatchAIInstance = new GuideMatchAI();
