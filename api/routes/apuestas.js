<<<<<<< HEAD
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'tu_secret_key_muy_seguro';

// Middleware para verificar autenticación
const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No autorizado' });
    const decoded = jwt.verify(token, SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Crear apuesta
router.post('/', verificarToken, async (req, res) => {
  try {
    const { eventoId, tipoApuesta, montoApuesta } = req.body;
    
    if (!eventoId || !tipoApuesta || !montoApuesta) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    const evento = await global.Evento.findByPk(eventoId);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    
    const usuario = await global.Usuario.findByPk(req.usuarioId);
    
    // Seleccionar cuota según tipo de apuesta
    let cuotaApuesta = 0;
    if (tipoApuesta === 'local') {
      cuotaApuesta = evento.cuotaLocal || evento.cuota || 1;
    } else if (tipoApuesta === 'empate') {
      cuotaApuesta = evento.cuotaEmpate || 1;
    } else if (tipoApuesta === 'visitante') {
      cuotaApuesta = evento.cuotaVisitante || evento.cuota || 1;
    }
    
    const apuesta = await global.Apuesta.create({
      usuarioId: req.usuarioId,
      eventoId,
      nombreUsuario: usuario.nombre,
      tipoApuesta,
      montoApuesta,
      cuota: cuotaApuesta,
      montoGanancia: montoApuesta * cuotaApuesta
    });
    
    // Incluir datos del evento en la respuesta
    const apuestaConEvento = await global.Apuesta.findByPk(apuesta.id, {
      include: [global.Evento]
    });
    
    res.json(apuestaConEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener apuestas del usuario
router.get('/mis-apuestas', verificarToken, async (req, res) => {
  try {
    const apuestas = await global.Apuesta.findAll({
      where: { usuarioId: req.usuarioId },
      include: [global.Evento],
      order: [['createdAt', 'DESC']]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una apuesta
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    res.json(apuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Subir comprobante de Yape
router.post('/:id/comprobante', verificarToken, async (req, res) => {
  try {
    const { comprobante, numeroTransaccion, montoPagado } = req.body;
    
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    if (apuesta.usuarioId !== req.usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    await apuesta.update({
      comprobante,
      numeroTransaccion,
      montoPagado,
      estadoPago: 'pendiente'
    });
    
    res.json({ message: 'Comprobante recibido. Pendiente de verificación', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
=======
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'tu_secret_key_muy_seguro';

// Middleware para verificar autenticación
const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No autorizado' });
    const decoded = jwt.verify(token, SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Crear apuesta
router.post('/', verificarToken, async (req, res) => {
  try {
    const { eventoId, tipoApuesta, montoApuesta } = req.body;
    
    if (!eventoId || !tipoApuesta || !montoApuesta) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    const evento = await global.Evento.findByPk(eventoId);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    
    const usuario = await global.Usuario.findByPk(req.usuarioId);
    
    // Seleccionar cuota según tipo de apuesta
    let cuotaApuesta = 0;
    if (tipoApuesta === 'local') {
      cuotaApuesta = evento.cuotaLocal || evento.cuota || 1;
    } else if (tipoApuesta === 'empate') {
      cuotaApuesta = evento.cuotaEmpate || 1;
    } else if (tipoApuesta === 'visitante') {
      cuotaApuesta = evento.cuotaVisitante || evento.cuota || 1;
    }
    
    const apuesta = await global.Apuesta.create({
      usuarioId: req.usuarioId,
      eventoId,
      nombreUsuario: usuario.nombre,
      tipoApuesta,
      montoApuesta,
      cuota: cuotaApuesta,
      montoGanancia: montoApuesta * cuotaApuesta
    });
    
    // Incluir datos del evento en la respuesta
    const apuestaConEvento = await global.Apuesta.findByPk(apuesta.id, {
      include: [global.Evento]
    });
    
    res.json(apuestaConEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener apuestas del usuario
router.get('/mis-apuestas', verificarToken, async (req, res) => {
  try {
    const apuestas = await global.Apuesta.findAll({
      where: { usuarioId: req.usuarioId },
      include: [global.Evento],
      order: [['createdAt', 'DESC']]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una apuesta
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    res.json(apuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Subir comprobante de Yape
router.post('/:id/comprobante', verificarToken, async (req, res) => {
  try {
    const { comprobante, numeroTransaccion, montoPagado } = req.body;
    
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    if (apuesta.usuarioId !== req.usuarioId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    await apuesta.update({
      comprobante,
      numeroTransaccion,
      montoPagado,
      estadoPago: 'pendiente'
    });
    
    res.json({ message: 'Comprobante recibido. Pendiente de verificación', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
>>>>>>> a8d66373980e95431a62f59fe4672398f096d47c
