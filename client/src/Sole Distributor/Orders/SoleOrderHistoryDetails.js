import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from '../Components/navbar/Navbar';
import Sidebar from '../Components/Sidebar/SoleSidebar';

const SoleOrderHistoryDetails = () => {
  const [order, setOrder] = useState({});
  const params = useParams();

  useEffect(() => {
    // Fetch orders from the backend
    fetch(`/soleDistributor/orders/history/${params.id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, [params.id]);

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />

          <div className="productTableTitle">
            Orders Details
          </div>
          <div className="tableContainer">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">Product Title</TableCell>
                    <TableCell className="tableCell">Image</TableCell>
                    <TableCell className="tableCell">Quantity</TableCell>
                    <TableCell className="tableCell" style={{display:'flex'}}>Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.orderItems && order.orderItems.map((item) => (
                    <TableRow key={item.product.title}>
                      <TableCell className="tableCell">{item.product.title}</TableCell>
                      <TableCell className="tableCell">
                        <img src={`http://localhost:4000/${item.product.imageUrl}`} alt={item.product.title} />
                      </TableCell>
                      <TableCell className="tableCell">{item.quantity}</TableCell>
                      <TableCell className="tableCell">{item.total} PKR</TableCell>
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

export default SoleOrderHistoryDetails;
