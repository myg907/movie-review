
const http = require('node:http');
const fs = require('node:fs'); // Import the File System module
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'htmlPages/createAccount.html'); // Path to your HTML file
    const header = path.join(__dirname, 'htmlPages/header.html'); // Path to your HTML file
    fs.readFile(header, 'utf8', (err, headerData) => {
        if (err) throw err;

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error loading the HTML file');
                return;
            }
            const finalHtml = headerData + data;
            res.statusCode = 200;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(finalHtml); // Serve the HTML file contents
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});