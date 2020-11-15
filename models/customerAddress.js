module.exports = (sequelize, DataTypes) => {
  const CustomerAddress = sequelize.define(
    "CustomerAddress",
    {
      customerId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      district: DataTypes.STRING,
      province: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      phoneNumber: DataTypes.STRING
    },
    { sequelize, modelName: "CustomerAddress" }
  );
return CustomerAddress
};
