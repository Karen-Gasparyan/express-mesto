const PORT = process.env.PORT || 5000;

const IMAGE_REGEX = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/i;

const DEFAULT_USER = {
  name: 'Ваше имя',
  about: 'Ваша специальность',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPb_pSj-ir-9eB6mi0lVJdQP1KKHiB8fRBS1CbmOXGd9Z1FEGMJHbEKhahwhWLGSaEXY&usqp=CAU',
};

const JWT_DEV = 'dev-secret';

module.exports = {
  PORT,
  IMAGE_REGEX,
  DEFAULT_USER,
  JWT_DEV,
};
