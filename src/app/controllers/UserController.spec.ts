import { UserService } from '../services/UserService';
import request from 'supertest';
import exampleServer from '../server';
import { UserModel } from '../models/UserModel';

describe('UserController', () => {
    describe('login functionality', () => {
        it('login should return userRecord and token with status 200', async () => {
            const userData = {
                login: 'test',
                password: 'test password',
            };
            const loginSpy = spyOn(UserService, 'loginUser').and.returnValue({...userData, token: '123a'});
            const result = await request(exampleServer.getApp())
                .post('/api/user/login')
                .send(userData);
            expect(result.status).toBe(200);
            expect(loginSpy).toHaveBeenCalledWith(userData.login, userData.password);
            expect(result.body).toEqual({user: {...userData, token: '123a'}, token: '123a'});
        });
    });

    describe('routes which require token functionality', () => {
        let userToken: string;
        beforeAll(async () => {
            const {token} = await UserService.loginUser('testUser1', '123456b') as UserModel;
            userToken = token;
        });

        it('getUserById should return UserRecord with status 200', async () => {
            const userData = {
                id: 1,
                login: 'testName',
                password: 'testPAss',
                age: 5,
            };
            const getByIdSpy = spyOn(UserService, 'getUserById').and.returnValue(userData);
            const result = await request(exampleServer.getApp())
                .get('/api/user/1').set({Authorization: `Bearer ${userToken}`});
            expect(result.status).toBe(200);
            expect(getByIdSpy).toHaveBeenCalledWith(1);
            expect(result.body).toEqual({user: userData});
        });

        it(`getSuggestedUsers should return UserRecords
        which have provided login substring with status 200`, async () => {
            const searchData = {
                loginSubstring: 'test',
                limit: '3',
            };
            const resultData = [
                {
                    id: 1,
                    login: 'testName',
                    password: 'testPAss',
                    age: 5,
                },
                {
                    id: 2,
                    login: 'testName1',
                    password: 'testPAss',
                    age: 5,
                },
                {
                    id: 3,
                    login: 'testNam3e',
                    password: 'testPAss',
                    age: 5,
                },
            ];
            const getSuggestedUsersSpy = spyOn(UserService, 'getAutoSuggestUsers').and
                .returnValue(resultData);
            const result = await request(exampleServer.getApp())
                .get('/api/user/suggestions/test/3').set({Authorization: `Bearer ${userToken}`});
            expect(result.status).toBe(200);
            expect(getSuggestedUsersSpy)
                .toHaveBeenCalledWith(searchData.loginSubstring, Number(searchData.limit));
            expect(result.body).toEqual({limit: searchData.limit, users: resultData});
        });

        it('updateUser should update data and return UserRecord with status 200', async () => {
            const userData = {
                login: 'testUser1',
                password: '1testPAss1',
                age: 5,
            };
            const updateUserSpy = spyOn(UserService, 'updateUser').and.returnValue(userData);
            const result = await request(exampleServer.getApp())
                .put('/api/user').set({Authorization: `Bearer ${userToken}`}).send(userData);
            expect(result.status).toBe(200);
            expect(updateUserSpy).toHaveBeenCalledWith(userData);
            expect(result.body)
                .toEqual({message: 'User was successfully updated', user: userData});
        });

        it(`addUser should create new user
        and return UserRecord with status 200`, async () => {
            const userData = {
                login: 'testUser1',
                password: '1testPAss1',
                age: 5,
            };
            const addUserSpy = spyOn(UserService, 'addUser').and.returnValue(userData);
            const result = await request(exampleServer.getApp())
                .post('/api/user').set({Authorization: `Bearer ${userToken}`}).send(userData);
            expect(result.status).toBe(200);
            expect(addUserSpy).toHaveBeenCalledWith(userData);
            expect(result.body)
                .toEqual({message: 'User successfully added', user: userData});
        });

        it(`deleteUser should turn users flag isDeleted to true
        and return UserRecord with status 202`, async () => {
            const userData = {
                id: 5,
                login: 'testUser1',
                password: '1testPAss1',
                age: 5,
                isDeleted: true,
            };
            const deleteUserSpy = spyOn(UserService, 'softDeleteUser').and.returnValue(userData);
            const result = await request(exampleServer.getApp())
                .delete('/api/user/5').set({Authorization: `Bearer ${userToken}`});
            expect(result.status).toBe(202);
            expect(deleteUserSpy).toHaveBeenCalledWith(5);
            expect(result.body)
                .toEqual({message: 'User with id: 5 was successfully deleted', user: userData});
        });

    });
});
