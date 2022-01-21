const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

module.exports = (context) => {
   //Headers
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token,process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired Token');
      }
    }
    throw new Error("Authentication token should contain 'Bearer [token]");
  }
  throw new Error('Authorization header is required');
};
