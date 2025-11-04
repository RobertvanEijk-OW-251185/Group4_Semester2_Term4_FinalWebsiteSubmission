//
// ========================================================
//   MOVIE LIBRARY GENRE SECTIONS ("Aiden") [actual code]
// ========================================================
//

document.addEventListener("DOMContentLoaded", function () {
	//Filter for homepage
	function filterList() {
		var filterValue, input, ul, li, i;

		input = document.getElementById("search");
		filterValue = input.value.toUpperCase();
		ul = document.getElementById("menu");
		li = ul.getElementsByTagName("li");

		for (i = 0; i < li.length; i++) {
			var a = li[i].getElementsByTagName("a")[0];

			if (a && a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	}

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

		createCard() {
			const card = document.createElement("div");
			card.className = "movie-card";

			// Image element
			const img = document.createElement("img");
			img.src = this.image;
			img.alt = `${this.title} Poster`;
			img.className = "movie-image";

			// Title element
			const titleElem = document.createElement("h3");
			titleElem.textContent = this.title;
			titleElem.className = "movie-title";

			// Year element
			const yearElem = document.createElement("p");
			yearElem.textContent = this.year;
			yearElem.className = "movie-year";

			// Append elements
			card.appendChild(img);
			card.appendChild(titleElem);
			card.appendChild(yearElem);

			return card;
		}
	}

	// key = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8"
	!(async function () {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
			},
		};

		let data = await fetch(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
			options
		)
			.then((response) => response.json())
			.then((result) => {
				return result;
			})
			.catch((err) => console.error(err));

		console.log(data);
		console.log(data.results[0].title);

		const Genre = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
			},
		};

		let genredata = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?language=en`,
			Genre
		)
			.then((response) => response.json())
			.then((result) => {
				return result;
			})
			.catch((err) => console.error(err));

		console.log(genredata);

		let movielist = [];

		for (let i = 0; i < data.results.length; i++) {
			let image = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
			let id = data.results[i].id;
			let title = data.results[i].title;
			let descirption = data.results[i].overview;
			let year = data.results[i].release_date;
			let genreid = data.results[i].genre_ids[0];
			let genrename = "";
			let rating = data.results[i].vote_average;

			for (let k = 0; k < genredata.genres.length; k++) {
				if (genreid == genredata.genres[k].id) {
					genrename = genredata.genres[k].name;
					break;
				}
			}

			movielist.push(
				new Movies(image, year, title, rating, genrename, descirption, id)
			);
		}

		console.log("all movies:", movielist);

		movielist.forEach((Movie) => {
			const containerid = `movieCards_${Movie.genre}`;
			const container = document.getElementById(containerid);
			let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
			const isInWatchlist = watchlist.some((item) => item.id === Movie.id);

			if (container) {
				const card = document.createElement("div");
				card.className = "card";
				card.innerHTML = `
      <img src="${Movie.image}" class="card-img-top" alt="Image Not Found">
      <h5 class="card-title">${Movie.title}</h5>
      <p class="card-text">Rating: ${Movie.rating}</p>
      <a href="#" class="btn-primary" ${isInWatchlist ? "disabled" : ""}>
        ${isInWatchlist ? "Added" : "Add to Watchlist"}
      </a>
    `;

				card.addEventListener("click", (e) => {
					if (!e.target.classList.contains("btn-primary")) {
						window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;
					} else {
						e.preventDefault();
						addToWatchlist(Movie);
						e.target.textContent = "Added";
						e.target.disabled = true;
					}
				});

				container.appendChild(card);
			}
		});
	})();

	const urlParams = new URLSearchParams(window.location.search);
	const movieId = urlParams.get("id");

	if (movieId) {
		getMovieDetails();
	} else {
		console.warn("No movieId found in URL. Skipping getMovieDetails fetch.");
	}

	async function getMovieDetails() {
		const options2 = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
			},
		};

		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
				options2
			);
			const movie = await response.json();

			document.getElementById("movieTitle").textContent = movie.title;
			document.getElementById(
				"movieImage"
			).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
			document.getElementById(
				"movieRating"
			).textContent = `Rating: ${movie.vote_average}`;
			document.getElementById("movieDescription").textContent = movie.overview;
			document.getElementById("movieGenre").textContent = movie.genres
				.map((g) => g.name)
				.join(", ");
			document.getElementById("movieYear").textContent = movie.release_date;

			const backdrop = document.querySelector(".movie-backdrop");
			if (backdrop) {
				backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
			}
		} catch (err) {
			console.error(err);
		}
	}

	getMovieDetails();

	function addToWatchlist(movie) {
		let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

		const exists = watchlist.some((item) => item.id === movie.id);
		if (!exists) {
			watchlist.push(movie);
			localStorage.setItem("watchlist", JSON.stringify(watchlist));
		} else {
			alert(`${movie.title} is already in your watchlist.`);
		}
		console.log("Current Watchlist:", watchlist);
	}

	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
	const container = document.getElementById("watchlistContainer");

	console.log("Current Watchlist:", watchlist);

	if (watchlist.length === 0) {
		container.innerHTML = "<p>Movie Name .</p>";
	} else {
		watchlist.forEach((Movie) => {
			const card = document.createElement("div");
			card.className = "card";
			card.innerHTML = `
    <img src="${Movie.image}" class="card-img-top" alt="Image Not Found">
    <h5 class="card-title">${Movie.title}</h5>
    <p class="card-text">Rating: ${Movie.rating}</p>
    <a href="#" class="btn-primary">Remove From Watchlist</a>
  `;

			card.addEventListener("click", (e) => {
				if (!e.target.classList.contains("btn-primary")) {
					window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;
				} else {
					e.preventDefault();

					let updatedWatchlist =
						JSON.parse(localStorage.getItem("watchlist")) || [];
					updatedWatchlist = updatedWatchlist.filter(
						(item) => item.id !== Movie.id
					);
					localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

					card.remove();

					if (updatedWatchlist.length === 0) {
						container.innerHTML = "<p>Your watchlist is empty.</p>";
					}
				}
			});

			container.appendChild(card);
		});
	}

	// document.getElementById("filterRatingBtn").addEventListener("click", () => {
	// 	const filteredMovies = movielist.filter((movie) => movie.rating >= 7);

	// 	document.querySelectorAll(".card").forEach((card) => card.remove());

	// 	filteredMovies.forEach((Movie) => {
	// 		const containerId = `movieCards_${Movie.genre}`;
	// 		const container = document.getElementById(containerId);
	// 		if (container) {
	// 			const card = Movie.createCard();

	// 			card.addEventListener("click", (e) => {
	// 				if (!e.target.classList.contains("btn-primary")) {
	// 					window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;
	// 				} else {
	// 					e.preventDefault();
	// 					addToWatchlist(Movie);
	// 					e.target.textContent = "Added";
	// 					e.target.disabled = true;
	// 				}
	// 			});

	// 			container.appendChild(card);
	// 		}
	// 	});
	// });

	document.getElementById("filterActionBtn").addEventListener("click", () => {
		const filteredMovies = movielist.filter(
			(movie) => movie.genre === "Action"
		);

		document.querySelectorAll(".card").forEach((card) => card.remove());

		filteredMovies.forEach((Movie) => {
			const containerId = `movieCards_${Movie.genre}`;
			const container = document.getElementById(containerId);
			if (container) {
				const card = Movie.createCard();

				card.addEventListener("click", (e) => {
					if (!e.target.classList.contains("btn-primary")) {
						window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;
					} else {
						e.preventDefault();
						addToWatchlist(Movie);
						e.target.textContent = "Added";
						e.target.disabled = true;
					}
				});

				container.appendChild(card);
			}
		});
	});

	const movielist = [
		{
			id: 1,
			title: "Action Movie 1",
			genre: "Action",
			createCard: function () {
				const card = document.createElement("div");
				card.className = "card mb-3";
				card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <button class="btn btn-primary">Add to Watchlist</button>
        </div>
      `;
				return card;
			},
		},
		{
			id: 2,
			title: "Comedy Movie 1",
			genre: "Comedy",
			createCard: function () {
				const card = document.createElement("div");
				card.className = "card mb-3";
				card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <button class="btn btn-primary">Add to Watchlist</button>
        </div>
      `;
				return card;
			},
		},
		{
			id: 3,
			title: "Action Movie 2",
			genre: "Action",
			createCard: function () {
				const card = document.createElement("div");
				card.className = "card mb-3";
				card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <button class="btn btn-primary">Add to Watchlist</button>
        </div>
      `;
				return card;
			},
		},
	];

	function addToWatchlist(movie) {
		alert(`Added "${movie.title}" to watchlist!`);
	}

	document.getElementById("filterActionBtn").addEventListener("click", () => {
		const filteredMovies = movielist.filter(
			(movie) => movie.genre === "Action"
		);

		document.querySelectorAll(".card").forEach((card) => card.remove());

		const container = document.getElementById("MoviesContainer");

		filteredMovies.forEach((Movie) => {
			const card = Movie.createCard();

			card.addEventListener("click", (e) => {
				if (!e.target.classList.contains("btn-primary")) {
					window.location.href = `individualMoviePage.html?id=${Movie.id}`;
				} else {
					e.preventDefault();
					addToWatchlist(Movie);
					e.target.textContent = "Added";
					e.target.disabled = true;
				}
			});

			container.appendChild(card);
		});
	});

	// fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			throw new Error("Cloud not Fetching resource");
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((data) => console.log(data.id))
	// 	.catch((error) => console.error(error));

	/*Test stuff*/
	const API_KEY = "a6c2afad200f84797a69b04f2d607b70";
	const API_OPTIONS = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	// Genre ID's
	const genreMap = {
		Horror: 27,
		Action: 28,
		Crime: 80,
		Animation: 16,
		"Science Fiction": 878,
		Western: 37,
		Drama: 18,
		Family: 10751,
	};

	// Fetch movies for each genre
	async function loadMoviesByGenre() {
		for (const [genreName, genreId] of Object.entries(genreMap)) {
			const container = document.getElementById(`movieCards_${genreName}`);
			if (!container) continue;

			try {
				const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`;
				const response = await fetch(url, API_OPTIONS);
				const data = await response.json();

				console.log(data);

				if (!data.results || data.results.length === 0) {
					container.innerHTML = `<p class="text-muted">No movies found for ${genreName}.</p>`;
					continue;
				}

				// Generate movie cards
				container.innerHTML = data.results
					.slice(0, 6)
					.map(
						(movie) => `
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500${
													movie.poster_path
												}" 
                             alt="${movie.title}" class="movie-poster">
                        <h5 class="movie-title">${movie.title}</h5>
                        <p class="movie-year">${
													movie.release_date?.split("-")[0] || "N/A"
												}</p>
                        <button class="btn btn-sm btn-outline-light" 
                            onclick='addToWatchlist(${JSON.stringify({
															id: movie.id,
															title: movie.title,
															image:
																"https://image.tmdb.org/t/p/w500${movie.poster_path}",
															year: movie.release_date?.split("-")[0] || "N/A",
															rating: movie.vote_average,
															genre: genreName,
															descirption: movie.overview,
														})})'>
                            + Watchlist
                        </button>
                    </div>
                `
					)
					.join("");
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
});
