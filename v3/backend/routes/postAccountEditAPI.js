////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import chalk from "chalk";

import jwt from "jsonwebtoken";
import { secret } from "../server.js";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function postAccountEditAPI(req, res) {
    const db = await openDatabase();

    try {
        const { email,  username, accountID } = req.body;
        if (!email ||  !username) { return res.status(400).send("Credentials Undefined"); }
        const picture = req.file ? req.file.buffer : null;
        const editAccountQuery = `UPDATE Account SET email = ?, username = ?, picture = ? WHERE id = ?; `;

        try {
            await db.run(editAccountQuery, [email,  username, picture, accountID]);
        }
        catch (error) {
            const message = "Error Inserting Data into the Database";
            console.log(chalk.redBright(message)); console.log();
            console.error(error); console.log();
            return res.status(500).send("Server Error");
        }

        return res.status(200).send("Account Edited Successfully");
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

