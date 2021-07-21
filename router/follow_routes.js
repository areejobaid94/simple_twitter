import express from 'express';
import db from '../db/db.js';
import {authentication} from '../middleware/authorization.js';
const router = express.Router();

/* follow user */
router.post('/:id', authentication, async (req, res) => {
    try {
      await db.query(
        'insert into followers (follower_id, user_id) values($1,$2);'
        , [req.user.id, req.params.id]);
          
      res.status(201).json("done");
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

/* follow user */
router.delete('/:id', authentication, async (req, res) => {
    try {
      await db.query(
        'delete from followers where follower_id = $1 and user_id = $2;'
        , [req.user.id, req.params.id]);
          
      res.json("done");
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;