document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Menu Toggle Functionality
    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent this click from immediately closing the menu
        navLinks.classList.toggle('show');
    });

    // Close the menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('show');
        }
    });

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Animation duration in milliseconds
            once: true,     // Whether animation should happen only once while scrolling down
            offset: 200,    // Offset (in px) from the original trigger point
        });
    }

    // Handle image loading for gallery items
    function handleImageLoading() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            item.classList.add('loading');
            
            img.onload = () => {
                item.classList.remove('loading');
            };
            
            img.onerror = () => {
                item.classList.remove('loading');
                img.src = 'path/to/fallback-image.jpg'; // Add a fallback image
            };
        });
    }

    // Initialize image loading handling
    handleImageLoading();

    // Contact Form Handling - Only run if form exists
    const form = document.querySelector('.contact-form');
    if (form) {
        const submitBtn = form.querySelector('.submit-btn');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                if (!input.value.trim()) {
                    isValid = false;
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'This field is required';
                } else {
                    formGroup.classList.remove('error');
                    errorMessage.textContent = '';
                }
            });
            
            if (!isValid) return;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            
            try {
                // Submit the form
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    // Success message
                    form.reset();
                    submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error message
                submitBtn.querySelector('.btn-text').textContent = 'Error! Try Again';
                submitBtn.disabled = false;
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                }, 3000);
            }
        });

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                const formGroup = this.closest('.form-group');
                const errorMessage = formGroup.querySelector('.error-message');
                
                if (this.required && !this.value.trim()) {
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'This field is required';
                } else {
                    formGroup.classList.remove('error');
                    errorMessage.textContent = '';
                }
            });
        });
    }
});
