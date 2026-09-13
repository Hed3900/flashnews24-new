import "./MobileMenu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {open && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setOpen(false)}
        >
          <aside
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-logo">
                Flash<b>News24</b>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-menu-nav">
              <Link to="/" onClick={() => setOpen(false)}>⌂ Home</Link>
              <Link to="/category/india" onClick={() => setOpen(false)}>🇮🇳 India</Link>
              <Link to="/category/world" onClick={() => setOpen(false)}>🌍 World</Link>
              <Link to="/category/technology" onClick={() => setOpen(false)}>💻 Technology</Link>
              <Link to="/category/business" onClick={() => setOpen(false)}>📈 Business</Link>
              <Link to="/category/jobs" onClick={() => setOpen(false)}>🎓 Jobs & Education</Link>
              <Link to="/category/science" onClick={() => setOpen(false)}>🔬 Science</Link>
              <Link to="/category/entertainment" onClick={() => setOpen(false)}>🎬 Lifestyle</Link>
              <Link to="/search" onClick={() => setOpen(false)}>🔎 Search News</Link>
            </nav>

            <div className="mobile-menu-footer">
              <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <Link to="/privacy" onClick={() => setOpen(false)}>Privacy Policy</Link>
              <Link to="/disclaimer" onClick={() => setOpen(false)}>Disclaimer</Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
