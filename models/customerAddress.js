module.exports = (sequelize, DataTypes) => {
  const CustomerAddress = sequelize.define(
    "CustomerAddress",
    {
      addressId: DataTypes.STRING,
      email: DataTypes.STRING,
      orderStatus: DataTypes.STRING,
    },
    { sequelize, modelName: "CustomerAddress" }
  );
return CustomerAddress
};
