import React, { useState, useEffect } from 'react';

const Message = ({ connectionStatus, connectionMessage }) => {
	const [msgClass, setMsgClass] = useState('message');

	useEffect(() => {
		if (connectionStatus === 'activeUserChange') {
			setMsgClass('message');
			setTimeout(() => {
				setMsgClass('message message--hidden');
			}, 2000);
		}
	}, [connectionMessage, connectionStatus]);

	return (
		<div className={`g-message ${msgClass}`}>
			<p>{connectionMessage}</p>
		</div>
	);
};

export default React.memo(Message);
