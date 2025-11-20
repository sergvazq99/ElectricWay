"use strict"
const vehiculos=[{id:1,imagen:"byd_seal1.png",nombre:"Byd Seal 1",desc:"xxx",matricula:"67891FYS",marca:"Renault",autonomia:500,estadoVehiculo:"disponible",concesionario:2},
  {id:2,imagen:"byd_seal2.png",nombre:"Byd Seal 2",desc:"yyy",matricula:"123456ABC",marca:"Opel",autonomia:680,estadoVehiculo:"disponible",concesionario:1},
  {id:3,imagen:"byd_seal3.png",nombre:"Byd Seal 3",desc:"zzz",matricula:"654321XYZ",marca:"Audi",autonomia:400,estadoVehiculo:"disponible",concesionario:"Two"},
  {id:4,imagen:"byd_seal1.png",nombre:"Byd Seal 1",desc:"xxx",matricula:"67891FYS",marca:"Renault",autonomia:500,estadoVehiculo:"disponible",concesionario:"Two"},
  {id:5,imagen:"byd_seal2.png",nombre:"Byd Seal 2",desc:"yyy",matricula:"123456ABC",marca:"Opel",autonomia:680,estadoVehiculo:"disponible",concesionario:"Two"},
  {id:6,imagen:"byd_seal3.png",nombre:"Byd Seal 3",desc:"zzz",matricula:"654321XYZ",marca:"Audi",autonomia:400,estadoVehiculo:"disponible",concesionario:"Two"}
];

const reservas=[];
const usuarios=[{id:1,nombre:"Sergio",correo:"sergio@gmail.com",contrasenia:"sergieteA@1",concesionario:2,admin:"employee",image:"billPuertas.png"}];
const concesionarios=[/*{nombre:"Concesionario Pérez",ciudad:"Madrid",direccion:"C/ Fresa",telefono:"913572715"}*/];

module.exports = { vehiculos, reservas, usuarios, concesionarios };