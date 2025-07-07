const express = require("express");
const router = express.Router();
const Withdraw = require("../models/Withdraw");
const User = require("../models/User");

// POST /api/retiros - Solicitar retiro
router.post("/", async (req, res) => {
  try {
    const { userId, monto, metodo } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.puntos < monto) {
      return res.status(400).json({ message: "No tienes suficientes puntos" });
    }

    if (user.ingresosReales < monto) {
      return res.status(400).json({ message: "Debes generar ingresos reales antes de retirar" });
    }

    const impuesto = Math.floor(monto * 0.1);
    const neto = monto - impuesto;

    user.puntos -= monto;
    await user.save();

    const retiro = new Withdraw({
      userId,
      monto: neto,
      metodo,
    });

    await retiro.save();

    res.status(201).json({ message: "Retiro solicitado", retiro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al solicitar retiro" });
  }
});

// GET /api/retiros/:userId - Historial de retiros
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const retiros = await Withdraw.find({ userId }).sort({ fecha: -1 });
    res.json(retiros);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener historial" });
  }
});

module.exports = router;
