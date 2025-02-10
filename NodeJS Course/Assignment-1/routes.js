const fs = require('fs');

const requestHandler = (req, res) => {  
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader("Content-Type", 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body>')
        res.write('<h1>Hello User!</h1>')
        res.write('<form action= "/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>')
        res.write('</body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/users') {
        res.setHeader("Content-Type", 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li>User1</li>')
        res.write('<li>User2</li>')
        res.write('<li>User3</li>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
    }

    if (url === '/create-user' && req.method === 'POST') {
        const body = []
        req.on('data', (chunks) => {
            body.push(chunks);
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.writeHead(302, { 'Location': '/users' })
            return res.end()
        })
    }
}

module.exports = requestHandler;


const server = htttp.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {

    }

    if (url === '/user') {

    }
})