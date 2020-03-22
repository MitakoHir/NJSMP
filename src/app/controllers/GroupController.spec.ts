import { GroupController } from './GroupController';
import request from 'supertest';
import exampleServer from '../server';
import { UserService } from '../services/UserService';
import { UserModel } from '../models/UserModel';
import { GroupService } from '../services/GroupService';

describe('GroupController', () => {
    let userToken: string;

    beforeAll(async () => {
        const {token} = await UserService.loginUser('testUser1', '123456b') as UserModel;
        userToken = token;
    });

    it('getGroupById should return group with status 200 for authorized user', async () => {
        const resultGroupData = {
            id: 15,
            name: 'test123',
            permissions: ['WRITE', 'READ'],
        };
        const getByIdSpy = spyOn(GroupService, 'getGroupById').and.returnValue(resultGroupData);

        const result = await request(exampleServer.getApp())
            .get('/api/group/15').set({Authorization: `Bearer ${userToken}`});
        expect(result.status).toBe(200);
        expect(getByIdSpy).toHaveBeenCalledWith(15);
        expect(result.body.group).toEqual(resultGroupData);
    });

    it('getAllGroups should return all groups with status 200 for authorized user', async () => {
        const resultGroupData = [{
            id: 15,
            name: 'test123',
            permissions: ['WRITE', 'READ'],
        }, {
            id: 16,
            name: 'test111',
            permissions: ['READ'],
        }];
        const getAllGroupsSpy = spyOn(GroupService, 'getAllGroups').and
            .returnValue(resultGroupData);

        const result = await request(exampleServer.getApp())
            .get('/api/group').set({Authorization: `Bearer ${userToken}`});
        expect(result.status).toBe(200);
        expect(getAllGroupsSpy).toHaveBeenCalled();
        expect(result.body.groups).toEqual(resultGroupData);
    });

    it('addGroup should return new group with status 200 for authorized user', async () => {
        const newGroupData = {
            name: 'test123222',
            permissions: ['WRITE', 'READ'],
        };
        const addGroupSpy = spyOn(GroupService, 'addGroup').and
            .returnValue({group: newGroupData});

        const result = await request(exampleServer.getApp())
            .post('/api/group').set({Authorization: `Bearer ${userToken}`}).send(newGroupData);
        expect(result.status).toBe(200);
        expect(addGroupSpy).toHaveBeenCalledWith(newGroupData);
        expect(result.body.group).toEqual({group: newGroupData});
    });

    it('updateGroup should return updated group with status 200 for authorized user', async () => {
        const newGroupData = {
            name: 'test123222',
            permissions: ['WRITE', 'READ'],
        };
        const updateGroupSpy = spyOn(GroupService, 'updateGroup').and
            .returnValue({group: newGroupData});

        const result = await request(exampleServer.getApp())
            .put('/api/group').set({Authorization: `Bearer ${userToken}`}).send(newGroupData);
        expect(result.status).toBe(200);
        expect(updateGroupSpy).toHaveBeenCalledWith(newGroupData);
        expect(result.body.group).toEqual({group: newGroupData});
    });

    it(`deleteGroup should remove group with specified id
    and return status 200 for authorized user`, async () => {
        const groupId = 1;
        const deleteGroupSpy = spyOn(GroupService, 'deleteGroup').and
            .returnValue(1);

        const result = await request(exampleServer.getApp())
            .delete('/api/group/1').set({Authorization: `Bearer ${userToken}`});
        expect(result.status).toBe(200);
        expect(deleteGroupSpy).toHaveBeenCalledWith(groupId);
        expect(result.body.message).toBe('Group with id 1 was successfully deleted');
    });
    it(`addUsersToGroup should add user with specified id
    to group with specified id and return userGroupRecord with status 200`, async () => {
        const groupId = 1;
        const userId = 2;
        const addUserToGroupSpy = spyOn(GroupService, 'addUsersToGroup').and
            .returnValue({userId, groupId});

        const result = await request(exampleServer.getApp())
            .post('/api/group/addUsersToGroup').set({Authorization: `Bearer ${userToken}`})
            .send({groupId, userIds: userId});
        expect(result.status).toBe(200);
        expect(addUserToGroupSpy).toHaveBeenCalledWith(userId, groupId);
        expect(result.body.userGroupRecord).toEqual({userId, groupId});
    });

});
