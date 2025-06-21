////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class Comment {
	// Private Fields
	#id;
	#reviewId;
	#profileUsername;
	#dateCreated;
	#textContent;

	// Constructor
	constructor(id, reviewId, profileUsername, dateCreated, textContent) {
		this.#id = id;
		this.#reviewId = reviewId;
		this.#profileUsername = profileUsername;
		this.#dateCreated = dateCreated;
		this.#textContent = textContent;
	}

	// Getter Methods
	get id() {return this.#id;}
	get reviewId() {return this.#reviewId;}
	get profileUsername() {return this.#profileUsername;}
	get dateCreated() {return this.#dateCreated;}
	get textContent() {return this.#textContent;}

	// Setter Methods
	set id(newId) {this.#id = newId;}
	set reviewId(newReviewId) {this.#reviewId = newReviewId;}
	set profileUsername(newProfileUsername) {this.#profileUsername = newProfileUsername;}
	set dateCreated(newdateCreated) {this.#dateCreated = newdateCreated;}
	set textContent(newTextContent) {this.#textContent = newtextContent;}

	// Display Method
    display() {
        console.log(`Comment ID: ${this.id}`);
        console.log(`Review ID: ${this.reviewId}`);
        console.log(`Username: ${this.profileUsername}`);
        console.log(`Date Created: ${this.dateCreated}`);
        console.log(`Text Content: ${this.textContent}`);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
