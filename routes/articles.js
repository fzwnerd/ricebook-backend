const uploadImage = require('../uploadCloudinary');
var express = require('express');
const bodyParder = require('body-parser');
//var User = require('../models/user');
var Profiles = require('../models/profile');
var Posts = require('../models/post');


var router = express.Router();
router.use(bodyParder.json());

router.get('/', (req, res, next) => {
    var articles = [];
    Posts.find({author: req.user.username})
    .then((posts) => {
        articles = articles.concat(posts);
        Profiles.findOne({username:req.user.username})
        .then((user) => {
            Posts.find({author: {"$in": user.following}})
            .then((posts) => {
                articles = articles.concat(posts);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({articles:articles.sort((a, b) => b.date - a.date)});
            })
        }, (err) => next(err));    
    }, (err) => next(err))
    .catch((err) => next(err));
})

router.put('/:id', (req, res, next) => {
    const postId = req.params.id;
    const commId = req.body.commentId;

    if (!commId) {
        // no comment id
        // update post
        Posts.findByIdAndUpdate(postId, {body:req.body.text}, {new:true})
        .then((post) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ articles:[post] });
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else if (commId === -1) {
        // new comment
        Posts.findByIdAndUpdate(postId, {"$push": {comments: {
            author: req.user.username,
            body: req.body.text,
            date: new Date()
        }}}, {new:true})
        .then((post) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ articles:[post] });
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        /*
        Article.findOneAndUpdate({_id:postId, comments._id:commId},
				{$set:{"comments.$.text": req.body.text, "comments.$.date": new Date()}},
                {new:true})
                .then((post) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ articles:[post] });
                }, (err) => next(err))
                .catch((err) => next(err));
        */
       Posts.findById(postId)
       .then((post) => {
            post.comments.id(commId).body = req.body.text;
            post.comments.id(commId).date = new Date();
            post.save()
            .then((post) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ articles:[post] });
            }, (err) => next(err))
       }, (err) => next(err))
       .catch((err) => next(err));
    }
})

module.exports = router;