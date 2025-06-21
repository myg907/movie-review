////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { MovieCard } from "../objects/movie-card/movie-card.js";
import { loadMovieScreen } from "../../screens/movie-screen/movie-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function buildMovieCardFragment(data) {
	try {
		const { id, cover, mimeType, title, description, rating } = data;
		const movieCardData = {
			coverSRC: `data:${mimeType};base64,${cover}`,
			title: title,
			description: description,
			rating: rating
		};
		const movieCardFragment = MovieCard.buildFragment(movieCardData);
		const movieCardButton = movieCardFragment.getElementById("content-box");
		movieCardButton.addEventListener("click", async function() {
			await loadMovieScreen(id);
		});
		return movieCardFragment;
	}
	catch (error) {
		console.error("Error Building Movie Card Fragment:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
