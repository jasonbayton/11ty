const fetch = require('node-fetch');

module.exports = async function() {
    const url = 'https://bayton.netlify.app/.netlify/functions/fetch-devices';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching devices:', error);
        return {};
    }
};