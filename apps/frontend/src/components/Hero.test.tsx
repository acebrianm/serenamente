import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import theme from '../theme/theme';
import Hero from './Hero';

// Mock window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Hero Component', () => {
  test('renders main title', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Conferencia Serenamente')).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    renderWithTheme(<Hero />);
    expect(
      screen.getByText('Transformando vidas a través del bienestar mental y la serenidad')
    ).toBeInTheDocument();
  });

  test('renders description', () => {
    renderWithTheme(<Hero />);
    expect(
      screen.getByText(
        'Únete a nosotros en una experiencia única de crecimiento personal y bienestar'
      )
    ).toBeInTheDocument();
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
    const heroSection = screen
      .getByRole('heading', { name: 'Conferencia Serenamente' })
      .closest('#hero');
    expect(heroSection).toBeInTheDocument();
  });

  test('renders video element with correct attributes', () => {
    renderWithTheme(<Hero />);
    const video = document.querySelector('video');

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('poster', '/videos/hero-poster.jpg');
  });

  test('renders video sources with correct formats', () => {
    renderWithTheme(<Hero />);
    const video = document.querySelector('video');
    const sources = video?.querySelectorAll('source');

    expect(sources).toHaveLength(2);
    expect(sources?.[0]).toHaveAttribute('src', '/videos/hero-video.mp4');
    expect(sources?.[0]).toHaveAttribute('type', 'video/mp4');
    expect(sources?.[1]).toHaveAttribute('src', '/videos/hero-video.webm');
    expect(sources?.[1]).toHaveAttribute('type', 'video/webm');
  });

  test('has proper grid structure for split layout', () => {
    renderWithTheme(<Hero />);
    const grids = screen
      .getByRole('heading', { name: 'Conferencia Serenamente' })
      .closest('[class*="MuiContainer-root"]')
      ?.querySelector('[class*="MuiGrid-container"]');

    expect(grids).toBeInTheDocument();
    expect(grids?.children).toHaveLength(2); // Video section and content section
  });

  test('video section comes before content section in DOM order', () => {
    renderWithTheme(<Hero />);
    const video = document.querySelector('video');
    const title = screen.getByText('Conferencia Serenamente');

    // Video should come before title in DOM order
    const videoPosition = video?.compareDocumentPosition(title);
    expect(videoPosition && videoPosition & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  test('renders video fallback text', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Tu navegador no soporta el elemento de video.')).toBeInTheDocument();
  });

  test('has correct component structure for responsive design', () => {
    renderWithTheme(<Hero />);

    // Check that hero container exists
    const heroContainer = screen
      .getByRole('heading', { name: 'Conferencia Serenamente' })
      .closest('#hero');
    expect(heroContainer).toBeInTheDocument();

    // Check that both video and content sections exist
    const video = document.querySelector('video');
    const title = screen.getByText('Conferencia Serenamente');
    expect(video).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
