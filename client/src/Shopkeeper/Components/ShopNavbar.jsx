import React,{useState} from 'react';
import { Link, NavLink } from "react-router-dom";
import './Style/Navbar.css'; 
import LuckStoreImg from '../../Images/luckystore.png'
import Cart from '../../Images/cart.png'
import Background from '../../Images/background.png'
import { useContext } from "react";
import { useCart } from "../../Sole Distributor/Components/Cart/CartContext";

const ShopNavbar = () => {

  const { cart } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const [isOpen2, setIsOpen2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsOpen2(true);
  };

  const handleMouseLeave2 = () => {
    setIsOpen2(false);
  };

  return (
    <header>
      <div className="container">
        <div className="navbar-6">
          <div className="logo-6">
            <p>Enterprise <span className='span2'>SCH <img src={Cart} width="30px" height="30px" alt="Cart" /></span></p>
          </div>
          <nav className='nav-33'>
            <ul id="MenuItems">
              <li><Link to="/shopkeeper" style={{textDecoration:'none',color:'black',fontSize:'18px'}}>Home</Link></li>
              <li><Link to="/shopkeeper/products" style={{textDecoration:'none',color:'black',fontSize:'18px'}}>Products</Link></li>
              <li className="item">
            <Link to="/shopkeeper/cart" className="nav-link">
              <i
                className="fa fa-shopping-cart"
                style={{
                  fontSize: "24px",
                  color: "black",
                  position: "relative",
                  display: "inline-block",
                  marginLeft: "10px",
                }}
              >
                  {cart.length > 0 && (
                  <span
                    className={`cart-quantity ${
                      cart.reduce((total, item) => total + item.quantity, 0) > 0
                        ? "show"
                        : ""
                    }`}
                  >
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </i>
            </Link>
          </li>

              <li><Link to="/shopkeeper/view-complain" style={{textDecoration:'none',color:'black',fontSize:'18px'}}>Complains</Link></li>
              <li><Link to="/shopkeeper/orders" style={{textDecoration:'none',color:'black',fontSize:'18px'}}>View Order</Link></li>
              <li><Link to="/shopkeeper/orders/history" style={{textDecoration:'none',color:'black',fontSize:'18px'}}>Order history</Link></li>
              <li><Link to="/shopkeeper/logout" style={{textDecoration:'none',color:'black',fontSize:'18px'}}>Logout</Link></li>

            </ul>
          </nav>
    

        </div>

      </div>
    </header>
  );
}

export default ShopNavbar;
