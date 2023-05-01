import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
const Blog = sequelize.define(
    'Blog',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: 'blogs',
    },
);

export default Blog;
