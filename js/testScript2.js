// I restructured all the different JavaScript files to fit into one singular  JavaScript File Which is this one. (-Robert)
// Original JavaScript files that were in the repository still remain. They are labelled, mandre.js, aiden.js and aiden copy.js. (-Robert)

// ===========================================
//   SIGN IN / SIGN UP PAGE (Rene)
// ===========================================
const currentPage = window.location.pathname;

if (currentPage.includes("(a)signIn-signUp.html")) {
	$(document).ready(function () {
		$(document).ready(function () {
			// Custom Alert System
			function showAlert(title, message, type = "info") {
				const alert = $("#custom-alert");
				const alertIcon = alert.find(".alert-icon");
				const alertTitle = alert.find(".alert-title");
				const alertMessage = alert.find(".alert-message");

				// Set content
				alertTitle.text(title);
				alertMessage.text(message);

				// Set icon and color based on type
				alertIcon.removeClass("success error warning info");
				switch (type) {
					case "success":
						alertIcon.addClass("success").html("✓");
						break;
					case "error":
						alertIcon.addClass("error").html("✕");
						break;
					case "warning":
						alertIcon.addClass("warning").html("!");
						break;
					case "info":
						alertIcon.addClass("info").html("i");
						break;
				}

				// Show alert
				alert.addClass("show");
			}

			// Close alert
			$(".alert-close-btn").on("click", function () {
				$("#custom-alert").removeClass("show");
			});

			// Close alert when clicking outside
			$("#custom-alert").on("click", function (e) {
				if (e.target === this) {
					$(this).removeClass("show");
				}
			});

			// Form toggle functionality
			$("#switch-to-signup").on("click", function (e) {
				e.preventDefault();
				switchToSignUp();
			});

			$("#switch-to-signin").on("click", function (e) {
				e.preventDefault();
				switchToSignIn();
			});

			function switchToSignIn() {
				$("#signin-form").addClass("active");
				$("#signup-form").removeClass("active");
				clearValidationMessages();
			}

			function switchToSignUp() {
				$("#signup-form").addClass("active");
				$("#signin-form").removeClass("active");
				clearValidationMessages();
			}

			// Clear validation messages
			function clearValidationMessages() {
				$(".error-message").hide();
				$(".success-message").hide();
				$(".warning-message").hide();
				$(".info-message").hide();
			}

			// Phone number formatting (9 digits for South Africa)
			$('input[type="tel"]').on("input", function () {
				let phone = $(this).val().replace(/\D/g, "");
				if (phone.length > 9) {
					phone = phone.substring(0, 9);
				}
				$(this).val(phone);
			});

			// Real-time password confirmation validation
			$("#signup-confirm-password").on("input", function () {
				const password = $("#signup-password").val();
				const confirmPassword = $(this).val();

				if (confirmPassword && password !== confirmPassword) {
					showValidationMessage(
						$("#signup-confirm-password-error"),
						"Passwords do not match",
						"error"
					);
				} else if (confirmPassword && password === confirmPassword) {
					showValidationMessage(
						$("#signup-confirm-password-error"),
						"Passwords match!",
						"success"
					);
				} else {
					$("#signup-confirm-password-error").hide();
				}
			});

			// Real-time password length validation
			$("#signup-password").on("input", function () {
				const password = $(this).val();

				if (password && password.length < 6) {
					showValidationMessage(
						$("#signup-password-error"),
						"Password must be at least 6 characters",
						"error"
					);
				} else if (password && password.length >= 6) {
					showValidationMessage(
						$("#signup-password-error"),
						"Password strength: Good",
						"success"
					);
				} else {
					$("#signup-password-error").hide();
				}
			});

			// Phone number validation (9 digits)
			$('input[type="tel"]').on("blur", function () {
				const phone = $(this).val();
				if (phone && phone.length !== 9) {
					const errorId = $(this).attr("id") + "-error";
					$("#" + errorId)
						.text("South African number must be 9 digits")
						.show();
				}
			});

			// Show validation message
			function showValidationMessage(element, message, type = "error") {
				element.removeClass(
					"error-message warning-message success-message info-message"
				);

				switch (type) {
					case "error":
						element.addClass("error-message");
						break;
					case "warning":
						element.addClass("warning-message");
						break;
					case "success":
						element.addClass("success-message");
						break;
					case "info":
						element.addClass("info-message");
						break;
				}

				element.text(message).show();
			}

			// Sign Up Form Submission
			$("#signup-form").on("submit", function (e) {
				e.preventDefault();

				clearValidationMessages();

				const username = $("#signup-username").val();
				const phone = $("#signup-phone").val();
				const email = $("#signup-email").val();
				const password = $("#signup-password").val();
				const confirmPassword = $("#signup-confirm-password").val();

				let isValid = true;

				// Validate username
				if (!username) {
					showValidationMessage(
						$("#signup-username-error"),
						"Username is required",
						"error"
					);
					isValid = false;
				} else if (username.length < 3) {
					showValidationMessage(
						$("#signup-username-error"),
						"Username must be at least 3 characters",
						"error"
					);
					isValid = false;
				}

				// Validate phone (9 digits for South Africa)
				if (!phone) {
					showValidationMessage(
						$("#signup-phone-error"),
						"Phone number is required",
						"error"
					);
					isValid = false;
				} else if (phone.length !== 9) {
					showValidationMessage(
						$("#signup-phone-error"),
						"South African number must be 9 digits",
						"error"
					);
					isValid = false;
				}

				// Validate email
				if (!email) {
					showValidationMessage(
						$("#signup-email-error"),
						"Email is required",
						"error"
					);
					isValid = false;
				} else if (!isValidEmail(email)) {
					showValidationMessage(
						$("#signup-email-error"),
						"Please enter a valid email address",
						"error"
					);
					isValid = false;
				}

				// Validate password
				if (!password) {
					showValidationMessage(
						$("#signup-password-error"),
						"Password is required",
						"error"
					);
					isValid = false;
				} else if (password.length < 6) {
					showValidationMessage(
						$("#signup-password-error"),
						"Password must be at least 6 characters",
						"error"
					);
					isValid = false;
				}

				// Validate password confirmation
				if (!confirmPassword) {
					showValidationMessage(
						$("#signup-confirm-password-error"),
						"Please confirm your password",
						"error"
					);
					isValid = false;
				} else if (password !== confirmPassword) {
					showValidationMessage(
						$("#signup-confirm-password-error"),
						"Passwords do not match",
						"error"
					);
					isValid = false;
				}

				// Check terms
				if (!$("#terms").is(":checked")) {
					showAlert(
						"Terms Required",
						"You must agree to the Terms of Service and Privacy Policy!",
						"warning"
					);
					isValid = false;
				}

				if (!isValid) return;

				// Store user data with username
				const userData = {
					username: username,
					phone: "+27" + phone,
					email: email,
					password: password,
				};

				localStorage.setItem("moviesUser", JSON.stringify(userData));

				// Show personalized success message in custom alert
				showAlert(
					"Welcome to Movies!",
					`Hello ${username}! Your account has been created successfully. You can now sign in and start enjoying unlimited movies and TV shows.`,
					"success"
				);

				switchToSignIn();
				$("#signup-form")[0].reset();
			});

			// Sign In Form Submission
			$("#signin-form").on("submit", function (e) {
				e.preventDefault();

				clearValidationMessages();

				const username = $("#signin-username").val();
				const password = $("#signin-password").val();

				let isValid = true;

				// Validate username
				if (!username) {
					showValidationMessage(
						$("#signin-username-error"),
						"Username is required",
						"error"
					);
					isValid = false;
				}

				// Validate password
				if (!password) {
					showValidationMessage(
						$("#signin-password-error"),
						"Password is required",
						"error"
					);
					isValid = false;
				}

				if (!isValid) return;

				// Check credentials
				const storedUser = localStorage.getItem("moviesUser");

				if (storedUser) {
					const userData = JSON.parse(storedUser);

					if (
						username === userData.username &&
						password === userData.password
					) {
						// Store session with username
						localStorage.setItem(
							"moviesCurrentUser",
							JSON.stringify({
								username: userData.username,
								phone: userData.phone,
								email: userData.email,
							})
						);

						// Remember me
						if ($("#remember-me").is(":checked")) {
							localStorage.setItem("moviesRememberMe", "true");
						} else {
							localStorage.removeItem("moviesRememberMe");
						}

						// Show personalized welcome back message in custom alert
						showAlert(
							"Welcome Back!",
							`Great to see you again, ${userData.username}! Your movie journey continues with unlimited entertainment.`,
							"success"
						);

						$("#signin-form")[0].reset();

						// Redirect to dashboard in real app
						window.location.href = "index.html";
					} else {
						showAlert(
							"Login Failed",
							"Invalid username or password! Please try again.",
							"error"
						);
					}
				} else {
					showAlert(
						"Account Not Found",
						"No account found with that username. Please sign up first to create your Movies account.",
						"info"
					);
				}
			});

			// Email validation
			function isValidEmail(email) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email);
			}

			// Check for existing session
			const currentUser = localStorage.getItem("moviesCurrentUser");
			if (currentUser) {
				const user = JSON.parse(currentUser);
				console.log(`User ${user.username} is currently signed in.`);
			}

			// Pre-fill username if remember me was checked
			const rememberMe = localStorage.getItem("moviesRememberMe");
			if (rememberMe === "true" && currentUser) {
				const userData = JSON.parse(localStorage.getItem("moviesUser"));
				if (userData) {
					$("#signin-username").val(userData.username);
					$("#remember-me").prop("checked", true);
				}
			}

			// Home Page: Display users name after sign in/sign up
			const currentPage = window.location.pathname;
			if (currentPage.includes("index.html")) {
				const currentUser = localStorage.getItem("moviesCurrentUser");
				if (currentUser) {
					const user = JSON.parse(currentUser);
					const welcomeElement = document.getElementById("welcomeUser");
					if (welcomeElement) {
						welcomeElement.textContent = `Welcome, ${user.username} (:`;
					}
				}
			}
		});
	});
}

