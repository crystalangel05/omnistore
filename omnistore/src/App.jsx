
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { useCart } from "./context/CartContext.jsx";

import "./App.css";
import Checkout from "./pages/Checkout.jsx";

function HomePage({
  products,
  loading,
  error,
  search,
  onSearchChange,
}) {
  const { addToCart } = useCart();
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO OMNISTORE</p>

          <h2>
            Find Your
            <br />
            Everyday Essentials.
          </h2>

          <p className="hero-description">
            Explore our collection of thoughtfully selected
            products for your everyday life.
          </p>

          <a href="#products" className="hero-button">
            Explore Collection →
          </a>
        </div>
      </section>

      <div id="products">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        {loading ? (
          <p className="status-message">Loading products...</p>
        ) : error ? (
          <p className="status-message error-message">{error}</p>
        ) : (
          <ProductGrid
            products={products}
            onAddToCart={addToCart}
            search={search}
          />
        )}

        <Cart />
      </div>
    </>
  );
}

function App() {
  const { cartCount, addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=30"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch {
        setError(
          "Sorry, we couldn't load the products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              loading={loading}
              error={error}
              search={search}
              onSearchChange={setSearch}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail onAddToCart={addToCart} />}
        />
<Route path="/checkout" element={<Checkout />} />
        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>404 - Page Not Found</h1>
              <p>Sorry, we couldn't find that page.</p>
              <Link to="/">Back to Store</Link>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;

