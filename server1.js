const http = require('http');

http.createServer((request, response) => {
  const {header, method, url} = request;
  let body = [];
  request.on('error' , (err) => {
    console.log("error occured in request", err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    // response stuff

    response.on('error', (err) => {
      console.log("error occured in request", err);
    });

    response.statusCode = 200;
    response.statusMessage = 'Custom success 200';
    response.setHeader('Content-Type', 'application/json');
    // above two lines
    // response.writeHead(200, {'Content-Type', 'application/json'});
    const responseBody = {header, method, url, body};
    response.write(JSON.stringify(responseBody));
    response.end();
    // or below line for above two
    //response.end(JSON.stringify(responseBody));

    // end of response stuff
  });
}).listen(8080);
