    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import chalk from "chalk";
import express from "express";
import multer from "multer";
import path from "path";

import config from "./config/config.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

import genreAPI from "./routes/genreAPI.js";
import loginAPI from "./routes/loginAPI.js";
import registerAPI from "./routes/registerAPI.js";
import verifyTokenAPI from "./routes/verifyTokenAPI.js";
import accountAPI from "./routes/accountAPI.js";
import profileAPI from "./routes/profileAPI.js";
import addMovie from "./routes/addMovieAPI.js";
import linkMovieGenre from "./routes/linkMovieGenreAPI.js";
import getMovieGenres from "./routes/getMovieGenresAPI.js";
import postReviewAPI from "./routes/postReviewAPI.js";
import getReviewsAPI from "./routes/getReviewsAPI.js";

import { getMoviesAPI, logMovies } from './routes/getMoviesAPI.js';
import { getMovieByTitleAPI } from './routes/getMovieByTitleAPI.js';
import { getMovieByIdAPI } from './routes/getMovieByIdAPI.js';
import { getMovieByGenresAPI } from "./routes/getMoviesByGenreAPI.js";
import { postAccountEditAPI } from "./routes/postAccountEditAPI.js";

import getAverageStars from "./routes/getAverageStarsAPI.js";

// Movie Collections (watch later, favorite movies)
import {
	postFavoriteMovie,
	postWatchLaterMovie,
	getFavoriteMovies,
	getWatchLaterMovies,
	deleteFavoriteMovie,
	deleteWatchLaterMovie,
	getFavoriteMovie,
	getWatchLaterMovie
} from "./routes/movieCollectionsAPI.js";

// Movie Genre 2
import { getMoviesByGenre } from "./routes/movieCollectionsAPI.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log();
console.log(chalk.rgb(255, 0, 255)("START server.js LOGS"));
console.log();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Environment Functions

function getPort() {
	let port;
	try {
		port = config.port; // Environment Value
		if (!port) { throw new Error("value is undefined"); }
		if (isNaN(port) || port <= 0 || port > 65535) { throw new Error("value must be a number between 1 and 65535"); }
		console.log(chalk.greenBright("Successfully Defined Port:"), "port has been defined by the environment");
		console.log();
	}
	catch (error) {
		port = 3000; // Default Value
		console.log(`${ chalk.yellow("port was not defined by the environment") } -> ${ chalk.redBright(error.message) } -> ${ chalk.greenBright("a default value has been assigned to port") }\n`);
		console.error(error);
		console.log();
	}
	return port;
}

function getSecret() {
	let secret;
	try {
		secret = config.secret_key; // Envrionment Value
		if (!secret) { throw new Error("value is undefined"); }
		console.log(chalk.greenBright("Successfully Defined Secret:"), "secret has been defined by the environment");
		console.log();
	}
	catch (error) {
		secret = "this1is2a3fallback4secret5key6if7env8isn't9setup0"; // Default Value
		console.log(`${ chalk.yellow("secret was not defined by the environment") } -> ${ chalk.redBright(error.message) } -> ${ chalk.greenBright("a default value has been assigned to secret") }\n`);
		console.error(error);
		console.log();
	}
	return secret;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server Setup

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = getPort();
export const secret = getSecret();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); // Store image in memory (for BLOB storage)
const upload = multer({ storage: storage });

app.use(express.static(join(__dirname, "../frontend")));

app.post("/api/login", loginAPI);
app.post("/api/register", upload.single('picture'), registerAPI);
app.post("/api/verifyToken", verifyTokenAPI);

app.post("/api/movie", upload.single('cover'), addMovie);

app.get("/api/account", accountAPI);
app.get("/api/profile", profileAPI);

app.get("/api/genres", genreAPI);
app.post("/api/linkMovieGenre", linkMovieGenre);
app.get("/api/genres/movieID/:id", getMovieGenres);

app.get('/api/movies', getMoviesAPI);
app.get('/api/movie/id/:id', getMovieByIdAPI);
app.get('/api/movie/title/:title', getMovieByTitleAPI);
app.get("/api/movie/genre/:genres", getMovieByGenresAPI);
app.post('/api/accountEdit', upload.single('picture'), postAccountEditAPI);

app.post('/api/accountEdit', postAccountEditAPI);
// Review
app.post('/api/postReviewAPI', postReviewAPI);
// Movie Collections
app.get("/api/favoriteMovies/:id", getFavoriteMovies);
app.get("/api/watchLaterMovies/:id", getWatchLaterMovies);
app.post("/api/favoriteMovie", postFavoriteMovie);
app.post("/api/watchLaterMovie", postWatchLaterMovie);
app.delete("/api/favoriteMovie/:accountID/:movieID", deleteFavoriteMovie);
app.delete("/api/watchLaterMovie/:accountID/:movieID", deleteWatchLaterMovie);
app.get("/api/favoriteMovie/:accountID/:movieID", getFavoriteMovie);
app.get("/api/watchLaterMovie/:accountID/:movieID", getWatchLaterMovie);

app.get("/api/movies/genre/:genreName", getMoviesByGenre);

app.get("/api/getReviews/:movieID", getReviewsAPI);
app.get("/api/getAverageStars/:movieID", getAverageStars);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server Startup

let server;

server = app.listen(port, () => {
	console.log(chalk.blueBright(`Server Running at http://localhost:${port}/\n`));
});

server.on("error", (listenError) => {
	console.error(chalk.redBright("Failed to Start Server:"), listenError.message);
	console.log();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server Shutdown

let shutdownInProgress = false;

const shutdown = () => {
	if (shutdownInProgress) {
		console.log(chalk.yellow("Server Shutdown In Progess:"), "ignoring SIGINT");
		console.log();
		return;
	}
	if (!server || !server.listening) {
		console.log(chalk.yellow("Server Misreferenced or Not Running:"), "Skipping Server Shutdown");
		console.log();
		process.exit(1);
	}

	shutdownInProgress = true;
	console.log(chalk.blueBright("Server Shutting Down..."));
	console.log();

	server.close(() => {
		// Anything that needs to be closed/stopped (database connection maybe...)
		shutdownInProgress = false;
		console.log(chalk.greenBright("Server Shut Down Gracefully"));
		console.log();
		process.exit(0);
	});
	setTimeout(() => {
		shutdownInProgress = false;
		console.error(chalk.redBright("Server Shut Down Forefully"));
		console.log();
		process.exit(1);
	}, 10000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
