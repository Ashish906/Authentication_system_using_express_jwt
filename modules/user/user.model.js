const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        profession: {
            type: String
        },
        favColors: {
            type: [String]
        },
        password: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'user']
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { 
            virtuals: true, 
            transform(doc, ret) {
            delete ret.password
            delete ret.salt
          } 
        }
    }
)

module.exports = mongoose.model('User', userSchema)