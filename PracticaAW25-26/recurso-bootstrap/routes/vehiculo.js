const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require("../db");

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/recurso-imagenes/vehiculos')); // carpeta donde se guardan las imágenes
  },
  filename: function(req, file, cb) {
    // Evitar conflictos de nombres: fecha + nombre original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

router.get("/",async (req,res)=>{ 
  res.render("vehicle");
});

router.post("/",upload.single("image"), async (req,res)=>{
  const {matricula,marca,modelo,autonomia,anyo_matriculacion,plazas,color,concesionario}=req.body;

  
  const estadoVehiculo="disponible";
  const imagen = req.file ? req.file.filename : null;
  try{
    const [c] = await db.query("SELECT id FROM concesionarios WHERE nombre = ?",[concesionario]);
            
    if (c.length === 0) {
          return res.status(400).json({
                ok: false,
                error: "El concesionario no existe"
          });
    }
    const idConcesionario=c[0].id;
    const [result]=await db.query("INSERT INTO vehiculos (matricula,marca,modelo,autonomia,anyo_matriculacion,plazas,estadoVehiculo,imagen,color,idConcesionario)"+ 
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)",[matricula,marca,modelo,autonomia,anyo_matriculacion,plazas,estadoVehiculo,imagen,color,idConcesionario]);

      res.json({ ok: true, id: result.insertId });
  }
  catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, error: "Error al insertar vehículo" });
  }
  
});

router.get("/vehiculos",async (req,res)=>{
  const idCon = req.session.usuario.idConcesionario;
  try{
    const [vehiculos]=await db.query("SELECT vehiculos.*,concesionarios.nombre AS concesionario FROM vehiculos "+
      "INNER JOIN concesionarios ON vehiculos.idConcesionario = concesionarios.id WHERE vehiculos.idConcesionario = ?",[idCon]);
    res.render("vehicles",{v:vehiculos,usuario:req.session.usuario});
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar vehículos");
  }

  
});

module.exports = router;