import { UserModel } from '../models/UserModel';
import { User } from '../types/User';
import { Op } from 'sequelize';

export class UserDAO {
    public static async create(user: User): Promise<UserModel> {
        return UserModel.create({...user});
    }

    public static async softDelete(id: number): Promise<UserModel> {
        const userToDelete = await UserDAO.findById(id);
        return userToDelete.set({isDeleted: true});
    }

    public static async update(user: User): Promise<UserModel> {
        const userToUpdate = await UserDAO.findByLogin(user.login);
        return userToUpdate.set({...user});
    }

    public static async findById(id: number): Promise<UserModel> {
        return UserModel.findByPk(id);
    }

    public static async findByLogin(login: string): Promise<UserModel> {
        return UserModel.findOne({where: {login}});
    }

    public static async findByLoginSubstring(
        loginSubstring: string,
        limit: number,
    ): Promise<UserModel[]> {
        return UserModel.findAll({where: {id: {[Op.contains]: [loginSubstring]}}, limit});
    }
}
