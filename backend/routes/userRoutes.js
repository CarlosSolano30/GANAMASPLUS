const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/registro', userCtrl.registro);
router.get('/referidos/:id', userCtrl.obtenerReferidos);
router.get('/historial/:id', userCtrl.obtenerHistorial);

module.exports = router;
