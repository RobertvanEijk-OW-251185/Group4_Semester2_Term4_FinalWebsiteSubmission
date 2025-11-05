// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMW8UOden32cEaZnKqkPdCfnYraWF3Ims",
    authDomain: "dv-intro-class.firebaseapp.com",
    projectId: "dv-intro-class",
    storageBucket: "dv-intro-class.firebasestorage.app",
    messagingSenderId: "966992991363",
    appId: "1:966992991363:web:2499c204c19d14967cf7b6",
    measurementId: "G-WCKZ3XT8GG"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// Sign Up Form
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    let confirmPassword = document.getElementById('signup-confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        // Store user info for welcome message
        localStorage.setItem("userName", email);
        // Switch to sign in form
        document.getElementById("signup-form").classList.remove("active");
        document.getElementById("signin-form").classList.add("active");
        document.getElementById("signup-form").reset();
    } catch (error) {
        alert(error.message);
    }
});

// Sign In Form
document.getElementById("signin-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let email = document.getElementById('signin-email').value;
    let password = document.getElementById('signin-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        // Store user info for welcome message
        localStorage.setItem("userName", email);
        window.location.href = "../index.html"; // Redirect to homepage
    } catch (error) {
        alert(error.message);
    }
});

// Google Sign In
document.getElementById("google-signin-btn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert("Google login successful!");
        localStorage.setItem("userName", user.email || user.displayName);
        window.location.href = "../index.html"; // Redirect to homepage
    } catch (error) {
        alert(error.message);
    }
});

// Google Sign Up
document.getElementById("google-signup-btn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert("Google registration successful!");
        localStorage.setItem("userName", user.email || user.displayName);
        window.location.href = "../index.html"; // Redirect to homepage
    } catch (error) {
        alert(error.message);
    }
});