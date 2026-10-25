/* AgentX site assistant — rule-based widget (no LLM, never guesses).
   Knowledge base: only verified facts. Portfolio framed honestly.
   Ported from the tested TS engine (123/123) with one hardening tweak:
   patterns of 3 chars or fewer need a word boundary ("hi" must not
   fire inside "this"). Contract: every input gets a reply; first miss
   clarifies with options, second miss hands over to a real human. */
(function () {
  "use strict";

  var CONTACT = {
    email: "wasia2053@gmail.com",
    phone: "+92 311 3013137",
    calendly: "https://calendly.com/wasia2053/30min"
  };
  var LINE_EN = "You can reach us directly — email " + CONTACT.email + ", phone/WhatsApp " + CONTACT.phone + ", or book a free 30-minute strategy call here: " + CONTACT.calendly;
  var LINE_UR = "Aap hum se direct rabta kar sakte hain — email " + CONTACT.email + ", phone/WhatsApp " + CONTACT.phone + ", ya free 30-minute strategy call book karen: " + CONTACT.calendly;

  var INTENTS = [
    { id: "greeting", patterns: ["hello", "hi", "hey", "salam", "assalam", "aoa", "adab", "good morning", "good evening", "good afternoon", "namaste"],
      en: "Hi! I'm the AgentX assistant. I can tell you what we build, what it costs, how fast we start, and show you our work — or book you a free strategy call. What would you like to know?",
      ur: "Assalam-o-Alaikum! Main AgentX assistant hun. Main bata sakta hun ke hum kya banate hain, kitna kharcha aata hai, kitni jaldi shuru kar sakte hain, aur hamara kaam dikha sakta hun — ya aap ke liye free strategy call book kar sakta hun. Kya jaanna chahenge?",
      chips: ["What does AgentX build?", "How much does it cost?", "Book a free call"] },
    { id: "thanks", patterns: ["thanks", "thank you", "shukriya", "great", "awesome", "nice", "perfect", "zabardast", "bohat acha", "bohot acha"],
      en: "You're welcome! If you want to take the next step, book a free 30-minute strategy call and we'll map out your website, chatbot, and SEO plan. Anything else I can help with?",
      ur: "Khush aamdeed! Agar agla step lena hai to free 30-minute strategy call book karen — hum aap ka website, chatbot aur SEO plan bana denge. Aur kuch madad chahiye?",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "bye", patterns: ["bye", "allah hafiz", "khuda hafiz", "goodbye", "see you", "phir milenge", "good night"],
      en: "Goodbye! When you're ready, the free strategy call is here: " + CONTACT.calendly + " — or email us anytime at " + CONTACT.email + ". Have a good one!",
      ur: "Allah Hafiz! Jab ready hon to free strategy call yahan hai: " + CONTACT.calendly + " — ya kabhi bhi email karen: " + CONTACT.email },
    { id: "how_are_you", patterns: ["how are you", "kaise ho", "kaisi ho", "kya haal", "how is it going", "whats up", "what's up", "kia haal"],
      en: "I'm doing well, thanks for asking! I'm here to help with anything about AgentX — our services, pricing, timeline, or booking a free call. What can I do for you?",
      ur: "Main theek hun, shukriya! Main AgentX ke baare me kisi bhi cheez me madad kar sakta hun — services, pricing, timeline, ya free call book karna. Kya kar sakta hun aap ke liye?",
      chips: ["What does AgentX build?", "How much does it cost?"] },
    { id: "services", patterns: ["what do you do", "services", "what does agentx", "kya karte", "kya banate", "offer", "kya kya", "what can you do", "kaam kya", "services kya"],
      en: "AgentX is a one-team bundle: (1) Website Design & Development — fast, modern websites built to turn visitors into enquiries. (2) AI Chatbot — trained on your business, answers every visitor instantly, day and night. (3) SEO — data-driven rankings that bring steady traffic. Plus supporting services: AI Automation, Voice Agents, and Graphic Designing.",
      ur: "AgentX ek hi team ka bundle hai: (1) Website Design & Development — tez, modern websites jo visitors ko enquiries me badalti hain. (2) AI Chatbot — aap ke business par trained, har visitor ko foran jawab, din raat. (3) SEO — data-driven rankings jo musalsal traffic laati hain. Is ke saath: AI Automation, Voice Agents aur Graphic Designing bhi.",
      chips: ["How much does it cost?", "How fast can we start?", "Show me your work"] },
    { id: "website", patterns: ["website", "web design", "web development", "web site", "landing page", "ecommerce", "e-commerce", "online store", "site banana"],
      en: "We design and develop high-performance websites engineered to convert: fast, modern, and built to scale. Website plans are $749 (5 pages), $999 (10 pages) and $1,399 (up to 20 pages), one-time, with everything included. Full details: https://agentxwebsolutions.com/pricing-web.html — and you can add our chatbot so no visitor ever waits for an answer.",
      ur: "Hum high-performance websites design aur develop karte hain jo convert karne ke liye bani hoti hain: tez, modern aur scale hone wali. Website plans $749 (5 pages), $999 (10 pages) aur $1,399 (20 pages tak) hain, one-time, sab kuch shamil. Poori tafseel: https://agentxwebsolutions.com/pricing-web.html — aur aap hamara chatbot bhi laga sakte hain taake koi visitor jawab ka wait na kare.",
      chips: ["How much does it cost?", "Show me your work"] },
    { id: "chatbot_service", patterns: ["chatbot", "ai bot", "bot", "chat bot", "assistant", "auto reply", "auto-reply"],
      en: "Our standard chatbot is a smart FAQ and lead chatbot for your website, exactly like this one: it answers your common questions instantly, day and night, captures leads and emails them to you, and hands visitors over to you when a human is needed. Plans are $299 to $799 one-time, with no monthly bills and no per-message charges: https://agentxwebsolutions.com/pricing-chatbot.html — and if you need a full AI bot, we quote that as a custom project.",
      ur: "Hamara standard chatbot aap ki website ke liye ek smart FAQ or lead chatbot he, bilkul is chat jesa: aap ke aam sawalon ke foran jawab, din raat, leads capture karke aap ko email, or jab insaan ki zaroorat ho to visitor ko aap se mila deta he. Plans $299 se $799 one-time hen, koi monthly bill nahi, koi per-message charges nahi: https://agentxwebsolutions.com/pricing-chatbot.html — or agar full AI bot chahiye ho to wo hum custom project ke tor par quote karte hen.",
      chips: ["How much does it cost?", "Book a free call"] },
    { id: "seo", patterns: ["seo", "rank", "google", "ranking", "search engine", "traffic", "top of google", "organic"],
      en: "Our SEO is data-driven work that pushes your business to the top of Google, and keeps it there: full audit, keyword research, on-page optimisation, link building and a monthly report. Plans are $300, $500 and $700/month, with setup included in every plan: https://agentxwebsolutions.com/pricing-seo.html",
      ur: "Hamara SEO data-driven kaam hai jo aap ke business ko Google ke top par le jaata hai, or wahan rakhta hai: mukammal audit, keyword research, on-page optimisation, link building or monthly report. Plans $300, $500 or $700/month hen, setup har plan me shamil he: https://agentxwebsolutions.com/pricing-seo.html",
      chips: ["How much does it cost?", "Show me your work"] },
    { id: "automation", patterns: ["automation", "automate", "workflow", "zapier", "make.com", "integration"],
      en: "Our AI Automation service connects your tools and removes repetitive work — for example, a new lead automatically getting a reply, a follow-up, and a booked slot. Tell us which manual task eats your time and we will scope it on your free strategy call.",
      ur: "Hamari AI Automation service aap ke tools ko jorti hai aur repetitive kaam khatam karti hai — jaise naye lead ko foran reply, follow-up aur booked slot. Bataein kaunsa manual kaam aap ka waqt khata hai, hum free strategy call par us ka scope bata denge.",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "voice", patterns: ["voice", "voice agent", "phone agent", "call agent", "ai call", "ai phone"],
      en: "Our Voice Agents answer phone calls for your business with natural, helpful conversations — taking enquiries, answering FAQs, and booking callers in. If phone enquiries matter to you, bring it up on your free strategy call and we will scope it.",
      ur: "Hamare Voice Agents aap ke business ke liye phone calls ka jawab dete hain — natural aur helpful guftagu ke saath, enquiries lena, FAQs ka jawab aur callers ko book karna. Agar phone enquiries aap ke liye zaroori hain to free strategy call par zikr karen, hum scope bata denge.",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "design", patterns: ["graphic", "design", "logo", "branding", "brand", "poster", "flyer"],
      en: "Our Graphic Designing service covers the visuals your brand needs — logos, social posts, and marketing material that match your website. It works best as a supporting service alongside a website, chatbot, or SEO bundle.",
      ur: "Hamari Graphic Designing service aap ke brand ke liye visuals banati hai — logos, social posts aur marketing material jo aap ki website se match kare. Ye website, chatbot ya SEO bundle ke saath supporting service ke tor par behtareen kaam karti hai.",
      chips: ["What does AgentX build?", "How much does it cost?"] },
    { id: "pricing_seo", patterns: ["seo price", "seo cost", "seo retainer", "seo kitna", "seo charges", "seo monthly", "seo ki price"],
      en: "SEO plans are $300/month (Basic), $500/month (Advanced) and $700/month (Custom), depending on how many pages and keywords you need covered. Setup is included in every plan, there is no separate setup fee. Full plan details: https://agentxwebsolutions.com/pricing-seo.html",
      ur: "SEO plans $300/month (Basic), $500/month (Advanced) or $700/month (Custom) hen, is par depend karta he ke kitne pages or keywords cover karne hen. Setup har plan me shamil he, alag setup fee koi nahi. Poori tafseel: https://agentxwebsolutions.com/pricing-seo.html",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_chatbot", patterns: ["chatbot price", "chatbot cost", "chatbot kitna", "chatbot charges", "chatbot monthly", "bot price", "bot cost"],
      en: "Chatbot plans are one-time: Basic $299, Premium $499, Advanced $799. There are no monthly charges and no per-message bills. An update plan is optional at $39/month if you want us to keep your questions and answers fresh. Full details: https://agentxwebsolutions.com/pricing-chatbot.html",
      ur: "Chatbot plans one-time hen: Basic $299, Premium $499, Advanced $799. Koi monthly charges nahi, koi per-message bills nahi. Update plan optional he, $39/month, agar aap chahen ke hum aap ke sawal-jawab fresh rakhte rahen. Poori tafseel: https://agentxwebsolutions.com/pricing-chatbot.html",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_web", patterns: ["website price", "website cost", "web price", "website kitna", "website charges", "web development price", "site price", "website package", "web design price"],
      en: "Website plans are one-time: Basic $749 (5 pages), Premium $999 (10 pages, domain and hosting for a year included) and Advanced $1,399 (up to 20 pages). Online stores are quoted per project. Full details: https://agentxwebsolutions.com/pricing-web.html",
      ur: "Website plans one-time hen: Basic $749 (5 pages), Premium $999 (10 pages, domain or hosting ek saal shamil) or Advanced $1,399 (20 pages tak). Online stores project ke hisaab se quote hote hen. Poori tafseel: https://agentxwebsolutions.com/pricing-web.html",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_automation", patterns: ["automation price", "automation cost", "automation kitna", "automate price", "workflow price", "audit price", "automation charges"],
      en: "Automation starts with an audit at $249, fully credited toward any build. Builds are one-time: Basic $899 (one workflow), Premium $2,199 (up to 3 workflows) and Advanced $4,499 (multi-system). An optional care retainer is $249/month. Full details: https://agentxwebsolutions.com/pricing-automation.html",
      ur: "Automation audit se shuru hoti he, $249, jo kisi bhi build me poora adjust ho jata he. Builds one-time hen: Basic $899 (ek workflow), Premium $2,199 (3 workflows tak) or Advanced $4,499 (multi-system). Optional care retainer $249/month he. Poori tafseel: https://agentxwebsolutions.com/pricing-automation.html",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_voice", patterns: ["voice price", "voice cost", "voice agent price", "voice kitna", "call agent price", "voice charges", "phone agent price"],
      en: "Voice agents are flat monthly: Basic $179/month (500 minutes included, $399 setup), Premium $279/month (1,500 minutes, $899 setup) and Advanced $449/month (3,000 minutes, $1,799 setup). Extra minutes are $0.25/min. Full details: https://agentxwebsolutions.com/pricing-voice.html",
      ur: "Voice agents flat monthly hen: Basic $179/month (500 minutes shamil, setup $399), Premium $279/month (1,500 minutes, setup $899) or Advanced $449/month (3,000 minutes, setup $1,799). Extra minutes $0.25/min hen. Poori tafseel: https://agentxwebsolutions.com/pricing-voice.html",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_design", patterns: ["logo price", "logo cost", "logo kitna", "design price", "design cost", "branding price", "subscription price", "logo charges"],
      en: "Logo packages are one-time: Basic Logo $149, Premium Logo $349 and full Brand Identity $799, all with proper files included. A design subscription is $349 or $599/month if you need design every week. Full details: https://agentxwebsolutions.com/pricing-design.html",
      ur: "Logo packages one-time hen: Basic Logo $149, Premium Logo $349 or mukammal Brand Identity $799, sab me proper files shamil. Agar har hafte design chahiye to design subscription $349 ya $599/month he. Poori tafseel: https://agentxwebsolutions.com/pricing-design.html",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "combo", patterns: ["launch package", "combo", "bundle", "package deal", "three in one", "3 in 1", "website chatbot seo", "launch offer"],
      en: "The Launch Package is $1,199 one-time: a 5-page website ($749) + a website FAQ and lead chatbot ($299) + SEO setup and the first month of Basic SEO ($300 value) + the first month of the chatbot update plan free. Bought separately it is $1,387, so you save $188. After month 1, SEO can continue at $300/month. Details: https://agentxwebsolutions.com/pricing.html",
      ur: "Launch Package $1,199 one-time he: 5-page website ($749) + website FAQ or lead chatbot ($299) + SEO setup or Basic SEO ka pehla month ($300 value) + chatbot update plan ka pehla month free. Alag alag len to $1,387 banta he, yani $188 ki bachat. Pehle month ke baad SEO $300/month par jaari reh sakta he. Tafseel: https://agentxwebsolutions.com/pricing.html",
      chips: ["Book a free call", "How fast can we start?"] },
    { id: "pricing_page", patterns: ["pricing page", "pricing plans", "price list", "all the plans", "see plans", "plans page"],
      en: "Here is our full pricing page, every plan and what is included: https://agentxwebsolutions.com/pricing.html — websites from $749, chatbots from $299, SEO from $300/month, and the Launch Package at $1,199.",
      ur: "Ye rahi hamari mukammal pricing page, har plan or us me kya shamil he: https://agentxwebsolutions.com/pricing.html — websites $749 se, chatbots $299 se, SEO $300/month se, or Launch Package $1,199 me.",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "pricing", patterns: ["price", "cost", "kitna", "kitne", "paisa", "charges", "charge", "fee", "fees", "package", "pricing", "how much", "rate", "rates"],
      en: "All our prices are published: https://agentxwebsolutions.com/pricing.html — Websites $749 to $1,399 one-time. Chatbots $299 to $799 one-time. SEO $300 to $700/month. Automation builds from $899. Voice agents from $179/month plus setup. Logos from $149. And the Launch Package (website + chatbot + first month of SEO) is $1,199 one-time. No hourly billing, no surprises.",
      ur: "Hamari saari prices published hen: https://agentxwebsolutions.com/pricing.html — Websites $749 se $1,399 one-time. Chatbots $299 se $799 one-time. SEO $300 se $700/month. Automation builds $899 se. Voice agents $179/month se, setup alag. Logos $149 se. Or Launch Package (website + chatbot + SEO ka pehla month) $1,199 one-time he. No hourly billing, no surprises.",
      chips: ["Book a free call", "How fast can we start?"] },
    { id: "timeline", patterns: ["how long", "kitna time", "kab tak", "timeline", "delivery", "how fast", "kitni jaldi", "when", "start", "shuru"],
      en: "Most bundles kick off within a week of your free strategy call. The exact delivery timeline depends on your scope — you will get it in writing with your fixed quote, before we start. Book the free call and we will map it out.",
      ur: "Aksar bundles free strategy call ke ek hafte ke andar shuru ho jaate hain. Exact delivery timeline aap ke scope par depend karta hai — wo aap ko fixed quote ke saath likh kar mil jayega, shuru karne se pehle. Free call book karen aur hum timeline bana denge.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "process", patterns: ["process", "how it works", "how does it work", "how does this work", "how do you work", "kaise kaam", "kaise hoga", "steps", "procedure", "kaam kaise", "workflow kaise", "next step"],
      en: "Simple process: (1) Book a free 30-minute strategy call. (2) We send you a fixed quote with scope and timeline — no hourly billing. (3) We kick off, usually within a week. (4) You review, we launch, and we stay on for support and care plans. Step one is here: " + CONTACT.calendly,
      ur: "Simple process: (1) Free 30-minute strategy call book karen. (2) Hum fixed quote bhejenge — scope aur timeline ke saath, no hourly billing. (3) Kaam shuru, aam tor par ek hafte ke andar. (4) Aap review karen, hum launch karen, aur support ke liye saath rahen. Pehla step yahan hai: " + CONTACT.calendly,
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "portfolio", patterns: ["portfolio", "work", "projects", "kaam", "dikhao", "examples", "clients", "previous", "past work", "show me"],
      en: "Projects we have worked on (SEO + development), all live: Pixiest Photography, The Bean Guys, DM Power Construction, Tainted Flesh Body Art, Estelles Lighting, and Black Eden 420 — these are AnaxDesign projects where AgentX handled the SEO + development. Our own latest full design and build is Rizvi & Rajput Law Associates (rrlegal.pk), live now. Ask us about the latest work on your free call.",
      ur: "Projects jin par hum ne kaam kiya hai (SEO + development), sab live: Pixiest Photography, The Bean Guys, DM Power Construction, Tainted Flesh Body Art, Estelles Lighting aur Black Eden 420 — ye AnaxDesign projects hain jin par AgentX ne SEO + development kiya. Hamari apni latest mukammal design or build Rizvi & Rajput Law Associates (rrlegal.pk) hai, jo live hai. Free call par latest kaam pooch sakte hain.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "team", patterns: ["team", "wasi", "ali", "founder", "kon ho", "kaun ho", "who are you", "about you", "owners", "members"],
      en: "AgentX is run by two founders: Wasi Ahmed leads development, and Ali Ahmed leads SEO. When you work with us, you talk directly to the people who build your website, chatbot, and rankings — no account-manager telephone game.",
      ur: "AgentX do founders chalate hain: Wasi Ahmed development lead karte hain, aur Ali Ahmed SEO lead karte hain. Jab aap hamare saath kaam karte hain to seedha unhi logon se baat hoti hai jo aap ki website, chatbot aur rankings banate hain — koi account-manager ka telephone game nahi.",
      chips: ["Book a free call", "Show me your work"] },
    { id: "contact", patterns: ["contact", "call", "email", "phone", "number", "rabta", "whatsapp", "reach", "talk to", "baat karni", "mail"],
      en: LINE_EN + ". Prefer to talk first? Book the free call and we will come prepared.",
      ur: LINE_UR + ". Pehle baat karna chahte hain? Free call book karen, hum tayyari ke saath aayenge.",
      chips: ["Book a free call"] },
    { id: "booking", patterns: ["book", "meeting", "demo", "schedule", "appointment", "strategy call", "free call", "consultation", "call book"],
      en: "You can book a free 30-minute strategy call here: " + CONTACT.calendly + " — we will map out your website + chatbot + SEO roadmap, no pressure, no obligation. Or email " + CONTACT.email + " if you prefer to write first.",
      ur: "Free 30-minute strategy call yahan book kar sakte hain: " + CONTACT.calendly + " — hum aap ka website + chatbot + SEO roadmap bana denge, no pressure, no obligation. Ya pehle likhna hai to email karen: " + CONTACT.email,
      chips: ["How much does it cost?", "What does AgentX build?"] },
    { id: "human", patterns: ["human", "agent", "banda", "real person", "person", "someone real", "insan", "operator", "support person", "talk to human"],
      en: "Of course — happy to connect you with a real person. Email " + CONTACT.email + ", call/WhatsApp " + CONTACT.phone + ", or book a free 30-minute call and you'll speak directly with Wasi or Ali: " + CONTACT.calendly,
      ur: "Bilkul — asli bande se rabta karwa dete hain. Email " + CONTACT.email + ", call/WhatsApp " + CONTACT.phone + ", ya free 30-minute call book karen — seedha Wasi ya Ali se baat hogi: " + CONTACT.calendly },
    { id: "location", patterns: ["where", "kahan", "location", "office", "based", "country", "city", "kis mulk", "kis city"],
      en: "AgentX works with clients worldwide — your website, chatbot, and SEO are delivered remotely, and your free strategy call happens over video. To start, book here: " + CONTACT.calendly,
      ur: "AgentX duniya bhar ke clients ke saath kaam karta hai — aap ki website, chatbot aur SEO remotely deliver hoti hai, aur free strategy call video par hoti hai. Shuru karne ke liye yahan book karen: " + CONTACT.calendly,
      chips: ["Book a free call"] },
    { id: "why", patterns: ["why agentx", "why you", "kyun", "best", "faida", "benefit", "advantage", "different", "choose", "kyu"],
      en: "Three reasons: (1) One team, one bundle — website + chatbot + SEO together, so nothing falls between agencies. (2) Built to sell — every design decision is measured by one metric: does it turn your visitors into customers? (3) Fixed quote, no hourly billing, and you talk directly to the builders. Want proof? Ask about our work on your free call.",
      ur: "Teen wajah: (1) Ek team, ek bundle — website + chatbot + SEO ek saath, taake kuch agencies ke beech na khoye. (2) Built to sell — har design decision ek hi metric se napi jaati hai: kya ye aap ke visitors ko customers me badalta hai? (3) Fixed quote, no hourly billing, aur baat seedha builders se. Proof chahiye? Free call par hamara kaam pooch lein.",
      chips: ["Show me your work", "Book a free call"] },
    { id: "discount", patterns: ["discount", "sasta", "cheap", "cheaper", "negotiate", "kam karo", "offer", "deal", "sale"],
      en: "We keep pricing honest: every project gets a fixed quote after a free strategy call, scoped to exactly what you need — no inflated prices, so no fake discounts either. The best value is the bundle: website + SEO + chatbot in one team, one timeline. Book the free call and we will quote your exact scope.",
      ur: "Hum pricing honest rakhte hain: har project ko free strategy call ke baad fixed quote milta hai, bilkul aap ki zaroorat ke mutabiq — na barhayi hui prices, na fake discounts. Behtareen value bundle me hai: website + SEO + chatbot, ek team, ek timeline. Free call book karen, hum exact scope quote kar denge.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "guarantee", patterns: ["guarantee", "refund", "warranty", "promise", "surety", "sure", "pakka"],
      en: "What we promise in writing: a fixed quote, a clear scope, and a timeline before we start — no hourly billing, no surprise charges. What we do not promise is fake numbers: no one can honestly guarantee a #1 Google ranking or an exact sales figure. What we do guarantee is the work, the process, and the support.",
      ur: "Hum likh kar ye promise karte hain: fixed quote, clear scope aur timeline — shuru karne se pehle, no hourly billing, no surprise charges. Jo hum promise nahi karte wo fake numbers hain: koi imandari se #1 Google ranking ya exact sales figure guarantee nahi kar sakta. Jo hum guarantee karte hain wo kaam, process aur support hai.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "language", patterns: ["language", "zuban", "urdu", "english", "arabic", "hindi", "kis zuban", "which language"],
      en: "I can chat in English and Roman Urdu — just write the way you are comfortable. The chatbots we build are set up around your business and your customers, including language and tone.",
      ur: "Main English aur Roman Urdu dono me baat kar sakta hun — jis tarah comfortable hon, wese likhen. Jo chatbots hum banate hain wo aap ke business aur aap ke customers ke mutabiq set hote hain, language aur tone samet.",
      chips: ["What does AgentX build?", "Book a free call"] }
  ];

  var STARTER_CHIPS = ["What does AgentX build?", "How much does it cost?", "How fast can we start?", "Book a free call"];
  var ROMAN_URDU = /\b(kya|kaise|kaisi|kab|kitna|kitne|kahan|kaun|kyun|kyu|hai|hain|karna|chahiye|batao|bataein|bataen|mujhe|mera|meri|apka|aapka|karo|karke|wala|wali|mein|nahi|aur|bhi|toh|kia|kr|krna|shukriya|aoa|salam|zabardast|bohat|bohot|acha|theek|rabta|kaam|dikhao|paisa|kitni|kis|koi|yeh|woh|jab|tab)\b/;

  function normalize(input) {
    return String(input || "").toLowerCase().normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function isRomanUrdu(raw) { return ROMAN_URDU.test(normalize(raw)); }

  function matches(normalized, p) {
    if (p.length <= 3) return new RegExp("(^|\\s)" + p + "(\\s|$)").test(normalized);
    return normalized.indexOf(p) !== -1;
  }

  function bestIntent(normalized) {
    var best = { index: -1, score: 0 };
    INTENTS.forEach(function (intent, i) {
      var matched = intent.patterns.filter(function (p) { return matches(normalized, p); })
        .sort(function (a, b) { return b.length - a.length; });
      var score = 0, counted = [];
      matched.forEach(function (p) {
        if (counted.some(function (c) { return c.indexOf(p) !== -1; })) return;
        counted.push(p); score += p.length;
      });
      if (score > best.score) best = { index: i, score: score };
    });
    return best;
  }

  function getReply(input, missCount) {
    var raw = String(input == null ? "" : input);
    var normalized = normalize(raw);
    var urdu = isRomanUrdu(raw);
    if (!normalized) {
      return { text: urdu
        ? "Kuch likha nahi — kya poochna chahte hain? Services, pricing, timeline ya free call book karna?"
        : "Looks like that message came through empty — what would you like to know? Services, pricing, timeline, or booking a free call?",
        chips: STARTER_CHIPS, kind: "fallback" };
    }
    var b = bestIntent(normalized);
    if (b.index >= 0 && b.score > 0) {
      var intent = INTENTS[b.index];
      return { text: urdu && intent.ur ? intent.ur : intent.en, chips: intent.chips || [], kind: "answer" };
    }
    if (missCount + 1 <= 1) {
      return { text: urdu
        ? "Main aap ko sahi jawab dena chahta hun — kya isay doosre tareeqe se keh sakte hain? Is doraan main in me madad kar sakta hun: hamari services, pricing, timeline, guzishta kaam, ya free call book karna."
        : "I want to give you the right answer — could you say that a different way? Meanwhile, here is what I can help with: our services, pricing, timeline, past work, or booking a free call.",
        chips: ["What does AgentX build?", "How much does it cost?", "Book a free call"], kind: "fallback" };
    }
    return { text: urdu
      ? "Is par andaza nahi lagana chahta — exact jawab ka tez tareen tareeqa asli banda hai. " + LINE_UR + "."
      : "I don't want to guess on this one — the fastest way to get your exact answer is a real person. " + LINE_EN + ".",
      chips: ["Book a free call", "What does AgentX build?"], kind: "fallback" };
  }

  /* ---------- widget UI ---------- */
  var BUBBLE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
  var SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>';
  var X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  var root = document.createElement("div");
  root.className = "agx";
  root.innerHTML =
    '<div class="agx-teaser"><span>Questions? Chat with us</span><button class="agx-teaser-x" aria-label="Dismiss">' + X + '</button></div>' +
    '<button class="agx-launch" aria-label="Open chat">' + BUBBLE + '<span>Chat</span></button>' +
    '<div class="agx-panel" role="dialog" aria-label="AgentX chat">' +
      '<div class="agx-head"><span class="agx-mark"></span>' +
        '<div class="agx-ht"><b>AgentX</b><i>Ask us anything — replies instantly</i></div>' +
        '<button class="agx-x" aria-label="Close chat">' + X + '</button></div>' +
      '<div class="agx-msgs"></div>' +
      '<div class="agx-chips"></div>' +
      '<form class="agx-bar"><input class="agx-in" type="text" placeholder="Type your message..." autocomplete="off" aria-label="Type your message">' +
        '<button class="agx-send" type="submit" aria-label="Send message">' + SEND + '</button></form>' +
    '</div>';
  document.body.appendChild(root);

  var markHost = root.querySelector(".agx-mark");
  /* Brand mark drawn fresh (same geometry as the site logo). Never clone
     the loader's mark — GSAP writes inline blur/opacity onto it. */
  markHost.innerHTML = '<svg class="mark" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><g transform="rotate(45 24 24)"><ellipse cx="24" cy="15" rx="7.5" ry="12"/><ellipse cx="24" cy="33" rx="7.5" ry="12"/><ellipse cx="15" cy="24" rx="12" ry="7.5"/><ellipse cx="33" cy="24" rx="12" ry="7.5"/></g></svg>';

  var launch = root.querySelector(".agx-launch"),
      panel = root.querySelector(".agx-panel"),
      msgs = root.querySelector(".agx-msgs"),
      chipsBox = root.querySelector(".agx-chips"),
      form = root.querySelector(".agx-bar"),
      input = root.querySelector(".agx-in"),
      teaser = root.querySelector(".agx-teaser"),
      opened = false, greeted = false, missCount = 0;

  function esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function linkify(t) {
    return esc(t)
      .replace(/(https?:\/\/[^\s<]+)/g, function (u) {
        var tail = "";
        if (/[.,;:!?\)]$/.test(u)) { tail = u.slice(-1); u = u.slice(0, -1); }
        return '<a href="' + u + '" target="_blank" rel="noopener">' + u.replace(/^https?:\/\//, "") + '</a>' + tail;
      })
      .replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
  }
  function scrollDown() { requestAnimationFrame(function () { msgs.scrollTo({ top: msgs.scrollHeight, behavior: "smooth" }); }); }

  function addMsg(text, who) {
    var d = document.createElement("div");
    d.className = "agx-msg " + who;
    d.innerHTML = linkify(text);
    msgs.appendChild(d);
    scrollDown();
    return d;
  }
  function typing() {
    var d = document.createElement("div");
    d.className = "agx-msg bot agx-typing";
    d.innerHTML = "<span></span><span></span><span></span>";
    msgs.appendChild(d);
    scrollDown();
    return d;
  }
  function setChips(list) {
    chipsBox.innerHTML = "";
    (list || []).forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "agx-chip"; b.textContent = c;
      b.addEventListener("click", function () { send(c); });
      chipsBox.appendChild(b);
    });
  }
  function botSay(reply) {
    var t = typing();
    setTimeout(function () {
      t.remove();
      addMsg(reply.text, "bot");
      setChips(reply.chips);
    }, 550 + Math.random() * 400);
  }
  function send(text) {
    text = (text || "").trim();
    if (!text) return;
    addMsg(text, "user");
    setChips([]);
    input.value = "";
    var reply = getReply(text, missCount);
    missCount = reply.kind === "answer" ? 0 : missCount + 1;
    botSay(reply);
  }

  function openChat() {
    opened = true;
    root.classList.add("open");
    teaser.classList.remove("show");
    if (!greeted) {
      greeted = true;
      var g = getReply("hello", 0);
      botSay(g);
    }
    if (window.innerWidth > 900) setTimeout(function () { input.focus(); }, 380);
  }
  function closeChat() { opened = false; root.classList.remove("open"); }

  launch.addEventListener("click", function () { opened ? closeChat() : openChat(); });
  root.querySelector(".agx-x").addEventListener("click", closeChat);
  root.querySelector(".agx-teaser-x").addEventListener("click", function (e) { e.stopPropagation(); teaser.classList.remove("show"); });
  teaser.addEventListener("click", openChat);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && opened) closeChat(); });
  form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });

  setTimeout(function () { if (!opened) teaser.classList.add("show"); }, 2600);
})();
