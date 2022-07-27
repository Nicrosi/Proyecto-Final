const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('match', {
        id_match: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,        
        },
        score: {
            type: DataTypes.STRING,
            allowNull: false
         }
    },
    {
        timestamps: false,
    }
    );
};
