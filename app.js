const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            let message = parsedBody.split('=')[1] || '';
            message = decodeURIComponent(message.replace(/\+/g, ' '));
            fs.writeFile('message.txt', message, err => {
                if (err) {
                    console.error('Failed to write message:', err);
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Server error');
                    return;
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});