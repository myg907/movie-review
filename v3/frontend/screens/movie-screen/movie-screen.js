////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as currentAccountJS from "../../library/modules/currentAccount.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { navigationPageContainerID } from "../navigation-page/navigation-page.js";

// Other Screens
import { loadCreateReviewTab } from "../create-review-tab/create-review-tab.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const movieScreenFileID = "movie-screen";
const movieScreenContentID = "movie-screen-content";

export async function loadMovieScreen(movieID) {
    await switchFile(navigationPageContainerID, movieScreenFileID);
    await initializeMovieScreen(movieID);
}

async function initializeMovieScreen(movieID) {
    try {
        // Try to get the movie data
        const response = await fetch(`/api/movie/id/${movieID}`);
        if (!response.ok) {
            throw new Error("Failed to Fetch Movie");
        }
        // Fetch was successful and a movie was found
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes("application/json")) {
            const movie = await response.json();
            await loadMovieFoundScreen(movie);
        }
        // Fetch was successful, but no movie was found
        if (contentType && contentType.includes("text")) {
            console.log("Movie Not Found")
            loadMovieNotFoundScreen();
        }
    }
    catch (error) {
        // There was an error fetching or loading screens
        console.error("Error Getting Movie Data:", error.message);
        throw error;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const movieNotFoundTemplateID = "movie-not-found-template";

function loadMovieNotFoundScreen() { switchTemplate(movieScreenContentID, movieNotFoundTemplateID); }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const movieFoundTemplateID = "movie-found-template";

async function loadMovieFoundScreen(movie) {
    switchTemplate(movieScreenContentID, movieFoundTemplateID);
    await initializeMovieFoundScreen(movie);
}

async function initializeMovieFoundScreen(movie) {
    await displayMovie(movie);
    await displayReviews(movie.id);
    const currentAccountID = await currentAccountJS.getID();
    const movieID = movie.id;
    const favoriteMovieButtonTextElement = document.querySelector("#favorite-movie-button > span");
    const watchLaterButtonTextElement = document.querySelector("#watch-later-button > span");

    const createReviewButton = document.getElementById("create-review-button");
    createReviewButton.addEventListener("click", async function() {
        await loadCreateReviewTab(movie);
    });

    let inFavoriteMovies = await updateFavoriteMovieButton(currentAccountID, movieID, favoriteMovieButtonTextElement);
    const favoriteMovieButton = document.getElementById("favorite-movie-button");
    favoriteMovieButton.addEventListener("click", async function() {
        if (inFavoriteMovies) { await postFavoriteMovie(currentAccountID, movieID); }
        else { await deleteFavoriteMovie(currentAccountID, movieID); }
        inFavoriteMovies = await updateFavoriteMovieButton(currentAccountID, movieID, favoriteMovieButtonTextElement);
    });

    let inWatchLaterMovies = await updateWatchLaterButton(currentAccountID, movieID, watchLaterButtonTextElement);
    const watchLaterButton = document.getElementById("watch-later-button");
    watchLaterButton.addEventListener("click", async function() {
        if (inWatchLaterMovies) { await postWatchLaterMovie(currentAccountID, movieID); }
        else { await deleteWatchLaterMovie(currentAccountID, movieID); }
        inWatchLaterMovies = await updateWatchLaterButton(currentAccountID, movieID, watchLaterButtonTextElement);
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function displayMovie(movie) {
    // Movie Variables
    const { id, title, cover, mime_type, description, maturity_rating, release_date, trailer_link, runtime } = movie;

    // Get Dynamic Elements
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");
    const releaseDateElement = document.getElementById("release-date");
    const runtimeElement = document.getElementById("runtime");
    const maturityRatingElement = document.getElementById("maturity-rating");
    const trailerLinkElement = document.getElementById("trailer-link");

    try {
        const genresResponse = await fetch(`/api/genres/movieID/${id}`);
        if (!genresResponse.ok) { throw new Error("Error Fetching Genres"); }
        const genres = await genresResponse.json();
        buildGenreElements(genres);
    }
    catch (error) {
        console.error("Error Fetching Movie Genres:", error.message);
        throw error;
    }

    // Set Dynamic Element Content
    titleElement.innerText = title;
    descriptionElement.innerText = description;
    releaseDateElement.innerText = release_date;
    maturityRatingElement.innerText = maturity_rating;
    runtimeElement.innerText = runtime;
    trailerLinkElement.href = trailer_link

    // Apply the `src` as a background to a target element using JavaScript
    const targetElement = document.getElementById("details-container");
    targetElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 1) 100%), url("data:${mime_type};base64,${cover}")`;
    targetElement.style.backgroundSize = "cover";
    targetElement.style.backgroundPosition = "center center";
}


function buildGenreElements(genres) {
    const genresElement = document.getElementById("genres");
    for (const genre of genres) {
        const { name, label } = genre;
        const genreElement = document.createElement("li");
        genreElement.classList.add("genre");
        const labelElement = document.createElement("span");
        labelElement.textContent = label;
        genreElement.appendChild(labelElement);
        genresElement.appendChild(genreElement);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function displayReviews(movieID) {
    try {
        const reviewsContainer = document.getElementById("reviews-container");
        const response = await fetch(`/api/getReviews/${movieID}`);
        if (!response.ok) {throw new Error("Network response was not ok");}
        const reviews = await response.json();
        for (const review of reviews) {
            const reviewObject = buildReviewObject(review);
            reviewsContainer.appendChild(reviewObject);
        }
    }
    catch (error) {
        console.error("Error Getting Reviews:", error.message);
        throw error;
    }
}

function buildReviewObject(review) {
    const { accountID, movieID, dateMade, reviewRating, content } = review;

    const li = document.createElement("li");
    li.classList.add("review");

    const div = document.createElement("div");

    const span1 = document.createElement("span");
    span1.textContent = `Account ID: ${accountID}`;
    div.appendChild(span1);
    const span2 = document.createElement("span");
    span2.textContent = `Movie ID: ${movieID}`;
    div.appendChild(span2);
    const span3 = document.createElement("span");
    span3.textContent = `Date Made: ${dateMade}`;
    div.appendChild(span3);
    const span4 = document.createElement("span");
    span4.textContent = `Review Rating: ${reviewRating}`;
    div.appendChild(span4);
    const span5 = document.createElement("span");
    span5.textContent = `Content: ${content}`;
    div.appendChild(span5);

    li.appendChild(div);

    return li;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateFavoriteMovieButton(currentAccountID, movieID, favoriteMovieButtonTextElement) {
    try {
        const response = await fetch(`/api/favoriteMovie/${currentAccountID}/${movieID}`, {
            method: "GET",
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }

        const data = await response.json();

        if (data.success) {
            favoriteMovieButtonTextElement.textContent = "Remove from Favorites";
            return false;
        }
        else {
            favoriteMovieButtonTextElement.textContent = "Add to Favorites";
            return true;
        }
    }
    catch (error) {
        console.error("Error Getting Favorite Movie:", error.message);
        alert(error.message);
    }
}

async function updateWatchLaterButton(currentAccountID, movieID, watchLaterButtonTextElement) {
    try {
        const response = await fetch(`/api/watchLaterMovie/${currentAccountID}/${movieID}`, {
            method: "GET",
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }

        const data = await response.json();

        if (data.success) {
            watchLaterButtonTextElement.textContent = "Remove from Watch Later";
            return false;
        }
        else {
            watchLaterButtonTextElement.textContent = "Add to Watch Later";
            return true;
        }
    }
    catch (error) {
        console.error("Error Getting Watch Later Movie:", error.message);
        alert(error.message);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function postFavoriteMovie(currentAccountID, movieID) {
    try {
        const response = await fetch(`/api/favoriteMovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accountID: currentAccountID,
                movieID: movieID
            })
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }
    }
    catch (error) {
        console.error("Error Posting Favorite Movie:", error.message);
        alert(error.message);
    }
}

async function postWatchLaterMovie(currentAccountID, movieID) {
    try {
        const response = await fetch(`/api/watchLaterMovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accountID: currentAccountID,
                movieID: movieID
            })
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }
    }
    catch (error) {
        console.error("Error Posting Watch Later Movie:", error.message);
        alert(error.message);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function deleteFavoriteMovie(currentAccountID, movieID) {
    try {
        const response = await fetch(`/api/favoriteMovie/${currentAccountID}/${movieID}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }
    }
    catch (error) {
        console.error("Error Deleting Favorite Movie:", error.message);
        alert(error.message);
    }
}

async function deleteWatchLaterMovie(currentAccountID, movieID) {
    try {
        const response = await fetch(`/api/watchLaterMovie/${currentAccountID}/${movieID}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }
    }
    catch (error) {
        console.error("Error Deleting Watch Later Movie:", error.message);
        alert(error.message);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
