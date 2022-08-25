import {DataTypes, Sequelize} from "sequelize";


const Sequel = require('../db/database').eclipseConnection().client;

const AlbumModel = Sequel.define("albums", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    created_at: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    },
    updated_at: {
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    },
}, {
    timestamps: false,
})

module.exports = AlbumModel;
