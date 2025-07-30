import React from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Tickets from '../components/Tickets';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Tickets />
      <Contact />
    </>
  );
};

export default HomePage;
