import jwt from 'jsonwebtoken';

//Generate an access token and a refresh token for this database user
function jwtTokens({ user_id, user_name, user_email }) {
  const user = { user_id, user_name, user_email}; 
  const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '20s' });
  return ({ token });
}

export {jwtTokens};