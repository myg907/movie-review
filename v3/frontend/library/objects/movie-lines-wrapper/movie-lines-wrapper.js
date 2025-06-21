////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class MovieLinesWrapper {
	static createFragment() {
		const template = document.createElement("template");
		template.innerHTML = `
			<section data-object="movie-lines-wrapper" id="movie-lines-wrapper"></section>
		`;
		return template.content.cloneNode(true);
	}

	constructor() {
		this.fragment = MovieLinesWrapper.createFragment();
		this.movieLinesWrapper = this.fragment.getElementById("movie-lines-wrapper");
	}

	addMovieLine(movieLineFragment) {
		this.movieLinesWrapper.appendChild(movieLineFragment);
	}

	getFragment() {
		return this.fragment;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
