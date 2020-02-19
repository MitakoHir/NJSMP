import { UserGroupModel } from '../models/UserGroupModel';
import { GroupModel } from '../models/GroupModel';
import { Transaction } from 'sequelize';
import DatabaseModule from '../modules/Database';
import { UserModel } from '../models/UserModel';

const sequelize = DatabaseModule.getConnection();

export class UserGroupDAO {
    public static async link(userIds: number[], groupId: number) {
        return sequelize.transaction(async (t: Transaction) => {
            const groupRecord = await GroupModel.findByPk(groupId, {transaction: t});
            const userRecords = await UserModel.findAll({where: {id: userIds}, transaction: t});

            return Promise.all(userRecords.map((user) => (
                UserGroupModel.create(
                    {userId: user.id, groupId: groupRecord.id},
                    {transaction: t},
                )
            )));
        });
    }
}
