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

		let user;
		try {
			// SQL query to get user data
			const query = 'SELECT id, email, username, picture, mime_type FROM Account WHERE id = ?';
			user = await db.get(query, [userID]);
			if (!userID) { throw new Error("User Data is Undefined"); }
		} catch (error) {
			const message = "Error Getting Profile Data";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		try {
			const picture = user.picture ? user.picture.toString('base64') : null;
			const mimeType = user.picture ? user.mime_type : null;
			return res.status(200).json({
				id: user.id,
				email: user.email,
				username: user.username,
				picture: picture,
				mimeType: mimeType
			});
		} catch(error) {
			const message = "Error Converting Image";
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
