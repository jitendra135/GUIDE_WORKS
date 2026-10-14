// ==========================================================================
// GuideConnect (Incredible India Edition) - Comprehensive Database & Store
// ==========================================================================

const CURRENCY_RATES = {
  INR: { symbol: "₹", rate: 1, label: "₹ INR" },
  USD: { symbol: "$", rate: 0.012, label: "$ USD" },
  EUR: { symbol: "€", rate: 0.011, label: "€ EUR" },
  GBP: { symbol: "£", rate: 0.0095, label: "£ GBP" },
  JPY: { symbol: "¥", rate: 1.85, label: "¥ JPY" }
};

const GUIDES_DATABASE = [
  {
    id: "g-varanasi-01",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      countryCode: "IN",
      coordinates: [25.3176, 82.9739],
      neighborhoods: ["Dashashwamedh Ghat", "Assi Ghat", "Manikarnika", "Old City Galis", "Sarnath"]
    },
    title: "Sanskrit Scholar, Ganga Heritage Guardian & 5th-Gen Kashi Resident",
    tagline: "Experience the eternal city's spiritual depth, sunrise rowing, and sacred rituals with reverence and zero hassle.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "UP Police Background Cleared (PCC)", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India #RLG-NR-5521", icon: "🏅", color: "amber" },
      { id: "sanskrit", label: "MA Sanskrit & Vedic Philosophy (BHU)", icon: "📚", color: "purple" }
    ],
    experienceYears: 11,
    languages: [
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "Sanskrit", level: "Scholar", code: "sa", flag: "🕉️" },
      { name: "French", level: "Conversational (B2)", code: "fr", flag: "🇫🇷" }
    ],
    rating: 4.99,
    reviewCount: 520,
    completedTours: 1140,
    hourlyRate: 750,
    currency: "INR",
    personality: ["Spiritual", "Philosophical", "Calm", "Storyteller"],
    categories: ["Spiritual & Wellness", "Culture & History", "Photography", "Hidden Gems"],
    bio: "Namaste. Varanasi is my ancestral home for five generations. As an accredited Regional Level Guide certified by the Ministry of Tourism and a Sanskrit master graduate from Banaras Hindu University (BHU), I lead travelers through silent dawn rowing on the sacred Ganga, private access to ancient alleyways, Vedic chanting, and safe, scam-free experiences at the evening Maha Aarti.",
    responseTime: "< 10 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-v-1",
        title: "Mystic Sunrise Wooden Boat Row & Old Kashi Heritage Galis",
        durationHours: 4,
        pricePerPerson: 1499,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Private wooden rowing boat at 05:30 AM catching golden morning mist",
          "Deep philosophical commentary on the 84 sacred ghats and Ganga rituals",
          "Walk through 1,000-year-old silk weaver and ancient spice alleys",
          "Authentic Banarasi Malaiyo sweet and kulhad masala chai tasting"
        ],
        includes: ["Private boat ride pass", "Ministry-licensed guide", "Banarasi breakfast & chai", "Shoe cover kits"],
        excludes: ["Silk textile shopping"]
      },
      {
        id: "pkg-v-2",
        title: "VIP Dashashwamedh Ganga Aarti & Sarnath Buddhist Legacy",
        durationHours: 5.5,
        pricePerPerson: 2200,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Reserved priority rooftop seating for the magnificent Dashashwamedh Maha Aarti",
          "Excursion to Sarnath where Lord Buddha gave his first sermon at Deer Park",
          "Dhamek Stupa archaeological excavation and Ashoka Pillar lion capital",
          "Safe AC vehicle transport with verified tourist driver"
        ],
        includes: ["Reserved Aarti viewing spot", "All monument entry passes", "Private AC transport", "Licensed guide"],
        excludes: ["Temple donation offerings"]
      }
    ],
    reviews: [
      {
        id: "rev-v-1",
        author: "Dr. Sunita & Rajesh Verma",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        country: "Bangalore, India 🇮🇳",
        date: "January 2026",
        rating: 5.0,
        tourName: "Mystic Sunrise Wooden Boat Row",
        comment: "Aarav ji made our Varanasi darshan peaceful, uplifting, and completely shielded from crowded touts. His deep knowledge of Sanskrit slokas brought tears to our eyes. Highly recommended for families with elders!",
        verifiedBooking: true
      },
      {
        id: "rev-v-2",
        author: "Claire & Thomas Bernard",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        country: "France 🇫🇷",
        date: "February 2026",
        rating: 5.0,
        tourName: "VIP Dashashwamedh Ganga Aarti",
        comment: "Aarav spoke impeccable French and English! He made navigating the labyrinth of Varanasi feel safe and serene. Best guide experience in India.",
        verifiedBooking: true
      }
    ]
  },
  {
    id: "g-jaipur-02",
    name: "Rajveer Singh Rathore",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      countryCode: "IN",
      coordinates: [26.9124, 75.7873],
      neighborhoods: ["Pink City Walled Quarter", "Amer Fort", "Nahargarh", "Johari Bazaar"]
    },
    title: "Rajput Royal Heritage Historian & Haveli Architecture Specialist",
    tagline: "Explore secret corridors of Amer Fort, royal astronomical secrets of Jantar Mantar, and authentic Rajasthani culinary jewels.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Rajasthan Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India #RLG-WR-3382", icon: "🏅", color: "amber" },
      { id: "lineage", label: "Royal Rajput Lineage Historian", icon: "👑", color: "purple" }
    ],
    experienceYears: 14,
    languages: [
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "Rajasthani", level: "Native", code: "raj", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "German", level: "Fluent (C1)", code: "de", flag: "🇩🇪" }
    ],
    rating: 4.98,
    reviewCount: 460,
    completedTours: 980,
    hourlyRate: 850,
    currency: "INR",
    personality: ["Storyteller", "Historian", "Enthusiastic", "Passionate"],
    categories: ["Culture & History", "Culinary & Street Food", "Bazaars & Artisans", "Hidden Gems"],
    bio: "Khamma Ghani! I am Rajveer. With an MA in Medieval Indian History and 14 years guiding diplomats and cultural travelers, I take you beyond standard tourist tracks in Jaipur. From the secret water harvesting systems of Amer Fort to 300-year-old lac bangle makers in the Pink City alleyways, experience Rajasthan's royal soul.",
    responseTime: "< 5 minutes",
    responseRate: "99%",
    availableNow: true,
    packages: [
      {
        id: "pkg-j-1",
        title: "Secret Amer Fort Royal Passages & Stepwell Twilight Walk",
        durationHours: 4.5,
        pricePerPerson: 1699,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Private access exploration of Jaigarh underground escape tunnels",
          "Mirror Palace (Sheesh Mahal) lighting demonstration & acoustic secrets",
          "Sunset view over Maota Lake with traditional Rajasthani royal tea",
          "Visit to the 16th-century Panna Meena Ka Kund architectural stepwell"
        ],
        includes: ["Monuments fast-track escort", "Royal tea tasting", "Licensed guide"],
        excludes: ["Elephant rides"]
      },
      {
        id: "pkg-j-2",
        title: "Pink City Artisan Bazaars, Gem Cutting & Royal Thali Trail",
        durationHours: 4,
        pricePerPerson: 1350,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Behind-the-scenes gem polishers & emerald cutters in Johari Bazaar",
          "Traditional block-printing workshop demonstration with master artisan",
          "Authentic street food stops: Pyaz Kachori, Ghewar & Lassi at Lassiwala",
          "Rooftop sunset view overlooking Hawa Mahal"
        ],
        includes: ["All heritage food tastings", "Artisan workshop access", "Mineral water bottles"],
        excludes: ["Gemstone purchases"]
      }
    ],
    reviews: [
      {
        id: "rev-j-1",
        author: "Stefan & Helga Weber",
        authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        country: "Germany 🇩🇪",
        date: "February 2026",
        rating: 5.0,
        tourName: "Secret Amer Fort Royal Passages",
        comment: "Rajveer's German is absolutely flawless! He gave us a tour of Amer Fort that felt like stepping straight into a history novel. No touts, no tourist shops, pure authentic history.",
        verifiedBooking: true
      }
    ]
  },
  {
    id: "g-agra-03",
    name: "Farhan Mirza",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Agra",
      state: "Uttar Pradesh",
      country: "India",
      countryCode: "IN",
      coordinates: [27.1751, 78.0421],
      neighborhoods: ["Taj Ganj", "Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"]
    },
    title: "Senior ASI Mughal Monument Historian & Taj Mahal Sunrise Specialist",
    tagline: "Witness the Taj Mahal's marble glow at dawn without tourist chaos, decoding 400-year-old pietra dura marble inlays.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "UP Tourism Police Cleared", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Archaeological Survey of India (ASI) License #ASI-AG-1102", icon: "🏅", color: "amber" },
      { id: "mughal", label: "Mughal Islamic Calligraphy Expert", icon: "🏛️", color: "purple" }
    ],
    experienceYears: 16,
    languages: [
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "Urdu", level: "Native", code: "ur", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "Spanish", level: "Fluent (C1)", code: "es", flag: "🇪🇸" }
    ],
    rating: 4.99,
    reviewCount: 680,
    completedTours: 1420,
    hourlyRate: 800,
    currency: "INR",
    personality: ["Historian", "Photographer", "Articulate", "Gentle"],
    categories: ["Culture & History", "Photography", "Hidden Gems"],
    bio: "As a descendant of artisans who contributed to Mughal Agra and a senior Archaeological Survey of India (ASI) certified master guide, I have spent 16 years guiding art historians, architectural scholars, and families. My sunrise tours decode the Quranic calligraphy, optical illusions, and semi-precious stone inlays.",
    responseTime: "< 5 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-a-1",
        title: "Taj Mahal Dawn Glow & Optical Illusions Master Walk",
        durationHours: 3.5,
        pricePerPerson: 1600,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Priority 05:45 AM sunrise gate entry bypassing tourist queues",
          "Pietra Dura (Parchin Kari) gemstone inlay secrets decoded",
          "Optimal photography angle coaching for uncrowded Taj portraits",
          "Private garden walk along Yamuna River bank"
        ],
        includes: ["Skip-the-line escort", "ASI licensed guide", "Shoe covers & battery car transport"],
        excludes: ["Monument entry tickets"]
      },
      {
        id: "pkg-a-2",
        title: "Mughal Imperial Axis: Agra Fort & Secret Mehtab Bagh Sunset",
        durationHours: 4.5,
        pricePerPerson: 1500,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Shah Jahan's royal prison chamber overlooking the Taj Mahal",
          "Mughal water-cooling palace chambers and acoustics",
          "Sunset boat angle viewing of the Taj from Mehtab Bagh across the Yamuna",
          "Agra Petha & Bedmi Puri traditional food stops"
        ],
        includes: ["Private licensed guide", "Heritage snacks tasting", "Local transport assistance"],
        excludes: ["Personal shopping"]
      }
    ],
    reviews: [
      {
        id: "rev-a-1",
        author: "Carlos & Elena Gomez",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        country: "Spain 🇪🇸",
        date: "January 2026",
        rating: 5.0,
        tourName: "Taj Mahal Dawn Glow",
        comment: "Farhan habla un español perfecto y su conocimiento de la arquitectura mogol es insuperable. Capturó fotos espectaculares sin gente de fondo.",
        verifiedBooking: true
      }
    ]
  },
  {
    id: "g-kerala-04",
    name: "Ananya Nair",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Kerala",
      state: "Kerala",
      country: "India",
      countryCode: "IN",
      coordinates: [9.9312, 76.2673],
      neighborhoods: ["Fort Kochi", "Mattancherry", "Alleppey Backwaters", "Kumarakom", "Munnar Trails"]
    },
    title: "Kerala Backwaters Naturalist, Spice Historian & Kathakali Curator",
    tagline: "Explore tranquil village backwaters, spice trading heritage of Mattancherry, and authentic Ayurvedic wellness traditions.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Kerala Police Clearance (PCC)", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Kerala Tourism Development Corp (KTDC) Master License", icon: "🏅", color: "amber" },
      { id: "naturalist", label: "Certified Western Ghats Naturalist", icon: "🌿", color: "purple" }
    ],
    experienceYears: 9,
    languages: [
      { name: "Malayalam", level: "Native", code: "ml", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "Hindi", level: "Fluent", code: "hi", flag: "🇮🇳" },
      { name: "Tamil", level: "Conversational", code: "ta", flag: "🇮🇳" }
    ],
    rating: 4.99,
    reviewCount: 390,
    completedTours: 840,
    hourlyRate: 700,
    currency: "INR",
    personality: ["Naturalist", "Calm", "Wellness-Focused", "Engaging"],
    categories: ["Nature & Adventure", "Culinary & Street Food", "Culture & History", "Spiritual & Wellness"],
    bio: "Namaskaram! I am Ananya, an environmental biology graduate and certified Kerala Tourism master guide. I host immersive slow-travel journeys through Alleppey's quietest village backwaters on non-motorized canoes, spice plantation botanic walks, and Fort Kochi's 500-year-old Portuguese and Jewish history.",
    responseTime: "< 15 minutes",
    responseRate: "98%",
    availableNow: true,
    packages: [
      {
        id: "pkg-k-1",
        title: "Silent Canoe Alleppey Village Backwaters & Organic Sadya Feast",
        durationHours: 5,
        pricePerPerson: 1750,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Narrow village canal navigation on traditional hand-rowed country canoe",
          "Duck farming, toddy tapping, and coir rope weaving community visits",
          "Organic banana-leaf Kerala Sadya feast prepared by village family",
          "Kingfisher, heron, and migratory bird watching with binoculars"
        ],
        includes: ["Private canoe & boatman", "Traditional 18-course Sadya meal", "Naturalist guide"],
        excludes: ["Alcoholic beverages"]
      },
      {
        id: "pkg-k-2",
        title: "Fort Kochi Colonial Spice Trail & Kathakali Makeup Secrets",
        durationHours: 4,
        pricePerPerson: 1200,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Chinese Fishing Nets mechanism demonstration with fishermen",
          "Jewish Synagogue, Mattancherry Dutch Palace & spice warehouses",
          "Exclusive behind-the-scenes green-room Kathakali facial makeup",
          "Fresh coconut water & Kerala banana fritter tastings"
        ],
        includes: ["Kathakali theater reserved pass", "Licensed guide", "Spice samples kit"],
        excludes: ["Personal purchases"]
      }
    ],
    reviews: [
      {
        id: "rev-k-1",
        author: "Emily & David Clark",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        country: "UK 🇬🇧",
        date: "February 2026",
        rating: 5.0,
        tourName: "Silent Canoe Alleppey Village Backwaters",
        comment: "The highlight of our 3 weeks in India! Ananya's gentle nature and incredible knowledge of Kerala's ecosystems made the backwaters magical.",
        verifiedBooking: true
      }
    ]
  },
  {
    id: "g-ladakh-05",
    name: "Tsering Dorjay",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Ladakh",
      state: "UT of Ladakh",
      country: "India",
      countryCode: "IN",
      coordinates: [34.1526, 77.5771],
      neighborhoods: ["Leh Old Town", "Hemis Monastery", "Nubra Valley", "Pangong Tso", "Thiksey"]
    },
    title: "High-Altitude Himalayan Trek Leader & Tibetan Buddhist Monastery Historian",
    tagline: "Navigate ancient cliffside gompas, high mountain passes (18,000 ft), and stargazing with certified altitude safety gear.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Ladakh Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Indian Mountaineering Foundation (IMF) & Tourism License", icon: "🏅", color: "amber" },
      { id: "medical", label: "Wilderness First Responder (WFR) Medical Certified", icon: "🩺", color: "purple" }
    ],
    experienceYears: 12,
    languages: [
      { name: "Ladakhi", level: "Native", code: "lb", flag: "🇮🇳" },
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" }
    ],
    rating: 5.0,
    reviewCount: 410,
    completedTours: 620,
    hourlyRate: 900,
    currency: "INR",
    personality: ["Adventurous", "Spiritual", "Vigilant", "Humble"],
    categories: ["Nature & Adventure", "Spiritual & Wellness", "Photography", "Culture & History"],
    bio: "Julley! I am Tsering, born in Leh valley. Trained with the Indian Mountaineering Foundation and certified in high-altitude emergency protocols, I have spent 12 years guiding Himalayan explorations. From private dawn prayers at Thiksey Monastery to high-altitude astronomy under Bortle 1 skies, travel safely in the Himalayas.",
    responseTime: "< 20 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-l-1",
        title: "Monastery Dawn Chanting at Thiksey & Hemis Secret Relics",
        durationHours: 6,
        pricePerPerson: 2200,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "06:00 AM roof-top conch shell blowing & morning monk chanting assembly",
          "Private access to Hemis 400-year-old silk thangka museum vault",
          "Butter tea & traditional Ladakhi Khambir bread breakfast",
          "Altitude pulse oximeter monitoring & emergency oxygen backup"
        ],
        includes: ["Monastery entry passes", "Private 4x4 transport with driver", "Medical oxygen kit on board", "Guide"],
        excludes: ["Personal offerings"]
      }
    ],
    reviews: [
      {
        id: "rev-l-1",
        author: "Dr. Matthew Jenkins",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        country: "Australia 🇦🇺",
        date: "September 2025",
        rating: 5.0,
        tourName: "Monastery Dawn Chanting at Thiksey",
        comment: "Tsering was attentive to our altitude acclimatization and his connection to the monks at Thiksey opened doors we never could have entered alone.",
        verifiedBooking: true
      }
    ]
  },
  {
    id: "g-goa-06",
    name: "Maria Fernandes",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Goa",
      state: "Goa",
      country: "India",
      countryCode: "IN",
      coordinates: [15.4989, 73.8278],
      neighborhoods: ["Fontainhas Latin Quarter", "Old Goa Churches", "Divar Island", "Saligao"]
    },
    title: "Indo-Portuguese Heritage Curator & Secret Mangrove Backwater Guide",
    tagline: "Explore pastel-hued Fontainhas alleys, 400-year-old baroque basilicas, feni tasting, and secret river islands.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Goa Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Goa Tourism Department Certified Guide", icon: "🏅", color: "amber" },
      { id: "heritage", label: "Goan Architecture Preservation Society", icon: "🏛️", color: "purple" }
    ],
    experienceYears: 10,
    languages: [
      { name: "Konkani", level: "Native", code: "kok", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "Hindi", level: "Fluent", code: "hi", flag: "🇮🇳" },
      { name: "Portuguese", level: "Conversational (B2)", code: "pt", flag: "🇵🇹" }
    ],
    rating: 4.98,
    reviewCount: 340,
    completedTours: 710,
    hourlyRate: 650,
    currency: "INR",
    personality: ["Enthusiastic", "Storyteller", "Warm", "Foodie"],
    categories: ["Culture & History", "Culinary & Street Food", "Photography", "Hidden Gems"],
    bio: "Viva Goa! I am Maria, an Indo-Portuguese architecture conservationist. I show travelers the real Goa beyond overcrowded beaches: the Portuguese azulejo tile artisans of Fontainhas, Old Goa's UNESCO basilicas, private feni tastings in ancestral estates, and birdwatching on quiet river ferries.",
    responseTime: "< 10 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-g-1",
        title: "Fontainhas Latin Quarter Pastel Heritage Walk & Feni Pairing",
        durationHours: 3.5,
        pricePerPerson: 1300,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Pastel colonial villas, oyster shell windows, and wishing well legends",
          "Visit to a 120-year-old traditional Goan bakery for warm Poi bread",
          "Heritage cashew feni tasting at an ancestral Portuguese manor",
          "Guitar performance of traditional Goan Mando music"
        ],
        includes: ["Feni and snack tasting", "Heritage mansion entry", "Licensed guide"],
        excludes: ["Bottled feni purchases"]
      }
    ],
    reviews: [
      {
        id: "rev-g-1",
        author: "Jean-Luc & Sylvie Dupont",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        country: "France 🇫🇷",
        date: "January 2026",
        rating: 5.0,
        tourName: "Fontainhas Latin Quarter Pastel Heritage Walk",
        comment: "Maria brought the Latin Quarter alive with so much charm and warmth. Her deep pride in Goan heritage is contagious!",
        verifiedBooking: true
      }
    ]
  },
  {
    id: "g-udaipur-07",
    name: "Vikramaditya Rao",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Udaipur",
      state: "Rajasthan",
      country: "India",
      countryCode: "IN",
      coordinates: [24.5854, 73.7125],
      neighborhoods: ["City Palace Complex", "Lake Pichola", "Jagdish Temple", "Saheliyon Ki Bari"]
    },
    title: "Mewar Royal Historian & Lake Pichola Artisan Heritage Specialist",
    tagline: "Uncover Mewar bravery legends inside City Palace courtyards, secret rooftop ghat views, and miniature art secrets.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Rajasthan Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India License", icon: "🏅", color: "amber" }
    ],
    experienceYears: 13,
    languages: [
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "Mewari", level: "Native", code: "mew", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" }
    ],
    rating: 4.97,
    reviewCount: 310,
    completedTours: 690,
    hourlyRate: 750,
    currency: "INR",
    personality: ["Storyteller", "Historian", "Dignified", "Polite"],
    categories: ["Culture & History", "Photography", "Bazaars & Artisans", "Hidden Gems"],
    bio: "As a royal history scholar born in Udaipur, I guide guests through the 400-year-old architectural tapestry of the Mewar dynasty. I take you inside private royal courtyards, miniature painting studios, and sunset boat routes on Lake Pichola.",
    responseTime: "< 10 minutes",
    responseRate: "99%",
    availableNow: true,
    packages: [
      {
        id: "pkg-u-1",
        title: "City Palace Royal Chambers & Lake Pichola Golden Hour Boat",
        durationHours: 4.5,
        pricePerPerson: 1650,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Mewar dynasty military valor & mirror glasswork in City Palace",
          "Private sunset boat ride past Jag Mandir Island palace",
          "Demonstration by 4th-generation miniature painter using squirrel-hair brushes"
        ],
        includes: ["Private boat charter", "Palace escort", "Guide fees"],
        excludes: ["Palace camera fee"]
      }
    ],
    reviews: []
  },
  {
    id: "g-rishikesh-08",
    name: "Rohit Joshi (Swami Dhyan)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Rishikesh",
      state: "Uttarakhand",
      country: "India",
      countryCode: "IN",
      coordinates: [30.0869, 78.2676],
      neighborhoods: ["Laxman Jhula", "Ram Jhula", "Triveni Ghat", "Beatles Ashram", "Tapovan"]
    },
    title: "Vedic Yoga Acharya, Himalayan Forest Trail Guide & Ashram Historian",
    tagline: "Experience pristine Ganga beach meditations, Beatles ashram history, and authentic Vedic chanting.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Uttarakhand Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India License", icon: "🏅", color: "amber" }
    ],
    experienceYears: 10,
    languages: [
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "Sanskrit", level: "Scholar", code: "sa", flag: "🕉️" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" }
    ],
    rating: 4.99,
    reviewCount: 420,
    completedTours: 910,
    hourlyRate: 650,
    currency: "INR",
    personality: ["Spiritual", "Calm", "Mindful", "Philosophical"],
    categories: ["Spiritual & Wellness", "Nature & Adventure", "Culture & History"],
    bio: "Namaste! Trained in traditional Gurukuls and Yoga Vedanta Forest Academy, I share the genuine spiritual depth of the Himalayas with sincerity, guiding sacred beach meditations, Beatles ashram history, and Triveni Maha Aarti.",
    responseTime: "< 5 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-r-1",
        title: "Sacred Ganga Meditation, Beatles Ashram & Sunset Aarti Walk",
        durationHours: 4,
        pricePerPerson: 1200,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Pre-dawn pranayama and guided sound meditation on private white sand beach",
          "Exploration of the 1968 Beatles ashram meditation domes and graffiti",
          "VIP standing spot at Parmarth Niketan Ganga Aarti chanting"
        ],
        includes: ["Ashram entry fee", "Herbal tea", "Yoga mat access", "Guide"],
        excludes: ["Personal ashram donations"]
      }
    ],
    reviews: []
  },
  {
    id: "g-hampi-09",
    name: "Pooja Hegde",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1600100397608-f010f443b747?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Hampi",
      state: "Karnataka",
      country: "India",
      countryCode: "IN",
      coordinates: [15.3350, 76.4600],
      neighborhoods: ["Virupaksha Temple", "Vittala Temple", "Royal Enclosure", "Matanga Hill", "Anegundi"]
    },
    title: "Vijayanagara Empire Archaeological Specialist & Coracle Navigator",
    tagline: "Scale boulder landscapes, decode musical stone pillars at Vittala Temple, and cross the Tungabhadra in traditional coracles.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Karnataka Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Archaeological Survey of India License", icon: "🏅", color: "amber" }
    ],
    experienceYears: 8,
    languages: [
      { name: "Kannada", level: "Native", code: "kn", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "Hindi", level: "Fluent", code: "hi", flag: "🇮🇳" },
      { name: "Telugu", level: "Conversational", code: "te", flag: "🇮🇳" }
    ],
    rating: 4.99,
    reviewCount: 290,
    completedTours: 540,
    hourlyRate: 650,
    currency: "INR",
    personality: ["Historian", "Enthusiastic", "Adventurous"],
    categories: ["Culture & History", "Nature & Adventure", "Photography", "Hidden Gems"],
    bio: "Hampi is the world's largest open-air museum. As an archaeology graduate passionate about 14th-century Vijayanagara empire history, I reveal the hydraulic engineering, stone chariot acoustic design, and forgotten bazaars across the boulder hills.",
    responseTime: "< 10 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-h-1",
        title: "Lost Vijayanagara Capital & Musical Pillars Coracle Expedition",
        durationHours: 5,
        pricePerPerson: 1450,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Acoustics demonstration at Vittala Temple's 56 musical stone pillars",
          "Traditional round wicker coracle boat crossing across Tungabhadra River",
          "Sunset panorama over 1,000 monuments from Matanga Hill summit"
        ],
        includes: ["Coracle boat crossing", "ASI monument pass escort", "Guide"],
        excludes: ["Electric buggy pass"]
      }
    ],
    reviews: []
  },
  {
    id: "g-kolkata-10",
    name: "Debasish Mukherjee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      countryCode: "IN",
      coordinates: [22.5726, 88.3639],
      neighborhoods: ["College Street", "Kumartuli", "Victoria Memorial", "Howrah Bridge", "North Kolkata Rajbaris"]
    },
    title: "Colonial Heritage Historian, Kumartuli Artisan Alleys & Bengali Culinary Master",
    tagline: "Ride historic wooden trams, explore Durga idol-makers in Kumartuli, and taste authentic kathi rolls & mishti.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Kolkata Police Clearance (PCC)", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India License", icon: "🏅", color: "amber" }
    ],
    experienceYears: 15,
    languages: [
      { name: "Bengali", level: "Native", code: "bn", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" },
      { name: "Hindi", level: "Fluent", code: "hi", flag: "🇮🇳" }
    ],
    rating: 4.98,
    reviewCount: 380,
    completedTours: 820,
    hourlyRate: 700,
    currency: "INR",
    personality: ["Intellectual", "Foodie", "Storyteller", "Warm"],
    categories: ["Culture & History", "Culinary & Street Food", "Bazaars & Artisans", "Hidden Gems"],
    bio: "Kolkata is the cultural soul of India. With 15 years curating walks for writers, documentary filmmakers, and curious travelers, I take you into 200-year-old aristocrat courtyards (Rajbaris), clay-sculptor studios in Kumartuli, and legendary coffee-house debates.",
    responseTime: "< 10 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-kol-1",
        title: "Kumartuli Clay Sculptors, Heritage Wooden Tram & Street Food Trail",
        durationHours: 4.5,
        pricePerPerson: 1400,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Meet multi-generational clay idol artisans sculpting straw and Ganges clay",
          "Historic vintage tram ride through Victorian boulevards",
          "Authentic tastings: Nizam's original Kathi Roll, Phuchka & warm Mishti Doi"
        ],
        includes: ["All heritage food tastings", "Vintage tram ticket", "Licensed guide"],
        excludes: ["Personal shopping"]
      }
    ],
    reviews: []
  },
  {
    id: "g-mumbai-11",
    name: "Priya Kulkarni",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      countryCode: "IN",
      coordinates: [18.9220, 72.8347],
      neighborhoods: ["Fort & Colaba", "Marine Drive", "Kala Ghoda", "Dharavi", "Crawford Market"]
    },
    title: "UNESCO Heritage Architect, Street Food Connoisseur & Community Guide",
    tagline: "Discover Victorian Gothic & Art Deco grandeur, bustling spice markets, and inspiring community enterprise.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Mumbai Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India License", icon: "🏅", color: "amber" }
    ],
    experienceYears: 10,
    languages: [
      { name: "Marathi", level: "Native", code: "mr", flag: "🇮🇳" },
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" }
    ],
    rating: 4.99,
    reviewCount: 390,
    completedTours: 780,
    hourlyRate: 800,
    currency: "INR",
    personality: ["Architect", "Dynamic", "Foodie", "Empathetic"],
    categories: ["Culture & History", "Culinary & Street Food", "Bazaars & Artisans", "Hidden Gems"],
    bio: "I am an urban conservation architect. I take travelers through Mumbai's twin UNESCO World Heritage Victorian Gothic and Art Deco ensembles, the 150-year-old Dabbawala sorting marvels, and authentic Parsi cafes.",
    responseTime: "< 5 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-m-1",
        title: "Victorian Gothic Architecture, Dabbawala Marvel & Parsi Cafe Walk",
        durationHours: 4,
        pricePerPerson: 1500,
        minGroup: 1,
        maxGroup: 6,
        highlights: [
          "Chhatrapati Shivaji Maharaj Terminus (CST) stained glass and gargoyles",
          "Witness the six-sigma precision of Mumbai Dabbawalas sorting 200,000 lunches",
          "Irani Chai & Bun Maska breakfast in a 110-year-old heritage Parsi cafe"
        ],
        includes: ["Parsi breakfast & chai", "CST heritage entrance escort", "Licensed guide"],
        excludes: ["Personal taxi transfers"]
      }
    ],
    reviews: []
  },
  {
    id: "g-amritsar-12",
    name: "Harpreet Singh",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    cover: "https://images.unsplash.com/photo-1588096344356-9b48a0445d47?auto=format&fit=crop&w=1200&q=80",
    location: {
      city: "Amritsar",
      state: "Punjab",
      country: "India",
      countryCode: "IN",
      coordinates: [31.6200, 74.8765],
      neighborhoods: ["Golden Temple Complex", "Jallianwala Bagh", "Partition Museum", "Old City Bazaars", "Attari Border"]
    },
    title: "Sikh Heritage Historian, Golden Temple Seva Guide & Punjabi Culinary Insider",
    tagline: "Experience the spiritual serenity of the Golden Temple langar, Partition Museum depth, and legendary Amritsari Kulcha.",
    verificationTier: 4,
    verificationBadges: [
      { id: "id_checked", label: "Aadhaar KYC Verified", icon: "✓", color: "emerald" },
      { id: "police_cleared", label: "Punjab Police Clearance", icon: "🛡️", color: "blue" },
      { id: "license_certified", label: "Ministry of Tourism Govt. of India License", icon: "🏅", color: "amber" }
    ],
    experienceYears: 11,
    languages: [
      { name: "Punjabi", level: "Native", code: "pa", flag: "🇮🇳" },
      { name: "Hindi", level: "Native", code: "hi", flag: "🇮🇳" },
      { name: "English", level: "Fluent (C2)", code: "en", flag: "🇬🇧" }
    ],
    rating: 5.0,
    reviewCount: 410,
    completedTours: 850,
    hourlyRate: 650,
    currency: "INR",
    personality: ["Warm", "Spiritual", "Generous", "Storyteller"],
    categories: ["Spiritual & Wellness", "Culture & History", "Culinary & Street Food"],
    bio: "Sat Sri Akal! Born and raised a stone's throw from the Golden Temple, I guide travelers through the world's largest community kitchen (Langar feeding 100,000 daily), historical Partition archives, and 70-year-old Amritsari Kulcha tandoors.",
    responseTime: "< 5 minutes",
    responseRate: "100%",
    availableNow: true,
    packages: [
      {
        id: "pkg-am-1",
        title: "Golden Temple Palki Sahib Ceremony, Mega Kitchen & Old Bazaar Walk",
        durationHours: 4.5,
        pricePerPerson: 1350,
        minGroup: 1,
        maxGroup: 8,
        highlights: [
          "Witness the sacred night Palki Sahib procession of Guru Granth Sahib",
          "Volunteer seva participation inside the mega roti-making Langar hall",
          "Taste crisp Amritsari Kulcha with churned white butter & sweet lassi"
        ],
        includes: ["Head scarfs provided", "Authentic Punjabi breakfast/kulcha", "Licensed guide"],
        excludes: ["Shoe tokens donation"]
      }
    ],
    reviews: []
  }
];

