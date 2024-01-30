import React, { useEffect, useState } from 'react';
import Navbar from "../Components/navbar/Navbar";
import { Link} from "react-router-dom";
import Sidebar from "../Components/Sidebar/SoleSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const RequestsManage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/soleDistributor/view-requests", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setRequests(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (requestId, action) => {
    try {
      const res = await fetch(`/soleDistributor/view-requests/${requestId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ action }),
      });

      if (res.status === 200) {
        const updatedRequests = [...requests];
        const updatedRequestIndex = updatedRequests.findIndex(request => request._id === requestId);

        if (updatedRequestIndex !== -1) {
          updatedRequests[updatedRequestIndex].status = action === "accept" ? "accepted" : "rejected";
          setRequests(updatedRequests);
        }

        // Handle success, e.g., show a success message
      } else {
        console.error("Failed to perform action");
        // Handle errors here
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="productTableTitle">
                Manage Requests
                <Link to="/soleDistributor/applications/status" style={{textDecoration:"none"}} className="newLink">
                View All Requests
                </Link>
              </div>
          <div className="tableContainer">

          <TableContainer component={Paper} className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Name</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">City</TableCell>
                  <TableCell className="tableCell">Address</TableCell>
                  <TableCell className="tableCell">Date</TableCell>
                  <TableCell className="tableCell">Experience</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                  <TableCell className="tableCell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="tableCell">{row.userId.name}</TableCell>
                    <TableCell className="tableCell">{row.userId.email}</TableCell>
                    <TableCell className="tableCell">{row.userId.city}</TableCell>
                    <TableCell className="tableCell">{row.userId.address}</TableCell>
                    <TableCell className="tableCell">{row.requestDate}</TableCell>
                    <TableCell className="tableCell">{row.experience}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>{row.status}</span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <button className="buttonLink" onClick={() => handleAction(row._id, "accept")}>Accept</button>
                      <button className="buttonLink" onClick={() => handleAction(row._id, "reject")}>Reject</button>
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

export default RequestsManage;
