// Import the SQLite library
// const Database = require('better-sqlite3');
// const db = new Database('movie_database.db');

// Movie class definition
class Movie {
    constructor(id, title, description, coverImage, genres, releaseDate, runtime, maturityRating, trailerLink, starRating, reviews) {
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
        this.reviews = reviews;
    }

    }

    returntitle() {
        return this.title;
    }

    returndescription() {
        return this.description;
    }

    returncoverImage() {
        return this.coverImage;
    }

    returngenres() {
        return this.genres;
    }

    returnreleaseDate() {
        return this.releaseDate;
    }

    returnruntime() {
        return this.runtime;
    }

    returnmaturityRating() {
        return this.maturityRating;
    }

    returntrailerLink() {
        return this.trailerLink;
    }

    returnstarRating() {
        return this.starRating;
    }

    returnreviews() {
        return this.reviews;
    }
}
