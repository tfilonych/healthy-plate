const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: String,
    recipes: [{
        type: Types.ObjectId,
        ref: 'Recipe'
    }]
})

module.exports = model('User', schema)