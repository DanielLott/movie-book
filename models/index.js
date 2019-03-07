'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'production';
var config = require(__dirname + '/../config/config.json')[env];
const host = process.env.SERVER || config.host
const database = process.env.NAME || config.database
const username = process.env.USERNAME || config.username
const password = process.env.PASSWORD || config.password
const dialect = process.env.DIALECT || config.dialect

var db = {};

if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(database, config.username, password, {
        host,
        dialect,
        logging: false,
        operatorsAliases: false
    });
}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
