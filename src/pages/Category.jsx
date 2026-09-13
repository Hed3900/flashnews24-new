import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MobileMenu from "../components/MobileMenu";

function Category() {
  const { category } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    async function loadCategory() {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const data = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data(),
          }))
          .filter(
            (item) =>
              item.category?.toLowerCase() ===
              category.toLowerCase()
          );

        setPosts(data);
      } catch (error) {
        console.error("Category loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [category]);

  return (
    <div className="article-site">

      <header className="header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-flash">FLASH</span>
            <span className="brand-news">NEWS</span>
            <span className="brand-24">24</span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/category/india">India</Link>
            <Link to="/category/world">World</Link>
            <Link to="/category/business">Business</Link>
            <Link to="/category/technology">Technology</Link>
            <Link to="/category/sports">Sports</Link>
          </nav>

          <MobileMenu />
          <button className="search-btn">🔍</button>
        </div>
      </header>

      <div className="breaking-bar">
        <span className="breaking-label">BREAKING</span>
        <span>FlashNews24 — Latest news, explained clearly.</span>
      </div>

      <main className="category-page">

        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        <div className="category-header">
          <span>FLASHNEWS24</span>
          <h1>{categoryName} News</h1>
          <p>
            Latest {categoryName.toLowerCase()} news and updates
            from FlashNews24.
          </p>
        </div>

        {loading ? (
          <div className="category-loading">
            Loading {categoryName} news...
          </div>
        ) : posts.length === 0 ? (
          <div className="category-loading">
            No news found in this category.
          </div>
        ) : (
          <div className="fn24-category-grid">
            {posts.map((post) => (
              <Link
                to={`/article/${post.slug}`}
                className="fn24-category-card"
                key={post.id}
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                  />
                ) : (
                  <div className="fn24-category-placeholder">
                    FLASHNEWS24
                  </div>
                )}

                <div className="fn24-category-card-content">
                  <span className="category">
                    {post.category || "NEWS"}
                  </span>

                  <h3>{post.title}</h3>

                  <p>
                    {post.description ||
                      "Read the latest update on FlashNews24."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </main>

      <footer>
        <strong>FLASHNEWS24</strong>
        <p>Independent digital news platform.</p>
        <p>© 2026 FlashNews24</p>
      </footer>

    </div>
  );
}

export default Category;
