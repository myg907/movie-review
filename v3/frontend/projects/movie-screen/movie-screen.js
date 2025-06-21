/* The first JavaScript function should be called whenever the tab is loaded. */
/* Update the name of this function using the current format to match the name of your tab when you change it. */
/* You can add more JavaScript for your tab below that function. */

function initializeMovieScreen() {
    class Movie{
        constructor(id, title, description, coverImage, genres, releaseDate, runtime, maturityRating, trailerLink, starRating, starOutput, reviews) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.coverImage = coverImage;
            this.genres = genres;
            this.releaseDate = releaseDate;
            this.runtime = runtime;
            this.maturityRating = maturityRating;
            this.trailerLink = trailerLink;
            this.starRating = starRating;
            this.starOutput = starOutput;
            this.reviews = reviews;

        }
        returnID() {
            let id = this.id;
            document.getElementById(this.returnid()).innerHTML = id;
        }
        returnTitle() {
            return this.title;
        }
        returnDescription() {
            return this.description;
        }
        returnCoverImage() {
            return this.coverImage;
        }
        returnGenres() {
            return this.genres;
        }
        returnReleaseDate() {
            return this.releaseDate;
        }
        returnRuntime() {
            return this.runtime;
        }
        returnMaturityRating() {
            return this.maturityRating;
        }
        returnTrailerLink() {
            return this.trailerLink;
        }
        returnStarRating() {
            let starRating = document.getElementsByClassName("star-rating");
        }
        returnStarOutput() {
            let starOutput = document.getElementsByClassName("star-output");
        }
        returnReviews() {
            return this.reviews;
        }

    }
    const movie  = new Movie(12345, "Jaws", "Horror movie", "picture", "Horror", "10/10/2002", "90min", "Rated R", "https//www.movie.com", "5 Stars", "Reviews");

    var title = document.getElementById("title").innerHTML =this.title;
    var description = document.getElementById("description");
    var coverImage = document.getElementById("coverImage");
    var genres = document.getElementById("genres");
    var releaseDate = document.getElementById("releaseDate");
    var runtime = document.getElementById("runtime");
    var maturityRating = document.getElementById("maturityRating");
    var trailerLink = document.getElementById("trailerLink");

    // This triggers the error message if the initialize screen does not work
    window.addEventListener("load", initializeMovieScreen);{
        const content = document.getElementById("content");
        if (!content) {
            document.getElementById("error-message").classList.remove("hidden");
        }
    }

}

// Star rating update, the elements with the tag i of stars will be stored in a node list
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".stars i");
    stars.forEach((star, index1) => {
        star.addEventListener("click", () => {
            stars.forEach((star, index2) => {
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
            });
        });
    });
});

//Thumbs up/down functions
document.addEventListener("DOMContentLoaded", () => {
    // Select thumbs up and thumbs down buttons
    const thumbUpButton = document.querySelector("#thumbUpCount");
    const thumbDownButton = document.querySelector("#thumbDownCount");

    // Add click event listener for thumbs up button
    thumbUpButton.addEventListener("click", async () => {
        // Check if thumbs up is already selected
        if (thumbUpButton.classList.contains("post-thumb-selected")) {
            return; // Do nothing if already selected
        }

        // Increment thumbs up count and mark as selected
        thumbUpButton.textContent = Number(thumbUpButton.textContent) + 1;
        thumbUpButton.classList.add("post-thumb-selected");

        // Reset thumbs down if selected
        if (thumbDownButton.classList.contains("post-thumb-selected")) {
            thumbDownButton.textContent = Math.max(0, Number(thumbDownButton.textContent) - 1);
            thumbDownButton.classList.remove("post-thumb-selected");
        }

    });

    // Add click event listener for thumbs down button
    thumbDownButton.addEventListener("click", async () => {
        // Check if thumbs down is already selected
        if (thumbDownButton.classList.contains("post-thumb-selected")) {
            return; // Do nothing if already selected
        }

        // Increment thumbs down count and mark as selected
        thumbDownButton.textContent = Number(thumbDownButton.textContent) + 1;
        thumbDownButton.classList.add("post-thumb-selected");

        // Reset thumbs up if selected
        if (thumbUpButton.classList.contains("post-thumb-selected")) {
            thumbUpButton.textContent = Math.max(0, Number(thumbUpButton.textContent) - 1);
            thumbUpButton.classList.remove("post-thumb-selected");
        }

    });
});




