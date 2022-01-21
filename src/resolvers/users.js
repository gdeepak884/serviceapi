const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../util/auth');
const User = require('../models/Users');
const { AuthenticationError, UserInputError } = require('apollo-server');
const { validatesigninUser, validatesignupUser, validateProfileUpdate } = require('../util/validation');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const user = await User.find().sort({ createdAt: -1 });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async signin(_, { username, password }) {
      const { errors, valid } = validatesigninUser(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User Not Found!';
        throw new UserInputError('User Not Found!', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong Crendetials!';
        throw new UserInputError('Wrong Crendetials!', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async signup(
      _,
      {
        signupInput: { fname, lname, username, password, confirmPassword, email, phone }
      }
    ) {
      const { valid, errors } = validatesignupUser(
        fname,
        lname,
        phone,
        email,
        username,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username already taken', {
          errors: {
            username: 'Username already taken!'
          }
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        fname,
        lname,
        phone,
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    async deleteUser(_, { userId }, context) {
      //sign in required to delete user account or only user can delete his account.
      const user_auth = checkAuth(context);
      try {
        const user = await User.findById(userId);
        if(user){
        if (user.username === user_auth.username) {
          await user.delete();
          return 'User Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      }else{
        return "User Not Found!";
      }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateProfile(_, { userId, fname, lname, email, phone }, context) {
      //sign in required to update user account or only user can update his account.
      const user_auth = checkAuth(context);
      try {
        const user = await User.findById(userId);
        if(user){
        if (user.username === user_auth.username) {
          const { valid, errors } = validateProfileUpdate(fname, lname, email, phone);
          if (!valid) {
            throw new UserInputError('Errors', { errors });
          }
          user.fname = fname;
          user.lname = lname;
          user.email = email;
          user.phone = phone;
          await user.save();
          return 'Profile Updated!';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      }else{
        return "User Not Found!";
      }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};