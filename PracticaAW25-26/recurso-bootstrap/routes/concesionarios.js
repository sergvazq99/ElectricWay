"use strict"
const express = require("express");
const router = express.Router();

const { concesionarios } = require("../data");

router.get("/",(req,res)=>{
  res.render("concesionaires",{c:req.session.concesionarios,usuario:req.session.usuario});
});

router.get("/:id/delete",(req,res)=>{
  const id=parseInt(req.params.id);

  const index=concesionarios.findIndex((r)=>r.id===id);

  if(index!=-1){
    concesionarios.splice(index,1);
  }

  if(req.session.concesionarios){
    req.session.concesionarios=req.session.concesionarios.filter((r)=>r.id!==id);
  }

  res.redirect("/concesionarios");
});

router.get("/:id/edit",(req,res)=>{
  const id=parseInt(req.params.id);

  const concesionario=concesionarios.find((r)=>r.id===id);

  res.render("edit_concesionario",{concesionario,usuario:req.session.usuario});
});

router.post("/:id/edit",(req,res)=>{
  const id = parseInt(req.params.id);
  const { nombre, ciudad, direccion, telefono } = req.body;

  const index = concesionarios.findIndex((c) => c.id === id);

  if(index!==-1){
    concesionarios[index].nombre=nombre;
    concesionarios[index].ciudad=ciudad;
    concesionarios[index].direccion=direccion;
    concesionarios[index].telefono=telefono;

    if(req.session.concesionarios){
      const indexSession=req.session.concesionarios.findIndex((c)=>c.id===id);
      if(indexSession!==-1){
        req.session.concesionarios[indexSession].nombre=nombre;
        req.session.concesionarios[indexSession].ciudad=ciudad;
        req.session.concesionarios[indexSession].direccion=direccion;
        req.session.concesionarios[indexSession].telefono=telefono;
      }
    }
  }

  
  res.redirect("/concesionarios");
});

module.exports = router;