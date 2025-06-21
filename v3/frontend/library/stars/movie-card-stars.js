////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class MovieCard {
	static content = null;

	static initializeContent() {
		const template = document.createElement("template");
		template.innerHTML = `
			<section data-object="movie-card" id="movie-card">
				<div class="whole-container">
					<div class="content-box" id="content-box">
						<div class="content-container">
							<div class="star-container">
								<ul id="stars">
									<li>
										<i class="bx bxs-star"></i>
									</li>
									<li>
										<i class="bx bxs-star"></i>
									</li>
									<li>
										<i class="bx bxs-star"></i>
									</li>
									<li>
										<i class="bx bxs-star"></i>
									</li>
									<li>
										<i class="bx bxs-star"></i>
									</li>
								</ul>
							</div>
							<img class="movie-cover" id="movie-cover" loading="lazy">
							<div class="details-box">
								<div class="details-wrapper">
									<p class="movie-title" id="movie-title"></p>
									<p class="movie-description" id="movie-description"></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
		MovieCard.content = template.content.cloneNode(true);
	}

	static build(data) {
		if (!MovieCard.content) { MovieCard.initializeContent(); }

		const content = MovieCard.content.cloneNode(true);
		const movieCard = content.getElementById("movie-card");
		const movieCover = content.getElementById("movie-cover");
		const movieTitle = content.getElementById("movie-title");
		const movieDescription = content.getElementById("movie-description");

		try {
			const { coverSRC, title, description, rating } = data;
			
			if (!coverSRC) { console.warn("No Cover Found... Setting as Empty String"); }
			movieCover.src = coverSRC ? coverSRC : "";

			if (!title) { console.warn("No Title Found... Setting as Empty String"); }
			movieTitle.textContent = title ? title : "";

			if (!description) { console.warn("No Description Found... Setting as Empty String"); }
			movieDescription.textContent = description ? description : "";

			if (!rating) { console.warn("No Ratings Found... Setting as 0"); }
			const starCount = Math.round(rating);
			let activeStarColor = null;
			switch(starCount) {
				case 1: activeStarColor = "rgb(255, 55, 0)"; break;
				case 2: activeStarColor = "rgb(255, 105, 0)"; break;
				case 3: activeStarColor = "rgb(255, 155, 0)"; break;
				case 4: activeStarColor = "rgb(255, 205, 0)"; break;
				case 5: activeStarColor = "rgb(255, 255, 0)"; break;
			}
			// activeStarColor = "rgb(255, 232, 0)";
			movieCard.style.setProperty("--active-star-color", activeStarColor);
			const stars = content.querySelectorAll("#stars > li > i");
			for (let i = 0; i < starCount; i++) {
				stars[i].classList.add("active");
			}
		}

		catch (error) {
			console.error("Error Building Movie Card:", error.message);
			throw error;
		}

		finally {
			return content;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
