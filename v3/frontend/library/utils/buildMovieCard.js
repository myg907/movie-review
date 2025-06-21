////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import MovieCard from "../stars/movie-card-stars.js";
import { loadMovieScreen } from "../../screens/movie-screen/movie-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function buildMovieCard(data) {
	try {
		const { id, cover, mimeType, title, description, rating } = data;
		const movieCard = MovieCard.build({
			coverSRC: `data:${mimeType};base64,${cover}`,
			title: title,
			description: description,
			rating: rating,
		});
		const movieCardElement = movieCard.getElementById("content-box");
		movieCardElement.addEventListener("click", async function() {
			await loadMovieScreen(id);
		});
		return movieCard;
	}
	catch (error) {
		console.error("Error Building Movie Card Util:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
