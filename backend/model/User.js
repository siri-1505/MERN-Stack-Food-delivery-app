const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }] // Array of references to Order
});

module.exports = mongoose.model('User', userSchema);
