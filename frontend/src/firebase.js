import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI2CRH8duvxpOUZkse-IerjDcxqtLkRr0",
  authDomain: "loan-auth-project.firebaseapp.com",
  projectId: "loan-auth-project",
  storageBucket: "loan-auth-project.firebasestorage.app",
  messagingSenderId: "592205955481",
  appId: "1:592205955481:web:5de9c5124de2ffa4019308"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);