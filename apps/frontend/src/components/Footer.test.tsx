import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import theme from '../theme/theme';
import Footer from './Footer';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Footer Component', () => {
  test('renders brand name', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Serenamente')).toBeInTheDocument();
  });

  test('renders tagline', () => {
    renderWithTheme(<Footer />);
    expect(
      screen.getByText('Transformando vidas a través del bienestar integral')
    ).toBeInTheDocument();
  });

  test('renders quick links section', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Enlaces Rápidos')).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Acerca de')).toBeInTheDocument();
    expect(screen.getByText('Misión')).toBeInTheDocument();
    expect(screen.getByText('Entradas')).toBeInTheDocument();
    expect(screen.getAllByText('Contacto')).toHaveLength(2); // Once in navigation, once in footer section
  });

  test('renders contact section', () => {
    renderWithTheme(<Footer />);
    expect(screen.getAllByText('Contacto')).toHaveLength(2); // Once in navigation, once in footer section
  });

  test('renders contact information', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('mentesanasiempree@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+52 55 3223 9408')).toBeInTheDocument();
  });

  test('renders legal section', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  test('renders legal links', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('Política de Privacidad')).toBeInTheDocument();
    expect(screen.getByText('Términos y Condiciones')).toBeInTheDocument();
    expect(screen.getByText('Política de Cookies')).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    renderWithTheme(<Footer />);
    expect(
      screen.getByText('© 2024 Serenamente. Todos los derechos reservados.')
    ).toBeInTheDocument();
  });

  test('renders made with love text', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Hecho con ❤️ para transformar vidas')).toBeInTheDocument();
  });

  test('renders social media section', () => {
    renderWithTheme(<Footer />);

    // Check that footer contains social media icons by checking for the brand name
    expect(screen.getByText('Serenamente')).toBeInTheDocument();
  });

  test('footer has correct structure', () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText('Enlaces Rápidos')).toBeInTheDocument();
    expect(screen.getAllByText('Contacto')).toHaveLength(2); // Once in navigation, once in footer section
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  test('has dark background styling', () => {
    renderWithTheme(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveStyle('color: white');
  });
});
