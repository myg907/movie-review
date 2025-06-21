////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// I HAVEN'T TESTED THIS SO I DON'T KNOW IF IT WORKS

export default async function linkMovieGenre(req, res) {
	// Open the Database
	const db = await openDatabase();

	try {
		// Get Request Data
		const { movieID, genreName } = req.body;

		// Database Operation
		try {
	        const stmt = await db.prepare(`
	            INSERT INTO Movie_Genre (movie_id, genre_name)
	            VALUES (?, ?)
	        `);

	        await stmt.run(movieID, genreName);
	        await stmt.finalize();

	        return res.status(200).send("Movie & Genre Linked Successfully!");
		}
		catch (error) {
			const message = "Database Error";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}
	}
	catch (error) {
		const message = "Unkown Error";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}

	// Close the Database
	finally { await db.close(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
