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
})


export default router;