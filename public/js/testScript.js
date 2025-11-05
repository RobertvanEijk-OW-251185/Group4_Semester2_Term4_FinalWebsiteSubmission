// //
// // =======================
// //   MOVIE CLASS + WATCHLIST CORE (Mandre)
// // =======================
// //

// class Movies {
// 	constructor(image, year, title, rating, genre, descirption, id) {
// 		this.id = id;
// 		this.image = image;
// 		this.year = year;
// 		this.title = title;
// 		this.rating = rating;
// 		this.genre = genre;
// 		this.descirption = descirption;
// 	}
// }

// function addToWatchlist(movie) {
// 	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// 	const exists = watchlist.some((item) => item.id === movie.id);
// 	if (!exists) {
// 		watchlist.push(movie);
// 		localStorage.setItem("watchlist", JSON.stringify(watchlist));
// 	} else {
// 		alert(`${movie.title} is already in your watchlist.`);
// 	}
// 	console.log("Current Watchlist:", watchlist);
// }

// //
// // =============================
// //   ROBERT HOME PAGE SECTION
// // =============================
// //

// // ---------- Hero Carousel ----------
// !(async function () {
// 	const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization:
// 				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// 		},
// 	};

// 	try {
// 		const response = await fetch(url, options);
// 		const data = await response.json();

// 		if (!data.results) return;

// 		const movies = data.results.slice(4, 8);
// 		const carouselInner = document.querySelector(
// 			"#carouselExampleCaptions .carousel-inner"
// 		);
// 		const carouselIndicators = document.querySelector(
// 			"#carouselExampleCaptions .carousel-indicators"
// 		);

// 		if (!carouselInner || !carouselIndicators) return; // only runs on homepage

// 		carouselInner.innerHTML = "";
// 		carouselIndicators.innerHTML = "";

// 		movies.forEach((movie, index) => {
// 			const itemDiv = document.createElement("div");
// 			itemDiv.classList.add(
// 				"carousel-item",
// 				...(index === 0 ? ["active"] : [])
// 			);
// 			itemDiv.innerHTML = `
// 				<img src="https://image.tmdb.org/t/p/original${
// 					movie.backdrop_path
// 				}" class="d-block w-100" alt="${movie.title}">
// 				<div class="carousel-caption d-none d-md-block">
// 					<h5 class="montserrat-h1">${movie.title}</h5>
// 					<p class="roboto-p">${
// 						movie.overview
// 							? movie.overview.slice(0, 250) + "..."
// 							: "No description available."
// 					}</p>
// 				</div>`;
// 			carouselInner.appendChild(itemDiv);

// 			const indicator = document.createElement("button");
// 			indicator.type = "button";
// 			indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
// 			indicator.setAttribute("data-bs-slide-to", index);
// 			if (index === 0) indicator.classList.add("active");
// 			carouselIndicators.appendChild(indicator);
// 		});
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 	}
// })();

// // ---------- Top Rated ----------
// !(async function () {
// 	const section = document.querySelector(".movieCard");
// 	if (!section) return; // only runs on home page

// 	const url =
// 		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: "Bearer YOUR_BEARER_TOKEN_HERE",
// 		},
// 	};

// 	const response = await fetch(url, options);
// 	const data = await response.json();
// 	const topRated = data.results.slice(0, 4);
// 	const movieCards = document.querySelectorAll(".movieCard");

// 	topRated.forEach((movie, i) => {
// 		if (movieCards[i]) {
// 			movieCards[i].querySelector(
// 				"img"
// 			).src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
// 			movieCards[i].querySelector(".card-title").textContent = movie.title;
// 			movieCards[i].querySelector(".card-text").textContent =
// 				movie.overview.slice(0, 60) + "...";
// 			// Fix: dynamically set the href and data-id
// 			const viewBtn = movieCards[i].querySelector(".viewDetailsBtn");
// 			viewBtn.href = `./pages/(d)individualMoviePage.html?id=${movie.id}`;
// 			viewBtn.dataset.id = movie.id;
// 		}
// 	});
// })();

// // ---------- Popular ----------
// !(async function () {
// 	const section = document.querySelector(".movieCardPopular");
// 	if (!section) return;

// 	const url =
// 		"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
// 	const options = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization: "Bearer YOUR_BEARER_TOKEN_HERE",
// 		},
// 	};

