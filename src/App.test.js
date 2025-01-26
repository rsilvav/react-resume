import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Obsoleto
    removeListener: () => {}, // Obsoleto
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

test('renders linkedin link', () => {
  render(<App />);
  const linkElement = screen.getByText(/linkedin/i);
  expect(linkElement).toBeInTheDocument();
});
