const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('./mongoose'); 
app.use(cors());
app.use(bodyParser.json());
const studentsRouter = require('./routes/students'); 
const companiesRouter = require('./routes/companies'); 
const jobsRouter = require('./routes/jobs')
const loginRouter = require('./routes/login')
const crcLoginRouter = require('./routes/crcLogin')

// API that provides a list of all students 
app.use('/students', studentsRouter); 
app.use('/companies', companiesRouter); 
app.use('/jobs', jobsRouter); 
app.use('/login',loginRouter)
app.use('/crcLogin', crcLoginRouter)


// Server running on Port 3001, as port 3000 is used by our react frontend. 
app.listen(3001, () => console.log('Server running on port 3001'));
