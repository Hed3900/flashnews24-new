
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { writeFileSync } from "fs";

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

const BASE = "https://new.flashnews24.site";

const staticUrls = [
  "/",
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

const slugs = [...new Set(
  snap.docs
    .map((doc) => doc.data()?.slug)
    .filter((slug) => typeof slug === "string" && slug.trim())
)];

const urls = [
  ...staticUrls,
  ...slugs.map((slug) => `/article/${encodeURIComponent(slug)}/`)
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${BASE}${url}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);

console.log("Firebase posts:", snap.size);
console.log("Valid article slugs:", slugs.length);
console.log("Sitemap URLs generated:", urls.length);
console.log("Sitemap written to public/sitemap.xml");
