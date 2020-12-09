'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class settingpump extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  settingpump.init({
    temp: DataTypes.DOUBLE,
    humi: DataTypes.INTEGER,
    ec: DataTypes.DOUBLE,
    water_level: DataTypes.DOUBLE,
    pump_a: DataTypes.TINYINT(1),
    pump_b: DataTypes.TINYINT(1),
    pump_c: DataTypes.TINYINT(1),
    pump_d: DataTypes.TINYINT(1),
    status: DataTypes.STRING,
    serial: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tbl_settingpump',
  });
  return settingpump;
};