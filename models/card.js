const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: { // ссылка на карточку
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(url);
      },
      message: 'Некорректный URL',
    },
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
  createdAt: { // когда создана карточка
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
