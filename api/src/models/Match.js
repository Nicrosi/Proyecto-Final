const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('match', {
        id_match: {
            type: DataTypes.INTENGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        
        },
        results: {
            type: DataTypes.INTENGER,
            allowNull: false
        },
        winner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loser: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        b_number: {
            type: DataTypes.INTENGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
    );
};
