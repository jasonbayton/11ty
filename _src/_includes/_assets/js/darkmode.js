try {
    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (storedTheme) {
        // Validate the theme value
        if (['dark', 'light'].includes(storedTheme)) {
            document.documentElement.setAttribute('data-theme', storedTheme);
            document.documentElement.classList.add('js-theme-applied');
        } else {
            console.warn(`Unexpected theme value: ${storedTheme}`);
        }
    }
} catch (error) {
    // Handle any errors accessing localStorage or matchMedia
    console.error('Error applying theme', error);
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.add('js-theme-applied');
});
