//USES SEQUELIZE LIBRARY | LOCATES DATABASE CONNECTION | INITIALIZE TAG CLASS WITH SEQ MODEL CLASS 
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

// DEFINE COLUMNS & RULES FOR TAG MODEL | SET-UP PER DATABASE MODELS ON README
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;