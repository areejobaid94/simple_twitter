import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../helpers/jwt-token-helpers.js';

const router = express.Router();

// login route 
router.post('/login', async (req, res) => {
  try {
    // find user by email
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if (users.rows.length === 0) return res.status(401).json({error:"Email is incorrect"});
    // check password
    const validPassword = await bcrypt.compare(req.body.password, users.rows[0].password);
    if (!validPassword) return res.status(401).json({error: "Incorrect password"});

    // create the JWT token
    let tokens = jwtTokens(users.rows[0]);

    // add tokens to the res
    res.json(tokens);
  } catch (error) {
    res.status(401).json({error: error.message});
  }

});

export default router;