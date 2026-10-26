
import "./Header.css";

function Header ({ cartCount }) {
  return (
    <header className="store-header">
      <div className="header-container">
        <h1 className="store-logo">OmniStore<span>.</span></h1>

        <div className="cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count"> Cart ({cartCount})</span>
        </div>
      </div>
    </header>
  );
}

export default Header;