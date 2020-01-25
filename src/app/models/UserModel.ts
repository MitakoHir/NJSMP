import DatabaseModule from '../modules/Database';
import { Model, DataTypes } from 'sequelize';

const dbCon = DatabaseModule.getConnection();

export class UserModel extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: dbCon,
    modelName: 'user',
});
