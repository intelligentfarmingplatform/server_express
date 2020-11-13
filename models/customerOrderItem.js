module.exports = (sequelize, DataTypes) => {
  const CustomerOrderItem = sequelize.define(
    "CustomerOrderItem",
    {
      cartItem: DataTypes.JSON,
      customerId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      orderStatus: DataTypes.STRING,
      estimatedDelivery: DataTypes.STRING,
    },
    { sequelize, modelName: "CustomerOrderItem" }
  );
  return CustomerOrderItem;
};
 