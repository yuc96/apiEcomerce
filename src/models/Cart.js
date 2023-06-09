const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Product = require('./Product');
const Users = require('./Users');

const Cart = sequelize.define('cart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
});

Cart.belongsToMany(Product, { through: 'CartProduct', foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: 'CartProduct', foreignKey: 'productId' });

Users.hasMany(Cart,{ foreignKey: 'userId' });
Cart.belongsTo(Users,{ foreignKey: 'userId' });



module.exports = Cart;