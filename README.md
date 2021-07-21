# simple_twitter
#### Made By: Areej Obaid

### A web application that is very similar to Twitter, but very simplified.
- Users can sign up and sign in using their email and password
- Users can publish textual posts
- Posts can be associated with #tags
- Users can follow other users, in which case they will be able to see their posts
- A user can interact with a post by commenting, like or dislike.
- A user can find top 10 trending #tags in the last 7 days.

### The Live Website: [Link](https://simple-twitter-new.herokuapp.com).

### ER diagram for the SQL database: [Link](https://drive.google.com/file/d/15QUnAfx0mrfnMS4rTLMrSxJQL_dAvYoV/view?usp=sharing).

### Github repo link: [Link](https://github.com/areejobaid94/simple_twitter).

### sql query to find the top 10 trending #tags in the last 7 days, considering the number of posts published on each #tag
```
select tag_id,count(post_id) as count, tag_value from tags_posts full outer join tags on tags.id = tags_posts.tag_id  where posting_date >= current_date - interval '7 days' group by tag_id, tag_value order by count DESC LIMIT 10;
```