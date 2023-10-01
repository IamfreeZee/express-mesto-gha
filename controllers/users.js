const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const User = require('../models/user');

const addUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        // res.status(400).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFoundError'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не корректный Id пользователя'));
      } else if (err.message === 'NotFoundError') {
        next(new NotFoundError('Пользователь с таким Id не найден'));
      } else {
        next(err);
      }
    });
};

const editUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        // res.status(400).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        // res.status(400).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

module.exports = {
  addUser, getUsers, getUserById, editUserData, editUserAvatar,
};
