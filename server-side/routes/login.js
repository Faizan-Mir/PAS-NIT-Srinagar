const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");



module.exports = router;
