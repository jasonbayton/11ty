// script.js
document.addEventListener('DOMContentLoaded', () => {
    const words = ['package names', 'target API (Android) versions', 'application versions', 'Play Store listings', 'application version codes', 'date last updated', 'install types', 'device SPL level'];
    const element = document.getElementById('dynamic_word');
    let index = 0;

    function changeWord() {
        element.style.opacity = 0; // Fade out
        setTimeout(() => {
            element.textContent = words[index];
            element.style.opacity = 1; // Fade in
            index = (index + 1) % words.length;
        }, 500); // Adjust the fade-out time to match your CSS transition
    }

    setInterval(changeWord, 2000); // Change word every 2 seconds
});