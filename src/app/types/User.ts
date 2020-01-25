import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface UserData {
    login: string;
    password: string;
    age: number;
}
export interface User extends UserData {
    isDeleted: boolean;
}

export interface UserRequestScheme extends ValidatedRequestSchema {
    [ContainerTypes.Body]: UserData;
}