// =====================
//   GLOBAL PROPERTIES
// =====================

// // =====================
// //   GLOBAL PROPERTIES
// // =====================
// Defines the Movies class and watchlist management functions used across multiple pages.

// Constructs a movie class for ease of use during the rest of the code.
// Generates a Bootstrap card for a movie, including buttons for watchlist actions.
// Adds to Watchlist
// Removes from Watchlist

class Movies {
	constructor(id, title, description, image, year, genre, rating) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.year = year;
		// Maps the genre_ids to genre names
		const genreMap = {
			27: "Horror",
			28: "Action",
			80: "Crime",
			16: "Animation",
			878: "Science Fiction",
			37: "Western",
			18: "Drama",
			10751: "Family",
		};
		// If genre is a number (ID), map it to the genre name using genreMap
		// If not found, default to "Unknown"
		this.genre =
			typeof genre === "number" ? genreMap[genre] || "Unknown" : genre;
		this.rating = rating;
	}

	// Method to create a Bootstrap-style movie card
	// isWatchlist determines styling if the card is displayed in watchlist
	createCard(isWatchlist = false) {
		// Create the main card div
		const card = document.createElement("div");
		card.className = `card ${
			isWatchlist ? "movieCard" : "movieCardPopular"
		} mx-auto`; // Add styling classes based on if it's a movieCard or movieCardPopular
		const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
		const isInWatchlist = watchlist.some((item) => item.id === this.id);

		card.innerHTML = `
      <img src="${this.image}" class="card-img-top" alt="${this.title} Poster">
      <div class="cardTextBackground"></div>
      <div class="card-body">
        <h5 class="card-title montserrat-h2">${this.title}</h5>
        <p class="card-text roboto-p">${
					this.description
						? this.description.substring(0, 40) +
						  (this.description.length > 20 ? "..." : "")
						: "No description available."
				}</p>
        <div class="movieCardButtons">
          <button class="btn btn-primary addToWatchlistBtn roboto-p ${
						isInWatchlist ? "d-none" : ""
					}" data-id="${this.id}">Add to Watchlist</button>
          <button class="btn removeBtn roboto-p ${
						isInWatchlist ? "" : "d-none"
					}" data-id="${this.id}">Remove</button>
          <a href="../pages/(d)individualMoviePage.html?id=${
						this.id
					}" class="btn btn-primary viewDetailsBtn roboto-p" data-id="${
			this.id
		}">View Details</a>
        </div>
      </div>
    `;

		const addButton = card.querySelector(".addToWatchlistBtn");
		const removeButton = card.querySelector(".removeBtn");

		if (addButton) {
			addButton.addEventListener("click", (e) => {
				e.preventDefault();
				addToWatchlist(this);
				addButton.classList.add("d-none");
				removeButton.classList.remove("d-none");
			});
		}

		if (removeButton) {
			removeButton.addEventListener("click", (e) => {
				e.preventDefault();
				removeFromWatchlist(this.id, card);
				addButton.classList.remove("d-none");
				removeButton.classList.add("d-none");
			});
		}

		if (isWatchlist) {
			const col = document.createElement("div");
			col.className = "col-md-3";
			col.appendChild(card);
			return col;
		}
		return card;
	}
}

