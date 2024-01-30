import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from '../Components/navbar/Navbar';
import Sidebar from '../Components/Sidebar/SoleSidebar';
import { useNavigate } from "react-router-dom";
import './Style/SoleOrder.scss'

const SoleOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    fetch('/soleDistributor/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleCancelOrder = (orderId) => {
    // Send a DELETE request to cancel the order
    fetch(`/soleDistributor/orders/${orderId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 200) {
          // Remove the canceled order from the local state
          setOrders(orders.filter((order) => order._id !== orderId));
        }
      })
      .catch((error) => console.error('Error canceling order:', error));
  };


  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />

          <div className="productTableTitle">
            Orders
          </div>
          <div className="tableContainer">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">Order ID</TableCell>
                    <TableCell className="tableCell">Sole Distributor's Email</TableCell>
                    <TableCell className="tableCell">Address</TableCell>
                    <TableCell className="tableCell">Date</TableCell>
                    <TableCell className="tableCell">Status</TableCell>
                    <TableCell className="tableCell" style={{textAlign:'center'}}>Action</TableCell>
                    <TableCell className="tableCell" style={{display:'flex'}}>Order Details</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="tableCell">{item._id}</TableCell>
                      <TableCell className="tableCell">{item.userId.email}</TableCell>
                      <TableCell className="tableCell">{item.address}</TableCell>
                      <TableCell className="tableCell">{new Date(item.Date).toLocaleDateString()}</TableCell>
                      <TableCell className="tableCell">
                      <span className={`status ${item.status}`}>{item.status}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                      <div className="order-action">
                    <button
                      className="Button"
                      onClick={() => handleCancelOrder(item._id)}
                    >
                      Cancel Order
                    </button>
                  </div>

                      </TableCell>
                      <TableCell className="tableCell">
                        <Link to={`/soleDistributor/orders/${item._id}`} className="detailLink">Details</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoleOrders;





