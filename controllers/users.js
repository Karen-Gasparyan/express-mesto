const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ERROR_400,
  ERROR_401,
  ERROR_404,
  ERROR_500,
} = require('../utils/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return ERROR_401(res, 'Не правильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return ERROR_401(res, 'Не правильная почта или пароль');
          }
          res.send({ message: 'Успешно!' });

          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return ERROR_404(res, 'Пользователь по указанному _id не найден');
      }
      return res.send({ data: user });
    })
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return ERROR_404(res, 'Пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
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
        return ERROR_400(res, 'Переданы некорректные данные при создании пользователя');
      }
      return ERROR_500(res, 'Произошла ошибка!');
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
      return ERROR_500(res, 'Произошла ошибка!');
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
      return ERROR_500(res, 'Произошла ошибка!');
    });
};
