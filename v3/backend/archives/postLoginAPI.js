////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

import CryptoJS from 'crypto-js';
import jwt from "jsonwebtoken";
import { secret } from "../server.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function postLoginAPI(req, res) {
	const db = await openDatabase();

	try {
	    const email = req.body.email;
	    const password = CryptoJS.SHA256(req.body.password).toString();

	    // SQL query to check if the user exists
	    const query = 'SELECT * FROM Account WHERE email_address = ? AND password = ?';
	    const user = await db.get(query, [email, password]);

        if (user) {
			req.session.user = {
				id: user.id,
				email: user.email
			}
            // If user is found, login is successful
	        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
			req.session.token = token;
	        return res.status(200).json({ token });
        } else {
            // If user not found, return error
            return res.status(401).json({ message: 'Invalid email or password' });
        }
	}

	catch (error) {
		console.error("Error Fetching Account:", error.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
	
	finally {
    	await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
