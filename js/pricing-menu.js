/* Navbar Pricing dropdown: clicking "Pricing" in the overlay menu
   expands the per-service pricing links. Pure class toggle; the open
   and close animation is CSS (grid-rows), so it stays smooth with
   or without the GSAP menu animation around it. */
(function () {
  var btn = document.getElementById("priceToggle");
  var sub = document.getElementById("priceSub");
  if (!btn || !sub) return;
  btn.addEventListener("click", function () {
    var open = sub.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
})();
