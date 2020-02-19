import { Request, Response, NextFunction } from 'express';
import {
    Controller,
    Get,
    Put,
    Post,
    Delete,
    Middleware,
    ClassErrorMiddleware,
} from '@overnightjs/core';
import { UserService } from '../services/UserService';
import { userValidator } from '../validators/UserValidators';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestScheme } from '../types/User';
import { UserModel } from '../models/UserModel';
import { ErrorLogger } from '../utils/LoggingUtils';


@Controller('api/user')
@ClassErrorMiddleware(ErrorLogger)
export class UserController {

    @Get(':id')
    private async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const user = await UserService.getUserById(Number(id));
            if (user) {
                res.status(200).json({user});
            } else {
                res.status(404).json({error: `User with id ${id} not found`});
            }
        } catch (e) {
            next(e);
        }
    }

    @Get('suggestions/:loginSubstring/:limit')
    private async getSuggestedUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {loginSubstring, limit} = req.params;
            const suggestedUsers = await UserService
                .getAutoSuggestUsers(loginSubstring, Number(limit));
            if ((suggestedUsers as UserModel[]).length) {
                res.status(200).json({limit, users: suggestedUsers});
            } else {
                res.status(404).json({error: `Users with specified login substring not found`});
            }
        } catch (e) {
            next(e);
        }
    }

    @Put()
    @Middleware([userValidator])
    private async updateUser(
        req: ValidatedRequest<UserRequestScheme>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userDTO = req.body;
            const user = await UserService.updateUser(userDTO);
            if (user) {
                res.status(200).json({message: `User was successfully updated`, user});
            }
        } catch (e) {
            next(e);
        }
    }

    @Post()
    @Middleware([userValidator])
    private async addUser(
        req: ValidatedRequest<UserRequestScheme>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userDTO = req.body;
            const user = await UserService.addUser(userDTO);
            if (user) {
                res.status(200).json({message: 'User successfully added', user});
            }
        } catch (e) {
            next(e);
        }
    }

    @Delete(':id')
    private async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const user = await UserService.softDeleteUser(Number(id));
            if (user) {
                res.status(202)
                    .json({message: `User with id: ${id} was successfully deleted`, user});
            }
        } catch (e) {
            next(e);
        }
    }
}
