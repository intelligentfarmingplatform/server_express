module.exports = (sequelize, DataTypes) => {
    const CustomerProfile = sequelize.define(
      "CustomerProfile",
      {
        displayName: DataTypes.STRING,
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        sex: DataTypes.INTEGER,
      },
      { sequelize, modelName: "CustomerProfile" }
    );
    CustomerProfile.associate = (models) => {
        CustomerProfile.belongsTo(models.Customer, {
        foreighKey: {
          allowNull: false,
        },
      });
    };
    return CustomerProfile;
  };
  