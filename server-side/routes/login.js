const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const session = require("express-session")
const passport = require("passport")
const bcrypt = require('bcrypt')
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password : {
        type: String,
        trim:true
    }
  });
  
  userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
  
  const User = mongoose.model('users', userSchema);
  
  router.use((req,res,next)=> {
    console.log('Time: ', Date.now())
    next()
  })
  
  passport.use(new LocalStrategy({
    usernameField: 'email',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
  
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  // router.post('/login', passport.authenticate('local', {
  //   successRedirect: '/student.js',
  //   failureRedirect: '/login',
  // }));
  
  router.get('/', async (req, res) => {
    User.find().then(docs => {
      // do something with the docs
      console.log(docs); 
      res.json(docs);
    }).catch(err => {
      // handle the error
      console.log('Error getting User:', err);
  res.status(500).send('Error getting User');
    });
  });
  
  router.post('/add' , async(req,res)=>{
    User.register({email: req.body.email}, req.body.password, (err,user)=>{
      if(err){
        console.log(err);
      } else {
        passport.authenticate("local")(req,res,()=>{
          console.log("Authenticated successfully");
        })
      }
    })
  })
  
  
  module.exports = router;
  