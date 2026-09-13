import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";
import Search from "./pages/Search";
import InfoPage from "./pages/InfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<InfoPage page="about" />} />
        <Route path="/contact" element={<InfoPage page="contact" />} />
        <Route path="/privacy" element={<InfoPage page="privacy" />} />
        <Route path="/disclaimer" element={<InfoPage page="disclaimer" />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
