import express from 'express';
import db from '../db/db.js';
import {authentication} from '../middleware/authorization.js';
const router = express.Router();

/* get user's likes */
router.get('/my_likes',authentication, async (req, res) => {
    try {
      const userComments = await db.query('SELECT * FROM likes where user_id = ($1)',  [req.user.user_id]);
      res.json({comments : userComments.rows});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* add like */
router.post('/:id', authentication, async (req, res) => {
    try {
      let like = await db.query(
        'INSERT INTO likes (user_id , post_id, value) VALUES ($1,$2,$3) RETURNING *'
        , [req.user.id, req.params.id,req.body.value]);
      res.status(201).json(like.rows[0]);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* update like */
router.put('/:id', authentication, async (req, res) => {
    try {
      console.log(req.user.id, req.body.value, req.params.id);
      const updateComment = await db.query(
        'UPDATE likes SET value = $2 WHERE post_id = $3 and user_id = $1 RETURNING *'
        , [req.user.id, req.body.value, req.params.id]);
      res.status(201);      
      res.json({like : updateComment.rows[0]}) 
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* delete like */
router.delete('/:id', authentication, async (req, res) => {
    try {
      console.log(req.params.id);
      await db.query(
        ' DELETE FROM likes WHERE post_id=$1 and user_id = $2'
        , [req.params.id, req.user.id]);
      res.status(201).json("done");
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;