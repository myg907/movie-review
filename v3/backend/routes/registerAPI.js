////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";
import bcrypt from "bcrypt";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function registerAPI(req, res) {
	const db = await openDatabase();

	try {
		const { email, password, username } = req.body;
		if (!email || !password || !username) { return res.status(400).send("Credentials Undefined"); }

		let mimeType = null;
		let picture = null;
		if (req.file) {
			mimeType = req.file.mimetype;
			picture = req.file.buffer;
		}

		try {
			const row = await db.get("SELECT * FROM Account WHERE email = ?", [email]);
			if (row) { return res.status(400).send("Email Already Exists in the Database"); }
		}
		catch (error) {
			const message = "Error Selecting Data from the Database";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		let hashedPassword;
		try { hashedPassword = await bcrypt.hash(password, 10); }
		catch (error) {
			const message = "Error Hashing Password";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		try {
			await db.run("INSERT INTO Account (email, password, username, picture, mime_type) VALUES (?, ?, ?, ?, ?)", [email, hashedPassword, username, picture, mimeType]);
		}
		catch (error) {
			const message = "Error Inserting Data into the Database";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		return res.status(200).send("Account Registered Successfully");
	}
	catch (error) {
		const message = "Unknown Error";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}
	finally { await db.close(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
