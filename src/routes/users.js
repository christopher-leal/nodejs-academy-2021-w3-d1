const Router = require('express').Router
const UsersController = require('./../controllers/users')
const validateFields = require('../middleware/validateFields')
const validateToken = require('../middleware/validateToken')
const isAdmin = require('../middleware/isAdmin')
const ROLES = require('./../constants/roles')
const { body } = require('express-validator')

const router = Router()

router.get('/', [
  validateToken,
  isAdmin
], UsersController.getUsers)

router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email have to have email@email.com format'),
  body('password').notEmpty().withMessage('Password is required'),
  body('phone').notEmpty().withMessage('Phone is required').isLength({ min: 10, max: 10 }).withMessage('Phone length must be 10'),
  body('birthday').notEmpty().withMessage('Birthday is required').isDate().withMessage('Birthday must be a date'),
  body('role').exists().optional().isIn(ROLES).withMessage(`Roles must be either ${Object.keys(ROLES).join(' or ')}`),
  validateFields
], UsersController.addUser)

router.put('/:id', [
  validateToken,
  isAdmin,
  body('email').exists().optional().isEmail().withMessage('Email have to have email@email.com format'),
  body('phone').exists().optional().isLength({ min: 10, max: 10 }).withMessage('Phone length must be 10'),
  body('birthday').exists().optional().isDate().withMessage('Birthday must be a date'),
  validateFields
], UsersController.patchUser)

router.delete('/:id', [
  validateToken,
  isAdmin
], UsersController.deleteUser)

module.exports = router
