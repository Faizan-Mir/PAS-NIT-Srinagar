const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const session = require("express-session")
const passport = require("passport")
const bcrypt = require('bcrypt')
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");


const crcSchema = new mongoose.Schema({
  name: {
    type: String,
      required: true,
      trim: true
  },
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

crcSchema.plugin(passportLocalMongoose, { usernameField: 'name' });

const CRC = mongoose.model('CRC', crcSchema);

router.use((req,res,next)=> {
  console.log('Time: ', Date.now())
  next()
})

passport.use(new LocalStrategy({
  usernameField: 'name',
  email: 'email'
}, async (name, email, password, done) => {
  try {
    const user = await CRC.findOne({ name , email });

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
  CRC.find().then(docs => {
    // do something with the docs
    console.log(docs); 
    res.json(docs);
  }).catch(err => {
    // handle the error
    console.log('Error getting CRC:', err);
res.status(500).send('Error getting CRC');
  });
});

router.post('/add' , async(req,res)=>{
  CRC.register({email: req.body.email}, req.body.password, (err,user)=>{
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
