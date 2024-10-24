// Category configuration
const CATEGORIES = [
    "Drawing",
    "Painting",
    "Collage",
    "Photography",
    "Prints"
];

// Initialize the page
function initializeCollections(retryCount = 0) {
    const MAX_RETRIES = 5;
    
    if (typeof window.supabaseClient === 'undefined') {
        if (retryCount >= MAX_RETRIES) {
            console.error('Failed to initialize Supabase client');
            return;
        }
        setTimeout(() => initializeCollections(retryCount + 1), 200);
        return;
    }
    
    // Load all categories
    CATEGORIES.forEach(loadCategoryArtwork);
    initializeCategoryNavigation();
}

async function loadCategoryArtwork(category) {
    const sectionId = category.toLowerCase();
    const artworkGrid = document.getElementById(`${sectionId}-grid`);
    
    if (!artworkGrid) return;
    
    try {
        const { data, error } = await supabaseClient
            .from('artwork')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Clear loading state
        artworkGrid.innerHTML = '';

        if (data.length === 0) {
            artworkGrid.innerHTML = `
                <div class="empty-state">
                    <p>No ${category} pieces found.</p>
                </div>
            `;
            return;
        }

        // Create artwork items
        data.forEach(item => {
            const artworkItem = createArtworkItem(item);
            artworkGrid.appendChild(artworkItem);
        });

        // Refresh AOS animations
        AOS.refresh();

    } catch (error) {
        console.error(`Error loading ${category}:`, error);
        artworkGrid.innerHTML = `
            <div class="error-message">
                <p>Error loading ${category}. Please try again later.</p>
            </div>
        `;
    }
}

function createArtworkItem(item) {
    const article = document.createElement('article');
    article.className = 'artwork-item';
    article.setAttribute('data-aos', 'fade-up');

    // Truncate description to 100 characters
    const truncatedDescription = item.description?.length > 100 
        ? item.description.substring(0, 100) + '...' 
        : item.description || '';

    article.innerHTML = `
        <div class="artwork-image">
            <img src="${item.url}" alt="${item.title}" loading="lazy">
            <div class="artwork-overlay">
                <button class="view-details" aria-label="View details">
                    <span>View Details</span>
                </button>
            </div>
        </div>
        <div class="artwork-info">
            <h3 class="artwork-title">${item.title}</h3>
            <p class="artwork-description">${truncatedDescription}</p>
            <div class="artwork-metadata">
                <span class="artwork-year">${new Date(item.created_at).getFullYear()}</span>
                <span class="artwork-medium">${item.medium}</span>
                ${item.dimensions ? `<span class="artwork-dimensions">${item.dimensions}</span>` : ''}
            </div>
        </div>
    `;

    // Add click handler for the entire card
    article.addEventListener('click', () => {
        showArtworkModal(item);
    });

    return article;
}

function initializeCategoryNavigation() {
    const navLinks = document.querySelectorAll('.category-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCollections);

// Add this function to handle the modal
function showArtworkModal(item) {
    const modal = document.createElement('div');
    modal.className = 'artwork-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" aria-label="Close modal">&times;</button>
            <div class="modal-image">
                <img src="${item.url}" alt="${item.title}">
            </div>
            <div class="modal-info">
                <h2>${item.title}</h2>
                <p class="modal-description">${item.description || ''}</p>
                <div class="modal-metadata">
                    <span>${new Date(item.created_at).getFullYear()}</span>
                    <span>${item.medium}</span>
                    ${item.dimensions ? `<span>${item.dimensions}</span>` : ''}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal handlers
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}

// Add this to your existing code
function handleCategoryNavVisibility() {
    const categoryNav = document.querySelector('.category-nav');
    const footer = document.querySelector('footer');
    
    window.addEventListener('scroll', () => {
        // Handle footer visibility on mobile only
        if (footer && window.innerWidth <= 768) {
            const footerRect = footer.getBoundingClientRect();
            const isNearFooter = footerRect.top <= window.innerHeight;
            categoryNav.classList.toggle('near-footer', isNearFooter);
        }
    });
}

// Add this to your initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeCollections();
    handleCategoryNavVisibility(); // Keep this for the footer visibility
});
