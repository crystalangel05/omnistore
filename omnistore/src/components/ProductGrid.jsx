import ProductCard from "./ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products, onAddToCart, search }) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="products-section">
      <div className="section-heading">
        <div>
          <p className="section-label">OUR COLLECTION</p>
          <h2>Discover Our Products</h2>
        </div>

        <p className="product-count">
          {filteredProducts.length} products
        </p>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;