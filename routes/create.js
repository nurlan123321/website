var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Posts = require('../models/posts');
var Categories = require('../models/categories');
var multer = require('multer');
var upload = multer({dest: 'public/images/uploads'});
var fs = require('fs');

router.get('/create', ensureAuthenticated, function(req, res, next){
    Categories.find(function(err, categories){
        if(err){
            console.log("Error Categories" + err)
        }
       res.render('createpost', {
           categories: categories,
       });
    })
})

router.get('/:category', function(req, res, next){
    Posts.find({category: req.params.category}, function(err, posts){
        if(err){
            console.log("Error category req.params")
        }
        res.render('index', {
            category: req.params.category,
            items: posts
        })
    })
})


// Permission - Create Post
function ensureAuthenticated(req, res,next){
    if(req.isAuthenticated()){
        return next();
    }else {
        res.redirect('/users/login');
    }
}

router.post('/create', upload.any(), function(req, res, next){

 //upload the file and Save Posts
    if(req.files){
        req.files.forEach(function(file){
            var filename = (new Date).valueOf()+"-"+file.originalname
            fs.rename(file.path, 'public/images/uploads/' + filename, function(err){
                if(err) throw err;
                var post = new Posts({
                    title: req.body.title,
                    body: req.body.body,
                    category: req.body.category,
                    author: req.body.author,
                    mainimage: filename
                });
                post.save();
                res.redirect('/')    
            })
        })
    }
})

// Detail Page Posts
router.get('/show/:id', function(req, res, next){
    Posts.findById(req.params.id, function(err, post){
        if(err){
            console.log("Error Post")
        }
        res.render('show', {
            post: post
        })
    })
})

module.exports = router;