import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete, Middleware } from '@overnightjs/core';
import { UserService } from '../services/UserService';
import { UserUtils } from '../utils/UserUtils';
import { userValidator } from '../validators/UserValidators';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestScheme } from '../types/User';


@Controller('api/user')
export class UserController {
    private usersCollection: UserService = new UserService();

    @Get(':id')
    private getUserById(req: Request, res: Response) {
        const {id} = req.params;
        const user = this.usersCollection.getUserById(id);
        return user ?
            res.status(200).json({user}) :
            res.status(404).json({error: `User with id: ${id} not found`});
    }

    @Get('suggestions/:loginSubstring/:limit')
    private getSuggestedUsers(req: Request, res: Response) {
        const {loginSubstring, limit} = req.params;
        const suggestedUsers = this.usersCollection.getAutoSuggestUsers(loginSubstring, +limit);
        return suggestedUsers.length ?
            res.status(200).json({limit, users: suggestedUsers}) :
            res.status(404).json(
                {error: `No users which contains ${loginSubstring} in login found`},
            );
    }

    @Put()
    @Middleware([userValidator])
    private updateUser(req: ValidatedRequest<UserRequestScheme>, res: Response) {
        const {login} = req.body;
        const user = this.usersCollection.getUserByLogin(login);
        if (user.index !== -1) {
            return res.status(200).json(
                {
                    message: `User with login: ${user.data.login} was successfully updated`,
                    user: this.usersCollection.updateUser(user.index, {...user.data, ...req.body}),
                });
        } else {
            const tempUser = UserUtils.create(req.body);
            this.usersCollection.addUser(tempUser);

            return res.status(201).json({message: 'User successfully added', user: tempUser});
        }
    }

    @Post()
    @Middleware([userValidator])
    private addUser(req: ValidatedRequest<UserRequestScheme>, res: Response) {
        const tempUser = UserUtils.create(req.body);
        const userAdded = this.usersCollection.addUser(tempUser);
        return userAdded ?
            res.status(200).json({message: 'User successfully added', user: tempUser}) :
            res.status(400).json({error: `User with login ${req.body.login} already exists`});
    }

    @Delete(':id')
    private deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        const deleted = this.usersCollection.softDeleteUser(id);
        return deleted ?
            res.status(202).json({message: `User with id: ${id} was successfully deleted`}) :
            res.status(404).json({error: `User with id: ${id} wasn't found`});
    }
}
