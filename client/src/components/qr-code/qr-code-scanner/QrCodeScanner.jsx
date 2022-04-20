import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QrCodeScanner = ({ setScanResult }) => {
	const [cameraAccess] = useState(
		'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices
			? true
			: false
	);
	const [openCamera, setOpenCamera] = useState(false);

	const handleScan = data => {
		if (data) {
			setScanResult(data);
			setOpenCamera(false);
		}
	};
	const handleError = err => {
		console.error(err);
	};

	return (
		<>
			{cameraAccess && (
				<label className="qr-code-scanner--btn">
					<button
						type="button"
						onClick={() => setOpenCamera(!openCamera)}
					/>
				</label>
			)}
			{openCamera && (
				<QrReader
					delay={300}
					onError={handleError}
					onScan={handleScan}
					facingMode={'environment'}
					style={{ width: '100%', marginBottom: '1em' }}
				/>
			)}
		</>
	);
};

export default QrCodeScanner;
