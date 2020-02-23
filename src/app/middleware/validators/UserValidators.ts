import { createValidator } from 'express-joi-validation';
import * as Joi from '@hapi/joi';

const passwordRegexp = /^((?=\d)|(?=[a-zA-Z]))[0-9a-zA-Z]+$/;

const userScheme = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(passwordRegexp).required(),
    age: Joi.number().min(4).max(130).required(),
});

export const userValidator = createValidator().body(userScheme);
