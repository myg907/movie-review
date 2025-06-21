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

const watchLaterPageTrinity = new Basic.Trinity({
	label: "Watch Later Page Trinity",
	directory: "./screens/",
	screenName: "watch-later-page"
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Screens

const watchLaterPage = new Basic.Screen({
	id: "watch-later-page",
	label: "Watch Later Page",
	trinity: watchLaterPageTrinity,
	initializer: initializeWatchLaterPage,
	template: new Basic.Template({
		id: "watch-later-page-template",
		label: "Watch Later Page Template"
	})
});

watchLaterPageTrinity.link(watchLaterPage); export default watchLaterPage;

const watchLaterPageLoggedOut = new Basic.Screen({
	id: "watch-later-page-logged-out",
	label: "Watch Later Page Logged Out",
	trinity: watchLaterPageTrinity,
	initializer: initializeWatchLaterPageLoggedOut,
	template: new Basic.Template({
		id: "watch-later-page-logged-out-template",
		label: "Watch Later Page Logged Out Template"
	})
});

watchLaterPageTrinity.link(watchLaterPageLoggedOut);

const watchLaterPageLoggedIn = new Basic.Screen({
	id: "watch-later-page-logged-in",
	label: "Watch Later Page Logged In",
	trinity: watchLaterPageTrinity,
	initializer: initializeWatchLaterPageLoggedIn,
	template: new Basic.Template({
		id: "watch-later-page-logged-in-template",
		label: "Watch Later Page Logged In Template"
	})
});

watchLaterPageTrinity.link(watchLaterPageLoggedIn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Containers

const watchLaterPageTemplateContainer = new Basic.Container({
	id: "watch-later-page-template-container",
	label: "Watch Later Page Template Container"
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeWatchLaterPage(content) {
	try {
		// Set Container Reference
		watchLaterPageTemplateContainer.setReference(content.getElementById(watchLaterPageTemplateContainer.id));
		// Validate Token
		const isValidToken = await tokenJS.verify();
		// Load Appropriate Screen
		if (isValidToken) { watchLaterPageTemplateContainer.load(watchLaterPageLoggedIn); return content; }
		else { watchLaterPageTemplateContainer.load(watchLaterPageLoggedOut); return content; }
	}
	catch (error) {
		console.error("Error Initializing Watch Later Page:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeWatchLaterPageLoggedOut(content) { return content; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function initializeWatchLaterPageLoggedIn(content) {
	try {
		// Screen Element
		const rootElement = content.getElementById("watch-later-page-logged-in");

		// Movie Cards Wrapper
		const movieCardsWrapper = new MovieCardsWrapper();
		movieCardsWrapper.setLabel("Watch Later");
		
		// Append to Live DOM
		rootElement.appendChild(movieCardsWrapper.getFragment());

		// Fetch Movies for Account
		const currentAccountID = await currentAccountJS.getID();
		const response = await fetch(`/api/watchLaterMovies/${currentAccountID}`);
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
