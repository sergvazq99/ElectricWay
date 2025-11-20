const express = require("express");
const router = express.Router();

const {reservas}=require("../data");
const {vehiculos}=require("../data");


router.get("/",(req,res)=>{
    res.render("reserve",{usuario:req.session.usuario});
});

router.post("/",(req,res)=>{
    const {vehiculo,date1,date2}=req.body;

    const seleccion=vehiculos.find(v=>v.nombre.toLowerCase()===vehiculo.toLowerCase());

    if(!seleccion){
      return res.json({ok:false,campo:"veh",error:"El vehículo no existe"});
    }

    const fecha1=new Date(date1);
    const fecha2=new Date(date2);

    const nombreReserva=reservas.filter(r=>r.nombre===seleccion.nombre);
    const conc=req.session.usuario.concesionario;
    console.log(seleccion.concesionario);
    console.log(conc);
    if (seleccion.concesionario !== conc) {
      return res.json({ok:false,campo:"veh",error:"Ese vehículo no pertenece a tu concesionario"});
    }
    

    const conflicto=nombreReserva.some(r=>{
      const ini=new Date(r.fechaIni);
      const fin=new Date(r.fechaFin);
      return fecha1<=fin&&fecha2>=ini;
    });

    if(conflicto){
      return res.json({ok:false,campo:"date1",error:"El vehículo está reservado en esas fechas"});
    }
    else{
      seleccion.estadoVehiculo="reservado";
    }

    let idReserva;

    if(reservas.length>0){
      idReserva=reservas[reservas.length-1].id+1;
    }
    else{
      idReserva=1;
    }
    const f1=new Date(date1);
    const f2=new Date(date2);
    const tiempoRestante=f2-f1;
    const diasRestantes=tiempoRestante/(1000 * 60 * 60 * 24);
    const estado="activa";
    
    const reserva={id:idReserva,nombre:seleccion.nombre,fechaIni:date1,fechaFin:date2,foto:seleccion.imagen,marca:seleccion.marca,tiempo:diasRestantes,estadoReserva:estado,
      concesionario: seleccion.concesionario};
    
    reservas.push(reserva);

    if(!req.session.reservas){
      req.session.reservas=[];
    }

    req.session.reservas.push(reserva);

    res.json({ok:true,reserva});
});

module.exports = router;
