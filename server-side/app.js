const express = require('express');
const app = express();

const logger = require("morgan");
const mongoose = require('./mongoose'); 
const cors = require('cors');
const session = require("express-session")
const bodyParser = require('body-parser');
// const MongoStore = require('connect-mongo')(session);

// const MongoStore = new (require('connect-mongo')(session))({
//     mongooseConnection: mongoose.connection,
//     ttl : 14*24*60*60   
// });

const passport = require("./Auth");

app.use(passport.initialize());
app.use(passport.session());
// app.use(
//     session({
//         resave: false,
//         saveUninitialized: false,
//         secret: process.env.mongoDB_secret,
//         store: MongoStore
//     })
// );

app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use(cors());


const studentsRouter = require('./routes/students'); 
const companiesRouter = require('./routes/companies'); 
const jobsRouter = require('./routes/jobs');
const Authentication = require("./routes/Auth");
const User = require("./routes/User")

// API that provides a list of all students 
app.use('/students', studentsRouter); 
app.use('/companies', companiesRouter); 
app.use('/jobs', jobsRouter); 
app.use("/auth", Authentication);
app.use("/user", User)


// Server running on Port 3001, as port 3000 is used by our react frontend. 
app.listen(3001, () => console.log('Server running on port 3001'));
