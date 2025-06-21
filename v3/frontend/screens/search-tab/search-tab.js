////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import {loadMovieScreen} from "../movie-screen/movie-screen.js";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { navigationPageContainerID } from "../navigation-page/navigation-page.js";

// Other Screens

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const searchTabFileID = "search-tab";

export async function loadSearchTab() {
	await switchFile(navigationPageContainerID, searchTabFileID);
	initializeSearchTab();
}

function initializeSearchTab() {
	const searchButton = document.getElementById("search-button");
	searchButton.addEventListener("click", async function() {
		await movSearch();
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This funciton is a basic MovSearch function. This relies on the API's built in the backend file.
async function movSearch() {
	const searchType = document.getElementById('search-type').value;
	const query = document.getElementById('movInput').value;
	const resultContainer = document.getElementById('result');
	resultContainer.style.display = 'block';

	if (!query) {
		document.getElementById('movie-details-container').innerHTML = `<p>Nothing entered</p>`;
		throw new Error("Blank Value");
	}

	try {
		let response;
		// Fetching from the correct endpoint based on search type
		if (searchType === 'title') {
			response = await fetch(`/api/movie/title/${encodeURIComponent(query)}`);
		} else if (searchType === 'genre') {
			response = await fetch(`/api/movie/genre/${encodeURIComponent(query)}`);
		}

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const movies = await response.json();
		console.log("Movies data:", movies); // Debugging: Check data format

		let resultHTML = `<h1>Movie(s) Found!:</h1>`;

		if (searchType === 'title') {
			const movie = movies;
			if (movie && movie.id) {
				await loadMovieScreen(movie.id);
			} else {
				throw new Error("Movie ID not found in title search response");
			}
		} else if (searchType === 'genre') {
			// Generate links for each movie in genre search results
			resultHTML += movies.map(movie =>
				`<h2><a href="#" class="movie-link" data-movie-id="${movie.id}">${movie.title}</a></h2>`
			).join('');

			document.getElementById('movie-details-container').innerHTML = resultHTML;

			// Attach click event listeners for each movie link
			document.querySelectorAll(".movie-link").forEach(link => {
				link.addEventListener("click", async (event) => {
					event.preventDefault();
					const movieID = event.target.getAttribute("data-movie-id");
					await loadMovieScreen(movieID);
				});
			});
		}

	} catch (error) {
		console.error("Error Fetching Movie:", error.message);
		document.getElementById('movie-details-container').innerHTML = `<p>Movie not found. Please try again.</p>`;
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
