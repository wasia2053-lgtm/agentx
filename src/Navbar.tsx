import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home",         href: "#home" },
  { label: "About Us",     href: "#about" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us",   href: "#contact" },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        @font-face {
          font-family: 'FreshChunky';
          src: url('/fonts/FreshChunky-Regular-BF69e8470be9b15.otf') format('opentype');
          font-display: swap;
        }
        .agx-links  { display: flex; align-items: center; gap: 2px; }
        .agx-burger { display: none; align-items: center; justify-content: center; }
        .agx-mobile { display: none; }
        @media (max-width: 768px) {
          .agx-links  { display: none !important; }
          .agx-burger { display: flex !important; }
          .agx-mobile { display: block !important; }
        }
      `}</style>

      {/* FULL-WIDTH FIXED ROW — this centers the pill reliably */}
      <div
        style={{
          position:       "fixed",
          top:            20,
          left:           0,
          right:          0,
          display:        "flex",
          justifyContent: "center",
          alignItems:     "center",
          zIndex:         9999,
          pointerEvents:  "none",
        }}
      >
        <motion.div
          initial={{ y: -70, opacity: 0, scale: 0.93 }}
          animate={{ y: 0,   opacity: 1, scale: 1    }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.15 }}
          style={{ pointerEvents: "auto" }}
        >
          <nav
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "2px",
              padding:        "5px 5px",
              borderRadius:   "100px",
              background:     "rgba(8,8,8,0.82)",
              backdropFilter: `blur(${scrolled ? 28 : 20}px) saturate(160%)`,
              border:         `1px solid rgba(255,255,255,${scrolled ? 0.13 : 0.08})`,
              boxShadow:      "0 8px 32px rgba(0,0,0,0.55)",
              transition:     "border-color 300ms, backdrop-filter 300ms",
              whiteSpace:     "nowrap",
            }}
          >
            {/* LOGO */}
            <a
              href="#home"
              style={{
                textDecoration: "none",
                display:        "flex",
                alignItems:     "center",
                gap:            12,
                padding:        "4px 18px 4px 14px",
                flexShrink:     0,
              }}
            >
              <span
                style={{
                  width:        8,
                  height:       8,
                  borderRadius: "50%",
                  background:   "#ffffff",
                  display:      "inline-block",
                  flexShrink:   0,
                }}
              />
              <span
                style={{
                  fontFamily:    "'FreshChunky', sans-serif",
                  fontSize:      22,
                  color:         "#ffffff",
                  lineHeight:    1,
                  letterSpacing: "0.04em",
                }}
              >
                AgentX
              </span>
            </a>

            {/* NAV LINKS desktop */}
            <div className="agx-links">
              {navItems.map((item, idx) => {
                const active = activeIndex === idx;
                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      padding:        "7px 14px",
                      borderRadius:   "100px",
                      textDecoration: "none",
                      cursor:         "pointer",
                      border:         active
                        ? "1px solid rgba(255,255,255,0.13)"
                        : "1px solid transparent",
                      background:     active
                        ? "rgba(255,255,255,0.09)"
                        : "transparent",
                      transition:     "background 180ms, border-color 180ms",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize:   13,
                        fontWeight: 500,
                        color:      active ? "#ffffff" : "#a3a3a3",
                        transition: "color 180ms",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.paddingLeft = "44px";
                el.style.paddingRight = "20px";
                const dot = el.querySelector(".agx-arrow") as HTMLElement;
                if (dot) { dot.style.right = "calc(100% - 36px)"; dot.style.transform = "rotate(45deg)"; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.paddingLeft = "20px";
                el.style.paddingRight = "44px";
                const dot = el.querySelector(".agx-arrow") as HTMLElement;
                if (dot) { dot.style.right = "4px"; dot.style.transform = "rotate(0deg)"; }
              }}
              style={{
                position:       "relative",
                display:        "inline-flex",
                alignItems:     "center",
                height:         "38px",
                paddingLeft:    "20px",
                paddingRight:   "44px",
                borderRadius:   "100px",
                background:     "#ffffff",
                color:          "#000000",
                fontSize:       "13px",
                fontWeight:     600,
                fontFamily:     "'Inter', sans-serif",
                textDecoration: "none",
                marginLeft:     "6px",
                marginRight:    "2px",
                flexShrink:     0,
                overflow:       "hidden",
                whiteSpace:     "nowrap",
                transition:     "padding 500ms ease",
                cursor:         "pointer",
              }}
            >
              <span style={{ position: "relative", zIndex: 10 }}>Get Started</span>
              <span
                className="agx-arrow"
                style={{
                  position:        "absolute",
                  right:           "4px",
                  width:           "30px",
                  height:          "30px",
                  borderRadius:    "50%",
                  background:      "#000000",
                  color:           "#ffffff",
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  transition:      "right 500ms ease, transform 500ms ease",
                  flexShrink:      0,
                }}
              >
                <ArrowUpRight size={14} />
              </span>
            </a>

            {/* HAMBURGER mobile only */}
            <motion.button
              className="agx-burger"
              whileTap={{ scale: 0.93 }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                background:   "transparent",
                border:       "none",
                color:        "#ffffff",
                cursor:       "pointer",
                padding:      "8px 10px",
                borderRadius: "100px",
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </nav>
        </motion.div>
      </div>

      {/* MOBILE DROPDOWN */}
      <motion.div
        className="agx-mobile"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position:     "fixed",
          top:          78,
          left:         "50%",
          transform:    "translateX(-50%)",
          width:        "calc(100vw - 32px)",
          maxWidth:     420,
          overflow:     "hidden",
          zIndex:       9998,
          background:   "rgba(5,5,5,0.97)",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
        }}
      >
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onClick={() => { setActiveIndex(idx); setMenuOpen(false); }}
            style={{
              display:        "block",
              padding:        "14px 20px",
              fontFamily:     "'Inter', sans-serif",
              fontSize:       15,
              fontWeight:     500,
              color:          activeIndex === idx ? "#ffffff" : "#a3a3a3",
              textDecoration: "none",
              borderBottom:   "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {item.label}
          </a>
        ))}
      </motion.div>
    </>
  );
}