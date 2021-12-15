const createHash = require('../utils/createHash')
const User = require('./../models/user')

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.json({
      success: true,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const addUser = async (req, res) => {
  try {
    const hashedPass = createHash(req.body.password)
    const user = new User({
      ...req.body,
      salt: hashedPass.salt,
      password: hashedPass.hash
    })
    await user.save()
    return res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const patchUser = async (req, res) => {
  try {
    const { id } = req.params
    const users = await User.findByIdAndUpdate(id, req.body, { new: true })
    return res.json({
      success: true,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const users = await User.findByIdAndDelete(id)
    return res.json({
      success: true,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = {
  getUsers,
  addUser,
  patchUser,
  deleteUser
}
