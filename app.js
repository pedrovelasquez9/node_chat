var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){
	console.log('Client connected...');

	client.on('messages', function(message){
		var nickname=client.nickname;
		client.broadcast.emit("messages",nickname+ ":" + message);
		client.emit("messages",nickname+ ":" + message);
	});

	client.on("join",function(name){
		client.nickname=name;
		console.log(name+" join the chat");
	});
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080; 
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

server.listen(port, ip);