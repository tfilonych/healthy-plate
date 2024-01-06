import { Schema, model } from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  refreshTokens: [{
    type: String,
    required: true,
    expireAfterSeconds: '15m'
  }]
});

export default model('Token', schema);