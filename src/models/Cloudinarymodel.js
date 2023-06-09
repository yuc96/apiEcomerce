const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cloudinarymodel = sequelize.define('Cloudinarymodel', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cloudinarymodel;