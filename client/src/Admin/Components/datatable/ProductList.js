import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products to display per page

  useEffect(() => {
    getProducts();
    fetchCategories();
  }, []);

  const getProducts = async () => {
    let result = await fetch('/admin/products');
    result = await result.json();
    setProducts(result);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`/admin/products/${id}`, {
      method: 'Delete',
    });

    if (result.status === 200) {
      alert('Product is Deleted');
      navigate('/admin');
    } else {
      console.log('Error deleting Product');
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />

          <div className="productTableTitle">
            Products
            <Link to="/admin/products/new" style={{ textDecoration: 'none' }} className="newLink">
              Add New Products
            </Link>
          </div>
          <div className="tableContainer">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">Product ID</TableCell>
                    <TableCell className="tableCell">Image</TableCell>
                    <TableCell className="tableCell">Title</TableCell>
                    <TableCell className="tableCell">Category</TableCell>
                    <TableCell className="tableCell">Price</TableCell>
                    <TableCell className="tableCell">Quantity</TableCell>
                    <TableCell className="tableCell" style={{ display: 'flex' }}>
                      Operations
                    </TableCell>
                  </TableRow>
                </TableHead>

                {currentProducts.map((item, index) => (
                  <TableBody>
                    <TableRow key={item._id}>
                      <TableCell className="tableCell">{indexOfFirstProduct + index + 1}</TableCell>
                      <TableCell className="tableCell">
                        {<img src={`http://localhost:4000/${item?.imageUrl}`} alt={item.title} />}
                      </TableCell>
                      <TableCell className="tableCell">{item.title}</TableCell>
                      <TableCell className="tableCell">
                        {categories.find((cat) => cat._id === item.category)?.name}
                      </TableCell>
                      <TableCell className="tableCell">{item.price} Rs</TableCell>
                      <TableCell className="tableCell">{item.quantity}</TableCell>
                      <TableCell className="tableCell">
                        <div className="deleteButton" onClick={() => deleteProduct(item._id)}>
                          Delete
                        </div>
                        <Link to={`/admin/products/${item._id}`} className="buttonLink">
                          Update
                        </Link>
                        <Link to={`/admin/products/${item._id}/details`} className="detailLink">
                          Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
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
      </div>
    </>
  );
};

export default ProductList;
