
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
const BASE = "https://new.flashnews24.site";

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

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripHtml = (value = "") =>
  String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const descriptionFor = (post) => {
  const text = stripHtml(
    post.description ||
    post.excerpt ||
    post.content ||
    ""
  );

  return text.length > 160
    ? `${text.slice(0, 157).trim()}...`
    : text;
};

const absoluteImageUrl = (value) => {
  if (!value) return "";

  try {
    return new URL(value, BASE).href;
  } catch {
    return "";
  }
};

const snap = await getDocs(collection(db, "posts"));

const posts = snap.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

const articlePosts = [];

for (const post of posts) {
  const slug = typeof post.slug === "string" ? post.slug.trim() : "";

  if (slug) {
    routes.push(`/article/${slug}`);
    articlePosts.push(post);
  }
}

const postByRoute = new Map(
  articlePosts.map((post) => [
    `/article/${typeof post.slug === "string" ? post.slug.trim() : ""}`,
    post,
  ])
);

const uniqueRoutes = [...new Set(routes)];

for (const route of uniqueRoutes) {
  const clean = route.replace(/^\/+|\/+$/g, "");
  const target = join("dist", clean, "index.html");

  mkdirSync(join("dist", clean), {
    recursive: true,
  });

  const canonicalUrl =
    BASE + (route === "/" ? "/" : route);

  let page = template;

  const post = postByRoute.get(route);

  if (post) {
    const title =
      post.title || "FlashNews24";

    const description =
      descriptionFor(post) ||
      "Latest news and useful updates from FlashNews24.";

    const image =
      absoluteImageUrl(post.image);

    page = page.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(title)} | FlashNews24</title>`
    );

    page = page.replace(
      /<meta\s+name=["']description["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:title["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:description["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:type["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:url["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:image["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:image:width["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+property=["']og:image:height["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+name=["']twitter:card["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+name=["']twitter:title["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+name=["']twitter:description["'][^>]*>/gi,
      ""
    );

    page = page.replace(
      /<meta\s+name=["']twitter:image["'][^>]*>/gi,
      ""
    );

    const socialMeta = `
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="FlashNews24" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    ${image ? `<meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    ${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ""}
`;

    page = page.replace(
      "</head>",
      `${socialMeta}\n</head>`
    );
  }

  page = page.replace(
    /<link\s+rel=["']canonical["'][^>]*>/gi,
    ""
  );

  page = page.replace(
    "</head>",
    `  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />\n</head>`
  );

  writeFileSync(target, page);

  if (!existsSync(target)) {
    throw new Error(`STATIC ROUTE FAILED: ${route}`);
  }
}

const missingArticleRoutes = articlePosts.filter((post) => {
  const slug = typeof post.slug === "string" ? post.slug.trim() : "";
  if (!slug) return false;
  const target = join("dist", "article", slug, "index.html");
  return !existsSync(target);
});

if (missingArticleRoutes.length > 0) {
  console.error("MISSING ARTICLE ROUTES:");
  for (const post of missingArticleRoutes) {
    console.error(`- ${post.slug}`);
  }
  throw new Error(
    `Static route validation failed: ${missingArticleRoutes.length} article route(s) missing.`
  );
}

console.log(
  "Static route validation: PASSED"
);

console.log(
  "Static route files generated:",
  uniqueRoutes.length
);

console.log(
  "Article routes:",
  articlePosts.length
);

console.log(
  "Category/info routes:",
  uniqueRoutes.filter(
    (r) => !r.startsWith("/article/")
  ).length
);

console.log(
  "Article social preview metadata: ENABLED"
);
