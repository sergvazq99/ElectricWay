"use strict"
const express = require("express");
const router = express.Router();

const { usuarios } = require("../data");

router.get("/",(req,res)=>{
  res.render("register",{usuarios:usuarios});
});

router.post("/",(req,res)=>{
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
});

module.exports = router;