const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  phone: Number,
  username: String,
  password: String,
  createdAt: String
});

module.exports = model('Users', userSchema);
