import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";


function Cart() {
  const {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <section className="cart">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <h3>{item.title}</h3>

            <p>
              Price:{" "}
              {item.price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>

            <div className="cart-controls">
              <button onClick={() => decreaseQuantity(item.id)}>
                -
              </button>

              <span>{item.qty}</span>

              <button onClick={() => increaseQuantity(item.id)}>
                +
              </button>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>

            <p>
              Subtotal:{" "}
              {(item.price * item.qty).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
        ))
      )}

      <h3>
        Total:{" "}
        {totalPrice.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </h3>
  {cart.length > 0 && (
  <Link to="/checkout" className="checkout-button">
    Proceed to Checkout →
  </Link>
)}
    </section>
  );
}

export default Cart;