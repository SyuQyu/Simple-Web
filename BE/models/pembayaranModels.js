import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const pembayaran = db.define('pembayaran',{
    id_pembayaran:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_order:{
        type: DataTypes.INTEGER
    },
    total_pembayaran:{
        type: DataTypes.INTEGER(50)
    },
    uang_masuk:{
        type: DataTypes.INTEGER(50)
    },
    uang_keluar:{
        type: DataTypes.INTEGER(50)
    },
    tgl_pembayaran:{
        type: DataTypes.DATE
    }
},{
    freezeTableName: true,
    timestamps: false,
});
export default pembayaran;