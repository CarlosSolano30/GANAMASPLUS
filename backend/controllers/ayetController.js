const User = require('../models/User');

exports.webhook = async (req, res) => {
  try {
    const { user_id, amount_usd } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const puntos = Math.round(amount_usd * 4000); // ejemplo: 1 USD = 4000 puntos
    user.puntos += puntos;
    await user.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error en webhook Ayet.' });
  }
};
