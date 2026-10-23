(function(){
var root=document.documentElement;
var reduce=false; /* animations always on, the site ignores the OS/browser reduce-motion setting (owner's decision, Oct 24, 2026) */
if(!window.gsap||!window.ScrollTrigger){root.classList.add("static");return}
if(reduce){root.classList.add("static","reduce");gsap.globalTimeline.timeScale(60)}
gsap.registerPlugin(ScrollTrigger);

/* smooth scroll */
var lenis=(window.Lenis&&!reduce)?new Lenis({lerp:.085,smoothWheel:true}):null;
if(lenis){lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);lenis.stop()}
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){var h=a.getAttribute("href");if(h.length<2)return;var el=document.querySelector(h);if(!el)return;e.preventDefault();closeMenu();lenis?lenis.scrollTo(el,{offset:0,duration:1.4}):el.scrollIntoView({behavior:"smooth"})})});

/* loader: the logo keeps animating in a loop while the page loads behind it.
   The moment the page is ready, the loader lifts and everything is already
   in front of the user. The robot never blocks the page: it fades in
   whenever it finishes loading. */
var word=document.getElementById("word");
if(word&&!word.children.length)"AGENTX".split("").forEach(function(c){var s=document.createElement("span");s.textContent=c;word.appendChild(s)});
root.classList.add("js-anim");
var loopTl=gsap.timeline({repeat:-1,yoyo:true,repeatDelay:.3});
loopTl.fromTo("#loader .mark",{opacity:.12,filter:"blur(9px)"},{opacity:1,filter:"blur(0px)",duration:.95,ease:"power2.inOut"},0)
  .fromTo("#word span",{opacity:.12,filter:"blur(9px)",color:"#83838a"},{opacity:1,filter:"blur(0px)",color:"#fff",duration:.95,stagger:.09,ease:"power2.inOut"},0);
var exitTl=gsap.timeline({paused:true});
exitTl.to("#loader .lockup",{opacity:0,filter:"blur(6px)",duration:.5,ease:"power2.in"})
  .to("#loader",{yPercent:-100,duration:1,ease:"power4.inOut"},"-=.15")
  .set("#loader",{display:"none"})
  .add(function(){lenis&&lenis.start()},"-=.4")
  .to(".hero .ln i",{y:0,yPercent:0,filter:"blur(0px)",duration:1.3,stagger:.14,ease:"power4.out"},"-=.9")
  .to(".hero .rv",{opacity:1,y:0,filter:"blur(0px)",duration:1.1,stagger:.12,ease:"power3.out"},"-=.9");
gsap.set(".hero .ln i",{yPercent:105});

/* open as soon as the page is ready (robot arrived, or full page load),
   at least ~1.1s so the branding registers, and never later than 5s:
   the user is never left waiting on a slow connection. */
var opened=false, t0=Date.now();
function openSite(){
  if(opened)return;opened=true;
  var wait=Math.max(0,1100-(Date.now()-t0));
  setTimeout(function(){loopTl.kill();exitTl.play()},wait);
}
addEventListener("robot-ready",openSite);
addEventListener("load",openSite);
setTimeout(openSite,5000);

/* generic reveal: rise + unblur on scroll */
if(!reduce)gsap.utils.toArray(".rv").forEach(function(el){
  if(el.closest(".hero"))return;
  gsap.to(el,{opacity:1,y:0,filter:"blur(0px)",duration:1.2,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}});
});

/* statement: words sharpen as you scroll */
var p=document.getElementById("stmt");
p.innerHTML=p.textContent.trim().split(/\s+/).map(function(w){return '<span class="w">'+w+'</span>'}).join(" ");
if(!reduce)gsap.to("#stmt .w",{opacity:1,filter:"blur(0px)",stagger:.5,ease:"none",scrollTrigger:{trigger:"#stmt",start:"top 80%",end:"bottom 45%",scrub:true}});

/* scene backgrounds drift (parallax) */
if(!reduce)gsap.utils.toArray(".scene").forEach(function(s){
  gsap.fromTo(s.querySelector(".bgfx"),{yPercent:-8,scale:1.08},{yPercent:8,scale:1,ease:"none",scrollTrigger:{trigger:s,start:"top bottom",end:"bottom top",scrub:true}});
});

if(!reduce&&matchMedia("(pointer:fine)").matches){
  /* magnetic buttons */
  document.querySelectorAll(".mag").forEach(function(m){
    var b=m.firstElementChild;
    var mx=gsap.quickTo(b,"x",{duration:.6,ease:"power3"}),my=gsap.quickTo(b,"y",{duration:.6,ease:"power3"});
    m.addEventListener("mousemove",function(e){var r=m.getBoundingClientRect();mx((e.clientX-r.left-r.width/2)*.35);my((e.clientY-r.top-r.height/2)*.5)});
    m.addEventListener("mouseleave",function(){gsap.to(b,{x:0,y:0,duration:.9,ease:"elastic.out(1,.4)",overwrite:true})});
  });
}

