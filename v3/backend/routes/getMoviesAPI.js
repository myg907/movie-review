////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to Get All Movies

export async function getMoviesAPI(req, res) {
	const db = await openDatabase();

	try {
    	const movies = await db.all("SELECT * FROM Movie");
    	movies.forEach(movie => { movie.cover = movie.cover.toString('base64'); }); // convert binary image to base64
    	return res.status(200).json(movies);
	}

	catch (error) {
		console.error("Error Fetching Movies:", error.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
	
	finally {
    	await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to Log All Movies in Console

export async function logMovies() {
    const db = await openDatabase();

	try {
		const movies = await db.all("SELECT * FROM Movie");

		movies.forEach(movie => {
			console.log("Movie Object\n")
			console.log(movie);
			console.log();
			const { id, title, cover, mime_type, description, maturity_rating, release_date, trailer_link, runtime } = movie;
			console.log("Movie Properties\n")
			console.log("id:", id);
			console.log("title:", title);
			console.log("cover:", cover);
			console.log("description:", description);
			console.log("maturity_rating:", maturity_rating);
			console.log("release_date:", release_date);
			console.log("trailer_link:", trailer_link);
			console.log("runtime:", runtime);
			console.log();
		});

		console.log("Movies Logged Successfully");
	}

	catch (error) {
		console.error("Error Fetching Movies:", error.message);
	}

	finally {
    	await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
