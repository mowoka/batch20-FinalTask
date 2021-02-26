"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PurchaseBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseBook.belongsTo(models.Transaction, {
        as: "Transactions",
        foreignKey: "transactionId",
      });
      PurchaseBook.belongsTo(models.Book, {
        as: "Books",
        foreignKey: "bookId",
      });
    }
  }
  PurchaseBook.init(
    {
      transactionId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PurchaseBook",
    }
  );
  return PurchaseBook;
};
