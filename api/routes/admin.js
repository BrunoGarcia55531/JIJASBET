<<<<<<< HEAD
const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'tu_secret_key_muy_seguro';

// Middleware para verificar admin
const verificarAdmin = (req, res, next) => {
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

// Verificar que sea admin
const esAdmin = async (req, res, next) => {
  try {
    const usuario = await global.Usuario.findByPk(req.usuarioId);
    if (!usuario?.esAdmin) {
      return res.status(403).json({ error: 'No es administrador' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Error al verificar admin' });
  }
};

// Obtener todas las apuestas pendientes
router.get('/apuestas-pendientes', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const apuestas = await global.Apuesta.findAll({
      where: { estadoPago: 'pendiente' },
      order: [['createdAt', 'DESC']]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las apuestas
router.get('/todas-apuestas', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const apuestas = await global.Apuesta.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar (aprobar) pago
router.put('/verificar/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    await apuesta.update({ estadoPago: 'verificado' });
    
    res.json({ message: 'Pago verificado ✅', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rechazar pago
router.put('/rechazar/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { motivo } = req.body;
    
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    await apuesta.update({
      estadoPago: 'rechazado',
      motivoRechazo: motivo
    });
    
    res.json({ message: 'Pago rechazado', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Establecer resultado del partido
router.put('/resultado/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { resultado } = req.body; // "local", "empate", "visitante"
    
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    const apuestaGanada = apuesta.tipoApuesta === resultado;
    
    await apuesta.update({
      resultadoPartido: resultado,
      apuestaGanada
    });
    
    res.json({ message: 'Resultado establecido', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Estadísticas
router.get('/estadisticas', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const totalApuestas = await global.Apuesta.count();
    const apuestasPendientes = await global.Apuesta.count({
      where: { estadoPago: 'pendiente' }
    });
    const apuestasVerificadas = await global.Apuesta.count({
      where: { estadoPago: 'verificado' }
    });
    
    const totalMonto = await global.Apuesta.sum('montoApuesta') || 0;
    
    res.json({
      totalApuestas,
      apuestasPendientes,
      apuestasVerificadas,
      totalMonto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== EVENTOS ==========

// Crear nuevo evento
router.post('/eventos', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { equipoLocal, equipoVisitante, liga, fechaPartido, cuotaLocal, cuotaEmpate, cuotaVisitante } = req.body;
    
    if (!equipoLocal || !equipoVisitante || !fechaPartido || !cuotaLocal || !cuotaEmpate || !cuotaVisitante) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    const evento = await global.Evento.create({
      equipoLocal,
      equipoVisitante,
      liga,
      fechaPartido,
      cuotaLocal,
      cuotaEmpate,
      cuotaVisitante
    });
    
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los eventos
router.get('/eventos', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const eventos = await global.Evento.findAll({
      order: [['fechaPartido', 'DESC']]
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener eventos activos (públicos)
router.get('/eventos-activos', async (req, res) => {
  try {
    const eventos = await global.Evento.findAll({
      where: { estado: 'activo' },
      order: [['fechaPartido', 'ASC']]
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar evento (resultado, estado)
router.put('/eventos/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { resultadoPartido, estado } = req.body;
    
    const evento = await global.Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    
    await evento.update({
      resultadoPartido: resultadoPartido || evento.resultadoPartido,
      estado: estado || evento.estado
    });
    
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
=======
const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'tu_secret_key_muy_seguro';

// Middleware para verificar admin
const verificarAdmin = (req, res, next) => {
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

// Verificar que sea admin
const esAdmin = async (req, res, next) => {
  try {
    const usuario = await global.Usuario.findByPk(req.usuarioId);
    if (!usuario?.esAdmin) {
      return res.status(403).json({ error: 'No es administrador' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Error al verificar admin' });
  }
};

// Obtener todas las apuestas pendientes
router.get('/apuestas-pendientes', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const apuestas = await global.Apuesta.findAll({
      where: { estadoPago: 'pendiente' },
      order: [['createdAt', 'DESC']]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las apuestas
router.get('/todas-apuestas', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const apuestas = await global.Apuesta.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar (aprobar) pago
router.put('/verificar/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    await apuesta.update({ estadoPago: 'verificado' });
    
    res.json({ message: 'Pago verificado ✅', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rechazar pago
router.put('/rechazar/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { motivo } = req.body;
    
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    await apuesta.update({
      estadoPago: 'rechazado',
      motivoRechazo: motivo
    });
    
    res.json({ message: 'Pago rechazado', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Establecer resultado del partido
router.put('/resultado/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { resultado } = req.body; // "local", "empate", "visitante"
    
    const apuesta = await global.Apuesta.findByPk(req.params.id);
    if (!apuesta) return res.status(404).json({ error: 'Apuesta no encontrada' });
    
    const apuestaGanada = apuesta.tipoApuesta === resultado;
    
    await apuesta.update({
      resultadoPartido: resultado,
      apuestaGanada
    });
    
    res.json({ message: 'Resultado establecido', apuesta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Estadísticas
router.get('/estadisticas', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const totalApuestas = await global.Apuesta.count();
    const apuestasPendientes = await global.Apuesta.count({
      where: { estadoPago: 'pendiente' }
    });
    const apuestasVerificadas = await global.Apuesta.count({
      where: { estadoPago: 'verificado' }
    });
    
    const totalMonto = await global.Apuesta.sum('montoApuesta') || 0;
    
    res.json({
      totalApuestas,
      apuestasPendientes,
      apuestasVerificadas,
      totalMonto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== EVENTOS ==========

// Crear nuevo evento
router.post('/eventos', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { equipoLocal, equipoVisitante, liga, fechaPartido, cuotaLocal, cuotaEmpate, cuotaVisitante } = req.body;
    
    if (!equipoLocal || !equipoVisitante || !fechaPartido || !cuotaLocal || !cuotaEmpate || !cuotaVisitante) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    
    const evento = await global.Evento.create({
      equipoLocal,
      equipoVisitante,
      liga,
      fechaPartido,
      cuotaLocal,
      cuotaEmpate,
      cuotaVisitante
    });
    
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los eventos
router.get('/eventos', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const eventos = await global.Evento.findAll({
      order: [['fechaPartido', 'DESC']]
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener eventos activos (públicos)
router.get('/eventos-activos', async (req, res) => {
  try {
    const eventos = await global.Evento.findAll({
      where: { estado: 'activo' },
      order: [['fechaPartido', 'ASC']]
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar evento (resultado, estado)
router.put('/eventos/:id', verificarAdmin, esAdmin, async (req, res) => {
  try {
    const { resultadoPartido, estado } = req.body;
    
    const evento = await global.Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    
    await evento.update({
      resultadoPartido: resultadoPartido || evento.resultadoPartido,
      estado: estado || evento.estado
    });
    
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
>>>>>>> a8d66373980e95431a62f59fe4672398f096d47c
