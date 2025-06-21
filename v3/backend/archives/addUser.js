import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Open the database
let db = new sqlite3.Database('./databaseTest.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the database.");
    }
});

// Route to create an account
app.post('/addUser', (req, res) => {
    const { email, username, password, genres } = req.body;
    console.log("Received data:", req.body);

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

    // Check if email already exists
    const checkEmailQuery = `SELECT * FROM Account WHERE email_address = ?`;
    db.get(checkEmailQuery, [email], (err, row) => {
        if (err) {
            console.error("Error checking email:", err.message);
            return res.status(500).json({ message: "Error checking email" });
        }

        if (row) {
            // Email already exists
            return res.status(400).json({ message: "Email already exists" });
        }

        // Insert into Account if email does not exist
        const insertAccountQuery = `INSERT INTO Account (email_address, password) VALUES (?, ?)`;
        db.run(insertAccountQuery, [email, password], function (err) {
            if (err) {
                console.error("Error inserting account:", err.message);
                return res.status(400).json({ message: "Error creating account" });
            }

            const accountId = this.lastID;

            // Insert into Profile
            const favoriteGenres = genres ? genres.join(',') : null;
            const insertProfileQuery = `INSERT INTO Profile (username, account_id, favorite_genres) VALUES (?, ?, ?)`;
            db.run(insertProfileQuery, [username, accountId, favoriteGenres], (err) => {
                if (err) {
                    console.error("Error inserting profile:", err.message);
                    return res.status(400).json({ message: "Error creating profile" });
                }

                res.status(200).json({ message: "Account created successfully" });
            });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
