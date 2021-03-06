const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const router = Router();
const { IMAGE_REGEX } = require('../config');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(IMAGE_REGEX),
  }),
}), updateUserAvatar);

module.exports = router;
