export interface UserData {
    login: string;
    password: string;
    age: number;
}

export interface User extends UserData {
    readonly id: string;
    isDeleted: boolean;
}

export interface UsersCollection {
    getUserById(id: string): User;
    addUser(user: User): boolean;
    getAutoSuggestUsers(loginSubstring: string, limit: number): User[];
}
