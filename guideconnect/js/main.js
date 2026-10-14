// ==========================================================================
// GUIDECONNECT – MAIN CONTROLLER
// Search, AI Matching, Modal Details, Booking & Interactivity
// ==========================================================================

const SAMPLE_GUIDES = [
  {
    id:"g-01",name:"Aarav Sharma",
    avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    city:"Varanasi",state:"Uttar Pradesh",country:"India",
    title:"Sanskrit Scholar & Kashi Heritage Guardian",
    tagline:"Experience Varanasi's spiritual depth through a 5th-generation Kashi resident's eyes.",
    tier:4,tierLabel:"Master Guide",
    verifiedBadges:[
      {label:"Aadhaar KYC Verified",cls:"em",icon:"✓"},
      {label:"UP Police Cleared",cls:"bl",icon:"🛡"},
      {label:"MoT Licensed #RLG-NR-5521",cls:"go",icon:"🏅"},
      {label:"MA Sanskrit – BHU",cls:"pu",icon:"📚"}
    ],
    years:11,
    langs:[{n:"Hindi",f:"🇮🇳"},{n:"English",f:"🇬🇧"},{n:"French",f:"🇫🇷"},{n:"Sanskrit",f:"🕉️"}],
    rating:4.99,reviews:520,tours:1140,
    rate:1499,currency:"INR",
    cats:["Spiritual & Wellness","Culture & History","Photography","Hidden Gems"],
    bio:"Namaste. Varanasi is my ancestral home for five generations. As an accredited Regional Level Guide certified by the Ministry of Tourism and a Sanskrit master graduate from Banaras Hindu University (BHU), I lead travelers through silent dawn rowing on the sacred Ganga, private access to ancient alleyways, Vedic chanting, and safe, scam-free experiences at the evening Maha Aarti.",
    available:true,responseTime:"< 10 min",
    packages:[
      {id:"p1",name:"Mystic Sunrise Boat Row & Old Kashi Heritage Galis",hours:4,price:1499,highlights:["Private wooden rowing boat at 05:30 AM","Deep commentary on 84 sacred ghats","Walk through 1,000-year-old silk weaver alleys","Banarasi breakfast & kulhad masala chai"]},
      {id:"p2",name:"VIP Dashashwamedh Aarti & Sarnath Buddhist Legacy",hours:5.5,price:2200,highlights:["Reserved priority rooftop Aarti viewing","Excursion to Sarnath Deer Park","Dhamek Stupa & Ashoka Pillar","Private AC transport"]}
    ],
    reviews_data:[
      {author:"Dr. Sunita & Rajesh Verma",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",country:"Bangalore 🇮🇳",date:"January 2026",rating:5,comment:"Aarav ji made our Varanasi darshan peaceful and completely shielded from crowds. His deep knowledge of Sanskrit slokas brought tears to our eyes. Highly recommended for families with elders!",verified:true},
      {author:"Claire & Thomas Bernard",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",country:"France 🇫🇷",date:"February 2026",rating:5,comment:"An absolutely magical experience. Aarav's fluent French made everything so easy, and his passion for Varanasi's history is infectious. The boat ride at sunrise was life-changing.",verified:true}
    ],
    aiScore:98
  },
  {
    id:"g-02",name:"Priya Mehta",
    avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    city:"Agra",state:"Uttar Pradesh",country:"India",
    title:"Mughal Heritage Expert & Taj Mahal Specialist",
    tagline:"Unlock the hidden stories of the Taj Mahal and Mughal Empire with a certified art historian.",
    tier:3,tierLabel:"Licensed Guide",
    verifiedBadges:[
      {label:"Aadhaar KYC Verified",cls:"em",icon:"✓"},
      {label:"UP Police Cleared",cls:"bl",icon:"🛡"},
      {label:"ASI Licensed Guide",cls:"go",icon:"🏅"}
    ],
    years:8,
    langs:[{n:"English",f:"🇬🇧"},{n:"Hindi",f:"🇮🇳"},{n:"Urdu",f:"🌙"},{n:"Japanese",f:"🇯🇵"}],
    rating:4.97,reviews:312,tours:780,
    rate:1800,currency:"INR",
    cats:["Culture & History","Photography","Hidden Gems"],
    bio:"A certified art historian from Agra University with a specialization in Mughal architecture and Persian art, I've been revealing the Taj Mahal's hidden geometry, optical illusions, and the tragic love story behind its 22-year construction to visitors from 60+ countries for 8 years. No tourist trap shortcuts — just the real, deep story.",
    available:true,responseTime:"< 15 min",
    packages:[
      {id:"p1",name:"Taj Mahal at Sunrise – VIP Early Entry & Hidden Secrets Tour",hours:3,price:1800,highlights:["ASI-authorized early morning VIP entry before crowds","Hidden geometry and optical illusion secrets revealed","Access to restricted marble inlay artisan workshop","Sunrise photography golden hour coaching"]},
      {id:"p2",name:"Full Agra Triangle: Taj, Agra Fort & Fatehpur Sikri",hours:8,price:3500,highlights:["Comprehensive 3-site UNESCO World Heritage Day Tour","Mughal Emperor stories & political intrigue","Private AC vehicle throughout","Licensed guide + lunch at rooftop Taj-view restaurant"]}
    ],
    reviews_data:[
      {author:"Yuki & Kenji Tanaka",avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",country:"Japan 🇯🇵",date:"March 2026",rating:5,comment:"Priya spoke excellent Japanese and knew every detail about Mughal architecture. The sunrise Taj tour was absolutely breathtaking. Her passion made us fall in love with Indian history.",verified:true},
      {author:"Michael & Sarah Thompson",avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",country:"USA 🇺🇸",date:"February 2026",rating:5,comment:"Best guide experience of our entire India trip! Priya's knowledge of Mughal history is incredible and she revealed secrets of the Taj that we'd never read in any guidebook.",verified:true}
    ],
    aiScore:95
  },
  {
    id:"g-03",name:"Rajan Pillai",
    avatar:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    city:"Kerala",state:"Kerala",country:"India",
    title:"Nature & Ayurveda Explorer | Backwaters Specialist",
    tagline:"Discover Kerala's God's Own Country — backwaters, spice gardens, Ayurveda & wildlife with a certified naturalist.",
    tier:3,tierLabel:"Licensed Guide",
    verifiedBadges:[
      {label:"Kerala Tourism Verified",cls:"em",icon:"✓"},
      {label:"Police Cleared",cls:"bl",icon:"🛡"},
      {label:"Wildlife Guide Certified",cls:"go",icon:"🌿"}
    ],
    years:9,
    langs:[{n:"English",f:"🇬🇧"},{n:"Malayalam",f:"🇮🇳"},{n:"Hindi",f:"🇮🇳"},{n:"German",f:"🇩🇪"}],
    rating:4.96,reviews:245,tours:560,
    rate:2200,currency:"INR",
    cats:["Nature & Adventure","Spiritual & Wellness","Food & Culinary","Photography"],
    bio:"Born and raised in the lush heartland of Kerala, I'm a certified naturalist and Ayurveda wellness guide. From dawn canoe rides through mirror-still backwater canals to guided treks through cardamom and pepper spice gardens, traditional Kerala cooking classes, and visits to ancient Kalari martial arts schools — I show you the real Kerala.",
    available:false,responseTime:"< 30 min",
    packages:[
      {id:"p1",name:"Alleppey Backwaters Canoe & Spice Garden Discovery",hours:6,price:2200,highlights:["Private country boat through backwaters","Spice plantation walk: pepper, cardamom, nutmeg","Traditional Kerala Sadya lunch on banana leaf","Village temple visit and Kathakali art explanation"]},
      {id:"p2",name:"Munnar Tea Hills & Periyar Wildlife Sanctuary Trek",hours:9,price:4500,highlights:["High-altitude tea garden sunrise walk","Periyar Tiger Reserve nature trail","Boat safari on Periyar Lake watching elephants","Authentic Keralan spice cooking class"]}
    ],
    reviews_data:[
      {author:"Hans & Greta Mueller",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",country:"Germany 🇩🇪",date:"January 2026",rating:5,comment:"Rajan's German is excellent and his knowledge of Kerala's ecology is extraordinary. The backwater canoe at dawn was one of the most peaceful experiences of our lives.",verified:true}
    ],
    aiScore:93
  }
];
SAMPLE_GUIDES.push(
  {
    id:"g-04",name:"Anita Choudhary",
    avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    city:"Jaipur",state:"Rajasthan",country:"India",
    title:"Rajput Heritage Storyteller & Pink City Insider",
    tagline:"Live the royal Rajput legacy — forts, palaces, bazaars, and authentic Rajasthani cuisine.",
    tier:4,tierLabel:"Master Guide",
    verifiedBadges:[
      {label:"Aadhaar KYC Verified",cls:"em",icon:"✓"},
      {label:"Rajasthan Police Cleared",cls:"bl",icon:"🛡"},
      {label:"MoT Licensed",cls:"go",icon:"🏅"},
      {label:"MBA Heritage Tourism",cls:"pu",icon:"📚"}
    ],
    years:13,
    langs:[{n:"English",f:"🇬🇧"},{n:"Hindi",f:"🇮🇳"},{n:"Spanish",f:"🇪🇸"},{n:"Marwari",f:"🏜️"}],
    rating:4.98,reviews:430,tours:920,
    rate:1600,currency:"INR",
    cats:["Culture & History","Food & Culinary","Photography","Hidden Gems"],
    bio:"With 13 years exploring every gali and haveli of Jaipur, I guide travelers through royal courts, hidden step-wells, and authentic Rajasthani thali kitchens that no Google review will find. I connect tourists with master artisans — block printers, gem cutters, and miniature painters.",
    available:true,responseTime:"< 20 min",
    packages:[
      {id:"p1",name:"Pink City Heritage Walk: Forts, Havelis & Hidden Gems",hours:5,price:1600,highlights:["Amber Fort royal chambers & secret tunnels","Hawa Mahal architecture secrets & rooftop views","Block-printing artisan workshop participation","Authentic Rajasthani street food trail"]},
      {id:"p2",name:"Royal Rajasthan Day: City Palace, Jantar Mantar & Bazaar",hours:7,price:2800,highlights:["UNESCO Jantar Mantar observatory live demo","City Palace museum rare royal artifacts","Johari Bazaar gem market insider pricing guide","Traditional Rajasthani dinner at 350-year-old haveli"]}
    ],
    reviews_data:[
      {author:"Carlos & María Rodríguez",avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",country:"Spain 🇪🇸",date:"March 2026",rating:5,comment:"Anita's Spanish was perfect and her knowledge of Rajput history is extraordinary. She took us to a 300-year-old haveli restaurant that was not in any travel guide.",verified:true}
    ],
    aiScore:97
  },
  {
    id:"g-05",name:"Vikram Nair",
    avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    city:"Manali",state:"Himachal Pradesh",country:"India",
    title:"Himalayan Trek Leader & Snow Adventure Guide",
    tagline:"Conquer Himalayan passes, glaciers, and ancient Buddhist monasteries with a certified mountain guide.",
    tier:3,tierLabel:"Licensed Guide",
    verifiedBadges:[
      {label:"HP Tourism Verified",cls:"em",icon:"✓"},
      {label:"Police Cleared",cls:"bl",icon:"🛡"},
      {label:"NIM Certified Mountaineer",cls:"go",icon:"⛰️"}
    ],
    years:7,
    langs:[{n:"English",f:"🇬🇧"},{n:"Hindi",f:"🇮🇳"},{n:"Pahari",f:"🏔️"}],
    rating:4.95,reviews:198,tours:380,
    rate:2500,currency:"INR",
    cats:["Nature & Adventure","Photography","Hidden Gems"],
    bio:"A National Institute of Mountaineering (NIM) certified guide with 7 years in high Himalayas, I specialize in treks to Hampta Pass, Beas Kund glacier, and Spiti Valley with first aid expertise and acclimatization safety.",
    available:true,responseTime:"< 25 min",
    packages:[
      {id:"p1",name:"Hadimba Temple & Solang Valley Snow Adventure",hours:5,price:2500,highlights:["Ancient Hadimba Devi temple forest walk","Solang Valley snow activities: skiing & zorbing","Beas River side canyon exploration","Traditional Himachali apricot tea with local family"]}
    ],
    reviews_data:[
      {author:"James & Emily Parker",avatar:"https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&q=80",country:"UK 🇬🇧",date:"February 2026",rating:5,comment:"Vikram is absolutely incredible. His NIM certification gave us total confidence on difficult terrain.",verified:true}
    ],
    aiScore:91
  },
  {
    id:"g-06",name:"Sunita Kapoor",
    avatar:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    city:"Delhi",state:"Delhi",country:"India",
    title:"Old Delhi Culinary Expert & Street Food Historian",
    tagline:"Taste 400 years of Delhi's food history through hidden lanes, legendary dhabas & royal Mughal recipes.",
    tier:2,tierLabel:"Verified Guide",
    verifiedBadges:[
      {label:"Aadhaar KYC Verified",cls:"em",icon:"✓"},
      {label:"Delhi Police Cleared",cls:"bl",icon:"🛡"}
    ],
    years:5,
    langs:[{n:"English",f:"🇬🇧"},{n:"Hindi",f:"🇮🇳"},{n:"Punjabi",f:"🌾"}],
    rating:4.92,reviews:178,tours:290,
    rate:1200,currency:"INR",
    cats:["Food & Culinary","Culture & History","Hidden Gems"],
    bio:"Growing up in Chandni Chowk, I know every secret food stall and 200-year-old sweetshop in Old Delhi. From Karim's Mughal curry to century-old jalebi recipes, I take food lovers on a culinary time machine.",
    available:true,responseTime:"< 30 min",
    packages:[
      {id:"p1",name:"Old Delhi Street Food Extravaganza – 15-Stop Culinary Walk",hours:3.5,price:1200,highlights:["15 curated tastings: jalebis, nihari, chaat, kulfi","Century-old family recipe kitchens","Food safety briefing & sanitizer kits","Khari Baoli spice market visit"]}
    ],
    reviews_data:[
      {author:"Alicia & Marco Ferrari",avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",country:"Italy 🇮🇹",date:"March 2026",rating:5,comment:"Sunita is a food genius! She took us to a 200-year-old jalebi shop that we would NEVER have found alone.",verified:true}
    ],
    aiScore:89
  },
  {
    id:"g-07",name:"Arjun Desai",
    avatar:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    city:"Goa",state:"Goa",country:"India",
    title:"Goa Heritage & Secret Beach Connoisseur",
    tagline:"Beyond the tourist beaches — Portuguese forts, spice farms, hidden coves & authentic Goan cuisine.",
    tier:2,tierLabel:"Verified Guide",
    verifiedBadges:[
      {label:"Aadhaar KYC Verified",cls:"em",icon:"✓"},
      {label:"Goa Police Cleared",cls:"bl",icon:"🛡"}
    ],
    years:6,
    langs:[{n:"English",f:"🇬🇧"},{n:"Konkani",f:"🌊"},{n:"Portuguese",f:"🇵🇹"},{n:"Hindi",f:"🇮🇳"}],
    rating:4.94,reviews:215,tours:440,
    rate:1400,currency:"INR",
    cats:["Culture & History","Food & Culinary","Hidden Gems","Nature & Adventure"],
    bio:"Born in Panaji's old quarter, I reveal Portuguese colonial architecture, 400-year-old Baroque churches, secret fishing villages, cashew feni distilleries, and authentic Goan cafreal that tourists never find.",
    available:true,responseTime:"< 20 min",
    packages:[
      {id:"p1",name:"Old Goa Portuguese Heritage & Spice Farm Journey",hours:5,price:1400,highlights:["Basilica of Bom Jesus UNESCO deep-dive","Working spice plantation tour","Fontainhas Latin Quarter architecture walk","Goan lunch at 100-year-old restaurant"]}
    ],
    reviews_data:[
      {author:"Sofia Martins",avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",country:"Portugal 🇵🇹",date:"January 2026",rating:5,comment:"Finding a Goa guide who speaks perfect Portuguese was incredible. The heritage walk was deeply moving.",verified:true}
    ],
    aiScore:88
  },
  {
    id:"g-08",name:"Meera Joshi",
    avatar:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    cover:"https://images.unsplash.com/photo-1573647952114-5b2ee2fa9cb1?auto=format&fit=crop&w=1200&q=80",
    city:"Mumbai",state:"Maharashtra",country:"India",
    title:"Mumbai Film & Arts Culture Expert",
    tagline:"Bollywood studios, Dharavi social tours, colonial art deco, and Mumbai's extraordinary street food.",
    tier:2,tierLabel:"Verified Guide",
    verifiedBadges:[
      {label:"Aadhaar KYC Verified",cls:"em",icon:"✓"},
      {label:"Maharashtra Police Cleared",cls:"bl",icon:"🛡"}
    ],
    years:4,
    langs:[{n:"English",f:"🇬🇧"},{n:"Hindi",f:"🇮🇳"},{n:"Marathi",f:"🌺"}],
    rating:4.9,reviews:143,tours:210,
    rate:1300,currency:"INR",
    cats:["Culture & History","Food & Culinary","Photography"],
    bio:"A film studies graduate and lifelong Mumbaikar, I specialize in tours revealing the city's contrasts — from Art Deco Marine Drive to Bollywood studios and local street food.",
    available:false,responseTime:"< 45 min",
    packages:[
      {id:"p1",name:"Bollywood Behind-the-Scenes & Art Deco Mumbai Tour",hours:6,price:1800,highlights:["Film City studio backlot guided tour","Marine Drive 35 UNESCO Art Deco walk","Chhatrapati Shivaji Terminus architectural secrets","Evening Colaba street food"]}
    ],
    reviews_data:[
      {author:"Laura & Pierre Dubois",avatar:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80",country:"France 🇫🇷",date:"February 2026",rating:5,comment:"Meera's passion for Mumbai's film culture is infectious. A deeply thoughtful and responsible guide.",verified:true}
    ],
    aiScore:87
  }
);
const DESTINATIONS_DATA = [
  {name:"Varanasi",state:"Uttar Pradesh",guides:12,img:"https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",badge:"Spiritual"},
  {name:"Agra",state:"Uttar Pradesh",guides:9,img:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",badge:"UNESCO"},
  {name:"Jaipur",state:"Rajasthan",guides:15,img:"https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80",badge:"Pink City"},
  {name:"Kerala",state:"Gods Own Country",guides:18,img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",badge:"Trending"},
  {name:"Manali",state:"Himachal Pradesh",guides:7,img:"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",badge:"Adventure"},
  {name:"Goa",state:"Goa",guides:11,img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",badge:"Beach"},
  {name:"Mumbai",state:"Maharashtra",guides:14,img:"https://images.unsplash.com/photo-1573647952114-5b2ee2fa9cb1?auto=format&fit=crop&w=600&q=80",badge:"Bollywood"},
  {name:"Delhi",state:"National Capital",guides:20,img:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",badge:"Heritage"}
];

const TESTIMONIALS_DATA = [
  {stars:5,text:"GuideConnect changed how we travel. Aarav in Varanasi was the most knowledgeable, safe, and caring guide we have ever had. The AI matching was spot-on — it perfectly matched us with a French-speaking guide.",name:"Claire & Thomas Bernard",loc:"Paris, France 🇫🇷",avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"},
  {stars:5,text:"Priyas depth of knowledge about Mughal architecture is unbelievable. She knew secrets about the Taj Mahal that we had never read anywhere. The sunrise early entry was absolutely magical.",name:"Yuki & Kenji Tanaka",loc:"Tokyo, Japan 🇯🇵",avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"},
  {stars:5,text:"Anita showed us a Jaipur that no tourist guidebook could ever capture. The 300-year-old haveli dinner was extraordinary. The escrow payment system gave us complete peace of mind.",name:"Carlos & María Rodríguez",loc:"Madrid, Spain 🇪🇸",avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"},
  {stars:5,text:"The verification badges on GuideConnect gave us total confidence. Vikrams mountaineering certification meant we trusted him completely on difficult terrain. Unforgettable.",name:"James & Emily Parker",loc:"London, UK 🇬🇧",avatar:"https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&q=80"},
  {stars:5,text:"Rajans German was perfect and his naturalist knowledge of Keralas ecosystem is extraordinary. The backwater canoe at dawn was one of the most peaceful moments of our lives.",name:"Hans & Greta Mueller",loc:"Berlin, Germany 🇩🇪",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"},
  {stars:5,text:"Sunitas Old Delhi food tour is the best experience. She took us to a 200-year-old jalebi shop — the original recipe, still fried over wood fire. Absolutely incredible.",name:"Alicia & Marco Ferrari",loc:"Milan, Italy 🇮🇹",avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"}
];

const CITIES_LIST = [
  {name:"Varanasi",state:"Uttar Pradesh",icon:"🕌",guides:12},
  {name:"Agra",state:"Uttar Pradesh",icon:"🕌",guides:9},
  {name:"Jaipur",state:"Rajasthan",icon:"🏰",guides:15},
  {name:"Kerala",state:"Gods Own Country",icon:"🌿",guides:18},
  {name:"Manali",state:"Himachal Pradesh",icon:"⛰️",guides:7},
  {name:"Goa",state:"Goa",icon:"🌊",guides:11},
  {name:"Mumbai",state:"Maharashtra",icon:"🌆",guides:14},
  {name:"Delhi",state:"National Capital",icon:"🏛️",guides:20},
  {name:"Rishikesh",state:"Uttarakhand",icon:"🙏",guides:8},
  {name:"Darjeeling",state:"West Bengal",icon:"🍵",guides:6},
  {name:"Mysore",state:"Karnataka",icon:"🏯",guides:7},
  {name:"Hampi",state:"Karnataka",icon:"🪨",guides:5},
  {name:"Udaipur",state:"Rajasthan",icon:"🏙️",guides:10},
  {name:"Pushkar",state:"Rajasthan",icon:"🌹",guides:6}
];

let appState = {
  query: '',
  results: [],
  activeFilter: 'all',
  activeSort: 'ai',
  activeGuide: null,
  aiStep: 1,
  aiAnswers: {},
  favorites: new Set(JSON.parse(localStorage.getItem('gc_favs') || '[]'))
};

const tierLabels = { 1: 'ID Verified', 2: 'Verified', 3: 'Licensed', 4: '⭐ Master Guide' };
document.addEventListener('DOMContentLoaded', () => {
  renderDestinations();
  renderTestimonials();
  initNavScroll();
  initReveal();
  initLocationAutocomplete();
  setMinBookDate();
  const locInput = document.getElementById('location-input');
  if (locInput) {
    locInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') triggerSearch();
    });
  }
});

function initNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

function toggleNav() {
  const links = document.getElementById('nav-links');
  const btn = document.getElementById('burger-btn');
  if (links && btn) {
    const open = links.classList.toggle('open');
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', open.toString());
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSearch() {
  const input = document.getElementById('location-input');
  if (input) {
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => input.focus(), 600);
  }
}

function initLocationAutocomplete() {
  const input = document.getElementById('location-input');
  const dropdown = document.getElementById('location-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) { closeDropdown(); return; }
    const matches = CITIES_LIST.filter(c =>
      c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
    );
    renderDropdown(matches, q);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 1) {
      const q = input.value.trim().toLowerCase();
      const matches = CITIES_LIST.filter(c => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q));
      renderDropdown(matches, q);
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#location-input') && !e.target.closest('#location-dropdown')) {
      closeDropdown();
    }
  });
}

function renderDropdown(cities, q) {
  const dd = document.getElementById('location-dropdown');
  if (!dd) return;
  if (!cities.length) { closeDropdown(); return; }
  dd.innerHTML = `<div class="ac-section-title">🗺️ Matching Destinations</div>` +
    cities.map(c => `
      <div class="ac-item" onclick="selectCity('${c.name}')" role="option" aria-label="${c.name}, ${c.state}">
        <div class="ac-icon">${c.icon}</div>
        <div>
          <div class="ac-name">${highlight(c.name, q)}</div>
          <div class="ac-meta">${c.state}</div>
        </div>
        <div class="ac-badge">${c.guides} guides</div>
      </div>`).join('');
  dd.classList.add('open');
}

function highlight(text, q) {
  const i = text.toLowerCase().indexOf(q);
  if (i === -1) return text;
  return text.slice(0, i) + `<mark style="background:rgba(124,58,237,.3);color:#c084fc;border-radius:2px">${text.slice(i, i+q.length)}</mark>` + text.slice(i+q.length);
}

function closeDropdown() {
  const dd = document.getElementById('location-dropdown');
  if (dd) dd.classList.remove('open');
}

function selectCity(name) {
  const input = document.getElementById('location-input');
  if (input) input.value = name;
  closeDropdown();
  triggerSearch();
}

function setLocation(name) {
  const input = document.getElementById('location-input');
  if (input) input.value = name;
  triggerSearch();
}

function useGeoLocation() {
  showToast('📡', 'Detecting Location', 'Finding guides near you…');
  if (!navigator.geolocation) {
    setTimeout(() => setLocation('Varanasi'), 600);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    () => { setLocation('Varanasi'); },
    () => {
      showToast('📍', 'Location set to Varanasi', 'Browsing verified guides in Varanasi.');
      setLocation('Varanasi');
    }
  );
}

function triggerSearch() {
  const input = document.getElementById('location-input');
  const q = input ? input.value.trim() : '';
  if (!q) {
    showToast('⚠️', 'Enter Destination', 'Please type a city or destination to search for guides.');
    if (input) input.focus();
    return;
  }
  appState.query = q;
  appState.activeFilter = 'all';
  appState.activeSort = 'ai';

  document.querySelectorAll('.fchip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('.fchip[data-cat="all"]');
  if (allChip) allChip.classList.add('active');
  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.value = 'ai';

  performSearch(q);
}

function performSearch(q) {
  const ql = q.toLowerCase();
  appState.results = SAMPLE_GUIDES.filter(g =>
    g.city.toLowerCase().includes(ql) ||
    g.state.toLowerCase().includes(ql) ||
    g.country.toLowerCase().includes(ql) ||
    g.cats.some(c => c.toLowerCase().includes(ql)) ||
    g.name.toLowerCase().includes(ql)
  );

  if (!appState.results.length) {
    appState.results = SAMPLE_GUIDES;
    showToast('🗺️', 'Showing Available Guides', `Displaying verified guides ready for your adventure.`);
  }

  showResults(q);
  renderGuides();

  setTimeout(() => {
    const res = document.getElementById('results');
    if (res) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function showResults(q) {
  const sec = document.getElementById('results');
  if (sec) sec.classList.add('visible');
  const cityEl = document.getElementById('results-city');
  if (cityEl) cityEl.textContent = q;
  updateResultsCount();
}

function updateResultsCount() {
  const filtered = getFilteredGuides();
  const countEl = document.getElementById('count-num');
  if (countEl) countEl.textContent = filtered.length;
}

function clearSearch() {
  const input = document.getElementById('location-input');
  if (input) input.value = '';
  appState.query = '';
  appState.results = [];
  const sec = document.getElementById('results');
  if (sec) sec.classList.remove('visible');
  scrollToTop();
}

function filterCat(el) {
  document.querySelectorAll('.fchip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  appState.activeFilter = el.dataset.cat;
  renderGuides();
  updateResultsCount();
}

function sortAndRender() {
  const sortSel = document.getElementById('sort-select');
  if (sortSel) appState.activeSort = sortSel.value;
  renderGuides();
}

function getFilteredGuides() {
  let guides = [...appState.results];
  if (appState.activeFilter !== 'all') {
    guides = guides.filter(g => g.cats.includes(appState.activeFilter));
  }
  const s = appState.activeSort;
  if (s === 'ai') guides.sort((a,b) => b.aiScore - a.aiScore);
  else if (s === 'rating') guides.sort((a,b) => b.rating - a.rating);
  else if (s === 'price_asc') guides.sort((a,b) => a.rate - b.rate);
  else if (s === 'price_desc') guides.sort((a,b) => b.rate - a.rate);
  else if (s === 'exp') guides.sort((a,b) => b.years - a.years);
  return guides;
}
function renderGuides() {
  const grid = document.getElementById('guides-grid');
  if (!grid) return;
  const guides = getFilteredGuides();
  updateResultsCount();

  if (!guides.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-title">No Guides Found</div>
        <div class="empty-sub">Try a different category filter or destination search.</div>
        <button class="btn btn-primary" onclick="resetFilters()">Clear Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = guides.map((g, i) => `
    <article class="guide-card" style="animation-delay:${i * 0.06}s" onclick="openGuideModal('${g.id}')" role="listitem" aria-label="Guide: ${g.name}">
      <div class="card-cover">
        <img src="${g.cover}" alt="${g.city}" loading="lazy">
        <div class="cover-grad"></div>
        <div class="tier-pill t${g.tier}">${tierLabels[g.tier] || "Verified"}</div>
        ${g.available ? `<div class="avail-pill"><span class="avail-dot"></span>Available Now</div>` : ''}
        <div class="ai-score-badge">⚡ AI ${g.aiScore}%</div>
      </div>
      <div class="card-body">
        <div class="card-avatar-row">
          <img src="${g.avatar}" alt="${g.name}" class="card-avatar" loading="lazy">
          <div class="card-name-block">
            <div class="card-name">${g.name}</div>
            <div class="card-tagline">${g.tagline}</div>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-rating">★ ${g.rating}</span>
          <span class="card-revs">(${g.reviews})</span>
          <span class="card-dot"></span>
          <span class="card-loc">📍 ${g.city}</span>
          <span class="card-dot"></span>
          <span class="card-exp">${g.years}yr exp</span>
        </div>
        <div class="card-langs">
          ${g.langs.map(l => `<span class="lang-tag">${l.f} ${l.n}</span>`).join('')}
        </div>
        <div class="card-cats">
          ${g.cats.slice(0,3).map(c => `<span class="cat-tag">${c}</span>`).join('')}
        </div>
        <div class="card-footer">
          <div class="card-price">from <strong>₹${g.rate.toLocaleString()}</strong>/person</div>
          <button class="card-book-btn" onclick="event.stopPropagation();openBooking('${g.id}')" aria-label="Book ${g.name}">Book Now</button>
        </div>
      </div>
      <button class="fav-btn ${appState.favorites.has(g.id)?'on':''}" onclick="event.stopPropagation();toggleFav('${g.id}',this)" aria-label="Favorite guide">
        ${appState.favorites.has(g.id) ? '❤️' : '🤍'}
      </button>
    </article>
  `).join('');
}

function resetFilters() {
  document.querySelectorAll('.fchip').forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('.fchip[data-cat="all"]');
  if (allChip) allChip.classList.add('active');
  appState.activeFilter = 'all';
  renderGuides();
}

function toggleFav(id, btn) {
  if (appState.favorites.has(id)) {
    appState.favorites.delete(id);
    btn.classList.remove('on');
    btn.textContent = '🤍';
    showToast('🤍', 'Removed', 'Guide removed from your favorites.');
  } else {
    appState.favorites.add(id);
    btn.classList.add('on');
    btn.textContent = '❤️';
    showToast('❤️', 'Saved!', 'Guide added to your favorites.');
  }
  localStorage.setItem('gc_favs', JSON.stringify([...appState.favorites]));
}

function renderDestinations() {
  const grid = document.getElementById('destinations-grid');
  if (!grid) return;
  grid.innerHTML = DESTINATIONS_DATA.map(d => `
    <div class="dest-card" onclick="setLocation('${d.name}')" role="button" tabindex="0" aria-label="${d.name}, ${d.state}">
      <img src="${d.img}" alt="${d.name}" loading="lazy">
      <div class="dest-grad"></div>
      <div class="dest-info">
        <div class="dest-badge">${d.badge}</div>
        <div class="dest-name">${d.name}</div>
        <div class="dest-cnt">${d.guides} verified guides</div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials() {
  const grid = document.getElementById('testi-grid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS_DATA.map(t => `
    <div class="testi-card" role="listitem">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <img src="${t.avatar}" alt="${t.name}" class="testi-avatar" loading="lazy">
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-loc">${t.loc}</div>
        </div>
        <div class="testi-verified">✓ Verified Trip</div>
      </div>
    </div>
  `).join('');
}

function openGuideModal(id) {
  const g = SAMPLE_GUIDES.find(x => x.id === id);
  if (!g) return;
  appState.activeGuide = g;

  const cov = document.getElementById('gmodal-cover-img');
  if (cov) cov.src = g.cover;
  const av = document.getElementById('gmodal-avatar');
  if (av) av.src = g.avatar;
  const nameEl = document.getElementById('gmodal-name-el');
  if (nameEl) nameEl.textContent = g.name;
  const tagEl = document.getElementById('gmodal-tagline');
  if (tagEl) tagEl.textContent = g.title;
  const bioEl = document.getElementById('gmodal-bio');
  if (bioEl) bioEl.textContent = g.bio;

  const badgesEl = document.getElementById('gmodal-badges');
  if (badgesEl) {
    badgesEl.innerHTML = g.verifiedBadges
      .map(b => `<span class="mbadge ${b.cls}">${b.icon} ${b.label}</span>`).join('');
  }

  const statsEl = document.getElementById('gmodal-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="gstat"><div class="gstat-val">★${g.rating}</div><div class="gstat-lbl">Rating</div></div>
      <div class="gstat"><div class="gstat-val">${g.reviews}</div><div class="gstat-lbl">Reviews</div></div>
      <div class="gstat"><div class="gstat-val">${g.tours}</div><div class="gstat-lbl">Tours Done</div></div>
      <div class="gstat"><div class="gstat-val">${g.years}yr</div><div class="gstat-lbl">Experience</div></div>
      <div class="gstat"><div class="gstat-val">${g.responseTime}</div><div class="gstat-lbl">Response</div></div>
    `;
  }

  const pkgsEl = document.getElementById('gmodal-pkgs');
  if (pkgsEl) {
    pkgsEl.innerHTML = g.packages.map((p,i) => `
      <div class="pkg-card ${i===0?'sel':''}" onclick="this.parentNode.querySelectorAll('.pkg-card').forEach(x=>x.classList.remove('sel'));this.classList.add('sel')">
        <div class="pkg-name">${p.name}</div>
        <div class="pkg-meta-row">
          <span>⏱️ ${p.hours} hours</span>
          <span>👥 Max group 6</span>
        </div>
        <ul class="pkg-hl">${p.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        <div class="pkg-price">₹${p.price.toLocaleString()} <small>per person</small></div>
      </div>
    `).join('');
  }

  const revEl = document.getElementById('gmodal-reviews');
  if (revEl) {
    revEl.innerHTML = g.reviews_data.map(r => `
      <div class="rev-card">
        <div class="rev-top">
          <div class="rev-author">
            <img src="${r.avatar}" alt="${r.author}" class="rev-av" loading="lazy">
            <div>
              <div class="rev-name">${r.author}</div>
              <div class="rev-country">${r.country}</div>
            </div>
          </div>
          <div class="rev-stars">${'★'.repeat(Math.round(r.rating))}</div>
        </div>
        <div class="rev-text">"${r.comment}"</div>
        <div style="display:flex;align-items:center;gap:.5rem;margin-top:.4rem">
          <div class="rev-date">${r.date}</div>
          ${r.verified ? '<div class="rev-verified">✓ Verified Booking</div>' : ''}
        </div>
      </div>
    `).join('');
  }

  openModal('guide-modal');
}

function openBookingFromModal() {
  closeModal('guide-modal');
  if (appState.activeGuide) openBooking(appState.activeGuide.id);
}

function openBooking(id) {
  const g = SAMPLE_GUIDES.find(x => x.id === id);
  if (!g) return;
  appState.activeGuide = g;

  const titleEl = document.getElementById('bmodal-title-el');
  if (titleEl) titleEl.textContent = `📅 Book ${g.name}`;
  const subEl = document.getElementById('bmodal-sub');
  if (subEl) subEl.textContent = `${g.city} · ₹${g.rate.toLocaleString()}/person · Escrow-Protected`;

  const pkgSelect = document.getElementById('book-package');
  if (pkgSelect) {
    pkgSelect.innerHTML = g.packages.map(p => `<option value="${p.price}">${p.name} – ₹${p.price.toLocaleString()}</option>`).join('');
  }

  updatePrice();
  openModal('booking-modal');
}

function updatePrice() {
  if (!appState.activeGuide) return;
  const guestsEl = document.getElementById('book-guests');
  const pkgEl = document.getElementById('book-package');
  const guests = guestsEl ? (parseInt(guestsEl.value) || 1) : 1;
  const pkgVal = pkgEl ? (parseFloat(pkgEl.value) || appState.activeGuide.rate) : appState.activeGuide.rate;
  const sub = pkgVal * guests;
  const fee = Math.round(sub * 0.05);
  const total = sub + fee;

  const rateEl = document.getElementById('ps-rate');
  if (rateEl) rateEl.textContent = `₹${pkgVal.toLocaleString()}`;
  const gEl = document.getElementById('ps-guests');
  if (gEl) gEl.textContent = guests;
  const feeEl = document.getElementById('ps-fee');
  if (feeEl) feeEl.textContent = `₹${fee.toLocaleString()}`;
  const totalEl = document.getElementById('ps-total');
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
}

function confirmBooking() {
  const nameEl = document.getElementById('book-name');
  const emailEl = document.getElementById('book-email');
  const dateEl = document.getElementById('book-date');
  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const date = dateEl ? dateEl.value : '';

  if (!name) { showToast('⚠️', 'Name Required', 'Please enter your full name.'); return; }
  if (!email || !email.includes('@')) { showToast('⚠️', 'Valid Email Required', 'Please enter a valid email address.'); return; }
  if (!date) { showToast('⚠️', 'Date Required', 'Please select your tour date.'); return; }

  const g = appState.activeGuide;
  closeModal('booking-modal');
  showToast('🎉', 'Booking Confirmed!', `Your tour with ${g.name} has been booked! Confirmation sent to ${email}.`);
}

function setMinBookDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    dateInput.min = minDate;
    dateInput.value = minDate;
  }
}

// ========== AI MATCH MODAL ==========
let aiCurrentStep = 1;
const AI_TOTAL = 4;

function openAIModal() {
  aiCurrentStep = 1;
  renderAIStep();
  openModal('ai-modal');
}

function renderAIStep() {
  document.querySelectorAll('.ai-step').forEach(s => s.classList.remove('active'));
  const isResults = aiCurrentStep > AI_TOTAL;
  const ind = document.getElementById('ai-step-indicator');
  const nextBtn = document.getElementById('ai-next-btn');
  const prevBtn = document.getElementById('ai-prev-btn');
  const prog = document.getElementById('ai-progress');

  if (isResults) {
    const resStep = document.getElementById('ai-step-results');
    if (resStep) resStep.classList.add('active');
    if (ind) ind.textContent = 'Your results';
    if (nextBtn) {
      nextBtn.textContent = '🔍 View All Results';
      nextBtn.onclick = viewAllAIResults;
    }
    if (prevBtn) prevBtn.style.display = 'inline-flex';
    if (prog) prog.style.width = '100%';
    runAIMatch();
  } else {
    const curr = document.getElementById(`ai-step-${aiCurrentStep}`);
    if (curr) curr.classList.add('active');
    if (ind) ind.textContent = `Step ${aiCurrentStep} of ${AI_TOTAL}`;
    if (nextBtn) {
      nextBtn.textContent = aiCurrentStep < AI_TOTAL ? 'Next →' : '⚡ Find My Guides';
      nextBtn.onclick = aiNext;
    }
    if (prevBtn) prevBtn.style.display = aiCurrentStep > 1 ? 'inline-flex' : 'none';
    if (prog) prog.style.width = `${(aiCurrentStep / AI_TOTAL) * 100}%`;
  }
}

function aiNext() {
  if (aiCurrentStep === 1) {
    const cityEl = document.getElementById('ai-city');
    const city = cityEl ? cityEl.value : '';
    if (!city) { showToast('⚠️', 'Select Destination', 'Please select a destination to continue.'); return; }
    appState.aiAnswers.city = city;
  }
  if (aiCurrentStep === 2) {
    const lang = document.querySelector('input[name="ai-lang"]:checked');
    if (!lang) { showToast('⚠️', 'Select Language', 'Please select your preferred language.'); return; }
    appState.aiAnswers.lang = lang.value;
  }
  if (aiCurrentStep === 3) {
    const interests = [...document.querySelectorAll('input[name="ai-interest"]:checked')].map(i => i.value);
    appState.aiAnswers.interests = interests;
  }
  if (aiCurrentStep === 4) {
    const budget = document.querySelector('input[name="ai-budget"]:checked');
    if (!budget) { showToast('⚠️', 'Select Budget', 'Please select your approximate budget.'); return; }
    appState.aiAnswers.budget = budget.value;
  }
  aiCurrentStep++;
  renderAIStep();
}

function aiPrev() {
  if (aiCurrentStep > 1) {
    aiCurrentStep--;
    renderAIStep();
  }
}

function viewAllAIResults() {
  const city = appState.aiAnswers.city || 'Varanasi';
  closeModal('ai-modal');
  const locInput = document.getElementById('location-input');
  if (locInput) locInput.value = city;
  performSearch(city);
}

function runAIMatch() {
  const {city, lang, interests=[], budget} = appState.aiAnswers;
  const budgetMap = {budget:[0,1500],mid:[1500,3000],premium:[3000,5000],luxury:[5000,99999]};
  const [minB, maxB] = budgetMap[budget] || [0,99999];

  const scored = SAMPLE_GUIDES.map(g => {
    let score = g.aiScore;
    if (city && (g.city.toLowerCase() === city.toLowerCase() || g.state.toLowerCase().includes(city.toLowerCase()))) score += 15;
    if (lang && g.langs.some(l => l.n === lang)) score += 12;
    if (interests.length) {
      const matches = interests.filter(i => g.cats.includes(i)).length;
      score += matches * 8;
    }
    if (g.rate >= minB && g.rate <= maxB) score += 10;
    return { ...g, computedScore: Math.min(score, 99) };
  }).sort((a,b) => b.computedScore - a.computedScore).slice(0, 4);

  const reasons = (g) => {
    const r = [];
    if (city && g.city.toLowerCase().includes(city.toLowerCase())) r.push(`Expert in ${city}`);
    if (lang && g.langs.some(l => l.n === lang)) r.push(`Fluent in ${lang}`);
    if (interests.length && interests.some(i => g.cats.includes(i))) r.push(`Matches interests`);
    if (!r.length) r.push(`Top verified local guide`);
    return r.join(' · ');
  };

  const listEl = document.getElementById('ai-results-list');
  if (listEl) {
    listEl.innerHTML = scored.map(g => {
      const pct = Math.round(g.computedScore);
      return `
      <div class="ai-res-card" onclick="closeModal('ai-modal');openGuideModal('${g.id}')" role="button" aria-label="View guide ${g.name}">
        <img src="${g.avatar}" alt="${g.name}" class="ai-res-av">
        <div style="flex:1;min-width:0">
          <div class="ai-res-name">${g.name}</div>
          <div class="ai-res-score">⚡ ${pct}% AI Match</div>
          <div class="ai-res-reason">${reasons(g)}</div>
        </div>
        <div class="score-ring" style="--pct:${pct}%">
          <span>${pct}</span>
        </div>
      </div>`;
    }).join('');
  }
}

// ========== MODAL HELPERS ==========
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeOnBg(e, id) {
  if (e.target.id === id) closeModal(id);
}

function openChat() {
  closeModal('guide-modal');
  const g = appState.activeGuide;
  showToast('💬', `Chat with ${g?.name || 'Guide'}`, 'End-to-end encrypted messaging channel initialized.');
}

// ========== REVEAL ON SCROLL ==========
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== TOAST ==========
function showToast(icon, title, msg) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>`;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

// ========== AI OPTION INTERACTION ==========
document.addEventListener('change', e => {
  const label = e.target.closest('.ai-opt');
  if (!label) return;
  if (e.target.type === 'radio') {
    document.querySelectorAll(`input[name="${e.target.name}"]`).forEach(r => {
      const parent = r.closest('.ai-opt');
      if (parent) parent.classList.remove('sel');
    });
  }
  label.classList.toggle('sel', e.target.checked);
});
