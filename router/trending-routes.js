import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
       let tags = await db.query(`select tag_id,count(post_id) as count, tag_value from tags_posts full outer join tags on tags.id = tags_posts.tag_id  where posting_date >= current_date - interval '7 days' group by tag_id, tag_value order by count DESC LIMIT 10`);
       res.json({tags : tags});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

export default router;