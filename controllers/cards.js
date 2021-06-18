const Card = require('../models/card');
const {
  ERROR_400,
  ERROR_404,
  ERROR_500
} = require('../utils/errors');


module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => ERROR_500(res, 'Произошла ошибка!'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(error => {
      if(error.name === 'ValidationError') {
        ERROR_400(res, 'Переданы некорректные данные!');
      }
      ERROR_500(res, 'Произошла ошибка!');
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if(!card) {
        ERROR_404(res, 'Карточка не найдена');
      }
      res.send({ data: card })
    })
    .catch(error => {
      if(error.name === 'CastError') {
        ERROR_404(res, 'Карточка с таким id не найдена');
      }
      ERROR_500(res, 'Произошла ошибка!');
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
      .then(card => {
        if(!card) {
          ERROR_404(res, 'Карточка не найдена');
        }
        res.send({ data: card });
      })
      .catch(error => {
        if(error.name === 'CastError') {
          ERROR_404(res, 'Карточка не найдена');
        }
        ERROR_500(res, 'Произошла ошибка!');
      });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
      .then(card => {
        if(!card) {
          ERROR_404(res, 'Карточка не найдена');
        }
        res.send({ data: card });
      })
      .catch(error => {
        if(error.name === 'CastError') {
          ERROR_404(res, 'Карточка не найдена');
        }
        ERROR_500(res, 'Произошла ошибка!');
      });
};