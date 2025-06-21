////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { navigationPageContainerID } from "../navigation-page/navigation-page.js";

// Other Screens


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const addMovieScreenFileID = "add-movie-screen" // Change the names of this variable and the functions below.

export async function loadAddMovieScreen() {
	await switchFile(navigationPageContainerID, addMovieScreenFileID);
	await initializeAddMovieScreen();
}

async function initializeAddMovieScreen() {
	await buildOptionElements();
	const form = document.getElementById("add-movie-form");
	form.addEventListener("submit", handleSubmit);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleSubmit(event) {
	event.preventDefault();

	const formData = new FormData();

	const title = document.getElementById("title").value;
	const cover = document.getElementById("cover").files[0];
	const description = document.getElementById("description").value;
	const maturityRating = document.getElementById("maturity-rating").value;
	const releaseDate = document.getElementById("release-date").value;
	const trailerLink = document.getElementById("trailer-link").value;
	const runtime = document.getElementById("runtime").value;

	let genreNames = [];
	const selectedGenres = document.querySelectorAll('input[name="genres"]:checked');
	for (const selectedGenre of selectedGenres) {
		genreNames.push(selectedGenre.value);
	}

	formData.append("title", title);
	formData.append("cover", cover);
	formData.append("description", description);
	formData.append("maturityRating", maturityRating);
	formData.append("releaseDate", releaseDate);
	formData.append("trailerLink", trailerLink);
	formData.append("runtime", runtime);
	formData.append("genreNames", genreNames);

	try {
		const response = await fetch("/api/movie", {
			method: "POST",
			body: formData
		});

		const message = await response.text();
		if (!response.ok) { throw new Error(message); }
		console.log(message);
		alert(message);
		event.target.reset();
	}
	catch (error) {
		console.error("Error Adding Movie:", error.message);
		alert(error.message);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function buildOptionElements() {
	try {
		// Get Genres
		const genresResponse = await fetch("/api/genres");
		if (!genresResponse.ok) { throw new Error("Error Fetching Genres"); }
		const genres = await genresResponse.json();

		const genresElement = document.getElementById("genres");

		// Loop Through Genres
		for (const genre of genres) {
			// Genre Data
			const { name, label } = genre;
			// Genre Element
			const genreElement = document.createElement("div");
			genreElement.classList.add("genre");
			// Input Element
			const inputElement = document.createElement("input");
			inputElement.id = name;
			inputElement.type = "checkbox";
			inputElement.name = "genres";
			inputElement.value = name;
			// Label Element
			const labelElement = document.createElement("label");
			labelElement.htmlFor = name;
			labelElement.textContent = label;
			// Append Elements
			genreElement.appendChild(inputElement);
			genreElement.appendChild(labelElement);
			genresElement.appendChild(genreElement);
		}
	}
	catch (error) {
		console.error("Error Making Genre Lines:", error.message);
		throw error;
	}
}