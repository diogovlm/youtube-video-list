const { signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { auth } = require('../config/firebase-config.js');

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    throw new Error('Error logging in: ' + error.message);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error('Error logging out: ' + error.message);
  }
};

module.exports = { loginUser, logoutUser };
