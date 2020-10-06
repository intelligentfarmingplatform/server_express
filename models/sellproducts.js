'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sellproducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sellproducts.init({
    sell_id: DataTypes.STRING,
    productimg: DataTypes.BLOB,
    productname: DataTypes.STRING,
    productdetail: DataTypes.TEXT,
    productprice: DataTypes.INTEGER,
    productnumber: DataTypes.INTEGER,
    producttab: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_sellproducts',
  });
  return sellproducts;
};