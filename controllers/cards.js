const Card = require('../models/card');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500,
} = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return ERROR_400(res, 'Переданы некорректные данные при создании карточки');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return ERROR_404(res, 'Карточка с указанным _id не найдена');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return ERROR_404(res, 'Карточка с указанным _id не найдена');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return ERROR_400(res, 'Переданы некорректные данные для постановки лайка');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return ERROR_404(res, 'Карточка не найдена');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return ERROR_400(res, 'Переданы некорректные данные для снятия лайка');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return ERROR_404(res, 'Карточка не найдена');
      }
      return ERROR_500(res, 'На сервере произошла ошибка');
    });
};
