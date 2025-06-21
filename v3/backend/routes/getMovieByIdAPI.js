////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to retrieve movie from the database by title

export async function getMovieByIdAPI(req, res) {
    const id = req.params.id;
    const db = await openDatabase();

    try {
        const stmt = await db.prepare(`
            SELECT *
            FROM Movie
            WHERE id = ?
        `);

        const movie = await stmt.get(id);
        stmt.finalize();

        if (!movie) {
            return res.status(200).send("Movie Not Found");
        } else {
            movie.cover = movie.cover.toString('base64');
            return res.status(200).json(movie);
        }
    }

    catch (error) {
        console.error("Error Fetching Movie:", error.message);
        return res.status(500).send("Server Error");
    }

    finally {
        await db.close();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
