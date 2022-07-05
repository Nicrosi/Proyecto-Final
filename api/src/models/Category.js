const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('category', {
        id_category: {
            type: DataTypes.INTENGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
    }
    );
};
