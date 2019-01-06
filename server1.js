const http = require('http');

http.createServer((request, response) => {
  if(request.method === 'POST' && request.url === '/echo') {
    const {header, method, url} = request;
    let body = [];
    request.on('error' , (err) => {
      console.log("error occured in request", err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      response.on('error', (err) => {
            console.log("error occured in request", err);
      });
      response.end(body);
      });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
