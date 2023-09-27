const Card = require('../models/card');

const addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('CastError'))
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.message === 'CastError' && req.params.cardId.length === 24) {
        res.status(404).send({ message: 'Карточка с таким Id не найдена' });
      } else {
        res.status(400).send({ message: 'Некоректный Id карточки' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('CastError'))
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'CastError' && req.params.cardId.length === 24) {
        res.status(404).send({ message: 'Карточка с таким Id не найдена' });
      } else {
        res.status(400).send({ message: 'Некоректный Id карточки' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('CastError'))
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'CastError' && req.params.cardId.length === 24) {
        res.status(404).send({ message: 'Карточка с таким Id не найдена' });
      } else {
        res.status(400).send({ message: 'Некоректный Id карточки' });
      }
    });
};

module.exports = {
  addCard, getCards, deleteCard, likeCard, dislikeCard,
};
