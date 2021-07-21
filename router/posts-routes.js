import express from 'express';
import db from '../db/db.js';
import {authentication} from '../middleware/authorization.js';
const router = express.Router();

/* get user's posts */
router.get('/my_posts',authentication, async (req, res) => {
    try {
      let output = {};
       let posts = await db.query('SELECT posts.id as id, posts.text as text, users.username as username, posts.user_id as user_id FROM posts left join users on users.id = posts.user_id where posts.user_id = $1',  [req.user.id]);
       output.posts = posts.rows;
       for(let i = 0; i < output.posts.length; i++){
        let comments = await db.query('SELECT * from comments where comments.post_id = $1', [output.posts[i].id]);
        let likes = await db.query('SELECT * FROM likes where likes.post_id = $1',   [output.posts[i].id]);
        output[output.posts[i].id] = [comments.rows,likes.rows];
      }
      res.json({output : output});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* get user's friends posts */
router.get('/my_friends_posts',authentication, async (req, res) => {
    try {
      let output = {};
      const friends_posts = await db.query('SELECT * FROM followers inner join posts on posts.user_id = followers.user_id  where followers.follower_id = $1',  [req.user.id]);
      output.posts = friends_posts.rows;
      for(let i = 0; i < output.posts.length; i++){
        let comments = await db.query('SELECT * from comments where comments.post_id = $1', [output.posts[i].id]);
        let likes = await db.query('SELECT * FROM likes where likes.post_id = $1',   [output.posts[i].id]);
        output[output.posts[i].id] = [comments.rows,likes.rows];
      }
      res.json({output : output});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* add post */
router.post('/', authentication, async (req, res) => {
    try {
      let tags = req.body.text.split("#");
      console.log(tags);
      let post =  await db.query(
        'INSERT INTO posts (user_id , text ) VALUES ($1,$2) RETURNING *'
        , [req.user.id, req.body.text]);
      for(let i = 1; i < tags.length; i++){
        var tagValue = tags[i].split(" ")[0];
        if(tagValue != ""){
          var tagValueFromDb = await db.query(
            'Select * from tags where tag_value = $1'
            , [tagValue]);
          if(tagValueFromDb.rows.length == 0){
            tagValueFromDb =  await db.query(
            'INSERT INTO tags (tag_value) VALUES ($1) RETURNING *',[tagValue]);
          }
          await db.query(
            'INSERT INTO tags_posts (post_id, tag_id) VALUES ($1, $2) RETURNING *',[post.rows[0].id, tagValueFromDb.rows[0].id]);
        }
      }
      res.status(201).json(post.rows[0]);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});


/* update post */
router.put('/:id', authentication, async (req, res) => {
    try {
      await db.query(
        'UPDATE posts SET user_id = $1, text = $2 WHERE id = $3 RETURNING *'
        , [req.user.id, req.body.text, req.params.id]);
      res.json("done") 
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

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const newPost = await db.query(
      'SELECT posts.id as id, posts.text as text, users.username as username, posts.user_id as user_id, comments.text as comment_text from posts inner join users on users.id = posts.user_id left join comments on comments.post_id = posts.id WHERE posts.id=$1;'
      , [req.params.id]);
      
    res.json({post:newPost.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;