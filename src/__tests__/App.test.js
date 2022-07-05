import { render, screen } from '@testing-library/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App.js';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;


it('renders without crashing', () => {
  const container = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
