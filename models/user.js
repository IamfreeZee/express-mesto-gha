const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: { // описание пользователя
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: { // ссылка на аву
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
