var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

var others_map = [];

wss.on("connection", function(ws) {
  // var id = setInterval(function() {
     ws.send(JSON.stringify(new Date()) + "\r\n", function() {  })
  // }, 1000)

  console.log("websocket connection open")
  
  ws.on('message', function(chunk){
	for(var a in others_map)
		if(others_map[a] !== ws )
		{
			others_map[a].send(chunk);
		}
  });

  ws.on("close", function() {
    console.log("websocket connection close")
	for(var a in others_map)
		if(others_map[a] === ws )
		{
			others_map.splice(a, 1);
		}
    //clearInterval(id)
  })
  
  others_map.push(ws);
})
