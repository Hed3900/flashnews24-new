import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function Header() {
  return (
    <>
      <div className="top-info-bar">
        <div className="top-info-inner">
          <span>FlashNews24 — Latest News & Updates</span>
          <div className="top-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

      <header className="main-news-header">
        <div className="news-header-inner">
          <Link to="/" className="big-logo">
            Flash<span>News24</span>
          </Link>

          <nav className="main-navigation">
            <Link to="/">Home</Link>
            <Link to="/category/india">India</Link>
            <Link to="/category/world">World</Link>
            <Link to="/category/technology">Technology</Link>
            <Link to="/category/business">Business</Link>
            <Link to="/category/jobs">Jobs</Link>
            <Link to="/category/science">Science</Link>
          </nav>

          <div className="header-actions">
            <Link to="/search" className="large-search" aria-label="Search">
              🔎
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>


    </>
  );
}

export default Header;
