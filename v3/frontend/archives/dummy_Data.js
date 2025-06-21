////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMPORTS

import Account from "./classes/Account.js";
import Comment from "./classes/Comment.js";
import Profile from "./classes/Profile.js";
import Review from "./classes/Review.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Testing Data

let accounts = [];
accounts.push(new Account("John", "Doe", 1, "jd@gmail.com", "easy123", [], 22, "2018-09-16", "male"));
accounts.push(new Account("Hawk", "Tuah", 2, "ht@gmail.com", "woah56", [], 24, "1987-02-25", "female"));

let comments = [];
comments.push(new Comment(1, 1, "Jack", "2024-10-02", "the best movie I've ever seen!"));
comments.push(new Comment(2, 2, "Kyle", "2023-06-13", "the worst movie I've ever seen!"));
comments.push(new Comment(3, 1, "Todd", "2024-07-11", "My eyes were closed the whole time..."));
console.log(comments);
comments.forEach(comment => {console.log(comment)});

const profile = new Profile(84124, "slydude321", "picture", "reviews", "liked_reviews", "created_reviews","liked_reviews","favorite_genre","favorite_genre");
console.log(profile);
console.log(profile.account_id);
console.log(profile.username);
console.log(profile.profile_picture);
console.log(profile.created_reviews);
console.log(profile.created_comments);
console.log(profile.liked_reviews);
console.log(profile.liked_comments);
console.log(profile.favorite_genre);

const review = new Review("User:505", "Review:420", "Date:10/01/2024", "Rating: *****", "This is very descriptive!", "Tags", "wow such good", "9", "5","MovieID");
console.log(review);
console.log(review.returnUserID());
console.log(review.returnReviewID());
console.log(review.returnDateMade());
console.log(review.returnReviewRating());
console.log(review.returnReviewContent());
console.log(review.returnTags());
console.log(review.returnComments());
console.log(review.returnLikeRating())
console.log(review.returnMovieID());

/*
const movie = getMovieByTitle("Jaws");
if (movie) {
    console.log(movie);
    console.log(movie.returnid());
    console.log(movie.returntitle());
    console.log(movie.returndescription());
    console.log(movie.returncoverImage());
    console.log(movie.returngenres());
    console.log(movie.returnreleaseDate());
    console.log(movie.returnruntime());
    console.log(movie.returnmaturityRating());
    console.log(movie.returntrailerLink());
    console.log(movie.returnstarRating());
    console.log(movie.returnreviews());
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// EXPORTS

export { accounts, comments, profile, review };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
