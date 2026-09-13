import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  const touchStartX = useRef(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const allPosts = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        allPosts.sort((a, b) => {
          const getDate = (item) =>
            item.createdAt?.toDate
              ? item.createdAt.toDate()
              : new Date(item.createdAt || 0);

          return getDate(b) - getDate(a);
        });

        setArticleList(allPosts);

        const found = allPosts.find((item) => item.slug === slug);

        setPost(found || null);

        if (found) {
          const relatedPosts = allPosts
            .filter(
              (item) =>
                item.id !== found.id &&
                item.category === found.category
            )
            .slice(0, 3);

          setRelated(relatedPosts);
        }
      } catch (error) {
        console.error("Article loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const title = post.title || "FlashNews24";
    const description =
      post.description ||
      "Latest news and useful updates from FlashNews24.";

    document.title = `${title} | FlashNews24`;

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, selector.includes("[name=") ? selector.match(/name="([^"]+)"/)?.[1] : selector.match(/property="([^"]+)"/)?.[1]);
        document.head.appendChild(element);
      }

      element.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:type"]', "property", "article");

    if (post.image) {
      setMeta('meta[property="og:image"]', "property", post.image);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      `${window.location.origin}/flashnews24-new/article/${post.slug}`
    );

    return () => {
      document.title = "FlashNews24 — Latest News, India & World Updates";
    };
  }, [post]);

  if (loading) {
    return (
      <div className="article-loading">
        <h2>Loading FlashNews24...</h2>
      </div>
    );
  }



  if (!post) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <Link to="/">← Back to FlashNews24</Link>
      </div>
    );
  }

  return (
    <div className="article-site">

      <Header />

      {/* BREAKING BAR */}
      <div className="breaking-bar">
        <span className="breaking-label">BREAKING</span>
        <span>FlashNews24 — Latest news, explained clearly.</span>
      </div>

      <main
        className="article-page"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;

          const touchEndX = e.changedTouches[0].clientX;
          const distance = touchEndX - touchStartX.current;
          touchStartX.current = null;

          if (Math.abs(distance) < 70) return;

          const currentIndex = articleList.findIndex(
            (item) => item.slug === slug
          );

          if (currentIndex === -1) return;

          if (distance < 0 && currentIndex < articleList.length - 1) {
            navigate(`/article/${articleList[currentIndex + 1].slug}`);
          }

          if (distance > 0 && currentIndex > 0) {
            navigate(`/article/${articleList[currentIndex - 1].slug}`);
          }
        }}
      >

        <Link to="/" className="back-link">
          ← Back to FlashNews24
        </Link>

        <article className="article">

          <div className="article-category">
            {post.category || "NEWS"}
          </div>

          <h1>{post.title}</h1>

          {post.description && (
            <p className="article-description">
              {post.description}
            </p>
          )}

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="article-image"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          )}

          <div className="article-meta">
            <span>FlashNews24</span>
            {post.createdAt?.toDate && (
              <span>
                • {post.createdAt.toDate().toLocaleDateString("en-IN")}
              </span>
            )}
          </div>

          <div
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: (post.content || "")
                .replace(/&nbsp;/gi, " ")
                .replace(/\u00a0/g, " ")
                .replace(/([A-Za-z])(?:\r?\n|\r)+([A-Za-z])/g, "$1 $2")
                .replace(/\s{2,}/g, " ")
                 .replace(/<p>\s*(What Is AI-Based Cancer Screening\?|How Could AI Help Doctors\?|Could AI Make Healthcare More Accessible\?|What Are the Risks\?|Will AI Replace Doctors\?)\s*<\/p>/gi, "<h2>$1</h2>"),
            }}
          />

          {/* SHARE */}
          <div className="share-box">
            <strong>Share this article</strong>

            <div className="share-buttons">
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      post.title + " " + window.location.href
                    )}`,
                    "_blank"
                  )
                }
              >
                WhatsApp
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  )
                }
              >
                X
              </button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                Copy Link
              </button>
            </div>
          </div>

        </article>

        {/* RELATED NEWS */}
        {related.length > 0 && (
          <section className="related-section">

            <div className="section-heading">
              <h2>Related News</h2>
            </div>

            <div className="news-grid">

              {related.map((item) => (
                <article
                  className="news-card"
                  key={item.id}
                  onClick={() =>
                    navigate(`/article/${item.slug}`)
                  }
                >

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="image-placeholder">
                      FLASHNEWS24
                    </div>
                  )}

                  <div className="card-content">

                    <span className="category">
                      {item.category || "NEWS"}
                    </span>

                    <h3>{item.title}</h3>

                    <p>
                      {item.description ||
                        "Read the latest update on FlashNews24."}
                    </p>

                  </div>
                </article>
              ))}

            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer>
        <strong>FLASHNEWS24</strong>
        <p>Independent digital news platform.</p>
        <p>© 2026 FlashNews24</p>
      </footer>

    </div>
  );
}

export default Article;
