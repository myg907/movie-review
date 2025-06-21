import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import CryptoJS from "crypto-js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('./databaseTest.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database');
        // Create a users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS Account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        birthday DATE,
        gender VARCHAR(10),
        email_address VARCHAR(255) UNIQUE,
        password VARCHAR(255)
    )`);
    }
});

// Serve static files (for CSS/JS)
app.use(express.static('public'));

// Handle POST request for login
app.post('/login', (req, res) => {
    const username = req.body.email;
    const password = CryptoJS.SHA256(req.body.password).toString();

    // SQL query to check if the user exists
    const query = 'SELECT * FROM Account WHERE email_address = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }

        if (row) {
            // If user is found, login is successful
            res.send('Login successful');
        } else {
            // If user not found, return error
            res.send('Invalid username or password');
        }
    });
});

// Start server on port 3000
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
