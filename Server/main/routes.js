var express = require('express');
var pool = require('./db');
var request = require('request')

var router = express.Router();



/*
      POSTS ROUTES SECTION
*/

//Get all posts
router.get('/api/get/allposts', (req, res, next) => {
  pool.query("SELECT * FROM posts ORDER by date_created DESC", (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

//save posts to db
router.post('/api/post/poststodb', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
  pool.query('INSERT INTO posts(title, body, user_id, author, date_created) VALUES($1, $2, $3, $4, NOW())', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Edit posts
router.put('/api/put/post', (req, res, next) => {
  const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
  pool.query('UPDATE posts SET title = $1, body = $2, user_id = $3, author= $5, date_created = NOW() WHERE pid = $4', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Delete Post
router.delete('/api/delete/postcomments', (req, res, next) => {
  post_id = req.body.post_id
  pool.query('DELETE FROM comments WHERE post_id = $1', [ post_id ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

router.delete('/api/delete/post', (req, res, next) => {
  post_id = req.body.post_id
  pool.query('DELETE FROM posts WHERE pid = $1', [ post_id ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

/*
    Comments Routes Section
*/

//Post comment with user id and post id
router.post('/api/post/commenttodb', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
  pool.query('INSERT INTO comments(comment, user_id, author, post_id, date_created) VALUES($1, $2, $3, $4, NOW())', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Edit comments
router.put('/api/put/commenttodb', (req, res, next) => {
  const values = [req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  pool.query('UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author=$4, date_created = NOW() WHERE cid = $5', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Delete comment
router.delete('/api/delete/comment', (req, res, next) => {
  cid = req.body.cid
  pool.query('DELETE FROM comments where cid = $1', [ cid ], (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

//Retreive all comments associated with a certain post
router.get('/api/get/allpostcomments', (req, res, next) => {
  console.log(req)
  const post_id = String(req.query.post_id)
  console.log(post_id)
  pool.query("SELECT * FROM comments WHERE post_id = $1", [ post_id ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});


/*
      USER PROFILE ROUTES SECTION
*/

//Save user profile data to the db
router.post('/api/post/userprofiletodb', (req, res, next) => {
  const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified]
  pool.query('INSERT INTO users(username, email, date_created, email_verified) VALUES($1, $2, NOW(), $3) ON CONFLICT DO NOTHING', values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    console.log(q_res)
    res.json(q_res.rows);
  });
});

/* Retrieve user profile from db */
router.get('/api/get/userprofilefromdb', (req, res, next) => {
  // const email = [ "%" + req.query.email + "%"]
  const email = String(req.query.email)
  pool.query("SELECT * FROM users WHERE email = $1", [ email ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});

/* Get posts based on user id and display on user profile page */
router.get('/api/get/userposts', (req, res, next) => {
  const userid = String(req.query.userid)
  pool.query("SELECT * FROM posts WHERE user_id = $1", [ userid ], (q_err, q_res) => {
    res.json(q_res.rows)
  });
});



module.exports = router;