// Initial Initialized Bookings & Requests
const INITIAL_MY_TRIPS = [
  {
    bookingId: "GC-VARA-8842",
    guideId: "g-varanasi-01",
    guideName: "Aarav Sharma",
    guideAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    city: "Varanasi",
    state: "Uttar Pradesh",
    packageTitle: "Mystic Sunrise Wooden Boat Row & Old Kashi Heritage Galis",
    date: "2026-09-05",
    timeSlot: "05:30 - 09:30 AM",
    guests: 2,
    totalPriceINR: 2998,
    meetupLocation: "Assi Ghat steps near Subah-e-Banaras stage",
    status: "Confirmed",
    qrCodeData: "GC-VARA-8842-CONFIRMED-ESCROW-PAID"
  }
];

const INITIAL_GUIDE_REQUESTS = [
  {
    id: "req-101",
    touristName: "Sunita & Arvind Saxena",
    touristAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    origin: "Lucknow, India 🇮🇳",
    experience: "Mystic Sunrise Wooden Boat Row & Old Kashi Heritage Galis",
    date: "2026-09-12",
    time: "05:30 - 09:30 AM",
    travelers: 3,
    totalPriceINR: 4497,
    notes: "Visiting with elderly mother (72 yrs). Requesting gentle walking pace and e-rickshaw assistance where possible.",
    status: "pending"
  },
  {
    id: "req-102",
    touristName: "Marcus & Elena Weber",
    touristAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    origin: "Germany 🇩🇪",
    experience: "VIP Dashashwamedh Ganga Aarti & Sarnath Buddhist Legacy",
    date: "2026-09-15",
    time: "15:00 - 20:30 PM",
    travelers: 2,
    totalPriceINR: 4400,
    notes: "We are passionate about Buddhist archaeology and would love French/English narration.",
    status: "pending"
  }
];

