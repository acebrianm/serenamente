import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import theme from '../theme/theme';
import Mission from './Mission';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Mission Component', () => {
  test('renders section title', () => {
    renderWithTheme(<Mission />);
    expect(screen.getByText('Nuestra Misión')).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    renderWithTheme(<Mission />);
    expect(
      screen.getByText('Transformando vidas a través del bienestar integral')
    ).toBeInTheDocument();
  });

  test('renders mission description', () => {
    renderWithTheme(<Mission />);
    expect(
      screen.getByText(/En Serenamente, creemos que cada persona merece vivir/)
    ).toBeInTheDocument();
  });

  test('renders all value propositions', () => {
    renderWithTheme(<Mission />);

    expect(screen.getByText('Bienestar Integral')).toBeInTheDocument();
    expect(screen.getByText('Conexión Natural')).toBeInTheDocument();
    expect(screen.getByText('Crecimiento Personal')).toBeInTheDocument();
  });

  test('renders value descriptions', () => {
    renderWithTheme(<Mission />);

    expect(screen.getByText(/Promovemos un enfoque holístico/)).toBeInTheDocument();
    expect(screen.getByText(/Fomentamos la reconexión con nosotros mismos/)).toBeInTheDocument();
    expect(screen.getByText(/Facilitamos herramientas prácticas/)).toBeInTheDocument();
  });

  test('renders commitment statement', () => {
    renderWithTheme(<Mission />);
    expect(screen.getByText(/Nos comprometemos a crear un espacio seguro/)).toBeInTheDocument();
  });

  test('has mission section id for navigation', () => {
    renderWithTheme(<Mission />);
    const missionSection = screen
      .getByRole('heading', { name: 'Nuestra Misión' })
      .closest('#mission');
    expect(missionSection).toBeInTheDocument();
  });
});
