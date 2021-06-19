const User = require('../models/user');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500
} = require('../utils/errors');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if(!user) {
        ERROR_404(res, 'Пользователь по указанному _id не найден');
      }
      res.send({ data: user })
    })
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(data => res.send({ data }))
    .catch(error => {
      if(error.name === 'ValidationError') {
        ERROR_400(res, 'Переданы некорректные данные при создании пользователя');
      }
      ERROR_500(res, 'Произошла ошибка!');
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  if( name.length < 2 || about.length < 2 ) {
    ERROR_400(res, 'Переданы некорректные данные при обновлении профиля');
  } else {
    User.findByIdAndUpdate(req.user._id, { name, about })
      .then(profile => {
        if(!profile) {
          ERROR_404(res, 'Пользователь с указанным _id не найден');
        }
        res.send({name, about})
      })
      .catch(() => ERROR_500(res, 'Произошла ошибка!'));
  }
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(({ avatar }) => res.send({ avatar }))
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};