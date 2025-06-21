import chalk from "chalk";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function postCreateAccountAPI(req, res) {
	const db = await openDatabase();

	try {
		const { email, username, password, genres } = req.body;
		console.log("Received data:", req.body);

		// Validate required fields
		if (!email || !username || !password) {
			return res.status(400).json({ message: "Required fields are missing." });
		}

		// Check if email already exists
		const checkEmailQuery = `SELECT * FROM Account WHERE email_address = ?`;
		const existingAccount = await db.get(checkEmailQuery, [email]);

		if (existingAccount) {
			// Email already exists
			return res.status(400).json({ message: "Email already exists" });
		}

		// Check if username already exists
		const checkUsernameQuery = `SELECT * FROM Profile WHERE username = ?`;
		const existingProfile = await db.get(checkUsernameQuery, [username]);

		if (existingProfile) {
			// Username already exists
			return res.status(400).json({ message: "Username already exists" });
		}

		let hashedPassword;
		try { hashedPassword = await bcrypt.hash(password, 10); }
		catch (error) {
			const message = "Error Hashing Password";
			console.log(chalk.redBright(message)); console.log();
			console.error(error); console.log();
			return res.status(500).json({ error: "Server Error" });
		}

		// Insert into Account if email and username do not exist
		const insertAccountQuery = `INSERT INTO Account (email_address, password) VALUES (?, ?)`;
		const { lastID: accountId } = await db.run(insertAccountQuery, [email, hashedPassword]);

		// Insert into Profile
		const favoriteGenres = genres ? genres.join(',') : null;
		const insertProfileQuery = `INSERT INTO Profile (username, account_id, favorite_genres) VALUES (?, ?, ?)`;
		await db.run(insertProfileQuery, [username, accountId, favoriteGenres]);

		return res.status(200).json({ message: "Account created successfully" });

	} catch (error) {
		console.error("Error creating account:", error.message);
		return res.status(500).json({ error: "Internal Server Error" });
	} finally {
		await db.close();
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
