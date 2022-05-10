import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCgpPoHfxFbelxrBgvfJZ5ayk2mlvEpnpk',
  authDomain: 'e-commerce-67ca1.firebaseapp.com',
  projectId: 'e-commerce-67ca1',
  storageBucket: 'e-commerce-67ca1.appspot.com',
  messagingSenderId: '861579857940',
  appId: '1:861579857940:web:6617f955b2506e7a6bd701',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
