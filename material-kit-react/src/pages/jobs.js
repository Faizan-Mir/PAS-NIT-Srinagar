import React, {useState, useEffect} from 'react'; 
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import {Button, Grid, TextField, Typography, MenuItem, Switch, Select, InputLabel} from '@mui/material';

import data from '../schemas/job.json'; 


function AddJobForm(){

        const [formData, setFormData] = useState(data); 
        const handleChange = (event)=>{
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
        

        const [apiData, setApiData] = useState('[]');

        useEffect(() => {
            const temp=formData.session; 
            formData.companyId=''; 
            axios
              .get(`http://localhost:3001/companies/session/${temp}`) // replace with your API endpoint
              .then((response) => {
                setApiData(response.data);
                console.log('API Data Received'); 
              })
              .catch((error) => {
                console.log(error);
              });
          }, [formData.session]);

          const [message, setMessage] = useState(''); 

          const handleSubmit= async(event)=>{
              event.preventDefault(); 
              try{
                  const response = await axios.post('http://localhost:3001/jobs/add', formData);
                  setMessage(response.data); 
                  console.log(response.data); 
              } catch (error) {
                  console.error(error);
                }
          }
       

       return(
        <>
        <center>
            <form onSubmit={handleSubmit}>
                <h1>{message}</h1>
                <Grid container spacing={2} xs={11} sm={8} justifyContent="space-between" direction="row" alignItems="flex-start" style={{ border: '1px solid #ddd' }} p={5}>
                    <Grid item >
                        <TextField select required value={formData.session} name="session" onChange={handleChange} label="Session">
                            <MenuItem value="2022-23">2022-23</MenuItem>
                            <MenuItem value="2023-24">2023-24</MenuItem>
                            <MenuItem value="2024-25">2024-25</MenuItem>
                            <MenuItem value="2025-26">2025-26</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item >
                        <TextField select required value={formData.companyId} name="companyId" onChange={handleChange} label="Company" helperText="Choose the Company Corresponding to the Job">
                       { Array.isArray(apiData) && apiData.map((Company)=>(
                        <MenuItem key={Company._id} value ={Company._id}>{Company.name}</MenuItem>
                       )) }
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Cost To Company" required variant="outlined" type="number" name="ctc" value={formData.ctc} onChange={handleChange} helperText="Only Numbers Allowed"/>
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="CTC Breakdown" variant="outlined" name="ctcBreakdown" value={formData.ctcBreakdown} onChange={handleChange} placeholder="Enter the CTC Breakdown Here" /> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" required label="Role" variant="outlined" name="role" value={formData.role} onChange={handleChange} /> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Location" variant="outlined" name="location" value={formData.location} onChange={handleChange} /> 
                    </Grid>
                    <Grid item>
                        <TextField
                        select 
                        label="Eligible Branches"
                        value={formData.branchesEligible}
                        onChange={handleChange}
                        name="branchesEligible"
                        variant="outlined"
                        helperText="You can Select Multiple Branches"
                        required
                        SelectProps={{
                            multiple: true,
                            renderValue: (selected) => selected.join(', '),
                          }}
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
                        <TextField select required value={formData.category} name="category" onChange={handleChange} label="Category">
                            <MenuItem value="Full Time Only">Full Time Only</MenuItem>
                            <MenuItem value="Full Time with 6 months Internship">Full Time with 6 months Internship</MenuItem>
                            <MenuItem value="6 Months Intern with Performance Based PPO">6 Months Intern with Performance Based PPO</MenuItem>
                            <MenuItem value="6 Months Internship Only">6 Months Internship Only</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item >
                        <TextField select required value={formData.blockingType} name="blockingType" onChange={handleChange} label="Blocking Type">
                            <MenuItem value="Non-Blocking">Non-Blocking</MenuItem>
                            <MenuItem value="Blocking till L11">Blocking till L11</MenuItem>
                            <MenuItem value="Blocking till LU">Blocking till LU</MenuItem>
                            <MenuItem value="Permanently Blocking">Permanently Blocking</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item >
                        <TextField select required value={formData.declaredAs} name="declaredAs" onChange={handleChange} label="Decalred As">
                        <MenuItem value="Open for Un-Placed Only">Open for Un-Placed Only</MenuItem>
                            <MenuItem value="Open for Non-Blocked Only">Open for Non-Blocked Only</MenuItem>
                            <MenuItem value="L11 Company">L11 Company</MenuItem>
                            <MenuItem value="LU Company">LU Company</MenuItem>
                            <MenuItem value="PSU">PSU</MenuItem>
                            <MenuItem value="Super Tier">Super Tier</MenuItem>
                            <MenuItem value="Open for All including Permanently Blocked">Open for All including Permanently Blocked</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Job Description" variant="outlined" name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Enter the Job Description Here"/> 
                    </Grid>
                    <Grid item>
                        <TextField id="outline-basic" label="Additional Details Form Link" variant="outlined" name="additionalDetailsFormLink" value={formData.additionalDetailsFormLink} onChange={handleChange} helperText="Add the Link of an external Form to collect more details" /> 
                    </Grid>

                </Grid>
                <br/>
         <Grid>
            <Button type="submit" variant="contained">Add Job</Button>
            </Grid>
            </form>
            <h1>{formData.companyId}</h1>
        </center>
        </>
       );
}

const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
      field: 'companyId',
      headerName: 'Company ID',
      width: 150,
      
    },
    {
        field: 'session',
        headerName: 'Session',
        width: 150,
        
      },
      {
        field: 'ctc',
        headerName: 'CTC',
        width: 150,
        
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 150,
        
      },
      {
        field: 'location',
        headerName: 'Location',
        width: 150,
        
      },
      {
        field: 'ctcBreakdown',
        headerName: 'CTC Breakdown',
        width: 150,
        
      },
      {
        field: 'branchesEligible',
        headerName: 'Eligible Branches',
        width: 150,
        
      },
      {
        field: 'category',
        headerName: 'Category',
        width: 150,
        
      },
      {
        field: 'blockingType',
        headerName: 'Blocking Type',
        width: 150,
        
      },
      {
        field: 'declaredAs',
        headerName: 'Declared As',
        width: 150,
        
      },
      {
        field: 'jobDescription',
        headerName: 'jobDescription',
        width: 150,
        
      },
    
  ];

function JobList(){

    const [data, setData] = useState("");

    useEffect(() => {
      axios
        .get("http://localhost:3001/jobs") // replace with your API endpoint
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
    </div>
        </>
    );
}




export default function Jobs(){
    const [checked, setChecked] = useState(true); 
    const handleChange = (event)=>{
        setChecked(event.target.checked); 
    };

    return(
        <>
        <Helmet>
        <title> Jobs </title>
      </Helmet>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Add Job
        </Typography>
        <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        /> 
        <p>Add New Job</p>
        {checked && <AddJobForm/>}

        <Typography variant="h4" sx={{ mb: 5 }}>
          All Jobs
        </Typography>
        <JobList/> 
        


        </>
    );
}