////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to retrieve movie from the database by title

export async function getMovieByTitleAPI(req, res) {
    const title = req.params.title.toLowerCase();
    const db = await openDatabase();

    try {
        const stmt = await db.prepare(`
            SELECT *
            FROM Movie
            WHERE LOWER(title) = ?
        `);


        const movie = await stmt.get(title);
        stmt.finalize();
        
        if (!movie) {
            return res.status(400).json({ message: "movie not found" });
        }
        return res.status(200).json(movie);
    }

    catch (error) {
        console.error("Error Fetching Movie:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
    finally {
        await db.close();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
