'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dblist extends Model {
    static associate(models) {
    }
  };
  dblist.init({
    serial_number: DataTypes.INTEGER,
    temp: DataTypes.DOUBLE,
    humi: DataTypes.INTEGER,
    ec: DataTypes.FLOAT,
    light_int: DataTypes.INTEGER,
    pump_a: DataTypes.STRING,
    pump_b: DataTypes.STRING,
    pump_c: DataTypes.STRING,
    pump_d: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'tbl_dbList',
  });
  return dblist;
};