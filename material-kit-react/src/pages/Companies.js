import React, {useState, useEffect} from 'react'; 
import axios from "axios";
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import {Button, Grid, TextField, Typography, MenuItem, Switch} from '@mui/material';
import data from '../schemas/company.json'; 








function AddCompanyForm(){

    const [formData, setFormData]= useState(data); 

    const handleChange= (event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleHrDetailsChange = (event)=>{
        setFormData({
            ...formData,
            hrDetails:{
                ...formData.hrDetails,
                [event.target.name]: event.target.value
            }
        });
    }

    const [message, setMessage] = useState(''); 
    const handleSubmit= async(event)=>{
        event.preventDefault(); 
        try{
            const response = await axios.post('http://localhost:3001/companies/add', formData);
            setMessage(response.data); 
            console.log(response.data); 
        } catch (error) {
            console.error(error);
          }
    }

    return(
        <>
        <center>
            <h2>{message}</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} xs={11} sm={8} justifyContent="space-between" direction="row" alignItems="flex-start" style={{ border: '1px solid #ddd' }} p={5}>
                    <Grid item>
                        <TextField id="outline-basic" label="Company Name" required variant="outlined" name="name" value={formData.name} onChange={handleChange}/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="HR Name" variant="outlined" name="name" value={formData.hrDetails.name} onChange={handleHrDetailsChange}/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="HR Email ID" variant="outlined" name="email" value={formData.hrDetails.email} onChange={handleHrDetailsChange}/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="HR Phone No." variant="outlined" name="phone" value={formData.hrDetails.phone} onChange={handleHrDetailsChange}/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Associated CRC ID" variant="outlined" name="crcAssociated" value={formData.crcAssociated} onChange={handleChange}/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Postal Address" variant="outlined" name="postalAddress" value={formData.postalAddress} onChange={handleChange}/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Additional Details" variant="outlined" name="additionalDetails" value={formData.additionalDetails} onChange={handleChange}/> 
                    </Grid>
                    <Grid item >
            
            <TextField
            select
            required
            
            value={formData.category}
            name="category"
            onChange={handleChange}
            label="Category"
            >
              <MenuItem value="it"> Information Technology</MenuItem>
              <MenuItem value="startup"> Startup</MenuItem>
              <MenuItem value="psu"> Public Sector Undertaking</MenuItem>
              <MenuItem value="core"> Core </MenuItem>
              <MenuItem value="finance"> Finance </MenuItem>
              <MenuItem value="analytics"> Analytics </MenuItem>
              <MenuItem value="edtech"> EdTech </MenuItem>
            </TextField>
            </Grid>

            <Grid item >
            
            <TextField
            select
            required
            value={formData.placementSession}
            name="placementSession"
            onChange={handleChange}
            helperText="Visiting for the Placement Session"
            label="Session"
            >
              <MenuItem value="2022-23"> 2022-23 </MenuItem>
              <MenuItem value="2023-24"> 2023-24</MenuItem>
              <MenuItem value="2024-25"> 2024-25</MenuItem>
              <MenuItem value="2025-26"> 2025-26 </MenuItem>
            </TextField>
            </Grid>


                </Grid>
                <br/>
         <Grid>
            <Button type="submit" variant="contained">Add Company</Button>
            </Grid>
            </form>
            
        </center>
        
        
        </>
    );
}

const columns = [
      { field: '_id', headerName: 'ID', width: 150 },
      {
        field: 'name',
        headerName: 'Company Name',
        width: 150,
        
      },
      {
        field: "hrDetails.name",
        headerName: "HR Name",
        width: 150,
        valueGetter: (params) => params.row.hrDetails.name,
      },
      {
        field: "hrDetails.email",
        headerName: "HR Email",
        width: 150,
        valueGetter: (params) => params.row.hrDetails.email,
      },
      {
        field: "hrDetails.phone",
        headerName: "HR Phone No",
        width: 150,
        valueGetter: (params) => params.row.hrDetails.phone,
      },
      {
        field: "crcAssociated",
        headerName: "Associated CRC",
        width: 150,
      },
      {
        field: "category",
        headerName: "Category",
        width: 150,
      },
      {
        field: "placementSession",
        headerName: "Session",
        width: 150,
      },
      {
        field: "postalAddress",
        headerName: "Postal Address",
        width: 150,
      },
      {
        field: "additionalDetails",
        headerName: "Additional Details",
        width: 150,
      },  
      
    ];


function CompanyList(){

    const [data, setData] = useState("");

    useEffect(() => {
      axios
        .get("http://localhost:3001/companies") // replace with your API endpoint
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
  
    const getRowId = (data) => data._id;

    return(
        <>
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
      <Link to='http://localhost:3001/companies/download.xlsx'>
      <Button variant="contained">Download Excel</Button>
      </Link>
      
    </div>
        </>
    );
}



export default function Companies(){
    const [checked, setChecked] = useState(true); 
    const handleChange = (event)=>{
        setChecked(event.target.checked); 
    };

    return(
        <>
    <Helmet>
        <title> Add Company </title>
      </Helmet>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Add Company
        </Typography>
        <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        /> 
        <p>Add New Company</p>
        {checked && <AddCompanyForm/>}
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Companies 
        </Typography>
        <CompanyList/>
        
         
     
        
   </> 
    );
}