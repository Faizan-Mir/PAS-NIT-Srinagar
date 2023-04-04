import React, {useState} from 'react';
import {Button, Grid, TextField, Typography, MenuItem, Switch, Select, InputLabel, CardActions, CardContent, Box, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


  






export default function App(){

    const [open, setOpen] = useState(false);
    const handleDialogOpen = () => {  
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    const card = (
        <> 
            <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            Winjit Technologies
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            SDE Role 
          </Typography>
          <Typography variant="body2">
            CTC: 120000
            <br />
            Deadline: 20th April 2023
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDialogOpen}>Details</Button>
        </CardActions>
            </>
      );

    

    return(
        <>
        <center>
        <h1> Current Job Openings For You </h1>
        <Grid container spacing={2} xs={12} sm={10} justifyContent="space-between" direction="row" alignItems="flex-start" style={{ border: '1px solid #ddd' }} p={2}>
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>   
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>     
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>     
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>     
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>     
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>       
            <Grid item>
            <Card variant="outlined">{card}</Card>
            </Grid>     
            
        </Grid>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Winjit Technologies</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Winjit Technologies SDE Role
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        
      
        </center>
        </>
    );
}