import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import TopBar from "../pages/TopBar";
import Footer from "../pages/Footer";
import SoleSignupImg from "../Images/SoleRegister.png";
import "../App.css";

export default function SoleSignup() {
  const navigate = useNavigate();

  let name, value;

  const [soleDistributor, setSoleDistributor] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    address: "",
    country: "",
    password: "",
    imageUrl: "",
  });
  const [image, setImage] = useState("");

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setSoleDistributor({ ...soleDistributor, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", soleDistributor.name);
    formData.append("email", soleDistributor.email);
    formData.append("phone", soleDistributor.phone);
    formData.append("profession", soleDistributor.profession);
    formData.append("address", soleDistributor.address);
    formData.append("country", soleDistributor.country);
    formData.append("password", soleDistributor.password);
    formData.append("image", image);

    const res = await fetch("/soleDistributor/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid User");
      console.log("Invalid User");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate("/soleDistributor");
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark">
        <TopBar />
      </div>
      <div className="container-fluid p-0">
        <Navbar />
      </div>

      {/* <!-- Header Starts-->} */}

      <div className="jumbotron jumbotron-fluid mb-5">
        <div className="container text-center py-5">
          <h1 className="text-white display-3">Sole Distributor Sign Up</h1>
          <div className="d-inline-flex align-items-center text-white">
            <p className="m-0">
              <Link className="text-white" to="/">
                Home
              </Link>
            </p>
            <i className="fa fa-circle px-3"></i>
            <p className="m-0">Sole Distributor Sign Up</p>
          </div>
        </div>
      </div>

      {/* <!-- Header Ends-->} */}

      <div className="container">
        <div className="row">
          <div class="col-lg-7">
            <h6 class="text-primary text-uppercase font-weight-bold">
              Register As Sole Distributor
            </h6>
            <h1 class="mb-4">
              Get your Registration and Get Connected with your Dashboard
            </h1>
          </div>
        </div>
      </div>

      {/* <!-- Sole Distributor's Registration Start --> */}

      <section className="signup">
        <div className="container mt-6">
          <div className="signup-content">
            <div className="signup-image">
              <figure>
                <img src={SoleSignupImg} alt="registration Pic" />
              </figure>
            </div>
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-account material-icons-name"></i>
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={soleDistributor.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email material-icons-name"></i>
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={soleDistributor.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                        <label htmlFor="password">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>

                        <input type="password" name="password" id="password" autoComplete='off' 
                        value={soleDistributor.password}
                        onChange={handleInputs}
                        placeholder='Your Password'/>   
                    </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                  </label>

                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={soleDistributor.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profession">
                    <i class="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>

                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    autoComplete="off"
                    value={soleDistributor.profession}
                    onChange={handleInputs}
                    placeholder="Your Profession"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">
                    <i class="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>

                  <input
                    type="text"
                    name="country"
                    id="country"
                    autoComplete="off"
                    value={soleDistributor.country}
                    onChange={handleInputs}
                    placeholder="Your Country"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <textarea
                    className="textarea1"
                    name="address"
                    id="address"
                    autoComplete="off"
                    value={soleDistributor.address}
                    onChange={handleInputs}
                    placeholder="Your Address"
                  ></textarea>
                </div>


                <div className="formInput">
                    <label>
                        Image:
                        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                    </div>


                <div className="form-group">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value={"Register"}
                    onClick={PostData}
                  />
                  <p className="login-link my-3">
                    Already have an account?{" "}
                    <Link to="/soleDistributor/signin">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Sole Distributor's Registration Ends --> */}

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
                    Our mission is to provide reliable and efficient end-to-end
                    supply chain solutions that optimize businesses' processes
                    and improve their bottom line. We aim to build long-term
                    relationships with our clients based on trust, integrity,
                    and excellence.
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
                    innovative and customized supply chain solutions. We strive
                    to be a trusted partner for businesses of all sizes, helping
                    them achieve success through streamlined operations and
                    optimized processes.
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

    </>
  );
}
