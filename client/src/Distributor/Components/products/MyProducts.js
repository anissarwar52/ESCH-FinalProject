import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../Sidebar/DisSidebar';


const MyProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('/distributor/my-products');
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


  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="cardContainer1">
          {products.map((item) => (
            <div key={item._id} className="card1">
              <div className="cardImage">
                <img src={`http://localhost:4000/${item.imageUrl}`} alt={item.title || 'Unknown'} />
              </div>
              <div className="cardTitle1">
                {item.title || 'Unknown'}
              </div>
              <div className="cardText">
                {item.description || 'No description available'}
              </div>
              <div className="cardText" style={{ fontSize: "16px", fontWeight: "bold", color: "red", marginBottom: "10px" }}>
                Quantity: {item.quantity || 0}
              </div>
            </div>
          ))}
        </div>

        </div>
      </div>
    </>
  );
};

export default MyProducts;
