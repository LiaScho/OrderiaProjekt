const Sequelize = require('sequelize');
// const path = require('path');
const mysql = require('mysql');
// const pgp = require('pg-promise')

const connection = require('./connection');

let database;

switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(
      connection.production.database,
      connection.production.username,
      connection.production.password, {
        host: connection.production.host,
        dialect: connection.production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  case 'testing':
    database = new Sequelize(
      connection.testing.database,
      connection.testing.username,
      connection.testing.password, {
        host: connection.testing.host,
        dialect: connection.testing.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  default:
    /*
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
        host: connection.development.host,
        dialect: connection.development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    ); */

    // database = pgp('postgres://username:password@host:port/database')

    database = mysql.createConnection({
      host: connection.development.host,
      user: connection.development.username,
      password: connection.development.password,
      database: connection.development.database,
    });

    // database.connect()
}

module.exports = database;
