const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const token = req.headers('auth-token');
    if (!token)
      return res.status(401).send('No Authentication Configuration Set');
    const decoded = jwt.decode(token, process.env.TOKEN_ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
}

module.exports = auth;
