const User = require('../models/user');

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'На сервере произошла ошибка' }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(400).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: 'На сервере произошла ошибка' }));
};

const editUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'На сервере произошла ошибка' }));
};

const editUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'На сервере произошла ошибка' }));
};

module.exports = {
  addUser, getUsers, getUserById, editUserData, editUserAvatar,
};
