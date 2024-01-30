import React,{useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../Sidebar/SoleSidebar'
import {useNavigate} from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import "../../../Admin/new/new.scss"
import {useParams} from 'react-router-dom'

const DistributorUpdate = () => {

  
  const navigate = useNavigate();
  const params = useParams();

  const [image, setImage] = useState("");
  let name,value;
  const [dis, setDis] = useState({
       name:"", email:"", phone:"", address :"", city :"",imageUrl: '',
  });
 
  
  useEffect(()=>{
getDisDetails();
  },[])

  const getDisDetails = async()=>{  
      try {
        console.log(params)
        const response = await fetch(`/soleDistributor/users/${params.id}`);
        if (response.ok) {
          const result = await response.json();
          setDis({
            name: result.name,
            email: result.email,
            phone: result.phone,
            address: result.address,
            city: result.city,
            imageUrl: result.imageUrl,

          });
        } else {
          console.error('Failed to fetch dis details');
        }
      } catch (error) {
        console.error('Error fetching dis details:', error);
      }
    };


  const handleInputs = (e) => {
      console.log(e)
      name = e.target.name;
      value = e.target.value;
      setDis({...dis, [name]:value})
  }

  const updateData = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',dis.name);
    formData.append('email',dis.email);
    formData.append('image', image);
    formData.append('phone',dis.phone); 
    formData.append('address',dis.address); 
    formData.append('city',dis.city); 

    console.log(formData);
    console.log(image); // Add this line to check if the image state is set correctly 


    const res = await fetch(`/soleDistributor/users/${params.id}`, {
      method: 'PUT',
      body: formData, // Correct the fetch options
      credentials: "include"
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert('Invalid sole');
      console.error();
    } else {
      window.alert('dis Updation Successful');
      console.log('dis Updation Successful');
      navigate('/soleDistributor/users');
    }
  };

return (
  <>
  <div className="new">
    <Sidebar/>
    <div className="newContainer">
      <Navbar/>
      <div className="top">
        <h1>Update Distributor</h1>
      </div>
      <div className="bottom">
        <div className="left">
        <img
                src={
                 dis.imageUrl
                    ? `http://localhost:4000/${dis.imageUrl}`
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
                <input type="text" placeholder='name' name="name" id="name" autoComplete='off' value={dis.name}  onChange={handleInputs} />
              </div>
              
              <div className="formInput">
                <label>Email</label>
                <input type="email" placeholder='email' name="email" id="email" autoComplete='off' value={dis.email}  onChange={handleInputs} />
              </div>
              
              <div className="formInput">
                <label>Phone</label>
                <input type="text" placeholder='+92 349 567 89' name="phone" id="phone" autoComplete='off' value={dis.phone}  onChange={handleInputs} />
              </div>
            
              
              <div className="formInput">
                <label>Address</label>
                <input type="text" placeholder='Police Foundation Islamabad' name="address" id="address" autoComplete='off' value={dis.address}  onChange={handleInputs} />
              </div>
              
              <div className="formInput">
                <label>city</label>
                <input type="text" placeholder='Pakistan' name="city" id="city" autoComplete='off' value={dis.city}  onChange={handleInputs} />
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

export default DistributorUpdate