// VErsion 3
document.addEventListener("DOMContentLoaded", function () {
	// Filter for homepage
	function filterList() {
		const input = document.getElementById("search");
		const filterValue = input.value.toUpperCase();
		const ul = document.getElementById("menu");
		const li = ul.getElementsByTagName("li");

		for (let i = 0; i < li.length; i++) {
			const a = li[i].getElementsByTagName("a")[0];
			if (a && a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	}

	// Movies class for creating movie cards
	class Movies {
		constructor(id, title, description, image, year, genre, rating) {
			this.id = id;
			this.title = title;
			this.description = description;
			this.image = image;
			this.year = year;
			this.genre = genre;
			this.rating = rating;
		}

		createCard(isWatchlist = false) {
			const card = document.createElement("div");
			card.className = `card movieCard mx-auto`;
			const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
			const isInWatchlist = watchlist.some((item) => item.id === this.id);

			card.innerHTML = `
        <img src="${this.image}" class="card-img-top" alt="${
				this.title
			} Poster">
        <div class="cardTextBackground"></div>
        <div class="card-body">
          <h5 class="card-title montserrat-h2">${this.title}</h5>
          <p class="card-text roboto-p">${
						this.description
							? this.description.substring(0, 60) +
							  (this.description.length > 60 ? "..." : "")
							: "No description available."
					}</p>
          <div class="movieCardButtons">
            ${
							isWatchlist
								? `<button class="btn removeBtn roboto-p" data-id="${this.id}">Remove</button>`
								: `<a href="#" class="btn btn-primary roboto-p ${
										isInWatchlist ? "disabled" : ""
								  }">${isInWatchlist ? "Added" : "Add to Watchlist"}</a>`
						}
            <a href="../pages/(d)individualMoviePage.html?id=${
							this.id
						}" class="btn btn-primary viewDetailsBtn roboto-p" data-id="${
				this.id
			}">View Details</a>
          </div>
        </div>
      `;

			// Add event listener for watchlist actions
			card.addEventListener("click", (e) => {
				if (e.target.classList.contains("btn-primary") && !isWatchlist) {
					e.preventDefault();
					addToWatchlist(this);
					e.target.textContent = "Added";
					e.target.classList.add("disabled");
				} else if (e.target.classList.contains("removeBtn")) {
					e.preventDefault();
					let updatedWatchlist =
						JSON.parse(localStorage.getItem("watchlist")) || [];
					updatedWatchlist = updatedWatchlist.filter(
						(item) => item.id !== this.id
					);
					localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
					card.closest(".col-md-3").remove();
					if (updatedWatchlist.length === 0) {
						const watchlistContainer =
							document.getElementById("watchlistContainer");
						watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
					}
				}
			});

			// For watchlist, return the card wrapped in col-md-3; for others, return just the card
			if (isWatchlist) {
				const col = document.createElement("div");
				col.className = "col-md-3";
				col.appendChild(card);
				return col;
			}
			return card;
		}
	}

	// API configuration
	const API_OPTIONS = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	// Initialize movie list for Action filter
	let movielist = [];

	!(async function () {
		try {
			// Fetch popular movies
			const popularData = await fetch(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
				API_OPTIONS
			).then((response) => {
				if (!response.ok)
					throw new Error(`Could not fetch popular movies: ${response.status}`);
				return response.json();
			});

			// Fetch genres
			const genredata = await fetch(
				`https://api.themoviedb.org/3/genre/movie/list?language=en`,
				API_OPTIONS
			).then((response) => {
				if (!response.ok)
					throw new Error(`Could not fetch genres: ${response.status}`);
				return response.json();
			});

			// Populate movielist for Action filter
			movielist = popularData.results.map((movie) => {
				let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				let id = movie.id;
				let title = movie.title;
				let description = movie.overview;
				let year = movie.release_date?.split("-")[0] || "N/A";
				let genreid = movie.genre_ids[0];
				let genrename =
					genredata.genres.find((g) => g.id === genreid)?.name || "";
				let rating = movie.vote_average;

				return new Movies(
					id,
					title,
					description,
					image,
					year,
					genrename,
					rating
				);
			});

			// Render Top Rated section
			const topRatedContainer = document.querySelector(".topRated .row");
			if (topRatedContainer) {
				const topRatedData = await fetch(
					`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
					API_OPTIONS
				).then((response) => {
					if (!response.ok)
						throw new Error(
							`Could not fetch top rated movies: ${response.status}`
						);
					return response.json();
				});

				topRatedContainer.innerHTML = "";
				topRatedData.results.slice(0, 4).forEach((movie) => {
					let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
					let id = movie.id;
					let title = movie.title;
					let description = movie.overview;
					let year = movie.release_date?.split("-")[0] || "N/A";
					let genreid = movie.genre_ids[0];
					let genrename =
						genredata.genres.find((g) => g.id === genreid)?.name || "";
					let rating = movie.vote_average;

					const movieObj = new Movies(
						id,
						title,
						description,
						image,
						year,
						genrename,
						rating
					);
					const col = document.createElement("div");
					col.className = "col-md-3";
					col.appendChild(movieObj.createCard());
					topRatedContainer.appendChild(col);
				});
			}

			// Render Popular section
			const popularContainer = document.querySelector(".newReleases .row");
			if (popularContainer) {
				popularContainer.innerHTML = "";
				popularData.results.slice(0, 4).forEach((movie) => {
					let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
					let id = movie.id;
					let title = movie.title;
					let description = movie.overview;
					let year = movie.release_date?.split("-")[0] || "N/A";
					let genreid = movie.genre_ids[0];
					let genrename =
						genredata.genres.find((g) => g.id === genreid)?.name || "";
					let rating = movie.vote_average;

					const movieObj = new Movies(
						id,
						title,
						description,
						image,
						year,
						genrename,
						rating
					);
					const col = document.createElement("div");
					col.className = "col-md-3";
					const card = movieObj.createCard();
					card.className = "card movieCardPopular mx-auto";
					col.appendChild(card);
					popularContainer.appendChild(col);
				});
			}
		} catch (err) {
			console.error("Error initializing movie list:", err);
		}
	})();

	// Handle movie details page
	const urlParams = new URLSearchParams(window.location.search);
	const movieId = urlParams.get("id");

	if (
		movieId &&
		window.location.pathname.includes("individualMoviePage.html")
	) {
		getMovieDetails();
	} else {
		console.warn(
			"No movieId found or not on movie details page. Skipping getMovieDetails."
		);
	}

	async function getMovieDetails() {
		if (!window.location.pathname.includes("individualMoviePage.html")) {
			console.warn("getMovieDetails called on non-movie page. Skipping.");
			return;
		}

		if (!movieId) {
			console.error("No movieId provided in URL.");
			return;
		}

		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
				API_OPTIONS
			);
			if (!response.ok) {
				throw new Error(`Could not fetch movie details: ${response.status}`);
			}
			const movie = await response.json();

			const elements = {
				title: document.getElementById("movieTitle"),
				image: document.getElementById("movieImage"),
				rating: document.getElementById("movieRating"),
				description: document.getElementById("movieDescription"),
				genre: document.getElementById("movieGenre"),
				year: document.getElementById("movieYear"),
				backdrop: document.querySelector(".movie-backdrop"),
			};

			if (
				!elements.title ||
				!elements.image ||
				!elements.rating ||
				!elements.description ||
				!elements.genre ||
				!elements.year
			) {
				console.error("One or more DOM elements not found for movie details.");
				return;
			}

			elements.title.textContent = movie.title;
			elements.image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
			elements.rating.textContent = `Rating: ${movie.vote_average}`;
			elements.description.textContent = movie.overview;
			elements.genre.textContent = movie.genres.map((g) => g.name).join(", ");
			elements.year.textContent = movie.release_date?.split("-")[0] || "N/A";

			if (elements.backdrop && movie.backdrop_path) {
				elements.backdrop.style.backgroundImage = `ur[](https://image.tmdb.org/t/p/original${movie.backdrop_path})`; // Fixed typo: 'ur[]' to 'url'
			}
		} catch (err) {
			console.error("Error fetching movie details:", err);
			const errorContainer =
				document.getElementById("movieDescription") ||
				document.createElement("p");
			errorContainer.textContent =
				"Failed to load movie details. Please try again later.";
		}
	}

	function addToWatchlist(movie) {
		let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
		const exists = watchlist.some((item) => item.id === movie.id);
		if (!exists) {
			// Store plain object to avoid ???serializing??? class methods apparently
			watchlist.push({
				id: movie.id,
				title: movie.title,
				description: movie.description,
				image: movie.image,
				year: movie.year,
				genre: movie.genre,
				rating: movie.rating,
			});
			localStorage.setItem("watchlist", JSON.stringify(watchlist));
			alert(`Added "${movie.title}" to watchlist!`);
		} else {
			alert(`${movie.title} is already in your watchlist.`);
		}
		console.log("Current Watchlist:", watchlist);
	}

	// Render watchlist stuffs
	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
	const watchlistContainer = document.getElementById("watchlistContainer");

	if (watchlistContainer) {
		if (watchlist.length === 0) {
			watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
		} else {
			watchlistContainer.innerHTML = "";
			const row = document.createElement("div");
			row.className = "row";
			watchlist.forEach((movie) => {
				// make plain object a Movies instance....
				const movieObj = new Movies(
					movie.id,
					movie.title,
					movie.description,
					movie.image,
					movie.year,
					movie.genre,
					movie.rating
				);
				row.appendChild(movieObj.createCard(true));
			});
			watchlistContainer.appendChild(row);
		}
	}

	// Filter by Action genre
	document.getElementById("filterActionBtn")?.addEventListener("click", () => {
		const filteredMovies = movielist.filter(
			(movie) => movie.genre === "Action"
		);
		document
			.querySelectorAll(".movie-section .row, .movie-sectiond .row")
			.forEach((row) => row.remove());

		filteredMovies.forEach((movie) => {
			const containerId = `movieCards_${movie.genre}`;
			const container = document.getElementById(containerId);
			if (container) {
				const row = document.createElement("div");
				row.className = "row";
				const col = document.createElement("div");
				col.className = "col-md-3";
				col.appendChild(movie.createCard());
				row.appendChild(col);
				container.appendChild(row);
			}
		});
	});

	// Genre IDs for fetching movies by genre
	const genreMap = {
		Horror: 27,
		Action: 28,
		Crime: 80,
		Animation: 16,
		"Science Fiction": 878,
		Western: 37,
		Drama: 18,
		Family: 10751, // not fecthing for some reason...
	};

	// Fetch movies for each genre
	async function loadMoviesByGenre() {
		for (const [genreName, genreId] of Object.entries(genreMap)) {
			const container = document.getElementById(`movieCards_${genreName}`);
			if (!container) continue;

			try {
				const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`;
				const response = await fetch(url, API_OPTIONS);
				if (!response.ok)
					throw new Error(
						`Could not fetch ${genreName} movies: ${response.status}`
					);
				const data = await response.json();

				if (!data.results || data.results.length === 0) {
					container.innerHTML = `<p class="text-muted">No movies found for ${genreName}.</p>`;
					continue;
				}

				const row = document.createElement("div");
				row.className = "row";
				data.results.slice(0, 4).forEach((movie) => {
					const movieObj = new Movies(
						movie.id,
						movie.title,
						movie.overview,
						`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
						movie.release_date?.split("-")[0] || "N/A",
						genreName,
						movie.vote_average
					);
					const col = document.createElement("div");
					col.className = "col-md-3";
					col.appendChild(movieObj.createCard());
					row.appendChild(col);
				});
				container.innerHTML = "";
				container.appendChild(row);
			} catch (error) {
				console.error(`Error loading ${genreName} movies:`, error);
				container.innerHTML = `<p class="text-danger">Failed to load ${genreName} movies.</p>`;
			}
		}
	}

	// Run only on movie library page
	if (window.location.pathname.includes("(c)movieLibraryPage.html")) {
		loadMoviesByGenre();
	}

	// Expose filterList to global scope if needed
	window.filterList = filterList;
});

