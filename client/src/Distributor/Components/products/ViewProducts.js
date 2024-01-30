import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../Sidebar/DisSidebar';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('/distributor/buy-product');
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

  const handleAcceptReject = async (productId, action) => {
    try {
      const response = await fetch(`/distributor/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Refresh the product list after accepting or rejecting
        getProducts();
      } else {
        console.error('Failed to update product status.');
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
          <div className="productTableTitle">
            Buy New Products

          </div>
          <div className="cardContainer1">
            {products.map((item) => (
              <div key={item._id} className="card1" style={{marginLeft:'42px'}}>
                <div className="cardImage">
                  <img src={`http://localhost:4000/${item?.product.imageUrl}`} alt={item?.product.title || 'Unknown'} />
                </div>
                <div className="cardTitle1">
                  {item?.product.title || 'Unknown'}
                </div>
                <div className="cardText">
                  {item?.product.description || 'No description available'}
                </div>
                <div className="cardText1">
                  Rs. {item.price || 0}
                </div>
                <div className="cardText1">
                  Quantity: {item.quantity || 0}
                </div>

                <div className="tableCell" style={{display:'flex', justifyContent:'center'}}>
              <span className={`status ${item.status || 'Unknown'}`}>{item.status || 'Unknown'}</span>
                </div>

                <div className="btn5">
                  {item.status === 'pending' && (
                    <button
                      onClick={() => handleAcceptReject(item._id, 'accept')}
                      className="Button accept-button" style={{backgroundColor:'green', marginRight:'10px'}}
                    >
                      Accept
                    </button>
                  )}
                  {item.status === 'pending' && (
                    <button
                      onClick={() => handleAcceptReject(item._id, 'reject')}
                      className="Button reject-button"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
