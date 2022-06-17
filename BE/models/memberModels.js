import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const member = db.define('member',{
    id_member:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nama_member:{
        type: DataTypes.STRING(50)
    },
    no_telp:{
        type: DataTypes.STRING(13)
    },
    alamat:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true,
    timestamps: false
    
});

export default member;