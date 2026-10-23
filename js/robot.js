/* Hero robot, Spline scene, loaded from Spline's own public CDN,
   the same source the live AgentX site uses. Why not the local
   vendored copies? The preview tunnel cannot deliver the 2MB
   runtime reliably, so the robot payload loads straight from the
   CDN in the visitor's browser and the tunnel can no longer block
   it. The vendored copies stay in the project (js/vendor/,
   assets/) for the final self-hosted deploy if ever wanted.
   If the CDN is unreachable the catch still fires robot-ready,
   so the page and loader never wait on the robot. */
import('https://cdn.jsdelivr.net/npm/@splinetool/runtime@1.12.98/build/runtime.js')
  .then(function(mod){
    var app = new mod.Application(document.getElementById('robotCanvas'));
    return app.load('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
  })
  .then(function(){
    var r = document.querySelector('.hero .robot');
    if (r) r.classList.add('on');
    window.dispatchEvent(new Event('robot-ready'));
  })
  .catch(function(){ window.dispatchEvent(new Event('robot-ready')); });
