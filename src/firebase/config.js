import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqgQQgv-AWjAnoELFwBH1aX7EsrZ9KUgU",
  authDomain: "fir-9-start-feab0.firebaseapp.com",
  projectId: "fir-9-start-feab0",
  storageBucket: "fir-9-start-feab0.appspot.com",
  messagingSenderId: "1067436930724",
  appId: "1:1067436930724:web:04c96e038e375962d85831",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

export { db };
