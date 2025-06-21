////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import Basic from "../../library/modules/Basic/basic.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { mainScreenContentID } from "../main-screen/main-screen.js";

// Other Screens
import { loadSearchTab } from "../search-tab/search-tab.js";
import { loadBrowseMoviesTab } from "../browse-movies-tab/browse-movies-tab.js";
import { loadMovieScreen } from "../movie-screen/movie-screen.js";
import { loadAddMovieScreen } from "../add-movie-screen/add-movie-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Foreign Screens

import watchLaterPage from "../watch-later-page/watch-later-page.js";
import yourFavoritesPage from "../your-favorites-page/your-favorites-page.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Trinity

const watchLaterPageTrinity = new Basic.Trinity({
	label: "Watch Later Page Trinity",
	directory: "./screens/",
	screenName: "navigation-page"
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Containers

const navigationPageContainer = new Basic.Container({
	id: "navigation-page-container",
	label: "Navigation Page Container"
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const navigationPageFileID = "navigation-page";
export const navigationPageContainerID = "navigation-page-container";

export async function loadNavigationPage() {
	await switchFile(mainScreenContentID, navigationPageFileID);
	initializeNavigationPage();
}

function initializeNavigationPage() {
	navigationPageContainer.setReference(document.getElementById(navigationPageContainer.id));
	const searchTabButton = document.getElementById("search-tab-button");
	const browseMoviesTabButton = document.getElementById("browse-movies-tab-button");
	const watchLaterPageButton = document.getElementById("watch-later-page-button");
	const yourFavoritesPageButton = document.getElementById("your-favorites-page-button");
	const addMovieScreenButton = document.getElementById("add-movie-screen-button");

	searchTabButton.addEventListener("click", async function() {
		try { await loadSearchTab(); }
		catch (error) { console.error("Error switching tabs:", error.message); }
	});

	browseMoviesTabButton.addEventListener("click", async function() {
		try { await loadBrowseMoviesTab(); }
		catch (error) { console.error("Error switching tabs:", error.message); }
	});

	watchLaterPageButton.addEventListener("click", async function() {
		try { navigationPageContainer.load(watchLaterPage); }
		catch (error) { console.error("Error switching tabs:", error.message); }
	});

	yourFavoritesPageButton.addEventListener("click", async function() {
		try { navigationPageContainer.load(yourFavoritesPage); }
		catch (error) { console.error("Error switching tabs:", error.message); }
	});

	addMovieScreenButton.addEventListener("click", async function() {
		try { await loadAddMovieScreen(); }
		catch (error) { console.error("Error switching tabs:", error.message); }
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
