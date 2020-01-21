import { User, UsersCollection } from '../types/User';
import { UserUtils } from '../utils/UserUtils';

export class UserCollection implements UsersCollection {
    private readonly _users: User[];

    constructor() {
        this._users = [];
    }

    public getUserById(id: string): User {
        return this._users.find((user) => user.id === id);
    }

    public addUser(user: User): boolean {
        const userNotExists = !(this._users.find(({login}) => login === user.login) !== undefined);

        if (userNotExists) {
            this._users.push(user);
        }
        return userNotExists;
    }

    public getUserByLogin(login: string): { index: number, data: User } {
        const userIndex = this._users.findIndex((user) => user.login === login);
        return {index: userIndex, data: this._users[userIndex]};
    }

    public updateUser(index: number, user: User): User {
        this._users[index] = user;
        return this._users[index];
    }

    public softDeleteUser(id: string): boolean {
        const index = this._users.findIndex((user) => user.id === id);
        this.updateUser(index, {...this._users[index], isDeleted: true});
        return index !== -1;
    }

    public getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        return this._users
            .filter((user) => user.login.includes(loginSubstring))
            .sort(UserUtils.compareLogins).slice(0, limit);
    }
}
