/**
 * AgentX chatbot knowledge base — every answer uses ONLY verified,
 * real facts. No fake testimonials, no invented stats, no fake
 * guarantees, and the portfolio is always framed honestly:
 * "worked on — SEO + development", projects by AnaxDesign.
 *
 * Real contact details (do not change without Wasi's say-so):
 *   Email:   wasia2053@gmail.com
 *   Phone:   +92 311 3013137
 *   Booking: https://calendly.com/wasia2053/30min (free 30-min call)
 *
 * Real pricing (from the agreed offer):
 *   Website + basic on-page SEO + AI chatbot bundle: $1,500–$2,500 one-time
 *   SEO monthly retainer: $300–$800/month
 *   Chatbot monthly care plan: $50–$150/month
 *   Every project gets a FIXED quote after the free call — no hourly billing.
 */

export const CONTACT = {
  email: 'wasia2053@gmail.com',
  phone: '+92 311 3013137',
  calendly: 'https://calendly.com/wasia2053/30min',
};

export interface Intent {
  id: string;
  /** Lowercase substrings to match after normalisation. Score = matched count. */
  patterns: string[];
  en: string;
  /** Roman Urdu version — used when the visitor writes in Roman Urdu. */
  ur?: string;
  /** Follow-up chips shown after this answer. */
  chips?: string[];
}

export const CONTACT_LINE_EN = `You can reach us directly — email ${CONTACT.email}, phone/WhatsApp ${CONTACT.phone}, or book a free 30-minute strategy call here: ${CONTACT.calendly}`;
export const CONTACT_LINE_UR = `Aap hum se direct rabta kar sakte hain — email ${CONTACT.email}, phone/WhatsApp ${CONTACT.phone}, ya free 30-minute strategy call book karen: ${CONTACT.calendly}`;

