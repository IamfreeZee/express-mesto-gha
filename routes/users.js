const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, editUserData, editUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
}), getUserById);

router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
