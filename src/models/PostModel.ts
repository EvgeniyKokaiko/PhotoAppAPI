import {DataTypes, Sequelize} from "sequelize";


const Sequel = require('../db/database').eclipseConnection().client;
const AlbumModel = require('./AlbumModel')

const PostModel = Sequel.define("posts", {
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'Hello there!',
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    tableName: 'posts',
    });

PostModel.belongsTo(AlbumModel, {foreignKey: 'album_id', onDelete: 'CASCADE'})


module.exports = PostModel
