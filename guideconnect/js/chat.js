// ==========================================================================
// GuideConnect (Incredible India Edition) - Live In-App Messenger with AI Auto-Translation
// ==========================================================================

class ChatMessenger {
  constructor() {
    this.activeGuideId = "g-varanasi-01";
    this.autoTranslateEnabled = true;
    this.messages = {};

    this.initDefaultThreads();
    this.bindEvents();
    this.renderConversationsList();
  }

  initDefaultThreads() {
    this.messages["g-varanasi-01"] = [
      {
        sender: "guide",
        text: "Namaste! I am Aarav Sharma. It will be an honor to guide you through the ancient sacred heritage and Ganga dawn boat row in Varanasi!",
        originalText: "नमस्ते! मैं आरव शर्मा हूँ। काशी की पावन धरा और गंगा आरती दर्शन में आपका मार्गदर्शन करना मेरा सौभाग्य होगा।",
        time: "10:15 AM"
      },
      {
        sender: "tourist",
        text: "Namaste Aarav ji! We are traveling with my elderly parents. Can we arrange e-rickshaws through the narrow alleyways?",
        time: "10:18 AM"
      },
      {
        sender: "guide",
        text: "Certainly! I have pre-arranged authorized e-rickshaw permits to pick you up right from your hotel and drop you at the Ghat steps without walking strain.",
        originalText: "बिल्कुल निश्चिंत रहें! मैंने आपकी माता-पिता की सुविधा के लिए अधिकृत ई-रिक्शा की व्यवस्था कर दी है जो आपको सीधे घाट की सीढ़ियों तक पहुँचाएगा।",
        time: "10:20 AM"
      }
    ];

    this.messages["g-jaipur-02"] = [
      {
        sender: "guide",
        text: "Khamma Ghani! Rajveer here. Ready to discover the royal secrets and hidden tunnels of Amer Fort?",
        originalText: "खम्मा घणी! मैं राजवीर सिंह। क्या आप आमेर दुर्ग के गुप्त तहखानों और राजपूती इतिहास को जानने के लिए तैयार हैं?",
        time: "09:30 AM"
      }
    ];

    this.messages["g-agra-03"] = [
      {
        sender: "guide",
        text: "Salam and Namaste! Farhan Mirza here. Looking forward to our sunrise Taj Mahal exploration. Early morning entry is at 05:45 AM!",
        originalText: "सलाम और नमस्ते! मैं फ़रहान मिर्ज़ा। सुबह की पहली किरण में ताज महल के अद्भुत दर्शन के लिए तैयार रहें।",
        time: "Yesterday"
      }
    ];

    this.messages["g-kerala-04"] = [
      {
        sender: "guide",
        text: "Namaskaram! Ananya Nair here. Our private wooden canoe in Alleppey is reserved for our peaceful village backwater trail.",
        originalText: "നമസ്കാരം! ഞാൻ അനന്യ നായർ. ആലപ്പുഴയിലെ ഗ്രാമീണ കായൽ യാത്രയ്ക്കായി വള്ളം ഒരുക്കിയിട്ടുണ്ട്.",
        time: "Aug 24"
      }
    ];
  }

