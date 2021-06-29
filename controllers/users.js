const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ERROR_400,
  ERROR_401,
  ERROR_404,
  ERROR_409,
  ERROR_500,
} = require('../utils/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => ERROR_401(res, 'Неправильные почта или пароль'));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return ERROR_404(res, 'Пользователь по указанному _id не найден');
      }
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return ERROR_404(res, 'Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return ERROR_400(res, 'Переданы некорректные данные при регистрации пользователя');
      }
      if (error.name === 'MongoError' && error.code === 11000) {
        return ERROR_409(res, 'Пользователь с таким email уже зарегистрирован');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return ERROR_404(res, 'Пользователь с указанным _id не найден');
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return ERROR_400(res, 'Переданы некорректные данные при обновлении профиля');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return ERROR_404(res, 'Пользователь с указанным _id не найден');
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return ERROR_400(res, 'Переданы некорректные данные при обновлении аватара');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};
