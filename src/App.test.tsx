import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders the main app structure', () => {
    render(<App />);
    
    expect(screen.getAllByText('Serenamente')).toHaveLength(2); // Navbar and Footer
    expect(screen.getByText('Conferencia Serenamente')).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    render(<App />);
    
    expect(screen.getByText('Acerca de la Conferencia')).toBeInTheDocument();
    expect(screen.getByText('Nuestra Misión')).toBeInTheDocument();
    expect(screen.getAllByText('Entradas')).toHaveLength(3); // Navbar, Section title, Footer
    expect(screen.getAllByText('Contacto')).toHaveLength(4); // Navbar, Section title, Footer navigation, Footer section
  });

  test('renders navigation menu', () => {
    render(<App />);
    
    expect(screen.getAllByText('Inicio')).toHaveLength(2); // Navbar and Footer
    expect(screen.getAllByText('Acerca de')).toHaveLength(2); // Navbar and Footer
    expect(screen.getAllByText('Misión')).toHaveLength(2); // Navbar and Footer
    expect(screen.getAllByText('Entradas')).toHaveLength(3); // Navbar, Section title, Footer
    expect(screen.getAllByText('Contacto')).toHaveLength(4); // Navbar, Section title, Footer navigation, Footer section
  });
});
