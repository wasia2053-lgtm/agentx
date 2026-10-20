import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import Achievements from './Achievements';

import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import About from './About';
// Testimonials hidden until real client testimonials are collected — see Testimonials.tsx
// import Testimonials from './Testimonials';
import Contact from './Contact';
import EmailCTA from './EmailCTA';
import Footer from './Footer';
import Loader from './Loader';
import SmoothScroll from './SmoothScroll';
import AgentXChatWidget from './AgentXChatWidget';
import Process from './Process';
import FAQ from './FAQ';

import './App.css';

/**
 * Thin gradient scroll-progress bar pinned to the very top —
 * scroll motion is always visible, never a question.
 */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 9998,
        background: '#ffffff',
        transformOrigin: '0 50%', scaleX,
      }}
    />
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  // The robot must be rendered BEFORE the loader lifts, so the hero
  // banner is never blank after the logo animation.
  const [robotReady, setRobotReady] = useState(false);

  return (
    <div className="app-container">
      <AnimatePresence>
        {showLoader && <Loader onDone={() => setShowLoader(false)} ready={robotReady} />}
      </AnimatePresence>
      <SmoothScroll locked={showLoader} />
      <ScrollProgress />
      <Navbar />
      <Hero onReady={() => setRobotReady(true)} />
      <Services />
      <Projects />
      <Achievements />
      <Process />
      <FAQ />
      <About />
      <Contact />
      <EmailCTA />
      <Footer />
      <AgentXChatWidget />
    </div>
  );
}

export default App;
