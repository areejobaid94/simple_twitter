import jwt from 'jsonwebtoken';

//Generate an access token and a refresh token for this database user
function jwtTokens({username,id}) {
  let user = {username: username, id: id}
  const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '100000m' });
  return ({ token });
}

export {jwtTokens};