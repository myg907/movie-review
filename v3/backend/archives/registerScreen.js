////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";
import bcrypt from "bcrypt";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function register(req, res) {
	const db = await openDatabase();

	try {
		const { email, password } = req.body;
		if (!email || !password) { return res.status(400).send("Email or Password is Undefined"); }

		try {
			const row = await db.get("SELECT * FROM Account WHERE email_address = ?", [email]);
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

		try { await db.run("INSERT INTO Account (email_address, password) VALUES (?, ?)", [email, hashedPassword]); }
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
