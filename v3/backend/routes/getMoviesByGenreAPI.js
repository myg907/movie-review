////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to retrieve movie from the database by title
//This gets the genres from the database.
// routes/getMovieByGenresAPI.js


export async function getMovieByGenresAPI(req, res) {
    const genre = req.params.genres.toLowerCase();
    const db = await openDatabase();

    try {
        // Query to get all movies with the specified genre (case-insensitive)
        const stmt = await db.prepare(`
            SELECT Movie.*
            FROM Movie
            JOIN Movie_Genre ON Movie.id = Movie_Genre.movie_id
            WHERE LOWER(Movie_Genre.genre_name) LIKE ?
		`);

        const movies = await stmt.all(`%${genre}%`);
        stmt.finalize();

        return res.status(200).json(movies);
    } catch (error) {
        console.error("Error Fetching Movies by Genre:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await db.close();
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////