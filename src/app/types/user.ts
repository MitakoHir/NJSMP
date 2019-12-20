export interface UserDataInterface {
    login: string;
    password: string;
    age: number;
}

export interface UserInterface extends UserDataInterface {
    readonly id: string;
    isDeleted: boolean;
}

export interface UsersCollection {
    users: User[];
}

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
