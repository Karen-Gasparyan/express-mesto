const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();
// 60cb589957623431bcc9ac57


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/users'));


// мидлвэр:
app.use((req, res, next) => {
  req.user = {
    _id: '60cb589957623431bcc9ac57'
  };

  next();
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})