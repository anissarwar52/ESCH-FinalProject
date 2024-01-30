import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import {useNavigate, useParams} from "react-router-dom";
import Navbar from '../navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect  } from "react";

const UpdateCategory = () => {
    const navigate = useNavigate();
    const params = useParams();

    let name,value;
    const [categories, setCategories] = useState({
        name:""
    });

    useEffect(() => {
        getCategoryDetails();
      }, []);

      const getCategoryDetails = async () => {
        try {
          const response = await fetch(`/admin/categories/${params.id}`);
          if (response.ok) {
            const result = await response.json();
            setCategories({
              name: result.name,
            });
          } else {
            console.error('Failed to fetch Category details');
          }
        } catch (error) {
          console.error('Error fetching Category details:', error);
        }
      };  


    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setCategories({...categories, [name]:value})
    }


    const UpdateData = async (e) => {
        e.preventDefault();

        if (categories.name.trim() === '') {
            window.alert('Please fill in all required fields.');
            return;
          }

        const data = { name: categories.name }; // Create an object with the data
      
        const res = await fetch(`/admin/categories/${params.id}`, {
          method: 'PUT',
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
          window.alert('Category Updation Successful');
          console.log('Category Updation Successful');
          navigate('/admin/categories');
        }
      };
      
  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Update categories</h1>
        </div>
        <div className="bottom">

          <div className="right">
            
            <form method='POST'>                
                <div className="formInput">
                  <label>Name</label>
                  <input type="text" placeholder='Category Name' name="name" id="name" autoComplete='off' value={categories.name}  onChange={handleInputs} />
                </div>
                
                                                
                <input type="submit" name='send' id='send' value={"Update Category"} className="button"
                            onClick={UpdateData}
                            /> 


            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateCategory