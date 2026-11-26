/* AgentX site assistant. Rule-based widget, no LLM, never guesses.
   Knowledge base: only verified facts. Portfolio framed honestly.
   Ported from the tested TS engine with one hardening tweak:
   patterns of 3 chars or fewer need a word boundary ("hi" must not
   fire inside "this"). Contract: every input gets a reply. First miss
   clarifies with options, second miss hands over to a real human.
   Copy rule: short sentences, plain words, no em-dashes. */
(function () {
  "use strict";

  var CONTACT = {
    email: "info@agentxwebsolutions.com",
    phone: "+92 311 3013137",
    calendly: "https://calendly.com/wasia2053/30min"
  };
  var LINE_EN = "You can reach us directly. Email " + CONTACT.email + ". Phone or WhatsApp " + CONTACT.phone + ". Or book a free 30-minute strategy call here: " + CONTACT.calendly;
  var LINE_UR = "Aap hum se direct rabta kar sakte hain. Email " + CONTACT.email + ". Phone ya WhatsApp " + CONTACT.phone + ". Ya free 30-minute strategy call yahan book karen: " + CONTACT.calendly;

  var INTENTS = [
    { id: "greeting", patterns: ["hello", "hi", "hey", "salam", "assalam", "aoa", "adab", "good morning", "good evening", "good afternoon", "namaste"],
      en: "Hi there. I am the AgentX assistant. I can walk you through what we build and what it costs. I can also show you our work or book you a free call. What are you looking for?",
      ur: "Assalam-o-Alaikum. Main AgentX assistant hun. Main aap ko bata sakta hun ke hum kya banate hain or is ki cost kya hai. Hamara kaam bhi dikha sakta hun. Ya aap ke liye free call book kar sakta hun. Aap kya jaanna chahte hain?",
      chips: ["What does AgentX build?", "How much does it cost?", "Book a free call"] },
    { id: "thanks", patterns: ["thanks", "thank you", "shukriya", "great", "awesome", "nice", "perfect", "zabardast", "bohat acha", "bohot acha"],
      en: "Any time. If you are ready for the next step, the free strategy call is the best place to start. We will map out your website, chatbot and SEO in 30 minutes. Anything else?",
      ur: "Koi baat nahi. Agar aap agla step lena chahte hain to free strategy call se shuru karen. 30 minutes me hum aap ka website, chatbot or SEO plan bana denge. Or kuch chahiye?",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "bye", patterns: ["bye", "allah hafiz", "khuda hafiz", "goodbye", "see you", "phir milenge", "good night"],
      en: "Take care. When you are ready, book a free call here: " + CONTACT.calendly + ". Or email us any time at " + CONTACT.email + ".",
      ur: "Allah Hafiz. Jab ready hon to free call yahan book kar len: " + CONTACT.calendly + ". Ya kabhi bhi email kar den: " + CONTACT.email },
    { id: "how_are_you", patterns: ["how are you", "kaise ho", "kaisi ho", "kya haal", "how is it going", "whats up", "what's up", "kia haal"],
      en: "Doing well, thanks. I look after questions about AgentX. Services, prices, timelines. Or booking a free call. What can I do for you?",
      ur: "Main theek hun, shukriya. Main AgentX ke sawalon ke jawab deta hun. Services, prices, timeline. Ya free call ki booking. Aap ke liye kya kar sakta hun?",
      chips: ["What does AgentX build?", "How much does it cost?"] },
    { id: "services", patterns: ["what do you do", "services", "what does agentx", "kya karte", "kya banate", "offer", "kya kya", "what can you do", "kaam kya", "services kya"],
      en: "We build three things that work as one team. Websites that turn visitors into enquiries. A website chatbot that answers people straight away, day or night. And SEO that brings steady traffic from Google. We also do AI automation, voice agents and graphic design. Want prices or examples first?",
      ur: "Hum teen cheezen banate hain jo ek team ki tarah kaam karti hain. Websites jo visitors ko enquiries me badalti hain. Ek website chatbot jo din raat foran jawab deta hai. Or SEO jo Google se musalsal traffic lati hai. Is ke ilawa AI automation, voice agents or graphic design bhi karte hain. Pehle prices dekhne hain ya hamara kaam?",
      chips: ["How much does it cost?", "How fast can we start?", "Show me your work"] },
    { id: "website", patterns: ["website", "web design", "web development", "web site", "landing page", "ecommerce", "e-commerce", "online store", "site banana", "website banana", "website banani", "websit", "webste"],
      en: "We design and build websites that load fast and turn visitors into calls and enquiries. Plans are one-time. Basic is $749 for 5 pages. Premium is $999 for 10 pages. Advanced is $1,399 for up to 20 pages. Full details: https://agentxwebsolutions.com/pricing-web. Most clients add our chatbot too, so no visitor waits for a reply.",
      ur: "Hum esi websites banate hain jo tez load hoti hain or visitors ko calls or enquiries me badalti hain. Plans one-time hain. Basic $749 me 5 pages. Premium $999 me 10 pages. Advanced $1,399 me 20 pages tak. Poori tafseel: https://agentxwebsolutions.com/pricing-web. Aksar clients hamara chatbot bhi lagwa lete hain, taake koi visitor jawab ka intezaar na kare.",
      chips: ["How much does it cost?", "Show me your work"] },
    { id: "chatbot_service", patterns: ["chatbot", "ai bot", "bot", "chat bot", "assistant", "auto reply", "auto-reply"],
      en: "Our standard chatbot is a website FAQ and lead bot. It works just like this chat. It answers your common questions on the spot. It takes visitor details and emails the leads to you. And it hands people over to you when a human should step in. Plans run from $299 to $799 one-time. No monthly bill. No per-message charges. Details: https://agentxwebsolutions.com/pricing-chatbot. The Premium plan answers in English and Roman Urdu. Need something bigger, like a full AI bot? We quote that as a custom project.",
      ur: "Hamara standard chatbot ek website FAQ or lead bot hai. Bilkul is chat ki tarah kaam karta hai. Aap ke aam sawalon ka foran jawab deta hai. Visitor ki details le kar leads aap ko email kar deta hai. Or jab insaan ki zaroorat ho to visitor ko aap se mila deta hai. Plans $299 se $799 tak one-time hain. Koi monthly bill nahi. Koi per-message charges nahi. Tafseel: https://agentxwebsolutions.com/pricing-chatbot. Premium plan English or Roman Urdu dono me jawab deta hai. Kuch bara chahiye, jese full AI bot? Wo hum custom project ke tor par quote karte hain.",
      chips: ["How much does it cost?", "Book a free call"] },
    { id: "seo", patterns: ["seo", "rank", "google", "ranking", "search engine", "traffic", "top of google", "organic"],
      en: "SEO is the steady work that gets you found on Google. We start with a full audit and keyword research. Then we fix your pages and build links. You get a report every month. Plans are $300, $500 and $700 a month. Setup is included in all of them. Details: https://agentxwebsolutions.com/pricing-seo",
      ur: "SEO wo musalsal kaam hai jo aap ko Google par aage lata hai. Hum full audit or keyword research se shuru karte hain. Phir aap ke pages theek karte hain or links banate hain. Har month aap ko report milti hai. Plans $300, $500 or $700 per month hain. Setup sab me shamil hai. Tafseel: https://agentxwebsolutions.com/pricing-seo",
      chips: ["How much does it cost?", "Show me your work"] },
    { id: "automation", patterns: ["automation", "automate", "workflow", "zapier", "make.com", "integration"],
      en: "Automation connects your tools so the boring work runs itself. A new lead gets a reply on its own. Then a follow-up. Then a booked slot. It starts with an audit at $249, and that fee comes off any build. Builds run from $899 to $4,499 one-time. Details: https://agentxwebsolutions.com/pricing-automation. Tell us which task eats your time and we will scope it on a free call.",
      ur: "Automation aap ke tools ko jod deti hai taake bore wala kaam khud ho jaye. Naye lead ko reply khud chala jata hai. Phir follow-up. Phir slot book ho jata hai. Shuruaat audit se hoti hai, $249. Ye fee kisi bhi build me adjust ho jati hai. Builds $899 se $4,499 tak one-time hain. Tafseel: https://agentxwebsolutions.com/pricing-automation. Bas ye bataen ke konsa kaam aap ka sab se zyada time khata hai. Free call par hum is ka scope bana denge.",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "voice", patterns: ["voice", "voice agent", "phone agent", "call agent", "ai call", "ai phone"],
      en: "Our voice agents pick up your business calls when you cannot. They answer questions, take enquiries and book callers in. Plans are monthly. Basic is $179 a month plus a $399 setup. Premium is $279 a month plus $899 setup. Advanced is $449 a month plus $1,799 setup. Details: https://agentxwebsolutions.com/pricing-voice",
      ur: "Hamare voice agents aap ki business calls uthate hain jab aap busy hon. Ye sawalon ke jawab dete hain, enquiries lete hain or callers ko book karte hain. Plans monthly hain. Basic $179 per month, setup $399. Premium $279 per month, setup $899. Advanced $449 per month, setup $1,799. Tafseel: https://agentxwebsolutions.com/pricing-voice",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "design", patterns: ["graphic", "design", "logo", "branding", "brand", "poster", "flyer", "social posts", "instagram post"],
      en: "We design logos, social posts and brand visuals that match your website. A logo starts at $149. Full brand identity is $799. If you need design work every week, there is a subscription at $349 or $599 a month. Details: https://agentxwebsolutions.com/pricing-design",
      ur: "Hum logos, social posts or brand visuals design karte hain jo aap ki website se match karte hain. Logo $149 se shuru hota hai. Full brand identity $799 hai. Agar har hafte design ka kaam chahiye to subscription $349 ya $599 per month hai. Tafseel: https://agentxwebsolutions.com/pricing-design",
      chips: ["What does AgentX build?", "How much does it cost?"] },
    { id: "apps", patterns: ["mobile app", "app development", "android app", "ios app", "iphone app", "native app", "build apps", "make apps"],
      en: "Apps are not really our thing. We build websites, and a good website works on every phone anyway. If you need something app-like for your business, tell us on a free call. We will be honest about whether we are the right fit.",
      ur: "Apps hamara kaam nahi hai. Hum websites banate hain, or achi website har phone par wese hi chalti hai. Agar business ke liye app jesi koi cheez chahiye to free call par bataen. Hum saaf bata denge ke hum is ke liye sahi hen ya nahi.",
      chips: ["What does AgentX build?", "Book a free call"] },
    { id: "pricing_seo", patterns: ["seo price", "seo cost", "seo retainer", "seo kitna", "seo charges", "seo monthly", "seo ki price"],
      en: "SEO has three plans. Basic is $300 a month. Advanced is $500 a month. Custom is $700 a month. The right one depends on your pages and keywords. Setup is included. There is no separate setup fee. Full details: https://agentxwebsolutions.com/pricing-seo",
      ur: "SEO ke teen plans hain. Basic $300 per month. Advanced $500 per month. Custom $700 per month. Konsa plan sahi hai, ye aap ke pages or keywords par depend karta hai. Setup shamil hai. Alag se koi setup fee nahi. Poori tafseel: https://agentxwebsolutions.com/pricing-seo",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_chatbot", patterns: ["chatbot price", "chatbot cost", "chatbot kitna", "chatbot kitne", "chatbot charges", "chatbot monthly", "bot price", "bot cost", "chatbot ki price"],
      en: "Chatbot plans are one-time. Basic is $299. Premium is $499. Advanced is $799. There is no monthly charge and no per-message bill. If you want us to keep your questions and answers updated, there is an optional update plan at $39 a month. Full details: https://agentxwebsolutions.com/pricing-chatbot",
      ur: "Chatbot plans one-time hain. Basic $299. Premium $499. Advanced $799. Koi monthly charge nahi. Koi per-message bill nahi. Agar aap chahte hain ke hum aap ke sawal jawab update rakhte rahen to ek optional update plan hai, $39 per month. Poori tafseel: https://agentxwebsolutions.com/pricing-chatbot",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_web", patterns: ["website price", "website cost", "web price", "website kitna", "website charges", "web development price", "site price", "website package", "web design price", "website ki price", "website ka price", "website ki cost", "webste price", "web ki price"],
      en: "Website plans are one-time. Basic is $749 for 5 pages. Premium is $999 for 10 pages, with a domain and a year of hosting included. Advanced is $1,399 for up to 20 pages. Online stores are quoted per project. Full details: https://agentxwebsolutions.com/pricing-web",
      ur: "Website plans one-time hain. Basic $749 me 5 pages. Premium $999 me 10 pages, domain or ek saal ki hosting shamil. Advanced $1,399 me 20 pages tak. Online stores har project ke hisaab se quote hote hain. Poori tafseel: https://agentxwebsolutions.com/pricing-web",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_automation", patterns: ["automation price", "automation cost", "automation kitna", "automate price", "workflow price", "audit price", "automation charges"],
      en: "It starts with an audit at $249. That fee is fully credited toward any build. Builds are one-time. Basic is $899 for one workflow. Premium is $2,199 for up to 3 workflows. Advanced is $4,499 for multi-system work. There is an optional care retainer at $249 a month. Full details: https://agentxwebsolutions.com/pricing-automation",
      ur: "Shuruaat audit se hoti hai, $249. Ye fee kisi bhi build me poori adjust ho jati hai. Builds one-time hain. Basic $899 me ek workflow. Premium $2,199 me 3 workflows tak. Advanced $4,499 multi-system kaam ke liye. Ek optional care retainer bhi hai, $249 per month. Poori tafseel: https://agentxwebsolutions.com/pricing-automation",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_voice", patterns: ["voice price", "voice cost", "voice agent price", "voice kitna", "voice kitne", "voice agent kitne", "call agent price", "voice charges", "phone agent price"],
      en: "Voice agents are billed monthly. Basic is $179 a month with 500 minutes included. Setup is $399. Premium is $279 a month with 1,500 minutes. Setup is $899. Advanced is $449 a month with 3,000 minutes. Setup is $1,799. Extra minutes cost $0.25 each. Full details: https://agentxwebsolutions.com/pricing-voice",
      ur: "Voice agents monthly bill hote hain. Basic $179 per month, 500 minutes shamil. Setup $399. Premium $279 per month, 1,500 minutes shamil. Setup $899. Advanced $449 per month, 3,000 minutes shamil. Setup $1,799. Extra minutes $0.25 each. Poori tafseel: https://agentxwebsolutions.com/pricing-voice",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "pricing_design", patterns: ["logo price", "logo cost", "logo kitna", "design price", "design cost", "branding price", "subscription price", "logo charges"],
      en: "Logo packages are one-time. Basic Logo is $149. Premium Logo is $349. Full Brand Identity is $799. Proper design files are included in all of them. Need design every week? The subscription is $349 or $599 a month. Full details: https://agentxwebsolutions.com/pricing-design",
      ur: "Logo packages one-time hain. Basic Logo $149. Premium Logo $349. Full Brand Identity $799. Sab me proper design files shamil hain. Har hafte design chahiye? Subscription $349 ya $599 per month hai. Poori tafseel: https://agentxwebsolutions.com/pricing-design",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "combo", patterns: ["launch package", "combo", "bundle", "package deal", "three in one", "3 in 1", "website chatbot seo", "launch offer"],
      en: "The Launch Package is $1,199 one-time. You get a 5-page website worth $749. A website FAQ and lead chatbot worth $299. Plus SEO setup and the first month of Basic SEO, worth $300. The first month of the chatbot update plan is free too. Bought separately, all of that comes to $1,387. So you save $188. After month one, SEO can carry on at $300 a month. Details: https://agentxwebsolutions.com/pricing",
      ur: "Launch Package $1,199 one-time hai. Is me 5-page website milti hai, qeemat $749. Ek website FAQ or lead chatbot, qeemat $299. Sath me SEO setup or Basic SEO ka pehla month, qeemat $300. Chatbot update plan ka pehla month bhi free hai. Ye sab alag alag len to $1,387 banta hai. Yani $188 ki bachat. Pehle month ke baad SEO $300 per month par jaari reh sakta hai. Tafseel: https://agentxwebsolutions.com/pricing",
      chips: ["Book a free call", "How fast can we start?"] },
    { id: "pricing_page", patterns: ["pricing page", "pricing plans", "price list", "all the plans", "see plans", "plans page"],
      en: "Here is the full pricing page: https://agentxwebsolutions.com/pricing. Every plan is on it, with what is included. Websites start at $749. Chatbots at $299. SEO at $300 a month. The Launch Package is $1,199.",
      ur: "Ye rahi poori pricing page: https://agentxwebsolutions.com/pricing. Har plan wahan hai, sath me ye bhi ke us me kya shamil hai. Websites $749 se shuru. Chatbots $299 se. SEO $300 per month se. Launch Package $1,199 ka hai.",
      chips: ["Book a free call", "What does AgentX build?"] },
    { id: "pricing", patterns: ["price", "cost", "kitna", "kitne", "paisa", "charges", "charge", "fee", "fees", "package", "pricing", "how much", "rate", "rates"],
      en: "All our prices are published here: https://agentxwebsolutions.com/pricing. Websites run $749 to $1,399 one-time. Chatbots $299 to $799 one-time. SEO is $300 to $700 a month. Automation builds start at $899. Voice agents start at $179 a month plus setup. Logos start at $149. The Launch Package bundles website, chatbot and the first month of SEO for $1,199. No hourly billing. No surprises later.",
      ur: "Hamari saari prices yahan published hain: https://agentxwebsolutions.com/pricing. Websites $749 se $1,399 tak one-time. Chatbots $299 se $799 tak one-time. SEO $300 se $700 per month. Automation builds $899 se shuru. Voice agents $179 per month se, setup alag. Logos $149 se. Launch Package me website, chatbot or SEO ka pehla month $1,199 me mil jata hai. Koi hourly billing nahi. Baad me koi surprise nahi.",
      chips: ["Book a free call", "How fast can we start?"] },
    { id: "payment", patterns: ["payment", "pay", "payment terms", "installment", "installments", "deposit", "advance payment", "pay kaise", "payment kaise", "how to pay", "pay karna", "paisa kaise"],
      en: "Simple and clear. Projects run on milestones. 50% to start. 25% after the development stage. The last 25% before release. Monthly plans like SEO are paid monthly in advance. Work starts once your payment clears. Full terms: https://agentxwebsolutions.com/terms",
      ur: "Seedha sa hisaab hai. Projects milestones par chalte hain. 50% shuru me. 25% development stage ke baad. Aakhri 25% release se pehle. SEO jese monthly plans har month advance me hote hain. Payment clear hote hi kaam shuru ho jata hai. Poori terms: https://agentxwebsolutions.com/terms",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "timeline", patterns: ["how long", "kitna time", "kab tak", "timeline", "delivery", "how fast", "kitni jaldi", "when", "start", "shuru"],
      en: "Most projects kick off within a week of the free strategy call. Your exact delivery date comes in writing with your fixed quote. You see it before we start, not after. Book the free call and we will map your timeline out.",
      ur: "Aksar projects free strategy call ke ek hafte ke andar shuru ho jate hain. Aap ki exact delivery date fixed quote ke sath likh kar milti hai. Shuru karne se pehle milti hai, baad me nahi. Free call book karen, hum aap ki timeline bana denge.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "process", patterns: ["process", "how it works", "how does it work", "how does this work", "how do you work", "kaise kaam", "kaise hoga", "steps", "procedure", "kaam kaise", "workflow kaise", "next step"],
      en: "It goes like this. First, book a free 30-minute strategy call. Then we send a fixed quote with the scope and timeline in writing. No hourly billing. Work usually starts within a week. You review everything before launch. And we stay available for support after. Start here: " + CONTACT.calendly,
      ur: "Tareeqa ye hai. Pehle free 30-minute strategy call book karen. Phir hum fixed quote bhejte hain. Scope or timeline us me likha hota hai. Koi hourly billing nahi. Kaam aam tor par ek hafte ke andar shuru ho jata hai. Launch se pehle aap sab review karte hain. Or launch ke baad bhi hum support ke liye hazir rehte hain. Shuruaat yahan se karen: " + CONTACT.calendly,
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "portfolio", patterns: ["portfolio", "work", "projects", "kaam", "dikhao", "examples", "clients", "previous", "past work", "show me"],
      en: "Here is the honest picture. We have worked on SEO and development for six live projects. Pixiest Photography. The Bean Guys. DM Power Construction. Tainted Flesh Body Art. Estelles Lighting. And Black Eden 420. Those are AnaxDesign projects where AgentX handled the SEO and development side. Our own full design and build is Rizvi and Rajput Law Associates at rrlegal.pk. It is live now. Happy to walk you through any of it on a free call.",
      ur: "Sach ye hai. Hum ne che live projects par SEO or development ka kaam kiya hai. Pixiest Photography. The Bean Guys. DM Power Construction. Tainted Flesh Body Art. Estelles Lighting. Or Black Eden 420. Ye AnaxDesign ke projects hain jahan AgentX ne SEO or development sambhala. Hamari apni poori design or build Rizvi and Rajput Law Associates hai, rrlegal.pk par. Wo ab live hai. Free call par in me se kisi ki bhi tafseel bata denge.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "team", patterns: ["team", "wasi", "ali", "founder", "kon ho", "kaun ho", "who are you", "about you", "owners", "members"],
      en: "Two founders run AgentX. Wasi Ahmed leads development. Ali Ahmed leads SEO. When you work with us, you talk to the people doing the work. No account managers in between.",
      ur: "AgentX do founders chalate hain. Wasi Ahmed development lead karte hain. Ali Ahmed SEO lead karte hain. Hamare sath kaam karen to baat unhi se hoti hai jo kaam kar rahe hain. Beech me koi account manager nahi.",
      chips: ["Book a free call", "Show me your work"] },
    { id: "contact", patterns: ["contact", "call", "email", "phone", "number", "rabta", "whatsapp", "reach", "talk to", "baat karni", "mail"],
      en: LINE_EN + " Want to talk it through first? Book the call and we will come prepared.",
      ur: LINE_UR + " Pehle baat kar ke tasalli karni hai? Call book kar len. Hum tayyari ke sath aayenge.",
      chips: ["Book a free call"] },
    { id: "social", patterns: ["facebook", "instagram", "linkedin", "social media", "socials", "twitter"],
      en: "We keep things simple. The fastest way to reach us is email or WhatsApp. Email " + CONTACT.email + ". WhatsApp " + CONTACT.phone + ". Or book a free call here: " + CONTACT.calendly,
      ur: "Hum cheezon ko simple rakhte hain. Hum tak pohnchne ka sab se tez tareeqa email ya WhatsApp hai. Email " + CONTACT.email + ". WhatsApp " + CONTACT.phone + ". Ya free call yahan book karen: " + CONTACT.calendly,
      chips: ["Book a free call"] },
    { id: "booking", patterns: ["book", "meeting", "demo", "schedule", "appointment", "strategy call", "free call", "consultation", "call book"],
      en: "Book your free 30-minute strategy call here: " + CONTACT.calendly + ". We will sketch your website, chatbot and SEO roadmap on the call. No pressure and no obligation. Rather write first? Email " + CONTACT.email + ".",
      ur: "Apni free 30-minute strategy call yahan book karen: " + CONTACT.calendly + ". Call par hum aap ka website, chatbot or SEO roadmap bana denge. Koi pressure nahi, koi pabandi nahi. Pehle likhna zyada asaan lage to email karen: " + CONTACT.email,
      chips: ["How much does it cost?", "What does AgentX build?"] },
    { id: "complaint", patterns: ["complaint", "complain", "angry", "not happy", "bad service", "scam", "fraud", "waste of money", "disappointed", "useless", "worst", "terrible", "pathetic", "bekar", "bakwas", "shikayat", "gussa", "naraz", "kharab service"],
      en: "I am sorry to hear that. You should not have to chase anyone here. Please message Wasi or Ali directly and they will pick this up themselves. Email " + CONTACT.email + " or WhatsApp " + CONTACT.phone + ". A short note on what went wrong helps them fix it fast.",
      ur: "Ye sun kar afsos hua. Aap ko yahan kisi ke peeche nahi bhagna chahiye. Wasi ya Ali ko direct message karen. Wo khud isay dekhenge. Email " + CONTACT.email + " ya WhatsApp " + CONTACT.phone + ". Bas ye bata den ke masla kya hua. Wo isay jald theek kar denge.",
      chips: ["Book a free call"] },
    { id: "human", patterns: ["human", "agent", "banda", "real person", "person", "someone real", "insan", "operator", "support person", "talk to human", "talk to a human", "speak to a human", "insan se baat", "bande se baat", "asli banda", "human se baat"],
      en: "Of course. A real person it is. Email " + CONTACT.email + ". Call or WhatsApp " + CONTACT.phone + ". Or book a free call and you will speak with Wasi or Ali directly: " + CONTACT.calendly,
      ur: "Bilkul. Asli banda hi sahi. Email " + CONTACT.email + ". Call ya WhatsApp " + CONTACT.phone + ". Ya free call book kar len. Wahan aap ki baat seedha Wasi ya Ali se hogi: " + CONTACT.calendly },
    { id: "location", patterns: ["where", "kahan", "location", "office", "based", "country", "city", "kis mulk", "kis city", "clients in", "work with clients", "international clients", "outside pakistan", "karachi", "pakistan", "from pakistan"],
      en: "We are based in Karachi, Pakistan. Our clients are all over the world though. Everything is delivered remotely. Your strategy call happens on video. Book one here: " + CONTACT.calendly,
      ur: "Hum Karachi, Pakistan se hain. Lekin hamare clients duniya bhar me hain. Sab kuch remotely deliver hota hai. Strategy call video par hoti hai. Yahan book karen: " + CONTACT.calendly,
      chips: ["Book a free call"] },
    { id: "hours", patterns: ["hours", "opening hours", "open hours", "working hours", "office hours", "timing", "timings", "kab khula"],
      en: "We work remotely, so there is no office timing to catch us by. Email and WhatsApp work best. We reply fast. For a proper chat, book a free call and pick a time that suits you: " + CONTACT.calendly,
      ur: "Hum remotely kaam karte hain, is liye koi office timing nahi hai. Email or WhatsApp sab se behtar rahega. Jawab jald mil jata hai. Theek se baat karni ho to free call book kar len. Apni marzi ka time chun len: " + CONTACT.calendly,
      chips: ["Book a free call"] },
    { id: "why", patterns: ["why agentx", "why you", "kyun", "best", "faida", "benefit", "advantage", "different", "choose", "kyu"],
      en: "Three simple reasons. One team builds your website, chatbot and SEO together. Nothing gets lost between agencies. Every page is built to turn visitors into customers, not just to look nice. And you get a fixed quote with no hourly billing. You also talk straight to the builders. Want to see the work first? Ask on a free call.",
      ur: "Teen seedhi wajah hain. Ek hi team aap ki website, chatbot or SEO ek sath banati hai. Kuch agencies ke beech gum nahi hota. Har page visitors ko customers banane ke liye banta hai, sirf acha dikhne ke liye nahi. Or aap ko fixed quote milta hai, koi hourly billing nahi. Baat bhi seedha builders se hoti hai. Pehle kaam dekhna hai? Free call par pooch len.",
      chips: ["Show me your work", "Book a free call"] },
    { id: "discount", patterns: ["discount", "sasta", "cheap", "cheaper", "negotiate", "kam karo", "offer", "deal", "sale"],
      en: "We price things honestly from the start. So there are no inflated prices and no fake discounts. Every project gets a fixed quote after a free call. It covers exactly what you need and nothing extra. The best value is the Launch Package at $1,199. Book the free call and we will quote your exact scope.",
      ur: "Hum shuru se hi imandari se price rakhte hain. Is liye na barhi hui qeematen hain, na fake discounts. Har project ko free call ke baad fixed quote milta hai. Us me sirf wahi hota hai jo aap ko chahiye. Sab se achi value Launch Package ki hai, $1,199 me. Free call book karen, hum aap ke exact scope ka quote de denge.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "guarantee", patterns: ["guarantee", "refund", "warranty", "promise", "surety", "sure", "pakka"],
      en: "Here is what we put in writing. A fixed quote. A clear scope. And a timeline before we start. No hourly billing and no surprise charges. What we will not do is promise fake numbers. Nobody can honestly guarantee the top spot on Google or an exact sales figure. We stand behind the work, the process and the support.",
      ur: "Ye cheezen hum likh kar dete hain. Ek fixed quote. Ek saaf scope. Or shuru karne se pehle ek timeline. Koi hourly billing nahi, koi surprise charges nahi. Jo hum nahi karte wo fake numbers ka wada hai. Koi imandari se Google par pehli position ya exact sales ki guarantee nahi de sakta. Hum apne kaam, process or support ke peeche khare hain.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "legal", patterns: ["terms", "privacy", "privacy policy", "terms of service", "terms and conditions"],
      en: "You can read both here. Terms: https://agentxwebsolutions.com/terms. Privacy Policy: https://agentxwebsolutions.com/privacy. The short version is simple. Quotes stay valid for 30 days. Projects run on 50/25/25 milestones. You own your deliverables once the project is paid in full.",
      ur: "Dono yahan parh sakte hain. Terms: https://agentxwebsolutions.com/terms. Privacy Policy: https://agentxwebsolutions.com/privacy. Short version simple hai. Quotes 30 din valid rehte hain. Projects 50/25/25 milestones par chalte hain. Project ki poori payment ke baad deliverables aap ke ho jate hain.",
      chips: ["Book a free call"] },
    { id: "care", patterns: ["support", "after launch", "maintenance", "care plan", "update plan", "aftercare", "support chahiye", "after support"],
      en: "Yes. We stay with you after launch. Websites have an optional care plan at $49 a month. Chatbots have an optional update plan at $39 a month. Automations have a care retainer at $249 a month. All of them are optional. Your site and bot keep working without one.",
      ur: "Ji bilkul. Launch ke baad bhi hum saath rehte hain. Websites ke liye optional care plan $49 per month hai. Chatbots ke liye optional update plan $39 per month. Automations ke liye care retainer $249 per month. Ye sab optional hain. In ke baghair bhi aap ki site or bot chalte rahenge.",
      chips: ["Book a free call", "How much does it cost?"] },
    { id: "language", patterns: ["language", "zuban", "urdu", "english", "arabic", "hindi", "kis zuban", "which language"],
      en: "I can chat in English and Roman Urdu. Write whichever way suits you. The chatbots we build are set up for your customers too, language and tone included.",
      ur: "Main English or Roman Urdu dono me baat kar sakta hun. Jis tarah aap ko asaan lage, wese likhen. Jo chatbots hum banate hain wo aap ke customers ke hisaab se set hote hain. Language or tone samet.",
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
        ? "Message khaali aya hai. Aap kya jaanna chahte hain? Services, pricing, timeline. Ya free call ki booking."
        : "That message came through empty. What would you like to know? Services, pricing, timelines. Or booking a free call.",
        chips: STARTER_CHIPS, kind: "fallback" };
    }
    var b = bestIntent(normalized);
    if (b.index >= 0 && b.score > 0) {
      var intent = INTENTS[b.index];
      return { text: urdu && intent.ur ? intent.ur : intent.en, chips: intent.chips || [], kind: "answer" };
    }
    if (missCount + 1 <= 1) {
      return { text: urdu
        ? "Main aap ko sahi jawab dena chahta hun. Kya isay doosre lafzon me keh sakte hain? Filhal main in cheezon me madad kar sakta hun. Services, pricing, timeline, hamara purana kaam. Ya free call ki booking."
        : "I want to get this right. Could you say it another way? In the meantime, I can help with services, pricing, timelines, our past work, or booking a free call.",
        chips: ["What does AgentX build?", "How much does it cost?", "Book a free call"], kind: "fallback" };
    }
    return { text: urdu
      ? "Is par main andaza nahi lagana chahta. Asli banda aap ko exact jawab zyada jald de dega. " + LINE_UR
      : "I do not want to guess at this one. A real person will give you the exact answer much faster. " + LINE_EN,
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
        '<div class="agx-ht"><b>AgentX</b><i>Ask us anything. Replies are instant.</i></div>' +
        '<button class="agx-x" aria-label="Close chat">' + X + '</button></div>' +
      '<div class="agx-msgs"></div>' +
      '<div class="agx-chips"></div>' +
      '<form class="agx-bar"><input class="agx-in" type="text" placeholder="Type your message..." autocomplete="off" aria-label="Type your message">' +
        '<button class="agx-send" type="submit" aria-label="Send message">' + SEND + '</button></form>' +
    '</div>';
  document.body.appendChild(root);

  var markHost = root.querySelector(".agx-mark");
  /* Brand mark drawn fresh (same geometry as the site logo). Never clone
     the loader's mark. GSAP writes inline blur/opacity onto it. */
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
