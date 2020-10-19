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
    temp: DataTypes.INTEGER,
    humi: DataTypes.INTEGER,
    ec: DataTypes.INTEGER,
    water_level: DataTypes.INTEGER,
    pump_a: DataTypes.STRING,
    pump_b: DataTypes.STRING,
    pump_c: DataTypes.STRING,
    pump_d: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'tbl_settingpump',
  });
  return settingpump;
};