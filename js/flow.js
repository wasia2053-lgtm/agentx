/* Gateway Flow hero background: dotted bezier paths stream from both
   edges into the hero's center (the robot), particles ride the paths,
   clicks send a ripple through the stream. Vanilla canvas recreation
   of the 21st.dev gateway-flow effect, tuned for the light hero:
   dark threads on off-white, subtle and smooth. Pauses off-screen. */
(function () {
  var hero = document.querySelector(".hero"), canvas = document.getElementById("flow");
  if (!hero || !canvas) return;
  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, paths = [], explosions = [], visible = false;

  function buildPaths() {
    var n = Math.max(38, Math.min(84, Math.round(W / 17)));
    paths = [];
    for (var i = 0; i < n; i++) {
      var parts = [{ t: Math.random(), speed: 0.0016 + Math.random() * 0.0022 }];
      if (i % 3 === 0) parts.push({ t: Math.random(), speed: 0.0013 + Math.random() * 0.0018 });
      paths.push({ left: i % 2 === 0, y: (i / (n - 1)) * H * 1.35 - H * 0.175, parts: parts });
    }
  }
  function resize() {
    var r = hero.getBoundingClientRect();
    var DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildPaths();
  }
  function bez(t, p0, p1, p2, p3) {
    var u = 1 - t;
    return {
      x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y
    };
  }
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden || !W) return;
    ctx.clearRect(0, 0, W, H);
    var cx = W / 2, cy = H * 0.46, i, e;
    for (e = explosions.length - 1; e >= 0; e--) {
      explosions[e].r += 14; explosions[e].life -= 0.016;
      if (explosions[e].life <= 0) explosions.splice(e, 1);
    }
    var all = new Path2D(), pts = [];
    for (i = 0; i < paths.length; i++) {
      var pth = paths[i];
      var p0 = { x: pth.left ? 0 : W, y: pth.y },
          p1 = { x: pth.left ? cx * 0.5 : W - cx * 0.5, y: pth.y },
          p2 = { x: pth.left ? cx * 0.82 : W - cx * 0.82, y: cy },
          p3 = { x: cx, y: cy };
      all.moveTo(p0.x, p0.y);
      all.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      for (var j = 0; j < pth.parts.length; j++) {
        var pt = pth.parts[j];
        pt.t += pt.speed;
        if (pt.t > 1) { pt.t = 0; pth.y += (Math.random() - 0.5) * 12; }
        var pos = bez(pt.t, p0, p1, p2, p3), dxT = 0, dyT = 0;
        for (e = 0; e < explosions.length; e++) {
          var ex = explosions[e], dx = pos.x - ex.x, dy = pos.y - ex.y, d = Math.hypot(dx, dy) || 1;
          if (Math.abs(d - ex.r) < 120) {
            var f = (1 - Math.abs(d - ex.r) / 120) * ex.life;
            dxT += dx / d * f * 70; dyT += dy / d * f * 70;
          }
        }
        pts.push([pos.x + dxT, pos.y + dyT]);
      }
    }
    ctx.strokeStyle = "rgba(13,13,16,0.34)";
    ctx.lineWidth = 1.3;
    ctx.setLineDash([1, 3.1]);
    ctx.stroke(all);
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(13,13,16,0.85)";
    for (i = 0; i < pts.length; i++) ctx.fillRect(pts[i][0] - 1.8, pts[i][1] - 1.8, 3.6, 3.6);
  }

  hero.addEventListener("click", function (e) {
    if (e.target.closest("a,button,input,textarea")) return;
    var r = hero.getBoundingClientRect();
    if (explosions.length < 6) explosions.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0, life: 1 });
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.02 }).observe(hero);
  } else visible = true;
  if ("ResizeObserver" in window) {
    var t;
    new ResizeObserver(function () { clearTimeout(t); t = setTimeout(resize, 120); }).observe(hero);
  }
  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
