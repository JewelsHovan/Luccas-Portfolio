document.addEventListener('DOMContentLoaded', async function() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    try {
        const { data: artworks, error } = await supabaseClient
            .from('artwork')
            .select('*');

        if (error) throw error;

        galleryItems.forEach(item => {
            const url = item.dataset.url;
            const artwork = artworks.find(art => art.url === url);

            if (artwork) {
                const img = item.querySelector('.gallery-image');
                const title = item.querySelector('h3');
                const description = item.querySelector('p');

                img.src = artwork.url;
                img.alt = artwork.title;
                title.textContent = artwork.title;
                description.textContent = `${artwork.medium}, ${new Date(artwork.created_at).getFullYear()}`;
            }
        });

        initializeViewMoreButtons(); // Ensure this is called after setting up the gallery
    } catch (error) {
        console.error('Error fetching artworks:', error);
    }
});

function initializeViewMoreButtons() {
    const viewMoreButtons = document.querySelectorAll('.view-more');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', async function(event) {
            event.preventDefault();
            const galleryItem = this.closest('.gallery-item');
            const imgSrc = galleryItem.querySelector('img').src;

            try {
                const { data, error } = await supabaseClient
                    .from('artwork')
                    .select('*')
                    .eq('url', imgSrc)
                    .single();

                if (error) throw error;

                showArtworkModal(data);
            } catch (error) {
                console.error('Error fetching artwork details:', error);
                alert('Failed to load artwork details. Please try again later.');
            }
        });
    });
}

function showArtworkModal(artwork) {
    const modal = document.createElement('div');
    modal.className = 'artwork-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" aria-label="Close modal">&times;</button>
            <div class="modal-image">
                <img src="${artwork.url}" alt="${artwork.title}">
            </div>
            <div class="modal-info">
                <h2>${artwork.title}</h2>
                <p class="modal-description">${artwork.description || 'No description available.'}</p>
                <div class="modal-metadata">
                    <span>${new Date(artwork.created_at).getFullYear()}</span>
                    <span>${artwork.medium}</span>
                    ${artwork.dimensions ? `<span>${artwork.dimensions}</span>` : ''}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add fade-in effect
    setTimeout(() => modal.classList.add('visible'), 10);

    // Close modal handlers
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('visible');
    setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }, 300); // Match this duration with the CSS transition
}
