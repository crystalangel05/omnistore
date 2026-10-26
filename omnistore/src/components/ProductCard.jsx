
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img
        src={product.image}
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
        <button
  className="add-to-cart-btn"
  onClick={() => onAddToCart(product)}
>
  Add to Cart
</button>
      </div>
    </article>
  );
}

export default ProductCard;