// Version 2
// document.addEventListener("DOMContentLoaded", function () {
// 	// Filter for homepage
// 	function filterList() {
// 		const input = document.getElementById("search");
// 		const filterValue = input.value.toUpperCase();
// 		const ul = document.getElementById("menu");
// 		const li = ul.getElementsByTagName("li");

// 		for (let i = 0; i < li.length; i++) {
// 			const a = li[i].getElementsByTagName("a")[0];
// 			if (a && a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
// 				li[i].style.display = "";
// 			} else {
// 				li[i].style.display = "none";
// 			}
// 		}
// 	}

// 	// Movies class for creating movie cards
// 	class Movies {
// 		constructor(id, title, description, image, year, genre, rating) {
// 			this.id = id;
// 			this.title = title;
// 			this.description = description;
// 			this.image = image;
// 			this.year = year;
// 			this.genre = genre;
// 			this.rating = rating;
// 		}

// 		createCard(isWatchlist = false) {
// 			const card = document.createElement("div");
// 			card.className = `card movieCard mx-auto`;
// 			const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 			const isInWatchlist = watchlist.some((item) => item.id === this.id);

// 			card.innerHTML = `
// 				<img src="${this.image}" class="card-img-top" alt="${this.title} Poster">
// 				<div class="cardTextBackground"></div>
// 				<div class="card-body">
// 					<h5 class="card-title montserrat-h2">${this.title}</h5>
// 					<p class="card-text roboto-p">${
// 						this.description
// 							? this.description.substring(0, 60) +
// 							  (this.description.length > 60 ? "..." : "")
// 							: "No description available."
// 					}</p>
// 					<div class="movieCardButtons">
// 					${
// 						isWatchlist
// 							? `<button class="btn removeBtn roboto-p" data-id="${this.id}">Remove</button>`
// 							: `<a href="#" class="btn btn-primary roboto-p ${
// 									isInWatchlist ? "disabled" : ""
// 							  }">${isInWatchlist ? "Added" : "Add to Watchlist"}</a>`
// 					}
// 					<a href="../pages/(d)individualMoviePage.html?id=${
// 						this.id
// 					}" class="btn btn-primary viewDetailsBtn roboto-p" data-id="${
// 				this.id
// 			}">View Details</a>
// 					</div>
// 				</div>
// 			`;

