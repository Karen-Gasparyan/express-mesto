const User = require('../models/user');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500,
} = require('../utils/errors');

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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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
