const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(4)
    const hPassword = await bcrypt.hash(password, salt)
    return { salt, hPassword }
}

function getJwtToken (payload, expiresIn) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn
        }
    )
}

exports.setTokenToCookies = (payload, res) => {
    const accessToken = getJwtToken(payload, process.env.ACCESS_TOKEN_EXPIRE+'h')
    const refreshToken = getJwtToken(payload, process.env.REFRESH_TOKEN_EXPIRE+'h')
    const options = {
        expires: new Date(
            Date.now() + (Number(process.env.REFRESH_TOKEN_EXPIRE) * 3600 * 1000)
        ),
        httpOnly: false
    }
    res.cookie('accessToken', accessToken, options)
    res.cookie('refreshToken', refreshToken, options)
}