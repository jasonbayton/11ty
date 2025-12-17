const dpcData = (typeof window !== 'undefined' && window.DPC_DATA) ? window.DPC_DATA : null;
const preConfiguredDPCs = (dpcData && dpcData.preConfiguredDPCs) ? dpcData.preConfiguredDPCs : {};
const vendorProfiles = (dpcData && dpcData.vendorProfiles) ? dpcData.vendorProfiles : {};

const resolveSelectedVendorToPayload = (vendorKey) => {
    const profile = vendorProfiles[vendorKey];
    const dpcKey = profile && profile.dpcKey ? profile.dpcKey : vendorKey;
    return preConfiguredDPCs[dpcKey] || null;
};

// Function to populate the form based on selected EMM vendor (or direct DPC key)
const populateFormFromDPC = (vendorKey) => {
    const selectedPayload = resolveSelectedVendorToPayload(vendorKey);
    if (!selectedPayload) return;

    // Populate the fields
    Object.entries(selectedPayload).forEach(([key, value]) => {
        const field = document.querySelector(`[data-qr-key="${key}"]`);
        if (field) {
            field.value = value;
        }
    });
};

// Event listener for DPC selection (with null check)
const dpcSelectorElement = document.getElementById('dpc_selector');
if (dpcSelectorElement) {
    dpcSelectorElement.addEventListener('change', (event) => {
    const selectedVendor = event.target.value;
    populateFormFromDPC(selectedVendor);
});
} else {
    console.warn("Element #dpc_selector not found in the DOM.");
}

const collectProvisioningData = () => {
    const qrElements = document.querySelectorAll('[data-qr-key]');
    let qrData = {}; // Start with an empty object

    // Get the error message element
    const errorMessageElement = document.getElementById('error_message');
    if (errorMessageElement) {
        errorMessageElement.innerText = ''; // Clear previous error messages
    }

    let invalidInputDetected = false; // Flag to prevent output generation if errors are found

    // Collect data from input elements
    qrElements.forEach((el) => {
        let key = el.dataset.qrKey;
        let value;

        // Boolean field handling
        if (el.hasAttribute('data-qr-bool')) {
            if (el.checked) {
                qrData[key] = el.checked;
            }
        }

        // Textarea Handling (PROVISIONING_ADMIN_EXTRAS_BUNDLE)
        else if (el.tagName === 'TEXTAREA') {
            value = el.value.trim();

            if (value === "") {
                // Do not add the key if empty
                return;
            }

            try {
                const cleanedValue = value
                    .replace(/(\r\n|\n|\r)/gm, '')
                    .replace(/^\{|\}$/g, '');

                const parsedValue = JSON.parse(`{${cleanedValue}}`);

                // Only assign if the parsed value has content
                if (Object.keys(parsedValue).length > 0) {
                    qrData[key] = parsedValue;
                }
            } catch (error) {
                console.error('Invalid JSON in textarea:', error);
                if (errorMessageElement) {
                    errorMessageElement.innerText = `Invalid JSON detected for "${key}".`;
                }
                invalidInputDetected = true;
            }
        }

        // Standard Input Fields
        else {
            value = el.value.trim();
            if (value !== '') {
                setNestedObject(qrData, key, value);
            }
        }
    });

    // Prevent QR generation if any invalid input was detected
    if (invalidInputDetected) {
        console.error("Output generation halted due to errors.");
        return { qrData: null, errorMessageElement, invalidInputDetected: true };
    }

    return { qrData, errorMessageElement, invalidInputDetected: false };
};

const renderGeneratedJson = (qrData) => {
    const qrDataString = JSON.stringify(qrData, null, 2);
    document.getElementById('json_code').innerHTML = `<b>Generated JSON</b><pre class="language-json"><code class="language-json">${qrDataString}</code></pre>`;
    return qrDataString;
};

const escapeNfcValue = (value) => {
    // NFC provisioning format expects escaping for characters like ':' and '=' within values.
    // Also escape backslashes first to avoid double-escaping.
    return String(value)
        .replace(/\\/g, '\\\\')
        .replace(/:/g, '\\:')
        .replace(/=/g, '\\=')
        .replace(/(\r\n|\n|\r)/gm, '');
};

const buildNfcPayload = (qrData) => {
    // Flatten top-level keys to key=value lines. If a value is an object (e.g., extras bundle), JSON stringify it.
    const lines = [];
    Object.entries(qrData).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        let outValue = value;
        if (typeof value === 'object') {
            outValue = JSON.stringify(value);
        }

        lines.push(`${key}=${escapeNfcValue(outValue)}`);
    });

    return lines.join('\n');
};

const showNfcOutput = (nfcText) => {
    const nfcContainer = document.getElementById('nfc_code');
    const nfcTextEl = document.getElementById('nfc_code_text');

    if (!nfcContainer || !nfcTextEl) return;

    nfcTextEl.textContent = nfcText;
    nfcContainer.style.display = 'block';
};

const qrBuilder = () => {
    const { qrData, errorMessageElement, invalidInputDetected } = collectProvisioningData();
    if (invalidInputDetected || !qrData) return;

    // Always render generated JSON for validation
    const qrDataString = renderGeneratedJson(qrData);
    const dataLength = qrDataString.length;

    // Adjust QR code scale and error correction level based on data size
    let scale;
    let errorCorrectionLevel;
    if (dataLength > 2600) {
        scale = 10;
        errorCorrectionLevel = 'L';
    } else if (dataLength > 2000) {
        scale = 6;
        errorCorrectionLevel = 'M';
    } else if (dataLength > 1800) {
        scale = 4;
        errorCorrectionLevel = 'Q';
    } else {
        scale = 4;
        errorCorrectionLevel = 'H';
    }

    const canvas = document.getElementById('generated_qr');

    window.QRCode.toCanvas(
        canvas,
        qrDataString,
        {
            errorCorrectionLevel: errorCorrectionLevel,
            scale: scale,
            margin: 4,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        },
        function (error) {
            if (error) {
                console.error("Error generating QR code:", error);
                errorMessageElement.innerText = `Error generating QR code: ${error.message}`;
                canvas.style.display = 'none';
                document.getElementById('download_qr').innerHTML = '';
            } else {
                errorMessageElement.innerText = '';
                canvas.style.display = 'block';
                document.getElementById('download_qr').innerHTML =
                    '<a class="button" id="generate_download">Download QR</a>';
                const link = document.getElementById('generate_download');
                link.setAttribute('download', 'provisioning_qr.png');
                link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
            }
        }
    );
};

const nfcBuilder = () => {
    const { qrData, invalidInputDetected } = collectProvisioningData();
    if (invalidInputDetected || !qrData) return;

    // Render generated JSON for validation
    renderGeneratedJson(qrData);

    const nfcText = buildNfcPayload(qrData);
    showNfcOutput(nfcText);
};

// Function to support nested JSON object handling
function setNestedObject(obj, path, value) {
    let schema = obj;
    const pList = path.split('|');
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
        const elem = pList[i];
        if (!schema[elem]) schema[elem] = {};
        schema = schema[elem];
    }
    schema[pList[len - 1]] = value;
}

// Attach the event listeners to the buttons
// Single Generate button should build both QR (JSON payload) and NFC output.
const generateButton = document.getElementById('generate_code');
if (generateButton) {
    generateButton.addEventListener('click', () => {
        qrBuilder();
        nfcBuilder();
    });
}