const User = require('../models/User');
const Withdraw = require('../models/Withdraw');

exports.solicitarRetiro = async (req, res) => {
  const { userId, metodo, monto } = req.body;

  if (monto < 25000) return res.status(400).json({ error: 'Monto mínimo: 25000' });

  try {
    const user = await User.findById(userId);
    const montoFinal = monto - monto * 0.1; // 10% impuesto

    if (user.puntos < monto) return res.status(400).json({ error: 'Puntos insuficientes' });

    // TODO: Validar ingresos reales del usuario (API AyetStudios)

    user.puntos -= monto;
    await user.save();

    const retiro = new Withdraw({ userId, metodo, monto: montoFinal });
    await retiro.save();

    res.status(201).json(retiro);
  } catch (err) {
    res.status(500).json({ error: 'Error al solicitar retiro.' });
  }
};

exports.obtenerRetiros = async (req, res) => {
  const { userId } = req.params;
  try {
    const retiros = await Withdraw.find({ userId });
    res.json(retiros);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener retiros.' });
  }
};
