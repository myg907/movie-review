////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class MovieLine {
	static createFragment() {
		const template = document.createElement("template");
		template.innerHTML = `
			<section data-object="movie-line" id="movie-line">
				<div class="content-wrapper">
					<div class="label-container">
						<span class="label" id="movie-line-label"></span>
					</div>
					<div class="movie-cards-container">
						<div class="movie-cards-wrapper" id="movie-cards-wrapper"></div>
					</div>
				</div>
			</section>
		`;
		return template.content.cloneNode(true);
	}

	constructor() {
		this.fragment = MovieLine.createFragment();
		this.label = this.fragment.getElementById("movie-line-label");
		this.movieCardsWrapper = this.fragment.getElementById("movie-cards-wrapper");
	}

	setLabel(label) {
		this.label.textContent = label;
	}

	addMovieCard(movieCardFragment) {
		this.movieCardsWrapper.appendChild(movieCardFragment);
	}

	getFragment() {
		return this.fragment;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
