////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logStart, logError, logFailure, logSuccess } from "../library/logs.js";

import sqlite3 from "sqlite3";
import { openDatabase } from "../database.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function postWatchLaterMovie(req, res) {
	// Start Message
	logStart("Posting Watch Later Movie...");

	const db = await openDatabase();
	const { accountID, movieID } = req.body;

	try {
		await db.run(`
			INSERT INTO Watch_Later (account_id, movie_id)
			VALUES (?, ?)`,
			[accountID, movieID]
		);

		const message = "Successfully Posted Watch Later Movie";
		logSuccess(message);
		return res.status(200).send(message);
	}
	catch (error) {
		logError(error, "Database Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function postFavoriteMovie(req, res) {
	// Start Message
	logStart("Posting Favorite Movie...");

	const db = await openDatabase();
	const { accountID, movieID } = req.body;

	try {
		await db.run(`
			INSERT INTO Favorite_Movie (account_id, movie_id)
			VALUES (?, ?)
			`, [accountID, movieID]
		);
		const message = "Successfully Posted Favorite Movie";
		logSuccess(message);
		return res.status(200).send(message);
	}
	catch (error) {
		logError(error, "Database Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getFavoriteMovies(req, res) {
	// Start Message
	logStart("Getting Favorite Movies...");

    const accountID = req.params.id;
	const db = await openDatabase();

	try {
		const movies = await db.all(`
			SELECT Movie.*
			FROM Movie
			JOIN Favorite_Movie ON Movie.id = Favorite_Movie.movie_id
			WHERE Favorite_Movie.account_id = ?
			`, [accountID]
		);

		for (const movie of movies) {
			movie.cover = movie.cover.toString('base64');
		}

		logSuccess("Successfully Retrieved Favorite Movies");
		return res.status(200).json(movies);
	}
	catch (error) {
		logError(error, "Server Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getWatchLaterMovies(req, res) {
	// Start Message
	logStart("Getting Watch Later Movies...");

    const accountID = req.params.id;
	const db = await openDatabase();

	try {
		const movies = await db.all(`
			SELECT Movie.*
			FROM Movie
			JOIN Watch_Later ON Movie.id = Watch_Later.movie_id
			WHERE Watch_Later.account_id = ?
			`, [accountID]
		);

		for (const movie of movies) {
			movie.cover = movie.cover.toString('base64');
		}

		logSuccess("Successfully Retrieved Watch Later Movies");
		return res.status(200).json(movies);
	}

	catch (error) {
		logError(error, "Server Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteWatchLaterMovie(req, res) {
	// Start Message
	logStart("Deleting Favorite Movie...");

    const { accountID, movieID } = req.params;
	const db = await openDatabase();

	try {
		await db.run(`
			DELETE FROM Watch_Later
			WHERE account_id = ? AND movie_id = ?
			`, [accountID, movieID]
		);

		const message = "Successfully Deleted Watch Later Movie";
		logSuccess(message);
		return res.status(200).send(message);
	}

	catch (error) {
		logError(error, "Database Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteFavoriteMovie(req, res) {
	// Start Message
	logStart("Deleting Watch Later Movie...");

    const { accountID, movieID } = req.params;
	const db = await openDatabase();

	try {
		await db.run(`
			DELETE FROM Favorite_Movie
			WHERE account_id = ? AND movie_id = ?
			`, [accountID, movieID]
		);

		const message = "Successfully Deleted Favorite Movie";
		logSuccess(message);
		return res.status(200).send(message);
	}

	catch (error) {
		logError(error, "Database Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getFavoriteMovie(req, res) {
	// Start Message
	logStart("Checking Favorite Movie...");

    const { accountID, movieID } = req.params;
	const db = await openDatabase();
	try {
		const row = await db.get(`
			SELECT *
			FROM Favorite_Movie
			WHERE account_id = ? AND movie_id = ?
			`, [accountID, movieID]
		);

		logSuccess("Successfully Checked Favorite Movie");
		if (row) {
			return res.status(200).json({ success: true });
		}
		else {
			return res.status(200).json({ success: false });
		}
	}

	catch (error) {
		logError(error, "Database Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getWatchLaterMovie(req, res) {
	// Start Message
	logStart("Checking Watch Later Movie...");

    const { accountID, movieID } = req.params;
	const db = await openDatabase();
	try {
		const row = await db.get(`
			SELECT *
			FROM Watch_Later
			WHERE account_id = ? AND movie_id = ?
			`, [accountID, movieID]
		);

		logSuccess("Successfully Checked Watch Later Movie");
		if (row) {
			return res.status(200).json({ success: true });
		}
		else {
			return res.status(200).json({ success: false });
		}
	}

	catch (error) {
		logError(error, "Database Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getMoviesByGenre(req, res) {
	// Start Message
	logStart("Getting Movies By Genre...");

	// Get Request Values
	const genreName = req.params.genreName;
	if (!genreName) {
		const message = "Undefined Genre Name"
		logFailure(message);
		return res.status(400).send(message);
	}

	const db = await openDatabase();

	try {
		const movies = await db.all(`
			SELECT Movie.*
			FROM Movie
			JOIN Movie_Genre ON Movie.id = Movie_Genre.movie_id
			WHERE Movie_Genre.genre_name = ?
			`, [genreName]
		);

		for (const movie of movies) {
			movie.cover = movie.cover.toString('base64');
		}

		logSuccess("Successfully Retrieved Movies By Genre");
		return res.status(200).json(movies);
	}

	catch (error) {
		logError(error, "Server Error")
		return res.status(500).send("Server Error");
	}
	finally {
		await db.close();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
