import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

import "./App.css";

function HomePage({
  products,
  loading,
  error,
  search,
  onSearchChange,
  onAddToCart,
  cart,
  totalPrice,
  onIncrease,
  onDecrease,
  onRemove,
}) {
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
          <p className="status-message">
            Loading products...
          </p>
        ) : error ? (
          <p className="status-message error-message">
            {error}
          </p>
        ) : (
          <ProductGrid
            products={products}
            onAddToCart={onAddToCart}
            search={search}
          />
        )}

        <Cart
          cart={cart}
          totalPrice={totalPrice}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      </div>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch products from DummyJSON
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

  // Add a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Increase quantity
  const handleIncrease = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove a product
  const handleRemove = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <>
      <Header cartCount={cartCount} />

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
              onAddToCart={handleAddToCart}
              cart={cart}
              totalPrice={totalPrice}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail onAddToCart={handleAddToCart} />
          }
        />

        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>404 - Page Not Found</h1>
              <p>Sorry, we couldn't find that page.</p>
              <a href="/">Back to Store</a>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;