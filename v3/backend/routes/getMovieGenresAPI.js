////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function getMovieGenres(req, res) {
	const id = req.params.id;
	const db = await openDatabase();

	try {
		const genres = await db.all(`
			SELECT g.name, g.label
			FROM Genre g
			JOIN Movie_Genre mg ON g.name = mg.genre_name
			WHERE mg.movie_id = ?
		`, [id]);

		return res.status(200).json(genres);
	}
	catch (error) {
		const message = "Error Getting Genres";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}

	finally { await db.close(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
