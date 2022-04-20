import React from 'react';

const OfflineMessage = ({ theme }) => {
	return (
		<span
			className={`show-offline show-offline--message offline-message--${theme}`}
		>
			<span role="img" aria-label="">
				😅
			</span>
			You are using offline version of Scrum Poker
		</span>
	);
};

export default OfflineMessage;
