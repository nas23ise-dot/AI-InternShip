import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDGWyz9vhDFgnyw2IMIVkGG4ma5GX-Vyl0",
    authDomain: "internship-569fd.firebaseapp.com",
    projectId: "internship-569fd",
    storageBucket: "internship-569fd.firebasestorage.app",
    messagingSenderId: "560687520124",
    appId: "1:560687520124:web:54ba63c9c96e38407f6cf9",
    databaseURL: "https://internship-569fd-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

export default app;

