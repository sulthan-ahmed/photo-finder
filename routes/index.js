
var express = require('express');
var router = express.Router();

// for local host uncomment the following two lines


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});


module.exports = router;