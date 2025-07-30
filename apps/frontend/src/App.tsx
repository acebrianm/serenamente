import { CssBaseline, ThemeProvider } from '@mui/material';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Navbar from './components/Navbar';
import Tickets from './components/Tickets';
import theme from './theme/theme';

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
// test comment
