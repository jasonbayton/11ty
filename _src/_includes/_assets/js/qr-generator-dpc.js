const qrBuilder = () => {
    const qrElements = document.querySelectorAll('[data-qr-key]');

    let qrData = {}; // Start with an empty object

    // Get the error message element
    const errorMessageElement = document.getElementById('error_message');
    // Clear any previous error messages
    if (errorMessageElement) {
        errorMessageElement.innerText = '';
    }

    // Collect data from input elements
    qrElements.forEach((el) => {
        let key = el.dataset.qrKey;
        let value;

        if (el.hasAttribute('data-qr-bool')) {
            // For boolean fields, include only if true
            if (el.checked) {
                qrData[key] = el.checked;
            }
        } else if (el.tagName === 'TEXTAREA') {
            // Special handling for `textarea`
            value = el.value.trim();

            // Clean up multiline content
            value = value
                .replace(/(\r\n|\n|\r)/gm, '') // Remove newlines
                .replace(/^\{|\}$/g, ''); // Remove surrounding braces if any

            // Append to `qrData` directly
            try {
                const parsedValue = JSON.parse(`{${value}}`);
                qrData[key] = parsedValue;
            } catch (error) {
                console.error('Invalid JSON in textarea:', value, error);
                if (errorMessageElement) {
                    errorMessageElement.innerText = 'Error parsing the textarea input. Ensure it is valid JSON.';
                }
            }
        } else {
            // For other fields, include if value is not empty
            value = el.value.trim();
            if (value !== '') {
                setNestedObject(qrData, key, value);
            }
        }
    });

    const qrDataString = JSON.stringify(qrData).trim();
    const dataLength = qrDataString.length;

    // Update the JSON code block (always display it)
    console.debug('qrData', qrData);
    document.getElementById('json_code').innerHTML = '<b>Generated JSON</b><pre class="language-json"><code class="language-json">' +
        JSON.stringify(qrData, null, 2) + '</code></pre>';

    // Adjust scale and error correction level based on data length
    let scale;
    let errorCorrectionLevel;

    if (dataLength > 2600) {
        scale = 10;
        errorCorrectionLevel = 'L'; // Low error correction, maximum data capacity
    } else if (dataLength > 2000) {
        scale = 6;
        errorCorrectionLevel = 'M'; // Medium error correction
    } else if (dataLength > 1800) {
        scale = 4;
        errorCorrectionLevel = 'Q'; // Quartile error correction
    } else {
        scale = 4;
        errorCorrectionLevel = 'H'; // High error correction, maximum reliability
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
                console.error(error);
                if (errorMessageElement) {
                    errorMessageElement.innerText =
                        'Error generating QR code (' + dataLength + ' characters): ' + error.message;
                }
                // Hide the canvas when there is an error
                canvas.style.display = 'none';
                // Clear previous download link
                document.getElementById('download_qr').innerHTML = '';
                // Do not clear the JSON code block
            } else {
                // Clear any previous error messages
                if (errorMessageElement) {
                    errorMessageElement.innerText = '';
                }

                // Show the canvas when QR code is successfully generated
                canvas.style.display = 'block';

                // Add a download link for the QR code
                document.getElementById('download_qr').innerHTML =
                    '<a class="button" id="generate_download">Download QR</a>';

                const link = document.getElementById('generate_download');
                link.setAttribute('download', 'provisioning_qr.png');
                link.setAttribute(
                    'href',
                    canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                );
            }
        }
    );
};

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

const generateButton = document.getElementById('generate_code');
if (generateButton) {
    generateButton.addEventListener('click', qrBuilder);
}