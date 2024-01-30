import React, { useEffect, useState } from 'react';
import "../../../Admin/Components/widget/widget.scss";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";

const WidgetD = ({ type }) => {
  const [productCount, setProductCount] = useState();
  const [orderCount, setOrderCount] = useState();
  const [complainCount, setComplainCount] = useState();
  const [sales, setSales] = useState();
  const diff = 20;

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const productResponse = await fetch('/distributor/my-products');
      const productData = await productResponse.json();
      setProductCount(productData.length);

      const soleResponse = await fetch('/distributor/complaints');
      const soleData = await soleResponse.json();
      setComplainCount(soleData.length);


      // Fetch order count
      const orderResponse = await fetch('/distributor/orders');
      const orderData = await orderResponse.json();
      setOrderCount(orderData.length);

      // Fetch sales
      const salesResponse = await fetch('/distributor/sales');
      console.log('Sales response:', salesResponse);
      const salesData = await salesResponse.json();
      setSales(salesData.acceptedOrdersCount);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  let data;

  switch (type) {
    case "user":
      data = {
        title: "COMPLAINS",
        count: complainCount,
        isMoney: false,
        link: <Link to={'/distributor/complains'}>"See all complains"</Link>,
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "NEW ORDERS",
        isMoney: false,
        count: orderCount, // Display order count
        link: <Link to={'/distributor/orders'}>"View all orders"</Link>, // Link to the orders page
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "sales":
      data = {
        title: "SALES",
        isMoney: true,
        count: sales,
        link: "View sales",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "INVENTORY",
        count: productCount,
        isMoney: true,
        link: <Link to={'/distributor/my-products'}>"See all inventory"</Link>,
        icon: (
          <LocalMallIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "soleDistributors":
      data = {
        title: "SOLE DISTRIBUTORS",
        count: complainCount,
        isMoney: true,
        link: "See details",
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{backgroundColor: "#111"}}>
      <div className="left">
        <span className="title" style={{color: "rgb(255, 239, 239)"}}>{data.title}</span>
        <span className="counter" style={{color: "rgb(224, 215, 215)"}}>
          {typeof data.count === "undefined" ? "N/A" : (data.isMoney ? `${data.count}` : data.count)}
        </span>
        <span className="link">{data.link}</span>
      </div>

      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpRoundedIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default WidgetD;
