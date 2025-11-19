const express = require('express');
const router = express.Router();

const { vehiculos } = require("../data");

router.get("/",(req,res)=>{
  res.render("vehicle");
});

router.get("/",(req,res)=>{
  res.render("vehiculos",{v:vehiculos,usuario:req.session.usuario});
});

router.post("/",(req,res)=>{
  const {matricula,marca,modelo,anyo_matriculacion,plazas,autonomia,color,concesionario}=req.body;
  let idVehiculo;

    if(vehiculos.length>0){
      idVehiculo=vehiculos[vehiculos.length-1].id+1;
    }
    else{
      idVehiculo=1;
    }
  const estado="disponible";
  const vehiculo={id:idVehiculo,matricula,marca,modelo,anyo_matriculacion,plazas,autonomia,color,concesionario,estadoVehiculo:estado};
  vehiculos.push(vehiculo);

  if(!req.session.vehiculos){
    req.session.vehiculos=[];
  }

  req.session.vehiculos.push(vehiculo);
  res.render("vehiculos",{v:req.session.vehiculos,usuario:req.session.usuario});
});

router.get("/vehiculos",(req,res)=>{
  res.render("vehiculos",{v:req.session.vehiculos,usuario:req.session.usuario});
});

module.exports = router;