  bindEvents() {
    const sendBtn = document.getElementById("chat-send-btn");
    const inputField = document.getElementById("chat-input-text");
    const translateToggle = document.getElementById("chat-translate-checkbox");

    if (sendBtn && inputField) {
      sendBtn.addEventListener("click", () => this.sendMessage());
      inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.sendMessage();
      });
    }

    if (translateToggle) {
      translateToggle.addEventListener("change", (e) => {
        this.autoTranslateEnabled = e.target.checked;
        this.renderActiveMessages();
        app.showToast("Translation Mode", `Regional auto-translation is ${this.autoTranslateEnabled ? 'ON' : 'OFF'}.`, "info");
      });
    }

    document.querySelectorAll(".quick-reply-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const text = pill.textContent.trim();
        if (inputField) {
          inputField.value = text;
          this.sendMessage();
        }
      });
    });
  }

  renderConversationsList() {
    const listContainer = document.getElementById("conversations-list");
    if (!listContainer) return;

    const guideIds = Object.keys(this.messages);

    listContainer.innerHTML = guideIds.map(id => {
      const guide = GUIDES_DATABASE.find(g => g.id === id);
      if (!guide) return "";
      const lastMsg = this.messages[id][this.messages[id].length - 1];
      const isActive = id === this.activeGuideId;

      return `
        <div class="chat-conversation-item ${isActive ? 'active' : ''}" onclick="chatMessengerInstance.openConversation('${guide.id}')">
          <img src="${guide.avatar}" alt="${guide.name}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0;">
          <div style="flex:1;overflow:hidden;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <h5 style="font-size:0.9rem;font-weight:800;color:var(--text-main);">${guide.name}</h5>
              <span style="font-size:0.7rem;color:var(--text-muted);">${lastMsg ? lastMsg.time : ''}</span>
            </div>
            <p style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${lastMsg ? lastMsg.text : 'Tap to open chat...'}
            </p>
          </div>
        </div>
      `;
    }).join("");
  }

  openConversation(guideId) {
    this.activeGuideId = guideId;
    const guide = GUIDES_DATABASE.find(g => g.id === guideId);
    if (!guide) return;

    if (!this.messages[guideId]) {
      this.messages[guideId] = [
        {
          sender: "guide",
          text: `Namaste! I am ${guide.name}. Looking forward to showing you ${guide.location.city}! Feel free to ask any questions.`,
          time: "Just now"
        }
      ];
    }

    // Update Header
    const avatarImg = document.getElementById("chat-guide-avatar");
    const nameEl = document.getElementById("chat-guide-name");
    const langEl = document.getElementById("chat-guide-lang");

    if (avatarImg) avatarImg.src = guide.avatar;
    if (nameEl) nameEl.textContent = guide.name;
    if (langEl) langEl.textContent = `📍 ${guide.location.city} • Languages: ${guide.languages.map(l => l.name).join(", ")}`;

    this.renderConversationsList();
    this.renderActiveMessages();

    // Show Chat Modal
    const chatModal = document.getElementById("chat-modal");
    if (chatModal) {
      chatModal.classList.add("active");
    }
  }

  renderActiveMessages() {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    const msgs = this.messages[this.activeGuideId] || [];

    container.innerHTML = msgs.map(m => `
      <div class="chat-bubble ${m.sender}">
        <div style="font-size:0.88rem;">${m.text}</div>
        ${m.originalText && this.autoTranslateEnabled ? `
          <div style="font-size:0.72rem;opacity:0.75;margin-top:0.35rem;border-top:1px dashed rgba(255,255,255,0.2);padding-top:0.25rem;">
            🌐 Regional Translation: <em>${m.originalText}</em>
          </div>
        ` : ''}
        <div style="font-size:0.68rem;opacity:0.6;text-align:right;margin-top:0.2rem;">${m.time}</div>
      </div>
    `).join("");

    container.scrollTop = container.scrollHeight;
  }

  sendMessage() {
    const inputField = document.getElementById("chat-input-text");
    if (!inputField) return;

    const text = inputField.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!this.messages[this.activeGuideId]) {
      this.messages[this.activeGuideId] = [];
    }

    this.messages[this.activeGuideId].push({
      sender: "tourist",
      text: text,
      time: timeStr
    });

    inputField.value = "";
    this.renderActiveMessages();
    this.renderConversationsList();

    // Simulated verified guide auto-reply
    setTimeout(() => {
      const guide = GUIDES_DATABASE.find(g => g.id === this.activeGuideId) || GUIDES_DATABASE[0];
      const replies = [
        `Thank you for your message! Yes, absolutely. I will customize our walk in ${guide.location.city} according to your preference.`,
        `Namaste! Yes, all recommended food stops are 100% hygienic and sanitized. Looking forward to our tour!`,
        `Certainly! Modest dress covering shoulders and knees is recommended for temples. Shoe covers will be provided.`,
        `Understood! I will meet you at the designated landmark 10 minutes prior to start time.`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      this.messages[this.activeGuideId].push({
        sender: "guide",
        text: randomReply,
        originalText: "नमस्ते! आपकी यात्रा की संपूर्ण व्यवस्था सुरक्षित और सुविधाजनक रहेगी।",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      this.renderActiveMessages();
      this.renderConversationsList();
      app.showToast(`New Message from ${guide.name}`, randomReply.substring(0, 60) + "...", "info");
    }, 1200);
  }
}

let chatMessengerInstance = null;
document.addEventListener("DOMContentLoaded", () => {
  chatMessengerInstance = new ChatMessenger();
});
