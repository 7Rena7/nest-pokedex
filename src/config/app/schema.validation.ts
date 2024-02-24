import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_ENV: Joi.string().required(),
  MONGO_CONNECTION_STRING: Joi.string().required(),
  PORT: Joi.number().required().default(9001),
});
