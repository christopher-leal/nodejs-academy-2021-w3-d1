const bcryptjs = require('bcryptjs')
const { createToken } = require('../utils/createToken')
const User = require('./../models/user')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !bcryptjs.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' })
  }

  const token = createToken({
    email: user.email,
    role: user.role
  })

  return res.status(200).json({
    success: true,
    data: token
  })
}

module.exports = {
  login
}
