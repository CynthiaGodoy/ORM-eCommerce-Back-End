//USES SEQUELIZE LIBRARY | LOCATES DATABASE CONNECTION | INITIALIZE PRODUCT TAG CLASS WITH SEQ MODEL CLASS 
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

// DEFINE COLUMNS & RULES FOR PRODUCT TAG MODEL | SET UP PER DATABASE MODELS ON README
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: { // FOREIGN KEY
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: { // FOREIGN KEY
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;