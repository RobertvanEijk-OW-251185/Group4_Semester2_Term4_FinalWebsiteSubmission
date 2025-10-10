$(document).ready(function() {
    // Custom Alert System
    function showAlert(title, message, type = 'info') {
        const alert = $('#custom-alert');
        const alertIcon = alert.find('.alert-icon');
        const alertTitle = alert.find('.alert-title');
        const alertMessage = alert.find('.alert-message');
        
        // Set content
        alertTitle.text(title);
        alertMessage.text(message);
        
        // Set icon and color based on type
        alertIcon.removeClass('success error warning info');
        switch(type) {
            case 'success':
                alertIcon.addClass('success').html('✓');
                break;
            case 'error':
                alertIcon.addClass('error').html('✕');
                break;
            case 'warning':
                alertIcon.addClass('warning').html('!');
                break;
            case 'info':
                alertIcon.addClass('info').html('i');
                break;
        }
        
        // Show alert
        alert.addClass('show');
    }
    
    // Close alert
    $('.alert-close-btn').on('click', function() {
        $('#custom-alert').removeClass('show');
    });
    
    // Close alert when clicking outside
    $('#custom-alert').on('click', function(e) {
        if (e.target === this) {
            $(this).removeClass('show');
        }
    });
    
    // Form toggle functionality
    $('#switch-to-signup').on('click', function(e) {
        e.preventDefault();
        switchToSignUp();
    });
    
    $('#switch-to-signin').on('click', function(e) {
        e.preventDefault();
        switchToSignIn();
    });
    
    function switchToSignIn() {
        $('#signin-form').addClass('active');
        $('#signup-form').removeClass('active');
        clearValidationMessages();
    }
    
    function switchToSignUp() {
        $('#signup-form').addClass('active');
        $('#signin-form').removeClass('active');
        clearValidationMessages();
    }
    
    // Clear validation messages
    function clearValidationMessages() {
        $('.error-message').hide();
        $('.success-message').hide();
        $('.warning-message').hide();
        $('.info-message').hide();
    }
    
    // Phone number formatting (9 digits for South Africa)
    $('input[type="tel"]').on('input', function() {
        let phone = $(this).val().replace(/\D/g, '');
        if (phone.length > 9) {
            phone = phone.substring(0, 9);
        }
        $(this).val(phone);
    });
    
    // Real-time password confirmation validation
    $('#signup-confirm-password').on('input', function() {
        const password = $('#signup-password').val();
        const confirmPassword = $(this).val();
        
        if (confirmPassword && password !== confirmPassword) {
            showValidationMessage($('#signup-confirm-password-error'), 'Passwords do not match', 'error');
        } else if (confirmPassword && password === confirmPassword) {
            showValidationMessage($('#signup-confirm-password-error'), 'Passwords match!', 'success');
        } else {
            $('#signup-confirm-password-error').hide();
        }
    });
    
    // Real-time password length validation
    $('#signup-password').on('input', function() {
        const password = $(this).val();
        
        if (password && password.length < 6) {
            showValidationMessage($('#signup-password-error'), 'Password must be at least 6 characters', 'error');
        } else if (password && password.length >= 6) {
            showValidationMessage($('#signup-password-error'), 'Password strength: Good', 'success');
        } else {
            $('#signup-password-error').hide();
        }
    });
    
    // Phone number validation (9 digits)
    $('input[type="tel"]').on('blur', function() {
        const phone = $(this).val();
        if (phone && phone.length !== 9) {
            const errorId = $(this).attr('id') + '-error';
            $('#' + errorId).text('South African number must be 9 digits').show();
        }
    });
    
    // Show validation message
    function showValidationMessage(element, message, type = 'error') {
        element.removeClass('error-message warning-message success-message info-message');
        
        switch(type) {
            case 'error':
                element.addClass('error-message');
                break;
            case 'warning':
                element.addClass('warning-message');
                break;
            case 'success':
                element.addClass('success-message');
                break;
            case 'info':
                element.addClass('info-message');
                break;
        }
        
        element.text(message).show();
    }
    
    // Sign Up Form Submission
    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        
        clearValidationMessages();
        
        const username = $('#signup-username').val();
        const phone = $('#signup-phone').val();
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        const confirmPassword = $('#signup-confirm-password').val();
        
        let isValid = true;
        
        // Validate username
        if (!username) {
            showValidationMessage($('#signup-username-error'), 'Username is required', 'error');
            isValid = false;
        } else if (username.length < 3) {
            showValidationMessage($('#signup-username-error'), 'Username must be at least 3 characters', 'error');
            isValid = false;
        }
        
        // Validate phone (9 digits for South Africa)
        if (!phone) {
            showValidationMessage($('#signup-phone-error'), 'Phone number is required', 'error');
            isValid = false;
        } else if (phone.length !== 9) {
            showValidationMessage($('#signup-phone-error'), 'South African number must be 9 digits', 'error');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showValidationMessage($('#signup-email-error'), 'Email is required', 'error');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showValidationMessage($('#signup-email-error'), 'Please enter a valid email address', 'error');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showValidationMessage($('#signup-password-error'), 'Password is required', 'error');
            isValid = false;
        } else if (password.length < 6) {
            showValidationMessage($('#signup-password-error'), 'Password must be at least 6 characters', 'error');
            isValid = false;
        }
        
        // Validate password confirmation
        if (!confirmPassword) {
            showValidationMessage($('#signup-confirm-password-error'), 'Please confirm your password', 'error');
            isValid = false;
        } else if (password !== confirmPassword) {
            showValidationMessage($('#signup-confirm-password-error'), 'Passwords do not match', 'error');
            isValid = false;
        }
        
        // Check terms
        if (!$('#terms').is(':checked')) {
            showAlert('Terms Required', 'You must agree to the Terms of Service and Privacy Policy!', 'warning');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Store user data with username
        const userData = {
            username: username,
            phone: '+27' + phone,
            email: email,
            password: password
        };
        
        localStorage.setItem('moviesUser', JSON.stringify(userData));
        
        // Show personalized success message in custom alert
        showAlert(
            'Welcome to Movies!', 
            `Hello ${username}! Your account has been created successfully. You can now sign in and start enjoying unlimited movies and TV shows.`,
            'success'
        );
        
        switchToSignIn();
        $('#signup-form')[0].reset();
    });
    
    // Sign In Form Submission
    $('#signin-form').on('submit', function(e) {
        e.preventDefault();
        
        clearValidationMessages();
        
        const username = $('#signin-username').val();
        const password = $('#signin-password').val();
        
        let isValid = true;
        
        // Validate username
        if (!username) {
            showValidationMessage($('#signin-username-error'), 'Username is required', 'error');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showValidationMessage($('#signin-password-error'), 'Password is required', 'error');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Check credentials
        const storedUser = localStorage.getItem('moviesUser');
        
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            
            if (username === userData.username && password === userData.password) {
                // Store session with username
                localStorage.setItem('moviesCurrentUser', JSON.stringify({
                    username: userData.username,
                    phone: userData.phone,
                    email: userData.email
                }));
                
                // Remember me
                if ($('#remember-me').is(':checked')) {
                    localStorage.setItem('moviesRememberMe', 'true');
                } else {
                    localStorage.removeItem('moviesRememberMe');
                }
                
                // Show personalized welcome back message in custom alert
                showAlert(
                    'Welcome Back!',
                    `Great to see you again, ${userData.username}! Your movie journey continues with unlimited entertainment.`,
                    'success'
                );
                
                $('#signin-form')[0].reset();
                
                // Redirect to dashboard in real app
                // window.location.href = 'dashboard.html';
            } else {
                showAlert('Login Failed', 'Invalid username or password! Please try again.', 'error');
            }
        } else {
            showAlert('Account Not Found', 'No account found with that username. Please sign up first to create your Movies account.', 'info');
        }
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Check for existing session
    const currentUser = localStorage.getItem('moviesCurrentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        console.log(`User ${user.username} is currently signed in.`);
    }
    
    // Pre-fill username if remember me was checked
    const rememberMe = localStorage.getItem('moviesRememberMe');
    if (rememberMe === 'true' && currentUser) {
        const userData = JSON.parse(localStorage.getItem('moviesUser'));
        if (userData) {
            $('#signin-username').val(userData.username);
            $('#remember-me').prop('checked', true);
        }
    }
});