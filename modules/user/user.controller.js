const { AsyncHandler, CustomError } = require('../../utils')
const { userHelper } = require('../helpers')
const { userService } = require('../services')
const { validateUserUpdateData } = require('./user.dto')

exports.users = AsyncHandler(async (req, res, next) => {
    const allUsers = await userHelper.getUsers({}, {
        name: 1,
        email: 1,
        phone: 1,
        address: 1,
        profession: 1,
        favColors: 1,
        role: 1
    })
    res.send({
        statusCode: 200,
        message: 'All users',
        data: allUsers
    })
})

exports.deleteUser = AsyncHandler(async(req, res, next) => {
    const { userId } = req.body
    if(!userId) throw new CustomError(400, 'Please provide userId to delete an user')
    if(userId === req.user?._id?.toString()) {
        throw new CustomError(400, 'You can not delete youself')
    }
    const response = await userService.deleteAnUser({_id: userId})
    if(!response.deletedCount) {
        throw new CustomError(404, 'User not found')
    }
    res.status(202).json({
        message: 'User deleted successfully'
    })
})

exports.updateUser = AsyncHandler(async(req, res, next) => {
    let { userId = '' } = req.params
    userId = userId.split(':userId=')[1]
    if(!userId) throw new CustomError(400, 'Please provide userId to update an user')
    validateUserUpdateData(req.body)
    const updatedUser = await userService.updateAnUser({_id: userId}, req.body)
    if(!updatedUser) {
        throw new CustomError(404, 'User not found')
    }
    res.status(202).json({
        message: 'User updated successfully',
        statusCode: 202,
        data: updatedUser
    })
})
