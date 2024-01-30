import React from "react";
import { useCart } from "../../Sole Distributor/Components/Cart/CartContext";
import Navbar from "./ShopNavbar";
import { Link } from 'react-router-dom';
import Footer from "./ShopFooter";
import "./Style/Cart.css";

const ShopCart = () => {
  const { cart, dispatch, totalItem, totalAmount } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const clearItem = (item) => {
    dispatch({ type: "CLEAR_ITEM", payload: item });
  };

  const increment = (item) => {
    dispatch({ type: "INCREMENT", payload: item });
  };

  const decrement = (item) => {
    dispatch({ type: "DECREMENT", payload: item });
  };

  return (
    <>
   
      <Navbar />
      <div className="small-container cart-page">
        <h1 className="cart-heading" style={{ marginTop: "-20px" }}>
          Shopping Cart
        </h1>
        <p className="total-items">
          You have <span className="total-items-count">{totalItem}</span> items
          in the shopping cart
        </p>
        <table className="table34">
          <thead>
            <tr>
              <th className="th-2">Product</th>
              <th className="th-2">Quantity</th>
              <th className="th-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td className="td-2">
                  <div className="cart-info">
                    <img src={`http://localhost:4000/${item?.imageUrl}`} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <small>Price: Rs.{item.price}</small>
                      <br />
                      <a href="#" onClick={() => removeFromCart(item)}>
                        Remove
                      </a>
                    </div>
                  </div>
                </td>
                <td className="td-2">
                  <div className="add-minus-quantity">
                    <i
                      className="fas fa-minus minus"
                      onClick={() => decrement(item)}
                    ></i>
                    <input type="text" placeholder={item.quantity} readOnly />
                    <i
                      className="fas fa-plus add"
                      onClick={() => increment(item)}
                    ></i>
                  </div>
                </td>
                <td className="td-2">Rs.{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price">
          <table>
            <tbody>
              <tr>
                <td className="td-2">Subtotal</td>
                <td className="td-2">Rs.{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link to="/shopkeeper/checkout">
             <button className="checkoutbtn">Checkout</button>
          </Link>
        <button className="clearbtn" onClick={() => clearItem(cart)}>
          Clear Cart
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ShopCart;
