import { auth } from '../../firebase.js'

export function setupSidebar() {
  fetch('/js/components/sidebar/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      document.getElementById('videosButton').addEventListener('click', () => {
        window.location.href = '/videos';
      });
      document.getElementById('favoritesButton').addEventListener('click', () => {
        window.location.href = '/favorites';
      });
      document.getElementById('loginButton').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('User ID:', userCredential.user.uid);
          window.location.reload(); // Reload the page after login
        } catch (error) {
          console.error('Error logging in:', error.message);
        }
      });
      document.getElementById('registerButton').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User ID:', userCredential.user.uid);
          window.location.reload(); // Reload the page after registration
        } catch (error) {
          console.error('Error registering:', error.message);
        }
      });
      document.getElementById('logoutButton').addEventListener('click', async () => {
        try {
          await signOut(auth);
          console.log('User logged out');
          window.location.reload(); // Reload the page after logout
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
      });
    })
  .catch(error => console.error('Error loading sidebar:', error));
}