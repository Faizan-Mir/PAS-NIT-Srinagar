const mongoose = require('mongoose'); 


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
require('dotenv').config()
//console.log(process.env)

// Connection String
// Make sure your current IP address is added in Mongo DB Atlas 
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error(err));

  module.exports = mongoose.connection; 