// 	const response = await fetch(url, options);
// 	const data = await response.json();
// 	const popular = data.results.slice(0, 4);
// 	const movieCards = document.querySelectorAll(".movieCardPopular");

// 	popular.forEach((movie, i) => {
// 		if (movieCards[i]) {
// 			movieCards[i].querySelector(
// 				"img"
// 			).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 			movieCards[i].querySelector(".card-title").textContent = movie.title;
// 			movieCards[i].querySelector(".card-text").textContent =
// 				movie.overview.slice(0, 60) + "...";
// 			// Fix: dynamically set the href and data-id
// 			const viewBtn = movieCards[i].querySelector(".viewDetailsBtn");
// 			viewBtn.href = `./pages/(d)individualMoviePage.html?id=${movie.id}`;
// 			viewBtn.dataset.id = movie.id;
// 		}
// 	});
// })();

// //
// // ===============================
// //   MOVIE DETAILS PAGE (Mandre)
// // ===============================
// //

// const urlParams = new URLSearchParams(window.location.search);
// const movieId = urlParams.get("id");

// if (movieId) {
// 	getMovieDetails();
// }

// async function getMovieDetails() {
// 	const options2 = {
// 		method: "GET",
// 		headers: {
// 			accept: "application/json",
// 			Authorization:
// 				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// 		},
// 	};

// 	try {
// 		const response = await fetch(
// 			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
// 			options2
// 		);
// 		const movie = await response.json();

// 		document.getElementById("movieTitle").textContent = movie.title;
// 		document.getElementById(
// 			"movieImage"
// 		).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 		document.getElementById(
// 			"movieRating"
// 		).textContent = `Rating: ${movie.vote_average}`;
// 		document.getElementById("movieDescription").textContent = movie.overview;
// 		document.getElementById("movieGenre").textContent = movie.genres
// 			.map((g) => g.name)
// 			.join(", ");
// 		document.getElementById("movieYear").textContent = movie.release_date;

// 		const backdrop = document.querySelector(".movie-backdrop");
// 		if (backdrop) {
// 			backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
// 		}

// 		const addBtn = document.getElementById("addToWatchlistBtn");
// 		if (addBtn) {
// 			const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 			const exists = watchlist.some((item) => item.id === movie.id);
// 			if (exists) {
// 				addBtn.textContent = "Added";
// 				addBtn.disabled = true;
// 			}

// 			addBtn.addEventListener("click", () => {
// 				const movieData = {
// 					id: movie.id,
// 					image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
// 					title: movie.title,
// 					year: movie.release_date,
// 					rating: movie.vote_average,
// 					genre: movie.genres.map((g) => g.name).join(", "),
// 					descirption: movie.overview,
// 				};
// 				addToWatchlist(movieData);
// 				addBtn.textContent = "Added";
// 				addBtn.disabled = true;
// 			});
// 		}
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// // =======================
// //  INDIVIDUAL MOVIE PAGE LOGIC
// // =======================
// document.addEventListener("DOMContentLoaded", async () => {
// 	const movieImage = document.getElementById("movieImage");
// 	const movieTitle = document.getElementById("movieTitle");
// 	const movieYear = document.getElementById("movieYear");
// 	const movieGenre = document.getElementById("movieGenre");
// 	const movieRating = document.getElementById("movieRating");
// 	const movieDescription = document.getElementById("movieDescription");
// 	const addToWatchlistBtn = document.getElementById("addToWatchlistBtn");

// 	// Only run on the individual page
// 	if (!movieTitle) return;

// 	// Get movie ID from URL
// 	const params = new URLSearchParams(window.location.search);
// 	const movieId = params.get("id");

// 	if (!movieId) {
// 		movieTitle.textContent = "Movie Not Found";
// 		return;
// 	}

// 	try {
// 		const response = await fetch(
// 			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
// 			{
// 				headers: {
// 					accept: "application/json",
// 					Authorization:
// 						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// 				},
// 			}
// 		);
// 		const movie = await response.json();

// 		movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 		movieTitle.textContent = movie.title;
// 		movieYear.textContent = movie.release_date.split("-")[0];
// 		movieGenre.textContent = movie.genres.map((g) => g.name).join(", ");
// 		movieRating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
// 		movieDescription.textContent = movie.overview;

// 		addToWatchlistBtn.addEventListener("click", () => {
// 			addToWatchlist({
// 				id: movie.id,
// 				image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
// 				year: movie.release_date.split("-")[0],
// 				title: movie.title,
// 				rating: movie.vote_average,
// 				genre: movie.genres.map((g) => g.name).join(", "),
// 				descirption: movie.overview,
// 			});
// 		});
// 	} catch (error) {
// 		console.error("Failed to load movie details:", error);
// 	}
// });

// //
// // ===========================================
// //   WATCHLIST PAGE (v3? Mandre base code)
// // ===========================================
// //

// document.addEventListener("DOMContentLoaded", () => {
// 	const watchlistContainer = document.getElementById("watchlistContainer");
// 	if (!watchlistContainer) return;

// 	const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// 	if (watchlist.length === 0) {
// 		watchlistContainer.innerHTML = `<h2 class="sectionTitle">Your Watch List Is Empty :(</h2>`;
// 		return;
// 	}

// 	//  Adds Movie to Watch List Functioning
// 	watchlist.forEach((movie) => {
// 		const cardHTML = `
// 		<div class="col-md-3">
// 			<div class="card movieCard mx-auto">
// 				<img src="${movie.image}" class="card-img-top" alt="{movie.title}" />
// 				<div class="cardTextBackground"></div>
// 				<div class="card-body">
// 					<h5 class="card-title montserrat-h2">${movie.title}</h5>
// 					<p class="card-text roboto-p">${
// 						movie.descirption.slice(0, 60) + "..." ||
// 						"No description available."
// 					}</p>
// 					<div class="movieCardButtons">
// 						<button class="btn removeBtn roboto-p" data-id="${movie.id}">Remove</button>
// 						<a href="../pages/(d)individualMoviePage.html?id=${
// 							movie.id
// 						}" class="btn btn-primary viewDetailsBtn roboto-p">View Details</a>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	`;
// 		watchlistContainer.insertAdjacentHTML("beforeend", cardHTML);
// 	});

// 	// Remove Button Functioning
// 	watchlistContainer.addEventListener("click", (e) => {
// 		if (e.target.classList.contains("removeBtn")) {
// 			const id = e.target.getAttribute("data-id");
// 			let currentWatchlist =
// 				JSON.parse(localStorage.getItem("watchlist")) || [];

// 			const updatedList = currentWatchlist.filter((movie) => movie.id != id);
// 			localStorage.setItem("watchlist", JSON.stringify(updatedList));
// 			e.target.closest(".col-md-3").remove();

// 			if (updatedList.length === 0) {
// 				watchlistContainer.innerHTML = `<h2 class="sectionTitle">Your Watch List Is Empty :(</h2>`;
// 			}
// 		}
// 	});
// });

// // =======================
// //  INDIVIDUAL MOVIE PAGE LOGIC
// // =======================
// document.addEventListener("DOMContentLoaded", async () => {
// 	const movieImage = document.getElementById("movieImage");
// 	const movieTitle = document.getElementById("movieTitle");
// 	const movieYear = document.getElementById("movieYear");
// 	const movieGenre = document.getElementById("movieGenre");
// 	const movieRating = document.getElementById("movieRating");
// 	const movieDescription = document.getElementById("movieDescription");
// 	const addToWatchlistBtn = document.getElementById("addToWatchlistBtn");

// 	// Only run on the individual page
// 	if (!movieTitle) return;

// 	// Get movie ID from URL
// 	const params = new URLSearchParams(window.location.search);
// 	const movieId = params.get("id");

// 	if (!movieId) {
// 		movieTitle.textContent = "Movie Not Found";
// 		return;
// 	}

// 	try {
// 		const response = await fetch(
// 			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
// 			{
// 				headers: {
// 					accept: "application/json",
// 					Authorization:
// 						"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// 				},
// 			}
// 		);
// 		const movie = await response.json();

// 		movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// 		movieTitle.textContent = movie.title;
// 		movieYear.textContent = movie.release_date.split("-")[0];
// 		movieGenre.textContent = movie.genres.map((g) => g.name).join(", ");
// 		movieRating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
// 		movieDescription.textContent = movie.overview;

// 		addToWatchlistBtn.addEventListener("click", () => {
// 			addToWatchlist({
// 				id: movie.id,
// 				image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
// 				year: movie.release_date.split("-")[0],
// 				title: movie.title,
// 				rating: movie.vote_average,
// 				genre: movie.genres.map((g) => g.name).join(", "),
// 				descirption: movie.overview,
// 			});
// 		});
// 	} catch (error) {
// 		console.error("Failed to load movie details:", error);
// 	}
// });

// //
// // ====================================================================================================================
// //   MOVIE LIBRARY GENRE SECTIONS ("Aiden") (Filler code until we get Aiden's actual code for the Movie Library Page)
// // ====================================================================================================================
// //

// // const API_KEY = "a6c2afad200f84797a69b04f2d607b70";
// // const API_OPTIONS = {
// // 	method: "GET",
// // 	headers: {
// // 		accept: "application/json",
// // 		Authorization:
// // 			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
// // 	},
// // };

// // // Genre ID's
// // const genreMap = {
// // 	Horror: 27,
// // 	Action: 28,
// // 	Crime: 80,
// // 	Animation: 16,
// // 	"Science Fiction": 878,
// // 	Western: 37,
// // 	Drama: 18,
// // 	Family: 10751,
// // };

// // // Fetch movies for each genre
// // async function loadMoviesByGenre() {
// // 	for (const [genreName, genreId] of Object.entries(genreMap)) {
// // 		const container = document.getElementById(`movieCards_${genreName}`);
// // 		if (!container) continue;

// // 		try {
// // 			const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`;
// // 			const response = await fetch(url, API_OPTIONS);
// // 			const data = await response.json();

// // 			console.log(data);

// // 			if (!data.results || data.results.length === 0) {
// // 				container.innerHTML = `<p class="text-muted">No movies found for ${genreName}.</p>`;
// // 				continue;
// // 			}

// // 			// Generate movie cards
// // 			container.innerHTML = data.results
// // 				.slice(0, 6)
// // 				.map(
// // 					(movie) => `
// // 					<div class="movie-card">
// // 						<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
// // 							 alt="${movie.title}" class="movie-poster">
// // 						<h5 class="movie-title">${movie.title}</h5>
// // 						<p class="movie-year">${movie.release_date?.split("-")[0] || "N/A"}</p>
// // 						<button class="btn btn-sm btn-outline-light"
// // 							onclick='addToWatchlist(${JSON.stringify({
// // 								id: movie.id,
// // 								title: movie.title,
// // 								image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
// // 								year: movie.release_date?.split("-")[0] || "N/A",
// // 								rating: movie.vote_average,
// // 								genre: genreName,
// // 								descirption: movie.overview,
// // 							})})'>
// // 							+ Watchlist
// // 						</button>
// // 					</div>
// // 				`
// // 				)
// // 				.join("");
// // 		} catch (error) {
// // 			console.error(`Error loading ${genreName} movies:`, error);
// // 			container.innerHTML = `<p class="text-danger">Failed to load ${genreName} movies.</p>`;
// // 		}
// // 	}
// // }

// // // Run only on movie library page
// // if (window.location.pathname.includes("(c)movieLibraryPage.html")) {
// // 	loadMoviesByGenre();
// // }

// =======================
//   MOVIE CLASS + WATCHLIST CORE (Mandre)
// =======================

// class Movies {
// 	constructor(id, title, description, image, year, genre, rating) {
// 		this.id = id;
// 		this.title = title;
// 		this.description = description;
// 		this.image = image;
// 		this.year = year;
// 		this.genre = genre;
// 		this.rating = rating;
// 	}

// 	// createCard(isWatchlist = false) {
// 	// 	const card = document.createElement("div");
// 	// 	card.className = `card ${
// 	// 		isWatchlist ? "movieCard" : "movieCardPopular"
// 	// 	} mx-auto`;
// 	// 	const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 	// 	const isInWatchlist = watchlist.some((item) => item.id === this.id);

// 	// 	card.innerHTML = `
// 	//   <img src="${this.image}" class="card-img-top" alt="${this.title} Poster">
// 	//   <div class="cardTextBackground"></div>
// 	//   <div class="card-body">
// 	//     <h5 class="card-title montserrat-h2">${this.title}</h5>
// 	//     <p class="card-text roboto-p">${
// 	// 				this.description
// 	// 					? this.description.substring(0, 60) +
// 	// 					  (this.description.length > 60 ? "..." : "")
// 	// 					: "No description available."
// 	// 			}</p>
// 	//     <div class="movieCardButtons">
// 	//       ${
// 	// 					isWatchlist
// 	// 						? `<button class="btn removeBtn roboto-p" data-id="${this.id}">Remove</button>`
// 	// 						: `<button class="btn btn-primary addToWatchlistBtn roboto-p ${
// 	// 								isInWatchlist ? "disabled" : ""
// 	// 						  }" data-id="${this.id}">${
// 	// 								isInWatchlist ? "Added" : "Add to Watchlist"
// 	// 						  }</button>`
// 	// 				}
// 	//       <a href="pages/(d)individualMoviePage.html?id=${
// 	// 					this.id
// 	// 				}" class="btn btn-primary viewDetailsBtn roboto-p" data-id="${
// 	// 		this.id
// 	// 	}">View Details</a>
// 	//     </div>
// 	//   </div>
// 	// `;

