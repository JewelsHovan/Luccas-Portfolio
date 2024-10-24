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

    // Optimize AOS initialization
    if (typeof AOS !== 'undefined') {
        // Defer AOS initialization
        requestIdleCallback(() => {
            AOS.init({
                duration: 800, // Animation duration in milliseconds
                once: true,     // Whether animation should happen only once while scrolling down
                offset: 200,    // Offset (in px) from the original trigger point
            });
        });
    }

    // Optimize image loading with Intersection Observer
    function handleImageLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const img = item.querySelector('img');
                    const dataUrl = item.dataset.url;
                    
                    item.classList.add('loading');
                    img.src = dataUrl;
                    
                    img.onload = () => item.classList.remove('loading');
                    img.onerror = () => {
                        item.classList.remove('loading');
                        img.src = 'path/to/fallback-image.jpg';
                    };
                    
                    observer.unobserve(item);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('.gallery-item').forEach(item => {
            imageObserver.observe(item);
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

        // Optimize form validation
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        const validateInput = debounce((input) => {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (input.required && !input.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'This field is required';
            } else {
                formGroup.classList.remove('error');
                errorMessage.textContent = '';
            }
        }, 150);

        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => validateInput(input));
        });
    }
});
