const Router = require('express').Router
const { body } = require('express-validator')
const validateFields = require('./../middleware/validateFields')
const authController = require('./../controllers/auth')
const router = Router()

router.post('/login', [
  body('email').notEmpty().withMessage('Email required'),
  body('password').notEmpty().withMessage('Password required'),
  validateFields
], authController.login)

module.exports = router
