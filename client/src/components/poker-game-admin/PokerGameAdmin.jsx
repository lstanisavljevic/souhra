import React from 'react';
import PokerResultsGroup from '../poker-results-group/PokerResultsGroup';
import Sidebar from '../sidebar/Sidebar';
import ParticipantsGroup from '../participants-group/ParticipantsGroup';
// import Stage from '../stage/Stage';
import Message from '../message/Message';
const PokerGameAdmin = ({
	role,
	allUsersVoted,
	resetPokerRound,
	releasePokerRound,
	// handleUserMove,
	pokerStatus,
	serverMessage,
	pokerResults,
	roomName,
	cardPack,
	connectionMessage,
	connectionStatus,
	activeUsers,
	// username
}) => {
	return (
		<div className="grid">
			{roomName === 'poker' ? (
				<>
					<Sidebar
						role={role}
						allUsersVoted={allUsersVoted}
						resetPokerRound={resetPokerRound}
						releasePokerRound={releasePokerRound}
					/>
					<PokerResultsGroup
						pokerStatus={pokerStatus}
						serverMessage={serverMessage}
						pokerResults={pokerResults}
						url={`/scrum-poker/user/${roomName}`}
						cardPack={cardPack}
						roomName={roomName}
					/>
					<Message
						connectionMessage={connectionMessage}
						connectionStatus={connectionStatus}
					/>
					<ParticipantsGroup
						cardPack={cardPack}
						pokerStatus={pokerStatus}
						participants={activeUsers}
					/>
				</>
			) : (
				<pre>{JSON.stringify(activeUsers, null, 4)}</pre>
			)}
		</div>
	);
};

export default PokerGameAdmin;
