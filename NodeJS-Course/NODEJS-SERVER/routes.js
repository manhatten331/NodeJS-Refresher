const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action= "/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, err => {
                res.writeHead(302, { 'Location': '/' })
                return res.end()
            });
        });
        //The code on lines 31 - 33 is the same as the code below just written in one method rather than two methods
        // res.statusCode = 302;
        // res.setHeader('Location', '/');
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>First page</head></title>')
    res.write('<body>Hello World</body>')
    res.write('</html>')
    res.end();
}

module.exports = requestHandler;