
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getUserDataAPI(req, res) {
    const db = await openDatabase();

    try {
        // Check if user is authenticated
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.session.user.id;

        // Corrected SQL query to get user data
        const query = 'SELECT email_address as email, first_name as first, last_name as last, gender, birthday FROM Account WHERE id = ?';
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
