// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

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

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loadFavorites(user.uid);
    } else {
      console.log('No user is logged in');
    }
  });
});

async function loadFavorites(userUid) {
  if (!userUid) {
    return;
  }

  try {
    const response = await fetch(`/api/favorites/${userUid}`);
    const favorites = await response.json();

    if (response.ok) {
      updateFavoriteCount(favorites.length);
      console.log(userUid)
    } else {
      console.error('Failed to load favorites:', favorites.message);
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
}

function updateFavoriteCount(count) {
  const favoriteCountElement = document.getElementById('favoriteCount');
  favoriteCountElement.textContent = count;
}

export { auth, app, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut }