////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import { buildMovieCardFragment } from "../../library/utils/buildMovieCardFragment.js";
import { MovieLine } from "../../library/objects/movie-line/movie-line.js";
import { MovieLinesWrapper } from "../../library/objects/movie-lines-wrapper/movie-lines-wrapper.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { navigationPageContainerID } from "../navigation-page/navigation-page.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const browseMoviesTabFileID = "browse-movies-tab";

export async function loadBrowseMoviesTab() {
	await switchFile(navigationPageContainerID, browseMoviesTabFileID);
	await initializeBrowseMoviesTab();
}

async function initializeBrowseMoviesTab() {
	// Screen Element
	const rootElement = document.getElementById("browse-movies-tab");

	// Movie Lines Wrapper
	const movieLinesWrapper = new MovieLinesWrapper();
	// Append to Live DOM
	rootElement.appendChild(movieLinesWrapper.getFragment());

	// Build All Movies Line
	try {
		const allMoviesLine = await buildAllMoviesLine();
		movieLinesWrapper.addMovieLine(allMoviesLine.getFragment());
	}
	catch (error) {
		console.error("Error Building All Movies Line:", error.message);
		throw error;
	}

	// Build Movie Lines for Each Genre
	try {
		// Fetch Genres
		const genresResponse = await fetch("/api/genres");
		if (!genresResponse.ok) { throw new Error("Error Fetching Genres"); }
		const genres = await genresResponse.json();

		// Iterate Genres
		for (const genre of genres) {
			const genreLine = await buildMovieGenreLine(genre);
			movieLinesWrapper.addMovieLine(genreLine.getFragment());
		}
	}
	catch (error) {
		console.error("Error Making Genre Lines:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function buildAllMoviesLine() {
	try {
		// Movie Line
		const movieLine = new MovieLine();
		movieLine.setLabel("All Movies");

		// Fetch All Movies
		const response = await fetch("/api/movies");
		if (!response.ok) {throw new Error("Network response was not ok");}
		const movies = await response.json();

		// Iterate Movies
		for (const movie of movies) {
			const { id, title, cover, mime_type, description } = movie;

			// Fetch Movie Rating
			const starResponse = await fetch(`/api/getAverageStars/${id}`);
			if (!starResponse.ok) { throw new Error("Error Getting Stars"); }
			const starData = await starResponse.json();
			const averageStars = starData.averageStars;

			// Combine Data
			const movieData = {
				id: id,
				cover: cover,
				mimeType: mime_type,
				title: title,
				description: description,
				rating: averageStars
			};

			// Populate Movie Line
			const movieCardFragment = buildMovieCardFragment(movieData);
			movieLine.addMovieCard(movieCardFragment);
		}
		return movieLine;
	}
	catch (error) {
		console.error("Error Building All Movies:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function buildMovieGenreLine(genre) {
	const { name, label } = genre;
	try {
		// Movie Line
		const movieLine = new MovieLine();
		movieLine.setLabel(label);

		// Fetch Movies by Genre
		const response = await fetch(`/api/movies/genre/${name}`);
		if (!response.ok) {throw new Error("Network response was not ok");}
		const movies = await response.json();

		// Iterate Movies
		for (const movie of movies) {
			const { id, title, cover, mime_type, description } = movie;

			// Fetch Movie Rating
			const starResponse = await fetch(`/api/getAverageStars/${id}`);
			if (!starResponse.ok) { throw new Error("Error Getting Stars"); }
			const starData = await starResponse.json();
			const averageStars = starData.averageStars;

			// Combine Data
			const movieData = {
				id: id,
				cover: cover,
				mimeType: mime_type,
				title: title,
				description: description,
				rating: averageStars
			};

			// Populate Movie Line
			const movieCardFragment = buildMovieCardFragment(movieData);
			movieLine.addMovieCard(movieCardFragment);
		}
		return movieLine;
	}
	catch (error) {
		console.error("Error Building Genre Movies:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
