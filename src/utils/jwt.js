const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config");
/* Función para crear el token de acceso */
createAccessToken = (user) => {
  const tokenExpired = new Date();
  tokenExpired.setHours(tokenExpired.getHours() + 3);
  const payload = {
    token_type: "access",
    user_id: user.user_id,
    iat: Date.now(),
    exp: tokenExpired.getTime(),
  };
  console.log(payload);
  return jwt.sign(payload, JWT_SECRET_KEY);
};

function createRefreshToken(user) {
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1);

  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

function decoded(token) {
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};