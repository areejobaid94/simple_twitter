  
import jwt from 'jsonwebtoken';


function authentication(req, res, next) {

  //get authorization from the header of the req
  const authHeader = req.headers['authorization']; 
  // if authHeader != undefined then get make the value as array and get the 2nd item => the token
  const token = authHeader && authHeader.split(' ')[1];
  // return error if the token is null
  if (token == null) return res.status(401).json({error:"Null token"});
  // verify the token
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({error : error.message});
    // add the use to the request
    req.user = user;
    next();
  });
}

export {authentication};