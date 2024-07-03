// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    initializeFavoriteModel(user.uid);
  } else {
    console.log('No user is logged in');
  }
});

async function initializeFavoriteModel(userId) {
  try {
    const response = await fetch(`/api/initFavoriteModel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (response.ok) {
      console.log('Favorite model initialized');
    } else {
      console.error('Failed to initialize favorite model');
    }
  } catch (error) {
    console.error('Error initializing favorite model:', error);
  }
}

export { auth, app }