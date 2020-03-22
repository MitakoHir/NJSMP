import { User } from '../types/User';
import { UserDAO } from '../data-access/UserDAO';
import { Logger } from '@overnightjs/logger';
import { UserModel } from '../models/UserModel';

const predefinedUsers: User[] = [
    {
        login: 'testUser',
        password: '123456a',
        age: 22,
        isDeleted: false,
        token: '1',
    },
    {
        login: 'testUser1',
        password: '123456b',
        age: 24,
        isDeleted: false,
        token: '2',
    },
    {
        login: 'testUser3',
        password: '123456c',
        age: 26,
        isDeleted: false,
        token: '3',
    },
];

export class UserUtils {
    public static generateUsers() {
        UserModel.sync().then(() => {
            const users = predefinedUsers.map((user) => UserDAO.create(user));
            Promise.all(users)
                .then((userModels) => {
                    Logger.Imp(`${userModels.length} predefined users were added to the database`);
                })
                .catch((err: Error) => {
                    Logger.Imp(`The was a problem while adding predefined users to the database: ${err.message}`);
                });
        });
    }
}
