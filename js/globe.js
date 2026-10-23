/* AgentX contact globe: lightweight canvas wireframe globe.
   Orthographic projection, country outlines (window.GLOBE_LAND),
   auto-rotating, drag to spin, pauses off-screen. No libraries. */
(function () {
  var canvas = document.getElementById("globe");
  if (!canvas || !window.GLOBE_LAND) return;
  var ctx = canvas.getContext("2d");

  var D2R = Math.PI / 180;
  var lonC = 55;            // center longitude (starts over Asia)
  var tilt = 20 * D2R;      // axis tilt in radians
  var SPEED = 0.12;        // degrees per frame
  var running = true, visible = false, dragging = false, idleTimer = 0;
  var W = 0, H = 0, R = 0, CX = 0, CY = 0, DPR = 1;

  var CITIES = [
    { name: "Karachi", lat: 24.86, lon: 67.0, hq: true },
    { name: "Dubai", lat: 25.2, lon: 55.27 },
    { name: "London", lat: 51.5, lon: -0.13 },
    { name: "New York", lat: 40.71, lon: -74.01 }
  ];

  function resize() {
    var w = canvas.clientWidth || canvas.parentElement.clientWidth;
    if (!w) return;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = w; H = w;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(w * DPR);
    canvas.style.height = w + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    CX = W / 2; CY = H / 2; R = W * 0.46;
  }

  function project(lon, lat) {
    var lam = lon * D2R, phi = lat * D2R, dl = lam - lonC * D2R;
    var cf = Math.cos(phi);
    var x = cf * Math.sin(dl);
    var y = Math.cos(tilt) * Math.sin(phi) - Math.sin(tilt) * cf * Math.cos(dl);
    var z = Math.sin(tilt) * Math.sin(phi) + Math.cos(tilt) * cf * Math.cos(dl);
    return { x: CX + R * x, y: CY - R * y, z: z };
  }

  function drawLand() {
    ctx.beginPath();
    var land = window.GLOBE_LAND;
    for (var i = 0; i < land.length; i++) {
      var ring = land[i], pen = false;
      for (var j = 0; j < ring.length; j++) {
        var p = project(ring[j][0], ring[j][1]);
        if (p.z > 0) {
          if (!pen) { ctx.moveTo(p.x, p.y); pen = true; }
          else ctx.lineTo(p.x, p.y);
        } else pen = false;
      }
    }
    ctx.strokeStyle = "rgba(244,244,242,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function vec(lon, lat) {
    var lam = lon * D2R, phi = lat * D2R;
    return [Math.cos(phi) * Math.cos(lam), Math.cos(phi) * Math.sin(lam), Math.sin(phi)];
  }

  function drawArc(a, b) {
    var va = vec(a.lon, a.lat), vb = vec(b.lon, b.lat);
    var dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
    var ang = Math.acos(dot), sin = Math.sin(ang);
    if (sin < 0.001) return;
    ctx.beginPath();
    var pen = false;
    for (var s = 0; s <= 28; s++) {
      var t = s / 28;
      var k0 = Math.sin((1 - t) * ang) / sin, k1 = Math.sin(t * ang) / sin;
      var x = va[0] * k0 + vb[0] * k1, y = va[1] * k0 + vb[1] * k1, z = va[2] * k0 + vb[2] * k1;
      var lift = 1 + 0.16 * Math.sin(Math.PI * t);
      var lon = Math.atan2(y, x) / D2R, lat = Math.asin(Math.max(-1, Math.min(1, z))) / D2R;
      var p = project(lon, lat);
      var px = CX + (p.x - CX) * lift, py = CY + (p.y - CY) * lift;
      if (p.z > 0.02) {
        if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
      } else pen = false;
    }
    ctx.strokeStyle = "rgba(244,244,242,0.30)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawCities(now) {
    for (var i = 0; i < CITIES.length; i++) {
      var c = CITIES[i], p = project(c.lon, c.lat);
      if (p.z <= 0.02) continue;
      var a = Math.min(1, (p.z - 0.02) * 2.2);
      if (c.hq) {
        var ph = (now % 2400) / 2400;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + ph * 15, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(244,244,242," + (0.55 * (1 - ph) * a) + ")";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + a + ")";
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(244,244,242," + 0.85 * a + ")";
        ctx.fill();
      }
    }
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || !running || document.hidden) return;
    if (!dragging) {
      if (idleTimer > 0 && now < idleTimer) { /* resting after drag */ }
      else lonC += SPEED;
    }
    ctx.clearRect(0, 0, W, H);
    // sphere outline + soft inner shade
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(244,244,242,0.38)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    drawLand();
    for (var i = 1; i < CITIES.length; i++) drawArc(CITIES[0], CITIES[i]);
    drawCities(now || 0);
  }

  // drag to spin
  var lastX = 0, lastY = 0;
  canvas.addEventListener("pointerdown", function (e) {
    dragging = true; lastX = e.clientX; lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    lonC -= (e.clientX - lastX) * 0.28;
    tilt = Math.max(2 * D2R, Math.min(42 * D2R, tilt + (e.clientY - lastY) * 0.003));
    lastX = e.clientX; lastY = e.clientY;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    idleTimer = performance.now() + 2200;
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.05 }).observe(canvas);
  } else visible = true;
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas.parentElement);
  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
})();
