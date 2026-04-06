const usuarioModel = require('./Usuario');
const apuestaModel = require('./Apuesta');
const eventoModel = require('./Evento');

const initializeDB = (sequelize) => {
  const Usuario = usuarioModel(sequelize);
  const Apuesta = apuestaModel(sequelize);
  const Evento = eventoModel(sequelize);

  // Asociaciones
  Usuario.hasMany(Apuesta, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
  Apuesta.belongsTo(Usuario, { foreignKey: 'usuarioId' });
  
  Evento.hasMany(Apuesta, { foreignKey: 'eventoId', onDelete: 'CASCADE' });
  Apuesta.belongsTo(Evento, { foreignKey: 'eventoId' });

  return { Usuario, Apuesta, Evento };
};

module.exports = initializeDB;
