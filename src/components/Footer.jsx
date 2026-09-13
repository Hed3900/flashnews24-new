import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="professional-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Flash<span>News24</span>
          </div>
          <p>
            Latest news, important updates and useful information from India
            and around the world.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FlashNews24. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
