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
      await db.query(
        'INSERT INTO likes (user_id , post_id, value) VALUES ($1,$2,$3) RETURNING *'
        , [req.user.user_id, req.params.id,req.body.value]);
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* update like */
router.put('/:id', authentication, async (req, res) => {
    try {
      const updateComment = await db.query(
        'UPDATE likes SET user_id = $1, value = $2 post_id = $4 WHERE id = $3 RETURNING *'
        , [req.user.user_id, req.body.value, req.params.id, req.body.post_id]);
      res.json({comment : updateComment.rows[0]}) 
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* delete like */
router.delete('/:id', authentication, async (req, res) => {
    try {
      const newPost = await db.query(
        ' DELETE FROM likes WHERE id=$1;'
        , [req.params.id]);
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;