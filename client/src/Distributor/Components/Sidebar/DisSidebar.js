import React, { useEffect, useState } from 'react';
import '../Sidebar/DisSidebar.scss';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../context/darkModeContext';
import { useContext } from 'react';

const DisSidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [userData, setUserData] = useState(null);

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
  const fetchLowStockCount = async () => {
    try {
      const response = await fetch('/distributor/low-stock');
      const lowStockItems = await response.json();
      return lowStockItems.length;
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      return 0;
    }
  };

  useEffect(() => {
    callHomePage();
    fetchLowStockCount().then((count) => setLowStockCount(count));
  }, []);

  return (
    <div className="sidebarDis">
      <div className="topDis">
        <Link to="/distributor" style={{ textDecoration: 'none' }}>
        <i className="fa fa-user icon1" style={{color: "#107b9f"}}></i><span className="logo1">Distributor Dashboard</span>
        </Link>
      </div>
   
      <div className="centerDis">
        <ul>
          <p className="titleDis">MAIN</p>
          <Link to="/distributor" style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-home icon1"></i>
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="titleDis">LISTS</p>
          <Link to="/distributor/request/new" style={{ textDecoration: 'none' }}>
            <li>
              <i className="fa fa-user icon1"></i>
              <span>Join Distribution Team</span>
            </li>
          </Link>

          <Link to="/distributor/requests" style={{ textDecoration: 'none' }}>
            <li>
              <i className="fas fa-chart-line icon1"></i>
              <span>Request Status</span>
            </li>
          </Link>

          <Link to="/distributor/products" style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-shopping-bag icon1"></i>
              <span>Buy Products</span>
            </li>
          </Link>

          <Link to="/distributor/buy-history" style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-shopping-bag icon1"></i>
              <span>Buy History</span>
            </li>
          </Link>

          <Link to="/distributor/my-products" style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-shopping-bag icon1"></i>
              <span>Inventory</span>
            </li>
          </Link>

          <Link to="/distributor/salesteam" style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-shopping-bag icon1"></i>
              <span>Sales Team</span>
            </li>
            </Link>
            <Link to="/distributor/task" style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-shopping-bag icon1"></i>
              <span>Tasks</span>
            </li>
            </Link>


          <p className="titleDis">USEFUL</p>

          <Link to={"/distributor/inventory"} style={{ textDecoration: 'none' }}>
            <li>
            <i className="fa fa-bell icon1"></i>
            <span>Notifications</span>
            {lowStockCount > 0 && <div className="notification-badge">{lowStockCount}</div>}
            </li>
          </Link>
{/* 
          <p className="titleDis">SERVICE</p>
          <li>
            <i className="fa fa-truck icon1"></i>
            <span>Orders</span>
          </li> */}

          <Link to={'/distributor/orders'}>
            <li>
            <i className="fa fa-shopping-cart icon1"></i>
            <span>New Orders</span>
            </li>
          </Link>
          <Link to={'/distributor/orders/history'}>
            <li>
            <i className="fa fa-shopping-cart icon1"></i>
            <span>Orders History</span>
            </li>
          </Link>



          <Link to={'/distributor/complains'}>
            <li>
            <i className="fa fa-shopping-cart icon1"></i>
            <span>View Complains</span>
            </li>
          </Link>

          <p className="titleDis">USER</p>

          <Link to={`/distributor/profile/${userData && userData._id}`}>
          <li>
            <i className="fa fa-user-circle icon1"></i>
            <span>Profile</span>
          </li>
          </Link>

            <Link to={'/distributor/logout'} style={{ textDecoration: 'none' }}>
            <li>
              <i className="fas fa-sign-out-alt icon1"></i>
              <span>Logout</span>
            </li>
            </Link>

        </ul>
      </div>
      <div className="bottomDis">
        <div className="colorOption1" onClick={() => dispatch({ type: 'LIGHT' })}></div>
        <div className="colorOption1" onClick={() => dispatch({ type: 'DARK' })}></div>
      </div>
    </div>
  );
};

export default DisSidebar;
