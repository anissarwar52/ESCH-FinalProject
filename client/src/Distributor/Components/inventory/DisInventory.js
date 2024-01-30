import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../Sidebar/DisSidebar';

const DisInventory = () => {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    // Fetch low stock items from your API
    fetchLowStockItems();
  }, []);

  const fetchLowStockItems = async () => {
    try {
      const response = await fetch('/distributor/low-stock');
      const data = await response.json();
      setLowStockItems(data);
    } catch (error) {
      console.error('Error fetching low stock items:', error);
    }
  };

  return (
<>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
            <div className="lowStock" style={{marginLeft: "26px"}}>
                <h3 style={{textAlign: "center", fontSize: "21px", color: "#685959"}}>Low Inventory Items</h3>
                <p style={{color: "#750909"}}>These Products inventories are low. Request more from Distributor to manage your Inventory.</p>
            </div>

          <div className="cardContainer1">
            {lowStockItems.map((item) => (
              <div key={item._id} className="card1">
                <div className="cardImage">
                <img src={`http://localhost:4000/${item.imageUrl}`} alt={item.title} />
                </div>
                <div className="cardTitle1">
                  {item.title}
                </div>
                <div className="cardText">
                <span style={{ backgroundColor: '#ff7979', color: 'white', borderRadius: '5px', fontWeight: 'bold' }}>
                Quantity: {item.quantity}
                </span>

                </div>
                <div className="cardText">
                <Link
                    to="/distributor/request/new"
                    className="buy-link"
                    style={{
                    textDecoration: 'none',
                    color: 'blue',
                    fontWeight: 'bold',
                    transition: 'color 0.1s', // Add a smooth color transition
                    }}
                >
                    Buy from Sole Distributor
                </Link>
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisInventory;


{/* <Link to="/soleDistributor/products" className="buy-link">
Buy from Admin
</Link> */}