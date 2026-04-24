import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import "./CSS/OrderPage.css";

function OrderPage() {
  const { cartItems, total } = useContext(CartContext);
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (cartItems.length === 0) {
        setError("Your cart is empty. Please add items before placing an order.");
        setLoading(false);
        return;
      }

      if (!formData.address || !formData.phone) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASEURL}/api/cart/order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const data = await response.json();
      setOrderConfirmation({
        order_id: data.order_id,
        total_price: data.total_price,
        message: data.message,
      });

      // Reset form
      setFormData({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
      });

      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message || "An error occurred while creating the order");
      console.error("Order creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmation) {
    return (
      <div className="order-confirmation">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p className="confirmation-message">{orderConfirmation.message}</p>
          <div className="order-details">
            <div className="detail-item">
              <span className="label">Order ID:</span>
              <span className="value">#{orderConfirmation.order_id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Total Price:</span>
              <span className="value">${parseFloat(orderConfirmation.total_price).toFixed(2)}</span>
            </div>
          </div>
          <p className="redirect-message">Redirecting to home in 3 seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-form-section">
          <h1>Checkout</h1>
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmitOrder} className="order-form">
            <div className="form-group">
              <label htmlFor="name">Full Name (Optional)</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete shipping address"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="payment_method">Payment Method</label>
              <select
                id="payment_method"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="CARD">Credit/Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="WALLET">Digital Wallet</option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Order Summary</h2>
          
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <div className="item-info">
                      <h4>{item.product_name}</h4>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(item.product_price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-footer">
                <div className="summary-total">
                  <span>Total:</span>
                  <span className="total-amount">${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
