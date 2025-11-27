"use strict"

const express=require("express");
const session = require("express-session");

const createError = require('http-errors');
const path=require("path");
const bcrypt = require("bcrypt");
const db=require("./db");

const indexRouter=require("./routes/index");
const reservaRouter=require("./routes/reserva");
const reservasRouter=require("./routes/reservas");
const vehiculoRouter=require("./routes/vehiculo");
const vehiculosRouter=require("./routes/vehiculos");
const loginRouter=require("./routes/login");
const listaUsuariosRouter=require("./routes/listaUsuarios");
const usuariosRouter=require("./routes/usuarios");
const registerRouter=require("./routes/register");
const concesionarioRouter=require("./routes/concesionario");
const concesionariosRouter=require("./routes/concesionarios");

const app = express();
app.use(session({
  secret: "un-secreto-super-secreto",
  resave: false,
  saveUninitialized: true
}));

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'templates') 
]);
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.use("/",indexRouter);
app.use("/reserve",reservaRouter);
app.use("/reservas",reservasRouter);
app.use("/vehicle",vehiculoRouter);
app.use("/vehiculos",vehiculosRouter);
app.use("/login",loginRouter);
app.use("/usuarios",usuariosRouter);
app.use("/listaUsuarios",listaUsuariosRouter);
app.use("/register",registerRouter);
app.use("/concesionaire",concesionarioRouter);
app.use("/concesionarios",concesionariosRouter);

app.listen(3000,(req,res)=>{
    console.log("Escuchando en el puerto 3000");
});