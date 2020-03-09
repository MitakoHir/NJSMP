import { Request, Response, NextFunction } from 'express';
import {
    Get,
    Put,
    Post,
    Delete,
    Middleware,
    Controller,
    ClassErrorMiddleware,
} from '@overnightjs/core';
import { UserService } from '../services/UserService';
import { userValidator } from '../middleware/validators/UserValidators';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestScheme } from '../types/User';
import { UserModel } from '../models/UserModel';
import { controllerError, routeDebug } from '../middleware/loggers/Controller';
import { Logger } from '@overnightjs/logger';
import { Auth } from '../middleware/auth/Auth';


@Controller('api/user')
@ClassErrorMiddleware(controllerError)
export class UserController {

    @Get(':id')
    @Middleware([routeDebug, Auth])
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
    @Middleware([routeDebug])
    private async getSuggestedUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {loginSubstring, limit} = req.params;
            const suggestedUsers = await UserService
                .getAutoSuggestUsers(loginSubstring, Number(limit));
            Logger.Imp(await UserService
                .getAutoSuggestUsers('test', 5));
            if (suggestedUsers && (suggestedUsers as UserModel[]).length) {
                res.status(200).json({limit, users: suggestedUsers});
            } else {
                res.status(404).json({error: `Users with specified login substring not found`});
            }
        } catch (e) {
            next(e);
        }
    }

    @Put()
    @Middleware([routeDebug, userValidator])
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
    @Middleware([routeDebug, userValidator])
    private async addUser(
        req: ValidatedRequest<UserRequestScheme>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userDTO = req.body;
            const user = await UserService.addUser(userDTO);
            Logger.Imp(user);
            if (user) {
                res.status(200).json({message: 'User successfully added', user});
            }
        } catch (e) {
            next(e);
        }
    }

    @Post('login')
    private async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {login, password} = req.body;
            const userRecord = await UserService.loginUser(login, password);
            res.status(200).json({user: userRecord, token: (userRecord as UserModel).token});
        } catch (e) {
            next(e);
        }
    }

    @Delete(':id')
    @Middleware([routeDebug])
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
