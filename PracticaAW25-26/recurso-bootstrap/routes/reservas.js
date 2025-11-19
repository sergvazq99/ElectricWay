"use strict"
const express = require("express");
const router = express.Router();

const {reservas}=require("../data");
const {vehiculos}=require("../data");

router.get("/",(req,res)=>{
  res.render("reserves",{usuario:req.session.usuario,r:req.session.reservas});
});

router.get("/:id/delete",(req,res)=>{
  const id=parseInt(req.params.id);

  const index=reservas.findIndex((r)=>r.id===id);

  if(index!==-1){
    const reserva=reservas[index];
    reserva.estadoReserva="cancelada";
    reservas.splice(index,1);
    
  }

  if(req.session.reservas){
    req.session.reservas=req.session.reservas.filter((r)=>r.id!==id);
  }

  res.redirect("/reservas");
});

router.get("/:id/edit",(req,res)=>{
  const id=parseInt(req.params.id);

  const reserva=reservas.find((r)=>r.id===id);

  res.render("edit_reserva",{reserva,usuario:req.session.usuario});
});

router.post("/:id/edit",(req,res)=>{
  const id = parseInt(req.params.id);
  const {vehiculo,marca,date1,date2} = req.body;

  const index = reservas.findIndex((c) => c.id === id);

  const fecha1=new Date(date1);
  const fecha2=new Date(date2);

  const antiguoVehiculo=vehiculos.find(v=>v.nombre===reservas[index].nombre);
  const nuevoVehiculo=vehiculos.find(v=>v.nombre.toLowerCase()===vehiculo.toLowerCase()&&v.marca.toLowerCase()===marca.toLowerCase());

  if(!nuevoVehiculo){
    console.log("Ese vehículo no existe");
  }

  const nombreReserva=reservas.filter(r=>r.nombre===nuevoVehiculo.nombre&&r.id!==id);

  const conflicto=nombreReserva.some(r=>{
    const ini=new Date(r.fechaIni);
    const fin=new Date(r.fechaFin);
    return fecha1<=fin&&fecha2>=ini;
  });

  if(conflicto){
    console.log("No puedes reservar ese vehículo en esas fechas");
    return res.redirect("/reservas");
  }
  else{
    if(nuevoVehiculo.nombre!==antiguoVehiculo.nombre){
      nuevoVehiculo.estadoVehiculo="reservado";
      antiguoVehiculo.estadoVehiculo="disponible";
    }
    
  }

  
  const tiempo=(fecha2 - fecha1) / (1000 * 60 * 60 * 24);
  reservas[index].nombre=nuevoVehiculo.nombre;
  reservas[index].fechaIni=date1;
  reservas[index].fechaFin=date2;
  reservas[index].marca=nuevoVehiculo.marca
  reservas[index].tiempo=tiempo;
  

  if(req.session.reservas){
    const indexSession=req.session.reservas.findIndex((c)=>c.id===id);
    if(indexSession!==-1){
      req.session.reservas[indexSession].nombre=nuevoVehiculo.nombre;
      req.session.reservas[indexSession].fechaIni=date1;
      req.session.reservas[indexSession].fechaFin=date2;
      req.session.reservas[indexSession].tiempo=tiempo;
      req.session.reservas[indexSession].marca=nuevoVehiculo.marca;
    }
  }
  
  res.redirect("/reservas");
});

module.exports = router;
