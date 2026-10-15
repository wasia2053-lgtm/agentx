import { useState } from 'react';

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
import ChatbotDemo from './ChatbotDemo';
import Process from './Process';
import FAQ from './FAQ';

import './App.css';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="app-container">
      {showLoader && <Loader onDone={() => setShowLoader(false)} />}
      <Navbar />
      <Hero />
      <ChatbotDemo />
      <Services />
      <Projects />
      <Achievements />
      <Process />
      <FAQ />
      <About />
      <Contact />
      <EmailCTA />
      <Footer />
    </div>
  );
}

export default App;
