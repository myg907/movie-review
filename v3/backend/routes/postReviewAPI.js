////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import chalk from "chalk";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default async function postReviewAPI(req, res) {
    const db = await openDatabase();

    try {
        const { accountID, movieID, dateMade, reviewRating, content } = req.body;
        if (!accountID || !movieID || !dateMade || !reviewRating || !content ) {
            return res.status(400).send("Missing Review Parameters");
        }


        try {
            await db.run("INSERT INTO Review (accountID, movieID, dateMade, reviewRating, content) VALUES (?, ?, ?, ?, ?)",
                [accountID, movieID, dateMade, reviewRating, content]);
            return res.status(200).send("Successfully Posted Review");
        }
        catch (error) {
            const message = "Error Inserting Data into the Database";
            console.log(chalk.redBright(message)); console.log();
            console.error(error); console.log();
            return res.status(500).send("Server Error");
        }

        return res.status(200).send("Review Posted Successfully");
    }

    catch (error) {
        const message = "Unknown Error";
        console.log(chalk.redBright(message)); console.log();
        console.error(error); console.log();
        return res.status(500).send("Server Error");
    }

    finally {
        await db.close();
    }
}