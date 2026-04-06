<<<<<<< HEAD
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');
const initializeDB = require('./models');

const app = express();

// DB Connection
const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.PGDATABASE || 'jijasbet',
  process.env.DB_USER || process.env.PGUSER || 'jijasbet',
  process.env.DB_PASSWORD || process.env.PGPASSWORD || 'jijasbet123',
  {
    host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
    port: process.env.DB_PORT || process.env.PGPORT || 5433,
    dialect: 'postgres',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL conectado');
    sequelize.sync();
  })
  .catch(err => console.error('❌ Error PostgreSQL:', err));

// Inicializar modelos
const { Usuario, Apuesta, Evento } = initializeDB(sequelize);
global.Usuario = Usuario;
global.Apuesta = Apuesta;
global.Evento = Evento;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/apuestas', require('./routes/apuestas'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Servir cliente React en producción
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});

module.exports = app;

=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');
const initializeDB = require('./models');

const app = express();

// DB Connection
const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.PGDATABASE || 'jijasbet',
  process.env.DB_USER || process.env.PGUSER || 'jijasbet',
  process.env.DB_PASSWORD || process.env.PGPASSWORD || 'jijasbet123',
  {
    host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
    port: process.env.DB_PORT || process.env.PGPORT || 5433,
    dialect: 'postgres',
    logging: false
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL conectado');
    sequelize.sync();
  })
  .catch(err => console.error('❌ Error PostgreSQL:', err));

// Inicializar modelos
const { Usuario, Apuesta, Evento } = initializeDB(sequelize);
global.Usuario = Usuario;
global.Apuesta = Apuesta;
global.Evento = Evento;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/apuestas', require('./routes/apuestas'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Servir cliente React en producción
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});

module.exports = app;

>>>>>>> a8d66373980e95431a62f59fe4672398f096d47c
