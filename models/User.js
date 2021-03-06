const { Schema, model, Types } = require('mongoose');

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
    recipes: [{
        type: Types.ObjectId,
        ref: 'Recipe'
    }],
    refreshTokens: [{
        type: String
    }]
});

module.exports = model('User', schema);