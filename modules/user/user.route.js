const router = require('express').Router()
const { authenticateUser } = require('../../middleware')
const { deleteUser, updateUser, users } = require('./user.controller')

router.route('/')
    .get(authenticateUser(), users)
    .delete(authenticateUser(['admin']), deleteUser)

router.route('/:userId').put(authenticateUser(['admin']), updateUser)

module.exports = router