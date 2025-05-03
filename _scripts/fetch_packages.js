const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function fetchAndSavePackages() {
    const devicesUrl = 'https://ping-dir.projects.bayton.org/items/device_packages';
    const token = process.env.PINGDIR_API;
    const outputPath = path.join(__dirname, '../_src/_data', 'packages.json');

    
