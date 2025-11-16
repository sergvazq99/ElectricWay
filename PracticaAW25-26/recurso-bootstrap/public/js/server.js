"use strict"

const express=require("express");
const session = require("express-session");

const createError = require('http-errors');
const path=require("path");
const bcrypt = require("bcrypt");
const app = express();
app.use(session({
  secret: "un-secreto-super-secreto",
  resave: false,
  saveUninitialized: true
}));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'templates') 
]);
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 