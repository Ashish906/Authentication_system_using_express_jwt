const { UserCollection } = require('../models')

exports.createAnUser = async (data, session) => {
    const [user = {}] = await UserCollection.create([data], {
        session
    })
    return user
}

exports.deleteAnUser = async (query, session) => await UserCollection.deleteOne(query, { session })

exports.updateAnUser = async (query, data, session) => await UserCollection.findOneAndUpdate(query, data, {
    new: true,
    runValidators: true,
    session 
})