import { Sequelize } from "sequelize";

const db = new Sequelize('laundry', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

db.sync({ logging: console.log});

export default db;