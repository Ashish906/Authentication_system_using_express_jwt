const { UserCollection } = require('../models')

exports.getUsers = async (query, projection, session) => {
    const users = await UserCollection.find(query, projection).session(session)
    return users
}

exports.getAnUser = async (query) => await UserCollection.findOne(query)