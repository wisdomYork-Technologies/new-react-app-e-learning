import Joi from 'joi'


export const validator = Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string().required(),
    fullname: Joi.string(),
    address: Joi.string(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
export const loginValidator = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})