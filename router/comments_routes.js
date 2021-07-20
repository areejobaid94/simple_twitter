import express from 'express';
import db from '../db/db.js';
import {authentication} from '../middleware/authorization.js';
const router = express.Router();

/* get user's comments */
router.get('/my_comments',authentication, async (req, res) => {
    try {
      const userComments = await db.query('SELECT * FROM comments where user_id = ($1)',  [req.user.user_id]);
      res.json({comments : userComments.rows});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* add comment */
router.post('/:id', authentication, async (req, res) => {
    try {
      await db.query(
        'INSERT INTO comments (user_id , text, post_id) VALUES ($1,$2,$3) RETURNING *'
        , [req.user.id, req.body.text,  req.params.id]);
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* update comment */
router.put('/:id', authentication, async (req, res) => {
    try {
      const updateComment = await db.query(
        'UPDATE comments SET user_id = $1, text = $2 post_id = $4 WHERE id = $3 RETURNING *'
        , [req.user.user_id, req.body.text, req.params.id, req.body.post_id]);
      res.json({comment : updateComment.rows[0]}) 
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* delete post */
router.delete('/:id', authentication, async (req, res) => {
    try {
      const newPost = await db.query(
        ' DELETE FROM comment WHERE id=$1;'
        , [req.params.id]);
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;