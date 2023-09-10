const { AsyncHandler, CustomError } = require("../../utils")
const { authHelper, userHelper } = require("../helpers")
const { UserCollection } = require("../models")
const { userService } = require('../services')
const { validateUserLoginData, validateUserCreationData } = require("./auth.dto")

exports.login = AsyncHandler(async (req, res, next) => {
    const { body = {} } = req
    validateUserLoginData(body)
    const { email, password } = body
    const userInfo = await userHelper.getAnUser({
        email
    })
    if (!userInfo) {
        throw new CustomError(404, 'User not found', 'login')
    }
    if (!(await authHelper.verifyPassword(password, userInfo.password))) {
        throw new CustomError(401, "Credential doesn't match")
    }
    authHelper.setTokenToCookies({userId: userInfo._id, role: userInfo.role}, res)
    res.send({
        statusCode: 200,
        message: 'Login successful',
        data: userInfo
    })
})

exports.logOut = AsyncHandler(async (req, res, next) => {
    const options = {
        expires: new Date(
            Date.now() - 1
        ),
        httpOnly: false,
    }
    res.cookie('accessToken', '', options)
    res.cookie('refreshToken', '', options)
    res.send({
        statusCode: 200,
        message: 'Logout successful'
    })
})

exports.createUser = AsyncHandler(async (req, res, next) => {
    const { body = {} } = req
    validateUserCreationData(body)
    const { name, email, password, phone, address, profession, favColors, role } = body
    const existingUser = await userHelper.getAnUser({
        email
    })
    if(existingUser) {
        throw new CustomError(409, 'Email already exists, please use another email')
    }
    const { salt, hPassword } = await authHelper.hashPassword(password)
    const user = await userService.createAnUser({
        name,
        email,
        phone, 
        address, 
        profession, 
        favColors,
        password: hPassword,
        salt,
        role
    })
    authHelper.setTokenToCookies({userId: user._id, role: user.role}, res)
    res.send({
        statusCode: 201,
        message: 'User created',
        data: user
    })
})
