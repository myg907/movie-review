////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import jwt from "jsonwebtoken";
import { secret } from "../server.js";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function verifyTokenAPI(req, res) {
	try {
		const token = req.headers["authentication"]?.split(' ')[1];
		if (!token) { return res.status(400).send("Token is Undefined"); }
		const decoded = jwt.verify(token, secret);
		res.status(200).send("Token Accepted");
	} catch (error) {
		const message = "Error Verifying Token";
		console.log(chalk.redBright(message)); console.log();
		console.error(error); console.log();
		return res.status(500).send("Server Error");
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
