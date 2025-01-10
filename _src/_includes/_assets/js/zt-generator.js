const excludedKeys = [
    "android.app.extra.PROVISIONING_WIFI_",
    "android.app.extra.PROVISIONING_DEVICE_ADMIN_",
    "android.app.extra.PROVISIONING_ROLE_HOLDER_"
];

// Function to filter JSON based on exclusion keys
const filterJsonPayload = (jsonData) => {
    const filteredJson = {};
    for (const [key, value] of Object.entries(jsonData)) {
        if (!excludedKeys.some(exclusion => key.startsWith(exclusion))) {
            filteredJson[key] = value;
        }
    }
    return filteredJson;
};

// Zero-Touch JSON Extraction (converts existing payload)
const extractZTJson = () => {
    const jsonInputElement = document.getElementById('json_input_extractor');
    const jsonOutputElement = document.getElementById('json_output_extractor');
    const errorMessageElement = document.getElementById('error_message_extractor');

    try {
        errorMessageElement.innerText = ''; 
        const inputJson = JSON.parse(jsonInputElement.value.trim());
        const filteredJson = filterJsonPayload(inputJson);
        jsonOutputElement.innerHTML = `<b>Generated JSON</b><pre class="language-json"><code class="language-json">${JSON.stringify(filteredJson, null, 2)}</code></pre>`;
    } catch (error) {
        errorMessageElement.innerText = 'Invalid JSON. Please ensure the JSON is present & properly formatted.';
    }
};

// Zero-Touch JSON Generator (creates a new payload)
const generateZTJson = () => {
    const qrElements = document.querySelectorAll('[data-qr-key]');
    let qrData = {};
    const errorMessageElement = document.getElementById('error_message_generator');
    if (errorMessageElement) errorMessageElement.innerText = '';

    let invalidInputDetected = false;

    qrElements.forEach((el) => {
        let key = el.dataset.qrKey;
        let value;

        if (el.hasAttribute('data-qr-bool')) {
            if (el.checked) qrData[key] = el.checked;
        } else if (el.tagName === 'TEXTAREA') {
            value = el.value.trim();
            if (value === "") return;
            try {
                const wrappedValue = `{"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{${value}}}`;
                const parsedValue = JSON.parse(wrappedValue);
                if (Object.keys(parsedValue).length > 0) {
                    qrData[key] = parsedValue["android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE"];
                }
            } catch (error) {
                console.error('Invalid JSON:', error);
                errorMessageElement.innerText = `Invalid JSON in "${key}".`;
                invalidInputDetected = true;
            }
        } else {
            value = el.value.trim();
            if (value !== '') {
                qrData[key] = value;
            }
        }
    });

    if (invalidInputDetected) {
        console.error("QR generation halted due to errors.");
        return;
    }

    const jsonOutputElement = document.getElementById('json_output_generator');
    jsonOutputElement.innerHTML = `<b>Generated JSON</b><pre class="language-json"><code class="language-json">${JSON.stringify(qrData, null, 2)}</code></pre>`;
};

// Event listeners for both buttons
document.getElementById('generate_json').addEventListener('click', generateZTJson);
document.getElementById('convert_json').addEventListener('click', extractZTJson);

