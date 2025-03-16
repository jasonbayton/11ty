if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data) {
        if (event.data.type === 'NEW_CONTENT_AVAILABLE') {
            console.log('New content available at:', event.data.url);
            // Optionally, update the UI automatically or notify the user.
            // e.g., re-fetch specific content or trigger a UI refresh.
        } else if (event.data.type === 'NEW_DATA_AVAILABLE') {
            console.log('New API data available at:', event.data.url);
            // Update the relevant parts of your app's UI with fresh data.
        }
        }
    });
}