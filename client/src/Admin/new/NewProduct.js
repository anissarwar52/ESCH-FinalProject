import React from 'react'
import './new.scss'
import Sidebar from '../Components/sidebar/Sidebar'
import {useNavigate} from "react-router-dom";
import Navbar from '../Components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect  } from "react";

const NewProduct = () => {
    const navigate = useNavigate();

    let name,value;
    const [product, setProduct] = useState({
        title:"", imageUrl: '', description:"", categoryId:"", price:"", quantity: ""
    });
    const [image, setImage] = useState('');
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

    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setProduct({...product, [name]:value})
    }

    const handleCategoryChange = (e) => {
      // Update the category in the state with the selected category ID
      setProduct({
        ...product,
        categoryId: e.target.value,
      });
    };


    const PostData = async(e) =>{
      e.preventDefault();

      //new check
      if (product.title.trim() === '' || product.categoryId.trim() === '' || product.price.trim() === '' || product.quantity.trim() === '') {
        window.alert('Please fill in all required fields.');
        return;
      }

      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('categoryId', product.categoryId); // Use product.category directly
      formData.append('description', product.description);
      formData.append('image', image);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
  
      console.log(formData);
      console.log(image); // Add this line to check if the image state is set correctly 
  
  
      const res = await fetch('/admin/products/new', {
        method: 'POST',
        body: formData, // Correct the fetch options
      });
  
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert('Invalid Product');
        console.error();
      } else {
        window.alert('Product Submission Successful');
        console.log('Product Submission Successful');
        navigate('/admin');
      }
    };

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={image ? URL.createObjectURL(image) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>

          <div className="right">
            
            <form method='POST'>
                <div className="formInput">
                  <label htmlFor='file'>
                    Image:<DriveFolderUploadOutlinedIcon className='icon'/>
                  </label>
                  <input type="file" id="file" onChange={(e) => setImage(e.target.files[0])} style={{display:"none"}}/>
                </div>

                
                <div className="formInput">
                  <label>Title</label>
                  <input type="text" placeholder='Apple Macbook Pro' name="title" id="title" autoComplete='off' value={product.title}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Description</label>
                  <textarea
                    className="textArea"
                    name="description"
                    id="description"
                    autoComplete="off"
                    value={product.description}
                    onChange={handleInputs}
                  ></textarea>
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
                  <label>Price</label>
                  <input type="text" placeholder='100' name="price" id="price" autoComplete='off' value={product.price}  onChange={handleInputs} />
                </div>

                <div className="formInput">
                    <label>Quantity</label>
                      <input type="number" placeholder="1" name="quantity" id="quantity" value={product.quantity} onChange={handleInputs} />
                </div>
              
                                                      
                <input type="submit" name='send' id='send' value={"Send"} className="button"
                            onClick={PostData}
                            /> 


            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct