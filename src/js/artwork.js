// Wait for both DOM and Supabase to be ready
function initializeArtwork(retryCount = 0) {
    const MAX_RETRIES = 5; // Maximum number of retry attempts
    
    if (typeof window.supabaseClient === 'undefined') {
        if (retryCount >= MAX_RETRIES) {
            console.error('Failed to initialize Supabase client after multiple attempts');
            document.getElementById('artwork-grid').innerHTML = `
                <div class="error-message">
                    <p>Failed to load artwork. Please refresh the page and try again.</p>
                </div>
            `;
            return;
        }
        
        console.warn(`Supabase client not initialized. Retry attempt ${retryCount + 1}/${MAX_RETRIES}...`);
        setTimeout(() => initializeArtwork(retryCount + 1), 200); // Increase delay between retries
        return;
    }
    
    loadArtwork();
}

async function loadArtwork() {
    const artworkGrid = document.getElementById('artwork-grid');
    
    try {
        // Use the global supabaseClient instead of supabase
        const { data, error } = await supabaseClient
            .from('artwork')
            .select('*')
            .order('created_at', { ascending: false });

        // Handle Supabase-specific errors
        if (error) {
            console.error('Supabase error:', error.message);
            artworkGrid.innerHTML = `
                <div class="error-message">
                    <p>Error: ${error.message}</p>
                </div>
            `;
            return;
        }

        // Clear loading spinner
        artworkGrid.innerHTML = '';

        if (data.length === 0) {
            artworkGrid.innerHTML = `
                <div class="empty-state">
                    <p>No artwork found.</p>
                </div>
            `;
            return;
        }

        // Create artwork items
        data.forEach(item => {
            const artworkItem = createArtworkItem(item);
            artworkGrid.appendChild(artworkItem);
        });

        // Reinitialize AOS for new elements
        AOS.refresh();

    } catch (networkError) {
        // Handle network or other unexpected errors
        console.error('Network error:', networkError);
        artworkGrid.innerHTML = `
            <div class="error-message">
                <p>Network error. Please check your connection and try again.</p>
            </div>
        `;
    }
}

function createArtworkItem(item) {
    const article = document.createElement('article');
    article.className = 'artwork-item';
    article.setAttribute('data-aos', 'fade-up');

    article.innerHTML = `
        <div class="artwork-image">
            <img src="${item.url}" alt="${item.title}">
        </div>
        <div class="artwork-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="artwork-metadata">
                <span>${new Date(item.created_at).getFullYear()}</span>
                <span>${item.medium}</span>
            </div>
        </div>
    `;

    return article;
}

// Update the event listener to use the new initialization function
document.addEventListener('DOMContentLoaded', initializeArtwork);
