import { ClassErrorMiddleware, Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../services/GroupService';
import { GroupModel } from '../models/GroupModel';
import { groupValidator } from '../validators/GroupValidators';
import { ValidatedRequest } from 'express-joi-validation';
import { GroupRequestScheme } from '../types/Group';
import { errorLogger, routeLogger } from '../utils/LoggingUtils';

@Controller('api/group')
@ClassErrorMiddleware(errorLogger)
export class GroupController {

    @Get(':id')
    @Middleware([routeLogger])
    private async getGroupById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const group = await GroupService.getGroupById(Number(id));
            if (group) {
                res.status(200).json({group});
            } else {
                res.status(404).json({error: `Group with id ${id} not found`});
            }
        } catch (e) {
            next(e);
        }
    }

    @Get()
    @Middleware([routeLogger])
    private async getAllGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await GroupService.getAllGroups();
            if ((groups as GroupModel[]).length) {
                res.status(200).json({groups});
            } else {
                res.status(404).json({error: 'There is no groups yet'});
            }
        } catch (e) {
            next(e);
        }
    }

    @Post()
    @Middleware([routeLogger, groupValidator])
    private async addGroup(
        req: ValidatedRequest<GroupRequestScheme>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const groupDTO = req.body;
            const group = await GroupService.addGroup(groupDTO);
            if (group) {
                res.status(200).json({message: 'Group successfully added', group});
            }
        } catch (e) {
            next(e);
        }
    }

    @Put()
    @Middleware([routeLogger, groupValidator])
    private async updateGroup(
        req: ValidatedRequest<GroupRequestScheme>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const groupDTO = req.body;
            const group = await GroupService.updateGroup(groupDTO);
            if (group) {
                res.status(200).json({message: `Group was successfully updated`, group});
            }
        } catch (e) {
            next(e);
        }
    }

    @Delete(':id')
    @Middleware([routeLogger])
    private async removeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const groupId = await GroupService.deleteGroup(Number(id));
            if (groupId) {
                res.status(200).json({message: `Group with id ${id} was successfully deleted`});
            }
        } catch (e) {
            next(e);
        }
    }

    @Post('addUsersToGroup')
    @Middleware([routeLogger])
    private async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const {userIds, groupId} = req.body;
            const userGroupRecord = await GroupService.addUsersToGroup(userIds, groupId);
            if (userGroupRecord) {
                res.status(200).json({
                    message: 'User successfully added to group',
                    userGroupRecord,
                });
            }
        } catch (e) {
            next(e);
        }
    }
}
