const secretKey = '123';

module.exports = function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);

  if (token === secretKey) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
