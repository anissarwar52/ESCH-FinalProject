import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/SoleSidebar';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const SellProducts = () => {
  const [distributorId, setDistributorId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const [distributors, setDistributors] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of products from your API
    fetch('/admin/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    // Fetch the list of distributors from your API
    fetch('/soleDistributor/distributors')
      .then((response) => response.json())
      .then((data) => {
        setDistributors(data);
      })
      .catch((error) => {
        console.error('Error fetching distributors:', error);
      });
  }, []);

  const handleSell = async (e) => {
    console.log('Handle Sell function called');
    e.preventDefault();
    try {
      const response = await fetch('/soleDistributor/sell-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // distributorId,
          productId,
          quantity,
          price,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product Sold Successfully');
        window.alert('Product Saled Successful');
        navigate('/soleDistributor');
      } else {
        window.alert('Invalid Sell Product');
        console.error('Error selling product');
      }
    } catch (error) {
      window.alert('Error');
      console.error('Error selling product:', error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Sell Product</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Product</label>
                <select
                  name="product"
                  className="selctOptions"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className="formInput">
                <label>Distributor</label>
                <select
                  name="distributorId"
                  className="selctOptions"
                  value={distributorId}
                  onChange={(e) => setDistributorId(e.target.value)}
                >
                  <option value="">Select a Distributor</option>
                  {distributors.map((distributor) => (
                    <option key={distributor._id} value={distributor.userId._id}>
                      {distributor.userId.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="formInput">
                <label>Price</label>
                <input
                  type="text"
                  placeholder="100"
                  name="price"
                  id="price"
                  autoComplete="off"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Quantity</label>
                <input
                  type="number"
                  placeholder="1"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  style={{marginRight: '345px'}}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="button"
                onClick={handleSell}
              >
                Sell
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProducts;
