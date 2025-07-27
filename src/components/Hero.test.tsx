import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import Hero from './Hero';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Hero Component', () => {
  test('renders main title', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Conferencia Serenamente')).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Transformando vidas a través del bienestar mental y la serenidad')).toBeInTheDocument();
  });

  test('renders description', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Únete a nosotros en una experiencia única de crecimiento personal y bienestar')).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Comprar Entradas')).toBeInTheDocument();
    expect(screen.getByText('Saber Más')).toBeInTheDocument();
  });

  test('CTA buttons have correct styling', () => {
    renderWithTheme(<Hero />);
    
    const buyButton = screen.getByText('Comprar Entradas');
    const learnMoreButton = screen.getByText('Saber Más');
    
    expect(buyButton.closest('button')).toHaveClass('MuiButton-contained');
    expect(learnMoreButton.closest('button')).toHaveClass('MuiButton-outlined');
  });

  test('has hero section id for navigation', () => {
    renderWithTheme(<Hero />);
    const heroSection = screen.getByRole('heading', { name: 'Conferencia Serenamente' }).closest('#hero');
    expect(heroSection).toBeInTheDocument();
  });
});