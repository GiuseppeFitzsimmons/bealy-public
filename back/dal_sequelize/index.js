var dbConfig = require("./config/config.json");
dbConfig = dbConfig.development

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user.model.js")(sequelize, Sequelize);

const createUser = async (user) =>{
    //console.log('db.sequelize', db.sequelize)
    return db.user.create(user) 
};

const deleteUser = async (user) =>{
    //console.log('db.sequelize', db.sequelize)
    return db.user.delete(user) 
};

module.exports = {createUser, deleteUser};

/*
const db = require("./app/models");
db.sequelize.sync();
*/