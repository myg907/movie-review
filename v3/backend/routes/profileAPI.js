////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import jwt from "jsonwebtoken";
import { secret } from "../server.js";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function profileAPI(req, res) {
	const db = await openDatabase();
	try {
		const token = req.headers["authentication"]?.split(' ')[1];
		if (!token) { return res.status(403).send("Token is Undefined"); }

		let userID;
		try {
			const tokenData = jwt.verify(token, secret);
			userID = tokenData.id;
			if (!userID) { throw new Error("User ID is Undefined"); }
		}
		catch (error) {
			const message = "Error Getting User ID";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		try {
			// SQL query to get user data
			const query = 'SELECT account_id as id, username, profile_picture, favorite_genres, watch_later FROM Profile WHERE id = ?';
			const user = await db.get(query, [userID]);
			return res.status(200).json(user);
		} catch (error) {
			const message = "Error Getting Profile Data";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

	} catch (error) {
		const message = "Unknown Error";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}
	finally { await db.close(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
