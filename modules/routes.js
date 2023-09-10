const user = require('./user/user.route')
const auth = require('./auth/auth.route')

module.exports = (app) => {
    app.use('/user', user)
    app.use('/auth', auth)
}