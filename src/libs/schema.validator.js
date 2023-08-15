import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(30),
    number: Joi.number().required(),
    document: Joi.number().required(),
});

const userSchemaSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(30),
});
export {userSchema, userSchemaSignIn};