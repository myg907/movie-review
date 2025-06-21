////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function addMovie(req, res) {
	// Open the Database
	const db = await openDatabase();

	try {
		// Get Data
		const { title, description, maturityRating, releaseDate, trailerLink, runtime } = req.body;
		let genreNames = req.body.genreNames || "";
		genreNames = genreNames.trim() ? genreNames.split(',') : [];
		let cover = null;
		let mimeType = null;
		try {
			cover = req.file.buffer;
			mimeType = req.file.mimetype;
		}
		catch (error) {
			const message = "Cover Error";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		// Check Data
		if (!title || !cover || !mimeType || !description || !maturityRating || !releaseDate || !trailerLink || !runtime) {
			const message = "Missing Data";
			return res.status(400).send(message);
		}

		// Database Operation 1
		let movieID = null;
		try {
	        const stmt = await db.prepare(`
	            INSERT INTO Movie (title, cover, mime_type, description, maturity_rating, release_date, trailer_link, runtime)
	            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
	        `);

	        const result = await stmt.run(title, cover, mimeType, description, maturityRating, releaseDate, trailerLink, runtime);
			movieID = result.lastID;
			
	        await stmt.finalize();
		}
		catch (error) {
			const message = "Database Error 1";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		// Database Operation 2
		try {
			const stmt = await db.prepare(`
				INSERT INTO Movie_Genre (movie_id, genre_name)
				VALUES (?, ?)
			`);

			for (const genreName of genreNames) {
				await stmt.run(movieID, genreName);
			}

			await stmt.finalize();
		}
		catch (error) {
			const message = "Database Error 2";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		// Everything Successful
		return res.status(200).send("Movie Added & Genres Linked Successfully!");
	}

	catch (error) {
		const message = "Unknown Error";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}

	// Close the Database
	finally { await db.close(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
