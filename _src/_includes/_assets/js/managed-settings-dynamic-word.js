// script.js
document.addEventListener('DOMContentLoaded', () => {
    const words = ['configuring VPN', 'changing language settings', 'collecting system logs', 'viewing work policy information', 'managing connected accessories', 'adjusting date & time', 'granting accessibility settings', 'configuring device updates', 'adjusting display settings', 'viewing device identifiers', 'viewing Android version', 'adjusting network settings', 'viewing OS version', 'adjusting mobile network settings', 'adding a Wi-Fi network'];
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