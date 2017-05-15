var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
   var tasks = [];

   Promise.all(tasks).then(function() {
      // console.log(model);
      res.render('index');
   });
});

router.get('/page', function(req, res) {
   var tasks = [];

   Promise.all(tasks).then(function() {
      // console.log(model);
      res.render('page');
   });
});

module.exports = router;