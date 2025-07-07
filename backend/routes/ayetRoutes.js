const express = require('express');
const router = express.Router();
const ayetCtrl = require('../controllers/ayetController');

router.post('/callback', ayetCtrl.webhook);

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/callback", async (req, res) => {
  try {
    const { sub_id, amount } = req.body;

    if (!sub_id || !amount) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const user = await User.findById(sub_id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.puntos += parseInt(amount);
    user.ingresosReales += parseInt(amount);
    await user.save();

    res.status(200).json({ message: "Tarea registrada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar tarea" });
  }
});

module.exports = router;
