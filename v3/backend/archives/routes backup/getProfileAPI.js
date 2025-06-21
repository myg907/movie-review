
import chalk from "chalk";
import jwt from "jsonwebtoken";
import { secret } from "../server.js";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getProfileDataAPI(req, res) {
    const db = await openDatabase();

    try {
        // Check if user is authenticated
        const token = req.headers["authentication"]?.split(' ')[1];
        if (!token) { return res.status(403).send("Token is Undefined"); }

        let tokenData;
        try { tokenData = jwt.verify(token, secret); }
        catch (error) {
            const message = "Error Decoding Token";
            console.log(chalk.redBright(message)); console.log();
            console.error(error); console.log();
            return res.status(500).send("Server Error");
        }


        const userId = tokenData.id;

        // SQL query to get user data
        const query = 'SELECT account_id as id, username, profile_picture, favorite_genres, watch_later FROM Profile WHERE id = ?';
        const user = await db.get(query, [userId]);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error Fetching User Data:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await db.close();
    }
}