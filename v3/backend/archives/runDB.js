import sqlite3 from "sqlite3";
let db = new sqlite3.Database('databaseTest.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the database.");
    }
});

db.serialize(() => {
    // Create tables
    db.run(`CREATE TABLE IF NOT EXISTS Account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        birthday DATE,
        gender VARCHAR(10),
        email_address VARCHAR(255) UNIQUE,
        password VARCHAR(255)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Profile (
        username VARCHAR(255) PRIMARY KEY,
        account_id INT,
        profile_picture VARCHAR(255),
        favorite_genres TEXT,
        watch_later TEXT,
        FOREIGN KEY (account_id) REFERENCES Account(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Movie (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255),
        cover VARCHAR(255),
        description TEXT,
        maturity_rating VARCHAR(10),
        release_date DATE,
        trailer_link VARCHAR(255),
        runtime INT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Genre (
        name VARCHAR(255) PRIMARY KEY
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Movie_Genre (
        movie_id INT,
        genre_name VARCHAR(255),
        FOREIGN KEY (movie_id) REFERENCES Movie(id),
        FOREIGN KEY (genre_name) REFERENCES Genre(name),
        PRIMARY KEY (movie_id, genre_name)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Favorite_Genres (
        profile_username VARCHAR(255),
        genre_name VARCHAR(255),
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        FOREIGN KEY (genre_name) REFERENCES Genre(name),
        PRIMARY KEY (profile_username, genre_name)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Favorite_Movie (
        profile_username VARCHAR(255),
        movie_id INT,
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        FOREIGN KEY (movie_id) REFERENCES Movie(id),
        PRIMARY KEY (profile_username, movie_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Watched_Movie (
        profile_username VARCHAR(255),
        movie_id INT,
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        FOREIGN KEY (movie_id) REFERENCES Movie(id),
        PRIMARY KEY (profile_username, movie_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Watch_Later (
        profile_username VARCHAR(255),
        movie_id INT,
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        FOREIGN KEY (movie_id) REFERENCES Movie(id),
        PRIMARY KEY (profile_username, movie_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Review (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_id INT,
        profile_username VARCHAR(255),
        date DATE,
        text TEXT,
        star_rating INT,
        FOREIGN KEY (movie_id) REFERENCES Movie(id),
        FOREIGN KEY (profile_username) REFERENCES Profile(username)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Review_Tag (
        review_id INT,
        tag_name VARCHAR(255),
        FOREIGN KEY (review_id) REFERENCES Review(id),
        FOREIGN KEY (tag_name) REFERENCES Tag(name),
        PRIMARY KEY (review_id, tag_name)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Tag (
        name VARCHAR(255) PRIMARY KEY
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Comment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        review_id INT,
        profile_username VARCHAR(255),
        date DATE,
        text TEXT,
        FOREIGN KEY (review_id) REFERENCES Review(id),
        FOREIGN KEY (profile_username) REFERENCES Profile(username)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Comment_Like (
        review_id INT,
        profile_username VARCHAR(255),
        FOREIGN KEY (review_id) REFERENCES Review(id),
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        PRIMARY KEY (review_id, profile_username)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Comment_Dislike (
        review_id INT,
        profile_username VARCHAR(255),
        FOREIGN KEY (review_id) REFERENCES Review(id),
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        PRIMARY KEY (review_id, profile_username)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Review_Like (
        review_id INT,
        profile_username VARCHAR(255),
        FOREIGN KEY (review_id) REFERENCES Review(id),
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        PRIMARY KEY (review_id, profile_username)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Review_Dislike (
        review_id INT,
        profile_username VARCHAR(255),
        FOREIGN KEY (review_id) REFERENCES Review(id),
        FOREIGN KEY (profile_username) REFERENCES Profile(username),
        PRIMARY KEY (review_id, profile_username)
    )`);

    // Insert sample data with 'INSERT OR IGNORE' to avoid duplicate errors
    db.run(`INSERT OR IGNORE INTO Account (first_name, last_name, birthday, gender, email_address, password) 
            VALUES ('John', 'Doe', '1990-01-01', 'Male', 'john.doe@example.com', 'password123')`);

    db.run(`INSERT OR IGNORE INTO Profile (username, account_id, profile_picture, favorite_genres, watch_later) 
            VALUES ('johndoe', 1, 'johndoe.jpg', 'Action,Comedy', '[]')`);

    db.run(`INSERT OR IGNORE INTO Movie (title, cover, description, maturity_rating, release_date, trailer_link, runtime) 
            VALUES ('Jaws', 'jaws.jpg', 'A giant shark terrorizes a small town.', 'PG', '1975-06-20', 'https://trailerlink.com/jaws', 124)`);

    db.run(`INSERT OR IGNORE INTO Movie (title, cover, description, maturity_rating, release_date, trailer_link, runtime) 
            VALUES ('Halloween', 'Halloween.jpg', 'Evil Man.', 'R', '1975-06-20', 'https://trailerlink.com/Halloween', 124)`);

    db.run(`INSERT OR IGNORE INTO Genre (name) VALUES ('Action')`);
    db.run(`INSERT OR IGNORE INTO Genre (name) VALUES ('Thriller')`);

    db.run(`INSERT OR IGNORE INTO Movie_Genre (movie_id, genre_name) VALUES (1, 'Action')`);
    db.run(`INSERT OR IGNORE INTO Favorite_Genres (profile_username, genre_name) VALUES ('johndoe', 'Action')`);
    db.run(`INSERT OR IGNORE INTO Favorite_Movie (profile_username, movie_id) VALUES ('johndoe', 1)`);
    db.run(`INSERT OR IGNORE INTO Watch_Later (profile_username, movie_id) VALUES ('johndoe', 1)`);

    db.run(`INSERT OR IGNORE INTO Review (movie_id, profile_username, date, text, star_rating) 
            VALUES (1, 'johndoe', '2024-10-25', 'Great movie!', 5)`);

    db.run(`INSERT OR IGNORE INTO Tag (name) VALUES ('Suspenseful')`);
    db.run(`INSERT OR IGNORE INTO Review_Tag (review_id, tag_name) VALUES (1, 'Suspenseful')`);

    db.run(`INSERT OR IGNORE INTO Comment (review_id, profile_username, date, text) 
            VALUES (1, 'johndoe', '2024-10-25', 'Absolutely agree!')`);

    db.run(`INSERT OR IGNORE INTO Comment_Like (review_id, profile_username) VALUES (1, 'johndoe')`);
    db.run(`INSERT OR IGNORE INTO Review_Like (review_id, profile_username) VALUES (1, 'johndoe')`);

    // Display data from tables
    const tables = ["Account", "Profile", "Movie", "Genre", "Movie_Genre", "Favorite_Genres", "Favorite_Movie", "Watched_Movie", "Watch_Later", "Review", "Review_Tag", "Tag", "Comment", "Comment_Like", "Comment_Dislike", "Review_Like", "Review_Dislike"];

    tables.forEach(table => {
        db.all(`SELECT * FROM ${table}`, (err, rows) => {
            if (err) {
                console.error(`Error retrieving data from ${table}:`, err.message);
            } else {
                console.log(`\nTable: ${table}`);
                rows.forEach(row => {
                    console.log(row);
                });
            }
        });
    });
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Database connection closed.");
    }
});