/* work: click a project name, its section opens below; the View button follows the cursor */
document.querySelectorAll(".pitem").forEach(function(item){
  var row=item.querySelector(".prow"),panel=item.querySelector(".panel"),stage=panel.querySelector(".stage"),isOpen=false;
  function setOpen(state){
    isOpen=state;
    row.setAttribute("aria-expanded",String(state));
    panel.setAttribute("aria-hidden",String(!state));
    item.classList.toggle("open",state);
    if(state){
      gsap.to(panel,{height:stage.offsetHeight,duration:.9,ease:"power4.inOut",overwrite:"auto",onComplete:function(){ScrollTrigger.refresh()}});
      gsap.fromTo(panel.querySelector(".pbg"),{scale:1.12},{scale:1.03,duration:1.5,ease:"power2.out"});
      gsap.fromTo(panel.querySelectorAll(".pin > *"),{y:34,opacity:0},{y:0,opacity:1,duration:.8,stagger:.07,delay:.25,ease:"power3.out",overwrite:"auto"});
    }else{
      gsap.to(panel,{height:0,duration:.7,ease:"power4.inOut",overwrite:"auto",onComplete:function(){ScrollTrigger.refresh()}});
    }
  }
  row.addEventListener("click",function(){
    var willOpen=!isOpen;
    document.querySelectorAll(".pitem.open").forEach(function(o){if(o!==item){o.querySelector(".prow").dispatchEvent(new Event("click"))}});
    if(willOpen!==isOpen)setOpen(willOpen);
  });
  var vb=panel.querySelector(".viewbtn");
  if(vb&&!reduce&&matchMedia("(pointer:fine)").matches){
    gsap.set(vb,{xPercent:-50,yPercent:-50,x:-120,y:-120,scale:.8});
    var qx=gsap.quickTo(vb,"x",{duration:.45,ease:"power3"}),qy=gsap.quickTo(vb,"y",{duration:.45,ease:"power3"});
    panel.addEventListener("mousemove",function(e){var r=panel.getBoundingClientRect();qx(e.clientX-r.left);qy(e.clientY-r.top)});
    var nearPv=false;
    panel.addEventListener("mouseenter",function(){if(!nearPv)gsap.to(vb,{autoAlpha:1,scale:1,duration:.35,ease:"power3.out"})});
    panel.addEventListener("mouseleave",function(){gsap.to(vb,{autoAlpha:0,scale:.8,duration:.3,ease:"power3.in"})});
    var pv=panel.querySelector(".pview");
    if(pv){
      pv.addEventListener("mouseenter",function(){nearPv=true;gsap.to(vb,{autoAlpha:0,scale:.8,duration:.25,ease:"power3.out"})});
      pv.addEventListener("mouseleave",function(){nearPv=false;gsap.to(vb,{autoAlpha:1,scale:1,duration:.3,ease:"power3.out"})});
    }
    panel.querySelector(".stage").addEventListener("click",function(e){
      if(e.target.closest(".pview"))return;
      window.open(vb.getAttribute("href"),"_blank","noopener");
    });
  }
});

/* achievements: numbers count up from 0 when scrolled into view */
if(!reduce)document.querySelectorAll(".ach .count").forEach(function(el,i){
  var target=parseInt(el.getAttribute("data-target"),10),suf=el.getAttribute("data-suffix")||"";
  el.textContent="0"+suf;
  var obj={v:0};
  ScrollTrigger.create({trigger:el,start:"top 90%",once:true,onEnter:function(){
    gsap.to(obj,{v:target,duration:1.5,delay:i*.15,ease:"power2.out",onUpdate:function(){el.textContent=Math.round(obj.v)+suf},onComplete:function(){el.textContent=target+suf}});
  }});
});

/* process cards: circular reveal from the medallion, like the reference component */
document.querySelectorAll(".stepcard").forEach(function(card){
  var ovl=card.querySelector(".ovl");
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

/* contact form: smooth AJAX submit to Formspree, inline status */
var gform=document.querySelector(".gform");
if(gform){gform.addEventListener("submit",function(ev){
  ev.preventDefault();
  var st=gform.querySelector(".gstatus"),btn=gform.querySelector(".gsend"),label=btn.querySelector("span");
  btn.disabled=true;if(label)label.textContent="Sending...";
  st.textContent="";st.className="gstatus";
  fetch(gform.action,{method:"POST",body:new FormData(gform),headers:{"Accept":"application/json"}}).then(function(r){
    if(r.ok){gform.reset();st.textContent="Message sent. We will reply within one business day.";st.classList.add("ok");}
    else{st.textContent="Something went wrong. Please email us at wasia2053@gmail.com instead.";st.classList.add("err");}
  }).catch(function(){st.textContent="Network problem. Please email us at wasia2053@gmail.com instead.";st.classList.add("err");})
  .then(function(){btn.disabled=false;if(label)label.textContent="Send message";});
});}

/* menu */
var menu=document.getElementById("menu"),btn=document.getElementById("menuBtn"),open=false;
function openMenu(){open=true;btn.textContent="✕";btn.classList.add("isx");btn.setAttribute("aria-expanded","true");lenis&&lenis.stop();
  gsap.set(menu,{visibility:"visible"});
  gsap.to(menu,{clipPath:"inset(0 0 0% 0)",duration:.9,ease:"power4.inOut"});
  gsap.to("#menu a.big span",{y:0,yPercent:0,duration:1,stagger:.08,delay:.35,ease:"power4.out"});
  gsap.to("#menu .subrow a span",{y:0,yPercent:0,duration:.9,stagger:.06,delay:.62,ease:"power4.out"});
  gsap.to("#menu .menutalk",{opacity:1,duration:.8,delay:.78,ease:"power2.out"})}
function closeMenu(){if(!open)return;open=false;btn.textContent="Menu";btn.classList.remove("isx");btn.setAttribute("aria-expanded","false");lenis&&lenis.start();
  gsap.to(menu,{clipPath:"inset(0 0 100% 0)",duration:.8,ease:"power4.inOut",onComplete:function(){gsap.set(menu,{visibility:"hidden"});gsap.set("#menu a span",{yPercent:110});gsap.set("#menu .menutalk",{opacity:0})}})}
gsap.set("#menu a span",{yPercent:110});
btn.addEventListener("click",function(){open?closeMenu():openMenu()});
addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu()});
})();
