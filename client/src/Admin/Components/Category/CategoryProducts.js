import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState({});
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    // Reset selectedFilter when the category changes
    setSelectedFilter('');
  }, [id]);

  // Define filter options based on category ID
  const filterOptionsMap = {
    '65253895dfe7c07064bdf03c': ['256GB 8GB', '64GB 3GB', '64GB 4GB'],
    '652538a8dfe7c07064bdf03e': ['4GB RAM', '6GB RAM', '8GB RAM'],
    '652538b4dfe7c07064bdf040': ['32 Inch', '43 inch', '65inch'],
    '652538bddfe7c07064bdf042': ['core i3', 'core i7', 'amd a10'],
    '652538c7dfe7c07064bdf044': ['1.69 inches', '1.9 inches', '1.4 inches'],
  };

  const filterOptions = filterOptionsMap[id] || [];

  useEffect(() => {
    
    // Fetch and display products for the selected category using the 'id' parameter
    async function fetchCategoryProducts() {
      try {
        const response = await fetch(`http://localhost:4000/admin/categories/${id}/${encodeURIComponent(selectedFilter)}`);
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data);
        } else {
          console.error('Failed to fetch category products');
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    }

    fetchCategoryProducts();
  }, [id, selectedFilter]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };




  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Category: {categoryData.name}</h1>
        </div>
        <div className="list">
          <div className="listContainer">
            <div className="productTableTitle">{categoryData.name}
            
            {filterOptions.length > 0 && (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
    <label htmlFor="filter" style={{ marginRight: '9px', fontSize:'16px', color:'#672f2f' }}>
      Select Filter:
    </label>
    <select
      id="filter"
      value={selectedFilter}
      onChange={handleFilterChange}
      style={{
        padding: '8px',
        border: '1px solid rgb(69, 9, 9)',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        width:'157px'
      }}
    >
      <option value="">Select...</option>
      {filterOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)}
            
            
            
            
            </div>

            


            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th className="tableCell">Product ID</th>
                    <th className="tableCell">Image</th>
                    <th className="tableCell">Title</th>
                    <th className="tableCell">Description</th>
                    <th className="tableCell">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.products &&
                    categoryData.products.map((product, index) => (
                      <tr key={product._id}>
                        <td className="tableCell">{index + 1}</td>
                        <td className="tableCell">
                          <img src={`http://localhost:4000/${product?.imageUrl}`} alt={product.title} />
                        </td>
                        <td className="tableCell">{product.title}</td>
                        <td className="tableCell">{product.description}</td>
                        <td className="tableCell">{product.price} Rs</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
