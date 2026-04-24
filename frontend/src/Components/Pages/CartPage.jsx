import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import './CSS/CartPage.css';

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log(cartItems);
    console.log(total)
   

    return (
        <div className="cart-detail">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div className="cart-detail-page">
                    {cartItems.map((item) => (
                        <div className="item-id" key={item.id}>
                            <div className="cart-product-image">
                                {item.product_image && (
                                    <img
                                        src={`${BASEURL}${item.product_image}`}
                                        alt={item.product_name}
                                    />
                                )}
                            </div>
                            <div className="item-detail">
                                <h2>{item.product_name}</h2>
                                <p>${item.product_price}</p>
                            </div>
                            <div className="update-quantity">
                                <button className="update-quantity-button-negative"
                                    onClick={() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                    }
                                >
                                    -

                                </button>
                                <span>{item.quantity}</span>
                                <button className="update-quantity-button-positive"
                                    onClick={() =>
                                        updateQuantity(item.id, item.quantity + 1)
                                    }
                                >
                                    +
                                </button>
                                <button className="remove-button"
                                    onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="total-value">
                        <h2>Total</h2>
                        <p>${Number(total ?? 0).toFixed(2)}</p>
                    </div>
                    <button 
                        className="checkout-button"
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    )
}
export default CartPage;