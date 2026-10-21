import Header from "./components/Header.jsx";
import ProductGrid from "./components/ProductGrid";
import "./App.css";

function App() {
  return (
    <>
      <Header />

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
          <ProductGrid />
        </div>
      </main>
    </>
  );
}

export default App;