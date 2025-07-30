import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import theme from '../theme/theme';
import Contact from './Contact';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

describe('Contact Component', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  test('renders section title', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  test('renders subtitle', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('¿Tienes preguntas? Estamos aquí para ayudarte')).toBeInTheDocument();
  });

  test('renders contact form title', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('Envíanos un mensaje')).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    renderWithTheme(<Contact />);

    // Check that form fields are present by their input types
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(3); // name, email, message fields
  });

  test('renders submit button', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('Enviar Mensaje')).toBeInTheDocument();
  });

  test('renders contact method cards', () => {
    renderWithTheme(<Contact />);

    expect(screen.getAllByText('WhatsApp')).toHaveLength(2); // Contact card and CTA button
    expect(screen.getAllByText('Email')).toHaveLength(2); // Contact card and CTA button
  });

  test('renders contact information', () => {
    renderWithTheme(<Contact />);

    expect(screen.getAllByText('contacto@serenamente.info')).toHaveLength(1); // Contact section only (footer uses link)
  });

  test('renders call-to-action section', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('¡Contáctanos ahora!')).toBeInTheDocument();
  });

  test('form submission opens mailto link', () => {
    renderWithTheme(<Contact />);

    const submitButton = screen.getByText('Enviar Mensaje');
    fireEvent.click(submitButton);

    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('mailto:contacto@serenamente.info')
    );
  });

  test('WhatsApp button opens correct URL', () => {
    renderWithTheme(<Contact />);

    const whatsappButtons = screen.getAllByText('WhatsApp');
    fireEvent.click(whatsappButtons[0]);

    expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/'), '_blank');
  });

  test('has contact section id for navigation', () => {
    renderWithTheme(<Contact />);
    const contactSection = screen.getByRole('heading', { name: 'Contacto' }).closest('#contact');
    expect(contactSection).toBeInTheDocument();
  });
});