function addToWatchlist(movie) {
	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
	const exists = watchlist.some((item) => item.id === movie.id);
	if (!exists) {
		watchlist.push({
			id: movie.id,
			title: movie.title || movie.name,
			description: movie.description || movie.descirption || movie.overview,
			image:
				movie.image || `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			year:
				movie.year ||
				(movie.release_date ? movie.release_date.split("-")[0] : "N/A"),
			genre:
				movie.genre ||
				(movie.genres ? movie.genres.map((g) => g.name).join(", ") : ""),
			rating: movie.rating || movie.vote_average,
		});
		localStorage.setItem("watchlist", JSON.stringify(watchlist));
	}
}

function removeFromWatchlist(movieId, cardElement) {
	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
	watchlist = watchlist.filter((item) => item.id !== movieId);
	localStorage.setItem("watchlist", JSON.stringify(watchlist));

	if (currentPage.includes("(e)movieWatchlistPage.html")) {
		const col = cardElement.closest(".col-md-3");
		if (col) col.remove();
		if (watchlist.length === 0) {
			const watchlistContainer = document.getElementById("watchlistContainer");
			if (watchlistContainer) {
				watchlistContainer.innerHTML = `<h2 class="sectionTitle">Your Watch List Is Empty :(</h2>`;
			}
		}
	}
}

// // =============================
// //   ROBERT HOME PAGE SECTION
// // =============================
// Manages the home page's hero carousel, top-rated, and popular movie sections using TMDB API.
// Fetches top-rated movies and popular movies.

// ---------- Hero Carousel ----------
!(async function () {
	const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
	const API_OPTIONS = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	try {
		const response = await fetch(url, API_OPTIONS);
		const data = await response.json();

		if (!data.results) return;

		const movies = data.results.slice(4, 8);
		const carouselInner = document.querySelector(
			"#carouselExampleCaptions .carousel-inner"
		);
		const carouselIndicators = document.querySelector(
			"#carouselExampleCaptions .carousel-indicators"
		);

		if (!carouselInner || !carouselIndicators) return;

		carouselInner.innerHTML = "";
		carouselIndicators.innerHTML = "";

		// Loop through each movie in the movies array
		movies.forEach((movie, index) => {
			// creates div for hero image carousel.
			const itemDiv = document.createElement("div");
			// Add the 'carousel-item' class to the div
			// If this is the first movie (index 0), also add 'active' class
			itemDiv.classList.add(
				"carousel-item",
				...(index === 0 ? ["active"] : []) // checks if first slide, if it's not... then returns empty array without active class.
			);

			// Set the inner HTML of the slide
			// This includes the movie image and caption
			itemDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${
					movie.backdrop_path
				}" class="d-block w-100" alt="${movie.title}">
        <div class="carousel-caption d-none d-md-block">
          <h5 class="montserrat-h1">${movie.title}</h5>
          <p class="roboto-p">${
						movie.overview
							? movie.overview.slice(0, 250) + "..."
							: "No description available."
					}</p>
        </div>`;
			// Append this slide to the main carousel container
			carouselInner.appendChild(itemDiv);
			// Create a button element for the carousel indicator (the dots/buttons at bottom)
			const indicator = document.createElement("button");
			indicator.type = "button";
			// Set attributes to link this indicator to the carousel
			indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
			indicator.setAttribute("data-bs-slide-to", index);
			// If this is the first slide, mark the indicator as active
			if (index === 0) indicator.classList.add("active");
			// Append the indicator button to the indicators container
			carouselIndicators.appendChild(indicator);
		});
	} catch (error) {
		console.error("Error fetching carousel data:", error);
	}
})();

// ---------- Top Rated ----------
!(async function () {
	const section = document.querySelector(".topRated .row");
	if (!section) return;

	const API_OPTIONS = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	try {
		// Fetch genres
		const genreResponse = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?language=en`,
			API_OPTIONS
		);
		if (!genreResponse.ok)
			throw new Error(`Could not fetch genres: ${genreResponse.status}`);
		const genreData = await genreResponse.json();
		const genreMap = genreData.genres.reduce((map, genre) => {
			map[genre.id] = genre.name;
			return map;
		}, {});

		// Fetch top rated movies
		const response = await fetch(
			"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
			API_OPTIONS
		);
		if (!response.ok)
			throw new Error(`Could not fetch top rated movies: ${response.status}`);
		const data = await response.json();
		const topRated = data.results.slice(0, 25);

		section.innerHTML = "";
		topRated.forEach((movie) => {
			const movieObj = new Movies(
				movie.id,
				movie.title,
				movie.overview,
				`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
				movie.release_date ? movie.release_date.split("-")[0] : "N/A",
				movie.genre_ids[0]
					? genreMap[movie.genre_ids[0]] || "Unknown"
					: "Unknown",
				movie.vote_average
			);
			const col = document.createElement("div");
			col.className = "col-md-3";
			col.appendChild(movieObj.createCard());
			section.appendChild(col);
		});
	} catch (error) {
		console.error("Error fetching top rated movies:", error);
	}
})();

// ---------- Popular ----------
!(async function () {
	const section = document.querySelector(".newReleases .row");
	if (!section) return;

	const API_OPTIONS = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	try {
		// Fetch genres
		const genreResponse = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?language=en`,
			API_OPTIONS
		);
		if (!genreResponse.ok)
			throw new Error(`Could not fetch genres: ${genreResponse.status}`);
		const genreData = await genreResponse.json();
		const genreMap = genreData.genres.reduce((map, genre) => {
			map[genre.id] = genre.name;
			return map;
		}, {});

		// Fetch popular movies
		const response = await fetch(
			"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
			API_OPTIONS
		);
		if (!response.ok)
			throw new Error(`Could not fetch popular movies: ${response.status}`);
		const data = await response.json();
		const popular = data.results.slice(0, 25);

		section.innerHTML = "";
		popular.forEach((movie) => {
			const movieObj = new Movies(
				movie.id,
				movie.title,
				movie.overview,
				`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
				movie.release_date ? movie.release_date.split("-")[0] : "N/A",
				movie.genre_ids[0]
					? genreMap[movie.genre_ids[0]] || "Unknown"
					: "Unknown",
				movie.vote_average
			);
			const col = document.createElement("div");
			col.className = "col-md-3";
			const card = movieObj.createCard();
			card.className = "card movieCardPopular mx-auto";
			col.appendChild(card);
			section.appendChild(col);
		});
	} catch (error) {
		console.error("Error fetching popular movies:", error);
	}
})();

// // ===============================
// //   MOVIE DETAILS PAGE (Mandre)
// // ===============================
// Fetches and displays detailed information for a specific movie for the individual movie page.

// Fetch Movie Details

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
// Checks for Movie Details Page
if (movieId && currentPage.includes("(d)individualMoviePage.html")) {
	getMovieDetails();
}

async function getMovieDetails() {
	// Gets movie details from TMDB API and updates the movie details page
	if (!currentPage.includes("(d)individualMoviePage.html")) {
		// warning that displays in console, when this runs outside of it's window
		console.warn("getMovieDetails called on non-movie page. Skipping.");
		return;
	}

	if (!movieId) {
		console.error("No movieId provided in URL.");
		return;
	}

	const API_OPTIONS = {
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
			API_OPTIONS
		);
		if (!response.ok) {
			throw new Error(`Could not fetch movie details: ${response.status}`);
		}
		const movie = await response.json();
		// get's elements form html based on their id's
		const elements = {
			title: document.getElementById("movieTitle"),
			image: document.getElementById("movieImage"),
			rating: document.getElementById("movieRating"),
			description: document.getElementById("movieDescription"),
			genre: document.getElementById("movieGenre"),
			year: document.getElementById("movieYear"),
			backdrop: document.querySelector(".movie-backdrop"),
		};

		// checks for missing elements in the html
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
		elements.rating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
		elements.description.textContent = movie.overview;
		elements.genre.textContent = movie.genres
			? movie.genres.map((g) => g.name).join(", ")
			: "N/A";
		elements.year.textContent = movie.release_date
			? movie.release_date.split("-")[0]
			: "N/A";

		if (elements.backdrop && movie.backdrop_path) {
			elements.backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
		}

		const buttonContainer = document.getElementById("watchlistButtonContainer");
		if (buttonContainer) {
			const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
			// checks if movie data is in local storag
			const isInWatchlist = watchlist.some((item) => item.id === movie.id);
			// Sets Display None on add to watchlist button and remove from watchlist button.
			buttonContainer.innerHTML = `
									<button id="addToWatchlistBtn" class="btn btn-primary addToWatchlistBtn roboto-p ${
										isInWatchlist ? "d-none" : ""
									}" data-id="${movie.id}">Add to Watchlist</button>
									<button id="removeFromWatchlistBtn" class="btn removeBtn roboto-p ${
										isInWatchlist ? "" : "d-none"
									}" data-id="${movie.id}">Remove</button>
								`;

			const addBtn = document.getElementById("addToWatchlistBtn");
			const removeBtn = document.getElementById("removeFromWatchlistBtn");
			// adds to watchlist
			// if movie data in local storage. Add button display is set to none
			if (addBtn) {
				addBtn.addEventListener("click", () => {
					addToWatchlist({
						id: movie.id,
						title: movie.title,
						description: movie.overview,
						image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
						year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
						genre: movie.genres
							? movie.genres.map((g) => g.name).join(", ")
							: "N/A",
						rating: movie.vote_average,
					});
					addBtn.classList.add("d-none");
					removeBtn.classList.remove("d-none");
				});
			}
			// removes from watchlist
			// if movie data is not in local storage. Remove button's display is set to none
			if (removeBtn) {
				removeBtn.addEventListener("click", () => {
					removeFromWatchlist(movie.id);
					addBtn.classList.remove("d-none");
					removeBtn.classList.add("d-none");
				});
			}
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

// ===========================
//   WATCHLIST PAGE (Mandre)
// ===========================
// Displays the user's watchlist movies as cards, updated dynamically from on localStorage.

document.addEventListener("DOMContentLoaded", () => {
	const watchlistContainer = document.getElementById("watchlistContainer");
	if (!watchlistContainer) return;

	const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

	if (watchlist.length === 0) {
		watchlistContainer.innerHTML = `<h2 class="sectionTitle">Your Watch List Is Empty :(</h2>`;
		return;
	}

	watchlistContainer.innerHTML = "";
	const row = document.createElement("div");
	row.className = "row";
	watchlist.forEach((movie) => {
		const movieObj = new Movies(
			movie.id,
			movie.title,
			movie.description || movie.descirption,
			movie.image,
			movie.year,
			movie.genre,
			movie.rating
		);
		row.appendChild(movieObj.createCard(true));
	});
	watchlistContainer.appendChild(row);
});

// ======================================
//   MOVIE LIBRARY JAVASCRIPT ("Aiden")
// ======================================
// JavaScript for the movie library page, including search filtering and genre-based movie display.

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
		if (!currentPage.includes("(c)movieLibraryPage.html")) return;

		try {
			// Fetch genres
			const genredata = await fetch(
				`https://api.themoviedb.org/3/genre/movie/list?language=en`,
				API_OPTIONS
			).then((response) => {
				if (!response.ok)
					throw new Error(`Could not fetch genres: ${response.status}`);
				return response.json();
			});

			// Fetch popular movies
			const popularData = await fetch(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
				API_OPTIONS
			).then((response) => {
				if (!response.ok)
					throw new Error(`Could not fetch popular movies: ${response.status}`);
				return response.json();
			});

			// Populate movielist for Action filter
			movielist = popularData.results.map((movie) => {
				let image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				let id = movie.id;
				let title = movie.title;
				let description = movie.overview;
				let year = movie.release_date
					? movie.release_date.split("-")[0]
					: "N/A";
				let genreid = movie.genre_ids[0];
				let genrename =
					genredata.genres.find((g) => g.id === genreid)?.name || "Unknown";
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

			// Clear existing cards before rendering
			document
				.querySelectorAll(".movie-section .row")
				.forEach((row) => row.remove());

			// Render genre-specific cards
			movielist.forEach((movie) => {
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
		} catch (err) {
			console.error("Error initializing movie list:", err);
		}
	})();

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
		Family: 10751,
	};

	// Fetch movies for each genre
	async function loadMoviesByGenre() {
		for (const [genreName, genreId] of Object.entries(genreMap)) {
			const container = document.getElementById(`movieCards_${genreName}`);
			if (!container) continue;

			try {
				const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1`;
				console.log(`Fetching ${genreName} movies with URL: ${url}`);
				const response = await fetch(url, API_OPTIONS);
				console.log(response);
				console.log(`Response status for ${genreName}: ${response.status}`);

				if (!response.ok)
					throw new Error(
						`Could not fetch ${genreName} movies: ${response.status}`
					);
				const data = await response.json();

				if (!data.results || data.results.length === 0) {
					console.warn(`No movies found for ${genreName}`);
					container.innerHTML = `<p class="text-muted">No movies found for ${genreName}.</p>`;
					continue;
				}

				const row = document.createElement("div");
				row.className = "row";
				data.results.slice(0, 250).forEach((movie) => {
					const movieObj = new Movies(
						movie.id,
						movie.title,
						movie.overview,
						`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
						movie.release_date ? movie.release_date.split("-")[0] : "N/A",
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
	if (currentPage.includes("(c)movieLibraryPage.html")) {
		loadMoviesByGenre();
	}
});
