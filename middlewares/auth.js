const jwt = require('jsonwebtoken');

const {
  ERROR_403,
} = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return ERROR_403(res, 'Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (error) {
    return ERROR_403(res, 'Необходима авторизация');
  }

  req.user = payload;

  return next();
};
