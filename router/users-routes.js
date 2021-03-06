import express from 'express';
import db from '../db/db.js';
import bcrypt from 'bcrypt';
import {authentication} from '../middleware/authorization.js';
import { jwtTokens } from '../helpers/jwt-token-helpers.js';

let refreshTokens = [];

const router = express.Router();

/* get all users */
router.get('/',authentication, async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json({users : users.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* create user */
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.query(
      'INSERT INTO users (username , email, password) VALUES ($1,$2,$3) RETURNING *'
      , [req.body.username, req.body.email, hashedPassword]);

    // create the JWT token
    let tokens = jwtTokens(newUser.rows[0]);
    
    // add tokens to the res
    res.json(tokens);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* delete all users */
router.delete('/', async (req,res)=>{
  try {
    const users = await db.query('DELETE FROM users');
    res.status(204).json(users.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* get search users */
router.get('/search',authentication, async (req, res) => {
  try {
    console.log(req.query.username,req.user.id);
    let username ="%"+ req.query.username +"%";
    let notfollowed = await db.query(`SELECT users.username as username, users.id as id FROM users full outer  join followers  on followers.user_id = users.id where ( followers.follower_id != $2 or followers.follower_id is null) and users.id != $2 and users.username like $1`,[username,req.user.id]);
    let followed = await db.query(`SELECT users.username as username, users.id as id FROM users inner  join followers  on followers.user_id = users.id where  followers.follower_id = $2 and users.username like $1`,[username,req.user.id]);
    res.json({followed : followed.rows, notfollowed: notfollowed.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* get my friends  */
router.get('/my_friends',authentication, async (req, res) => {
  try {
    console.log(req.user.id);
    let friends = await db.query(`SELECT users.username as username, users.id as id FROM users inner  join followers  on followers.user_id = users.id where  followers.follower_id = $1`,[req.user.id]);
    res.json({friends: friends.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* get user profile data */
router.get('/profile', authentication, async (req, res) => {
  try {
    const userProfile = await db.query(
      ' Select * FROM users WHERE id=$1;'
      , [req.user.id]);
    res.json(userProfile.rows[0]);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

/* update user */
router.put('/profile', authentication, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //update user data
    const updateUser = await db.query(
      'UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4 RETURNING *'
      , [req.body.username, hashedPassword, req.body.email, req.user.id]);
    // create the JWT token
    let tokens = jwtTokens(updateUser.rows[0]);
    // add tokens to the res
    res.json({token: tokens.token, user: updateUser.rows[0]});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;