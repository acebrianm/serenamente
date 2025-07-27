import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import About from './About';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('About Component', () => {
  test('renders section title', () => {
    renderWithTheme(<About />);
    expect(screen.getByText('Acerca de la Conferencia')).toBeInTheDocument();
  });

  test('renders main description', () => {
    renderWithTheme(<About />);
    expect(screen.getByText(/Serenamente es más que una conferencia/)).toBeInTheDocument();
  });

  test('renders secondary description', () => {
    renderWithTheme(<About />);
    expect(screen.getByText(/Nuestros expertos internacionales compartirán/)).toBeInTheDocument();
  });

  test('renders all feature cards', () => {
    renderWithTheme(<About />);
    
    expect(screen.getByText('Expertos Reconocidos')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
    expect(screen.getByText('Experiencias Únicas')).toBeInTheDocument();
    expect(screen.getByText('Contenido Práctico')).toBeInTheDocument();
  });

  test('renders feature descriptions', () => {
    renderWithTheme(<About />);
    
    expect(screen.getByText('Conferencistas de clase mundial en psicología y bienestar')).toBeInTheDocument();
    expect(screen.getByText('Conecta con personas que comparten tu interés en el crecimiento personal')).toBeInTheDocument();
    expect(screen.getByText('Talleres interactivos y sesiones de mindfulness en vivo')).toBeInTheDocument();
    expect(screen.getByText('Herramientas y técnicas que puedes aplicar inmediatamente')).toBeInTheDocument();
  });

  test('has about section id for navigation', () => {
    renderWithTheme(<About />);
    const aboutSection = screen.getByRole('heading', { name: 'Acerca de la Conferencia' }).closest('#about');
    expect(aboutSection).toBeInTheDocument();
  });

  test('renders feature cards with proper structure', () => {
    renderWithTheme(<About />);
    
    const cards = screen.getAllByText(/Expertos Reconocidos|Networking|Experiencias Únicas|Contenido Práctico/);
    expect(cards).toHaveLength(4);
  });
});