const VIP_OFFERS = [
  {
    id: "vip-1",
    title: "Amber Palace Private Dining & Curator Escort",
    category: "Heritage Private Estate",
    bg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    desc: "Exclusive after-hours access to Jaipur's Amber Fort with a personal master chef, royal classical performance, and private state historian escort.",
    costINR: 500000
  },
  {
    id: "vip-2",
    title: "Taj Mahal Private Helicopter Tour & Landing Guide",
    category: "Private Air Transfer",
    bg: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
    desc: "Skip airport lines and traffic. Direct luxury helicopter transfer from Delhi NCR straight to Agra with a senior ASI guide waiting on landing.",
    costINR: 250000
  },
  {
    id: "vip-3",
    title: "Spiritual Varanasi 3-Day Private Indology Scholar Retreat",
    category: "3-Day Custom Package",
    bg: "https://images.unsplash.com/photo-1561361531-99f2a6a9715e?auto=format&fit=crop&w=600&q=80",
    desc: "A dedicated senior BHU Indology professor will accompany you for 3 days to private ashrams, secret Ganga rituals, and pre-dawn photography ghat slots.",
    costINR: 45000
  }
];

const EMERGENCY_DIRECTORY = {
  IN: { police: "112", ambulance: "108", touristHotline: "1363", language: "12 Languages (Hindi, English, Regional, Foreign)" },
  UP: { police: "112 / 100", ambulance: "108", touristHotline: "1363", language: "Hindi, English, French" },
  RJ: { police: "112 / 100", ambulance: "108", touristHotline: "1363", language: "Hindi, English, German, Spanish" },
  KL: { police: "112 / 100", ambulance: "108", touristHotline: "1363", language: "Malayalam, English, Tamil, Hindi" },
  GOA: { police: "112 / 100", ambulance: "108", touristHotline: "1363", language: "Konkani, English, Portuguese, Hindi" },
  LAD: { police: "112 / 100", ambulance: "108", touristHotline: "1363", language: "Ladakhi, Hindi, English" }
};
