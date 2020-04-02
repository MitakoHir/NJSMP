import DatabaseModule from '../modules/Database';
import { Model, DataTypes } from 'sequelize';
import { ALLOWED_PERMISSIONS, Permission } from '../types/Group';

const dbCon = DatabaseModule.getConnection();

export class GroupModel extends Model {
    public id!: number;
    public name!: string;
    public permissions!: Permission[];

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

GroupModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        values: [...ALLOWED_PERMISSIONS],
        allowNull: false,
    },
}, {
    sequelize: dbCon,
    modelName: 'group',
});
GroupModel.sync().then();
