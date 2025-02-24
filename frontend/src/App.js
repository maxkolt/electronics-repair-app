import React, { useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax'; // Импортируем ParallaxProvider
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Стиль для AOS

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <ParallaxProvider> {/* Оборачиваем все в ParallaxProvider */}
      <div className="App">
        <Header />
        <Hero />
        <Services />
        <Advantages />
        <ContactForm />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default App;
