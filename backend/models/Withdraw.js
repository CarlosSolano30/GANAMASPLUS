const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  metodo: {
    type: String,
    enum: ["nequi", "paypal"],
    required: true,
  },
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado"],
    default: "pendiente",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
