import React, { useState,useEffect } from 'react';
import Sidebar from '../Components/Sidebar/SoleSidebar'
import {useNavigate} from "react-router-dom";
import Navbar from '../Components/navbar/Navbar'
import { useCart } from '../Components/Cart/CartContext';


const Checkout = ({inputs, title}) => {
    const { clearItem } = useCart();
    const navigate = useNavigate();
  
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState('');
    const cartItems = JSON.parse(localStorage.getItem('mycart'));
  
    const CallUserData = async () => {
      try {
        const res = await fetch("/soleDistributor/profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        const data = await res.json();
        console.log(data);
        setUserData(data);
  
        if (!res.ok) {
          const error = new Error(res.statusText);
          throw error;
        }
      } catch (err) {
        console.log(err);
        navigate("/soleDistributor/cart");
      }
    };
  
    useEffect(() => {
      CallUserData();
    }, []);
  
    const handlePlaceOrder = async (e) => {
      e.preventDefault();
      const orderData = {
        address,
        orderItems: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          total: item.quantity * item.price,
        })),
      };
    
      try {
        const response = await fetch('/soleDistributor/placeOrder', {
          method: 'POST',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",  
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
          navigate('/soleDistributor');
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
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Checkout</h1>
        </div>
        <div className="bottom">

          <div className="right">
            
          <form>                
                
                <div className="formInput" style={{  marginRight: '187px'}}>
                  <label>Name</label>
                  <input type="text" placeholder='name' name="name" id="name" autoComplete='off' value={userData ? userData.name : ""} />
                </div>

                
                <div className="formInput">
                  <label>Email</label>
                  <input type="email" placeholder='email' name="email" id="email" autoComplete='off' value={userData ? userData.email : ""} />
                </div>

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
                <label>Address</label>
            <textarea
                 rows="8"
                 style={{ width: "388px" }}
                placeholder="Address"
                    value={address}
                onChange={(e) => setAddress(e.target.value)}
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
  )
}

export default Checkout