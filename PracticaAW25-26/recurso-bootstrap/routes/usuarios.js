"use strict";
const express = require("express");
const router = express.Router();
const { usuarios } = require("../data");

router.get("/:id/edit",(req,res)=>{
  const id=parseInt(req.params.id);
  console.log(id);
  const edit=usuarios.find((r)=>r.id===id);
  
  res.render("edit_user",{edit,usuario:req.session.usuario});
});

router.post("/:id/edit",(req,res)=>{
  const id = parseInt(req.params.id);
  const {nombre,correo,contrasenia,telefono,concesionario,image}=req.body;

  const index = usuarios.findIndex((c) => c.id === id);
    if(index!==-1){
        let newImage;
        if(!image){
            newImage=usuarios[index].image;
        }
        else{
            newImage=image;
        }

        usuarios[index].nombre=nombre;
        usuarios[index].correo=correo;
        usuarios[index].contrasenia=contrasenia;
        usuarios[index].telefono=telefono;
        usuarios[index].concesionario=concesionario;
        usuarios[index].image=newImage;
        

        if(req.session.usuario&&req.session.usuario.id===id){
            req.session.usuario.nombre=nombre;
            req.session.usuario.correo=correo;
            req.session.usuario.contrasenia=contrasenia;
            req.session.usuario.telefono=telefono;
            req.session.usuario.concesionario=concesionario;
            req.session.usuario.image=newImage;
        }
    }
  res.redirect("/");
});

module.exports = router;