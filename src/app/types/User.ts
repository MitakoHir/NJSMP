import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { UserModel } from '../models/UserModel';

export interface UserData {
    login: string;
    password: string;
    age: number;
}
export interface User extends UserData {
    isDeleted: boolean;
}

export type UserServiceResponse = UserModel | UserModel[];

export interface UserRequestScheme extends ValidatedRequestSchema {
    [ContainerTypes.Body]: UserData;
}
