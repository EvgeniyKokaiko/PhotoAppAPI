import {DataTypes} from "sequelize";


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
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
})

module.exports = AlbumModel;
