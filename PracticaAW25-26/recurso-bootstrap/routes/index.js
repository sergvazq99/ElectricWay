
const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
  res.render("index",{usuario:req.session.usuario});
});

module.exports = router;
