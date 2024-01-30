import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../Sidebar/DisSidebar';

const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // Number of products to display per page

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch('/distributor/buy-history');
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="productTableTitle">
            Buyed Products History
          </div>
          <div className="cardContainer1">
            {currentProducts.map((item) => (
              <div key={item._id} className="card1" style={{ marginLeft: '42px', flexBasis:'21%' }}>
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

                <div className="tableCell" style={{ display: 'flex', justifyContent: 'center' }}>
                  <span className={`status ${item.status || 'Unknown'}`}>{item.status || 'Unknown'}</span>
                </div>

                <div className="btn5">
                  {item.status === 'pending' && (
                    <button
                      onClick={() => handleAcceptReject(item._id, 'accept')}
                      className="Button accept-button" style={{ backgroundColor: 'green', marginRight: '10px' }}
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
          {/* Pagination */}
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

export default ProductHistory;