// 	// 	// Add event listeners to specific buttons instead of the entire card
// 	// 	const addButton = card.querySelector(".addToWatchlistBtn");
// 	// 	const removeButton = card.querySelector(".removeBtn");

// 	// 	if (addButton) {
// 	// 		addButton.addEventListener("click", (e) => {
// 	// 			e.preventDefault();
// 	// 			addToWatchlist(this);
// 	// 			addButton.textContent = "Added";
// 	// 			addButton.classList.add("disabled");
// 	// 		});
// 	// 	}

// 	// 	if (removeButton) {
// 	// 		removeButton.addEventListener("click", (e) => {
// 	// 			e.preventDefault();
// 	// 			let updatedWatchlist =
// 	// 				JSON.parse(localStorage.getItem("watchlist")) || [];
// 	// 			updatedWatchlist = updatedWatchlist.filter(
// 	// 				(item) => item.id !== this.id
// 	// 			);
// 	// 			localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
// 	// 			card.closest(".col-md-3").remove();
// 	// 			if (updatedWatchlist.length === 0) {
// 	// 				const watchlistContainer =
// 	// 					document.getElementById("watchlistContainer");
// 	// 				if (watchlistContainer) {
// 	// 					watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 	// 				}
// 	// 			}
// 	// 		});
// 	// 	}

// 	// 	if (isWatchlist) {
// 	// 		const col = document.createElement("div");
// 	// 		col.className = "col-md-3";
// 	// 		col.appendChild(card);
// 	// 		return col;
// 	// 	}
// 	// 	return card;
// 	// }

// 	createCard(isWatchlist = false) {
// 		const card = document.createElement("div");
// 		card.className = `card ${
// 			isWatchlist ? "movieCard" : "movieCardPopular"
// 		} mx-auto`;
// 		const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 		const isInWatchlist = watchlist.some((item) => item.id === this.id);

// 		card.innerHTML = `
//     <img src="${this.image}" class="card-img-top" alt="${this.title} Poster">
//     <div class="cardTextBackground"></div>
//     <div class="card-body">
//       <h5 class="card-title montserrat-h2">${this.title}</h5>
//       <p class="card-text roboto-p">${
// 				this.description
// 					? this.description.substring(0, 60) +
// 					  (this.description.length > 60 ? "..." : "")
// 					: "No description available."
// 			}</p>
//       <div class="movieCardButtons">
//         <button class="btn btn-primary addToWatchlistBtn roboto-p ${
// 					isInWatchlist ? "d-none" : ""
// 				}" data-id="${this.id}">Add to Watchlist</button>
//         <button class="btn removeBtn roboto-p ${
// 					isInWatchlist ? "" : "d-none"
// 				}" data-id="${this.id}">Remove</button>
//         <a href="pages/(d)individualMoviePage.html?id=${
// 					this.id
// 				}" class="btn btn-primary viewDetailsBtn roboto-p" data-id="${
// 			this.id
// 		}">View Details</a>
//       </div>
//     </div>
//   `;

// 		const addButton = card.querySelector(".addToWatchlistBtn");
// 		const removeButton = card.querySelector(".removeBtn");

// 		if (addButton) {
// 			addButton.addEventListener("click", (e) => {
// 				e.preventDefault();
// 				addToWatchlist(this);
// 				addButton.classList.add("d-none");
// 				removeButton.classList.remove("d-none");
// 			});
// 		}

// 		if (removeButton) {
// 			removeButton.addEventListener("click", (e) => {
// 				e.preventDefault();
// 				removeFromWatchlist(this.id, card);
// 				addButton.classList.remove("d-none");
// 				removeButton.classList.add("d-none");
// 			});
// 		}

// 		if (isWatchlist) {
// 			const col = document.createElement("div");
// 			col.className = "col-md-3";
// 			col.appendChild(card);
// 			return col;
// 		}
// 		return card;
// 	}
// }
