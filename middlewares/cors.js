module.exports = ((req, res, next) => {
  const allowedCors = [
    'http://localhost:5000/signup',
    'http://localhost:3000',
    'http://localhost:3000/',
    // '*',
  ];

  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.status(204).send();
  } else next();
});
