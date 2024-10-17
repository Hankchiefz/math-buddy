import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/*Rhianan Williams & Nathan Suryadi, 2024, MathBuddy FrontEnd Source code, npm 7.7.6 */