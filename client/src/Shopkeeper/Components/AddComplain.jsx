import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./ShopNavbar";
import Footer from "./ShopFooter";
import './Style/Complain.css'

export default function AddComplain() {
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of products from your API
    fetch('/shopkeeper/products-display')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
      
  }, []);

  const handleComplain = async () => {
    try {
      const response = await fetch('/shopkeeper/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, productId }),
      })

      if (response.ok) {
        const data = await response.json();
        console.log('Complain send Successfully');
        window.alert('Complain Send Successfully');
        navigate('/shopkeeper');
      } else {
        window.alert('Invalid Complain');
        console.error('Error Complain');
      }
    } catch (error) {
      window.alert('Error');
      console.error('Error selling Complain:', error);
    }
  };

  return (
<div>
      <>
        <Navbar />

        <div className="add-complain-container">
          <h2 className="add-complain-heading">Add Complaint</h2>


          <label htmlFor="productId" className="add-complain-label">
            Product:
          </label>
          <select
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="add-complain-select"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
              </option>
            ))}
          </select>


          <label htmlFor="title" className="add-complain-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-complain-input"
          />


          <button onClick={handleComplain} className="add-complain-button">
            Add Complaint
          </button>
        </div>
      </>
      <Footer />
    </div>
  );
}
