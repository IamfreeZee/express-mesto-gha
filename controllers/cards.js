const Card = require('../models/card');

const addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(() => res.status(400).send({ message: 'На сервере произошла ошибка' }));
};

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const deleteCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (card) {
          res.send({ message: 'Карточка удалена' });
        } else {
          res.status(404).send({ message: 'Карточка с таким Id не найдена' });
        }
      });
  } else {
    res.status(400).send({ message: 'Некоректный Id карточки' });
  }
};

const likeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => {
        if (card) {
          res.send(card);
        } else {
          res.status(404).send({ message: 'Карточка с таким Id не найдена' });
        }
      });
  } else {
    res.status(400).send({ message: 'Некоректный Id карточки' });
  }
};

const dislikeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => {
        if (card) {
          res.send(card);
        } else {
          res.status(404).send({ message: 'Карточка с таким Id не найдена' });
        }
      });
  } else {
    res.status(400).send({ message: 'Некоректный Id карточки' });
  }
};

module.exports = {
  addCard, getCards, deleteCard, likeCard, dislikeCard,
};
