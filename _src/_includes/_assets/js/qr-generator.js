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
				// qrData[el.dataset.qrKey] = el.value;
			}
		}
	});

	const qrUrl = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chl=' + JSON.stringify(qrData).trim();

	const image = document.createElement('img');
	image.src = qrUrl;
	image.alt = 'QR Code';
	image.width = 512;
	image.height = 512;

	const qrContainer = document.getElementById('generated_qr');
	qrContainer.innerHTML = '';
	qrContainer.appendChild(image);

	console.debug('qrData', qrData);
	document.getElementById('json_code').innerHTML = '<b>Generated JSON</b><pre>'+JSON.stringify(qrData,null, 2)+'</pre>';
}

function setNestedObject(obj, path, value) {
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
