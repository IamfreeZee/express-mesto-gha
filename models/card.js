const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { // название карточки
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: { // ссылка на карточку
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
