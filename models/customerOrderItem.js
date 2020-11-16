module.exports = (sequelize, DataTypes) => {
  const CustomerOrderItem = sequelize.define(
    "CustomerOrderItem",
    {
      cartItem: DataTypes.JSON,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      orderStatus: DataTypes.STRING,
      estimatedDelivery: DataTypes.STRING,
    },
    { sequelize, modelName: "CustomerOrderItem" }
  );
  CustomerOrderItem.associate = (models) => {
    CustomerOrderItem.belongsTo(models.Customer, {
      foreighKey: {
        allowNull: false,
      },
    });
  };
  return CustomerOrderItem;
};
