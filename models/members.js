'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_members = sequelize.define('members', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    id_card: DataTypes.STRING,
    serial_number: DataTypes.STRING
  }, {});
  tbl_members.associate = function(models) {
    // associations can be defined here
  };
  return tbl_members;
};

'use strict';