"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      ISBN: DataTypes.INTEGER,
      author: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      bookAttachment: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
