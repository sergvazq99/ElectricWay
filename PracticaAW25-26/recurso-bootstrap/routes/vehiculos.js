"use strict"
const express = require("express");
const router = express.Router();

const {reservas}=require("../data");
const {vehiculos}=require("../data");

router.get("/",(req,res)=>{
    res.render("vehiculos",{usuario:req.session.usuario,v:req.session.vehiculos});
});

router.get("/:id/delete",(req,res)=>{
  const id=parseInt(req.params.id);

  const index=vehiculos.findIndex((r)=>r.id===id);

  if(index!=-1){
    const vehiculo=vehiculos[index];
    vehiculo.estadoVehiculo="mantenimiento";
    vehiculos.splice(index,1);
  }

  if(req.session.vehiculos){
    req.session.vehiculos=req.session.vehiculos.filter((r)=>r.id!==id);
  }

  res.redirect("/vehiculos");
});

router.get("/:id/edit",(req,res)=>{
  const id=parseInt(req.params.id);

  const vehiculo=vehiculos.find((r)=>r.id===id);

  res.render("edit_vehiculo",{vehiculo,usuario:req.session.usuario});
});

router.post("/:id/edit",(req,res)=>{
    const id = parseInt(req.params.id);
    const {matricula,marca,modelo,anyo_matriculacion,plazas,autonomia,color,concesionario}=req.body;

    const index = reservas.findIndex((c) => c.id === id);

    if(index!=-1){
        vehiculos[index]={id,matricula,marca,modelo,anyo_matriculacion,plazas,autonomia,color,concesionario};
    }

    if(req.session.vehiculos){
        const indexSession=req.session.vehiculos.findIndex((c)=>c.id===id);
        if(indexSession!==-1){
            req.session.vehiculos[indexSession]={id,matricula,marca,modelo,anyo_matriculacion,plazas,autonomia,color,concesionario};
        }
    }

    res.redirect("/vehiculos");
});


