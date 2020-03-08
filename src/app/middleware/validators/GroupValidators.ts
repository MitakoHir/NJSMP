import { createValidator } from 'express-joi-validation';
import * as Joi from '@hapi/joi';
import { ALLOWED_PERMISSIONS } from '../../types/Group';


const groupScheme = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(...ALLOWED_PERMISSIONS).required(),
});

export const groupValidator = createValidator().body(groupScheme);
