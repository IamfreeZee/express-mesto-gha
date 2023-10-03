const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { addUser } = require('../controllers/users');
const { urlRegExp } = require('../constants/regexp');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
    password: Joi.string().required().min(3),
  }),
}), addUser);

module.exports = router;
