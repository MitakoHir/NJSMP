import { Group, GroupServiceResponse } from '../types/Group';
import { GroupDAO } from '../data-access/GroupDAO';
import { UserGroupDAO } from '../data-access/UserGroupDAO';


export class GroupService {

    public static async getGroupById(id: number): Promise<GroupServiceResponse> {
        return await GroupDAO.findById(id);
    }

    public static async getAllGroups(): Promise<GroupServiceResponse> {
        return await GroupDAO.getAllGroups();
    }

    public static async addGroup(group: Group): Promise<GroupServiceResponse> {
        return await GroupDAO.create(group);
    }

    public static async updateGroup(group: Group): Promise<GroupServiceResponse> {
        const groupRecord = await GroupDAO.findByName(group.name);
        return await GroupDAO.update(groupRecord, group);
    }

    public static async deleteGroup(id: number): Promise<number> {
        return await GroupDAO.delete(id);
    }

    public static async addUsersToGroup(userIds: number[], groupId: number) {
        return UserGroupDAO.link(userIds, groupId);
    }
}
