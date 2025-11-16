const express = require("express");
const router = express.Router();

const { usuarios } = require("../data");

router.get("/",(req,res)=>{
  res.render("login",{usuario:req.session.usuario});
});

router.post("/",(req,res)=>{
  const {correo,contrasenia}=req.body;
  const seleccion=usuarios.find((u)=>u.correo.toLowerCase()===correo.toLowerCase());
  

    if(seleccion){
    
      const validacion=seleccion.contrasenia===contrasenia;
      if(validacion){
        console.log("Usuario ha iniciado sesión");
        req.session.usuario={nombre:seleccion.nombre,correo:seleccion.correo,contrasenia:seleccion.contrasenia,telefono:seleccion.telefono,concesionario:seleccion.concesionario,
          admin:seleccion.admin};
        
        res.render("index",{usuario:req.session.usuario});
      }
      else{
        console.log("Contraseña incorrecta");
        res.render("error",{h1:"Contraseña incorrecta",p:"¡Acuérdate de tu contraseña cabrón!"});
      }

    }
    else{
      console.log("Usuario inexistente");
      res.render("error",{h1:"Usuario inexistente",p:"Parece que no te has registrado"});
    }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      res.render("error", { h1: "Error", p: "No se pudo cerrar sesión" });
    }
    else {
      console.log("Cerrando sesión");
      res.redirect("/");
    }
  });
});

module.exports = router;