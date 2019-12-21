import { UserData, User } from '../types/User';
import { v4 as uuid } from 'uuid';

export class UserUtils {
    public static create(userData: UserData): User {
        return {id: uuid(), isDeleted: false, ...userData};
    }
}
