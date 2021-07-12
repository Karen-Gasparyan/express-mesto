module.exports = ((req, res, next) => {
  // const allowedCors = [
  //   'https://yp.gks.mesto.nomoredomains.club',
  //   'https://yp.gks.mesto.nomoredomains.club/signin',
  //   'https://yp.gks.mesto.nomoredomains.club/signup',
  // ];

  // const { origin } = req.headers;

  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // } else next();
  res.header('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.status(204).send();
  } else next();
});
