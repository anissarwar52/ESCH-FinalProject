import React, { useEffect, useState } from "react";
import "../navbar/Navbar.scss";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";
import { useCart } from "../Cart/CartContext";

function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const { cart } = useCart();

  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("");

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
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>

          <div className="item">
            <Link to="/soleDistributor/cart" className="nav-link">
              <i
                className="fa fa-shopping-cart"
                style={{
                  fontSize: "24px",
                  color: "black",
                  position: "relative",
                  display: "inline-block",
                  marginLeft: "10px",
                }}
              >
                {cart.length > 0 && (
                  <span
                    className={`cart-quantity ${
                      cart.reduce((total, item) => total + item.quantity, 0) > 0
                        ? "show"
                        : ""
                    }`}
                  >
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </i>
            </Link>
          </div>

          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Link to={`/soleDistributor/profile/${userData && userData._id}`}>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://localhost:4000/${userData && userData.imageUrl}`
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
