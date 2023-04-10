import React, { useState, useEffect } from "react";

import axios from "axios";
import { Helmet } from 'react-helmet-async';
import {Button, Grid, TextField, Typography, MenuItem} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import data from '../schemas/student.json'; 





function ExampleForm() {
  

    const [formData, setFormData] = useState(data);
    
    
    
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }

    const handleContactDetailsChange = (event) => {
      setFormData({
        ...formData,
        contactDetails: {
          ...formData.contactDetails,
           [event.target.name]: event.target.value
        }
      });
    }

    const handlePersonalDetailsChange = (event) => {
      setFormData({
        ...formData,
        personalDetails: {
          ...formData.personalDetails,
           [event.target.name]: event.target.value
        }
      });
    }

    const [message, setMessage] = useState(''); 
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      alert(formData.batch); 
      try {
        const response = await axios.post('http://localhost:3001/students/api/formdata', formData);
        setMessage(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error(error);
      }
    }
    
    return (
      <>
      <h1>{message}</h1>

      <center>
      <form onSubmit={handleSubmit}>
        
         <Grid container spacing={2} xs={11} sm={8} justifyContent="space-between" direction="row" alignItems="flex-start" style={{ border: '1px solid #ddd' }} p={5}>
            <Grid item >
            <TextField id="outlined-basic" label="Enrolment Number" variant="outlined" name="enrolmentNumber" value={formData.enrolmentNumber} onChange={handleChange}/> 
            </Grid>
            <Grid item >
            <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={formData.name} onChange={handleChange}/> 
            </Grid>
            <Grid item >
            <TextField
            select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            label="Branch"
            >
              <MenuItem value="CHE"> Chemical Engineering </MenuItem>
              <MenuItem value="CIV"> Civil Engineering </MenuItem>
              <MenuItem value="CSE"> Computer Science & Engineering </MenuItem>
              <MenuItem value="ELE"> Electrical Engineering </MenuItem>
              <MenuItem value="ECE"> Electronics & Communication Engineering </MenuItem>
              <MenuItem value="IT"> Information Technology </MenuItem>
              <MenuItem value="MEC"> Mechanical Engineering </MenuItem>
              <MenuItem value="MME"> Metallurgical & Materials Engineering </MenuItem>

            </TextField>


            </Grid>

            <Grid item >
            
            <TextField
            select
            
            value={formData.batch}
            name="batch"
            onChange={handleChange}
            label="Batch"
            >
              <MenuItem value={2020}> 2020-24 </MenuItem>
              <MenuItem value={2021}> 2021-25 </MenuItem>
              <MenuItem value={2022}> 2022-26 </MenuItem>
              <MenuItem value={2023}> 2023-27 </MenuItem>
            </TextField>
            
     

            </Grid>
            
            <Grid item>
            <TextField id="outlined-basic" label="Email ID" variant="outlined" name="email" value={formData.contactDetails.email} onChange={handleContactDetailsChange}/> 
            </Grid>
            <Grid item>
            <TextField id="outlined-basic" label="Contact Number" variant="outlined" name="phone" value={formData.contactDetails.phone} onChange={handleContactDetailsChange}/> 
            </Grid>
            <Grid item>
            <TextField id="outlined-basic" label="Address" variant="outlined" name="address" value={formData.contactDetails.address} onChange={handleContactDetailsChange}/> 
            </Grid>
            <Grid item >
            
            <TextField
            select
            
            value={formData.category}
            name="category"
            onChange={handleChange}
            label="Category"
            >
              <MenuItem value="gen"> General </MenuItem>
              <MenuItem value="ews"> General - EWS </MenuItem>
              <MenuItem value="obc"> OBC - NCL</MenuItem>
              <MenuItem value="sc"> SC </MenuItem>
              <MenuItem value="st"> ST </MenuItem>
            </TextField>
            
     

            </Grid>
            <Grid item>
            <TextField id="outlined-basic" label="Father's Name" variant="outlined" name="fathersName" value={formData.personalDetails.fathersName} onChange={handlePersonalDetailsChange}/> 
            </Grid>
            <Grid item>
            <TextField id="outlined-basic" label="Mother's Name" variant="outlined" name="mothersName" value={formData.personalDetails.mothersName} onChange={handlePersonalDetailsChange}/> 
            </Grid>
            <Grid item >
            
            <TextField
            select
            
            value={formData.personalDetails.bloodGroup}
            name="bloodGroup"
            onChange={handlePersonalDetailsChange}
            label="Blood Group"
            >
              <MenuItem value="o-"> O Negative </MenuItem>
              <MenuItem value="o+"> O Positive </MenuItem>
              <MenuItem value="a-"> A Negative </MenuItem>
              <MenuItem value="a+"> A Positive  </MenuItem>
              <MenuItem value="b-"> B Negative </MenuItem>
              <MenuItem value="b+"> B Positive  </MenuItem>
              <MenuItem value="ab-"> AB Negative  </MenuItem>
              <MenuItem value="ab+"> AB Positive  </MenuItem>
            </TextField>
            
     

            </Grid>
            
           

            

         </Grid>
        <br/>
         <Grid>
            <Button type="submit" variant="contained">Submit</Button>
            </Grid>
     
      
      
        
      </form>
      </center>
      </>
    );
  }



function App() {


  return (
   <>
    <Helmet>
        <title> Dashboard: All Students </title>
      </Helmet>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Add New Student
        </Typography>
        <ExampleForm/> 
     
        
   </>  
  );
}

export default App;
