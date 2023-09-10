const joi = require('joi')

exports.validateUserUpdateData = (data) => {
    const schema = joi.object({
        name: joi.string().max(20).regex(new RegExp('[a-zA-Z0-9]')).messages({
            'string.base': 'Name should be string',
            'string.empty': 'Name can not be empty',
            'string.pattern.base': 'Name should contains only alpha-numeric string',
            'string.max': 'Name must be less than or equal to 20 characters long'
        }),
        phone: joi.string().max(11).messages({
            'string.base': 'Phone number should be string'
        }),
        address: joi.string().messages({
            'string.base': 'Address should be string'
        }),
        profession: joi.string().messages({
            'string.base': 'Profession should be string'
        }),
        favColors: joi.array().items(joi.string()).messages({
            'array.base': 'Favorite colors should be an array of string'
        })
    })
    const response = schema.validate(data, { abortEarly: false })
    if(response.error) {
        throw response.error
    }
}