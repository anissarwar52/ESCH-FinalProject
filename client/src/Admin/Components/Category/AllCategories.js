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
import ProductUpdate from '../../new/ProductUpdate'
import {useNavigate} from "react-router-dom";



const AllCategories = () => {

  const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetchCategories();
    },[])

    
    const fetchCategories = async () => {
      try {
        const response = await fetch('/admin/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  


    const deleteCategory = async (id) => {
      let result = await fetch(`/admin/categories/${id}`, {
        method: "Delete",
      });
    
      if (result.status === 200) {
        alert("Category is Deleted");
        navigate("/admin");
      } else {
        console.log("Error deleting Category");
      }
    };




  return (
    <>


<div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>

      <div className="productTableTitle">
            Category
            <Link to="/admin/categories/new" style={{textDecoration:"none"}} className="newLink">
            Add New Category
            </Link>
          </div>
          <div className="tableContainer">
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Category ID</TableCell>
              <TableCell className="tableCell">Category Name</TableCell>
              <TableCell className="tableCell" style={{textAlign: "inherit"}}>Operations</TableCell>
            </TableRow>
          </TableHead>

          {
         categories.map((item, index) => (
            <TableBody>
            <TableRow key={item._id}>
            <TableCell className="tableCell">{index}</TableCell>
            <TableCell className="tableCell">{item.name}</TableCell>
            <TableCell className="tableCell"><div className="deleteButton" onClick={()=>deleteCategory(item._id)}>Delete</div>
            <Link to={`/admin/category/${item._id}`} className="buttonLink">Update</Link></TableCell>
      </TableRow>
    </TableBody>
  ))
}

        </Table>
      </TableContainer>
      </div>
      


    </div>
  </div>

    
      </>
  )
}

export default AllCategories