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

    // Initialize Swiper Carousel
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.gallery-swiper', {
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // Mobile S (320px)
                320: {
                    slidesPerView: 1,
                    centeredSlides: true
                },
                // Mobile M (375px)
                375: {
                    slidesPerView: 1,
                    centeredSlides: true
                },
                // Mobile L (425px)
                425: {
                    slidesPerView: 1,
                    centeredSlides: false
                },
                // Tablet and above
                768: {
                    slidesPerView: 'auto',
                    centeredSlides: true
                }
            }
        });

        function handleImageLoading() {
            const slides = document.querySelectorAll('.gallery-item');
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                slide.classList.add('loading');
                
                img.onload = () => {
                    slide.classList.remove('loading');
                };
                
                img.onerror = () => {
                    slide.classList.remove('loading');
                    img.src = 'path/to/fallback-image.jpg'; // Add a fallback image
                };
            });
        }
    }

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
