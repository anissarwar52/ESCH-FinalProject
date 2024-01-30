import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../Sidebar/DisSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('/distributor/complaints');
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      } else {
        console.error('Failed to fetch complaints.');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleAction = async (complainId, action) => {
    try {
      const res = await fetch(`/distributor/complaints/${complainId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ action }),
      });

      if (res.status === 200) {
        // Update the status in the component's state
        const updatedComplaints = [...complaints];
        const complainIndex = updatedComplaints.findIndex((complaint) => complaint._id === complainId);

        if (complainIndex !== -1) {
          updatedComplaints[complainIndex].status = action === "resolve" ? "resolved" : "rejected";
          setComplaints(updatedComplaints);
        }
      } else {
        console.error('Error handling action:', res.statusText);
      }
    } catch (error) {
      console.error('Error handling action:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="productTableTitle">
                Complaints

              </div>
          <div className="tableContainer">

          <TableContainer component={Paper} className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Complaint ID</TableCell>
                  <TableCell className="tableCell">Complaint Title</TableCell>
                  <TableCell className="tableCell">Product</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                  <TableCell className="tableCell" style={{textAlign: "start"}}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="tableCell">{complaint._id}</TableCell>
                    <TableCell className="tableCell">{complaint.title}</TableCell>
                    <TableCell className="tableCell">{complaint.productId.title}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${complaint.status}`}>{complaint.status}</span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <button className="buttonLink" onClick={() => handleAction(complaint._id, "resolve")}>Resolve</button>
                      <button className="buttonLink" onClick={() => handleAction(complaint._id, "reject")}>Reject</button>
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
}
