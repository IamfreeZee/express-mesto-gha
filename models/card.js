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
  owner: { // кто создал карточку
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ // кто лайкал
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: { // когда создана
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
