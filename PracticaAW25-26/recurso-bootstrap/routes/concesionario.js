"use strict"
const express = require("express");
const router = express.Router();

const { concesionarios } = require("../data");

router.get("/",(req,res)=>{
  res.render("concesionaire");
});

router.post("/",(req,res)=>{
    const{nombre,ciudad,direccion,telefono}=req.body;

    let idConcesionario;

    if(concesionarios.length>0){
      idConcesionario=concesionarios[concesionarios.length-1].id+1;
    }
    else{
      idConcesionario=1;
    }

    const concesionario={id:idConcesionario,nombre,ciudad,direccion,telefono};
    concesionarios.push(concesionario);

    if(!req.session.concesionarios){
      req.session.concesionarios=[];
    }

    req.session.concesionarios.push(concesionario);
    res.render("concesionaires",{c:req.session.concesionarios,usuario:req.session.usuario});
});




module.exports = router;