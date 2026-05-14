import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock the CSS imports to avoid parse errors in jsdom
vi.mock('../index.css', () => ({}));
vi.mock('../App.css', () => ({}));

describe('App — User Behaviour', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    document.documentElement.style = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the app header and form', () => {
    render(<App />);
    expect(screen.getByText('Dutch Name Generator')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  it('shows the generate button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /generate dutch names/i })).toBeInTheDocument();
  });

  it('does not show results initially', () => {
    render(<App />);
    expect(screen.queryByText(/here are your dutch equivalents/i)).not.toBeInTheDocument();
  });

  it('user can type a first and last name', async () => {
    render(<App />);
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');

    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Smith');

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Smith');
  });

  it('generates results after filling form and clicking submit', async () => {
    render(<App />);

    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Smith');
    await user.click(screen.getByRole('button', { name: /generate dutch names/i }));

    // Results appear after the 800ms timeout
    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
      expect(screen.getByText(/here are your dutch equivalents/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows "Direct Translation" badge for known names', async () => {
    render(<App />);

    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.click(screen.getByRole('button', { name: /generate dutch names/i }));

    await waitFor(() => {
      expect(screen.getByText('Direct Translation')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows "Closest Match" for unknown names', async () => {
    render(<App />);

    await user.type(screen.getByLabelText('First Name'), 'Xyzabc');
    await user.type(screen.getByLabelText('Last Name'), 'Qwerty');
    await user.click(screen.getByRole('button', { name: /generate dutch names/i }));

    await waitFor(() => {
      expect(screen.getByText('Closest Match')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('user can reset results with "Try Another Name"', async () => {
    render(<App />);

    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Smith');
    await user.click(screen.getByRole('button', { name: /generate dutch names/i }));

    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    }, { timeout: 2000 });

    await user.click(screen.getByRole('button', { name: /try another name/i }));
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument();
    expect(screen.queryByText(/here are your dutch equivalents/i)).not.toBeInTheDocument();
  });

  it('shows share buttons when results are visible', async () => {
    render(<App />);

    await user.type(screen.getByLabelText('First Name'), 'Emily');
    await user.type(screen.getByLabelText('Last Name'), 'Brown');
    await user.click(screen.getByRole('button', { name: /generate dutch names/i }));

    await waitFor(() => {
      expect(screen.getByText(/share your dutch identity/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /whatsapp/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('user can select a gender preference', async () => {
    render(<App />);

    const femaleBtn = screen.getByRole('button', { name: /^female$/i });
    await user.click(femaleBtn);
    expect(femaleBtn).toHaveClass('active');

    const maleBtn = screen.getByRole('button', { name: /^male$/i });
    await user.click(maleBtn);
    expect(maleBtn).toHaveClass('active');
    expect(femaleBtn).not.toHaveClass('active');
  });

  it('user can select nationality pills', async () => {
    render(<App />);

    const spanishPill = screen.getByText('Spanish');
    await user.click(spanishPill);

    // The parent button should have the active class
    expect(spanishPill.closest('button')).toHaveClass('active');
  });

  it('disables the generate button while loading', async () => {
    render(<App />);

    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Smith');
    
    const btn = screen.getByRole('button', { name: /generate dutch names/i });
    await user.click(btn);

    // Button should be disabled during loading
    expect(btn).toBeDisabled();

    // Wait for loading to finish
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
    }, { timeout: 2000 });
  });
});

describe('App — Theme Switching', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    document.documentElement.style = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark theme', () => {
    render(<App />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('user can switch to light theme', async () => {
    render(<App />);
    await user.click(screen.getByTitle('Light Mode'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('user can switch to fun theme', async () => {
    render(<App />);
    await user.click(screen.getByTitle('Fun Mode'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('fun');
  });

  it('active theme button is highlighted', async () => {
    render(<App />);

    const darkBtn = screen.getByTitle('Dark Mode');
    const lightBtn = screen.getByTitle('Light Mode');

    expect(darkBtn).toHaveClass('active');
    expect(lightBtn).not.toHaveClass('active');

    await user.click(lightBtn);
    expect(lightBtn).toHaveClass('active');
    expect(darkBtn).not.toHaveClass('active');
  });
});

describe('App — About Modal', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    document.documentElement.style = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('about modal is not visible by default', () => {
    render(<App />);
    expect(screen.queryByText(/about dutch name generator/i)).not.toBeInTheDocument();
  });

  it('opens when user clicks the about button', async () => {
    render(<App />);
    await user.click(screen.getByTitle('About'));
    expect(screen.getByText(/about dutch name generator/i)).toBeInTheDocument();
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
  });

  it('closes when user clicks the Close button', async () => {
    render(<App />);
    await user.click(screen.getByTitle('About'));
    expect(screen.getByText(/about dutch name generator/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/about dutch name generator/i)).not.toBeInTheDocument();
  });

  it('closes when user clicks the overlay', async () => {
    render(<App />);
    await user.click(screen.getByTitle('About'));
    expect(screen.getByText(/about dutch name generator/i)).toBeInTheDocument();

    // Click the overlay (parent modal-overlay div)
    const overlay = document.querySelector('.modal-overlay');
    await user.click(overlay!);
    expect(screen.queryByText(/about dutch name generator/i)).not.toBeInTheDocument();
  });
});
