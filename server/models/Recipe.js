import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  // from: { type: String, required: true },
  // to: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  ingredients: { type: Array },
  procedures: { type: String },
  // description: {type: String, required: true},
  date: { type: Date, default: Date.now },
  image: { type: String },
  owner: { type: Types.ObjectId, ref: 'User' }
});

export default model('Recipe', schema);