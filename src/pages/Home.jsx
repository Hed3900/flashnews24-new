import "./Home.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

const categories = [
  ["INDIA", "india"],
  ["WORLD", "world"],
  ["TECHNOLOGY", "technology"],
  ["BUSINESS", "business"],
  ["JOBS & EDUCATION", "jobs"],
  ["SCIENCE", "science"],
];

function Home() {
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

        data.sort((a, b) => {
          const getDate = (p) =>
            p.createdAt?.toDate
              ? p.createdAt.toDate()
              : new Date(p.createdAt || 0);

          return getDate(b) - getDate(a);
        });

        setPosts(data);
      } catch (error) {
        console.error("Home loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const hero = posts[0];
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    if (posts.length < 2) return;

    const timer = setInterval(() => {
      setActiveHero((current) => (current + 1) % Math.min(posts.length, 5));
    }, 5000);

    return () => clearInterval(timer);
  }, [posts.length]);

  const sideStories = posts.slice(1, 5);
  const trending = posts.slice(0, 8);

  const getCategoryPosts = (category) =>
    posts
      .filter(
        (post) =>
          post.category?.toLowerCase() === category.toLowerCase()
      )
      .slice(0, 5);

  const categoryRefs = useRef({});
  const [categoryActive, setCategoryActive] = useState({});

  useEffect(() => {
    const cleanups = [];

    categories.forEach(([label, slug]) => {
      const track = categoryRefs.current[slug];
      if (!track) return;

      const updatePosition = () => {
        const cards = track.querySelectorAll(".category-feature");
        if (!cards.length) return;

        const trackLeft = track.getBoundingClientRect().left;
        let closest = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const distance = Math.abs(
            card.getBoundingClientRect().left - trackLeft
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closest = index;
          }
        });

        setCategoryActive((prev) => ({
          ...prev,
          [slug]: closest,
        }));
      };

      track.addEventListener("scroll", updatePosition, { passive: true });
      updatePosition();

      cleanups.push(() =>
        track.removeEventListener("scroll", updatePosition)
      );
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [posts.length]);

  useEffect(() => {
    const timers = [];

    categories.forEach(([label, slug]) => {
      const timer = setInterval(() => {
        const track = categoryRefs.current[slug];
        if (!track) return;

        const cards = track.querySelectorAll(".category-feature");
        if (cards.length < 2) return;

        const firstCard = cards[0];
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const step = cardWidth + gap;

        const maxScroll = track.scrollWidth - track.clientWidth;

        if (track.scrollLeft >= maxScroll - 5) {
          track.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          track.scrollBy({
            left: step,
            behavior: "smooth",
          });
        }
      }, 3000);

      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
  }, [posts.length]);

  return (
    <div className="professional-home">

      <Header />

      {/* BREAKING */}
      <div className="professional-breaking">
        <div className="breaking-title">⚡ BREAKING NEWS</div>

        <div className="breaking-scroll">
          <div className="breaking-scroll-track">
            {posts.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                to={`/article/${post.slug}`}
              >
                {post.title}
              </Link>
            ))}

            {posts.slice(0, 4).map((post) => (
              <Link
                key={`${post.id}-copy`}
                to={`/article/${post.slug}`}
              >
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="professional-main">

        {loading ? (
          <div className="professional-loading">
            Loading latest FlashNews24 stories...
          </div>
        ) : !hero ? (
          <div className="professional-loading">
            No stories available.
          </div>
        ) : (
          <>
            {/* HERO */}
            <section className="hero-news-layout">

              <div className="hero-slider">
  {posts.slice(0, 5).map((post, index) => (
    <Link
      key={post.id}
      to={`/article/${post.slug}`}
      className={`main-hero-story ${index === activeHero ? "hero-active" : ""}`}
    >
      {post.image && (
        <img
              src={post.image}
              alt={post.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
      )}

      <div className="hero-story-overlay">
        <span>{post.category || "NEWS"}</span>
        <h1>{post.title}</h1>
        <p>
          {post.description ||
            "Latest news and important updates from FlashNews24."}
        </p>
        <small>◷ FlashNews24</small>
      </div>
    </Link>
  ))}

  <div className="hero-slider-dots">
    {posts.slice(0, 5).map((post, index) => (
      <button
        key={post.id}
        type="button"
        className={index === activeHero ? "active" : ""}
        onClick={(e) => {
          e.preventDefault();
          setActiveHero(index);
        }}
        aria-label={`Show story ${index + 1}`}
      />
    ))}
  </div>
</div>

<div className="hero-side-stories">
                {sideStories.map((post) => (
                  <Link
                    to={`/article/${post.slug}`}
                    className="side-story"
                    key={post.id}
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                      />
                    )}

                    <div>
                      <span>{post.category || "NEWS"}</span>
                      <h3>{post.title}</h3>
                      <small>◷ Sep 13, 2026</small>
                    </div>
                  </Link>
                ))}
              </div>

            </section>

            {/* TRENDING + APP */}
            <section className="trend-app-section">

              <div className="trending-box">
                <div className="section-title">
                  <h2>📈 TRENDING NOW</h2>
                  <span>View All →</span>
                </div>

                {trending.map((post, index) => (
                  <Link
                    to={`/article/${post.slug}`}
                    className="trend-item"
                    key={post.id}
                  >
                    <b>{index + 1}</b>
                    <span>{post.title}</span>
                  </Link>
                ))}
              </div>

              <div className="app-promo">
                <div className="phone-symbol">📱</div>

                <div>
                  <h2>Stay Updated<br />Anywhere, Anytime</h2>
                  <p>
                    Download the FlashNews24 App for the
                    latest news, alerts and in-depth stories.
                  </p>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.flashnews24.app&listing=flashpromo"
                    target="_blank"
                    rel="noreferrer"
                    className="play-badge"
                  >
                    ▶ GET IT ON<br />
                    <strong>Google Play</strong>
                  </a>
                </div>
              </div>

            </section>

            {/* LATEST NEWS */}
            <section className="latest-news-section">
              <div className="section-title latest-news-title">
                <h2>📰 LATEST NEWS</h2>
                <span>Latest stories from FlashNews24</span>
              </div>

              <div className="latest-news-grid">
                {posts.slice(5, 17).map((post) => (
                  <Link
                    to={`/article/${post.slug}`}
                    className="latest-news-card"
                    key={post.id}
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                      />
                    )}

                    <div className="latest-news-card-content">
                      <span className="latest-news-category">
                        {post.category || "NEWS"}
                      </span>

                      <h3>{post.title}</h3>

                      <small>◷ FlashNews24</small>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            
{/* EDITOR'S PICKS */}
<section className="editors-picks-section">
  <div className="section-title editors-picks-title">
    <h2>✦ EDITOR'S PICKS</h2>
    <span>Curated stories from FlashNews24</span>
  </div>

  <div className="editors-picks-grid">
    {posts.slice(17, 22).map((post, index) => (
      <Link
        to={`/article/${post.slug}`}
        className={index === 0 ? "editor-main-card" : "editor-small-card"}
        key={post.id}
      >
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
          />
        )}

        <div className="editor-card-content">
          <span className="editor-category">
            {post.category || "NEWS"}
          </span>

          <h3>{post.title}</h3>

          <small>◷ FlashNews24</small>
        </div>
      </Link>
    ))}
  </div>
</section>

{/* CATEGORY SECTIONS */}
            <section className="category-sections">

              {categories.map(([label, slug]) => {
                const categoryPost = getCategoryPosts(label);

                return (
                  <div className="home-category" key={slug}>

                    <div className="category-heading">
                      <h2>{label}</h2>
                      <Link to={`/category/${slug}`}>
                        View All →
                      </Link>
                    </div>

                    {categoryPost.length > 0 ? (
                      <div className="category-carousel">
                        <button
                          type="button"
                          className="category-arrow category-arrow-left"
                          aria-label="Previous stories"
                          onClick={(e) => {
                            const track = e.currentTarget.parentElement.querySelector(".category-track");
                            track.scrollBy({ left: -track.clientWidth * 0.85, behavior: "smooth" });
                          }}
                        >
                          ‹
                        </button>

                        <div
                          className="category-track"
                          ref={(el) => {
                            categoryRefs.current[slug] = el;
                          }}
                        >
                          {categoryPost.map((post) => (
                            <Link
                              to={`/article/${post.slug}`}
                              className="category-feature"
                              key={post.id}
                            >
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt={post.title}
                                />
                              )}

                              <h3>{post.title}</h3>

                              <small>◷ FlashNews24</small>
                            </Link>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="category-arrow category-arrow-right"
                          aria-label="Next stories"
                          onClick={(e) => {
                            const track = e.currentTarget.parentElement.querySelector(".category-track");
                            track.scrollBy({ left: track.clientWidth * 0.85, behavior: "smooth" });
                          }}
                        >
                          ›
                        </button>

                        {categoryPost.length > 1 && (
                          <div className="category-dots">
                            {categoryPost.map((post, index) => (
                              <button
                                key={post.id}
                                type="button"
                                className={
                                  index === (categoryActive[slug] || 0)
                                    ? "active"
                                    : ""
                                }
                                aria-label={`Show ${label} story ${index + 1}`}
                                onClick={() => {
                                  const track = categoryRefs.current[slug];
                                  const card =
                                    track?.querySelectorAll(".category-feature")[index];

                                  if (track && card) {
                                    track.scrollTo({
                                      left: card.offsetLeft - 3,
                                      behavior: "smooth",
                                    });
                                  }
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="category-empty">
                        More stories coming soon
                      </div>
                    )}

                  </div>
                );
              })}

            </section>

            {/* VALUE STRIP */}
            <section className="value-strip">

              <div>
                <strong>▣</strong>
                <h3>In-Depth Articles</h3>
                <p>Explainers that help you understand the bigger picture</p>
              </div>

              <div>
                <strong>♢</strong>
                <h3>Trusted Information</h3>
                <p>Fact-based, reliable and reader-focused</p>
              </div>

              <div>
                <strong>●</strong>
                <h3>For a Better Tomorrow</h3>
                <p>News, knowledge and opportunities for everyone</p>
              </div>

              <div>
                <strong>◎</strong>
                <h3>Join Our Community</h3>
                <p>Follow us for instant updates</p>
              </div>

            </section>
          </>
        )}

      
        {/* TOP STORIES */}
        <section className="top-stories-section">
          <div className="section-title top-stories-title">
            <h2>🔥 TOP STORIES</h2>
            <span>Popular stories from FlashNews24</span>
          </div>

          <div className="top-stories-grid">
            {posts.slice(13, 19).map((post) => (
              <Link
                to={`/article/${post.slug}`}
                className="top-story-card"
                key={post.id}
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <div className="top-story-content">
                  <span className="top-story-category">
                    {post.category || "NEWS"}
                  </span>

                  <h3>{post.title}</h3>

                  <small>◷ FlashNews24</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}

export default Home;
