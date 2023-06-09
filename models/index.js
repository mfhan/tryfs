const dbConfig = require("../db.config.js");
//console.log("This is db.config.js: " + dbConfig);

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//the index file exports the generic sequelize config info plus the vendormodel 

db.vendors = require("./vendor.model.js")(sequelize, Sequelize);

//console.log(db);

module.exports = db;