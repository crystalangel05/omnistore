import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [feedbackVersion, setFeedbackVersion] = useState(0);
  const feedbackTimer = useRef(null);

  useEffect(() => () => clearTimeout(feedbackTimer.current), []);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setFeedbackVersion((version) => version + 1);
    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAdded(false), 1300);
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch {
        setError("We couldn't find this product. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading product details...</p>;
  }

  if (error || !product) {
    return (
      <section className="product-detail">
        <p className="error-message">
          {error || "Product not found."}
        </p>
        <Link to="/">Back to store</Link>
      </section>
    );
  }

  return (
    <section className="product-detail">
      <Link to="/" className="back-link">
        ← Back to store
      </Link>

      <div className="product-detail-layout">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-detail-image"
        />

        <div className="product-detail-info">
          <p className="product-category">{product.category}</p>

          <h1>{product.title}</h1>

          <p className="detail-rating">
            ⭐ {product.rating} / 5
          </p>

          <p className="detail-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="detail-description">
            {product.description}
          </p>

          <p className="detail-stock">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>

          <button
            className={`add-to-cart-button${added ? " is-added" : ""}`}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            aria-live="polite"
          >
            {product.stock <= 0 ? (
              "Out of Stock"
            ) : added ? (
              <span key={feedbackVersion}>✓ Added to Cart!</span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;