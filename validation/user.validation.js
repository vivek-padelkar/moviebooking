import Joi from 'joi'
import { joiPassword } from 'joi-password'

export const signUpValidtor = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(2)
    .minOfUppercase(1)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .required(),
  age: Joi.number().min(18).required(),
})

export const signinValidtor = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
})
