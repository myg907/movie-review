////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "./database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeDatabase() {
    // Create the Database File
    const db = await openDatabase();

    // Create Tables in the Database
    await createTables(db);

    // Insert Data into the Database
    await insertData(db);

    // Close the Database File
    await db.close();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE TABLES

async function createTables(db) {
    try {
        // Account Table
        await db.exec(`
            CREATE TABLE Account (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255),
                username VARCHAR(255),
                picture BLOB,
                mime_type VARCHAR(255)
            );
        `);

        // Movie Table
        await db.exec(`
            CREATE TABLE Movie (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(255),
                cover BLOB,
                mime_type VARCHAR(255),
                description TEXT,
                maturity_rating VARCHAR(10),
                release_date DATE,
                trailer_link VARCHAR(255),
                runtime INT
            );
        `);

        // Review Table
        await db.exec(`
            CREATE TABLE Review (
                reviewID INTEGER PRIMARY KEY AUTOINCREMENT,
                accountID INTEGER NOT NULL,
                movieID INTEGER NOT NULL,
                dateMade TEXT NOT NULL,
                reviewRating INTEGER NOT NULL,
                content TEXT NOT NULL,
                FOREIGN KEY(MovieID) REFERENCES Movie(Movie)
                FOREIGN KEY(AccountID) REFERENCES Account(id)
            );
        `);

        // Review Likes Table
        await db.exec(`
            CREATE TABLE Review_Like (
                review_id INT,
                profile_username VARCHAR(255),
                FOREIGN KEY (review_id) REFERENCES Review(id),
                FOREIGN KEY (profile_username) REFERENCES Profile(username),
                PRIMARY KEY (review_id, profile_username)
            );
        `);

        // Review Dislikes Table
        await db.exec(`
            CREATE TABLE Review_Dislike (
                review_id INT,
                profile_username VARCHAR(255),
                FOREIGN KEY (review_id) REFERENCES Review(id),
                FOREIGN KEY (profile_username) REFERENCES Profile(username),
                PRIMARY KEY (review_id, profile_username)
            );
        `);

        // Comment Table
        await db.exec(`
            CREATE TABLE Comment (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                review_id INT,
                profile_username VARCHAR(255),
                date DATE,
                text TEXT,
                FOREIGN KEY (review_id) REFERENCES Review(id),
                FOREIGN KEY (profile_username) REFERENCES Profile(username)
            );
        `);

        // Comment Likes Table
        await db.exec(`
            CREATE TABLE Comment_Like (
                review_id INT,
                profile_username VARCHAR(255),
                FOREIGN KEY (review_id) REFERENCES Review(id),
                FOREIGN KEY (profile_username) REFERENCES Profile(username),
                PRIMARY KEY (review_id, profile_username)
            );
        `);

        // Comment Dislikes Table
        await db.exec(`
            CREATE TABLE Comment_Dislike (
                review_id INT,
                profile_username VARCHAR(255),
                FOREIGN KEY (review_id) REFERENCES Review(id),
                FOREIGN KEY (profile_username) REFERENCES Profile(username),
                PRIMARY KEY (review_id, profile_username)
            );
        `);

        // Genre Table
        await db.exec(`
            CREATE TABLE Genre (
                name VARCHAR(255) PRIMARY KEY,
                label VARCHAR(255)
            );
        `);

        // Movie Genres Table
        await db.exec(`
            CREATE TABLE Movie_Genre (
                movie_id INT,
                genre_name VARCHAR(255),
                FOREIGN KEY (movie_id) REFERENCES Movie(id),
                FOREIGN KEY (genre_name) REFERENCES Genre(name),
                PRIMARY KEY (movie_id, genre_name)
            );
        `);

        // Tag Table
        await db.exec(`
            CREATE TABLE Tag (
                name VARCHAR(255) PRIMARY KEY
            );
        `);

        // Review Tags Table
        await db.exec(`
            CREATE TABLE Review_Tag (
                review_id INT,
                tag_name VARCHAR(255),
                FOREIGN KEY (review_id) REFERENCES Review(id),
                FOREIGN KEY (tag_name) REFERENCES Tag(name),
                PRIMARY KEY (review_id, tag_name)
            );
        `);

        // Favorite Genres Table
        await db.exec(`
            CREATE TABLE Favorite_Genre (
                profile_username VARCHAR(255),
                genre_name VARCHAR(255),
                FOREIGN KEY (profile_username) REFERENCES Profile(username),
                FOREIGN KEY (genre_name) REFERENCES Genre(name),
                PRIMARY KEY (profile_username, genre_name)
            );
        `);

        // Favorite Movies Table
        await db.exec(`
            CREATE TABLE Favorite_Movie (
                account_id INT,
                movie_id INT,
                FOREIGN KEY (account_id) REFERENCES Account(id),
                FOREIGN KEY (movie_id) REFERENCES Movie(id),
                PRIMARY KEY (account_id, movie_id)
            );
        `);

        // Watched Movies Table
        await db.exec(`
            CREATE TABLE Watched_Movie (
                profile_username VARCHAR(255),
                movie_id INT,
                FOREIGN KEY (profile_username) REFERENCES Profile(username),
                FOREIGN KEY (movie_id) REFERENCES Movie(id),
                PRIMARY KEY (profile_username, movie_id)
            );
        `);

        // Watch Later Table
        await db.exec(`
            CREATE TABLE Watch_Later (
                account_id INT,
                movie_id INT,
                FOREIGN KEY (account_id) REFERENCES Account(id),
                FOREIGN KEY (movie_id) REFERENCES Movie(id),
                PRIMARY KEY (account_id, movie_id)
            );
        `);


    } catch (error) {console.error("Error Creating Tables:", error.message);}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INSERT DATA

async function insertData(db) {
    await insertMovies(db);
    await insertGenres(db);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

initializeDatabase();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function insertMovies(db) {
    try {
        const insertStmt = await db.prepare(`
            INSERT INTO Movie (title, cover, description, maturity_rating, release_date, trailer_link, runtime)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        // The pictures to to be in binary format.
        await insertStmt.run("Jaws", "jaws.jpg", "A shark movie", "Rated R", "10/10/2002", "https://www.movie.com/jaws-trailer", 90);
        await insertStmt.run("The Godfather", "godfather.jpg", "A crime family saga", "Rated R", "24/03/1972", "https://www.movie.com/godfather-trailer", 175);
        await insertStmt.run("Inception", "inception.jpg", "A mind-bending thriller", "Rated PG-13", "16/07/2010", "https://www.movie.com/inception-trailer", 148);
        await insertStmt.run("The Conjuring", "conjuring.jpg", "A family is haunted by a supernatural entity in their farmhouse.", "Rated R", "19/07/2013", "https://www.movie.com/conjuring-trailer", 112);
        await insertStmt.run("Hereditary", "hereditary.jpg", "A family unravels terrifying secrets after the death of their matriarch.", "Rated R", "08/06/2018", "https://www.movie.com/hereditary-trailer", 127);
        await insertStmt.run("Get Out", "get-out.jpg", "A young man uncovers shocking secrets when he visits his girlfriend's family.", "Rated R", "24/02/2017", "https://www.movie.com/get-out-trailer", 104);
        await insertStmt.run("A Quiet Place", "a-quiet-place.jpg", "A family must stay silent to avoid monstrous creatures hunting by sound.", "Rated PG-13", "06/04/2018", "https://www.movie.com/a-quiet-place-trailer", 90);
        await insertStmt.run("It", "it.jpg", "A group of kids face their worst fears against a malevolent clown.", "Rated R", "08/09/2017", "https://www.movie.com/it-trailer", 135);

        insertStmt.finalize();
    } catch (error) {console.error("Error Inserting Data:", error.message);}
}

async function insertGenres(db) {
    try {
        const stmt = await db.prepare(`
            INSERT INTO Genre (name, label)
            VALUES (?, ?)
        `);

        await stmt.run("action", "Action");
        await stmt.run("adventure", "Adventure");
        await stmt.run("fantasy", "Fantasy");
        await stmt.run("horror", "Horror");
        await stmt.run("western", "Western");
        
        stmt.finalize();
    } catch (error) { console.error("Error Inserting Data:", error.message); }
}