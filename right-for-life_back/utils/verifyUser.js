const jwt = require('jsonwebtoken');
const secret = require('./configs.js').jwt_secret;

function verify(authToken) {
  const tokenExpiration = jwt.decode(authToken).exp * 1000;
  const currentDate = Date.now();

  if (currentDate > tokenExpiration) {
    return false;
  }

  try {
    jwt.verify(authToken, secret);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = verify;