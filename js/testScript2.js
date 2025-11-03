// ===========================================
//   SIGN IN / SIGN UP PAGE (Rene)
// ===========================================

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

			if (username === userData.username && password === userData.password) {
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

//
// =======================
//   MOVIE CLASS + WATCHLIST CORE (Mandre)
// =======================
//

class Movies {
	constructor(image, year, title, rating, genre, descirption, id) {
		this.id = id;
		this.image = image;
		this.year = year;
		this.title = title;
		this.rating = rating;
		this.genre = genre;
		this.descirption = descirption;
	}
}

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

//
// =============================
//   ROBERT HOME PAGE SECTION
// =============================
//

// ---------- Hero Carousel ----------
!(async function () {
	const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		if (!data.results) return;

		const movies = data.results.slice(4, 8);
		const carouselInner = document.querySelector(
			"#carouselExampleCaptions .carousel-inner"
		);
		const carouselIndicators = document.querySelector(
			"#carouselExampleCaptions .carousel-indicators"
		);

		if (!carouselInner || !carouselIndicators) return; // only runs on homepage

		carouselInner.innerHTML = "";
		carouselIndicators.innerHTML = "";

		movies.forEach((movie, index) => {
			const itemDiv = document.createElement("div");
			itemDiv.classList.add(
				"carousel-item",
				...(index === 0 ? ["active"] : [])
			);
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
			carouselInner.appendChild(itemDiv);

			const indicator = document.createElement("button");
			indicator.type = "button";
			indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
			indicator.setAttribute("data-bs-slide-to", index);
			if (index === 0) indicator.classList.add("active");
			carouselIndicators.appendChild(indicator);
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
})();

// ---------- Top Rated ----------
!(async function () {
	const section = document.querySelector(".movieCard");
	if (!section) return; // only runs on home page

	const url =
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	const response = await fetch(url, options);
	const data = await response.json();
	const topRated = data.results.slice(0, 4);
	const movieCards = document.querySelectorAll(".movieCard");

	topRated.forEach((movie, i) => {
		if (movieCards[i]) {
			movieCards[i].querySelector(
				"img"
			).src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
			movieCards[i].querySelector(".card-title").textContent = movie.title;
			movieCards[i].querySelector(".card-text").textContent =
				movie.overview.slice(0, 60) + "...";
		}
	});
})();

// ---------- Popular ----------
!(async function () {
	const section = document.querySelector(".movieCardPopular");
	if (!section) return;

	const url =
		"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};
	const response = await fetch(url, options);
	const data = await response.json();
	const popular = data.results.slice(0, 4);
	const movieCards = document.querySelectorAll(".movieCardPopular");

	popular.forEach((movie, i) => {
		if (movieCards[i]) {
			movieCards[i].querySelector(
				"img"
			).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
			movieCards[i].querySelector(".card-title").textContent = movie.title;
			movieCards[i].querySelector(".card-text").textContent =
				movie.overview.slice(0, 60) + "...";
		}
	});
})();

//
// =======================
//   MOVIE DETAILS PAGE (Mandre)
// =======================
//

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

if (movieId) {
	getMovieDetails();
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

		const addBtn = document.getElementById("addToWatchlistBtn");
		if (addBtn) {
			const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
			const exists = watchlist.some((item) => item.id === movie.id);
			if (exists) {
				addBtn.textContent = "Added";
				addBtn.disabled = true;
			}

			addBtn.addEventListener("click", () => {
				const movieData = {
					id: movie.id,
					image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
					title: movie.title,
					year: movie.release_date,
					rating: movie.vote_average,
					genre: movie.genres.map((g) => g.name).join(", "),
					descirption: movie.overview,
				};
				addToWatchlist(movieData);
				addBtn.textContent = "Added";
				addBtn.disabled = true;
			});
		}
	} catch (err) {
		console.error(err);
	}
}

//
// ===========================================
//   WATCHLIST PAGE (v2? Mandre base code)
// ===========================================
//

// const watchlistContainer = document.getElementById("watchlistContainer");
// if (watchlistContainer) {
// 	let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
// 	if (watchlist.length === 0) {
// 		watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 	} else {
// 		watchlist.forEach((Movie) => {
// 			const card = document.createElement("div");
// 			card.className = "card";
// 			card.innerHTML = `
//         <img src="${Movie.image}" class="card-img-top" alt="Image Not Found">
//         <h5 class="card-title">${Movie.title}</h5>
//         <p class="card-text">Rating: ${Movie.rating}</p>
//         <a href="#" class="btn-primary">Remove From Watchlist</a>
//       `;

// 			card.addEventListener("click", (e) => {
// 				if (!e.target.classList.contains("btn-primary")) {
// 					window.location.href = `(d)individualMoviePage.html?id=${Movie.id}`;
// 				} else {
// 					e.preventDefault();
// 					let updated = JSON.parse(localStorage.getItem("watchlist")) || [];
// 					updated = updated.filter((item) => item.id !== Movie.id);
// 					localStorage.setItem("watchlist", JSON.stringify(updated));
// 					card.remove();
// 					if (updated.length === 0)
// 						watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
// 				}
// 			});

// 			watchlistContainer.appendChild(card);
// 		});
// 	}
// }

//
// ===========================================
//   WATCHLIST PAGE (v3? Mandre base code)
// ===========================================
//

document.addEventListener("DOMContentLoaded", () => {
	const watchlistContainer = document.getElementById("watchlistContainer");
	if (!watchlistContainer) return;

	const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

	if (watchlist.length === 0) {
		watchlistContainer.innerHTML = `<h2 class="sectionTitle">Your Watch List Is Empty :(</h2>`;
		return;
	}

	//  Adds Movie to Watch List Functioning
	watchlist.forEach((movie) => {
		const cardHTML = `
		<div class="col-md-3">
			<div class="card movieCard mx-auto">
				<img src="${movie.image}" class="card-img-top" alt="{movie.title}" />
				<div class="cardTextBackground"></div>
				<div class="card-body">
					<h5 class="card-title montserrat-h2">${movie.title}</h5>
					<p class="card-text roboto-p">${
						movie.descirption.slice(0, 60) + "..." ||
						"No description available."
					}</p>
					<div class="movieCardButtons">
						<button class="btn removeBtn roboto-p" data-id="${movie.id}">Remove</button>
						<a href="../pages/(d)individualMoviePage.html?id=${
							movie.id
						}" class="btn btn-primary viewDetailsBtn roboto-p">View Details</a>
					</div>
				</div>
			</div>
		</div>
	`;
		watchlistContainer.insertAdjacentHTML("beforeend", cardHTML);
	});

	// Remove Button Functioning
	watchlistContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("removeBtn")) {
			const id = e.target.getAttribute("data-id");
			let currentWatchlist =
				JSON.parse(localStorage.getItem("watchlist")) || [];

			const updatedList = currentWatchlist.filter((movie) => movie.id != id);
			localStorage.setItem("watchlist", JSON.stringify(updatedList));
			e.target.closest(".col-md-3").remove();

			if (updatedList.length === 0) {
				watchlistContainer.innerHTML = `<h2 class="sectionTitle">Your Watch List Is Empty :(</h2>`;
			}
		}
	});
});

//
// ===========================================
//   MOVIE LIBRARY GENRE SECTIONS ("Aiden") (Filler code until we get Aiden's actual code for the Movie Library Page)
// ===========================================
//

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
						<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
							 alt="${movie.title}" class="movie-poster">
						<h5 class="movie-title">${movie.title}</h5>
						<p class="movie-year">${movie.release_date?.split("-")[0] || "N/A"}</p>
						<button class="btn btn-sm btn-outline-light" 
							onclick='addToWatchlist(${JSON.stringify({
								id: movie.id,
								title: movie.title,
								image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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
