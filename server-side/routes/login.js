const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

passport.use(new LocalStrategy({
  usernameField: 'username',
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: 'Incorrect username or password.' });
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

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log('Error getting users:', err);
    res.status(500).send('Error getting users');
  }
});

// router.post('/add', async (req, res) => {
//   try {
//     const user = await User.register({ username: req.body.email }, req.body.password);
//     passport.authenticate('local', { failureRedirect: '/login' })(req, res, () => {
//       console.log('Authenticated successfully');
//     });
//   } catch (err) {
//     console.log('Error registering user:', err);
//     res.status(500).send('Error registering user');
//   }
// });

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard/app',
  failureRedirect: '/login',
}));
module.exports = router;
