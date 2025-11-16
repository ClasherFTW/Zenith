import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCag2n_FheSaWRUhDmYAGFfsPHO3MJOlM8",
  authDomain: "zenith-86909.firebaseapp.com",
  projectId: "zenith-86909",
  storageBucket: "zenith-86909.firebasestorage.app",
  messagingSenderId: "941537001671",
  appId: "1:941537001671:web:e1c2db0e19aa2e7414bee2",
  measurementId: "G-7X74TV6BNK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
