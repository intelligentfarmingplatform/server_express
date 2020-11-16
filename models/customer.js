module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      userName: { type: DataTypes.STRING, allowNull: false, len: [5, 20] },
      password: { type: DataTypes.STRING, allowNull: false, len: [8, 20] },
      email: { type: DataTypes.STRING, allowNull: false, len: [5, 50] },
      profileId: DataTypes.STRING,
      status_level: { type: DataTypes.STRING, allowNull: false },
      defaultAddress: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Customer",
      scopes: {
        withoutPassword: {
          attributes: {
            exclude: ["password", "status_level", "defaultAddress"],
          },
        },
      },
    }
  );
  Customer.associate = (models) => {
    Customer.hasOne(models.CustomerProfile, {
      onDelete: "cascade",
    });
    Customer.hasMany(models.CustomerAddress, {
      onDelete: "cascade",
    });
    Customer.hasMany(models.CustomerOrderItem, {
      onDelete: "cascade",
    });
  };
  return Customer;
};
