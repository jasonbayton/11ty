const fs = require('fs');
const path = require('path');

// Adjust the path to match your project structure
const logoDirectory = path.resolve(__dirname, '../_includes/_assets/img/logos');

let logos = fs.readdirSync(logoDirectory).map(file => `/img/logos/${file}`);

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomly select 8 logos
let selectedLogos = [];
for (let i = 0; i < 21; i++) {
    let index = getRandomInt(0, logos.length - 1);
    selectedLogos.push(logos[index]);
    logos.splice(index, 1);  // Remove the selected logo from the array to avoid duplicates
}

module.exports = selectedLogos;


