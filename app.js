var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Define the port to run on
app.set('port', 3000);


app.get('/posts',function(req,res){
	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
    res.send(currentPosts);
})

var fs = require('fs');

app.get('/posts/:id', function(req , res){
 	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
	var foundPost = currentPosts.filter(function(item){ 
		return item.id == req.params.id; 
	});
	res.send(foundPost[0]);
});

app.post('/newPost', function(req, res) {
	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
    var title = req.body.title;
    var newestPost = {"id": Math.floor((Math.random()*10000) + 1), "title": title};
    if(title){
    	currentPosts.unshift(newestPost);
    	fs.writeFile('./posts.json', JSON.stringify(currentPosts), function (err) {
	  if(err){console.log(err)};
	});
    }
 res.send(currentPosts);    
});

app.delete('/deletePost/:id', function(req , res){
	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
	var shortenedPosts = currentPosts.filter(function(item){ 
		return item.id != req.params.id; 
	});

	fs.writeFile('./posts.json', JSON.stringify(shortenedPosts), function (err) {
	    if(err){console.log(err)};
	});
  res.send(shortenedPosts);
});

app.put('/posts/:id', function(req , res){
 	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
	var otherPosts = currentPosts.filter(function(item){ 
		return item.id != req.body.id; 
	});
	var title = req.body.title;
    var updatedPost = {"id": req.body.id, "title": title};
    var found = currentPosts.map(function(e) { return e.id; }).indexOf(req.body.id);
	if (found>-1){
	    otherPosts.unshift(updatedPost);
		fs.writeFile('./posts.json', JSON.stringify(otherPosts), function (err) {
		    if(err){console.log(err)};
		});
		res.send(otherPosts);
	}
	else{
		res.send(currentPosts);
	}
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});


