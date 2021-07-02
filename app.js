const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const {
  login,
  createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(celebrate({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}));

app.use('/', auth, require('./routes/users'));

app.use('/', auth, require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Нет ответа на данный запрос' });
});

app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
