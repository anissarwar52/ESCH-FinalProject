import React, { useState, useEffect } from 'react';
import '../Sidebar/soleSidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../context/darkModeContext';
import { useContext } from 'react';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch and update the low stock count when the component mounts
    fetchLowStockCount().then((count) => setLowStockCount(count));
    callHomePage();
  }, []);

  const fetchLowStockCount = async () => {
    try {
      const response = await fetch('/soleDistributor/low-stock');
      const lowStockItems = await response.json();
      return lowStockItems.length;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      return 0;
    }
  };

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


    callHomePage();


  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/soleDistributor" style={{ textDecoration: 'none' }}>
          <span className="logo1">ESCH Sole Distributor</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/soleDistributor" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon1" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/soleDistributor/applications" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon1" />
              <span>Applications</span>
            </li>
          </Link>
          <Link to="/soleDistributor/applications/status" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon1" />
              <span>Applications Status</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/soleDistributor/users" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineOutlinedIcon className="icon1" />
              <span>Distributors</span>
            </li>
          </Link>
          <Link to="/soleDistributor/products" style={{ textDecoration: 'none' }}>
            <li>
              <LocalMallIcon className="icon1" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/soleDistributor/trending" style={{ textDecoration: 'none' }}>
            <li>
              <LocalMallIcon className="icon1" />
              <span> Trending Products</span>
            </li>
          </Link>

          <Link to="/soleDistributor/orders" style={{ textDecoration: 'none' }}>
            <li>
              <ShoppingCartIcon className="icon1" />
              <span>Orders</span>
            </li>
          </Link>

          <Link to="/soleDistributor/orders/history" style={{ textDecoration: 'none' }}>
            <li>
              <ShoppingCartIcon className="icon1" />
              <span>Orders History</span>
            </li>
          </Link>

          <Link to="/soleDistributor/cart" style={{ textDecoration: 'none' }}>
            <li>
              <LocalShippingIcon className="icon1" />
              <span>Cart</span>
            </li>
          </Link>

          <Link to="/soleDistributor/my-products" style={{ textDecoration: 'none' }}>
            <li>
              <LocalMallIcon className="icon1" />
              <span>Inventory</span>
            </li>
          </Link>

          <Link to="/soleDistributor/sell-products" style={{ textDecoration: 'none' }}>
            <li>
              <LocalMallIcon className="icon1" />
              <span>Sell Products</span>
            </li>
          </Link>

          <p className="title">USEFUL</p>

          <Link to="/soleDistributor/inventory" style={{ textDecoration: 'none' }}>
          <li>
            <NotificationsIcon className="icon1" />
            <span>Notifications</span>
            {lowStockCount > 0 && <div className="notification-badge">{lowStockCount}</div>}
          </li>
          </Link>

          <p className="title">USER</p>
          <Link to={`/soleDistributor/profile/${userData && userData._id}`} style={{ textDecoration: 'none' }}>
          <li>
            <AccountCircleIcon className="icon1" />
            <span>Profile</span>
          </li>
          </Link>

          <li>
            <Link to={'/soleDistributor/logout'} style={{ textDecoration: 'none' }}>
              <LogoutIcon className="icon1" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption1" onClick={() => dispatch({ type: 'LIGHT' })}></div>
        <div className="colorOption1" onClick={() => dispatch({ type: 'DARK' })}></div>
      </div>
    </div>
  );
};

export default Sidebar;
