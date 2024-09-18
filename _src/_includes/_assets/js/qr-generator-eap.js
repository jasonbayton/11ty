const qrBuilder = () => {
    const qrElements = document.querySelectorAll('[data-qr-key]');

    let qrData = {
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
        "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=setup",
    };

    qrElements.forEach((el) => {
        if (el.hasAttribute('data-qr-bool')) {
            qrData[el.dataset.qrKey] = el.checked;
        } else {
            if (el.value !== '') {
                setNestedObject(qrData, el.dataset.qrKey, el.value);
            }
        }
    });

    const qrDataString = JSON.stringify(qrData).trim();
    const dataLength = qrDataString.length;

    // Adjust scale based on data length
    let scale;
    if (dataLength > 1000) {
        scale = 10;
    } else if (dataLength > 800) {
        scale = 8;
    } else if (dataLength > 600) {
        scale = 7;
    } else {
        scale = 6;
    }

    window.QRCode.toCanvas(
        document.getElementById('generated_qr'),
        qrDataString,
        {
            errorCorrectionLevel: 'L',
            scale: scale,
            margin: 4,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        },
        function (error) {
            if (error) console.error(error);
        }
    );

    document.getElementById('download_qr').innerHTML = '<a class="button" id="generate_download">Download QR</a>';

    const canvas = document.getElementById('generated_qr');
    const link = document.getElementById('generate_download');
    link.setAttribute('download', 'provisioning_qr.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));

    console.debug('qrData', qrData);
    document.getElementById('json_code').innerHTML = '<b>Generated JSON</b><pre class="language-json"><code class="language-json">' + JSON.stringify(qrData, null, 2) + '</code></pre>';
};