////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class MovieLine {
	static content = null;

	static initializeContent() {
		const template = document.createElement("template");
		template.innerHTML = `
			<div class="movie-line-container">
				<div class="movie-line-wrapper" id="movie-line-wrapper"></div>
			</div>
		`
		MovieLine.content = template.content.cloneNode(true);
	}

	constructor() {
		if (!MovieLine.content) { MovieLine.initializeContent(); }
		this.content = MovieLine.content.cloneNode(true);
		this.wrapper = this.content.getElementById("movie-line-wrapper");
	}

	push(movieCardFragment) {
		this.wrapper.appendChild(movieCardFragment);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
