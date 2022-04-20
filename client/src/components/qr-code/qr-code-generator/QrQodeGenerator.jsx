import React, { useState } from 'react';
const qrcode = require('qrcode');

const QrCodeGenerator = ({ textToQr = 'error' }) => {
	const [qrURL, setQRURl] = useState('');

	async function run() {
		const res = await qrcode.toDataURL(textToQr);
		setQRURl(res);
	}

	run().catch(error => console.error(error.stack));

	return (
		<img
			className="qr-code-generator"
			alt="generated qr code to scan"
			src={qrURL}
		></img>
	);
};

export default QrCodeGenerator;
