import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../Sole Distributor/Components/navbar/Navbar';
import Sidebar from '../../../Sole Distributor/Components/Sidebar/SoleSidebar';

const BuyedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products to display per page

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('/soleDistributor/my-products');
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

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => index + 1);

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="cardContainer1">
            {currentProducts.map((item) => (
              <div key={item._id} className="card1">
                <div className="cardImage">
                  <img src={`http://localhost:4000/${item?.imageUrl}`} alt={item.title} />
                </div>
                <div className="cardTitle1">{item.title}</div>
                <div className="cardText">{item.description}</div>
                <div
                  className="cardText"
                  style={{ fontSize: '16px', fontWeight: 'bold', color: 'red', marginBottom: '10px' }}
                >
                  Quantity: {item.quantity}
                </div>
                <div className="btn5">
                  <button className="addToCartButton">Sell Products</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className="paginationButton"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`paginationButton ${currentPage === number ? 'active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="paginationButton"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastProduct >= products.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyedProducts;
