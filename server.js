// load package dependencies
var express = require('express');
var app = express();
var router = express.Router(); // middle layer routing service
var bodyParser = require('body-parser'); // middleware bc express can't read data from <form> element

// extract data from form, add them to body of the request object
router.use(bodyParser.urlencoded({extended: true}));

// path to HTML views
var path = __dirname + '/views/';

// getse executed before any other route, prints requests
router.use(function (req,res,next){
  console.log("/" + req.method);
  //console.log("/contact" + req.body);
  next(); // required to pass on to next route
});

// setup http request routes
router.get('/',function(req,res){
  res.sendFile(path + "index.html");
});

router.get('/about',function(req,res){
  res.sendFile(path + "about.html");
});

router.get('/contact',function(req,res){
  res.sendFile(path + "contact.html");
});

router.post('/contact', function(req, res){
  console.log(req.body, res.body);
});

// use the above defined routes
app.use("/",router);

// launch everything else first, if request doesn't work post this
app.use("*",function(req,res){
  res.sendFile(path + '404.html')
});

app.listen(3000, function(){
console.log("Listening at Port 3000")
});
