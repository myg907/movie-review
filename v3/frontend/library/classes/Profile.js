export default class Profile {
    constructor(account_id, username, profile_picture, created_reviews, liked_reviews, created_comments, liked_comments,favorite_genre,watch_later) {
        this.account_id = account_id;
        this.username = username;
        this.profile_picture = profile_picture;
        this.created_reviews = created_reviews;
        this.liked_reviews = liked_reviews;
        this.created_comments = created_comments;
        this.liked_comments = liked_comments;
        this.favorite_genre = favorite_genre;
        this.watch_later = watch_later;

    }
    returnaccount_id(){
        return this.account_id;
    }
    returnusername(){
        return this.username;
    }
    returnprofile_picture(){
        return this.profile_picture;
    }
    returncreated_reviews(){
        return this.created_reviews;
    }
    returnliked_reviews(){
        return this.liked_reviews;
    }
    returncreated_comments(){
        return this.created_comments;
    }
    returnliked_comments(){
        return this.liked_comments;
    }
    returnfavorite_genre(){
        return this.favorite_genre;
    }
    returnwatch_later(){
        return this.watch_later;
    }

}
