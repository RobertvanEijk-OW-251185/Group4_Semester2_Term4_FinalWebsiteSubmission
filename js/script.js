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
				// window.location.href = 'dashboard.html';
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

	// // Home Page: Display users name after sign in/sign up
	// const currentPage = window.location.pathname;
	// if (currentPage.includes("index.html")) {
	// 	const currentUser = localStorage.getItem("moviesCurrentUser");
	// 	if (currentUser) {
	// 		const user = JSON.parse(currentUser);
	// 		const welcomeElement = document.getElementById("welcomeUser");
	// 		if (welcomeElement) {
	// 			welcomeElement.textContent = `Welcome, ${user.username} (:`;
	// 		}
	// 	}
	// }
});

// API Fetch and Integration:

// Home Page Carousel

!(async function () {
	const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		if (!data.results) {
			console.error("No movie data found.");
			return;
		}

		const movies = data.results.slice(4, 8);

		const posterUrls = movies
			.filter((movie) => movie.poster_path)
			.map(
				(movie) => `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
			);

		console.log("Poster URLs:", posterUrls);

		const carouselInner = document.querySelector(
			"#carouselExampleCaptions .carousel-inner"
		);
		const carouselIndicators = document.querySelector(
			"#carouselExampleCaptions .carousel-indicators"
		);

		carouselInner.innerHTML = "";
		carouselIndicators.innerHTML = "";

		posterUrls.forEach((url, index) => {
			const itemDiv = document.createElement("div");
			itemDiv.classList.add("carousel-item");
			if (index === 0) itemDiv.classList.add("active");

			const img = document.createElement("img");
			img.src = url;
			img.classList.add("d-block", "w-100");
			img.alt = `Movie Poster ${index + 1}`;

			itemDiv.appendChild(img);

			const captionDiv = document.createElement("div");
			captionDiv.classList.add("carousel-caption", "d-none", "d-md-block");
			captionDiv.innerHTML = `<h5 class="montserrat-h1">${
				movies[index].title
			}</h5> <p class="roboto-p">
<p class="roboto-p">
<p class="roboto-p">${
				movies[index].overview
					? movies[index].overview.slice(0, 250) + "..."
					: "No description available."
			}</p>
`;
			itemDiv.appendChild(captionDiv);

			carouselInner.appendChild(itemDiv);

			const indicator = document.createElement("button");
			indicator.type = "button";
			indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
			indicator.setAttribute("data-bs-slide-to", index);
			indicator.setAttribute("aria-label", `Slide ${index + 1}`);
			if (index === 0) {
				indicator.classList.add("active");
				indicator.setAttribute("aria-current", "true");
			}
			carouselIndicators.appendChild(indicator);
		});
	} catch (error) {
		console.error("Error fetching data:", error);
	}
})();

// Home Page: Top Rated section

!(async function () {
	const url =
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};
	const response = await fetch(url, options);
	const data = await response.json();

	console.log(data);

	const topRated = data.results.slice(0, 4);

	console.log(topRated);

	const topRatedPosters = topRated
		.filter((movie) => movie.poster_path)
		.map((movie) => `https://image.tmdb.org/t/p/original${movie.poster_path}`);

	console.log(topRatedPosters);

	const movieCards = document.querySelectorAll(".movieCard");

	topRated.forEach((movie, index) => {
		if (movieCards[index]) {
			const img = movieCards[index].querySelector("img");
			img.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
			img.alt = movie.title;

			const title = movieCards[index].querySelector(".card-title");
			title.textContent = movie.title;

			const description = movieCards[index].querySelector(".card-text");
			description.textContent = movie.overview.slice(0, 30) + "...";
		}
	});
})();

// Home Page: Popular section

!(async function () {
	const url =
		"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmMyYWZhZDIwMGY4NDc5N2E2OWIwNGYyZDYwN2I3MCIsIm5iZiI6MTc1ODI5ODYzNy42MDUsInN1YiI6IjY4Y2Q4MjBkNjdiN2IzYzBjZDc0OGRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.coFHqAS4Zbt2JJhnbbiJ8IqeNHEm7HiILnm9VTzLDq8",
		},
	};
	const response = await fetch(url, options);
	const data = await response.json();

	console.log(data);

	const popular = data.results.slice(0, 4);

	console.log(popular);

	const popularPosters = popular
		.filter((movie) => movie.poster_path)
		.map((movie) => `https://image.tmdb.org/t/p/original${movie.poster_path}`);

	console.log(popularPosters);

	const movieCards = document.querySelectorAll(".movieCardPopular");

	popular.forEach((movie, index) => {
		if (movieCards[index]) {
			const img = movieCards[index].querySelector("img");
			img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
			img.alt = movie.title;

			const title = movieCards[index].querySelector(".card-title");
			title.textContent = movie.title;

			const description = movieCards[index].querySelector(".card-text");
			description.textContent = movie.overview.slice(0, 30) + "...";
		}
	});
})();
