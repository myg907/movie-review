/* Author : Blaise Hefner
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

*/
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



/*So this section is the code to pull the text entry fields
The values_B are used to denote backend values
let UserID_B = document.getElementById("UserID") pulls from the specified ID
let UserID_value = UserID_B.value turns the HTML element into the String version*/
function getValue() {
  /* this section of code that goes till next comment break gathers the text entry fields*/
  let UserID_B = document.getElementById("UserID");
  let UserID_value = UserID_B.value;
  let ReviewID_B = document.getElementById("ReviewID");
  let ReviewID_value = ReviewID_B.value;
  let DateMade_B = document.getElementById("DateMade");
  let DateMade_value = DateMade_B.value;
  let ReviewRating_B = document.getElementById("ReviewRating");
  let ReviewRating_value = ReviewRating_B.value/2;
  let Content_B = document.getElementById("Content");
  let Content_value = Content_B.value;
  let Tags_B = document.getElementById("Tags");
  let Tags_value = Tags_B.value;
  let Comments_B = document.getElementById("Comments");
  let Comments_value = Comments_B.value;
  let Likes_B = document.getElementById("Likes");
  let Likes_value = Likes_B.value;
  let Dislikes_B = document.getElementById("Dislikes");
  let Dislikes_value = Dislikes_B.value;
  let MovieID_B = document.getElementById("MovieID");
  let MovieID_value = MovieID_B.value;

  const UserReview = Review(UserID_value, ReviewID_value, DateMade_value, ReviewRating_value, Content_value, Tags_value,
      Comments_value, Likes_value, Dislikes_value, MovieID_value);
  /* this section covers adding the review on the html file*/
  /* currently this only lasts till the page reloads (almost immediately after the alert disappears)*/
  /* This will be changed when the database is finished*/
  document.getElementById("FullReview").innerHTML = UserReview.returnFullReview();
  /*alert("Review Posted! \nThank you for reviewing!")*/
  /* this section is a hold over for debugging uncomment to see a popup with the review information*/

}


/*This section will be updated with the most recent review*/
function InitialReview(){
  let Last_UserID = 1;
  let Last_ReviewID = 1;
  let Last_DateMade = '2024-10-28';
  let Last_ReviewRating = 3.5;
  let Last_ReviewContent = 'This is a test review!';
  let Last_Tags = 'temp';
  let Last_Comments = 'temp';
  let Last_Likes = 30;
  let Last_Dislikes = 50;
  let Last_MovieID = 'Jaws';

  document.getElementById("FullReview").innerHTML = Review(Last_UserID, Last_ReviewID, Last_DateMade,
      Last_ReviewRating, Last_ReviewContent, Last_Tags, Last_Comments, Last_Likes, Last_Dislikes, Last_MovieID);

}
