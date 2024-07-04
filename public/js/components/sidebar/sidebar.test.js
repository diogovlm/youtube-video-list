/**
 * @jest-environment jsdom
 */

const { setupSidebar } = require('./sidebar');
const { fireEvent, screen } = require('@testing-library/dom');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, auth } = require('../../firebase');

jest.mock('../../firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
}));

require('jest-fetch-mock').enableMocks();

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: '',
      reload: jest.fn(),
    },
  });

  window.alert = jest.fn();
});

describe('setupSidebar', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="sidebar-container"></div>
    `;

    fetch.mockResponseOnce(`
      <link rel="stylesheet" href="/js/components/sidebar/sidebar.css">
      <div class="sidebar">
        <button id="videosButton" class="sidebar-button">Videos</button>
        <button id="favoritesButton" class="sidebar-button">
          Favoritos
          <span id="favoriteCount" class="favorite-count">0</span>
        </button>
        <div class="auth-section">
          <input type="email" id="email" class="auth-input" placeholder="Email" required />
          <input type="password" id="password" class="auth-input" placeholder="Password" required />
          <button id="loginButton" class="auth-button">Login</button>
          <button id="recoverButton" class="auth-button">Esqueci minha senha</button>
          <button id="registerButton" class="auth-button">Registrar</button>
          <button id="logoutButton" class="auth-button">Logout</button>
        </div>
      </div>
    `);

    auth.onAuthStateChanged.mockReset();
  });

  it('should navigate to videos page when videos button is clicked', async () => {
    await setupSidebar();
    const videosButton = await screen.findByText('Videos');
    fireEvent.click(videosButton);
    expect(window.location.href).toBe('/videos');
  });

  it('should navigate to favorites page when favorites button is clicked', async () => {
    await setupSidebar();
    const favoritesButton = await screen.findByText('Favoritos');
    fireEvent.click(favoritesButton);
    expect(window.location.href).toBe('/favorites');
  });

  it('should login when login button is clicked', async () => {
    await setupSidebar();
    const emailInput = await screen.findByPlaceholderText('Email');
    const passwordInput = await screen.findByPlaceholderText('Password');
    const loginButton = await screen.findByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
  });

  it('should register when register button is clicked', async () => {
    await setupSidebar();
    const emailInput = await screen.findByPlaceholderText('Email');
    const passwordInput = await screen.findByPlaceholderText('Password');
    const registerButton = await screen.findByText('Registrar');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
  });

  it('should send password recovery email when recover button is clicked', async () => {
    await setupSidebar();
    const emailInput = await screen.findByPlaceholderText('Email');
    const recoverButton = await screen.findByText('Esqueci minha senha');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(recoverButton);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'test@example.com');
  });

  it('should logout when logout button is clicked', async () => {
    await setupSidebar();
    const logoutButton = await screen.findByText('Logout');
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
  });
});