// 			// Add event listener for watchlist actions
// 			card.addEventListener("click", (e) => {
// 				if (e.target.classList.contains("btn-primary") && !isWatchlist) {
// 					e.preventDefault();
// 					addToWatchlist(this);
// 					e.target.textContent = "Added";
// 					e.target.classList.add("disabled");
// 				} else if (e.target.classList.contains("removeBtn")) {
// 					e.preventDefault();
// 					let updatedWatchlist =
// 						JSON.parse(localStorage.getItem("watchlist")) || [];
// 					updatedWatchlist = updatedWatchlist.filter(
// 						(item) => item.id !== this.id
// 					);
// 					localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
// 					// Remove the parent col-md-3 div
// 					card.closest(".col-md-3").remove();
// 					if (updatedWatchlist.length === 0) {
// 						const watchlistContainer =
// 							document.getElementById("watchlistContainer");
// 						watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 					}
// 				}
// 			});

// 			// For watchlist, return the card wrapped in col-md-3; for others, return just the card
// 			if (isWatchlist) {
// 				const col = document.createElement("div");
// 				col.className = "col-md-3";
// 				col.appendChild(card);
// 				return col;
// 			}
// 			return card;
// 		}
// 	}

// 	// API configuration
// 	const API_OPTIONS = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization:
// 				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// 		},
// 	};

// 	// Initialize movie list
// 	let movielist = [];

// 	!(async function () {
// 		try {
// 			// Fetch popular movies
// 			const popularData = await fetch(
// 				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
// 				API_OPTIONS
// 			).then((response) => {
// 				if (!response.ok)
// 					throw new Error(`Could not fetch popular movies: ${response.status}`);
// 				return response.json();
// 			});

// 			// Fetch top rated movies
// 			const topRatedData = await fetch(
// 				`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
// 				API_OPTIONS
// 			).then((response) => {
// 				if (!response.ok)
// 					throw new Error(
// 						`Could not fetch top rated movies: ${response.status}`
// 					);
// 				return response.json();
// 			});

// 			// Fetch genres
// 			const genredata = await fetch(
// 				`https://api.themoviedb.org/3/genre/movie/list?language=en`,
// 				API_OPTIONS
// 			).then((response) => {
// 				if (!response.ok)
// 					throw new Error(`Could not fetch genres: ${response.status}`);
// 				return response.json();
// 			});

// 			// Populate movielist with popular movies
// 			movielist = popularData.results.map((movie) => {
// 				let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 				let id = movie.id;
// 				let title = movie.title;
// 				let description = movie.overview;
// 				let year = movie.release_date?.split("-")[0] || "N/A";
// 				let genreid = movie.genre_ids[0];
// 				let genrename =
// 					genredata.genres.find((g) => g.id === genreid)?.name || "";
// 				let rating = movie.vote_average;

// 				return new Movies(
// 					id,
// 					title,
// 					description,
// 					image,
// 					year,
// 					genrename,
// 					rating
// 				);
// 			});

// 			// Render Top Rated section (if present)
// 			const topRatedContainer = document.querySelector(".topRated .row");
// 			if (topRatedContainer) {
// 				topRatedContainer.innerHTML = "";
// 				topRatedData.results.slice(0, 4).forEach((movie) => {
// 					let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 					let id = movie.id;
// 					let title = movie.title;
// 					let description = movie.overview;
// 					let year = movie.release_date?.split("-")[0] || "N/A";
// 					let genreid = movie.genre_ids[0];
// 					let genrename =
// 						genredata.genres.find((g) => g.id === genreid)?.name || "";
// 					let rating = movie.vote_average;

// 					const movieObj = new Movies(
// 						id,
// 						title,
// 						description,
// 						image,
// 						year,
// 						genrename,
// 						rating
// 					);
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					col.appendChild(movieObj.createCard());
// 					topRatedContainer.appendChild(col);
// 				});
// 			}

// 			// Render Popular section (if present)
// 			const popularContainer = document.querySelector(".newReleases .row");
// 			if (popularContainer) {
// 				popularContainer.innerHTML = "";
// 				popularData.results.slice(0, 4).forEach((movie) => {
// 					let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 					let id = movie.id;
// 					let title = movie.title;
// 					let description = movie.overview;
// 					let year = movie.release_date?.split("-")[0] || "N/A";
// 					let genreid = movie.genre_ids[0];
// 					let genrename =
// 						genredata.genres.find((g) => g.id === genreid)?.name || "";
// 					let rating = movie.vote_average;

// 					const movieObj = new Movies(
// 						id,
// 						title,
// 						description,
// 						image,
// 						year,
// 						genrename,
// 						rating
// 					);
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					const card = movieObj.createCard();
// 					card.className = "card movieCardPopular mx-auto"; // Use movieCardPopular for Popular section
// 					col.appendChild(card);
// 					popularContainer.appendChild(col);
// 				});
// 			}

// 			// Render genre-specific cards (existing logic)
// 			movielist.forEach((Movie) => {
// 				const containerId = `movieCards_${Movie.genre}`;
// 				const container = document.getElementById(containerId);
// 				if (container) {
// 					const row = document.createElement("div");
// 					row.className = "row";
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					col.appendChild(Movie.createCard());
// 					row.appendChild(col);
// 					container.appendChild(row);
// 				}
// 			});
// 		} catch (err) {
// 			console.error("Error initializing movie list:", err);
// 		}
// 	})();

// 	// Handle movie details page
// 	const urlParams = new URLSearchParams(window.location.search);
// 	const movieId = urlParams.get("id");

// 	if (
// 		movieId &&
// 		window.location.pathname.includes("individualMoviePage.html")
// 	) {
// 		getMovieDetails();
// 	} else {
// 		console.warn(
// 			"No movieId found or not on movie details page. Skipping getMovieDetails."
// 		);
// 	}

// 	async function getMovieDetails() {
// 		if (!window.location.pathname.includes("individualMoviePage.html")) {
// 			console.warn("getMovieDetails called on non-movie page. Skipping.");
// 			return;
// 		}

// 		if (!movieId) {
// 			console.error("No movieId provided in URL.");
// 			return;
// 		}

// 		try {
// 			const response = await fetch(
// 				`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
// 				API_OPTIONS
// 			);
// 			if (!response.ok) {
// 				throw new Error(`Could not fetch movie details: ${response.status}`);
// 			}
// 			const movie = await response.json();

// 			const elements = {
// 				title: document.getElementById("movieTitle"),
// 				image: document.getElementById("movieImage"),
// 				rating: document.getElementById("movieRating"),
// 				description: document.getElementById("movieDescription"),
// 				genre: document.getElementById("movieGenre"),
// 				year: document.getElementById("movieYear"),
// 				backdrop: document.querySelector(".movie-backdrop"),
// 			};

// 			if (
// 				!elements.title ||
// 				!elements.image ||
// 				!elements.rating ||
// 				!elements.description ||
// 				!elements.genre ||
// 				!elements.year
// 			) {
// 				console.error("One or more DOM elements not found for movie details.");
// 				return;
// 			}

// 			elements.title.textContent = movie.title;
// 			elements.image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 			elements.rating.textContent = `Rating: ${movie.vote_average}`;
// 			elements.description.textContent = movie.overview;
// 			elements.genre.textContent = movie.genres.map((g) => g.name).join(", ");
// 			elements.year.textContent = movie.release_date?.split("-")[0] || "N/A";

// 			if (elements.backdrop && movie.backdrop_path) {
// 				elements.backdrop.style.backgroundImage = `ur[](https://image.tmdb.org/t/p/original${movie.backdrop_path})`; // Fixed typo: 'ur[]' to 'url'
// 			}
// 		} catch (err) {
// 			console.error("Error fetching movie details:", err);
// 			const errorContainer =
// 				document.getElementById("movieDescription") ||
// 				document.createElement("p");
// 			errorContainer.textContent =
// 				"Failed to load movie details. Please try again later.";
// 		}
// 	}

// 	function addToWatchlist(movie) {
// 		let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 		const exists = watchlist.some((item) => item.id === movie.id);
// 		if (!exists) {
// 			watchlist.push(movie);
// 			localStorage.setItem("watchlist", JSON.stringify(watchlist));
// 			alert(`Added "${movie.title}" to watchlist!`);
// 		} else {
// 			alert(`${movie.title} is already in your watchlist.`);
// 		}
// 		console.log("Current Watchlist:", watchlist);
// 	}

// 	// Render watchlist
// 	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 	const watchlistContainer = document.getElementById("watchlistContainer");

// 	if (watchlistContainer) {
// 		if (watchlist.length === 0) {
// 			watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 		} else {
// 			watchlistContainer.innerHTML = "";
// 			const row = document.createElement("div");
// 			row.className = "row";
// 			watchlist.forEach((movie) => {
// 				row.appendChild(movie.createCard(true));
// 			});
// 			watchlistContainer.appendChild(row);
// 		}
// 	}

// 	// Filter by Action genre
// 	document.getElementById("filterActionBtn")?.addEventListener("click", () => {
// 		const filteredMovies = movielist.filter(
// 			(movie) => movie.genre === "Action"
// 		);
// 		document
// 			.querySelectorAll(".movie-section .row, .movie-sectiond .row")
// 			.forEach((row) => row.remove());

// 		filteredMovies.forEach((Movie) => {
// 			const containerId = `movieCards_${Movie.genre}`;
// 			const container = document.getElementById(containerId);
// 			if (container) {
// 				const row = document.createElement("div");
// 				row.className = "row";
// 				const col = document.createElement("div");
// 				col.className = "col-md-3";
// 				col.appendChild(Movie.createCard());
// 				row.appendChild(col);
// 				container.appendChild(row);
// 			}
// 		});
// 	});

// 	// Genre IDs for fetching movies by genre
// 	const genreMap = {
// 		Horror: 27,
// 		Action: 28,
// 		Crime: 80,
// 		Animation: 16,
// 		"Science Fiction": 878,
// 		Western: 37,
// 		Drama: 18,
// 		Family: 10751,
// 	};

// 	// Fetch movies for each genre
// 	async function loadMoviesByGenre() {
// 		for (const [genreName, genreId] of Object.entries(genreMap)) {
// 			const container = document.getElementById(`movieCards_${genreName}`);
// 			if (!container) continue;

// 			try {
// 				const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`;
// 				const response = await fetch(url, API_OPTIONS);
// 				if (!response.ok)
// 					throw new Error(
// 						`Could not fetch ${genreName} movies: ${response.status}`
// 					);
// 				const data = await response.json();

// 				if (!data.results || data.results.length === 0) {
// 					container.innerHTML = `<p class="text-muted">No movies found for ${genreName}.</p>`;
// 					continue;
// 				}

// 				const row = document.createElement("div");
// 				row.className = "row";
// 				data.results.slice(0, 4).forEach((movie) => {
// 					const movieObj = new Movies(
// 						movie.id,
// 						movie.title,
// 						movie.overview,
// 						`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
// 						movie.release_date?.split("-")[0] || "N/A",
// 						genreName,
// 						movie.vote_average
// 					);
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					col.appendChild(movieObj.createCard());
// 					row.appendChild(col);
// 				});
// 				container.innerHTML = "";
// 				container.appendChild(row);
// 			} catch (error) {
// 				console.error(`Error loading ${genreName} movies:`, error);
// 				container.innerHTML = `<p class="text-danger">Failed to load ${genreName} movies.</p>`;
// 			}
// 		}
// 	}

// 	// Run only on movie library page
// 	if (window.location.pathname.includes("(c)movieLibraryPage.html")) {
// 		loadMoviesByGenre();
// 	}

// 	// Expose filterList to global scope if needed
// 	window.filterList = filterList;
// });

// VErsion 1

// document.addEventListener("DOMContentLoaded", function () {
// 	// Filter for homepage
// 	function filterList() {
// 		const input = document.getElementById("search");
// 		const filterValue = input.value.toUpperCase();
// 		const ul = document.getElementById("menu");
// 		const li = ul.getElementsByTagName("li");

// 		for (let i = 0; i < li.length; i++) {
// 			const a = li[i].getElementsByTagName("a")[0];
// 			if (a && a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
// 				li[i].style.display = "";
// 			} else {
// 				li[i].style.display = "none";
// 			}
// 		}
// 	}

// 	// Movies class for creating movie cards
// 	class Movies {
// 		constructor(id, title, description, image, year, genre, rating) {
// 			this.id = id;
// 			this.title = title;
// 			this.description = description;
// 			this.image = image;
// 			this.year = year;
// 			this.genre = genre;
// 			this.rating = rating;
// 		}

// 		createCard(isWatchlist = false) {
// 			const card = document.createElement("div");
// 			card.className = `card movieCard mx-auto`; // Use movieCard for consistency
// 			const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 			const isInWatchlist = watchlist.some((item) => item.id === this.id);

// 			card.innerHTML = `
//         <img src="${this.image}" class="card-img-top" alt="${
// 				this.title
// 			} Poster">
//         <div class="cardTextBackground"></div>
//         <div class="card-body">
//           <h5 class="card-title montserrat-h2">${this.title}</h5>
//           <p class="card-text roboto-p">${this.description.substring(0, 100)}${
// 				this.description.length > 100 ? "..." : ""
// 			}</p>
//           <div class="movieCardButtons">
//             <a href="individualMoviePage.html?id=${
// 							this.id
// 						}" class="btn btn-primary viewDetailsBtn roboto-p" data-id="${
// 				this.id
// 			}">View Details</a>
//             ${
// 							isWatchlist
// 								? `<a href="#" class="btn removeBtn roboto-p">Remove From Watchlist</a>`
// 								: `<a href="#" class="btn btn-primary roboto-p ${
// 										isInWatchlist ? "disabled" : ""
// 								  }">${isInWatchlist ? "Added" : "Add to Watchlist"}</a>`
// 						}
//           </div>
//         </div>
//       `;

// 			// Add event listener for watchlist actions
// 			card.addEventListener("click", (e) => {
// 				if (e.target.classList.contains("btn-primary") && !isWatchlist) {
// 					e.preventDefault();
// 					addToWatchlist(this);
// 					e.target.textContent = "Added";
// 					e.target.classList.add("disabled");
// 				} else if (e.target.classList.contains("removeBtn")) {
// 					e.preventDefault();
// 					let updatedWatchlist =
// 						JSON.parse(localStorage.getItem("watchlist")) || [];
// 					updatedWatchlist = updatedWatchlist.filter(
// 						(item) => item.id !== this.id
// 					);
// 					localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
// 					card.closest(".col-md-3").remove();
// 					if (updatedWatchlist.length === 0) {
// 						const watchlistContainer =
// 							document.getElementById("watchlistContainer");
// 						watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 					}
// 				}
// 			});

// 			return card;
// 		}
// 	}

// 	// API configuration
// 	const API_OPTIONS = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization:
// 				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// 		},
// 	};

// 	// Initialize movie list for Action filter
// 	let movielist = [];

// 	!(async function () {
// 		try {
// 			// Fetch popular movies for Action filter
// 			const popularData = await fetch(
// 				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
// 				API_OPTIONS
// 			).then((response) => {
// 				if (!response.ok)
// 					throw new Error(`Could not fetch popular movies: ${response.status}`);
// 				return response.json();
// 			});

// 			// Fetch genres
// 			const genredata = await fetch(
// 				`https://api.themoviedb.org/3/genre/movie/list?language=en`,
// 				API_OPTIONS
// 			).then((response) => {
// 				if (!response.ok)
// 					throw new Error(`Could not fetch genres: ${response.status}`);
// 				return response.json();
// 			});

// 			// Populate movielist for Action filter
// 			movielist = popularData.results.map((movie) => {
// 				let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 				let id = movie.id;
// 				let title = movie.title;
// 				let description = movie.overview;
// 				let year = movie.release_date?.split("-")[0] || "N/A";
// 				let genreid = movie.genre_ids[0];
// 				let genrename =
// 					genredata.genres.find((g) => g.id === genreid)?.name || "";
// 				let rating = movie.vote_average;

// 				return new Movies(
// 					id,
// 					title,
// 					description,
// 					image,
// 					year,
// 					genrename,
// 					rating
// 				);
// 			});

// 			// Render Top Rated section (if present)
// 			const topRatedContainer = document.querySelector(".topRated .row");
// 			if (topRatedContainer) {
// 				const topRatedData = await fetch(
// 					`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
// 					API_OPTIONS
// 				).then((response) => {
// 					if (!response.ok)
// 						throw new Error(
// 							`Could not fetch top rated movies: ${response.status}`
// 						);
// 					return response.json();
// 				});

// 				topRatedContainer.innerHTML = "";
// 				topRatedData.results.slice(0, 4).forEach((movie) => {
// 					let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 					let id = movie.id;
// 					let title = movie.title;
// 					let description = movie.overview;
// 					let year = movie.release_date?.split("-")[0] || "N/A";
// 					let genreid = movie.genre_ids[0];
// 					let genrename =
// 						genredata.genres.find((g) => g.id === genreid)?.name || "";
// 					let rating = movie.vote_average;

// 					const movieObj = new Movies(
// 						id,
// 						title,
// 						description,
// 						image,
// 						year,
// 						genrename,
// 						rating
// 					);
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					col.appendChild(movieObj.createCard());
// 					topRatedContainer.appendChild(col);
// 				});
// 			}

// 			// Render Popular section (if present)
// 			const popularContainer = document.querySelector(".newReleases .row");
// 			if (popularContainer) {
// 				popularContainer.innerHTML = "";
// 				popularData.results.slice(0, 4).forEach((movie) => {
// 					let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 					let id = movie.id;
// 					let title = movie.title;
// 					let description = movie.overview;
// 					let year = movie.release_date?.split("-")[0] || "N/A";
// 					let genreid = movie.genre_ids[0];
// 					let genrename =
// 						genredata.genres.find((g) => g.id === genreid)?.name || "";
// 					let rating = movie.vote_average;

// 					const movieObj = new Movies(
// 						id,
// 						title,
// 						description,
// 						image,
// 						year,
// 						genrename,
// 						rating
// 					);
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					const card = movieObj.createCard();
// 					card.className = "card movieCardPopular mx-auto"; // Use movieCardPopular for Popular section
// 					col.appendChild(card);
// 					popularContainer.appendChild(col);
// 				});
// 			}
// 		} catch (err) {
// 			console.error("Error initializing movie list:", err);
// 		}
// 	})();

// 	// Handle movie details page
// 	const urlParams = new URLSearchParams(window.location.search);
// 	const movieId = urlParams.get("id");

// 	if (
// 		movieId &&
// 		window.location.pathname.includes("individualMoviePage.html")
// 	) {
// 		getMovieDetails();
// 	} else {
// 		console.warn(
// 			"No movieId found or not on movie details page. Skipping getMovieDetails."
// 		);
// 	}

// 	async function getMovieDetails() {
// 		if (!window.location.pathname.includes("individualMoviePage.html")) {
// 			console.warn("getMovieDetails called on non-movie page. Skipping.");
// 			return;
// 		}

// 		if (!movieId) {
// 			console.error("No movieId provided in URL.");
// 			return;
// 		}

// 		try {
// 			const response = await fetch(
// 				`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
// 				API_OPTIONS
// 			);
// 			if (!response.ok) {
// 				throw new Error(`Could not fetch movie details: ${response.status}`);
// 			}
// 			const movie = await response.json();

// 			const elements = {
// 				title: document.getElementById("movieTitle"),
// 				image: document.getElementById("movieImage"),
// 				rating: document.getElementById("movieRating"),
// 				description: document.getElementById("movieDescription"),
// 				genre: document.getElementById("movieGenre"),
// 				year: document.getElementById("movieYear"),
// 				backdrop: document.querySelector(".movie-backdrop"),
// 			};

