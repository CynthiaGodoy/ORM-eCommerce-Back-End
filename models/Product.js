//USES SEQUELIZE LIBRARY | LOCATES DATABASE CONNECTION | INITIALIZE PRODUCT CLASS WITH SEQ MODEL CLASS 
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Product extends Model {}

// DEFINE COLUMNS & RULES FOR PRODUCT MODEL | SET-UP PER DATABASE MODELS ON README
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true    
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // IF ALLOW NULL IS NOT SET TO TRUE, A CATEGORY CANNOT BE DELETED
      references: { // FOREIGN KEY JOIN
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;