import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Sole Distributor/Components/navbar/Navbar";
import Sidebar from "../../../Sole Distributor/Components/Sidebar/SoleSidebar";
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("");
  const params = useParams();
  const [isFileSelected, setIsFileSelected] = useState(false);

  const callHomePage = async () => {
    try {
      const res = await fetch("/soleDistributor/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.ok) {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.log(err);
      //   navigate("/user/login");
    }
  };

  useEffect(() => {
    callHomePage();
  }, []); // Add callHomePage as a dependency

  const handleEditProfileClick = async (e) => {
    e.preventDefault();

    if (!isFileSelected) {
      window.alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`/soleDistributor/profile/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Invalid File Type");
        console.log("Invalid File Type");
      } else {
        window.alert("Picture Updation Successful");
        console.log("Picture Updation Successful");
        navigate("/soleDistributor");
      }
    } catch (err) {
      console.log(err);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />

          <div className="container emp-profile">
            <form onSubmit={handleEditProfileClick}>
              <div className="row">
                <div className="fileInputContainer">
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setIsFileSelected(!!e.target.files[0]);
                    }}
                    className="profile"
                  />
                  <label className="customFileButton">Choose File</label>
                </div>
                <div className="col-md-4">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `http://localhost:4000/${
                            userData && userData.imageUrl
                          }`
                    }
                    alt="User Profile"
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="submit"
                    name="send"
                    id="send"
                    value={"Update Profile Picture"}
                    className="buttonLink3"
                    onClick={handleEditProfileClick}
                  />
                </div>

                <div className="col-md-6">
                  <div className="profile-head">
                    <h5>{userData && userData.name}</h5>
                    <h6>{userData && userData.profession}</h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8 pl-5 about-info">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>User ID</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData && userData._id}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData && userData.name}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData && userData.email}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Phone Number</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData && userData.phone}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>Address</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData && userData.address}</p>
                        </div>
                        <div className="col-md-6">
                          <label>Country</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData && userData.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Profile;
