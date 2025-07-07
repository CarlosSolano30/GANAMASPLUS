const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  puntos: { type: Number, default: 0 },
  referidoPor: String,
  referidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ingresosReales: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);

