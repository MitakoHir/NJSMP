import { GroupModel } from '../models/GroupModel';
import { Group } from '../types/Group';
import DatabaseModule from '../modules/Database';
import { UserGroupModel } from '../models/UserGroupModel';

const sequelize = DatabaseModule.getConnection();

export class GroupDAO {

    public static async findById(id: number): Promise<GroupModel> {
        return GroupModel.findByPk(id);
    }

    public static async findByName(name: string): Promise<GroupModel> {
        return GroupModel.findOne({where: {name}});
    }

    public static async getAllGroups(): Promise<GroupModel[]> {
        return GroupModel.findAll();
    }

    public static async create(group: Group): Promise<GroupModel> {
        return GroupModel.create(group);
    }

    public static async update(
        groupModel: GroupModel,
        groupData: Partial<Group>,
    ): Promise<GroupModel> {
        return groupModel.update({...groupModel, ...groupData});
    }

    public static async delete(id: number): Promise<number> {
        return sequelize.transaction(async (t) => {
            const destRows = await GroupModel.destroy({where: {id}, transaction: t});
            await UserGroupModel.destroy({where: {groupId: id}, transaction: t});
            return destRows;
        });
    }
}
