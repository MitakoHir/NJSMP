import { Group, GroupServiceResponse } from '../types/Group';
import { GroupDAO } from '../data-access/GroupDAO';
import { UserGroupDAO } from '../data-access/UserGroupDAO';
import { ServiceMethodLogger } from '../middleware/loggers/Service';


export class GroupService {

    @ServiceMethodLogger()
    public static async getGroupById(id: number): Promise<GroupServiceResponse> {
        return await GroupDAO.findById(id);
    }

    @ServiceMethodLogger()
    public static async getAllGroups(): Promise<GroupServiceResponse> {
        return await GroupDAO.getAllGroups();
    }

    @ServiceMethodLogger()
    public static async addGroup(group: Group): Promise<GroupServiceResponse> {
        return await GroupDAO.create(group);
    }

    @ServiceMethodLogger()
    public static async updateGroup(group: Group): Promise<GroupServiceResponse> {
        const groupRecord = await GroupDAO.findByName(group.name);
        return await GroupDAO.update(groupRecord, group);
    }

    @ServiceMethodLogger()
    public static async deleteGroup(id: number): Promise<number> {
        return await GroupDAO.delete(id);
    }

    @ServiceMethodLogger()
    public static async addUsersToGroup(userIds: number[], groupId: number) {
        return UserGroupDAO.link(userIds, groupId);
    }
}
