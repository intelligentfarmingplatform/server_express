'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dbrealtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dbrealtime.init({
    serial_number: DataTypes.INTEGER,
    temp: DataTypes.DOUBLE,
    humi: DataTypes.INTEGER,
    ec: DataTypes.FLOAT,
    water_level: DataTypes.INTEGER,
    light_int: DataTypes.INTEGER,
    pump_a: DataTypes.STRING,
    pump_b: DataTypes.STRING,
    pump_c: DataTypes.STRING,
    pump_d: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tbl_dbRealtime',
  });
  return dbrealtime;
};