import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from '../../firebase.js';

export function setupSidebar() {
  fetch('/js/components/sidebar/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);

      const videosButton = document.getElementById('videosButton');
      const favoritesButton = document.getElementById('favoritesButton');
      const loginButton = document.getElementById('loginButton');
      const registerButton = document.getElementById('registerButton');
      const logoutButton = document.getElementById('logoutButton');
      const recoverButton = document.getElementById('recoverButton');
      const authSection = document.querySelector('.auth-section');

      videosButton.addEventListener('click', () => {
        window.location.href = '/videos';
      });

      favoritesButton.addEventListener('click', () => {
        window.location.href = '/favorites';
      });

      loginButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('User ID:', userCredential.user.uid);
          window.location.reload();
        } catch (error) {
          console.error('Error logging in:', error.message);
        }
      });

      registerButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User ID:', userCredential.user.uid);
          window.location.reload();
        } catch (error) {
          console.error('Error registering:', error.message);
        }
      });

      logoutButton.addEventListener('click', async () => {
        try {
          await signOut(auth);
          console.log('User logged out');
          window.location.reload();
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
      });

      recoverButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        if (email) {
          try {
            await sendPasswordResetEmail(auth, email);
            console.log('Password recovery email sent');
            alert('Password recovery email sent. Please check your inbox.');
          } catch (error) {
            console.error('Error sending password recovery email:', error.message);
            alert('Error sending password recovery email. Please try again.');
          }
        } else {
          alert('Please enter your email address.');
        }
      });

      auth.onAuthStateChanged(user => {
        authSection.innerHTML = '';
        if (user) {
          const userEmailDisplay = document.createElement('p');
          userEmailDisplay.textContent = user.email;
          userEmailDisplay.className = 'user-email';
          authSection.appendChild(userEmailDisplay);

          const logoutBtn = document.createElement('button');
          logoutBtn.id = 'logoutButton';
          logoutBtn.className = 'auth-button';
          logoutBtn.textContent = 'Logout';
          authSection.appendChild(logoutBtn);

          logoutBtn.addEventListener('click', async () => {
            try {
              await signOut(auth);
              console.log('User logged out');
              window.location.reload();
            } catch (error) {
              console.error('Error logging out:', error.message);
            }
          });
        } else {
          const emailInput = document.createElement('input');
          emailInput.type = 'email';
          emailInput.id = 'email';
          emailInput.className = 'auth-input';
          emailInput.placeholder = 'Email';
          emailInput.required = true;
          authSection.appendChild(emailInput);

          const passwordInput = document.createElement('input');
          passwordInput.type = 'password';
          passwordInput.id = 'password';
          passwordInput.className = 'auth-input';
          passwordInput.placeholder = 'Password';
          passwordInput.required = true;
          authSection.appendChild(passwordInput);

          const loginBtn = document.createElement('button');
          loginBtn.id = 'loginButton';
          loginBtn.className = 'auth-button';
          loginBtn.textContent = 'Login';
          authSection.appendChild(loginBtn);

          loginBtn.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;
            try {
              const userCredential = await signInWithEmailAndPassword(auth, email, password);
              console.log('User ID:', userCredential.user.uid);
              window.location.reload();
            } catch (error) {
              console.error('Error logging in:', error.message);
            }
          });
          
          const recoverBtn = document.createElement('button');
          recoverBtn.id = 'recoverButton';
          recoverBtn.className = 'auth-button';
          recoverBtn.textContent = 'Esqueci minha senha';
          authSection.appendChild(recoverBtn);

          recoverBtn.addEventListener('click', async () => {
            const email = emailInput.value;
            if (email) {
              try {
                await sendPasswordResetEmail(auth, email);
                console.log('Password recovery email sent');
                alert('Password recovery email sent. Please check your inbox.');
              } catch (error) {
                console.error('Error sending password recovery email:', error.message);
                alert('Error sending password recovery email. Please try again.');
              }
            } else {
              alert('Please enter your email address.');
            }
          });

          const registerBtn = document.createElement('button');
          registerBtn.id = 'registerButton';
          registerBtn.className = 'auth-button';
          registerBtn.textContent = 'Register';
          authSection.appendChild(registerBtn);

          registerBtn.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              console.log('User ID:', userCredential.user.uid);
              window.location.reload();
            } catch (error) {
              console.error('Error registering:', error.message);
            }
          });
        }
      });
    })
    .catch(error => console.error('Error loading sidebar:', error));
}
