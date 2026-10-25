/* Shared behaviour for AgentX subpages (pricing, terms).
   Same motion language as js/main.js: Lenis smooth scroll, overlay menu,
   rise + unblur reveals, circular step cards, smooth FAQ accordion.
   Animations run regardless of the OS reduce-motion setting
   (owner's decision, Oct 24, 2026). */
(function(){
var root=document.documentElement;
if(!window.gsap||!window.ScrollTrigger){root.classList.add("static");return}
gsap.registerPlugin(ScrollTrigger);

var lenis=window.Lenis?new Lenis({lerp:.085,smoothWheel:true}):null;
if(lenis){lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}

/* anchor links: smooth-scroll when the target is on this page */
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){var h=a.getAttribute("href");if(h.length<2)return;var el=document.querySelector(h);if(!el)return;e.preventDefault();closeMenu();lenis?lenis.scrollTo(el,{offset:0,duration:1.4}):el.scrollIntoView({behavior:"smooth"})})});

/* hero copy rises in as soon as the page opens */
gsap.to(".phero .rv",{opacity:1,y:0,filter:"blur(0px)",duration:1.15,stagger:.12,delay:.15,ease:"power3.out"});

/* generic reveal on scroll */
gsap.utils.toArray(".rv").forEach(function(el){
  if(el.closest(".phero"))return;
  gsap.to(el,{opacity:1,y:0,filter:"blur(0px)",duration:1.2,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
});

/* magnetic buttons */
if(matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".mag").forEach(function(m){
    var b=m.firstElementChild;if(!b)return;
    var mx=gsap.quickTo(b,"x",{duration:.6,ease:"power3"}),my=gsap.quickTo(b,"y",{duration:.6,ease:"power3"});
    m.addEventListener("mousemove",function(e){var r=m.getBoundingClientRect();mx((e.clientX-r.left-r.width/2)*.35);my((e.clientY-r.top-r.height/2)*.5)});
    m.addEventListener("mouseleave",function(){gsap.to(b,{x:0,y:0,duration:.9,ease:"elastic.out(1,.4)",overwrite:true})});
  });
}

/* process cards: circular reveal from the medallion */
document.querySelectorAll(".stepcard").forEach(function(card){
  var ovl=card.querySelector(".ovl");if(!ovl)return;
  gsap.set(ovl,{clipPath:"circle(40px at 64px 64px)"});
  function openC(){gsap.killTweensOf(ovl);gsap.to(ovl,{clipPath:"circle(150% at 64px 64px)",duration:.7,ease:"expo.inOut"})}
  function closeC(){gsap.killTweensOf(ovl);gsap.to(ovl,{clipPath:"circle(40px at 64px 64px)",duration:1.2,ease:"expo.out"})}
  if(matchMedia("(pointer:fine)").matches){
    card.addEventListener("mouseenter",openC);
    card.addEventListener("mouseleave",closeC);
  }else{
    card.addEventListener("click",function(e){
      if(e.target.closest("a"))return;
      if(card.classList.toggle("open"))openC();else closeC();
    });
  }
});

/* faq accordion: smooth height animation, one open at a time */
document.querySelectorAll(".faqitem").forEach(function(item){
  var btn=item.querySelector(".faqrow"),panel=item.querySelector(".faqpanel"),inner=item.querySelector(".faqans");
  if(!btn||!panel||!inner)return;
  var isOpen=item.classList.contains("open");
  if(isOpen)panel.style.height="auto";
  function setOpen(state){
    if(state===isOpen)return;isOpen=state;
    item.classList.toggle("open",state);
    btn.setAttribute("aria-expanded",String(state));
    if(state){
      gsap.fromTo(panel,{height:0},{height:inner.offsetHeight,duration:.6,ease:"power3.inOut",overwrite:"auto",onComplete:function(){panel.style.height="auto";ScrollTrigger.refresh()}});
      gsap.fromTo(inner,{opacity:0,y:12},{opacity:1,y:0,duration:.5,delay:.12,ease:"power2.out",overwrite:"auto"});
    }else{
      gsap.fromTo(panel,{height:panel.offsetHeight},{height:0,duration:.5,ease:"power3.inOut",overwrite:"auto",onComplete:function(){ScrollTrigger.refresh()}});
    }
  }
  btn.addEventListener("click",function(){
    var willOpen=!isOpen;
    document.querySelectorAll(".faqitem.open").forEach(function(o){if(o!==item)o.querySelector(".faqrow").dispatchEvent(new Event("click"))});
    setOpen(willOpen);
  });
});

/* overlay menu (same behaviour as the home page) */
var menu=document.getElementById("menu"),mbtn=document.getElementById("menuBtn"),open=false;
function openMenu(){open=true;mbtn.textContent="✕";mbtn.classList.add("isx");mbtn.setAttribute("aria-expanded","true");lenis&&lenis.stop();
  gsap.set(menu,{visibility:"visible"});
  gsap.to(menu,{clipPath:"inset(0 0 0% 0)",duration:.9,ease:"power4.inOut"});
  gsap.to("#menu .big span",{y:0,yPercent:0,duration:1,stagger:.08,delay:.35,ease:"power4.out"});
  gsap.to("#menu .subrow a span, #menu .pricesub a span",{y:0,yPercent:0,duration:.9,stagger:.05,delay:.62,ease:"power4.out"});
  gsap.to("#menu .menutalk",{opacity:1,duration:.8,delay:.78,ease:"power2.out"})}
function closeMenu(){if(!open)return;open=false;mbtn.textContent="Menu";mbtn.classList.remove("isx");mbtn.setAttribute("aria-expanded","false");lenis&&lenis.start();
  gsap.to(menu,{clipPath:"inset(0 0 100% 0)",duration:.8,ease:"power4.inOut",onComplete:function(){gsap.set(menu,{visibility:"hidden"});gsap.set("#menu a span, #menu button.big span",{yPercent:110});gsap.set("#menu .menutalk",{opacity:0})}})}
gsap.set("#menu a span, #menu button.big span",{yPercent:110});
mbtn.addEventListener("click",function(){open?closeMenu():openMenu()});
addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu()});
})();
