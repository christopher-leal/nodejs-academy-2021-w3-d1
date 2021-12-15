const ROLES = require('../constants/roles')

module.exports = (req, res, next) => {
  if (ROLES.ADMIN !== req.user.role) {
    return res.status(403).json({ success: false, error: 'Unauthorized' })
  }
  next()
}
