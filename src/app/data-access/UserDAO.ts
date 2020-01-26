import { UserModel } from '../models/UserModel';
import { User } from '../types/User';
import { Op } from 'sequelize';

export class UserDAO {
    public static async create(user: User): Promise<UserModel> {
        return UserModel.create({...user});
    }

    public static async softDelete(user: UserModel): Promise<UserModel> {
        return user.set({isDeleted: true});
    }

    public static async update(user: UserModel, userData: Partial<User>): Promise<UserModel> {
        return user.set({...user, ...userData});
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
        return UserModel
            .findAll({where: {login: {[Op.like]: `%${loginSubstring}%`}}, limit, order: [['login', 'ASC']]});
    }
}
