import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const authProvider = {
  login: async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error.message);
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error.message);
    }
  },
  checkAuth: () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) resolve();
        else reject();
      });
    });
  },
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
};
