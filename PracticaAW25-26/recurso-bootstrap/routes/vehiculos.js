"use strict"
const express = require("express");
const router = express.Router();

const {reservas}=require("../data");
const {vehiculos}=require("../data");

router.get("/",(req,res)=>{
    res.render("vehicles",{usuario:req.session.usuario,v:req.session.vehiculos});
});

router.get("/:id/delete",(req,res)=>{
  const id=parseInt(req.params.id);

  const index=vehiculos.findIndex((r)=>r.id===id);

  if(index!==-1){
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
  const { matricula, marca, modelo, telefono,anyo_matriculacion,plazas,autonomia } = req.body;

  const index = vehiculos.findIndex((c) => c.id === id);
  
  

  if(index!==-1){
    const modeloAntiguo=vehiculos[index].modelo;
    vehiculos[index].matricula=matricula;
    vehiculos[index].marca=marca;
    vehiculos[index].modelo=modelo;
    vehiculos[index].telefono=telefono;
    vehiculos[index].anyo_matriculacion=anyo_matriculacion;
    vehiculos[index].plazas=plazas;
    vehiculos[index].autonomia=autonomia;

    reservas.forEach(r => {
      if(r.nombre.toLowerCase() === modeloAntiguo.toLowerCase()){
        r.marca = marca;
        r.modelo = modelo;
      }
    });

    if(req.session.vehiculos){
      const indexSession=req.session.vehiculos.findIndex((c)=>c.id===id);
      if(indexSession!==-1){
        req.session.vehiculos[indexSession].matricula=matricula;
        req.session.vehiculos[indexSession].marca=marca;
        req.session.vehiculos[indexSession].modelo=modelo;
        req.session.vehiculos[indexSession].telefono=telefono;
        req.session.vehiculos[indexSession].anyo_matriculacion=anyo_matriculacion;
        req.session.vehiculos[indexSession].plazas=plazas;
        req.session.vehiculos[indexSession].autonomia=autonomia;
      }
    }
  }

  
  res.redirect("/vehiculos");
});


module.exports = router;