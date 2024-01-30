import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../table/table.scss";
import "../datatable/productList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    fetch('/admin/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleAcceptOrder = (orderId) => {
    // Send a PUT request to accept the order
    fetch(`/admin/orders/${orderId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'accept' }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Update the order status in the local state
          const updatedOrders = orders.map((order) =>
            order._id === orderId ? { ...order, status: 'accepted' } : order
          );
          setOrders(updatedOrders);
        }
      })
      .catch((error) => console.error('Error accepting order:', error));
  };

  const handleRejectOrder = (orderId) => {
    // Send a PUT request to reject the order
    fetch(`/admin/orders/${orderId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'reject' }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Update the order status in the local state
          const updatedOrders = orders.map((order) =>
            order._id === orderId ? { ...order, status: 'rejected' } : order
          );
          setOrders(updatedOrders);
        }
      })
      .catch((error) => console.error('Error rejecting order:', error));
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
                    <TableCell className="tableCell" style={{display:'flex'}}>Order Details</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="tableCell">{item._id}</TableCell>
                      <TableCell className="tableCell">{item.distributor.email}</TableCell>
                      <TableCell className="tableCell">{item.address}</TableCell>
                      <TableCell className="tableCell">{new Date(item.Date).toLocaleDateString()}</TableCell>
                      <TableCell className="tableCell">
                        <div className="order-action">
                          {item.status === 'accepted' ? (
                            <span className="status accepted">Accepted</span>
                          ) : item.status === 'rejected' ? (
                            <span className="status rejected">Rejected</span>
                          ) : (
                            <>
                              <button
                                className="Button accept-button" style={{ backgroundColor: "green", marginRight: "17px" }}
                                onClick={() => handleAcceptOrder(item._id)}
                              >
                                Accept
                              </button>
                              <button
                                className="Button reject-button"
                                onClick={() => handleRejectOrder(item._id)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="tableCell">
                        <Link to={`/admin/order/${item._id}`} className="detailLink">Details</Link>
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

export default OrderHistory;





