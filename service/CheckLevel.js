exports.ckeckAdmin = (req, res, next) => {
  if (req.user.level !== 'tarah' && req.user.level !== 'admin') {
    return res.status(500).send({ error: 'you not have enough access right' })
  } else {
    next();
  }
}