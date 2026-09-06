import Achievements from './Achievements';

import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import About from './About';
// Testimonials hidden until real client testimonials are collected — see Testimonials.tsx
// import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';




import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Achievements />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;