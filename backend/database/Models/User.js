const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
  },
  {
    timestamps: false,
  }
);

module.exports = { User };
