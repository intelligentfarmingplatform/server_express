module.exports = (sequelize, DataTypes) => {
  const CustomerOrderItem = sequelize.define(
    "CustomerOrderItem",
    {
      cartItem: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    { sequelize, modelName: "CustomerOrderItem" }
  );
  CustomerOrderItem.associate = (models) => {
    CustomerOrderItem.belongsTo(models.CustomerOrder, {
      foreighKey: {
          allowNull: false,
      },
  });
  };
  return CustomerOrderItem;
};
