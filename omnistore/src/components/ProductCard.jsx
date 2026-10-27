import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [feedbackVersion, setFeedbackVersion] = useState(0);
  const feedbackTimer = useRef(null);

  useEffect(() => () => clearTimeout(feedbackTimer.current), []);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setFeedbackVersion((version) => version + 1);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card-link"
      >
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
          className="product-image"
        />

        <div className="product-info">
          <p className="product-category">{product.category}</p>

          <h3 className="product-title">{product.title}</h3>

          <p className="product-price">
            {product.price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      </Link>

      <div className="product-info">
        <button
          type="button"
          className={`add-to-cart-btn${added ? " is-added" : ""}`}
          onClick={handleAddToCart}
          aria-live="polite"
        >
          {added ? (
            <span key={feedbackVersion}>✓ Added to Cart!</span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
