import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import TableCell from '@mui/material/TableCell';
import Table from "@mui/material/Table";
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Sidebar from '../Components/Sidebar/SoleSidebar';
import Navbar from '../Components/navbar/Navbar';

const ViewRequests = () => {
  const [distributors, setDistributors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/soleDistributor/distributors", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setDistributors(data);
        } else {
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
<div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>

             <div className="productTableTitle">
                View Requests
                <Link to="/soleDistributor/applications" style={{textDecoration:"none"}} className="newLink">
                Manage Requests
                </Link>
              </div>
          <div className="tableContainer">
          <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Distributor ID</TableCell>
                  <TableCell className="tableCell">Image</TableCell>
                  <TableCell className="tableCell">Name</TableCell>
                  <TableCell className="tableCell">Email</TableCell>
                  <TableCell className="tableCell">City</TableCell>
                  <TableCell className="tableCell">Address</TableCell>
                  <TableCell className="tableCell" style={{textAlign:'center'}}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {distributors.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className="tableCell">{row._id}</TableCell>
                    <TableCell className="tableCell">
                      <img src={`http://localhost:4000/${row.userId.imageUrl}`} alt="Distributor" />
                    </TableCell>
                    <TableCell className="tableCell">{row.userId.name}</TableCell>
                    <TableCell className="tableCell">{row.userId.email}</TableCell>
                    <TableCell className="tableCell">{row.userId.city}</TableCell>
                    <TableCell className="tableCell">{row.userId.address}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>{row.status} </span>
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

export default ViewRequests;
