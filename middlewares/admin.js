function admin(req, res, next) {
  try {
    const user = req.user;
    if (!user.roles) return res.status(403).send('Access Denied');
  } catch (error) {
    return res.status(403).send('Access Denied');
  }

  next();
}

module.exports = admin;
