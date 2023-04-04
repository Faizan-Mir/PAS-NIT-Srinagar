import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import {Button, Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
//  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'enrolmentNumber',
    headerName: 'Enrolment Number',
    width: 150,
    
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
   
  },
  {
    field: 'branch',
    headerName: 'Branch',
    width: 150,
   
  },
  {
    field: 'batch',
    headerName: 'Batch',
    width: 150,
   
  },
  {
    field: 'currentStatus',
    headerName: 'Current Status',
    width: 150,
   
  },
  
  
];


function App() {

  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/students") // replace with your API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const getRowId = (data) => data._id;

  return (
   <>
    <Helmet>
        <title> Dashboard: All Students </title>
      </Helmet>
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Students
        </Typography>


        
      
      <Button variant="outlined" href="#outlined-buttons">
  Add New Student
</Button>

      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={getRowId}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
       
        
   </>  
  );
}

export default App;
