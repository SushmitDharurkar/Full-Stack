"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//MongoDB Client

// var mongo = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/seconddb";
//
// //MongoDB Connection
// MongoClient.connect(url, function (err, db) {
//     if (err){
//       throw err;
//     }
//     // console.log("Db created");
//     // db.createCollection("coll1", function (err, res) {
//     //     if (err){
//     //       throw err;
//     //     }
//     //     console.log("Collection created!");
//     // });
//     // var doc1 = {"name" : "x", "No" : 1};
//     // db.collection("coll1").insertOne(doc1, function (err, res) {
//     //   if(err){
//     //     throw err;
//     //   }
//     //   console.log("Document inserted");
//     //   db.close(); //Always close db pointer
//     // });
//     // var doc1 = {"name" : "Sush", "No" : 1};
//     // db.collection("coll1").insertMany(doc1, function (err, res) {
//     //   if(err){
//     //     throw err;
//     //   }
//     //   console.log("Documents inserted");
//     // });
//     // db.collection("coll1").findOne({}, function (err, res) {
//     //     if (err){
//     //       throw err;
//     //     }
//     //     console.log(res);
//     //     db.close(); //Always close db pointer
//     // });
//     // db.collection("coll1").find().toArray(function (err, res) {
//     //     if (err){
//     //       throw err;
//     //     }
//     //     console.log(res);
//     //     db.close(); //Always close db pointer
//     // });
//                                 //( {query}, {projection} )
//     db.collection("coll1").find({}, {_id : 0}).toArray(function (err, res) {
//         if (err){
//           throw err;
//         }
//         console.log(res);
//         db.close(); //Always close db pointer
//     });
// });

var User = require('./models/db');

//Document
// var newUser = new User({
//    name : "A",
//    no : 1,
//    // creation_date :
// });

// var User1 = new User({
//     name : "C",
//     no : 2
// });
//
// User1.save(function (err) {
//     if (err){
//       throw err;
//     }
//     console.log("User added")
// });


//Create/Insert
// newUser.save(function (err) {
//     if (err){
//       throw err;
//     }
//     console.log("User Created!");
// });

//Read/Find
User.find({}, function (err, result) {
  if (err){
    throw err;
  }
  console.log(result);
});

//Update
// User.findOneAndUpdate({name : "C"}, {name : "B"}, function (err, res) {
//   if (err){
//     throw err;
//   }
//   console.log(res);
// });

//This way doesn't work
// User.find({name : "C"}, function (err, result) {
//     if (err){
//         throw err;
//     }
//     // console.log(result);
//     result.no = 3;
//
//     result.save(function (err) {
//         if (err){
//           throw err;
//         }
//     });
// });

// //Delete
// User.findOneAndRemove({name : "B"}, function (err, res) {
//     if (err){
//       throw err;
//     }
// });

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
