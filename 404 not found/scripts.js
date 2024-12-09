document.addEventListener("DOMContentLoaded", () => {
    const downArrow = document.getElementById("down-arrow");
    const coinSound = document.getElementById("coin-sound");

    downArrow.addEventListener("click", () => {
        // Play the coin sound
        coinSound.play();

        // Drop two coins
        dropCoins();
    });

    function dropCoins() {
        // Coin 1
        const coin1 = document.createElement("div");
        coin1.classList.add("coin");
        document.body.appendChild(coin1);

        // Coin 2
        const coin2 = document.createElement("div");
        coin2.classList.add("coin");
        document.body.appendChild(coin2);

        // Position the coins relative to the down arrow
        const arrowRect = downArrow.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const initialY = arrowRect.bottom; // Start just below the down arrow
        const dropDistance = viewportHeight * 0.2; // 60% of the viewport height

        // Set initial positions
        coin1.style.left = `${arrowRect.left + arrowRect.width / 2 - 100}px`;
        coin1.style.top = `${initialY}px`;

        coin2.style.left = `${arrowRect.left + arrowRect.width / 2 + 70}px`;
        coin2.style.top = `${initialY}px`;

        // Animate the coins
        setTimeout(() => {
            coin1.style.transition = "transform 2s ease, opacity 2s ease";
            coin1.style.transform = `translateY(${dropDistance}px)`;
            coin1.style.opacity = 1;

            coin2.style.transition = "transform 2s ease, opacity 2s ease";
            coin2.style.transform = `translateY(${dropDistance}px)`;
            coin2.style.opacity = 1;
        }, 10);

        // Remove coins after animation
        setTimeout(() => {
            coin1.remove();
            coin2.remove();
        }, 2000); // Match the animation duration (2s)

        // Redirect to the main page after 2 seconds
        setTimeout(() => {
            window.location.href = "index.html"; // Replace with your main page URL
        }, 2000);
    }
});
