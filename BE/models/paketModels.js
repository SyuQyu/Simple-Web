import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const paket = db.define('paket',{
    id_paket:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    jenis_paket:{
        type: DataTypes.STRING(50)
    },
    harga_paket:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
});

export default paket;