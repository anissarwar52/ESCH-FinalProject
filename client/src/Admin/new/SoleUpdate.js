import React,{useEffect} from 'react'
import Navbar from '../Components/navbar/Navbar'
import Sidebar from '../Components/sidebar/Sidebar'
import {useNavigate} from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import "../new/new.scss"
import {useParams} from 'react-router-dom'

const SoleUpdate = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [image, setImage] = useState("");
    let name,value;
    const [sole, setSole] = useState({
         name:"", email:"", phone:"", profession :"", address :"", country :"",imageUrl: '',
    });
   
    
    useEffect(()=>{
getSoleDetails();
    },[])

    const getSoleDetails = async()=>{  
        try {
          console.log(params)
          const response = await fetch(`/admin/users/${params.id}`);
          if (response.ok) {
            const result = await response.json();
            setSole({
              name: result.name,
              email: result.email,
              phone: result.phone,
              profession: result.profession,
              address: result.address,
              country: result.country,
              imageUrl: result.imageUrl,

            });
          } else {
            console.error('Failed to fetch sole details');
          }
        } catch (error) {
          console.error('Error fetching sole details:', error);
        }
      };


    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setSole({...sole, [name]:value})
    }

    const updateData = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', sole.name);
      formData.append('email', sole.email);
      formData.append('image', image);
      formData.append('phone', sole.phone); 
      formData.append('profession', sole.profession); 
      formData.append('address', sole.address); 
      formData.append('country', sole.country); 
  
      console.log(formData);
      console.log(image); // Add this line to check if the image state is set correctly 
  
  
      const res = await fetch(`/admin/users/${params.id}`, {
        method: 'PUT',
        body: formData, // Correct the fetch options
      });
  
      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert('Please Fill all required fields');
        console.error();
      } else {
        window.alert('sole Updation Successful');
        console.log('sole Updation Successful');
        navigate('/admin/users');
      }
    };

  return (
    <>
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Update Sole Distributor</h1>
        </div>
        <div className="bottom">
          <div className="left">
          <img
                  src={
                    sole.imageUrl
                      ? `http://localhost:4000/${sole.imageUrl}`
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=""
                />
          </div>

          <div className="right">
            
            <form method='POST'>
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
                  <label>Name and surname</label>
                  <input type="text" placeholder='name' name="name" id="name" autoComplete='off' value={sole.name}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Email</label>
                  <input type="email" placeholder='email' name="email" id="email" autoComplete='off' value={sole.email}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Phone</label>
                  <input type="text" placeholder='+92 349 567 89' name="phone" id="phone" autoComplete='off' value={sole.phone}  onChange={handleInputs} />
                </div>
              
                <div className="formInput">
                  <label>Profession</label>
                  <input type="text" placeholder='Sole Distributor' name="profession" id="profession" autoComplete='off' value={sole.profession}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Address</label>
                  <input type="text" placeholder='Police Foundation Islamabad' name="address" id="address" autoComplete='off' value={sole.address}  onChange={handleInputs} />
                </div>
                
                <div className="formInput">
                  <label>Country</label>
                  <input type="text" placeholder='Pakistan' name="country" id="country" autoComplete='off' value={sole.country}  onChange={handleInputs} />
                </div>

                <input type="submit" name='send' id='send' value={"Update"} className="button"
                    onClick={updateData}
                            /> 

            </form>

          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default SoleUpdate