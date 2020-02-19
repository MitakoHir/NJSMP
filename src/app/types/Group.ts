import { GroupModel } from '../models/GroupModel';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
    name: string;
    permissions: Permission[];
}

export const ALLOWED_PERMISSIONS: Permission[] = [
    'READ',
    'WRITE',
    'DELETE',
    'SHARE',
    'UPLOAD_FILES',
];

export type GroupServiceResponse = GroupModel | GroupModel[];

export interface GroupRequestScheme extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Group;
}
