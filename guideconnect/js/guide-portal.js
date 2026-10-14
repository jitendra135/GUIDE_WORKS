// ==========================================================================
// GuideConnect (Incredible India Edition) - Local Guide Portal & Dashboard
// ==========================================================================

class GuidePortal {
  constructor() {
    this.requests = [...INITIAL_GUIDE_REQUESTS];
    this.guideProfile = GUIDES_DATABASE[0]; // Default logged-in guide: Aarav Sharma (Varanasi)
    this.stats = {
      totalEarnedINR: 84500.00,
      toursCompleted: 1140,
      rating: 4.99,
      responseRate: "100%"
    };

    this.initPortal();
    this.bindEvents();
    this.initBecomeGuideWizard();
  }

  initPortal() {
    this.renderRequests();
    this.renderKYCStatus();
    this.updateStatsDisplay();
  }

  updateStatsDisplay() {
    const earningsEl = document.getElementById("portal-stat-earnings");
    if (earningsEl && app) {
      earningsEl.textContent = app.formatCurrency(this.stats.totalEarnedINR);
    }
  }

  bindEvents() {
    document.querySelectorAll(".persona-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.persona;
        app.setPersonaMode(mode);
      });
    });

    const kycUploadBtn = document.getElementById("simulate-kyc-upload");
    if (kycUploadBtn) {
      kycUploadBtn.addEventListener("click", () => {
        app.showToast("Ministry Credentials Uploaded!", "Your Ministry of Tourism Regional Guide license renewal document has been submitted for validation.", "info");
      });
    }
  }

  renderRequests() {
    const listContainer = document.getElementById("guide-portal-requests-list");
    if (!listContainer) return;

    if (this.requests.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted); background: var(--bg-card-subtle); border-radius: var(--radius-md);">
          <p>No new tourist booking requests pending.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = this.requests.map((req, idx) => `
      <div class="booking-request-card ${req.status === 'accepted' ? 'accepted' : req.status === 'declined' ? 'declined' : ''}">
        <div class="request-tourist-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
          <div class="request-tourist-info" style="display:flex;align-items:center;gap:0.75rem;">
            <img src="${req.touristAvatar}" alt="${req.touristName}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;">
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main);">${req.touristName}</h4>
              <p style="font-size: 0.78rem; color: var(--text-muted);">${req.origin}</p>
            </div>
          </div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${app ? app.formatCurrency(req.totalPriceINR) : `₹${req.totalPriceINR}`}</div>
        </div>

        <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main); margin-bottom:0.5rem;">
          Experience: ${req.experience}
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; background: var(--bg-card-subtle); padding: 0.65rem; border-radius: var(--radius-sm); font-size: 0.8rem; margin-bottom:0.5rem;">
          <div>📅 <strong>Date:</strong> ${req.date}</div>
          <div>⏰ <strong>Time:</strong> ${req.time}</div>
          <div>👥 <strong>Travelers:</strong> ${req.travelers}</div>
        </div>

        <p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic; background: rgba(15, 118, 110, 0.05); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom:0.75rem;">
          "${req.notes}"
        </p>

        <div class="request-actions-row" style="display:flex;gap:0.5rem;">
          ${req.status === 'pending' ? `
            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="guidePortalInstance.handleRequest(${idx}, 'accepted')">
              ✓ Accept Tour (${app ? app.formatCurrency(req.totalPriceINR) : `₹${req.totalPriceINR}`})
            </button>
            <button class="btn btn-secondary btn-sm" onclick="guidePortalInstance.handleRequest(${idx}, 'declined')">
              ✕ Decline
            </button>
          ` : `
            <div style="font-weight: 800; font-size: 0.85rem; color: ${req.status === 'accepted' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; padding: 0.35rem 0;">
              ${req.status === 'accepted' ? '✓ Tour Accepted & Escrow Locked' : '✕ Tour Request Declined'}
            </div>
          `}
        </div>
      </div>
    `).join("");
  }

  handleRequest(index, action) {
    if (!this.requests[index]) return;
    this.requests[index].status = action;

    if (action === 'accepted') {
      this.stats.totalEarnedINR += this.requests[index].totalPriceINR;
      this.stats.toursCompleted += 1;
      this.updateStatsDisplay();
      app.showToast("Tour Accepted!", `Booking for ${this.requests[index].touristName} has been confirmed. Escrow payment locked.`, "success");
    } else {
      app.showToast("Tour Declined", "Traveler has been notified to choose an alternative time slot.", "info");
    }

    this.renderRequests();
  }

  renderKYCStatus() {
    const container = document.getElementById("kyc-checklist-container");
    if (!container) return;

    container.innerHTML = `
      <div class="kyc-step-item" style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border-light);">
        <div>
          <strong>Aadhaar Card / Govt Identity (KYC)</strong>
          <p style="font-size: 0.75rem; color: var(--text-muted);">Verified against UIDAI National Registry</p>
        </div>
        <span class="verify-badge emerald">✓ 100% Verified</span>
      </div>
      <div class="kyc-step-item" style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border-light);">
        <div>
          <strong>Police Clearance Certificate (PCC)</strong>
          <p style="font-size: 0.75rem; color: var(--text-muted);">UP State Police background check (No criminal record)</p>
        </div>
        <span class="verify-badge emerald">✓ Cleared</span>
      </div>
      <div class="kyc-step-item" style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border-light);">
        <div>
          <strong>Ministry of Tourism License</strong>
          <p style="font-size: 0.75rem; color: var(--text-muted);">Regional Level Guide (Northern Region) #RLG-NR-5521</p>
        </div>
        <span class="verify-badge amber">★ Tier 4 Master</span>
      </div>
      <div class="kyc-step-item" style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;">
        <div>
          <strong>First Aid & Tourist Emergency Certification</strong>
          <p style="font-size: 0.75rem; color: var(--text-muted);">Indian Red Cross Society Certified</p>
        </div>
        <span class="verify-badge emerald">✓ Certified</span>
      </div>
    `;
  }

  initBecomeGuideWizard() {
    const nextBtn = document.getElementById("btn-become-next");
    const prevBtn = document.getElementById("btn-become-prev");
    const uploadArea = document.getElementById("bg-upload-lic");
    const fileInput = document.getElementById("bg-file-input");
    const uploadBadge = document.getElementById("upload-status-badge");

    let currentStep = 1;

    if (uploadArea && fileInput) {
      uploadArea.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", () => {
        if (uploadBadge) uploadBadge.classList.remove("hidden");
        app.showToast("License Attached", "Tourism_License.pdf attached for verification.", "success");
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentStep === 1) {
          currentStep = 2;
          document.getElementById("become-step-1")?.classList.add("hidden");
          document.getElementById("become-step-2")?.classList.remove("hidden");
          document.getElementById("guide-wizard-step").textContent = "2";
          document.getElementById("guide-wizard-progress").style.width = "66%";
          if (prevBtn) prevBtn.disabled = false;
        } else if (currentStep === 2) {
          currentStep = 3;
          document.getElementById("become-step-2")?.classList.add("hidden");
          document.getElementById("become-step-3")?.classList.remove("hidden");
          document.getElementById("guide-wizard-step").textContent = "3";
          document.getElementById("guide-wizard-progress").style.width = "100%";
          nextBtn.textContent = "Submit Application";
        } else if (currentStep === 3) {
          document.getElementById("become-step-3")?.classList.add("hidden");
          document.getElementById("become-success-overlay")?.classList.remove("hidden");
          document.getElementById("become-wizard-footer")?.classList.add("hidden");
          app.showToast("Application Submitted! 🇮🇳", "Your credentials have been queued for Top 1% vetting.", "success");
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentStep === 2) {
          currentStep = 1;
          document.getElementById("become-step-2")?.classList.add("hidden");
          document.getElementById("become-step-1")?.classList.remove("hidden");
          document.getElementById("guide-wizard-step").textContent = "1";
          document.getElementById("guide-wizard-progress").style.width = "33%";
          prevBtn.disabled = true;
        } else if (currentStep === 3) {
          currentStep = 2;
          document.getElementById("become-step-3")?.classList.add("hidden");
          document.getElementById("become-step-2")?.classList.remove("hidden");
          document.getElementById("guide-wizard-step").textContent = "2";
          document.getElementById("guide-wizard-progress").style.width = "66%";
          if (nextBtn) nextBtn.textContent = "Next Step";
        }
      });
    }

    const doneBtn = document.getElementById("btn-become-success-done");
    if (doneBtn) {
      doneBtn.addEventListener("click", () => {
        document.getElementById("section-become-guide")?.classList.add("hidden");
        document.getElementById("section-explore")?.classList.remove("hidden");
      });
    }
  }
}

let guidePortalInstance = null;
document.addEventListener("DOMContentLoaded", () => {
  guidePortalInstance = new GuidePortal();
});
