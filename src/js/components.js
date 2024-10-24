// Header Component
class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="header-content">
                    <h1><a href="index.html">LuccasBooth</a></h1>
                    <nav>
                        <button id="menu-toggle" aria-label="Toggle navigation menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <ul class="nav-links" id="nav-links">
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="collections.html">Collections</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;

        this.setupNavigation();
    }

    setupNavigation() {
        const menuToggle = this.querySelector('#menu-toggle');
        const navLinks = this.querySelector('#nav-links');
        
        // Toggle mobile menu
        menuToggle?.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Set active page
        const currentPage = window.location.pathname.split('/').pop() || 'home.html';
        const links = this.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Footer Component
class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer id="footer" data-aos="fade-up">
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-about">
                            <h3>About Luccas</h3>
                            <p>
                                I'm Luccas, I work in the art handler field, I am a passionate artist, I graduated from University of New Hampshire in fine arts and love traveling!
                            </p>
                        </div>
                        
                        <div class="footer-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="index.html" data-aos="fade-up" data-aos-delay="100">Home</a></li>
                                <li><a href="about.html" data-aos="fade-up" data-aos-delay="200">About</a></li>
                                <li><a href="collections.html" data-aos="fade-up" data-aos-delay="300">Collections</a></li>
                                <li><a href="contact.html" data-aos="fade-up" data-aos-delay="400">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-contact">
                            <h3>Contact</h3>
                            <p>Email: <a href="mailto:lmsbart99@gmail.com">lmsbart99@gmail.com</a></p>
                            <p>Phone: <a href="tel:+16037697522">(603) 769-7522</a></p>
                        </div>
                        
                        <div class="footer-social">
                            <h3>Follow Me</h3>
                            <div class="social-icons">
                                <a href="https://www.facebook.com/luccas.booth.3" target="_blank" aria-label="Facebook" data-aos="fade-up" data-aos-delay="500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--secondary-color)" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z"/>
                                    </svg>
                                </a>
                                <a href="https://www.twitter.com/" target="_blank" aria-label="Twitter" data-aos="fade-up" data-aos-delay="600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--secondary-color)" viewBox="0 0 24 24">
                                        <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.574 4.897 4.897 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224 0.084 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54 13.94 13.94 0 0 0 7.548 21c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0 0 24 4.557z"/>
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/luccasbooth/" target="_blank" aria-label="Instagram" data-aos="fade-up" data-aos-delay="700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--secondary-color)" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.003.24 2.467.405a4.92 4.92 0 0 1 1.675 1.09 4.92 4.92 0 0 1 1.09 1.674c.165.464.349 1.261.405 2.467.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.24 2.003-.405 2.467a4.902 4.902 0 0 1-1.09 1.675 4.902 4.902 0 0 1-1.674 1.09c-.464.165-1.261.349-2.467.405-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.003-.24-2.467-.405a4.92 4.92 0 0 1-1.675-1.09 4.92 4.92 0 0 1-1.09-1.674c-.165-.464-.349-1.261-.405-2.467C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.206.24-2.003.405-2.467A4.902 4.902 0 0 1 3.737 3.08 4.902 4.902 0 0 1 5.412 1.41c.464-.165 1.261-.349 2.467-.405C8.416 1.175 8.796 1.163 12 1.163zm0-1.163C8.741 0 8.332.012 7.052.07 5.771.128 4.77.342 3.985.667a6.918 6.918 0 0 0-2.496 1.643A6.918 6.918 0 0 0 .667 4.806c-.325.785-.539 1.786-.597 3.067C.012 8.332 0 8.741 0 12s.012 3.668.07 4.948c.058 1.281.272 2.282.597 3.067a6.918 6.918 0 0 0 1.643 2.496 6.918 6.918 0 0 0 2.496 1.643c.785.325 1.786.539 3.067.597C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.282-.272 3.067-.597a6.918 6.918 0 0 0 2.496-1.643 6.918 6.918 0 0 0 1.643-2.496c.325-.785.539-1.786.597-3.067.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.058-1.281-.272-2.282-.597-3.067a6.918 6.918 0 0 0-1.643-2.496A6.918 6.918 0 0 0 20.013.667c-.785-.325-1.786-.539-3.067-.597C15.668.012 15.259 0 12 0z"/>
                                        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/>
                                        <circle cx="18.406" cy="5.594" r="1.44"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; 2024 Luccas Booth. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Register the custom elements
customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
