import { Group, GroupServiceResponse } from '../types/Group';
import { GroupDAO } from '../data-access/GroupDAO';
import { UserGroupDAO } from '../data-access/UserGroupDAO';


export class GroupService {

    public static async getGroupById(id: number): Promise<GroupServiceResponse> {
        try {
            return await GroupDAO.findById(id);
        } catch (e) {
            throw Error(`The error occurred while getting group by id: ${e.message}`);
        }
    }

    public static async getAllGroups(): Promise<GroupServiceResponse> {
        try {
            return await GroupDAO.getAllGroups();
        } catch (e) {
            throw Error(`The error occurred getting all groups: ${e.message}`);
        }
    }

    public static async addGroup(group: Group): Promise<GroupServiceResponse> {
        try {
            return await GroupDAO.create(group);
        } catch (e) {
            throw Error(`The error occurred while creating Group: ${e.message}`);
        }
    }

    public static async updateGroup(group: Group): Promise<GroupServiceResponse> {
        try {
            const groupRecord = await GroupDAO.findByName(group.name);
            return await GroupDAO.update(groupRecord, group);
        } catch (e) {
            throw Error(`The error occurred while updating Group: ${e.message}`);
        }
    }

    public static async deleteGroup(id: number): Promise<number> {
        try {
            return await GroupDAO.delete(id);
        } catch (e) {
            throw Error(`The error occurred while deleting group: ${e.message}`);
        }
    }

    public static async addUsersToGroup(userIds: number[], groupId: number) {
        try {
            return await UserGroupDAO.link(userIds, groupId);
        } catch (e) {
            throw Error(`The error occurred while linking users to group: ${e.message}`);
        }
    }
}
