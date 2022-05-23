//USES SEQUELIZE LIBRARY | LOCATES DATABASE CONNECTION | INITIALIZE CATEGORY CLASS WITH SEQ MODEL CLASS 
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

// DEFINE COLUMNS & RULES FOR CATEGORY MODEL | SET-UP PER DATABASE MODELS ON README
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;