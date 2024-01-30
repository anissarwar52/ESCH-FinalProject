import React from "react";
import { useCart } from "./CartContext";
import './Cart.css'; // Import your CSS file for styling
import { Scrollbars } from "react-custom-scrollbars-2";
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar/SoleSidebar";
import Navbar from "../navbar/Navbar";

const Cart = () => {
  const { cart, dispatch, totalItem, totalAmount  } = useCart();

  // Function to remove an item from the cart
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

    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      <section className="main-cart-section">
        <h1 className="cart-heading">Shopping Cart</h1>
        <p className="total-items">
          You have <span className="total-items-count">{totalItem}</span> items
          in shopping cart
        </p>

        <div className="cart-items">
          <div className="cart-items-container">
            <Scrollbars style={{ width: 800, height: 300 }}>
            {cart.map((item) => (
              <div className="items-info">
                
                <div className="product-img">
                <img src={`http://localhost:4000/${item?.imageUrl}`}/>
                </div>
                
                <div className="title">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                
                <div className="add-minus-quantity">
                  <i
                    class="fas fa-minus minus"
                    onClick={() => decrement(item)}
                  ></i>
                  <input type="text" placeholder={item.quantity} readOnly  />
                  <i class="fas fa-plus add" onClick={() => increment(item)}></i>
                </div>

                <div className="price">
                  <h3>${item.price}</h3>
                </div>

                <div className="remove-item">
                  <i
                    class="fas fa-trash-alt remove"
                    onClick={() => removeFromCart(item)}
                  ></i>
                </div>
              </div>
            ))}
            </Scrollbars>
          </div>
        </div>

        <div className="card-total">
        <h3 style={{ fontSize: '20px' }}>
            Cart Total: <span>${totalAmount}</span>
          </h3>
          <Link to="/soleDistributor/checkout">
             <button className="checkoutbtn">Checkout</button>
          </Link>
          <button className="clearbtn" onClick={clearItem}>
            Clear Cart
          </button>
        </div>
      </section>

    </div>
    </div>
  );
};

export default Cart;
