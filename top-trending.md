
### SQL query to find the top 10 trending #tags in the last 7 days, considering the number of posts published on each #tag
```
Select tag_id,count(post_id) as count, tag_value from tags_posts full outer join tags on tags.id = tags_posts.tag_id  where posting_date >= current_date - interval '7 days' group by tag_id, tag_value order by count DESC LIMIT 10;
```
