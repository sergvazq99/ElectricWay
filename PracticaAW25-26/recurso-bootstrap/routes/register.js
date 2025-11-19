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
  const {nombre,correo,contrasenia,telefono,concesionario}=req.body;
  const seleccion=usuarios.find(u=>u.nombre.toLowerCase()===nombre.toLowerCase());
  console.log(concesionario);
  if(!seleccion){
    console.log("Usuario registrado");
    let image;
    if(!req.body.image){
      image="noUser.png";
    }
    else{
      image=req.body.image;
    }
    console.log(image);
    let idUsuario;

    if(usuarios.length>0){
      idUsuario=usuarios[usuarios.length-1].id+1;
    }
    else{
      idUsuario=1;
    }
    console.log(idUsuario);
    const usuario={id:idUsuario,nombre,correo,contrasenia,telefono,admin,concesionario,image};
    console.log(usuario.id);
    usuarios.push(usuario);
    res.render("login",{usuarios:usuarios});
  }
  else{
    
    res.render("error",{h1:"Usuario ya registrado",p:"No se pueden repetir usuarios"});
  }
});


module.exports = router;