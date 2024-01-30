import React from 'react'
import '../../../Admin/new/new.scss'
import Sidebar from '../Sidebar/SoleSidebar'
import {useNavigate} from "react-router-dom";
import Navbar from '../navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const DistributorNew = ({inputs, title}) => {
  const navigate = useNavigate();

  let name,value;
  const [user, setUser] = useState({
   name:"", email:"", phone:"", address:"", city:"", imageUrl: ""
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
  formData.append('address', user.address); 
  formData.append('city', user.city); 

  console.log(formData);
  console.log(image); // Add this line to check if the image state is set correctly 


  const res = await fetch('/soleDistributor/users/new', {
    method: 'POST',
    body: formData, // Correct the fetch options
    credentials: "include",
  });

  const data = await res.json();
  if (res.status === 422 || !data) {
    window.alert('Invalid Dis');
    console.error();
  } else {
    window.alert('Dis Submission Successful');
    console.log('Dis Submission Successful');
    navigate('/soleDistributor');
  }
};


  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Distributor</h1>
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
                  <label>Address</label>
                  <input type="text" placeholder='address' name="address" id="address" autoComplete='off' value={user.address}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>city</label>
                  <input type="text" placeholder='Pakistan' name="city" id="city" autoComplete='off' value={user.city}  onChange={handleInputs} />
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

export default DistributorNew