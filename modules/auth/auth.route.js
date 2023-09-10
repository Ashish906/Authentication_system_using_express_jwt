const router = require('express').Router()
const { authenticateUser } = require('../../middleware')
const { createUser, login, logOut } = require('./auth.controller')

router.route('/login').post(login)
router.route('/registration').post(createUser)
router.route('/logout').post(authenticateUser(), logOut)

module.exports = router