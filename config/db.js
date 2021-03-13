const Sequelize = require('sequelize');

const sequelize = new Sequelize('TEST', 'fikri', 'fikripassword', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.UserModel = require('../models/UserModel.js')(sequelize, Sequelize);
db.PendidikanModel = require('../models/PendidikanModel.js')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
module.exports = db;