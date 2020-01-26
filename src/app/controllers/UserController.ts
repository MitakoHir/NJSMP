import { Request, Response } from 'express';
import { Controller, Get, Put, Post, Delete, Middleware } from '@overnightjs/core';
import { UserService } from '../services/UserService';
import { userValidator } from '../validators/UserValidators';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestScheme } from '../types/User';
import { UserModel } from '../models/UserModel';


@Controller('api/user')
export class UserController {

    @Get(':id')
    private async getUserById(req: Request, res: Response) {
        const {id} = req.params;
        const user = await UserService.getUserById(Number(id))
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (user) {
            res.status(200).json({user});
        } else {
            res.status(404).json({error: `User with id ${id} not found`});
        }
    }

    @Get('suggestions/:loginSubstring/:limit')
    private async getSuggestedUsers(req: Request, res: Response) {
        const {loginSubstring, limit} = req.params;
        const suggestedUsers = await UserService.getAutoSuggestUsers(loginSubstring, Number(limit))
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if ((suggestedUsers as UserModel[]).length) {
            res.status(200).json({limit, users: suggestedUsers});
        } else {
            res.status(404).json({error: `Users with specified login substring not found`});
        }
    }

    @Put()
    @Middleware([userValidator])
    private async updateUser(req: ValidatedRequest<UserRequestScheme>, res: Response) {
        const userDTO = req.body;
        const user = await UserService.updateUser(userDTO)
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (user) {
            res.status(200).json({message: `User was successfully updated`, user});
        }
    }

    @Post()
    @Middleware([userValidator])
    private async addUser(req: ValidatedRequest<UserRequestScheme>, res: Response) {
        const userDTO = req.body;
        const user = await UserService.addUser(userDTO)
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (user) {
            res.status(200).json({message: 'User successfully added', user});
        }
    }

    @Delete(':id')
    private async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await UserService.softDeleteUser(Number(id))
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (user) {
            res.status(202).json({message: `User with id: ${id} was successfully deleted`, user});
        }
    }
}
