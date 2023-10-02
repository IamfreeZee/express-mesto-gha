const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotFoundError'))
    .then((card) => {
      if (card && card.owner.equals(req.user._id)) {
        Card.deleteOne(card)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалить карточку созданную другим пользователем'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не коректный Id карточки'));
      } else if (err.message === 'NotFoundError') {
        next(new NotFoundError('Карточка с таким Id не найдена'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotFoundError'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не коректный Id карточки'));
      } else if (err.message === 'NotFoundError') {
        next(new NotFoundError('Карточка с таким Id не найдена'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotFoundError'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не коректный Id карточки'));
      } else if (err.message === 'NotFoundError') {
        next(new NotFoundError('Карточка с таким Id не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  addCard, getCards, deleteCard, likeCard, dislikeCard,
};

// const deleteCard = (req, res, next) => {
//   Card.findByIdAndRemove(req.params.cardId)
//     .orFail(new Error('NotFoundError'))
//     .then(() => res.status(200).send({ message: 'Карточка удалена' }))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Не коректный Id карточки'));
//       } else if (err.message === 'NotFoundError') {
//         next(new NotFoundError('Карточка с таким Id не найдена'));
//       } else {
//         next(err);
//       }
//     });
// };
