import React, { useEffect, useState } from 'react';
import '../navbar/Navbar.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../../context/darkModeContext';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

function Navbar() {
  const { dispatch } = useContext(DarkModeContext);

  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState('');

  const callHomePage = async () => {
    try {
      const res = await fetch('/distributor/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
      // navigate("/user/login");
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <i className="fas fa-search"></i>
        </div>
        <div className="items">
          <div className="item">
            <i className="fas fa-globe icon"></i>
            English
          </div>
          <div className="item">
          <DarkModeOutlinedIcon className='icon' onClick={()=>dispatch({type:"TOGGLE"})}/>
          </div>

          <div className="item">
            <Link to={`/distributor/profile/${userData && userData._id}`}>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://localhost:4000/${
                        userData && userData.imageUrl
                      }`
                }
                alt="User Profile"
                className="avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
