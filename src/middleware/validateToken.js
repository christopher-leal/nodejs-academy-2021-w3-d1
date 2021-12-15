const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  try {
    const token = req.get('Authorization')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    })
  }
}