export const INTENTS: Intent[] = [
  {
    id: 'greeting',
    patterns: ['hello', 'hi', 'hey', 'salam', 'assalam', 'aoa', 'adab', 'good morning', 'good evening', 'good afternoon', 'namaste'],
    en: "Hi! I'm the AgentX assistant. I can tell you what we build, what it costs, how fast we start, and show you our work — or book you a free strategy call. What would you like to know?",
    ur: 'Assalam-o-Alaikum! Main AgentX assistant hun. Main bata sakta hun ke hum kya banate hain, kitna kharcha aata hai, kitni jaldi shuru kar sakte hain, aur hamara kaam dikha sakta hun — ya aap ke liye free strategy call book kar sakta hun. Kya jaanna chahenge?',
    chips: ['What does AgentX build?', 'How much does it cost?', 'Book a free call'],
  },
  {
    id: 'thanks',
    patterns: ['thanks', 'thank you', 'shukriya', 'great', 'awesome', 'nice', 'perfect', 'zabardast', 'bohat acha', 'bohot acha'],
    en: "You're welcome! If you want to take the next step, book a free 30-minute strategy call and we'll map out your website, chatbot, and SEO plan. Anything else I can help with?",
    ur: 'Khush aamdeed! Agar agla step lena hai to free 30-minute strategy call book karen — hum aap ka website, chatbot aur SEO plan bana denge. Aur kuch madad chahiye?',
    chips: ['Book a free call', 'What does AgentX build?'],
  },
  {
    id: 'bye',
    patterns: ['bye', 'allah hafiz', 'khuda hafiz', 'goodbye', 'see you', 'phir milenge', 'good night'],
    en: "Goodbye! When you're ready, the free strategy call is here: " + CONTACT.calendly + " — or email us anytime at " + CONTACT.email + ". Have a good one!",
    ur: 'Allah Hafiz! Jab ready hon to free strategy call yahan hai: ' + CONTACT.calendly + ' — ya kabhi bhi email karen: ' + CONTACT.email + '.',
  },
  {
    id: 'how_are_you',
    patterns: ['how are you', 'kaise ho', 'kaisi ho', 'kya haal', 'how is it going', 'whats up', "what's up", 'kia haal'],
    en: "I'm doing well, thanks for asking! I'm here to help with anything about AgentX — our services, pricing, timeline, or booking a free call. What can I do for you?",
    ur: 'Main theek hun, shukriya! Main AgentX ke baare me kisi bhi cheez me madad kar sakta hun — services, pricing, timeline, ya free call book karna. Kya kar sakta hun aap ke liye?',
    chips: ['What does AgentX build?', 'How much does it cost?'],
  },
  {
    id: 'services',
    patterns: ['what do you do', 'services', 'what does agentx', 'kya karte', 'kya banate', 'offer', 'kya kya', 'what can you do', 'kaam kya', 'services kya'],
    en: 'AgentX is a one-team bundle: (1) Website Design & Development — fast, modern websites built to turn visitors into enquiries. (2) AI Chatbot — trained on your business, answers every visitor instantly, day and night. (3) SEO — data-driven rankings that bring steady traffic. Plus supporting services: AI Automation, Voice Agents, and Graphic Designing.',
    ur: 'AgentX ek hi team ka bundle hai: (1) Website Design & Development — tez, modern websites jo visitors ko enquiries me badalti hain. (2) AI Chatbot — aap ke business par trained, har visitor ko foran jawab, din raat. (3) SEO — data-driven rankings jo musalsal traffic laati hain. Is ke saath: AI Automation, Voice Agents aur Graphic Designing bhi.',
    chips: ['How much does it cost?', 'How fast can we start?', 'Show me your work'],
  },
  {
    id: 'website',
    patterns: ['website', 'web design', 'web development', 'web site', 'landing page', 'ecommerce', 'e-commerce', 'online store', 'site banana'],
    en: 'We design and develop high-performance websites engineered to convert — fast, modern, and built to scale. Every website comes with basic on-page SEO setup, and you can add our AI chatbot so no visitor ever waits for an answer. Most bundles kick off within a week of your free strategy call.',
    ur: 'Hum high-performance websites design aur develop karte hain jo convert karne ke liye bani hoti hain — tez, modern aur scale hone wali. Har website ke saath basic on-page SEO setup aata hai, aur aap hamara AI chatbot bhi laga sakte hain taake koi visitor jawab ka wait na kare. Aksar bundles free strategy call ke ek hafte ke andar shuru ho jaate hain.',
    chips: ['How much does it cost?', 'Show me your work'],
  },
  {
    id: 'chatbot_service',
    patterns: ['chatbot', 'ai bot', 'bot', 'chat bot', 'assistant', 'auto reply', 'auto-reply'],
    en: 'Our AI chatbots are trained on YOUR business — your services, prices, and FAQs — so they answer every visitor instantly, day and night, and never miss a lead. That is the same kind of chatbot we sell: if your business needs one, this chat is a live preview of how it works. Chatbot care plans are $50–$150/month.',
    ur: 'Hamare AI chatbots AAP ke business par trained hote hain — aap ki services, prices aur FAQs — taake wo har visitor ko foran jawab dein, din raat, aur koi lead miss na ho. Yehi wohi chatbot hai jo hum bechte hain: agar aap ke business ko chahiye to ye chat us ka live preview hai. Chatbot care plans $50–$150/month hain.',
    chips: ['How much does it cost?', 'Book a free call'],
  },
  {
    id: 'seo',
    patterns: ['seo', 'rank', 'google', 'ranking', 'search engine', 'traffic', 'top of google', 'organic'],
    en: 'Our SEO is data-driven work that pushes your business to the top of Google — and keeps it there: keyword research, on-page optimisation, content structure, and local SEO. Every website bundle includes basic on-page SEO setup. A dedicated SEO monthly retainer is $300–$800/month, scoped to your market.',
    ur: 'Hamara SEO data-driven kaam hai jo aap ke business ko Google ke top par le jaata hai — aur wahan rakhta hai: keyword research, on-page optimisation, content structure aur local SEO. Har website bundle me basic on-page SEO setup shamil hai. Dedicated SEO monthly retainer $300–$800/month hai, aap ke market ke mutabiq.',
    chips: ['How much does it cost?', 'Show me your work'],
  },
  {
    id: 'automation',
    patterns: ['automation', 'automate', 'workflow', 'zapier', 'make.com', 'integration'],
    en: 'Our AI Automation service connects your tools and removes repetitive work — for example, a new lead automatically getting a reply, a follow-up, and a booked slot. Tell us which manual task eats your time and we will scope it on your free strategy call.',
    ur: 'Hamari AI Automation service aap ke tools ko jorti hai aur repetitive kaam khatam karti hai — jaise naye lead ko foran reply, follow-up aur booked slot. Bataein kaunsa manual kaam aap ka waqt khata hai, hum free strategy call par us ka scope bata denge.',
    chips: ['Book a free call', 'What does AgentX build?'],
  },
  {
    id: 'voice',
    patterns: ['voice', 'voice agent', 'phone agent', 'call agent', 'ai call', 'ai phone'],
    en: 'Our Voice Agents answer phone calls for your business with natural, helpful conversations — taking enquiries, answering FAQs, and booking callers in. If phone enquiries matter to you, bring it up on your free strategy call and we will scope it.',
    ur: 'Hamare Voice Agents aap ke business ke liye phone calls ka jawab dete hain — natural aur helpful guftagu ke saath, enquiries lena, FAQs ka jawab aur callers ko book karna. Agar phone enquiries aap ke liye zaroori hain to free strategy call par zikr karen, hum scope bata denge.',
    chips: ['Book a free call', 'What does AgentX build?'],
  },
  {
    id: 'design',
    patterns: ['graphic', 'design', 'logo', 'branding', 'brand', 'poster', 'flyer'],
    en: 'Our Graphic Designing service covers the visuals your brand needs — logos, social posts, and marketing material that match your website. It works best as a supporting service alongside a website, chatbot, or SEO bundle.',
    ur: 'Hamari Graphic Designing service aap ke brand ke liye visuals banati hai — logos, social posts aur marketing material jo aap ki website se match kare. Ye website, chatbot ya SEO bundle ke saath supporting service ke tor par behtareen kaam karti hai.',
    chips: ['What does AgentX build?', 'How much does it cost?'],
  },
  {
    id: 'pricing_seo',
    patterns: ['seo price', 'seo cost', 'seo retainer', 'seo kitna', 'seo charges', 'seo monthly', 'seo ki price'],
    en: 'A dedicated SEO monthly retainer is $300–$800/month, depending on your market and competition. Basic on-page SEO setup is already included in the website bundle ($1,500–$2,500 one-time). For an exact figure, book a free strategy call and you will get a fixed quote.',
    ur: 'Dedicated SEO monthly retainer $300–$800/month hai, aap ke market aur competition ke mutabiq. Basic on-page SEO setup website bundle ($1,500–$2,500 one-time) me pehle se shamil hai. Exact figure ke liye free strategy call book karen, aap ko fixed quote mil jayega.',
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'pricing_chatbot',
    patterns: ['chatbot price', 'chatbot cost', 'chatbot kitna', 'chatbot charges', 'chatbot monthly', 'bot price', 'bot cost'],
    en: 'A chatbot care plan is $50–$150/month. If you want a chatbot as part of the full bundle — website + basic on-page SEO + AI chatbot — that bundle is $1,500–$2,500 one-time. Every project gets a fixed quote after your free strategy call.',
    ur: 'Chatbot care plan $50–$150/month hai. Agar chatbot full bundle ke saath chahiye — website + basic on-page SEO + AI chatbot — to wo bundle $1,500–$2,500 one-time hai. Har project ko free strategy call ke baad fixed quote milta hai.',
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'pricing',
    patterns: ['price', 'cost', 'kitna', 'kitne', 'paisa', 'charges', 'charge', 'fee', 'fees', 'package', 'pricing', 'how much', 'rate', 'rates'],
    en: 'Our main bundle — a custom website + basic on-page SEO setup + AI chatbot — is $1,500–$2,500 one-time. Separately: SEO retainer $300–$800/month, chatbot care plan $50–$150/month. Every project gets a fixed quote after a free strategy call — no hourly billing, no surprises.',
    ur: 'Hamara main bundle — custom website + basic on-page SEO setup + AI chatbot — $1,500–$2,500 one-time hai. Alag se: SEO retainer $300–$800/month, chatbot care plan $50–$150/month. Har project ko free strategy call ke baad fixed quote milta hai — no hourly billing, no surprises.',
    chips: ['Book a free call', 'How fast can we start?'],
  },
  {
    id: 'timeline',
    patterns: ['how long', 'kitna time', 'kab tak', 'timeline', 'delivery', 'how fast', 'kitni jaldi', 'when', 'start', 'shuru'],
    en: 'Most bundles kick off within a week of your free strategy call. The exact delivery timeline depends on your scope — you will get it in writing with your fixed quote, before we start. Book the free call and we will map it out.',
    ur: 'Aksar bundles free strategy call ke ek hafte ke andar shuru ho jaate hain. Exact delivery timeline aap ke scope par depend karta hai — wo aap ko fixed quote ke saath likh kar mil jayega, shuru karne se pehle. Free call book karen aur hum timeline bana denge.',
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'process',
    patterns: ['process', 'how it works', 'how does it work', 'how does this work', 'how do you work', 'kaise kaam', 'kaise hoga', 'steps', 'procedure', 'kaam kaise', 'workflow kaise', 'next step'],
    en: 'Simple process: (1) Book a free 30-minute strategy call. (2) We send you a fixed quote with scope and timeline — no hourly billing. (3) We kick off, usually within a week. (4) You review, we launch, and we stay on for support and care plans. Step one is here: ' + CONTACT.calendly,
    ur: 'Simple process: (1) Free 30-minute strategy call book karen. (2) Hum fixed quote bhejenge — scope aur timeline ke saath, no hourly billing. (3) Kaam shuru, aam tor par ek hafte ke andar. (4) Aap review karen, hum launch karen, aur support ke liye saath rahen. Pehla step yahan hai: ' + CONTACT.calendly,
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'portfolio',
    patterns: ['portfolio', 'work', 'projects', 'kaam', 'dikhao', 'examples', 'clients', 'previous', 'past work', 'show me'],
    en: 'Projects we have worked on (SEO + development) — all live: Pixiest Photography, The Bean Guys, DM Power Construction, Tainted Flesh Body Art, Estelles Lighting, and Black Eden 420. These are projects by AnaxDesign; AgentX handled the SEO + development work on them. More projects are in progress — ask us about the latest on your free call.',
    ur: 'Projects jin par hum ne kaam kiya hai (SEO + development) — sab live: Pixiest Photography, The Bean Guys, DM Power Construction, Tainted Flesh Body Art, Estelles Lighting aur Black Eden 420. Ye AnaxDesign ke projects hain; AgentX ne in par SEO + development ka kaam kiya. Mazeed projects in progress hain — free call par latest pooch sakte hain.',
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'team',
    patterns: ['team', 'wasi', 'ali', 'founder', 'kon ho', 'kaun ho', 'who are you', 'about you', 'owners', 'members'],
    en: 'AgentX is run by two founders: Wasi Ahmed leads development, and Ali Ahmed leads SEO. When you work with us, you talk directly to the people who build your website, chatbot, and rankings — no account-manager telephone game.',
    ur: 'AgentX do founders chalate hain: Wasi Ahmed development lead karte hain, aur Ali Ahmed SEO lead karte hain. Jab aap hamare saath kaam karte hain to seedha unhi logon se baat hoti hai jo aap ki website, chatbot aur rankings banate hain — koi account-manager ka telephone game nahi.',
    chips: ['Book a free call', 'Show me your work'],
  },
  {
    id: 'contact',
    patterns: ['contact', 'call', 'email', 'phone', 'number', 'rabta', 'whatsapp', 'reach', 'talk to', 'baat karni', 'mail'],
    en: CONTACT_LINE_EN + '. Prefer to talk first? Book the free call and we will come prepared.',
    ur: CONTACT_LINE_UR + '. Pehle baat karna chahte hain? Free call book karen, hum tayyari ke saath aayenge.',
    chips: ['Book a free call'],
  },
  {
    id: 'booking',
    patterns: ['book', 'meeting', 'demo', 'schedule', 'appointment', 'strategy call', 'free call', 'consultation', 'call book'],
    en: 'You can book a free 30-minute strategy call here: ' + CONTACT.calendly + ' — we will map out your website + chatbot + SEO roadmap, no pressure, no obligation. Or email ' + CONTACT.email + ' if you prefer to write first.',
    ur: 'Free 30-minute strategy call yahan book kar sakte hain: ' + CONTACT.calendly + ' — hum aap ka website + chatbot + SEO roadmap bana denge, no pressure, no obligation. Ya pehle likhna hai to email karen: ' + CONTACT.email,
    chips: ['How much does it cost?', 'What does AgentX build?'],
  },
  {
    id: 'human',
    patterns: ['human', 'agent', 'banda', 'real person', 'person', 'someone real', 'insan', 'operator', 'support person', 'talk to human'],
    en: "Of course — happy to connect you with a real person. Email " + CONTACT.email + ", call/WhatsApp " + CONTACT.phone + ", or book a free 30-minute call and you'll speak directly with Wasi or Ali: " + CONTACT.calendly,
    ur: 'Bilkul — asli bande se rabta karwa dete hain. Email ' + CONTACT.email + ', call/WhatsApp ' + CONTACT.phone + ', ya free 30-minute call book karen — seedha Wasi ya Ali se baat hogi: ' + CONTACT.calendly,
  },
  {
    id: 'location',
    patterns: ['where', 'kahan', 'location', 'office', 'based', 'country', 'city', 'kis mulk', 'kis city'],
    en: 'AgentX works with clients worldwide — your website, chatbot, and SEO are delivered remotely, and your free strategy call happens over video. To start, book here: ' + CONTACT.calendly,
    ur: 'AgentX duniya bhar ke clients ke saath kaam karta hai — aap ki website, chatbot aur SEO remotely deliver hoti hai, aur free strategy call video par hoti hai. Shuru karne ke liye yahan book karen: ' + CONTACT.calendly,
    chips: ['Book a free call'],
  },
  {
    id: 'why',
    patterns: ['why agentx', 'why you', 'kyun', 'best', 'faida', 'benefit', 'advantage', 'different', 'choose', 'kyu'],
    en: 'Three reasons: (1) One team, one bundle — website + chatbot + SEO together, so nothing falls between agencies. (2) Built to sell — every design decision is measured by one metric: does it turn your visitors into customers? (3) Fixed quote, no hourly billing, and you talk directly to the builders. Want proof? Ask about our work on your free call.',
    ur: 'Teen wajah: (1) Ek team, ek bundle — website + chatbot + SEO ek saath, taake kuch agencies ke beech na khoye. (2) Built to sell — har design decision ek hi metric se napi jaati hai: kya ye aap ke visitors ko customers me badalta hai? (3) Fixed quote, no hourly billing, aur baat seedha builders se. Proof chahiye? Free call par hamara kaam pooch lein.',
    chips: ['Show me your work', 'Book a free call'],
  },
  {
    id: 'discount',
    patterns: ['discount', 'sasta', 'cheap', 'cheaper', 'negotiate', 'kam karo', 'offer', 'deal', 'sale'],
    en: 'We keep pricing honest: every project gets a fixed quote after a free strategy call, scoped to exactly what you need — no inflated prices, so no fake discounts either. The best value is the bundle: website + SEO + chatbot in one team, one timeline. Book the free call and we will quote your exact scope.',
    ur: 'Hum pricing honest rakhte hain: har project ko free strategy call ke baad fixed quote milta hai, bilkul aap ki zaroorat ke mutabiq — na barhayi hui prices, na fake discounts. Behtareen value bundle me hai: website + SEO + chatbot, ek team, ek timeline. Free call book karen, hum exact scope quote kar denge.',
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'guarantee',
    patterns: ['guarantee', 'refund', 'warranty', 'promise', 'surety', 'sure', 'pakka'],
    en: 'What we promise in writing: a fixed quote, a clear scope, and a timeline before we start — no hourly billing, no surprise charges. What we do not promise is fake numbers: no one can honestly guarantee a #1 Google ranking or an exact sales figure. What we do guarantee is the work, the process, and the support.',
    ur: 'Hum likh kar ye promise karte hain: fixed quote, clear scope aur timeline — shuru karne se pehle, no hourly billing, no surprise charges. Jo hum promise nahi karte wo fake numbers hain: koi imandari se #1 Google ranking ya exact sales figure guarantee nahi kar sakta. Jo hum guarantee karte hain wo kaam, process aur support hai.',
    chips: ['Book a free call', 'How much does it cost?'],
  },
  {
    id: 'language',
    patterns: ['language', 'zuban', 'urdu', 'english', 'arabic', 'hindi', 'kis zuban', 'which language'],
    en: 'I can chat in English and Roman Urdu — just write the way you are comfortable. The chatbots we build are set up around your business and your customers, including language and tone.',
    ur: 'Main English aur Roman Urdu dono me baat kar sakta hun — jis tarah comfortable hon, wese likhen. Jo chatbots hum banate hain wo aap ke business aur aap ke customers ke mutabiq set hote hain, language aur tone samet.',
    chips: ['What does AgentX build?', 'Book a free call'],
  },
];

/** First-visit quick chips. */
export const STARTER_CHIPS = [
  'What does AgentX build?',
  'How much does it cost?',
  'How fast can we start?',
  'Book a free call',
];

/** Shown when nothing matches — always ends with real contact details. */
export function fallbackReply(missCount: number): { en: string; ur: string; chips: string[] } {
  if (missCount <= 1) {
    return {
      en: "I want to give you the right answer — could you say that a different way? Meanwhile, here is what I can help with: our services, pricing, timeline, past work, or booking a free call.",
      ur: 'Main aap ko sahi jawab dena chahta hun — kya isay doosre tareeqe se keh sakte hain? Is doraan main in me madad kar sakta hun: hamari services, pricing, timeline, guzishta kaam, ya free call book karna.',
      chips: ['What does AgentX build?', 'How much does it cost?', 'Book a free call'],
    };
  }
  return {
    en: "I don't want to guess on this one — the fastest way to get your exact answer is a real person. " + CONTACT_LINE_EN + '.',
    ur: 'Is par andaza nahi lagana chahta — exact jawab ka tez tareen tareeqa asli banda hai. ' + CONTACT_LINE_UR + '.',
    chips: ['Book a free call', 'What does AgentX build?'],
  };
}
