const qrBuilder = () => {
	const qrElements = document.querySelectorAll('[data-qr-key]');

	let qrData = {
		"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver",
		"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg",
		"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=setup",
	};

	qrElements.forEach(( el ) => {
		if (el.hasAttribute('data-qr-bool')) {
			qrData[el.dataset.qrKey] = el.checked;
		} else {
			if (el.value !== '') {
				setNestedObject(qrData, el.dataset.qrKey, el.value);
				// qrData[el.dataset.qrKey] = el.value;
			}
		}
	});

	window.QRCode.toCanvas(
		document.getElementById('generated_qr'),
		JSON.stringify(qrData).trim(),
		function ( error ) {
			if (error) console.error(error)
		});

	var canvas = document.getElementById('generated_qr');
	var link = document.getElementById('generate_code');
		link.setAttribute('download', 'provisioning_qr.png');
		link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));

	console.debug('qrData', qrData);
	document.getElementById('json_code').innerHTML = '<b>Generated JSON</b><pre>' + JSON.stringify(qrData, null, 2) + '</pre>';
}

function setNestedObject( obj, path, value ) {
	let schema = obj; // a moving reference to internal objects within obj
	const pList = path.split('|');
	const len = pList.length;
	for (let i = 0; i < len - 1; i++) {
		const elem = pList[i];
		if (!schema[elem]) schema[elem] = {}
		schema = schema[elem];
	}

	schema[pList[len - 1]] = value;
}

document.getElementById('generate_code')?.addEventListener('click', qrBuilder);
