////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as currentAccountJS from "../../library/modules/currentAccount.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { navigationPageContainerID } from "../navigation-page/navigation-page.js";

import { loadMovieScreen } from "../movie-screen/movie-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const createReviewTabFileID = "create-review-tab";

export async function loadCreateReviewTab(movie) {
    await switchFile(navigationPageContainerID, createReviewTabFileID);
    await initializeCreateReviewTab(movie);
}

async function initializeCreateReviewTab(movie) {
    // Pull Movie Variables
    const { id: movieID, title: movieTitle} = movie; // You can add any of the other movie variables here as well.
    const currentAccountID = await currentAccountJS.getID(); // This is the current account id

    // Set Title
    const reviewTitle = document.getElementById("review-title");
    reviewTitle.innerText = `Reviewing "${movieTitle}"`;

    // Add Listener for Form Submission
    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", function() {
        handleReviewSubmission(movieID, currentAccountID)
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleReviewSubmission(movieID, currentAccountID) {
    event.preventDefault();

    let movieID_R = movieID;
    console.log("review form submission test");
    /*So this section is the code to pull the text entry fields
    The values_B are used to denote backend values*/
    //Date is in yyyy-mm-dd format
    let DateMade_value = new Date().toISOString().slice(0, 10);
    //gets ReviewRating from rating slider
    let ReviewRating_B = document.getElementById("ReviewRating");
    let ReviewRating_value = ReviewRating_B.value/2;
    //pulls text from content section
    let Content_B = document.getElementById("Content");
    let Content_value = Content_B.value;

    const formData = {
        accountID: currentAccountID,
        movieID: movieID_R,
        dateMade: DateMade_value,
        reviewRating: ReviewRating_value,
        content: Content_value
    }

    try {
        const response = await fetch("/api/postReviewAPI", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData)
        });

        const message = await response.text();
        if (!response.ok) { throw new Error(message); }
        console.log(message);
        alert(message);
        await loadMovieScreen(movieID);
    }
    catch (error) {
        console.error("Error Registering Account:", error.message);
        alert(error.message);
    }
}

/*
        document.getElementById("FullReview").innerHTML = "User ID: " + currentAccountID
            + "\nDate Made: " + DateMade_value
            + "\nStar Rating: " + ReviewRating_value
            + "\nReview Content: " + Content_value
            + "\nMovie ID: " + movieID_R;*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*function reviewTabStuff() {

  Author : Blaise Hefner
  Date : 10/01/2024
  Desc : this is the entity class for each review that is written
          The only alteration to the data provided is combining the likeNum and DislikeNum into a ratio which can be shown

  @param:
  UserID: ID number connecting to a User's profile
  ReviewID: unique ID number for each Review
  DateMade: Record of the Date the Review was made
  ReviewRating: A star rating that is made by other users
  ReviewContent: The written review of a movie
  Tags: additional tags giving more information on the review
  Comments: comments a user makes on a review
  LikeNum: a number of positive likes
  DislikeNum: a number of negative dislikes
  MovieID: Unique ID number relating the review to a movie

  @Returns:
  UserID: returns the ID number connecting to a User's profile
  ReviewID: returns the unique ID number for each Review
  DateMade: returns the record of the Date the Review was made
  ReviewRating: returns the star rating that is made by other users
  ReviewContent: returns the written review of a movie
  Tags: returns the additional tags giving more information on the review
  Comments: returns the comments a user makes on a review
  LikeNum: returns the number of positive likes
  DislikeNum: returns the number of negative dislikes
  MovieID: returns the unique ID number relating the review to a movie


    class Review {
        constructor(UserID, ReviewID, DateMade, ReviewRating, ReviewContent, Tags, Comments, LikeNum, DislikeNum, MovieID) {
            this.UserID = UserID;
            this.ReviewID = ReviewID;
            this.DateMade = DateMade;
            this.ReviewRating = ReviewRating;
            this.ReviewContent = ReviewContent;
            this.Tags = Tags;
            this.Comments = Comments;
            this.LikeRating = LikeNum + ":" + DislikeNum;
            this.MovieID = MovieID;
        }
        returnUserID() {
            return this.UserID;
        }
        returnMovieID() {
            return this.MovieID;
        }
        returnReviewID() {
            return this.ReviewID;
        }
        returnDateMade() {
            return this.DateMade;
        }
        returnReviewRating() {
            return this.ReviewRating;
        }
        returnReviewContent() {
            return this.ReviewContent;
        }
        returnTags() {
            return this.Tags;
        }
        returnComments() {
            return this.Comments;
        }
        returnLikeRating() {
            return this.LikeRating;
        }
        returnFullReview() {
            return "User ID: " + this.UserID
                + "\nReview ID: " + this.ReviewID
                + "\nDate Made: " + this.DateMade
                + "\nStar Rating: " + this.ReviewRating
                + "\nReview Content: " + this.ReviewContent
                + "\nReview Tags: " + this.Tags
                + "\nComments: " + this.Comments
                + "\nLike Ratio: " + this.LikeRating
                + "\nMovie ID: " + this.MovieID;
        }
    }

}*/