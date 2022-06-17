import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const userLevel = db.define('user_level',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(100)
    },
    email:{
        type: DataTypes.STRING(100)
    },
    password:{
        type: DataTypes.STRING(100)
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    u_level:{
        type: DataTypes.INTEGER
    },
},{
    freezeTableName: true,
    timestamps: false
});

export default userLevel;