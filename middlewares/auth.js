const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY = 'super-secret-key' } = process.env;
const Unauthorized = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    next(error);
  }

  req.user = payload;

  next();
};
