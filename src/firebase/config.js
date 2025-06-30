import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjWo1y9qdxQozUi8AJYX80HpRO1bggD8w",
  authDomain: "meesho-frontend.firebaseapp.com",
  projectId: "meesho-frontend",
  storageBucket: "meesho-frontend.firebasestorage.app",
  messagingSenderId: "201659308231",
  appId: "1:201659308231:web:9dec8a39bac2036c8406e2",
  measurementId: "G-674SR0VW8R"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth to use in authSlice
export const auth = getAuth(app);