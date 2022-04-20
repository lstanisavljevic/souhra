import React, { useRef, useState } from 'react';
import QrCodeGenerator from '../qr-code/qr-code-generator/QrQodeGenerator';

const PokerResultsGroupInitial = ({ roomName }) => {
	const copyAreaRef = useRef(null);
	const [navigatorShare] = useState(navigator.share);
	const [copySuccess, setCopySuccess] = useState('Copy link');
	const [shareSuccess, setShareSuccess] = useState('Share link');

	const setSuccessMessage = (message, defaultMessage, method) => {
		method(message);
		setTimeout(() => {
			method(defaultMessage);
		}, 2000);
	};

	const copyToClipboard = e => {
		copyAreaRef.current.select();
		document.execCommand('copy');
		e.target.focus();
		setSuccessMessage(
			'Copied! Share it with friends',
			'Copy link!',
			setCopySuccess
		);
	};

	const shareGame = () => {
		if (navigator.share) {
			navigator
				.share({
					title: 'Scrum Poker URL',
					text: 'Please join our Scrum Poker',
					url: window.location.href
				})
				.then(() =>
					setSuccessMessage(
						'Shared!',
						'Share it with friends',
						setShareSuccess
					)
				)
				.catch(error => console.log('Error sharing', error));
		}
	};

	return (
		<>
			<div className="btn-group btn-group--column">
				<h3>Invite to start a poker round</h3>
				<textarea
					aria-label="room invite url"
					ref={copyAreaRef}
					value={window.location.href}
					className="btn btn--like"
					readOnly
				></textarea>
				{navigatorShare ? (
					<button className="btn" onClick={shareGame}>
						{shareSuccess}
					</button>
				) : (
					<button className="btn" onClick={copyToClipboard}>
						{copySuccess}
					</button>
				)}
			</div>
			<div className="hide-mobile">
				<h3>or scan QR code</h3>
				<QrCodeGenerator textToQr={roomName} />
			</div>
		</>
	);
};

export default React.memo(PokerResultsGroupInitial);
