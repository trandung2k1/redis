import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.DATABASE!, process.env.USER!, process.env.PASSWORD!, {
    dialect: 'mssql',
    host: process.env.HOST,
    port: +process.env.PORT_DB!,
    // logging: (...msg) => console.log(msg),
    logging: false,
});

export default sequelize;
