import React,{useEffect} from 'react'
import Navbar from '../Components/navbar/Navbar'
import Sidebar from '../Components/sidebar/Sidebar'
import {useNavigate} from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import "../new/new.scss"
import {useParams} from 'react-router-dom'

const ProductUpdate = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [image, setImage] = useState("");

    const [product, setProduct] = useState({
      title: '',
      categoryId: '',
      description: '',
      imageUrl: '',
      price: '',
      quantity: ''
    });
  
   
    
    const [categories, setCategories] = useState([]);
    
  
    // Fetch categories from your API when the component mounts
    useEffect(() => {
      async function fetchCategories() {
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
      }
  
      fetchCategories();
    }, []);
  
    useEffect(() => {
      getProductDetails();
    }, []);
  
    const getProductDetails = async () => {
      try {
        const response = await fetch(`/admin/products/${params.id}`);
        if (response.ok) {
          const result = await response.json();
          setProduct({
            title: result.title,
            categoryId: result.category,
            description: result.description,
            imageUrl: result.imageUrl,
            price: result.price,
            quantity: result.quantity,
          });
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    };
  
    const handleCategoryChange = (e) => {
      // Update the category in the state with the selected category ID
      setProduct({
        ...product,
        categoryId: e.target.value,
      });
    };
  
    const updateProduct = async (e) => {
      e.preventDefault();
      

      
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('categoryId', product.categoryId); // Use product.category directly
      formData.append('description', product.description);
      formData.append('image', image);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
  
      console.log(formData);
      console.log(image); // Add this line to check if the image state is set correctly 
  
  
      const res = await fetch(`/admin/products/${params.id}`, {
        method: 'PUT',
        body: formData, // Correct the fetch options
      });
  
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert('Please Fill all required fields');
        console.error();
      } else {
        window.alert('Product Updation Successful');
        console.log('Product Updation Successful');
        navigate('/admin/products');
      }
    };
  
  
    return (
      <>
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>Update Product</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    product.imageUrl
                      ? `http://localhost:4000/${product.imageUrl}`
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form method="PUT">
                  <div className="formInput">
                    <label>
                      Image:
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                  </div>
  
                  <div className="formInput">
                    <label>Product Title</label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      name="title"
                      id="title"
                      autoComplete="off"
                      value={product.title}
                      onChange={handleInput}
                    />
                  </div>
  
                  <div className="formInput">
                    <label>Product Category</label>
                    <select
                      name="categoryId"
                      className="selctOptions"
                      value={product.categoryId}
                      onChange={handleCategoryChange} // Use the category change handler
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
  
  
                  <div className="formInput">
                    <label>Description</label>
                    <textarea
                      className="textArea"
                      name="description"
                      id="description"
                      autoComplete="off"
                      value={product.description}
                      onChange={handleInput}
                    ></textarea>
                  </div>
  
                  <div className="formInput">
                    <label>Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required=""
                      value={product.price}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="formInput">
                    <label>Quantity</label>
                      <input type="number" placeholder="1" name="quantity" id="quantity" value={product.quantity} onChange={handleInput} />
                </div>
  
                  <input
                    type="submit"
                    name="send"
                    id="send"
                    value="Update Product"
                    className="button"
                    onClick={updateProduct}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default ProductUpdate