import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import theme from '../theme/theme';
import Tickets from './Tickets';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Tickets Component', () => {
  test('renders section title', () => {
    renderWithTheme(<Tickets />);
    expect(screen.getByText('Entradas')).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    renderWithTheme(<Tickets />);
    expect(
      screen.getByText('¡Asegura tu lugar en esta experiencia transformadora!')
    ).toBeInTheDocument();
  });

  test('renders urgency message', () => {
    renderWithTheme(<Tickets />);
    expect(screen.getByText('Cupos Limitados - ¡Solo quedan pocas entradas!')).toBeInTheDocument();
  });

  test('renders both ticket types', () => {
    renderWithTheme(<Tickets />);

    expect(screen.getByText('Acceso General')).toBeInTheDocument();
    expect(screen.getByText('VIP Experience')).toBeInTheDocument();
  });

  test('renders ticket prices', () => {
    renderWithTheme(<Tickets />);

    const prices = screen.getAllByText(/\$150|\$300/);
    expect(prices.length).toBeGreaterThan(0);
  });

  test('renders original prices (crossed out)', () => {
    renderWithTheme(<Tickets />);

    const originalPrices = screen.getAllByText(/\$200|\$400/);
    expect(originalPrices.length).toBeGreaterThan(0);
  });

  test('renders buy now buttons', () => {
    renderWithTheme(<Tickets />);

    const buyButtons = screen.getAllByText('Comprar Ahora');
    expect(buyButtons).toHaveLength(2);
  });

  test('renders event information', () => {
    renderWithTheme(<Tickets />);

    expect(screen.getByText('Marzo 15-16, 2024')).toBeInTheDocument();
    expect(screen.getByText('Centro de Convenciones Internacional')).toBeInTheDocument();
    expect(screen.getByText('2 días completos de transformación')).toBeInTheDocument();
  });

  test('renders guarantee text', () => {
    renderWithTheme(<Tickets />);
    expect(
      screen.getByText('Garantía de satisfacción del 100% o devolución del dinero')
    ).toBeInTheDocument();
  });

  test('VIP ticket shows popular badge', () => {
    renderWithTheme(<Tickets />);
    expect(screen.getByText('Más Popular')).toBeInTheDocument();
  });

  test('renders ticket features', () => {
    renderWithTheme(<Tickets />);

    expect(screen.getByText('Acceso completo a todas las conferencias')).toBeInTheDocument();
    expect(screen.getByText('Sesión exclusiva con los ponentes')).toBeInTheDocument();
    expect(screen.getByText('Networking exclusivo')).toBeInTheDocument();
  });

  test('has tickets section id for navigation', () => {
    renderWithTheme(<Tickets />);
    const ticketsSection = screen.getByRole('heading', { name: 'Entradas' }).closest('#tickets');
    expect(ticketsSection).toBeInTheDocument();
  });
});
