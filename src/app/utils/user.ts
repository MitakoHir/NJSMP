import { UserDataInterface, UserInterface } from '../types/user';
import { v4 as uuid } from 'uuid';

export class User {
    static create({ login, password, age }: UserDataInterface): UserInterface {
        const user = { id: uuid(), login, password, age, isDeleted: false };
        return user;
    }
}
