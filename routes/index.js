var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Posts = require('../models/posts');
var Categories = require('../models/categories');

/* GET home page. */
router.get('/', function(req, res, next) {
  Posts.find(function(err, posts){
    if(err){
      console.log("Error Posts")
    }
      res.render('index',{
        "items": posts,
      })
    })
});

module.exports = router;
