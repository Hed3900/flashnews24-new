
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3iAhm2HzuAbq9TfTfrSxa7o10tFCMMqA",
  authDomain: "flashnews24-5bfd6.firebaseapp.com",
  projectId: "flashnews24-5bfd6",
  storageBucket: "flashnews24-5bfd6.firebasestorage.app",
  messagingSenderId: "192814639105",
  appId: "1:192814639105:web:2df1dbe341d8c33e577800",
  measurementId: "G-E2QU4FXCVM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const snap = await getDocs(collection(db, "posts"));

const slugs = [...new Set(
  snap.docs
    .map((doc) => doc.data()?.slug)
    .filter((slug) => typeof slug === "string" && slug.trim())
)];

console.log("Firebase posts found:", snap.size);
console.log("Valid article slugs:", slugs.length);
console.log("First 5 slugs:");
console.log(slugs.slice(0, 5));
