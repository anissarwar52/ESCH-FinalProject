import React from 'react'
import './new.scss'
import Sidebar from '../Components/sidebar/Sidebar'
import {useNavigate} from "react-router-dom";
import Navbar from '../Components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import userEvent from '@testing-library/user-event';

const New = ({inputs, title}) => {
  const navigate = useNavigate();

  let name,value;
  const [user, setUser] = useState({
   name:"", email:"", phone:"", profession :"", address:"", country:"", imageUrl: ""
  });
  const [image, setImage] = useState('');
  
  const handleInputs = (e) => {
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
}

const PostData = async(e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', user.name);
  formData.append('email', user.email);
  formData.append('image', image);
  formData.append('phone', user.phone); 
  formData.append('profession', user.profession); 
  formData.append('address', user.address); 
  formData.append('country', user.country); 

  console.log(formData);
  console.log(image); // Add this line to check if the image state is set correctly 


  const res = await fetch('/admin/users/new', {
    method: 'POST',
    body: formData, // Correct the fetch options
  });

  const data = await res.json();
  if (res.status === 422 || !data) {
    window.alert('Invalid Sole');
    console.error();
  } else {
    window.alert('Sole Submission Successful');
    console.log('Sole Submission Successful');
    navigate('/admin');
  }
};


  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Sole Distributor</h1>
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
                  <input type="file" id="file" onChange={e=>setImage(e.target.files[0])} style={{display:"none"}}/>
                </div>
                
                <div className="formInput">
                  <label>Name and surname</label>
                  <input type="text" placeholder='name' name="name" id="name" autoComplete='off' value={user.name}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Email</label>
                  <input type="email" placeholder='email' name="email" id="email" autoComplete='off' value={user.email}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Phone</label>
                  <input type="text" placeholder='+92 349 567 89' name="phone" id="phone" autoComplete='off' value={user.phone}  onChange={handleInputs} />
                </div>
              
                <div className="formInput">
                  <label>Profession</label>
                  <input type="text" placeholder='Sole Distributor' name="profession" id="profession" autoComplete='off' value={user.profession}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Address</label>
                  <input type="text" placeholder='address' name="address" id="address" autoComplete='off' value={user.address}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Country</label>
                  <input type="text" placeholder='Pakistan' name="country" id="country" autoComplete='off' value={user.country}  onChange={handleInputs} />
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

export default New