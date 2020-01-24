import DatabaseModule from '../modules/Database';
import Sequelize from 'sequelize';
import { Model } from 'sequelize';

const dbCon = DatabaseModule.getConnection();

export class UserModel extends Model {}
UserModel.init({
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: dbCon,
    modelName: 'user',
});
