import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      } catch (error) {
        console.error("Search loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const keyword = initialQuery.trim().toLowerCase();

  const results = keyword
    ? posts.filter((post) => {
        const text = [
          post.title,
          post.description,
          post.category,
          post.content,
          post.keywords,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(keyword);
      })
    : [];

  function handleSearch(e) {
    e.preventDefault();

    const value = query.trim();

    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div className="professional-home">

      <Header />

      <main className="search-page">

        <div className="search-heading">
          <span>FLASHNEWS24</span>
          <h1>Search News</h1>
          <p>
            Find stories, topics and updates from FlashNews24.
          </p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            autoFocus
          />

          <button type="submit">
            Search
          </button>
        </form>

        {loading ? (
          <div className="search-status">
            Loading news...
          </div>
        ) : keyword ? (
          <>
            <div className="search-result-heading">
              <h2>
                Search results for “{initialQuery}”
              </h2>

              <span>
                {results.length} result
                {results.length !== 1 ? "s" : ""}
              </span>
            </div>

            {results.length > 0 ? (
              <div className="search-grid">
                {results.map((post) => (
                  <Link
                    to={`/article/${post.slug}`}
                    className="news-card"
                    key={post.id}
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                      />
                    ) : (
                      <div className="image-placeholder">
                        FLASHNEWS24
                      </div>
                    )}

                    <div className="card-content">
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
            ) : (
              <div className="search-status">
                No matching stories found.
              </div>
            )}
          </>
        ) : (
          <div className="search-status">
            Enter a keyword to search FlashNews24.
          </div>
        )}

      </main>

      <footer className="professional-footer">
        <div>
          <div className="footer-logo">
            Flash<b>News24</b>
          </div>
          <p>© 2026 FlashNews24. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Search;
