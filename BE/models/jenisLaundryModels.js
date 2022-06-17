import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const jenisLaundry = db.define('jenislaundry',{
    id_jenislaundry :{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    jenis_laundry:{
        type: DataTypes.STRING(30)
    },
    harga:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
});

export default jenisLaundry;