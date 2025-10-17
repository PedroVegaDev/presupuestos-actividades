import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMb87vXP0Po6zTtQwQ0AU5CmUnNgbeV_E",
  authDomain: "app-presupuesto-actividades.firebaseapp.com",
  projectId: "app-presupuesto-actividades",
  storageBucket: "app-presupuesto-actividades.firebasestorage.app",
  messagingSenderId: "595320205245",
  appId: "1:595320205245:web:eb50322683be5e0be26cd4",
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
