// ==========================================================================
// GuideConnect (Incredible India Edition) - Interactive Leaflet Map Explorer
// ==========================================================================

class GuideMapExplorer {
  constructor() {
    this.map = null;
    this.markers = [];
    this.currentCity = "all";
    this.initMap();
    this.bindSidebar();
  }

  initMap() {
    const mapElement = document.getElementById("leaflet-map-container");
    if (!mapElement) return;

    if (typeof L === "undefined") {
      console.warn("Leaflet library not loaded yet.");
      return;
    }

    // Centered on the Indian Subcontinent
    this.map = L.map("leaflet-map-container", {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([22.5937, 78.9629], 5);

    // Modern clean CartoDB Voyager tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(this.map);

    this.renderMarkers(GUIDES_DATABASE);
    this.renderSidebarGuides(GUIDES_DATABASE);
  }

  renderMarkers(guides) {
    if (!this.map) return;

    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    guides.forEach(guide => {
      const [lat, lng] = guide.location.coordinates;
      const formattedRate = app ? app.formatCurrency(guide.hourlyRate) : `₹${guide.hourlyRate}`;

      const customIcon = L.divIcon({
        className: "custom-guide-pin",
        html: `
          <div class="pin-content">
            <span style="font-size: 10px;">★ ${guide.rating}</span>
            <span>${formattedRate}/h</span>
          </div>
        `,
        iconSize: [80, 28],
        iconAnchor: [40, 14]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);

      const popupContent = `
        <div style="font-family: inherit; padding: 4px; max-width: 200px;">
          <div style="font-weight: 800; font-size: 1rem; color: #0f172a;">${guide.name}</div>
          <div style="font-size: 0.75rem; color: #64748b;">📍 ${guide.location.city}, ${guide.location.state}</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: #0f766e; margin: 4px 0;">
            ${formattedRate} / hour • ★ ${guide.rating}
          </div>
          <p style="font-size: 0.72rem; color: #334155; line-height: 1.3; margin-bottom: 8px;">
            ${guide.tagline.substring(0, 75)}...
          </p>
          <button style="width: 100%; background: #0f766e; color: white; border: none; padding: 5px; border-radius: 4px; font-weight: 700; font-size: 0.75rem; cursor: pointer;" onclick="app.openGuideProfile('${guide.id}')">
            View Verified Profile
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      this.markers.push(marker);
    });
  }

  renderSidebarGuides(guides) {
    const listContainer = document.getElementById("map-sidebar-guides-list");
    if (!listContainer) return;

    listContainer.innerHTML = guides.map(guide => {
      const formattedRate = app ? app.formatCurrency(guide.hourlyRate) : `₹${guide.hourlyRate}`;
      return `
        <div class="map-guide-mini-card" onclick="mapExplorerInstance.focusGuide('${guide.id}')" style="display:flex;align-items:center;gap:0.75rem;padding:0.65rem;border-radius:var(--radius-sm);cursor:pointer;transition:background 0.2s;border-bottom:1px solid var(--border-light);">
          <img src="${guide.avatar}" alt="${guide.name}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0;">
          <div class="map-guide-mini-info" style="flex:1;">
            <h5 style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${guide.name}</h5>
            <p style="font-size:0.75rem;color:var(--text-muted);">📍 ${guide.location.city} • ★ ${guide.rating} (${formattedRate}/h)</p>
          </div>
        </div>
      `;
    }).join("");
  }

  bindSidebar() {
    const filterSelect = document.getElementById("map-city-filter");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        const city = e.target.value;
        if (city === "all") {
          this.resetMapView();
        } else {
          this.focusCity(city);
        }
      });
    }
  }

  focusGuide(guideId) {
    const guide = GUIDES_DATABASE.find(g => g.id === guideId);
    if (!guide || !this.map) return;

    const [lat, lng] = guide.location.coordinates;
    this.map.flyTo([lat, lng], 13, { duration: 1.5 });

    const marker = this.markers.find(m => {
      const pos = m.getLatLng();
      return Math.abs(pos.lat - lat) < 0.001 && Math.abs(pos.lng - lng) < 0.001;
    });

    if (marker) {
      setTimeout(() => marker.openPopup(), 1600);
    }
  }

  focusCity(cityName) {
    const guide = GUIDES_DATABASE.find(g => g.location.city.toLowerCase() === cityName.toLowerCase());
    if (!guide || !this.map) return;

    const [lat, lng] = guide.location.coordinates;
    this.map.flyTo([lat, lng], 11, { duration: 1.5 });
  }

  resetMapView() {
    if (!this.map) return;
    this.map.flyTo([22.5937, 78.9629], 5, { duration: 1.2 });
  }
}

let mapExplorerInstance = null;
document.addEventListener("DOMContentLoaded", () => {
  mapExplorerInstance = new GuideMapExplorer();
});
