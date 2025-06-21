////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class MovieCardsWrapper {
	static createFragment() {
		const template = document.createElement("template");
		template.innerHTML = `
			<section data-object="movie-cards-wrapper">
				<div class="content-wrapper">
					<div class="label-container">
						<span class="label" id="label"></span>
					</div>
					<div class="movie-cards-wrapper" id="movie-cards-wrapper"></div>
				</div>
			</section>
		`;
		return template.content.cloneNode(true);
	}

	constructor() {
		this.fragment = MovieCardsWrapper.createFragment();
		this.label = this.fragment.getElementById("label");
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
