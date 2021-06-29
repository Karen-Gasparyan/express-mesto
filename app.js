const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.post('/signin', login);

app.post('/signup', createUser);

app.use(auth);

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Нет ответа на данный запрос' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
