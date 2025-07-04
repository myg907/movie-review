////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function genresAPI(req, res) {
	const db = await openDatabase();
	try {
		const genres = await db.all("SELECT * FROM Genre");
		return res.status(200).json(genres);
	} catch (error) {
		const message = "Error Getting Genres";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}
	finally { await db.close(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
