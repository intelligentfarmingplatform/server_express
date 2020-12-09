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
    ec: DataTypes.DOUBLE,
    water_level: DataTypes.DOUBLE,
    pump_a: DataTypes.TINYINT(1),
    pump_b: DataTypes.TINYINT(1),
    pump_c: DataTypes.TINYINT(1),
    pump_d: DataTypes.TINYINT(1),

  }, {
    sequelize,
    modelName: 'tbl_dbList',
  });
  return dblist;
};