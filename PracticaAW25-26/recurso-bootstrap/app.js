"use strict"

const express=require("express");
const createError = require('http-errors');
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

const vehiculos=[{imagen:"byd_seal1.png",nombre:"Byd Seal 1",desc:"xxx",matricula:"67891FYS",marca:"Renault",autonomia:500},
  {imagen:"byd_seal2.png",nombre:"Byd Seal 2",desc:"yyy",matricula:"123456ABC",marca:"Opel",autonomia:680},
  {imagen:"byd_seal3.png",nombre:"Byd Seal 3",desc:"zzz",matricula:"654321XYZ",marca:"Audi",autonomia:400},
  {imagen:"byd_seal1.png",nombre:"Byd Seal 1",desc:"xxx",matricula:"67891FYS",marca:"Renault",autonomia:500},
  {imagen:"byd_seal2.png",nombre:"Byd Seal 2",desc:"yyy",matricula:"123456ABC",marca:"Opel",autonomia:680},
  {imagen:"byd_seal3.png",nombre:"Byd Seal 3",desc:"zzz",matricula:"654321XYZ",marca:"Audi",autonomia:400}
];

const reservas=[];
const usuarios=[];
const concesionarios=[];

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
  res.render("register");
});

app.get("/login",(req,res)=>{
  res.render("login");
});

app.get("/vehiculos",(req,res)=>{
    res.render("vehiculos",{v:vehiculos});
});

app.get("/reserve",(req,res)=>{
    res.render("reserve");
});

app.post("/reserve",(req,res,next)=>{
    const {vehiculo,date1,date2}=req.body;

    const seleccion=vehiculos.find(v=>v.nombre.toLowerCase()===vehiculo.toLowerCase());

    if(!seleccion){
      console.log("Vehículo no encontrado");
      return next(createError(404, "Error al procesar la reserva"));
    }

    const reserva={nombre:seleccion.nombre,fechaIni:date1,fechaFin:date2,foto:seleccion.imagen,marca:seleccion.marca};
    reservas.push(reserva);

    res.render("reserves",{r:reservas});
});

app.get("/concesionaire",(req,res)=>{
    res.render("concesionaire");
});

app.use((req, res, next)=>{
  next(createError(404,"Página no encontrada"));
});

app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,(req,res)=>{
    console.log("Escuchando en el puerto 3000");
});

