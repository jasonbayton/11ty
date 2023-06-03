try {
    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (storedTheme) {
        // Validate the theme value
        if (['dark', 'light'].includes(storedTheme)) {
            document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
            console.warn(`Unexpected theme value: ${storedTheme}`);
        }
    }
} catch (error) {
    // Handle any errors accessing localStorage or matchMedia
    console.error('Error applying theme', error);
}
