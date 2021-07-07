const jwt = require("jsonwebtoken");

// Checks if token within the request is valid
// Checks if req user id matches token user id
// - returns decoded token if valid, null if not
const isRouteAuthenticated = (req) => {
  if (!req.user || !req.user.id || !req.cookies || !req.cookies.token)
    return null;

  let token = req.cookies.token;
  let decodedPayload = isTokenValid(token);
  if (
    !decodedPayload ||
    !decodedPayload.id ||
    decodedPayload.id !== req.user.id
  )
    return null;

  return decodedPayload;
};

// Checks if token is valid
// - returns decoded token if valid, null if not
const isTokenValid = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.SESSION_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = {
  isRouteAuthenticated,
  isTokenValid,
};
