document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    fetchCategory('ammos', 'ammos-container', 'https://eldenring.fanapis.com/api/ammos');
    fetchCategory('armors', 'armors-container', 'https://eldenring.fanapis.com/api/armors');
    fetchCategory('ashes', 'ashes-container', 'https://eldenring.fanapis.com/api/ashes');
    fetchCategory('bosses', 'bosses-container', 'https://eldenring.fanapis.com/api/bosses');
    fetchCategory('classes', 'classes-container', 'https://eldenring.fanapis.com/api/classes');
    fetchCategory('creatures', 'creatures-container', 'https://eldenring.fanapis.com/api/creatures');
    fetchCategory('incantations', 'incantations-container', 'https://eldenring.fanapis.com/api/incantations');
    fetchCategory('items', 'items-container', 'https://eldenring.fanapis.com/api/items');
    fetchCategory('locations', 'locations-container', 'https://eldenring.fanapis.com/api/locations');
    fetchCategory('NPCs', 'NPCs-container', 'https://eldenring.fanapis.com/api/npcs');
    fetchCategory('shields', 'shields-container', 'https://eldenring.fanapis.com/api/shields');
    fetchCategory('sorceries', 'sorceries-container', 'https://eldenring.fanapis.com/api/sorceries');
    fetchCategory('spirits', 'spirits-container', 'https://eldenring.fanapis.com/api/spirits');
    fetchCategory('talismans', 'talismans-container', 'https://eldenring.fanapis.com/api/talismans');
    fetchCategory('weapons', 'weapons-container', 'https://eldenring.fanapis.com/api/weapons');
});

async function fetchCategory(categoryName, containerId, apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const { data } = await response.json();
        displayCategory(data, containerId, categoryName);
    } catch (error) {
        console.error(`Failed to fetch ${categoryName}:`, error);
    }
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', function (e) {
    const searchQuery = e.target.value.toLowerCase();

    // Get all items from the containers
    const items = document.querySelectorAll('.ammos-card, .armors-card, .ashes-card, .bosses-card, .classes-card, .creatures-card, .incantations-card, .items-card, .locations-card, .NPCs-card, .shields-card, .sorceries-card, .spirits-card, .talismans-card, .weapons-card');

    // Loop through each item and hide those that don't match the search query
    items.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        if (itemName.includes(searchQuery)) {
            item.style.display = 'block'; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    });
});

function displayCategory(items, containerId, categoryName) {
    const container = document.getElementById(containerId);
    const cardsHtml = items.map(item => {
        const imageSrc = item.image || 'assets/images/placeholder.png'; // Fallback image if not available
        const description = item.description || 'No description available.'; // Fallback description
        return `
            <div class="${categoryName}-card">
                <img src="${imageSrc}" alt="${item.name}" class="${categoryName}-image">
                <h3>${item.name}</h3>
                <p>${description}</p>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHtml;
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (event) {
        // Stop any currently playing music
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(audio => {
            audio.pause(); // Stop any audio that is playing
            audio.currentTime = 0; // Reset audio to the beginning
        });

        // Get the corresponding audio element based on the link's data-music attribute
        const musicId = this.getAttribute('data-music');
        const audio = document.getElementById(musicId);

        // Play the selected audio
        if (audio) {
            audio.play();
        }
    });
});

// Mute button toggle functionality
const muteButton = document.getElementById('mute-btn');
let isMuted = false;

// Add event listener to mute button
muteButton.addEventListener('click', () => {
    // Get all audio elements on the page
    const allAudios = document.querySelectorAll('audio');

    // Toggle mute state
    isMuted = !isMuted;

    // Mute or unmute all audio elements
    allAudios.forEach(audio => {
        audio.muted = isMuted;
    });

    // Change button text based on mute state
    muteButton.textContent = isMuted ? '🔇' : '🔊';
});
