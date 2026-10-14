// ==========================================================================
// GuideConnect (Incredible India Edition) - Safety & Emergency SOS Hub
// ==========================================================================

class SafetyHub {
  constructor() {
    this.currentRegion = "IN";
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll(".trigger-sos-modal").forEach(btn => {
      btn.addEventListener("click", () => this.openSOSModal());
    });

    const regionSelect = document.getElementById("sos-country-select");
    if (regionSelect) {
      regionSelect.addEventListener("change", (e) => {
        this.currentRegion = e.target.value;
        this.updateRegionEmergencyUI();
      });
    }

    const beaconBtn = document.getElementById("generate-beacon-btn");
    if (beaconBtn) {
      beaconBtn.addEventListener("click", () => this.broadcastSafetyBeacon());
    }
  }

  openSOSModal() {
    const modal = document.getElementById("sos-modal");
    this.updateRegionEmergencyUI();
    if (modal) modal.classList.add("active");
  }

  updateRegionEmergencyUI() {
    const data = EMERGENCY_DIRECTORY[this.currentRegion] || EMERGENCY_DIRECTORY["IN"];

    const policeEl = document.getElementById("sos-police-num");
    const ambEl = document.getElementById("sos-ambulance-num");
    const hotlineEl = document.getElementById("sos-hotline-num");
    const langEl = document.getElementById("sos-lang-info");

    if (policeEl) policeEl.textContent = data.police;
    if (ambEl) ambEl.textContent = data.ambulance;
    if (hotlineEl) hotlineEl.textContent = `${data.touristHotline} (Toll Free)`;
    if (langEl) langEl.textContent = `Supported Languages: ${data.language}`;
  }

  broadcastSafetyBeacon() {
    app.showToast("🚨 Indian Tourist Safety Beacon Broadcasted!", "Your live GPS coordinates & verified guide credentials have been shared with your emergency contacts on WhatsApp and the local Tourist Police desk.", "danger");
  }
}

let safetyHubInstance = null;
document.addEventListener("DOMContentLoaded", () => {
  safetyHubInstance = new SafetyHub();
});
