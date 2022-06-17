import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const order = db.define('order',{
    id_order:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_member:{
        type: DataTypes.INTEGER
    },
    id_paket:{
        type: DataTypes.INTEGER
    },
    nama_pelanggan:{
        type: DataTypes.STRING(50)
    },
    no_telp:{
        type: DataTypes.STRING(13)
    },
    alamat_pelanggan:{
        type: DataTypes.TEXT
    },
    id_jenislaundry:{
        type: DataTypes.INTEGER
    },
    qty:{
        type: DataTypes.FLOAT(10,2)
    },
    tgl_order:{
        type: DataTypes.DATE
    },
    status_order:{
        type: DataTypes.ENUM("Selesai", "Pending", "Cancel")
    }
},{
    freezeTableName: true,
    timestamps: false,
});
export default order;