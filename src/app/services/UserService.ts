import { UserData, UserServiceResponse } from '../types/User';
import { UserDAO } from '../data-access/UserDAO';

export class UserService {

    public static async getUserById(id: number): Promise<UserServiceResponse> {
        try {
            return await UserDAO.findById(id);
        } catch (e) {
            throw Error(`The error occurred while getting user by id: ${e.message}`);
        }
    }

    public static async addUser(user: UserData): Promise<UserServiceResponse> {
        try {
            return await UserDAO.create({...user, isDeleted: false});
        } catch (e) {
            throw Error(`The error occurred while creating user: ${e.message}`);
        }
    }

    public static async updateUser(user: UserData): Promise<UserServiceResponse> {
        try {
            const userRecord = await UserDAO.findByLogin(user.login);
            return await UserDAO.update({...userRecord, ...user});
        } catch (e) {
            throw Error(`The error occurred while updating user: ${e.message}`);
        }
    }

    public static async softDeleteUser(id: number): Promise<UserServiceResponse> {
        try {
            return await UserDAO.softDelete(id);
        } catch (e) {
            throw Error(`The error occurred while deleting user: ${e.message}`);
        }
    }

    public static async getAutoSuggestUsers(
        loginSubstring: string,
        limit: number,
    ): Promise<UserServiceResponse> {
        try {
            return await UserDAO.findByLoginSubstring(loginSubstring, limit);
        } catch (e) {
            throw Error(`The error occurred getting users by login substring: ${e.message}`);
        }
    }
}
