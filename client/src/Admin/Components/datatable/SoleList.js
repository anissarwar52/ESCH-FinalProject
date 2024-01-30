import React, { useState,useEffect } from 'react';
import { Link} from "react-router-dom";
import "../table/table.scss";
import "../datatable/productList.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import SoleUpdate from '../../new/SoleUpdate'
import {useNavigate} from "react-router-dom";

const SoleList = () => {

  const navigate = useNavigate();

    const [sole, setSole] = useState([]);
    const [sole1, setSole2] = useState([]);
    useEffect(()=>{
        // getSole();
        getSoleAuth();
    },[])
    useEffect(()=>{
        getSole();
       
    },[])

    const getSole = async () => {
        let result = await fetch('/admin/users')
        result = await result.json();
        setSole2(result);
    }
    
    const getSoleAuth = async () => {
        let result = await fetch('/soleDistributor')
        result = await result.json();
        setSole(result);
    }
    
    const deleteSole=async (id)=>{
        let result = await fetch(`/admin/users/${id}`,{
            method:"Delete"
        });
        if (result.status === 200) {
          alert("Sole Distributor is Deleted");
          navigate("/admin");
        } else {
          console.log("Error deleting Sole Distributor");
        }
    };




  return (
    <>


    <div className="list">
        <Sidebar/>
        <div className="listContainer">
          <Navbar/>
    
          <div className="productTableTitle">
                Sole Distributors
                <Link to="/admin/users/new" style={{textDecoration:"none"}} className="newLink">
                Add New Sole Distributors
                </Link>
              </div>
              <div className="tableContainer">
  <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Sole Distributor ID</TableCell>
          <TableCell className="tableCell">Image</TableCell>
          <TableCell className="tableCell">Name</TableCell>
          <TableCell className="tableCell">Email</TableCell>
          <TableCell className="tableCell">Phone</TableCell>
          <TableCell className="tableCell">Profession</TableCell>
          <TableCell className="tableCell">Address</TableCell>
          <TableCell className="tableCell">Country</TableCell>
          {/* <TableCell className="tableCell">Operations</TableCell> */}
        </TableRow>
      </TableHead>

      {sole.map((item, index) => (
        <TableBody key={item._id}>
          <TableRow>
            <TableCell className="tableCell">{index+1}</TableCell>
            <TableCell className="tableCell"><img src={`http://localhost:4000/${item?.imageUrl}`} /></TableCell>
            <TableCell className="tableCell">{item.name}</TableCell>
            <TableCell className="tableCell">{item.email}</TableCell>
            <TableCell className="tableCell">{item.phone}</TableCell>
            <TableCell className="tableCell">{item.profession}</TableCell>
            <TableCell className="tableCell">{item.address}</TableCell>
            <TableCell className="tableCell">{item.country}</TableCell>
            {/* <TableCell className="tableCell">
              <Link  className="buttonLink">Details</Link>
            </TableCell> */}
          </TableRow>
        </TableBody>
      ))}

      {sole1.map((item, index) => (
        <TableBody key={item._id}>
          <TableRow>
            <TableCell className="tableCell">{index + 1 + sole.length}</TableCell>
            <TableCell className="tableCell"><img src={`http://localhost:4000/${item?.imageUrl}`} /></TableCell>
            <TableCell className="tableCell">{item.name}</TableCell>
            <TableCell className="tableCell">{item.email}</TableCell>
            <TableCell className="tableCell">{item.phone}</TableCell>
            <TableCell className="tableCell">{item.profession}</TableCell>
            <TableCell className="tableCell">{item.address}</TableCell>
            <TableCell className="tableCell">{item.country}</TableCell>
            <TableCell className="tableCell">
              <div className="deleteButton" onClick={() => deleteSole(item._id)}>Delete</div>
              <Link to={`/admin/users/${item._id}`} className="buttonLink">Update</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  </TableContainer>
</div>
          
    
    
        </div>
      </div>
    
        
          </>
  )
}

export default SoleList