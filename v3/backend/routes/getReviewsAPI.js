////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to Get All Reviews

export default async function getReviewAPI(req, res) {
    const movieID = req.params.movieID;
    const db = await openDatabase();

    try {
        const reviews = await db.all(`
            SELECT * FROM Review WHERE movieID = ?
        `, [movieID]);
        return res.status(200).json(reviews);
    }

    catch (error) {
        console.error("Error Fetching Review:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    finally {
        await db.close();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
