const express = require("express");
const router = express.Router();
const Withdraw = require("../models/Withdraw");

// Ver todos los retiros pendientes
router.get("/retiros", async (req, res) => {
  const pendientes = await Withdraw.find({ estado: "pendiente" }).populate("userId", "nombre correo");
  res.json(pendientes);
});

// Aprobar o rechazar un retiro
router.post("/retiros/:id", async (req, res) => {
  const { estado } = req.body;
  if (!["aprobado", "rechazado"].includes(estado)) {
    return res.status(400).json({ message: "Estado inválido" });
  }

  const retiro = await Withdraw.findByIdAndUpdate(req.params.id, { estado }, { new: true });
  res.json(retiro);
});

module.exports = router;
