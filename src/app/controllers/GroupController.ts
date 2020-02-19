import { Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { GroupService } from '../services/GroupService';
import { GroupModel } from '../models/GroupModel';
import { groupValidator } from '../validators/GroupValidators';
import { ValidatedRequest } from 'express-joi-validation';
import { GroupRequestScheme } from '../types/Group';

@Controller('api/group')
export class GroupController {

    @Get(':id')
    private async getGroupById(req: Request, res: Response) {
        const {id} = req.params;
        const group = await GroupService.getGroupById(Number(id))
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (group) {
            res.status(200).json({group});
        } else {
            res.status(404).json({error: `Group with id ${id} not found`});
        }
    }

    @Get()
    private async getAllGroups(req: Request, res: Response) {
        const groups = await GroupService.getAllGroups()
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if ((groups as GroupModel[]).length) {
            res.status(200).json({groups});
        } else {
            res.status(404).json({error: 'There is no groups yet'});
        }
    }

    @Post()
    @Middleware([groupValidator])
    private async addGroup(req: ValidatedRequest<GroupRequestScheme>, res: Response) {
        const groupDTO = req.body;
        const group = await GroupService.addGroup(groupDTO)
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (group) {
            res.status(200).json({message: 'Group successfully added', group});
        }
    }

    @Put()
    @Middleware([groupValidator])
    private async updateGroup(req: ValidatedRequest<GroupRequestScheme>, res: Response) {
        const groupDTO = req.body;
        const group = await GroupService.updateGroup(groupDTO)
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (group) {
            res.status(200).json({message: `Group was successfully updated`, group});
        }
    }

    @Delete(':id')
    private async removeUser(req: Request, res: Response) {
        const {id} = req.params;
        const groupId = await GroupService.deleteGroup(Number(id))
            .catch((e) => {
                res.status(400).json({error: e.message});
            });
        if (groupId) {
            res.status(200).json({message: `Group with id ${id} was successfully deleted`});
        }
    }
    @Post('addUsersToGroup')
    private async addUsersToGroup(req: Request, res: Response) {
        const {userIds, groupId} = req.body;
        const userGroupRecord = await GroupService.addUsersToGroup(userIds, groupId)
            .catch((e) => {
                res.status(400).json({error: e.message});
        });
        if (userGroupRecord) {
            res.status(200).json({message: 'User successfully added to group', userGroupRecord});
        }
    }
}
