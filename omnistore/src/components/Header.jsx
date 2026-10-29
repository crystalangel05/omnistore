import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import "./Header.css";

function Header() {
  const { cartCount } = useCart();

  const previousCartCount = useRef(cartCount);
  const [animationVersion, setAnimationVersion] = useState(0);

  useEffect(() => {
    if (cartCount > previousCartCount.current) {
      setAnimationVersion((version) => version + 1);
    }

    previousCartCount.current = cartCount;
  }, [cartCount]);

  return (
    <header className="store-header">
      <div className="header-container">
        <h1 className="store-logo">
          OmniStore<span>.</span>
        </h1>

        <div className="cart">
          <span className="cart-icon">🛒</span>
          <span
            key={animationVersion}
            className="cart-count"
            aria-live="polite"
            aria-atomic="true"
          >
            Cart ({cartCount})
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;