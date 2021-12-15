const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ROLES = require('../constants/roles')

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  role: { type: String, enum: ROLES, default: ROLES.USER },
  salt: { type: String, required: true },
  status: { type: Boolean, default: true }

}, { timestamps: true })

UserSchema.plugin(uniqueValidator)

const UserModel = model('user', UserSchema)

module.exports = UserModel
