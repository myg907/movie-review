////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { secret } from "../server.js";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function loginAPI(req, res) {
	const db = await openDatabase();

	try {
		const { email, password } = req.body;
		if (!email || !password) { return res.status(400).send("Credentials Undefined"); }

		let row;
		try {
			row = await db.get("SELECT * FROM Account WHERE email = ?", [email]);
			if (!row) { return res.status(400).send("Invalid Email or Password"); }
		}
		catch (error) {
			const message = "Error Selecting Data from the Database";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		try {
			const isMatch = await bcrypt.compare(password, row.password);
			if (!isMatch) { return res.status(400).send("Invalid Email or Password"); }
		}
		catch (error) {
			const message = "Error Comparing Passwords";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		let token;
		try {
			token = jwt.sign(
				{ id: row.id },
				secret,
				{ expiresIn: "1hr" }
			);
		}
		catch (error) {
			const message = "Error Generating Token";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).send("Server Error");
		}

		return res.status(200).json({ token: token });
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
