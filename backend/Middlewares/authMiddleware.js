const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorisation;
    if (!token) return res.status(401).send('You are not Authenticated!');

    const { userId, isAdmin } = jwt.verify(token, 'jwtsecretkeyhaiyeh');

    req.user = {
      userId,
      isAdmin,
    };

    console.log('HEREEEE');

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const verifyTokenAndAuthorisation = (req, res, next) => {
  if (req.user.userId == req.params.id || req.user.isAdmin) {
    next();
  } else
    return res.status(403).send('You are not allowed to perform this action!');
};

const verifyTokenAndAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else
    return res
      .status(403)
      .send('You are not admin! Only Admin can do this action!');
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorisation,
  verifyTokenAndAdmin,
};
