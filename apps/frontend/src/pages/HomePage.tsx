import React from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import SEOHelmet from '../components/SEOHelmet';
import Tickets from '../components/Tickets';

const HomePage: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Serenamente - Experiencia de Bienestar Mental',
    description:
      'Experiencia líder en bienestar mental y transformación personal. Descubre herramientas prácticas para una vida más plena y equilibrada.',
    startDate: '2025-03-15T09:00:00-06:00',
    endDate: '2025-03-15T18:00:00-06:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Centro de Convenciones',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Principal 123',
        addressLocality: 'Ciudad de México',
        addressCountry: 'MX',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Serenamente',
      url: 'https://serenamentemexico.com',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://serenamentemexico.com',
      price: '299',
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01T00:00:00-06:00',
    },
  };

  return (
    <>
      <SEOHelmet
        title="Serenamente - Experiencia de Bienestar Mental y Transformación Personal"
        description="Únete a Serenamente, la experiencia líder en bienestar mental y transformación personal. Descubre herramientas prácticas para una vida más plena y equilibrada con expertos reconocidos."
        keywords="serenamente, conferencia bienestar mental, taller salud mental, salud mental, transformación personal, mindfulness, psicología, wellness, México, evento presencial"
        url="https://serenamentemexico.com"
        type="website"
        structuredData={structuredData}
      />
      <Hero />
      <About />
      <Mission />
      <Tickets />
      <Contact />
    </>
  );
};

export default HomePage;
