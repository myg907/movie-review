////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// My Modules

import Basic from "../../library/modules/Basic/basic.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import * as currentAccountJS from "../../library/modules/currentAccount.js";
import { buildMovieCardFragment } from "../../library/utils/buildMovieCardFragment.js";
import { MovieCardsWrapper } from "../../library/objects/movie-cards-wrapper/movie-cards-wrapper.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Foreign Screens

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Trinity

const yourFavoritesPageTrinity = new Basic.Trinity({
	label: "Your Favorites Page Trinity",
	directory: "./screens/",
	screenName: "your-favorites-page"
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Screens

const yourFavoritesPage = new Basic.Screen({
	id: "your-favorites-page",
	label: "Your Favorites Page",
	trinity: yourFavoritesPageTrinity,
	initializer: initializeYourFavoritesPage,
	template: new Basic.Template({
		id: "your-favorites-page-template",
		label: "Your Favorites Page Template"
	})
});

yourFavoritesPageTrinity.link(yourFavoritesPage); export default yourFavoritesPage;

const yourFavoritesPageLoggedOut = new Basic.Screen({
	id: "your-favorites-page-logged-out",
	label: "Your Favorites Page Logged Out",
	trinity: yourFavoritesPageTrinity,
	initializer: initializeYourFavoritesPageLoggedOut,
	template: new Basic.Template({
		id: "your-favorites-page-logged-out-template",
		label: "Your Favorites Page Logged Out Template"
	})
});

yourFavoritesPageTrinity.link(yourFavoritesPageLoggedOut);

const yourFavoritesPageLoggedIn = new Basic.Screen({
	id: "your-favorites-page-logged-in",
	label: "Your Favorites Page Logged In",
	trinity: yourFavoritesPageTrinity,
	initializer: initializeYourFavoritesPageLoggedIn,
	template: new Basic.Template({
		id: "your-favorites-page-logged-in-template",
		label: "Your Favorites Page Logged In Template"
	})
});

yourFavoritesPageTrinity.link(yourFavoritesPageLoggedIn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Containers

const yourFavoritesPageTemplateContainer = new Basic.Container({
	id: "your-favorites-page-template-container",
	label: "Your Favorites Page Template Container"
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeYourFavoritesPage(content) {
	try {
		// Set Container Reference
		yourFavoritesPageTemplateContainer.setReference(content.getElementById(yourFavoritesPageTemplateContainer.id));
		// Validate Token
		const isValidToken = await tokenJS.verify();
		// Load Appropriate Screen
		if (isValidToken) { yourFavoritesPageTemplateContainer.load(yourFavoritesPageLoggedIn); return content; }
		else { yourFavoritesPageTemplateContainer.load(yourFavoritesPageLoggedOut); return content; }
	}
	catch (error) {
		console.error("Error Initializing Your Favorites Page:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeYourFavoritesPageLoggedOut(content) { return content; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeYourFavoritesPageLoggedIn(content) {
	try {
		// Screen Element
		const rootElement = content.getElementById("your-favorites-page-logged-in");

		// Movie Cards Wrapper
		const movieCardsWrapper = new MovieCardsWrapper();
		movieCardsWrapper.setLabel("Your Favorites");
		
		// Append to Live DOM
		rootElement.appendChild(movieCardsWrapper.getFragment());

		// Fetch Movies for Account
		const currentAccountID = await currentAccountJS.getID();
		const response = await fetch(`/api/favoriteMovies/${currentAccountID}`);
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

			// Populate Movie Cards Wrapper
			const movieCardFragment = buildMovieCardFragment(movieData);
			movieCardsWrapper.addMovieCard(movieCardFragment);
		}
	}
	catch (error) {
		console.error("Error Making Genre Lines:", error.message);
		throw error;
	}

	// Return Content
	return content;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
