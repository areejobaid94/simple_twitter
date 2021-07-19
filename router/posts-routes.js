import express from 'express';
import db from '../db/db.js';
import {authentication} from '../middleware/authorization.js';
const router = express.Router();

/* get user's posts */
router.get('/my_posts',authentication, async (req, res) => {
    try {
        
      const userPosts = await db.query('SELECT * FROM posts where user_id = ($1)',  [req.user.user_id]);
      res.json({posts : userPosts.rows});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* get user's friends posts */
router.get('/my_friends_posts',authentication, async (req, res) => {
    try {
      const friends_posts = await db.query('SELECT * FROM followers inner join posts on posts.user_id = followers.user_id  where followers.follower_id = $1',  [req.user.user_id]);
      res.json({posts : friends_posts.rows});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* add post */
router.post('/', authentication, async (req, res) => {
    try {
      const newPost = await db.query(
        'INSERT INTO posts (user_id , text ) VALUES ($1,$2) RETURNING *'
        , [req.user.user_id, req.body.text]);
          
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* update post */
router.put('/:id', authentication, async (req, res) => {
    try {
      const updatePost = await db.query(
        'UPDATE posts SET user_id = $1, text = $2 WHERE id = $3 RETURNING *'
        , [req.user.user_id, req.body.text, req.params.id]);
      res.json({post : updatePost.rows[0]}) 
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* delete post */
router.delete('/:id', authentication, async (req, res) => {
    try {
      const newPost = await db.query(
        ' DELETE FROM posts WHERE id=$1;'
        , [req.params.id]);
      res.status(201);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;