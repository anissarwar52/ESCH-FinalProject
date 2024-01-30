import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import {useNavigate} from "react-router-dom";
import Navbar from '../navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect  } from "react";

const NewCategory = () => {
    const navigate = useNavigate();

    let name,value;
    const [categories, setCategories] = useState({
        name:""
    });


    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setCategories({...categories, [name]:value})
    }


    const PostData = async (e) => {
        e.preventDefault();
              
      //new check
      if (categories.name.trim() === '') {
        window.alert('Please fill in all required fields.');
        return;
      }
        const data = { name: categories.name }; // Create an object with the data
      
        const res = await fetch('/admin/categories/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify(data), // Convert the data to a JSON string
        });
      
        const responseData = await res.json();
        if (res.status === 422 || !responseData) {
          window.alert('Invalid category');
          console.error();
        } else {
          window.alert('Category Submission Successful');
          console.log('Category Submission Successful');
          navigate('/admin/categories');
        }
      };
      
  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New categories</h1>
        </div>
        <div className="bottom">

          <div className="right">
            
            <form method='POST'>                
                <div className="formInput">
                  <label>Name</label>
                  <input type="text" placeholder='Category Name' name="name" id="name" autoComplete='off' value={categories.name}  onChange={handleInputs} />
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

export default NewCategory