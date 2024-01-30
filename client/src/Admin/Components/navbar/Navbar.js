import React,{ useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'; 
import "../navbar/navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {

  const {dispatch} = useContext(DarkModeContext);

  const [categories, setCategories] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsOpen2(true);
  };

  const handleMouseLeave2 = () => {
    setIsOpen2(false);
  };

  useEffect(() => {
    // Fetch categories from your API when the component mounts
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:4000/admin/categories'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder='Search...'/>
          <SearchOutlinedIcon/>
        </div>
        <div className="items">

        <div
            className="dropdown"
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            {/* Replace button with NavLink */}
            <NavLink to="/admin/categories" className="dropbtn">
              Categories
            </NavLink>
            {isOpen2 && (
              <div className="dropdown-content">
                {categories.map((category) => (
                  <NavLink
                    key={category._id}
                    to={`/admin/categories/${category._id}`} // Replace with your category route
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>


          <div className="item">
          <LanguageOutlinedIcon className='icon'/>
          English
          </div>
          <div className="item">
          <DarkModeOutlinedIcon className='icon' onClick={()=>dispatch({type:"TOGGLE"})}/>
          </div>
          
          <div className="item">
          <img src="https://zoomstudio.com.au/wp-content/uploads/jonathan-Simpson-5.jpg.webp" alt="" className='avatar'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar