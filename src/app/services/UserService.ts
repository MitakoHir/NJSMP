import { UserData, UserServiceResponse } from '../types/User';
import { UserDAO } from '../data-access/UserDAO';
import { ServiceMethodLogger } from '../middleware/loggers/Service';
import * as jwt from 'jsonwebtoken';
import { Logger } from '@overnightjs/logger';

export class UserService {

    @ServiceMethodLogger()
    public static async getUserById(id: number): Promise<UserServiceResponse> {
        return await UserDAO.findById(id);
    }

    @ServiceMethodLogger()
    public static async addUser(user: UserData): Promise<UserServiceResponse> {
        Logger.Imp('add user invoked');
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
        return UserDAO.findByLoginSubstring(loginSubstring, limit);
    }

    @ServiceMethodLogger()
    public static async loginUser(login: string, password: string): Promise<UserServiceResponse> {
        const userRecord = await UserDAO.findByLogin(login);
        if (userRecord && userRecord.password === password) {
            const token = jwt.sign(
                {login, password},
                process.env.SECRET_KEY,
                {expiresIn: 60 },
            );
            return UserDAO.update(userRecord, {token});
        } else {
            throw Error('There is no user with such pair of login and password');
        }
    }
}
