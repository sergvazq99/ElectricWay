"use strict"
const express=require("express");
const path=require("path");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'templates') 
]);
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(3000,(req,res)=>{
    console.log("Escuchando en el puerto 3000");
});