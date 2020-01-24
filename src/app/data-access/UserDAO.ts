import { UserModel } from '../models/UserModel';
import { User } from '../types/User';

export class UserDAO {
    private _user = UserModel;

    public create(user: User): User {
        return;
    }

    public softDelete(user: User): User {
        return;
    }

    public update(user: User): User {
        return;
    }
}
