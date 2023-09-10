const jsonwebtoken = require('jsonwebtoken')
const { CustomError, AsyncHandler } = require("../utils")
const { authHelper, userHelper } = require('../modules/helpers')

module.exports = (roles = []) => async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies
        if (!(accessToken && refreshToken)) {
            throw new CustomError(403, 'Unauthenticated')
        }
        const secret = process.env.JWT_SECRET
        let decodedValue = jsonwebtoken.decode(accessToken, secret)
        if(!decodedValue) {
            jsonwebtoken.verify(accessToken, secret, {
                ignoreExpiration: true
            })
            decodedValue = jsonwebtoken.verify(refreshToken, secret)
            authHelper.setTokenToCookies({ userId: decodedValue.userId, role: decodedValue.role }, res)
        }
        if(roles.length && !roles.includes(decodedValue.role)) {
            throw new CustomError(401, 'Unauthorized')
        }
        const userInfo = await userHelper.getAnUser({
            _id: decodedValue.userId
        })
        if (!userInfo) {
            throw new CustomError(403, 'Unauthenticated')
        }
        req.user = userInfo
        next()
    } catch (err) {
        next(err)
    }
}