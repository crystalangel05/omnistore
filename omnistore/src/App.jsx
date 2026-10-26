import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid";
import "./App.css";
import { useState } from "react";
import Cart from "./components/Cart";

function App() {

const [cart, setCart] =useState([])
const [search, setSearch] = useState("");

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


const handleIncrease = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  );
};

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

const handleRemove = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
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

      <main>
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
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
          <ProductGrid onAddToCart={handleAddToCart} search={search} />
          <Cart
          cart={cart}
          totalPrice={totalPrice}
  onIncrease={handleIncrease}
  onDecrease={handleDecrease}
  onRemove={handleRemove}
/>
        </div>
      </main>
    </>
  );
}

export default App;