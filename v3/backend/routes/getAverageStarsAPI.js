////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logStart, logError, logFailure, logSuccess } from "../library/logs.js";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function getAverageStars(req, res) {
    const movieID = req.params.movieID;
    const db = await openDatabase();

    try {
        const reviews = await db.all(`
            SELECT * FROM Review WHERE movieID = ?
        `, [movieID]);

        let reviewCount = 0;
        let starCount = 0;

        for (const review of reviews) {
        	const stars = review.reviewRating;
        	starCount += stars;
        	reviewCount++;
        }

        const averageStars = (starCount / reviewCount).toFixed(1); // string

        return res.status(200).json({
        	averageStars: averageStars
        });
    }

    catch (error) {
        console.error("Error Fetching Review:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    finally {
        await db.close();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
