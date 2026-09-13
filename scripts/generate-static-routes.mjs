
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const firebaseConfig = {
  apiKey: "AIzaSyD3iAhm2HzuAbq9TfTfrSxa7o10tFCMMqA",
  authDomain: "flashnews24-5bfd6.firebaseapp.com",
  projectId: "flashnews24-5bfd6",
  storageBucket: "flashnews24-5bfd6.firebasestorage.app",
  messagingSenderId: "192814639105",
  appId: "1:192814639105:web:2df1dbe341d8c33e577800",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const template = readFileSync("dist/index.html", "utf8");

const routes = [
  "/about",
  "/contact",
  "/privacy",
  "/disclaimer",
  "/category/india",
  "/category/world",
  "/category/technology",
  "/category/business",
  "/category/jobs",
  "/category/science",
];

const snap = await getDocs(collection(db, "posts"));

for (const doc of snap.docs) {
  const slug = doc.data()?.slug;
  if (typeof slug === "string" && slug.trim()) {
    routes.push(`/article/${slug}`);
  }
}

const uniqueRoutes = [...new Set(routes)];

for (const route of uniqueRoutes) {
  const clean = route.replace(/^\/+|\/+$/g, "");
  const target = join("dist", clean, "index.html");

  mkdirSync(join("dist", clean), { recursive: true });
  writeFileSync(target, template);
}

console.log("Static route files generated:", uniqueRoutes.length);
console.log("Article routes:", uniqueRoutes.filter(r => r.startsWith("/article/")).length);
console.log("Category/info routes:", uniqueRoutes.filter(r => !r.startsWith("/article/")).length);
