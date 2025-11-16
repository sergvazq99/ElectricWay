"use strict"

const express=require("express");
const session = require("express-session");

const createError = require('http-errors');
const path=require("path");
const bcrypt = require("bcrypt");

const indexRouter=require("./routes/index");
const reservaRouter=require("./routes/reserva");
const reservasRouter=require("./routes/reservas");
const vehiculoRouter=require("./routes/vehiculo");
const vehiculosRouter=require("./routes/vehiculos");
const loginRouter=require("./routes/login");
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
app.use("/register",registerRouter);
app.use("/concesionaire",concesionarioRouter);
app.use("/concesionarios",concesionariosRouter);

/*const vehiculos=[{imagen:"byd_seal1.png",nombre:"Byd Seal 1",desc:"xxx",matricula:"67891FYS",marca:"Renault",autonomia:500},
  {imagen:"byd_seal2.png",nombre:"Byd Seal 2",desc:"yyy",matricula:"123456ABC",marca:"Opel",autonomia:680},
  {imagen:"byd_seal3.png",nombre:"Byd Seal 3",desc:"zzz",matricula:"654321XYZ",marca:"Audi",autonomia:400},
  {imagen:"byd_seal1.png",nombre:"Byd Seal 1",desc:"xxx",matricula:"67891FYS",marca:"Renault",autonomia:500},
  {imagen:"byd_seal2.png",nombre:"Byd Seal 2",desc:"yyy",matricula:"123456ABC",marca:"Opel",autonomia:680},
  {imagen:"byd_seal3.png",nombre:"Byd Seal 3",desc:"zzz",matricula:"654321XYZ",marca:"Audi",autonomia:400}
];

const reservas=[];
const usuarios=[];
const concesionarios=[];*/



/*app.get("/",(req,res)=>{
  res.render("index",{usuario:req.session.usuario});
});*/

/*app.get("/register",(req,res)=>{
  res.render("register",{usuarios:usuarios});
});

app.post("/register",(req,res)=>{
  let admin;
  
  if(req.body.admin==="yes"){
    admin="admin"
  }
  else{
    admin="employee";
  }
  console.log(admin);
  const {nombre,correo,contrasenia,telefono,concesionario}=req.body;
  const seleccion=usuarios.find(u=>u.nombre.toLowerCase()===nombre.toLowerCase());

  if(!seleccion){
    console.log("Usuario registrado");
    const usuario={nombre,correo,contrasenia,telefono,admin,concesionario};
    
    usuarios.push(usuario);
    res.render("login",{usuarios:usuarios});
  }
  else{
    
    res.render("error",{h1:"Usuario ya registrado",p:"No se pueden repetir usuarios"});
  }
});*/

/*app.get("/login",(req,res)=>{
  res.render("login",{usuario:req.session.usuario});
});

app.post("/login",(req,res)=>{
  const {correo,contrasenia}=req.body;
  const seleccion=usuarios.find((u)=>u.correo.toLowerCase()===correo.toLowerCase());
  

    if(seleccion){
    
      const validacion=seleccion.contrasenia===contrasenia;
      if(validacion){
        console.log("Usuario ha iniciado sesión");
        req.session.usuario={nombre:seleccion.nombre,correo:seleccion.correo,contrasenia:seleccion.contrasenia,telefono:seleccion.telefono,concesionario:seleccion.concesionario,
          admin:seleccion.admin};
        
        res.render("index",{usuario:req.session.usuario});
      }
      else{
        console.log("Contraseña incorrecta");
        res.render("error",{h1:"Contraseña incorrecta",p:"¡Acuérdate de tu contraseña cabrón!"});
      }

    }
    else{
      console.log("Usuario inexistente");
      res.render("error",{h1:"Usuario inexistente",p:"Parece que no te has registrado"});
    }
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      res.render("error", { h1: "Error", p: "No se pudo cerrar sesión" });
    }
    else {
      console.log("Cerrando sesión");
      res.redirect("/");
    }
  });
});*/

/*app.get("/vehiculos",(req,res)=>{
  res.render("vehiculos",{v:vehiculos,usuario:req.session.usuario});
});*/

/*app.get("/reserve",(req,res)=>{
    res.render("reserve",{usuario:req.session.usuario});
});

app.post("/reserve",(req,res)=>{
    const {vehiculo,date1,date2}=req.body;

    const seleccion=vehiculos.find(v=>v.nombre.toLowerCase()===vehiculo.toLowerCase());

    if(!seleccion){
      console.log("Vehículo no encontrado");
    }

    const reserva={nombre:seleccion.nombre,fechaIni:date1,fechaFin:date2,foto:seleccion.imagen,marca:seleccion.marca};
    reservas.push(reserva);
    console.log(reserva.nombre+" "+reserva.fechaIni+" "+reserva.fechaFin+" "+reserva.marca);

    if(!req.session.reservas){
      req.session.reservas=[];
    }

    req.session.reservas.push(reserva);

    res.render("reserves",{usuario:req.session.usuario,r:req.session.reservas});
});

app.get("/reserves",(req,res)=>{

  res.render("reserves",{usuario:req.session.usuario,r:req.session.reservas});
});*/

/*app.get("/concesionaire",(req,res)=>{
    res.render("concesionaire");
});

app.get("/concesionaires",(req,res)=>{
  res.render("concesionaires",{usuario:req.session.usuario});
});*/

app.listen(3000,(req,res)=>{
    console.log("Escuchando en el puerto 3000");
});
