const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/port', (req, res) => {res.write(`Listening on ${ PORT }`); res.end()})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

var net = require('net');

var others_map = new Set();

var server = net.createServer(function(socket) {
	socket.write("Content-type: text/html\r\n\r\nEcho server has " + others_map.size + ' users right now\r\n');
	socket.on('data', function(chunk) {
		others_map.forEach(function(a){
			if(a !== socket )
			{
				a.write(chunk);
			}
		});
	  });
	  socket.on('end', function(){others_map.delete(socket)});
	others_map.add(socket);
});

server.listen(PORT);
