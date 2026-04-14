import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Твої унікальні ключі доступу до проєкту Goaly
const firebaseConfig = {
  apiKey: "AIzaSyCUt6e9yCGOpe8KOyRqfLOu7VOojmbLrnM",
  authDomain: "goaly-app-259d0.firebaseapp.com",
  projectId: "goaly-app-259d0",
  storageBucket: "goaly-app-259d0.firebasestorage.app",
  messagingSenderId: "127490773180",
  appId: "1:127490773180:web:bff96464cef0c3fe8200b9"
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);

// Експортуємо інструменти для роботи з Реєстрацією (auth) та Базою даних (db)
export const auth = getAuth(app);
export const db = getFirestore(app);