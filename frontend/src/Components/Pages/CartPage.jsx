import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import './CSS/CartPage.css';

function CartPage(){
    const {cartItems, removeFromCart, updateQuantity} = useContext(CartContext);

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );

    return(
        <div className="cart-detail">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div className="cart-detail-page">
                    {cartItems.map((item) => (
                        <div className="item-id" key={item.id}>
                            <div>
                                <h2>{item.name}</h2>
                                <p>${item.price}</p>
                            </div>
                            <div className="update-quantity">
                            <button className="update-quantity-button-negative"
                                    onClick = {() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                    }
                            >
                                -
                                
                                </button>
                                <span>{item.quantity}</span>
                                <button className="update-quantity-button-positive"
                                    onClick = {() =>
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
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
export default CartPage;