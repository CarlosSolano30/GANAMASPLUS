const User = require('../models/User');

exports.registro = async (req, res) => {
  try {
    const { nombre, correo, telefono, referidoPor } = req.body;
    const nuevoUsuario = new User({ nombre, correo, telefono, referidoPor });

    if (referidoPor) {
      const refUser = await User.findById(referidoPor);
      if (refUser) {
        refUser.referidos.push(nuevoUsuario._id);
        await refUser.save();
      }
    }

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
};

exports.obtenerReferidos = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate('referidos');
    res.json(user.referidos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener referidos.' });
  }
};

exports.obtenerHistorial = async (req, res) => {
  const userId = req.params.id;
  const Withdraw = require('../models/Withdraw');
  try {
    const historial = await Withdraw.find({ userId });
    res.json(historial);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historial.' });
  }
};
