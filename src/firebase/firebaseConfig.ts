import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
    apiKey: "AIzaSyBf60c4x1mGLg_QXhWmzGasHmCipi68Fgc",
    authDomain: "mui-demo-app.firebaseapp.com",
    projectId: "mui-demo-app",
    storageBucket: "mui-demo-app.firebasestorage.app",
    messagingSenderId: "973092051700",
    appId: "1:973092051700:web:d8ad6c0b471822beec1ca1",
});

export const firebaseAuth = getAuth(app);
