// ==========================================================================
// GuideConnect (Incredible India Edition) - Comprehensive Booking & Multi-Payment Engine
// ==========================================================================

class BookingSystem {
  constructor() {
    this.selectedGuide = null;
    this.selectedPackage = null;
    this.selectedVIPOffer = null;
    this.activePaymentMethod = "card"; // card | upi | netbanking | applepay

    this.bookingState = {
      date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      timeSlot: "Morning Darshan / Walk (06:00 - 10:00 AM)",
      guests: 2,
      customNotes: "",
      promoCode: "",
      discountPercent: 0,
      includeInsurance: true,
      calculatedTotalINR: 2998
    };

    this.trips = this.loadTrips();
    this.bindEvents();
    this.renderTripsList();
  }

  loadTrips() {
    try {
      const stored = localStorage.getItem("guideconnect_my_trips_in");
      return stored ? JSON.parse(stored) : INITIAL_MY_TRIPS;
    } catch (e) {
      return INITIAL_MY_TRIPS;
    }
  }

  saveTrips() {
    try {
      localStorage.setItem("guideconnect_my_trips_in", JSON.stringify(this.trips));
    } catch (e) {
      console.warn("Storage failed", e);
    }
  }

  bindEvents() {
    // Promo Code Apply
    const applyPromoBtn = document.getElementById("apply-promo-btn");
    if (applyPromoBtn) {
      applyPromoBtn.addEventListener("click", () => this.applyPromoCode());
    }

    // Time Slot Buttons
    document.querySelectorAll(".time-slot-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".time-slot-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        this.bookingState.timeSlot = btn.dataset.slot;
        this.updatePriceBreakdown();
      });
    });

    // Guest counter
    const guestInput = document.getElementById("booking-guests-input");
    if (guestInput) {
      guestInput.addEventListener("input", (e) => {
        this.bookingState.guests = parseInt(e.target.value) || 1;
        this.updatePriceBreakdown();
      });
    }

    // Date picker
    const dateInput = document.getElementById("booking-date-input");
    if (dateInput) {
      dateInput.value = this.bookingState.date;
      dateInput.addEventListener("change", (e) => {
        this.bookingState.date = e.target.value;
      });
    }

    // Proceed to Checkout
    const confirmBtn = document.getElementById("complete-booking-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => this.openCheckoutModal());
    }

    // Payment Form & Simulator inputs
    this.bindPaymentTabsAndSimulator();
  }

  bindPaymentTabsAndSimulator() {
    const cardNumInput = document.getElementById("card-number");
    const cardHolderInput = document.getElementById("card-holder-name");
    const cardExpiryInput = document.getElementById("card-expiry");
    const cardForm = document.getElementById("payment-details-form");

    if (cardNumInput) {
      cardNumInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = val;
        const disp = document.getElementById("card-num-disp");
        if (disp) disp.textContent = val || "•••• •••• •••• ••••";
      });
    }

    if (cardHolderInput) {
      cardHolderInput.addEventListener("input", (e) => {
        const disp = document.getElementById("card-name-disp");
        if (disp) disp.textContent = (e.target.value.toUpperCase()) || "YOUR NAME";
      });
    }

    if (cardExpiryInput) {
      cardExpiryInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
          val = val.substring(0, 2) + '/' + val.substring(2);
        }
        e.target.value = val;
        const disp = document.getElementById("card-expiry-disp");
        if (disp) disp.textContent = val || "MM/YY";
      });
    }

    if (cardForm) {
      cardForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.executeEscrowPayment();
      });
    }
  }

  setPaymentMethod(method) {
    this.activePaymentMethod = method;
    document.querySelectorAll(".payment-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.method === method);
    });

    const cardSection = document.getElementById("pay-method-card");
    const upiSection = document.getElementById("pay-method-upi");
    const netbankingSection = document.getElementById("pay-method-netbanking");
    const globalSection = document.getElementById("pay-method-global");

    if (cardSection) cardSection.style.display = method === "card" ? "block" : "none";
    if (upiSection) upiSection.style.display = method === "upi" ? "block" : "none";
    if (netbankingSection) netbankingSection.style.display = method === "netbanking" ? "block" : "none";
    if (globalSection) globalSection.style.display = method === "global" ? "block" : "none";
  }

  applyPromoCode() {
    const promoInput = document.getElementById("booking-promo-input");
    if (!promoInput) return;

    const code = promoInput.value.trim().toUpperCase();
    if (code === "NAMASTE10" || code === "INDIA10" || code === "ROYAL10") {
      this.bookingState.discountPercent = 10;
      this.bookingState.promoCode = code;
      app.showToast("Promo Code Applied! 🇮🇳", "10% festive discount applied to your escrow booking.", "success");
    } else {
      this.bookingState.discountPercent = 0;
      app.showToast("Invalid Promo Code", "Try code: NAMASTE10 for 10% off.", "danger");
    }
    this.updatePriceBreakdown();
  }

  openProfile(guideId) {
    const guide = GUIDES_DATABASE.find(g => g.id === guideId);
    if (!guide) return;
    this.selectedGuide = guide;

    const modal = document.getElementById("guide-profile-modal");
    const container = document.getElementById("guide-profile-dynamic-content");
    if (!modal || !container) return;

    const formattedHourly = app.formatCurrency(guide.hourlyRate);

    container.innerHTML = `
      <button class="modal-close-btn" aria-label="Close">×</button>

      <div style="position:relative;height:240px;overflow:hidden;border-radius:var(--radius-xl) var(--radius-xl) 0 0;">
        <img src="${guide.cover}" alt="${guide.location.city}" style="width:100%;height:100%;object-fit:cover;">
        <div class="card-cover-overlay"></div>
        <div style="position:absolute;bottom:1rem;left:1.5rem;color:white;">
          <span class="verify-badge emerald" style="font-size:0.8rem;">🏆 Top 1% Verified Scholar</span>
          <h2 style="font-size:1.8rem;font-weight:900;margin-top:0.3rem;">${guide.name}</h2>
          <p style="font-size:0.85rem;opacity:0.9;">📍 ${guide.location.city}, ${guide.location.state} • ${guide.title}</p>
        </div>
      </div>

      <div style="padding:1.75rem;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));gap:1rem;margin-bottom:1.5rem;background:var(--bg-card-subtle);padding:1rem;border-radius:var(--radius-md);">
          <div>
            <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">RATING</div>
            <div style="font-size:1.15rem;font-weight:900;color:var(--accent-amber);">★ ${guide.rating} <span style="font-size:0.8rem;color:var(--text-muted);">(${guide.reviewCount} reviews)</span></div>
          </div>
          <div>
            <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">EXPERIENCE</div>
            <div style="font-size:1.15rem;font-weight:900;">${guide.experienceYears} Years</div>
          </div>
          <div>
            <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">HOURLY RATE</div>
            <div style="font-size:1.15rem;font-weight:900;color:var(--primary);">${formattedHourly} / hr</div>
          </div>
          <div>
            <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;">LANGUAGES</div>
            <div style="font-size:0.85rem;font-weight:700;">${guide.languages.map(l => l.name).join(", ")}</div>
          </div>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1.1rem;font-weight:800;margin-bottom:0.5rem;">Expert Profile & Background</h4>
          <p style="font-size:0.92rem;line-height:1.65;color:var(--text-main);">${guide.bio}</p>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1.1rem;font-weight:800;margin-bottom:0.75rem;">Verified Government Credentials</h4>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            ${guide.verificationBadges.map(b => `
              <span class="verify-badge ${b.color}" style="padding:0.4rem 0.8rem;font-size:0.82rem;">
                ${b.icon} ${b.label}
              </span>
            `).join("")}
          </div>
        </div>

        <div style="margin-bottom:1.75rem;">
          <h4 style="font-size:1.1rem;font-weight:800;margin-bottom:0.75rem;">Curated Experience Packages</h4>
          <div style="display:flex;flex-direction:column;gap:0.75rem;">
            ${guide.packages.map(pkg => `
              <div style="background:var(--bg-card-subtle);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
                  <h5 style="font-size:1rem;font-weight:800;">${pkg.title}</h5>
                  <strong style="color:var(--primary);font-size:1.1rem;">${app.formatCurrency(pkg.pricePerPerson)} / person</strong>
                </div>
                <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.5rem;">⏱️ Duration: ${pkg.durationHours} hours</div>
                <ul style="font-size:0.82rem;padding-left:1.2rem;color:var(--text-main);line-height:1.5;">
                  ${pkg.highlights.map(h => `<li>${h}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="display:flex;gap:0.75rem;justify-content:flex-end;border-top:1px solid var(--border-color);padding-top:1.25rem;">
          <button class="btn btn-secondary" onclick="document.getElementById('guide-profile-modal').classList.remove('active');app.openChat('${guide.id}')">💬 Direct Chat</button>
          <button class="btn btn-primary" onclick="bookingSystemInstance.openBooking('${guide.id}')">⚡ Instant Escrow Booking</button>
        </div>
      </div>
    `;

    container.querySelector(".modal-close-btn")?.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.classList.add("active");
  }

  openBooking(guideId) {
    const guide = GUIDES_DATABASE.find(g => g.id === guideId);
    if (!guide) return;
    this.selectedGuide = guide;
    this.selectedPackage = guide.packages[0];
    this.selectedVIPOffer = null;

    const profileModal = document.getElementById("guide-profile-modal");
    if (profileModal) profileModal.classList.remove("active");

    const modal = document.getElementById("booking-modal");
    if (!modal) return;

    const avatarImg = document.getElementById("booking-guide-avatar");
    const nameEl = document.getElementById("booking-guide-name");
    const locEl = document.getElementById("booking-guide-loc");
    const pkgSelect = document.getElementById("booking-package-select");

    if (avatarImg) avatarImg.src = guide.avatar;
    if (nameEl) nameEl.textContent = `Book ${guide.name}`;
    if (locEl) locEl.textContent = `📍 ${guide.location.city}, ${guide.location.state} • ${guide.title}`;

    if (pkgSelect) {
      pkgSelect.innerHTML = guide.packages.map(p => `
        <option value="${p.id}">${p.title} (${p.durationHours}h) - ${app.formatCurrency(p.pricePerPerson)}/person</option>
      `).join("");

      pkgSelect.onchange = (e) => {
        this.selectedPackage = guide.packages.find(p => p.id === e.target.value) || guide.packages[0];
        this.updatePriceBreakdown();
      };
    }

    this.updatePriceBreakdown();
    modal.classList.add("active");
  }

  openVIPBooking(vipTitle, vipCostINR) {
    this.selectedVIPOffer = {
      title: vipTitle,
      costINR: vipCostINR
    };
    this.selectedGuide = GUIDES_DATABASE[0]; // Aarav Sharma / Royal Coordinator
    this.selectedPackage = {
      title: vipTitle,
      durationHours: 8,
      pricePerPerson: vipCostINR
    };

    this.bookingState.calculatedTotalINR = vipCostINR;

    this.openCheckoutModal();
    app.showToast("👑 Royal VIP Experience", `Selected "${vipTitle}". Proceeding to secure Escrow Check-Out.`, "info");
  }

  updatePriceBreakdown() {
    if (!this.selectedGuide || !this.selectedPackage) return;

    const basePerPersonINR = this.selectedPackage.pricePerPerson;
    const guests = this.bookingState.guests;
    const subtotalINR = basePerPersonINR * guests;

    const discountAmountINR = (subtotalINR * this.bookingState.discountPercent) / 100;
    const safetyFeeINR = 99;
    const totalINR = subtotalINR - discountAmountINR + safetyFeeINR;

    this.bookingState.calculatedTotalINR = totalINR;

    const subtotalEl = document.getElementById("summary-subtotal");
    const discountEl = document.getElementById("summary-discount");
    const totalEl = document.getElementById("summary-total");

    if (subtotalEl) subtotalEl.textContent = app.formatCurrency(subtotalINR);
    if (discountEl) discountEl.textContent = `-${app.formatCurrency(discountAmountINR)}`;
    if (totalEl) totalEl.textContent = app.formatCurrency(totalINR);
  }

  openCheckoutModal() {
    const bookingModal = document.getElementById("booking-modal");
    if (bookingModal) bookingModal.classList.remove("active");

    const checkoutModal = document.getElementById("modal-payment");
    if (!checkoutModal) return;

    const totalINR = this.bookingState.calculatedTotalINR || 2998;
    const formattedTotal = app.formatCurrency(totalINR);

    const chargeBtnPrice = document.getElementById("checkout-charge-btn-price");
    const upiPrice = document.getElementById("checkout-upi-btn-price");
    const netbankingPrice = document.getElementById("checkout-netbanking-btn-price");
    const globalPrice = document.getElementById("checkout-global-btn-price");

    if (chargeBtnPrice) chargeBtnPrice.textContent = formattedTotal;
    if (upiPrice) upiPrice.textContent = formattedTotal;
    if (netbankingPrice) netbankingPrice.textContent = formattedTotal;
    if (globalPrice) globalPrice.textContent = formattedTotal;

    this.setPaymentMethod(this.activePaymentMethod || "card");
    checkoutModal.classList.add("active");
  }

  executeEscrowPayment() {
    const checkoutModal = document.getElementById("modal-payment");
    if (!checkoutModal) return;

    // Show processing state on the submit button
    const activeBtn = checkoutModal.querySelector("button[type='submit']:not([style*='none'])");
    const originalText = activeBtn ? activeBtn.innerHTML : "";

    if (activeBtn) {
      activeBtn.disabled = true;
      activeBtn.innerHTML = `🔒 Connecting to Escrow Bank...`;
    }

    setTimeout(() => {
      if (activeBtn) {
        activeBtn.disabled = false;
        activeBtn.innerHTML = originalText;
      }
      checkoutModal.classList.remove("active");

      const guide = this.selectedGuide || GUIDES_DATABASE[0];
      const pkgTitle = this.selectedVIPOffer ? this.selectedVIPOffer.title : (this.selectedPackage ? this.selectedPackage.title : "Heritage Exploration Walk");

      const newTrip = {
        bookingId: `GC-${guide.location.city.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        guideId: guide.id,
        guideName: guide.name,
        guideAvatar: guide.avatar,
        city: guide.location.city,
        state: guide.location.state,
        packageTitle: pkgTitle,
        date: this.bookingState.date,
        timeSlot: this.bookingState.timeSlot,
        guests: this.bookingState.guests,
        totalPriceINR: this.bookingState.calculatedTotalINR || 2998,
        meetupLocation: `${guide.location.neighborhoods[0]} Main Heritage Gate`,
        status: "Confirmed",
        qrCodeData: `GC-CONFIRMED-ESCROW-${Date.now()}`
      };

      this.trips.unshift(newTrip);
      this.saveTrips();
      this.renderTripsList();

      this.showSuccessModal(newTrip);
    }, 1200);
  }

  showSuccessModal(trip) {
    const nameEl = document.getElementById("success-guide-name");
    const dateEl = document.getElementById("success-booking-date");
    const hoursEl = document.getElementById("success-booking-hours");
    const sectionSuccess = document.getElementById("section-booking-success");

    if (nameEl) nameEl.textContent = trip.guideName;
    if (dateEl) dateEl.textContent = `${trip.date} (${trip.timeSlot})`;
    if (hoursEl) hoursEl.textContent = `${trip.guests} Travelers`;

    if (sectionSuccess) {
      sectionSuccess.classList.remove("hidden");
    }

    app.showToast("🎉 Booking Confirmed & Escrow Secured!", `Your funds are held safely in escrow for ${trip.guideName}.`, "success");

    // Wire up Success actions
    const chatBtn = document.getElementById("btn-success-chat");
    if (chatBtn) {
      chatBtn.onclick = () => {
        sectionSuccess.classList.add("hidden");
        app.openChat(trip.guideId);
      };
    }

    const dashBtn = document.getElementById("btn-success-dashboard");
    if (dashBtn) {
      dashBtn.onclick = () => {
        sectionSuccess.classList.add("hidden");
        document.getElementById("my-trips-section")?.scrollIntoView({ behavior: "smooth" });
      };
    }
  }

  renderTripsList() {
    const container = document.getElementById("my-trips-list");
    if (!container) return;

    if (this.trips.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:3rem;background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg);">
          <h4>No Booked Trips Yet</h4>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-top:0.4rem;">Browse verified guides across India and book with escrow protection.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.trips.map(trip => `
      <div class="booking-request-card" style="border-left: 4px solid var(--primary); margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <img src="${trip.guideAvatar}" alt="${trip.guideName}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h4 style="font-size: 1.15rem; font-weight: 800;">${trip.packageTitle}</h4>
                <span class="verify-badge emerald">${trip.status}</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Guide: <strong>${trip.guideName}</strong> • 📍 ${trip.city}, ${trip.state}</p>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.8rem; color: var(--text-muted);">Ref: ${trip.bookingId}</span>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${app.formatCurrency(trip.totalPriceINR)}</div>
          </div>
        </div>

        <div style="background: var(--bg-card-subtle); padding: 0.85rem; border-radius: var(--radius-sm); display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem; font-size: 0.82rem; margin-top: 0.85rem;">
          <div>📅 <strong>Date:</strong> ${trip.date}</div>
          <div>⏰ <strong>Time:</strong> ${trip.timeSlot}</div>
          <div>👥 <strong>Party:</strong> ${trip.guests} Travelers</div>
          <div>📍 <strong>Meetup:</strong> ${trip.meetupLocation}</div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.85rem;">
          <button class="btn btn-secondary btn-sm" onclick="app.openChat('${trip.guideId}')">
            💬 Message Guide
          </button>
          <button class="btn btn-primary btn-sm" onclick="bookingSystemInstance.showVoucherModal('${trip.bookingId}')">
            🎟️ View QR Voucher
          </button>
        </div>
      </div>
    `).join("");
  }

  showVoucherModal(bookingId) {
    const trip = this.trips.find(t => t.bookingId === bookingId) || this.trips[0];
    if (!trip) return;

    const modal = document.getElementById("voucher-modal");
    const container = document.getElementById("voucher-modal-content");
    if (!modal || !container) return;

    container.innerHTML = `
      <button class="modal-close-btn" onclick="document.getElementById('voucher-modal').classList.remove('active')">×</button>

      <div style="text-align:center;border-bottom:1px dashed var(--border-color);padding-bottom:1.5rem;margin-bottom:1.5rem;">
        <div style="font-size:2rem;margin-bottom:0.4rem;">🧭</div>
        <h3 style="font-size:1.4rem;font-weight:900;">Verified Tourist QR Pass</h3>
        <p style="font-size:0.8rem;color:var(--text-muted);">Ministry of Tourism Accredited SafeWalk Pass</p>
      </div>

      <div style="background:white;padding:1.5rem;border-radius:var(--radius-md);text-align:center;box-shadow:var(--shadow-sm);margin-bottom:1.5rem;border:1px solid #cbd5e1;">
        <!-- High-Precision QR Code SVG -->
        <svg viewBox="0 0 120 120" style="width:140px;height:140px;margin:0 auto;display:block;">
          <rect width="120" height="120" fill="white"/>
          <rect x="10" y="10" width="30" height="30" fill="#0f172a"/>
          <rect x="15" y="15" width="20" height="20" fill="white"/>
          <rect x="20" y="20" width="10" height="10" fill="#0f172a"/>
          <rect x="80" y="10" width="30" height="30" fill="#0f172a"/>
          <rect x="85" y="15" width="20" height="20" fill="white"/>
          <rect x="90" y="20" width="10" height="10" fill="#0f172a"/>
          <rect x="10" y="80" width="30" height="30" fill="#0f172a"/>
          <rect x="15" y="85" width="20" height="20" fill="white"/>
          <rect x="20" y="90" width="10" height="10" fill="#0f172a"/>
          <rect x="45" y="15" width="10" height="20" fill="#0f172a"/>
          <rect x="60" y="25" width="15" height="10" fill="#0f172a"/>
          <rect x="45" y="45" width="30" height="30" fill="#0f766e"/>
          <rect x="15" y="55" width="20" height="10" fill="#0f172a"/>
          <rect x="85" y="55" width="25" height="10" fill="#0f172a"/>
          <rect x="55" y="85" width="20" height="25" fill="#0f172a"/>
          <rect x="85" y="85" width="20" height="10" fill="#0f172a"/>
        </svg>
        <div style="font-family:monospace;font-size:0.85rem;font-weight:700;color:#0f172a;margin-top:0.75rem;">
          PASS REF: ${trip.bookingId}
        </div>
      </div>

      <div style="font-size:0.85rem;display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1.5rem;">
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">Tour Experience:</span>
          <strong>${trip.packageTitle}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">Verified Guide:</span>
          <strong>${trip.guideName}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">Scheduled Date:</span>
          <strong>${trip.date} (${trip.timeSlot})</strong>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">Meeting Point:</span>
          <strong>${trip.meetupLocation}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span style="color:var(--text-muted);">Escrow Status:</span>
          <strong style="color:var(--accent-emerald);">🛡️ 100% Protected (${app.formatCurrency(trip.totalPriceINR)})</strong>
        </div>
      </div>

      <button class="btn btn-primary btn-full" onclick="document.getElementById('voucher-modal').classList.remove('active');app.showToast('Voucher Saved', 'Digital Pass saved to your phone.', 'success');">
        💾 Save Pass / Print PDF
      </button>
    `;

    modal.classList.add("active");
  }
}

window.bookingSystemInstance = new BookingSystem();
