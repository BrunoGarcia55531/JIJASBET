const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'tu_secret_key_muy_seguro';

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, contraseña, telefono } = req.body;
    
    const usuarioExistente = await global.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }
    
    const usuario = await global.Usuario.create({
      nombre,
      email,
      contraseña,
      telefono
    });
    
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '30d' });
    
    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    
    const usuario = await global.Usuario.findOne({ where: { email } });
    if (!usuario || !(await usuario.compararContraseña(contraseña))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '30d' });
    
    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, esAdmin: usuario.esAdmin }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar token
router.get('/me', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No autorizado' });
    
    const decoded = jwt.verify(token, SECRET);
    res.json(decoded);
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
