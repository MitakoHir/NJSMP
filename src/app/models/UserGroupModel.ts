import { DataTypes, Model } from 'sequelize';
import DatabaseModule from '../modules/Database';
import { UserModel } from './UserModel';
import { GroupModel } from './GroupModel';

const dbCon = DatabaseModule.getConnection();

export class UserGroupModel extends Model {
    public userId!: number;
    public groupId!: number;
}

UserGroupModel.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize: dbCon,
        modelName: 'userGroup',
    },
);

UserGroupModel.sync().then(() => {
    UserModel.belongsToMany(GroupModel, {through: 'userGroups'});
    GroupModel.belongsToMany(UserModel, {through: 'userGroups'});
});
