import { useRef, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type PatternShape = "Checks" | "Stripes" | "Edge";
const PatternShapes: Record<PatternShape, number> = { Checks: 0, Stripes: 1, Edge: 2 };

interface PresetParams {
  color1: string; color2: string; color3: string;
  rotation: number; proportion: number; scale: number; speed: number;
  distortion: number; swirl: number; swirlIterations: number;
  softness: number; offset: number; shape: PatternShape; shapeSize: number;
}

type PresetName = "Prism" | "Lava" | "Plasma" | "Pulse" | "Vortex" | "Mist";

const presets: Record<PresetName, PresetParams> = {
  Prism:  { color1:"#050505", color2:"#66B3FF", color3:"#FFFFFF", rotation:-50, proportion:1,   scale:0.01, speed:30, distortion:0,  swirl:50,  swirlIterations:16, softness:47,  offset:-299, shape:"Checks",  shapeSize:45 },
  Lava:   { color1:"#FF9F21", color2:"#FF0303", color3:"#000000", rotation:114, proportion:100, scale:0.52, speed:30, distortion:7,  swirl:18,  swirlIterations:20, softness:100, offset:717,  shape:"Edge",    shapeSize:12 },
  Plasma: { color1:"#B566FF", color2:"#000000", color3:"#000000", rotation:0,   proportion:63,  scale:0.75, speed:30, distortion:5,  swirl:61,  swirlIterations:5,  softness:100, offset:-168, shape:"Checks",  shapeSize:28 },
  Pulse:  { color1:"#66FF85", color2:"#000000", color3:"#000000", rotation:-167,proportion:92,  scale:0,    speed:20, distortion:54, swirl:75,  swirlIterations:3,  softness:28,  offset:-813, shape:"Checks",  shapeSize:79 },
  Vortex: { color1:"#000000", color2:"#FFFFFF", color3:"#000000", rotation:50,  proportion:41,  scale:0.4,  speed:20, distortion:0,  swirl:100, swirlIterations:3,  softness:5,   offset:-744, shape:"Stripes", shapeSize:80 },
  Mist:   { color1:"#050505", color2:"#FF66B8", color3:"#050505", rotation:0,   proportion:33,  scale:0.48, speed:39, distortion:4,  swirl:65,  swirlIterations:5,  softness:100, offset:-235, shape:"Edge",    shapeSize:48 },
};

type GradientConfig =
  | { preset: PresetName; speed?: number }
  | { preset: "custom"; color1: string; color2: string; color3: string;
      rotation?: number; proportion?: number; scale?: number; speed?: number;
      distortion?: number; swirl?: number; swirlIterations?: number;
      softness?: number; offset?: number; shape?: PatternShape; shapeSize?: number; };

interface AnimatedGradientProps {
  config?: GradientConfig;
  noise?: { opacity: number; scale?: number };
  radius?: string;
  style?: CSSProperties;
  className?: string;
}

function hexToRgba(hex: string): [number, number, number, number] {
  let r = 0, g = 0, b = 0, a = 1;
  if (hex.startsWith("#")) {
    const c = hex.slice(1);
    if (c.length === 3) {
      r = parseInt(c[0]+c[0],16)/255; g = parseInt(c[1]+c[1],16)/255; b = parseInt(c[2]+c[2],16)/255;
    } else if (c.length >= 6) {
      r = parseInt(c.slice(0,2),16)/255; g = parseInt(c.slice(2,4),16)/255; b = parseInt(c.slice(4,6),16)/255;
      if (c.length === 8) a = parseInt(c.slice(6,8),16)/255;
    }
  }
  return [r, g, b, a];
}

const FRAG = `#version 300 es
precision highp float;
uniform float u_time,u_pixelRatio,u_scale,u_rotation,u_proportion,u_softness,u_shape,u_shapeScale,u_distortion,u_swirl,u_swirlIterations;
uniform vec2 u_resolution;
uniform vec4 u_color1,u_color2,u_color3;
out vec4 fragColor;
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
vec2 rotate(vec2 uv,float th){return mat2(cos(th),sin(th),-sin(th),cos(th))*uv;}
float random(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
float noise(vec2 st){vec2 i=floor(st);vec2 f=fract(st);float a=random(i);float b=random(i+vec2(1.,0.));float c=random(i+vec2(0.,1.));float d=random(i+vec2(1.,1.));vec2 u=f*f*(3.-2.*f);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
vec4 blend_colors(vec4 c1,vec4 c2,vec4 c3,float mixer,float ew,float eb){vec3 k1=c1.rgb*c1.a;vec3 k2=c2.rgb*c2.a;vec3 k3=c3.rgb*c3.a;float r1=smoothstep(.0+.35*ew,.7-.35*ew+.5*eb,mixer);float r2=smoothstep(.3+.35*ew,1.-.35*ew+eb,mixer);vec3 bc2=mix(k1,k2,r1);float bo2=mix(c1.a,c2.a,r1);vec3 cc=mix(bc2,k3,r2);float o=mix(bo2,c3.a,r2);return vec4(cc,o);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  float t=.5*u_time;float ns=.0005+.006*u_scale;
  uv-=.5;uv*=(ns*u_resolution);uv=rotate(uv,u_rotation*.5*PI);uv/=u_pixelRatio;uv+=.5;
  float n1=noise(uv+t);float n2=noise(uv*2.-t);float angle=n1*TWO_PI;
  uv.x+=4.*u_distortion*n2*cos(angle);uv.y+=4.*u_distortion*n2*sin(angle);
  float iters=ceil(clamp(u_swirlIterations,1.,30.));
  for(float i=1.;i<=iters;i++){uv.x+=clamp(u_swirl,0.,2.)/i*cos(t+i*1.5*uv.y);uv.y+=clamp(u_swirl,0.,2.)/i*cos(t+i*uv.x);}
  float prop=clamp(u_proportion,0.,1.);float shape=0.;float mixer=0.;
  if(u_shape<.5){vec2 cuv=uv*(.5+3.5*u_shapeScale);shape=.5+.5*sin(cuv.x)*cos(cuv.y);mixer=shape+.48*sign(prop-.5)*pow(abs(prop-.5),.5);}
  else if(u_shape<1.5){vec2 suv=uv*(.25+3.*u_shapeScale);float f=fract(suv.y);shape=smoothstep(.0,.55,f)*smoothstep(1.,.45,f);mixer=shape+.48*sign(prop-.5)*pow(abs(prop-.5),.5);}
  else{float sh=1.-uv.y;sh-=.5;sh/=(ns*u_resolution.y);sh+=.5;float ss=.2*(1.-u_shapeScale);shape=smoothstep(.45-ss,.55+ss,sh+.3*(prop-.5));mixer=shape;}
  vec4 cm=blend_colors(u_color1,u_color2,u_color3,mixer,1.-clamp(u_softness,0.,1.),.01+.01*u_scale);
  fragColor=vec4(cm.rgb,cm.a);
}`;

export default function AnimatedGradient({ config = { preset: "Prism" }, noise, radius = "0px", style, className }: AnimatedGradientProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef   = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  const params = useMemo((): PresetParams => {
    if (config.preset === "custom") {
      return { color1:config.color1, color2:config.color2, color3:config.color3, rotation:config.rotation??0, proportion:config.proportion??35, scale:config.scale??1, speed:config.speed??25, distortion:config.distortion??12, swirl:config.swirl??80, swirlIterations:config.swirlIterations??10, softness:config.softness??100, offset:config.offset??0, shape:config.shape??"Checks", shapeSize:config.shapeSize??10 };
    }
    const p = presets[config.preset as PresetName] || presets.Prism;
    return { ...p, speed: config.speed ?? p.speed };
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container || !mounted) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha:true, alpha:true, antialias:true });
    if (!gl) return;

    const mkShader = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const vs = mkShader(gl.VERTEX_SHADER, `#version 300 es\nin vec4 a_position;\nvoid main(){gl_Position=a_position;}`);
    const fs = mkShader(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const U = { time:u("u_time"), res:u("u_resolution"), px:u("u_pixelRatio"), scale:u("u_scale"), rot:u("u_rotation"), c1:u("u_color1"), c2:u("u_color2"), c3:u("u_color3"), prop:u("u_proportion"), soft:u("u_softness"), shape:u("u_shape"), shapeScale:u("u_shapeScale"), dist:u("u_distortion"), swirl:u("u_swirl"), swirlI:u("u_swirlIterations") };

    const resize = () => { const w=container.clientWidth, h=container.clientHeight, pr=window.devicePixelRatio||1; canvas.width=w*pr; canvas.height=h*pr; canvas.style.width=`${w}px`; canvas.style.height=`${h}px`; gl.viewport(0,0,canvas.width,canvas.height); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(container);
    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTimeRef.current) / 1000;
      const speed = (params.speed / 100) * 5;
      gl.uniform1f(U.time, elapsed * speed + params.offset * 0.01);
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.px, window.devicePixelRatio || 1);
      gl.uniform1f(U.scale, params.scale);
      gl.uniform1f(U.rot, (params.rotation * Math.PI) / 180);
      const [r1,g1,b1,a1]=hexToRgba(params.color1); const [r2,g2,b2,a2]=hexToRgba(params.color2); const [r3,g3,b3,a3]=hexToRgba(params.color3);
      gl.uniform4f(U.c1,r1,g1,b1,a1); gl.uniform4f(U.c2,r2,g2,b2,a2); gl.uniform4f(U.c3,r3,g3,b3,a3);
      gl.uniform1f(U.prop, params.proportion/100); gl.uniform1f(U.soft, params.softness/100);
      gl.uniform1f(U.shape, PatternShapes[params.shape]); gl.uniform1f(U.shapeScale, params.shapeSize/100);
      gl.uniform1f(U.dist, params.distortion/50); gl.uniform1f(U.swirl, params.swirl/100);
      gl.uniform1f(U.swirlI, params.swirl===0 ? 0 : params.swirlIterations);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current !== undefined) cancelAnimationFrame(frameIdRef.current);
      ro.disconnect(); gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf);
    };
  }, [mounted, params]);

  return (
    <div ref={containerRef} className={className} style={{ position:"absolute", inset:0, zIndex:-1, borderRadius:radius, overflow:"hidden", ...style }}>
      <canvas ref={canvasRef} style={{ display:"block", width:"100%", height:"100%" }} />
      {noise && noise.opacity > 0 && (
        <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCCgkGBAVJOAVJAAAASklEQVQ4y2NgGAWjYBSMglEwCgY/YGRgZBQUYmJiZGQEkYwMjIyMgoKCjIyMIJKBgRFIMjIyAklGRkYGRkFBYEcwMDIyMjAOUQAA1I4HwVwZAkYAAAAASUVORK5CYII=")`, backgroundSize:(noise.scale??1)*200, backgroundRepeat:"repeat", opacity:noise.opacity/2, pointerEvents:"none" }} />
      )}
    </div>
  );
}