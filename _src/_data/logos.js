const fs = require('fs');
const path = require('path');

// Adjust the path to match your project structure
const logoDirectory = path.resolve(__dirname, '../_includes/_assets/img/logos');

const logos = fs.readdirSync(logoDirectory).map(file => `/img/logos/${file}`);

module.exports = logos;

