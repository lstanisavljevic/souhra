import React from 'react';
import Logo from '../logo/Logo';
import OfflineMessage from '../offline-message/OfflineMessage';

const Sidebar = ({
	role,
	releasePokerRound,
	resetPokerRound,
	allUsersVoted,
	message
}) => {
	return (
		<>
			{role === 'admin' ? (
				<aside className="aside g-aside--admin vertical-grid">
					<Logo theme="light" />
					<OfflineMessage theme="light" />
					<div className="btn-group btn-group--row-column">
						{allUsersVoted ? (
							<button className="btn" onClick={releasePokerRound}>
								Release all results
							</button>
						) : (
							<button
								className="btn btn--grayed-out"
								onClick={releasePokerRound}
							>
								Release partial results
							</button>
						)}
						<button
							className="btn btn--gray"
							onClick={resetPokerRound}
						>
							New Round
						</button>
					</div>
				</aside>
			) : (
				<aside className="aside vertical-grid g-aside--user">
					<OfflineMessage />
					<h1 className="aside__msg vertical-grid__content">
						{message}
					</h1>
				</aside>
			)}
		</>
	);
};

export default React.memo(Sidebar);
