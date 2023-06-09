const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Category = require('./Category');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });

    Product.belongsToMany(Category, { through: 'CategoryProduct' });
    Category.belongsToMany(Product, { through: 'CategoryProduct' });

module.exports = Product;