// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5se2cKozb_3mtmOwx8EPoj5_oq6Hd0RA",
  authDomain: "video-lists-cdea6.firebaseapp.com",
  projectId: "video-lists-cdea6",
  storageBucket: "video-lists-cdea6.appspot.com",
  messagingSenderId: "845100579215",
  appId: "1:845100579215:web:ca5fa8b57cc7f1cca973fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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