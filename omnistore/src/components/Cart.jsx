
function Cart ({ cart, totalPrice, onIncrease, onDecrease, onRemove,})


{
return ( <section className="cart"> <h2>Your Shopping Cart</h2>

  {cart.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    cart.map((item) => (
      <div className="cart-item" key={item.id}>
        <h3>{item.title}</h3>

        <p>
          Price: {item.price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>

        <div className="cart-controls">
          <button onClick={() => onDecrease(item.id)}>
          </button>

          <span>{item.qty}</span>

          <button onClick={() => onIncrease(item.id)}>
            +
          </button>

          <button onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>

        <p>
          Subtotal: {(item.price * item.qty).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </div>
    ))
  )}
  <h3>
  Total: {totalPrice.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  })}
</h3>
</section>

);
}

export default Cart;
