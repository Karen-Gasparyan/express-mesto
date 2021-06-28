const ERROR_400 = (res, message) => {
  const ERROR_CODE_400 = 400;

  return res
    .status(ERROR_CODE_400)
    .send({ message });
};

const ERROR_401 = (res, message) => {
  const ERROR_CODE_401 = 401;

  return res
    .status(ERROR_CODE_401)
    .send({ message });
};

const ERROR_403 = (res, message) => {
  const ERROR_CODE_403 = 403;

  return res
    .status(ERROR_CODE_403)
    .send({ message });
};

const ERROR_404 = (res, message) => {
  const ERROR_CODE_404 = 404;

  return res
    .status(ERROR_CODE_404)
    .send({ message });
};

const ERROR_500 = (res, message) => {
  const ERROR_CODE_500 = 500;

  return res
    .status(ERROR_CODE_500)
    .send({ message });
};

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_500,
};
