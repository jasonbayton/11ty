// Pre-configured DPC entries
const preConfiguredDPCs = {
    "omnissa_hub": {
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.airwatch.androidagent/com.airwatch.agent.DeviceAdministratorReceiver",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "6kyqxDOjgS30jvQuzh4uvHPk-0bmAD-1QU7vtW7i_o8",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://getwsone.com/mobileenrollment/airwatchagent.apk"
    },
    "google_dpc": {
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=setup"
    }
};

// Function to populate the form based on selected DPC
const populateFormFromDPC = (dpcKey) => {
    const selectedDPC = preConfiguredDPCs[dpcKey];
    if (!selectedDPC) return;

    // Populate the fields
    Object.entries(selectedDPC).forEach(([key, value]) => {
        const field = document.querySelector(`[data-qr-key="${key}"]`);
        if (field) {
            field.value = value;
        }
    });
};

// Event listener for DPC selection
document.getElementById('dpc_selector').addEventListener('change', (event) => {
    const selectedDPC = event.target.value;
    populateFormFromDPC(selectedDPC);
});

const qrBuilder = () => {
    const qrElements = document.querySelectorAll('[data-qr-key]');

    let qrData = {}; // Start with an empty object

    // Get the error message element
    const errorMessageElement = document.getElementById('error_message');
    if (errorMessageElement) {
        errorMessageElement.innerText = ''; // Clear previous error messages
    }

    let invalidInputDetected = false; // Flag to prevent QR generation if errors are found

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
        console.error("QR code generation halted due to errors.");
        return;
    }

    const qrDataString = JSON.stringify(qrData, null, 2);
    const dataLength = qrDataString.length;

    // Display the generated JSON (for validation)
    document.getElementById('json_code').innerHTML = `<b>Generated JSON</b><pre class="language-json"><code class="language-json">${qrDataString}</code></pre>`;

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

// Attach the event listener to the button
const generateButton = document.getElementById('generate_code');
if (generateButton) {
    generateButton.addEventListener('click', qrBuilder);
}