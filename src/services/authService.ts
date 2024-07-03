import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    throw new Error('Error logging in: ' + (error as Error).message);
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error('Error logging out: ' + (error as Error).message);
  }
};
