import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar/DisSidebar";
import Navbar from "../Components/navbar/Navbar";

const AddRequest = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [experience, setExperience] = useState(''); // Initialize as an empty object
  const params = useParams();

  const callHomePage = async () => {
    try {
      const res = await fetch("/distributor/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const error = new Error(res.statusText);
        throw error;
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
      // Handle errors or navigate to another page here
    }
  };

  useEffect(() => {
    callHomePage();
  }, []); // Add callHomePage as a dependency

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setExperience(value);
  };
  
  const PostData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/distributor/request/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experience }),
        credentials: "include",
      });

      if (res.status === 201) {
        const responseData = await res.json();
        console.log(responseData);
        window.alert("Submission Successful");
        navigate("/distributor/request");
      } else {
        console.log("Invalid Submission");
        window.alert("Invalid Submission");
      }
    } catch (error) {
      console.error(error);
      window.alert("Server error");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Request For Distribution</h1>
        </div>

        <div className="bottom">
          <div className="left">
            {/* Handle the 'image' state as needed */}
          </div>

          <div className="right">
            <form method="POST" onSubmit={PostData}>
              <div className="formInput">
                <label>Name and surname</label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={userData ? userData.name : ""}
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={userData ? userData.email : ""}
                />
              </div>

              <div className="formInput">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+92 349 567 89"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={userData ? userData.phone : ""}
                />
              </div>

              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="address"
                  name="address"
                  id="address"
                  autoComplete="off"
                  value={userData ? userData.address : ""}
                />
              </div>

              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Pakistan"
                  name="city"
                  id="city"
                  autoComplete="off"
                  value={userData ? userData.city : ""}
                />
              </div>

              <div className="formInput">
  <label>Experience</label>
  <input
    type="text"
    placeholder="Experience"
    name="experience"
    id="experience"
    autoComplete="off"
    value={experience} // Ensure you access the 'experience' property
    onChange={handleInputs}
  />
</div>


              <input
                type="submit"
                name="send"
                id="send"
                value={"Send Request"}
                className="button"
                onClick={PostData}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
