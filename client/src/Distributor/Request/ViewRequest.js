import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import TableCell from '@mui/material/TableCell';
import Table from "@mui/material/Table";
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Sidebar from "../Components/Sidebar/DisSidebar";
import Navbar from "../Components/navbar/Navbar";

const ViewRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const res = await fetch("/distributor/request", {
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
          // Handle errors here
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="productTableTitle">
                View Requests

              </div>
          <div className="tableContainer">

          <TableContainer component={Paper} className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Request ID</TableCell>
                  <TableCell className="tableCell">Name</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">City</TableCell>
                  <TableCell className="tableCell">Address</TableCell>
                  <TableCell className="tableCell">Date</TableCell>
                  <TableCell className="tableCell">Experience</TableCell>
                  <TableCell className="tableCell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tableCell">{row._id}</TableCell>
                    <TableCell className="tableCell">{row.userId.name}</TableCell>
                    <TableCell className="tableCell">{row.userId.email}</TableCell>
                    <TableCell className="tableCell">{row.userId.city}</TableCell>
                    <TableCell className="tableCell">{row.userId.address}</TableCell>
                    <TableCell className="tableCell">{row.requestDate}</TableCell>
                    <TableCell className="tableCell">{row.experience}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>{row.status}</span>
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

export default ViewRequest;
