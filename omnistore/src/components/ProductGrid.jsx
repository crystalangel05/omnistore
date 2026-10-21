
import products from "../data/products";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid() {
  return (
    <section className="products-section">
      <div className="section-heading">
        <div>
          <p className="section-label">OUR COLLECTION</p>
          <h2>Discover Our Products</h2>
        </div>

        <p className="product-count">
          {products.length} products
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;