// 			if (
// 				!elements.title ||
// 				!elements.image ||
// 				!elements.rating ||
// 				!elements.description ||
// 				!elements.genre ||
// 				!elements.year
// 			) {
// 				console.error("One or more DOM elements not found for movie details.");
// 				return;
// 			}

// 			elements.title.textContent = movie.title;
// 			elements.image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 			elements.rating.textContent = `Rating: ${movie.vote_average}`;
// 			elements.description.textContent = movie.overview;
// 			elements.genre.textContent = movie.genres.map((g) => g.name).join(", ");
// 			elements.year.textContent = movie.release_date?.split("-")[0] || "N/A";

// 			if (elements.backdrop && movie.backdrop_path) {
// 				elements.backdrop.style.backgroundImage = `ur[](https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
// 			}
// 		} catch (err) {
// 			console.error("Error fetching movie details:", err);
// 			const errorContainer =
// 				document.getElementById("movieDescription") ||
// 				document.createElement("p");
// 			errorContainer.textContent =
// 				"Failed to load movie details. Please try again later.";
// 		}
// 	}

// 	function addToWatchlist(movie) {
// 		let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 		const exists = watchlist.some((item) => item.id === movie.id);
// 		if (!exists) {
// 			watchlist.push(movie);
// 			localStorage.setItem("watchlist", JSON.stringify(watchlist));
// 			alert(`Added "${movie.title}" to watchlist!`);
// 		} else {
// 			alert(`${movie.title} is already in your watchlist.`);
// 		}
// 		console.log("Current Watchlist:", watchlist);
// 	}

// 	// Render watchlist
// 	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 	const watchlistContainer = document.getElementById("watchlistContainer");

// 	if (watchlistContainer) {
// 		if (watchlist.length === 0) {
// 			watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 		} else {
// 			watchlistContainer.innerHTML = "";
// 			const row = document.createElement("div");
// 			row.className = "row";
// 			watchlist.forEach((movie) => {
// 				const col = document.createElement("div");
// 				col.className = "col-md-3";
// 				col.appendChild(movie.createCard(true));
// 				row.appendChild(col);
// 			});
// 			watchlistContainer.appendChild(row);
// 		}
// 	}

// 	// Filter by Action genre
// 	document.getElementById("filterActionBtn")?.addEventListener("click", () => {
// 		const filteredMovies = movielist.filter(
// 			(movie) => movie.genre === "Action"
// 		);
// 		document
// 			.querySelectorAll(".movie-section .row, .movie-sectiond .row")
// 			.forEach((row) => row.remove());

// 		filteredMovies.forEach((movie) => {
// 			const containerId = `movieCards_${movie.genre}`;
// 			const container = document.getElementById(containerId);
// 			if (container) {
// 				const row = document.createElement("div");
// 				row.className = "row";
// 				const col = document.createElement("div");
// 				col.className = "col-md-3";
// 				col.appendChild(movie.createCard());
// 				row.appendChild(col);
// 				container.appendChild(row);
// 			}
// 		});
// 	});

// 	// Genre IDs for fetching movies by genre
// 	const genreMap = {
// 		Horror: 27,
// 		Action: 28,
// 		Crime: 80,
// 		Animation: 16,
// 		"Science Fiction": 878,
// 		Western: 37,
// 		Drama: 18,
// 		Family: 10751,
// 	};

// 	// Fetch movies for each genre
// 	async function loadMoviesByGenre() {
// 		for (const [genreName, genreId] of Object.entries(genreMap)) {
// 			const container = document.getElementById(`movieCards_${genreName}`);
// 			if (!container) continue;

// 			try {
// 				const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`;
// 				const response = await fetch(url, API_OPTIONS);
// 				if (!response.ok)
// 					throw new Error(
// 						`Could not fetch ${genreName} movies: ${response.status}`
// 					);
// 				const data = await response.json();

// 				if (!data.results || data.results.length === 0) {
// 					container.innerHTML = `<p class="text-muted">No movies found for ${genreName}.</p>`;
// 					continue;
// 				}

// 				const row = document.createElement("div");
// 				row.className = "row";
// 				data.results.slice(0, 4).forEach((movie) => {
// 					const movieObj = new Movies(
// 						movie.id,
// 						movie.title,
// 						movie.overview,
// 						`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
// 						movie.release_date?.split("-")[0] || "N/A",
// 						genreName,
// 						movie.vote_average
// 					);
// 					const col = document.createElement("div");
// 					col.className = "col-md-3";
// 					col.appendChild(movieObj.createCard());
// 					row.appendChild(col);
// 				});
// 				container.innerHTML = "";
// 				container.appendChild(row);
// 			} catch (error) {
// 				console.error(`Error loading ${genreName} movies:`, error);
// 				container.innerHTML = `<p class="text-danger">Failed to load ${genreName} movies.</p>`;
// 			}
// 		}
// 	}

// 	// Run only on movie library page
// 	if (window.location.pathname.includes("(c)movieLibraryPage.html")) {
// 		loadMoviesByGenre();
// 	}

// 	// Expose filterList to global scope if needed
// 	window.filterList = filterList;
// });
