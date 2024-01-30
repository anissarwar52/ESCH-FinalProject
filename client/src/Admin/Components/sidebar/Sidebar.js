import React from 'react'
import './sidebar.scss'
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
import {Link} from "react-router-dom"
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";


const Sidebar = () => {

    const {dispatch} = useContext(DarkModeContext);

  return (
    <div className="sidebar">
        <div className="top">
            <Link to="/admin" style={{textDecoration:"none"}}>
            <span className="logo">ESCH Admin</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul style={{lineHeight: "29px"}}>
                <p className="title">MAIN</p>
                <Link to="/admin" style={{textDecoration:"none"}}>
                <li>
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to="/admin/users" style={{textDecoration:"none"}}>
                <li>
                    <PersonOutlineOutlinedIcon className="icon"/>
                    <span>Sole Distributors</span>
                </li>
                </Link>
              
                <Link to="/admin/categories" style={{textDecoration:"none"}}>
                <li>
                    <LocalMallIcon className="icon" />
                    <span>Categories</span>
                </li>
               
                </Link>
                <Link to="/admin/products" style={{textDecoration:"none"}}>
                <li>
                <LocalMallIcon className="icon" />
                    <span>Products</span>
                </li>
                </Link>

                <Link to = "/admin/order" style={{textDecoration:"none"}}>
                <li>
                <ShoppingCartIcon className="icon" />
                    <span>New Orders</span>
                </li>
                </Link>

                <Link to = "/admin/order/history" style={{textDecoration:"none"}}>
                <li>
                <ShoppingCartIcon className="icon" />
                    <span>Orders History</span>
                </li>
                </Link>
                <Link to="/admin/trend/" style={{textDecoration:"none"}}>
                <li>
                <LocalMallIcon className="icon" />
                    <span>Trend Forecasting</span>
                </li>
                </Link>
            
                <p className="title">USEFUL</p>

               
                <li>
                <Link to={"/admin/logout"}  style={{textDecoration:"none"}}>
                <LogoutIcon className="icon"/>
                    <span>Logout</span>
                </Link>
                </li>
                

            </ul>
            </div>
        <div className="bottom">
            <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar