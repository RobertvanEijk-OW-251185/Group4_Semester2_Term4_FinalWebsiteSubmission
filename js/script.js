$(document).ready(function() {
    // Toggle between Sign In and Sign Up forms
    $('#signin-toggle').on('click', function() {
        $('#signin-form').addClass('active');
        $('#signup-form').removeClass('active');
        $('#signin-toggle').addClass('active');
        $('#signup-toggle').removeClass('active');
        $('.form-title').text('Sign In');
        $('.form-subtitle').text('Welcome back to Inclax.');
    });
    
    $('#signup-toggle').on('click', function() {
        $('#signup-form').addClass('active');
        $('#signin-form').removeClass('active');
        $('#signup-toggle').addClass('active');
        $('#signin-toggle').removeClass('active');
        $('.form-title').text('Sign Up');
        $('.form-subtitle').text('Join Inclax. today.');
    });
    
    // Sign Up Form Submission
    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#signup-name').val();
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        const confirmPassword = $('#signup-confirm-password').val();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate password length
        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        
        // Store user data in localStorage
        const userData = {
            name: name,
            email: email,
            password: password
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message and switch to sign in
        alert('Account created successfully! Please sign in.');
        $('#signin-toggle').click();
        
        // Clear form
        $('#signup-form')[0].reset();
    });
    
    // Sign In Form Submission
    $('#signin-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = $('#signin-email').val();
        const password = $('#signin-password').val();
        
        // Get stored user data
        const storedUserData = localStorage.getItem('userData');
        
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            
            // Check credentials
            if (email === userData.email && password === userData.password) {
                // Store user name in localStorage for later use
                localStorage.setItem('currentUserName', userData.name);
                
                // Show success message
                alert(`Welcome back, ${userData.name}!`);
                
                // In a real application, you would redirect to the main page
                // window.location.href = 'dashboard.html';
                
                // For demo purposes, just clear the form
                $('#signin-form')[0].reset();
            } else {
                alert('Invalid email or password!');
            }
        } else {
            alert('No account found with that email. Please sign up first.');
        }
    });
    
    // Check if there's a user already signed in
    const currentUserName = localStorage.getItem('currentUserName');
    if (currentUserName) {
        console.log(`User ${currentUserName} is currently signed in.`);
    }
});