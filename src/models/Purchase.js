const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Product = require('./Product');
const Users = require('./Users');

const Purchase = sequelize.define('purchase', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
});

Product.belongsToMany(Purchase, { through: 'ProductPurchase', foreignKey: 'productId' });
Purchase.belongsToMany(Product, { through: 'ProductPurchase', foreignKey: 'purchaseId' });


Users.hasMany(Purchase,{ foreignKey: 'userId' });
Purchase.belongsTo(Users,{ foreignKey: 'userId' });


module.exports = Purchase;