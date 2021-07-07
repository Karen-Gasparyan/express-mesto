const winston = require('winston');
const expressWinston = require('express-winston');

// создадим логгер запросов
const requestLogger = expressWinston.logger({
  transports: [ // то, куда нужно писать лог
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// экспортируем в app.js
module.exports = {
  requestLogger,
  errorLogger,
};
