import { UserData, UserServiceResponse } from '../types/User';
import { UserDAO } from '../data-access/UserDAO';
import { ServiceMethodLogger } from '../middleware/loggers/Service';

export class UserService {

    @ServiceMethodLogger()
    public static async getUserById(id: number): Promise<UserServiceResponse> {
        return await UserDAO.findById(id);
    }

    @ServiceMethodLogger()
    public static async addUser(user: UserData): Promise<UserServiceResponse> {
        return await UserDAO.create({...user, isDeleted: false});
    }

    @ServiceMethodLogger()
    public static async updateUser(user: UserData): Promise<UserServiceResponse> {
        const userRecord = await UserDAO.findByLogin(user.login);
        return await UserDAO.update(userRecord, user);
    }

    @ServiceMethodLogger()
    public static async softDeleteUser(id: number): Promise<UserServiceResponse> {
        const userRecord = await UserDAO.findById(id);
        return await UserDAO.softDelete(userRecord);
    }

    @ServiceMethodLogger()
    public static async getAutoSuggestUsers(
        loginSubstring: string,
        limit: number,
    ): Promise<UserServiceResponse> {
        return await UserDAO.findByLoginSubstring(loginSubstring, limit);
    }
}
