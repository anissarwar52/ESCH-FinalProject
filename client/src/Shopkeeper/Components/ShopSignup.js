import React from 'react'
import {useState} from 'react'
import { Link, NavLink, useNavigate} from "react-router-dom";
import Navbar from "../../pages/Navbar";
import TopBar from "../../pages/TopBar";
import Footer from "../../pages/Footer";
import '../../App.css';

export default function ShopSignup() {
  const navigate = useNavigate();


  let name,value;

  const [shopkeeper, setShopDistributor] = useState({
    name:"", email:"", shop:"", password:""
  });

  const handleInputs = (e) =>{
    console.log(e)
    name = e.target.name;
    value = e.target.value;
    setShopDistributor({...shopkeeper,[name]:value})
  }

  const PostData = async(e) =>{
      e.preventDefault();
      const {name, email, shop,  password} = shopkeeper;
 
      const res = await fetch("/shopkeeper/register",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name:name, email:email,shop:shop, password:password, 
      })
      
    });
    
    const data = await res.json();
    if(res.status===422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration")
    }
    else{
      window.alert("Registration Successfull");
      console.log("Registration Successfull");
      navigate("/shopkeeper/login");
    }
  
  };


  return (
    <>
     {/* <!-- Topbar Start --> */}
     <div className="container-fluid bg-dark">
          <TopBar />
        </div>
        {/* <!-- Topbar End -->} */}

        {/* <!-- Navbar Starts--> */}
        <div className="container-fluid p-0">
          <Navbar />
        </div>
        {/* <!-- Navbar Ends --> */}


        
        {/* <!-- Header Starts-->} */}

        <div className="jumbotron jumbotron-fluid mb-5">
          <div className="container text-center py-5">
            <h1 className="text-white display-3">Shopkeeper Sign Up</h1>
            <div className="d-inline-flex align-items-center text-white">
              <p className="m-0">
              <Link className="text-white" to="/">
                  Home
                </Link>
              </p>
              <i className="fa fa-circle px-3"></i>
              <p className="m-0">Shopkeeper Sign Up</p>
            </div>
          </div>
        </div>

        {/* <!-- Header Ends-->} */}

        <div className="container">
            <div className="row">
        <div class="col-lg-7"><h6 class="text-primary text-uppercase font-weight-bold">Register As Shopkeeper</h6>
        <h1 class="mb-4">Get your Registration and Get Connected with your Dashboard</h1>
        </div>
        </div>
        </div>

      {/* <!-- Shopkeeper's Registration Start --> */}

      <section className='signup'>
        <div className='container mt-6'>
            <div className="signup-content">

                <div className="signup-form">
                    <h2 className='form-title'>Sign up</h2>
                    <form method='POST' className='register-form' id='register-form'>
                        
                        <div className="form-group">
                            <label htmlFor="name">
                            <i class="zmdi zmdi-account material-icons-name"></i>
                            </label>

                            <input type="text" name="name" id="name" autoComplete='off' 
                            value={shopkeeper.name}
                            onChange={handleInputs} 
                            placeholder='Your Name'/>   
                        </div>


                        <div className="form-group">
                            <label htmlFor="email">
                            <i class="zmdi zmdi-email material-icons-name"></i>
                            </label>

                            <input type="email" name="email" id="email" autoComplete='off' 
                            value={shopkeeper.email}
                            onChange={handleInputs}
                            placeholder='Your Email'/>   
                        </div>



                        <div className="form-group">
                            <label htmlFor="shop">
                            <i class="zmdi zmdi-slideshow material-icons-name"></i>
                            </label>

                            <input type="text" name="shop" id="shop" autoComplete='off' 
                            value={shopkeeper.shop}
                            onChange={handleInputs}
                            placeholder='Your Shop'/>   
                        </div>



                        <div className="form-group">
                            <label htmlFor="password">
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            </label>

                            <input type="password" name="password" id="password" autoComplete='off' 
                            value={shopkeeper.password}
                            onChange={handleInputs}
                            placeholder='Your Password'/>   
                        </div>


                        <div ShopkeeperclassName="form-group">
                            <input type="submit" name='signup' id='signup' className='form-submit' value={"Register"} 
                            onClick={PostData}
                            /> 
                            <p className='login-link my-3'>Already have an account? <Link
                            to='/shopkeeper/login'>Login</Link></p>
                        </div>
{/*                         
                        <div className="form-group">
                        <p className="signup-image-link">Already have an account? <NavLink to="/login">Login</NavLink></p>
                        </div> */}
                        


                    </form>
                    </div>
                

       
            </div>
        </div>
        </section>

      {/* <!-- Shopkeeper's Registration Ends --> */}



      {/* <!-- Mission-Vision start --> */}

 <section className="targets">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="box fadeInUp">
                  <div className="icon-wrapper">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div className="details">
                    <h4>Mission</h4>
                    <p>
                      Our mission is to provide reliable and efficient
                      end-to-end supply chain solutions that optimize
                      businesses' processes and improve their bottom line. We
                      aim to build long-term relationships with our clients
                      based on trust, integrity, and excellence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box fadeInUp" data-delay=".2s">
                  <div className="icon-wrapper">
                    <i className="fas fa-eye"></i>
                  </div>
                  <div className="details">
                    <h4>Vision</h4>
                    <p>
                      Our vision is to become the global leader in providing
                      innovative and customized supply chain solutions. We
                      strive to be a trusted partner for businesses of all
                      sizes, helping them achieve success through streamlined
                      operations and optimized processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Mission-Vision ends --> */}

       
    

     {/* <!-- Footer Start --> */}
     <div className="Footer">
          <Footer />
        </div>
        {/* <!-- Footer End -->*/}



    </>
  )
}