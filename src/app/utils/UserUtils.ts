import { UserData, User } from '../types/User';
import { v4 as uuid } from 'uuid';

export class UserUtils {
    public static create(userData: UserData): User {
        return {id: uuid(), isDeleted: false, ...userData};
    }

    public static compareLogins(prevUser: User, nextUser: User): number {
        if (prevUser.login > nextUser.login) {
            return 1;
        } else if (prevUser.login < nextUser.login) {
            return -1;
        }
        return 0;
    }
}
