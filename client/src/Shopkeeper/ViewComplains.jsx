import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/ShopNavbar";
import Footer from "./Components/ShopFooter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './Components/Style/ComplainView.css';

export default function ViewComplains() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('/shopkeeper/complaints')
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="productTableTitle">
           View Complains
          
           <Link to="/shopkeeper/complain" style={{ textDecoration: 'none' }} className="newLink">
              Add Complain
            </Link>

          </div>
          <div className="tableContainer">
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Title</TableCell>
                <TableCell className="tableCell">Product Name</TableCell>
                <TableCell className="tableCell"style={{textAlign:'start'}}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell className="tableCell">{complaint.title}</TableCell>
                  <TableCell className="tableCell">{complaint.productId.title}</TableCell>
                  <TableCell className="tableCell">
                      <span className={`status ${complaint.status}`}>{complaint.status}</span>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
}
