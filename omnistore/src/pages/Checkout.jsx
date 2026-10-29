import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./Checkout.css";


function Checkout() {
  const { cart, totalPrice, setCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter your address.";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must contain exactly 6 digits.";
    }

    if (cart.length === 0) {
      newErrors.cart = "Your cart is empty.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const generatedOrderNumber = `OMNI-${Date.now()
      .toString()
      .slice(-6)}`;

    setOrderNumber(generatedOrderNumber);
    setCart([]);
  }

  if (orderNumber) {
    return (
      <main className="checkout-page">
        <section className="order-success">
          <h1>Order Placed Successfully! 💚</h1>
          <p>Thank you for shopping with OmniStore.</p>
          <p>Your demo order number is:</p>
          <h2>{orderNumber}</h2>
          <Link to="/">Continue Shopping</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Your Details</h2>

          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            rows={3}
          />
          {errors.address && <p className="form-error">{errors.address}</p>}

          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
          />
          {errors.pincode && <p className="form-error">{errors.pincode}</p>}

          {errors.cart && <p className="form-error">{errors.cart}</p>}

          <button type="submit">Place Order</button>
        </form>

        <section className="order-summary">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <span>{item.title} × {item.qty}</span>
                <span>
                  {(item.price * item.qty).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
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
        </section>
      </div>
    </main>
  );
}

export default Checkout;