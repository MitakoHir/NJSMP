import { UserData } from '../types/User';
import { UserModel } from '../models/UserModel';

export class UserService {

    public static getUserById(id: string): UserModel {
        return;
    }

    public static getUserByLogin(login: string): UserModel {
        return;
    }

    public static addUser(user: UserData): UserModel {
        return;
    }

    public static updateUser(user: UserData): UserModel {
        return;
    }

    public static softDeleteUser(id: number): UserModel | null {
        return;
    }

    public static getAutoSuggestUsers(loginSubstring: string, limit: number): UserModel[] {
        return;
    }
}
