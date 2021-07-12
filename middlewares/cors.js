module.exports = ((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.status(204).send();
  }

  next();
});
