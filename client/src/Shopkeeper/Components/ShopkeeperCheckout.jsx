import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Footer from "./ShopFooter";
import Navbar from './ShopNavbar'
import { useCart } from '../../Sole Distributor/Components/Cart/CartContext';


const ShopkeeperCheckout = ({inputs, title}) => {
    const { clearItem } = useCart();
    const navigate = useNavigate();
  
    const [userData, setUserData] = useState(null);
    const [shop, setShop] = useState('');
    const cartItems = JSON.parse(localStorage.getItem('mycart'));
  
  
    const handlePlaceOrder = async (e) => {
      e.preventDefault();
      const orderData = {
        shop,
        orderItems: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          total: item.quantity * item.price,
        })),
      };
    
      try {
        const response = await fetch('/shopkeeper/placeOrder', {
          method: 'POST',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          body: JSON.stringify(orderData),
        });
    
        if (response.ok) {
          // Order was successfully placed
          window.alert('Order placed successfully');
    
          // Clear the cart
          clearItem();
    
          // Clear items from local storage
          localStorage.removeItem('mycart');
    
          // Redirect to a different page (you can customize this URL)
          navigate('/shopkeeper');
        } else {
            console.error('Non-success response:', response.status);
            // Log the response body if needed:
            const responseBody = await response.json();
            console.error('Response body:', responseBody);
        }
      } catch (error) {
        // Handle network error
        console.error('Network error:', error);
    
        // Log the reason for the error
        console.error('Error reason:', error.message);
      }
    };
    
  

  return (
<>
<div className="new">
<div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Checkout</h1>
        </div>
        <div className="bottom">

          <div className="right">
            
          <form>                
                

                <div className="formInput">              
                {cartItems.map((item) => (     
                    <div key={item._id}>       
               
                  <label>Product Title</label>
                  <input type="text" placeholder='Title' value={item.title} />

                  <label>Total Price</label>
                  <input type="text" value={item.quantity * item.price} />
     

                  <label>Quantity</label>
                  <input type="text" value={item.quantity} />

                    </div>
                ))}
                </div>
            <div className="formInput">
                <label>Shop</label>
            <textarea
                 rows="8"
                 style={{ width: "388px" }}
                placeholder="Shop"
                    value={shop}
                onChange={(e) => setShop(e.target.value)}
                        />
                </div>

                <input type="submit" name='send' id='send' value={"Place Order"} className="button" style={{height:"40px"}}
                     onClick={handlePlaceOrder}
                            /> 
            </form>

          </div>
        </div>
        </div>
        </div>
        <Footer />
        </>
 
  )
}

export default ShopkeeperCheckout