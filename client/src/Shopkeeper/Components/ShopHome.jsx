import React, { useState, useEffect } from "react";
import Navbar from "../Components/ShopNavbar";
import Footer from "../Components/ShopFooter";
import Cart from '../../Images/cart.png'
import { Link, NavLink } from "react-router-dom";
import Background from '../../Images/background.png'
import Category1 from '../../Images/category-1.jpg'
import Category2 from '../../Images/category-2.jpg'
import Category3 from '../../Images/category-3.jpg'
import { useCart } from "../../Sole Distributor/Components/Cart/CartContext";
import "./Style/Home.css";

export default function ShopHome() {
  const { cart } = useCart();
  const [products, setProducts] = useState([]);
  const [latestproducts, setLatestProducts] = useState([]);


  useEffect(() => {
    getProducts();
    getLatestProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('/shopkeeper/products-display');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getLatestProducts = async () => {
    try {
      const response = await fetch('/shopkeeper/latestproducts-display');
      if (response.ok) {
        const data = await response.json();
        setLatestProducts(data);
      } else {
        console.error('Failed to fetch products.');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <>
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

      <div class="row">
            <div class="col-2">
                <h1>DISCOVER AND SHOP <br/> THE TREND</h1>
                <p>In a world where you have unlimited choice, you need to compete for attention.<br/>And this requires something more than selling other people’s products as a result <br/>greatness will come. </p>
                <Link to={'/shopkeeper/products'} class="btn">SHOP NOW</Link>
            </div>

            <div class="col-2">
                <img src= {Background} style={{maxWidth:'537px',marginLeft:'-153px', marginTop:'-129px', padding:'-9px'}} alt=""/>
            </div>
        </div>
    </header>

{/* Feature categories */}

    <div class="categories">
    <div class="small-container">
        <div class="row" style={{marginLeft: '-136px'}}>
            <div class="col-3"><img src={Category1} alt="" style={{width:'301px',height:'301px'}}/></div>
            <div class="col-3"><img src={Category2} alt=""style={{width:'320px',height:'301px'}} /></div>
            <div class="col-3"><img src={Category3} alt="" style={{width:'301px',height:'301px',marginLeft: '18px'}}/></div>
        </div>
    </div>

</div>

{/* Feature Products */}

        <div className="small-container">
        
        
        <h2 class="title34">Featured Products</h2>
          <div className="row">
            {products.map((item) => (
              <div key={item._id} className="col-4">
                <img src={`http://localhost:4000/${item?.imageUrl}`} alt={item.title} />
                <h4>{item.title}</h4>
                <div className="rating">
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star-o" aria-hidden="true" />
                </div>
                <p className="price-shop">{item.price}</p>
              </div>
            ))}
          </div>


{/* Latest Products */}

        <h2 class="title34">Latest Products</h2>
          <div className="row">
            {latestproducts.map((item) => (
              <div key={item._id} className="col-4">
                <img src={`http://localhost:4000/${item?.imageUrl}`} alt={item.title} />
                <h4>{item.title}</h4>
                <div className="rating">
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star" aria-hidden="true" />
                  <i className="fa fa-star-o" aria-hidden="true" />
                </div>
                <p className="price-shop">{item.price}</p>
              </div>
            ))}
          </div>

        </div>





      </>
      <Footer />
    </div>
  );
}
