import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Tickets from './components/Tickets';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Hero />
        <About />
        <Mission />
        <Tickets />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
