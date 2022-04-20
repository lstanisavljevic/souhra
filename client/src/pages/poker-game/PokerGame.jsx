import React from 'react';
import PokerGameAdmin from '../../components/poker-game-admin/PokerGameAdmin';
import withSocketPokerGame from './withSocketPokerGame';
import PokerGameUser from '../../components/poker-game-user/PokerGameUser';

const PokerGame = props => {
	const PokerGameAdminWithSockets = withSocketPokerGame(PokerGameAdmin, props);
	const PokerGameUserWithSockets = withSocketPokerGame(PokerGameUser, props);

	return (
		<>
			{props.match.params.role === 'admin' ? (
				<PokerGameAdminWithSockets />
			) : (
				<PokerGameUserWithSockets />
			)}
		</>
	);
};

export default PokerGame;
