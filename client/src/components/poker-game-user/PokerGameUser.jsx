import React from 'react';
import Deck from '../deck/Deck';
import Stage from '../stage/Stage';
import Sidebar from '../sidebar/Sidebar';

const PokerGameUser = ({
	role,
	username,
	pokerStatus,
	cardPack,
	handlePokerSelection,
	activePokerCard,
	serverMessage,
	handleUserMove,
	activeUsers,
	roomName
}) => {
	return roomName === 'poker' ? (
		<>
			<main className="grid">
				<Sidebar role={role} message={`Welcome ${username}`} />
				{pokerStatus !== 'results' ? (
					<Deck
						cardPack={cardPack}
						handlePokerSelection={handlePokerSelection}
						handleUserMove={handleUserMove}
						activePokerCard={activePokerCard}
						username={username}
						participants={activeUsers}
					/>
				) : (
					<div className="g-middle user__server-msg">
						<span
							role="img"
							aria-label="Discuss emoji"
							className="user__discuss-icon"
						>
							🤔
						</span>
						<h1 className="conversation">{serverMessage}</h1>
					</div>
				)}
			</main>
		</>
	) : (
		<Stage
			users={activeUsers}
			username={username}
			handleUserMove={handleUserMove}
		/>
	);
};

export default PokerGameUser;
