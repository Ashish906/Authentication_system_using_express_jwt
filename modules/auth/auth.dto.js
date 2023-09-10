const joi = require('joi')

exports.validateUserLoginData = (data) => {
    const schema = joi.object({
        email: joi.string().max(40).email().required().messages({
            'string.base': 'Email should be string',
            'string.empty': 'Email can not be empty',
            'string.email': 'Email should be a valid email address',
            'string.max': 'Email must be less than or equal to 40 characters long',
            'any.required': 'Email is required'
        }),
        password: joi.string().max(20).required().messages({
            'string.base': 'Password should be string',
            'string.empty': 'Password can not be empty',
            'string.max': 'Password must be less than or equal to 20 characters long',
            'any.required': 'Password is required'
        })
    })
    const response = schema.validate(data, { abortEarly: false })
    if(response.error) {
        throw response.error
    }
}

exports.validateUserCreationData = (data) => {
    const schema = joi.object({
        name: joi.string().max(20).regex(new RegExp('[a-zA-Z0-9]')).required().messages({
            'string.base': 'Name should be string',
            'string.empty': 'Name can not be empty',
            'string.pattern.base': 'Name should contains only alpha-numeric string',
            'string.max': 'Name must be less than or equal to 20 characters long',
            'any.required': 'Name is required'
        }),
        email: joi.string().max(40).email().required().messages({
            'string.base': 'Email should be string',
            'string.empty': 'Email can not be empty',
            'string.email': 'Email should be a valid email address',
            'string.max': 'Email must be less than or equal to 40 characters long',
            'any.required': 'Email is required'
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
        }),
        password: joi.string().max(20).required().messages({
            'string.base': 'Password should be string',
            'string.empty': 'Password can not be empty',
            'string.max': 'Password must be less than or equal to 20 characters long',
            'any.required': 'Password is required'
        }),
        role: joi.string().required().valid('admin', 'user').messages({
            'string.base': 'Role should be string',
            'string.empty': 'Role can not be empty',
            'any.required': 'Role is required'
        })
    })
    const response = schema.validate(data, { abortEarly: false })
    if(response.error) {
        throw response.error
    }
}